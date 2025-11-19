"""
AppWorld Evaluation Integration for CUGA Agent

This module provides comprehensive integration between CUGA Agent and AppWorld benchmark,
enabling automated task execution, answer evaluation, and batch processing.

Features:
- Load and inspect AppWorld tasks (732 available)
- Execute CUGA Agent on AppWorld tasks
- Evaluate answers against ground truth using AppWorld's evaluation system
- Batch evaluation with comprehensive statistics
- CLI interface for easy usage

Usage:
    # List available tasks
    python -m cuga.evaluation.evaluate_appworld list-tasks --limit 10
    
    # Inspect a specific task
    python -m cuga.evaluation.evaluate_appworld inspect-task 024c982_1
    
    # Run agent on a task and evaluate
    python -m cuga.evaluation.evaluate_appworld run-task 024c982_1 --verbose
    
    # Batch evaluate multiple tasks
    python -m cuga.evaluation.evaluate_appworld batch-eval --max-tasks 50 --output results.json
"""

import asyncio
import json
import os
import sys
from datetime import datetime
from pathlib import Path
from typing import Any, Dict, List, Optional
from dataclasses import dataclass, field

from loguru import logger
from pydantic import BaseModel
from tqdm import tqdm

# CUGA imports
from cuga.backend.activity_tracker.tracker import ActivityTracker
from cuga.backend.cuga_graph.nodes.api.variables_manager.manager import VariablesManager
from cuga.backend.cuga_graph.utils.controller import AgentRunner, ExperimentResult
from cuga.config import PROJECT_ROOT, settings

# AppWorld imports
try:
    from appworld import AppWorld
    from appworld.task import Task, load_task_ids
    from appworld.evaluator import TestTracker, evaluate_task, evaluate_tasks
    APPWORLD_AVAILABLE = True
except ImportError:
    APPWORLD_AVAILABLE = False
    logger.warning("AppWorld package not found. Please install: pip install appworld")

tracker = ActivityTracker()
var_manager = VariablesManager()


# ============================================================================
# Data Models
# ============================================================================

@dataclass
class AppWorldTaskInfo:
    """Information about an AppWorld task"""
    task_id: str
    instruction: str
    difficulty: int
    api_calls: int
    required_apps: List[str]
    supervisor: Dict[str, str]
    datetime: str
    db_version: str
    
    @classmethod
    def from_task(cls, task: 'Task') -> 'AppWorldTaskInfo':
        """Create TaskInfo from AppWorld Task object"""
        ground_truth = task.ground_truth
        return cls(
            task_id=task.id,
            instruction=task.instruction,
            difficulty=ground_truth.metadata.get('difficulty', 0) if ground_truth else 0,
            api_calls=len(ground_truth.metadata.get('api_calls', [])) if ground_truth else 0,
            required_apps=task.allowed_apps,
            supervisor={
                'name': f"{task.supervisor['first_name']} {task.supervisor['last_name']}",
                'email': task.supervisor['email'],
                'phone': task.supervisor['phone_number']
            },
            datetime=str(task.datetime),
            db_version=task.db_version
        )


class AppWorldEvaluationResult(BaseModel):
    """Result of evaluating a CUGA Agent run on AppWorld task"""
    task_id: str
    correct: bool
    difficulty: int
    api_calls_count: int
    agent_answer: Optional[str] = None
    expected_answer: Optional[str] = None
    pass_count: int = 0
    fail_count: int = 0
    total_tests: int = 0
    execution_time: float = 0.0
    error_message: Optional[str] = None
    test_tracker: Optional[Dict[str, Any]] = None
    
    
class BatchEvaluationReport(BaseModel):
    """Comprehensive report for batch evaluation"""
    total_tasks: int
    successful_tasks: int
    failed_tasks: int
    accuracy: float
    avg_difficulty: float
    avg_api_calls: float
    avg_execution_time: float
    results: List[AppWorldEvaluationResult]
    timestamp: str = field(default_factory=lambda: datetime.now().isoformat())


# ============================================================================
# Core Classes
# ============================================================================

class AppWorldLoader:
    """Load and manage AppWorld tasks"""
    
    def __init__(self, appworld_root: Optional[str] = None):
        """
        Initialize AppWorld loader
        
        Args:
            appworld_root: Path to AppWorld root directory (uses APPWORLD_ROOT env var if not provided)
        """
        if not APPWORLD_AVAILABLE:
            raise ImportError("AppWorld package not installed. Run: pip install appworld")
            
        self.appworld_root = appworld_root or os.getenv('APPWORLD_ROOT')
        if not self.appworld_root:
            raise ValueError(
                "APPWORLD_ROOT not set. Please set environment variable or pass appworld_root parameter."
            )
        
        self.tasks_path = Path(self.appworld_root) / 'data' / 'tasks'
        if not self.tasks_path.exists():
            raise FileNotFoundError(f"AppWorld tasks directory not found: {self.tasks_path}")
    
    def list_all_tasks(self) -> List[str]:
        """Get list of all available task IDs"""
        return load_task_ids()
    
    def load_task(self, task_id: str) -> AppWorldTaskInfo:
        """
        Load a specific task
        
        Args:
            task_id: Task identifier (e.g., '024c982_1')
            
        Returns:
            AppWorldTaskInfo with task details
        """
        try:
            task = Task.load(task_id=task_id)
            return AppWorldTaskInfo.from_task(task)
        except Exception as e:
            logger.error(f"Failed to load task {task_id}: {e}")
            raise
    
    def get_task_spec(self, task_id: str) -> Dict[str, Any]:
        """Get raw task specification from specs.json"""
        specs_file = self.tasks_path / task_id / 'specs.json'
        if not specs_file.exists():
            raise FileNotFoundError(f"Task specs not found: {specs_file}")
        
        with open(specs_file, 'r') as f:
            return json.load(f)


class AppWorldCUGARunner:
    """Run CUGA Agent on AppWorld tasks"""
    
    def __init__(self, experiment_name: str = "appworld_eval"):
        """
        Initialize runner
        
        Args:
            experiment_name: Name for experiment tracking
        """
        self.experiment_name = experiment_name
        self.agent_runner = AgentRunner(browser_enabled=False)
        self.loader = AppWorldLoader()
    
    async def run_task(
        self, 
        task_id: str,
        verbose: bool = False,
        timeout: Optional[int] = None
    ) -> ExperimentResult:
        """
        Execute CUGA Agent on an AppWorld task
        
        Args:
            task_id: Task identifier
            verbose: Print detailed execution logs
            timeout: Maximum execution time in seconds
            
        Returns:
            ExperimentResult with agent's output
        """
        # Load task info
        task_info = self.loader.load_task(task_id)
        
        if verbose:
            logger.info(f"Running CUGA Agent on task: {task_id}")
            logger.info(f"Instruction: {task_info.instruction}")
            logger.info(f"Difficulty: {task_info.difficulty}/5")
        
        # Reset tracking
        tracker.reset(intent=task_info.instruction, task_id=task_id)
        var_manager.reset()
        
        # Initialize AppWorld environment
        with AppWorld(task_id=task_id) as world:
            # Run agent
            start_time = datetime.now()
            try:
                result = await self.agent_runner.run_task_generic(
                    eval_mode=False,
                    goal=task_info.instruction,
                    current_datetime=tracker.current_date
                )
                
                execution_time = (datetime.now() - start_time).total_seconds()
                
                if verbose:
                    logger.info(f"Agent completed in {execution_time:.2f}s")
                    logger.info(f"Answer: {result.answer}")
                
                # Save execution in AppWorld format
                world.save()
                world.save_logs()
                
                return result
                
            except Exception as e:
                logger.error(f"Task execution failed: {e}")
                raise
    
    async def evaluate_task(
        self,
        task_id: str,
        agent_answer: Optional[str] = None,
        run_agent: bool = True,
        verbose: bool = False
    ) -> AppWorldEvaluationResult:
        """
        Run agent on task and evaluate the result
        
        Args:
            task_id: Task identifier
            agent_answer: Pre-computed answer (skips agent execution if provided)
            run_agent: Whether to run agent (False to only evaluate existing output)
            verbose: Print detailed logs
            
        Returns:
            AppWorldEvaluationResult with evaluation details
        """
        task_info = self.loader.load_task(task_id)
        start_time = datetime.now()
        
        # Run agent if needed
        if run_agent and agent_answer is None:
            try:
                result = await self.run_task(task_id, verbose=verbose)
                agent_answer = result.answer
            except Exception as e:
                return AppWorldEvaluationResult(
                    task_id=task_id,
                    correct=False,
                    difficulty=task_info.difficulty,
                    api_calls_count=task_info.api_calls,
                    error_message=str(e),
                    execution_time=(datetime.now() - start_time).total_seconds()
                )
        
        # Evaluate using AppWorld's evaluation system
        try:
            test_tracker: TestTracker = evaluate_task(
                task_id=task_id,
                experiment_name=self.experiment_name,
                suppress_errors=True,
                save_report=True
            )
            
            execution_time = (datetime.now() - start_time).total_seconds()
            
            # Extract results
            result = AppWorldEvaluationResult(
                task_id=task_id,
                correct=test_tracker.success,
                difficulty=task_info.difficulty,
                api_calls_count=task_info.api_calls,
                agent_answer=agent_answer,
                expected_answer=None,  # AppWorld doesn't expose this directly
                pass_count=test_tracker.pass_count,
                fail_count=test_tracker.fail_count,
                total_tests=test_tracker.total_count,
                execution_time=execution_time,
                test_tracker=test_tracker.to_dict(stats_only=False)
            )
            
            if verbose:
                logger.info(f"Evaluation: {'✅ PASS' if result.correct else '❌ FAIL'}")
                logger.info(f"Tests: {result.pass_count}/{result.total_tests} passed")
            
            return result
            
        except Exception as e:
            logger.error(f"Evaluation failed for task {task_id}: {e}")
            return AppWorldEvaluationResult(
                task_id=task_id,
                correct=False,
                difficulty=task_info.difficulty,
                api_calls_count=task_info.api_calls,
                error_message=str(e),
                execution_time=(datetime.now() - start_time).total_seconds()
            )


class AppWorldBatchEvaluator:
    """Batch evaluation of multiple tasks"""
    
    def __init__(self, experiment_name: str = "appworld_batch"):
        self.experiment_name = experiment_name
        self.runner = AppWorldCUGARunner(experiment_name=experiment_name)
        self.loader = AppWorldLoader()
    
    async def evaluate_batch(
        self,
        task_ids: Optional[List[str]] = None,
        max_tasks: Optional[int] = None,
        verbose: bool = False,
        output_file: Optional[str] = None
    ) -> BatchEvaluationReport:
        """
        Evaluate multiple tasks
        
        Args:
            task_ids: Specific task IDs to evaluate (None = all tasks)
            max_tasks: Maximum number of tasks to evaluate
            verbose: Print progress
            output_file: Save results to JSON file
            
        Returns:
            BatchEvaluationReport with comprehensive statistics
        """
        # Get task list
        if task_ids is None:
            task_ids = self.loader.list_all_tasks()
        
        if max_tasks:
            task_ids = task_ids[:max_tasks]
        
        logger.info(f"Starting batch evaluation of {len(task_ids)} tasks")
        
        results = []
        start_time = datetime.now()
        
        for task_id in tqdm(task_ids, desc="Evaluating tasks"):
            try:
                result = await self.runner.evaluate_task(
                    task_id=task_id,
                    verbose=verbose
                )
                results.append(result)
                
                if verbose:
                    status = "✅" if result.correct else "❌"
                    logger.info(f"{status} {task_id}: {result.pass_count}/{result.total_tests} tests")
                    
            except Exception as e:
                logger.error(f"Failed to evaluate {task_id}: {e}")
                # Add failed result
                task_info = self.loader.load_task(task_id)
                results.append(AppWorldEvaluationResult(
                    task_id=task_id,
                    correct=False,
                    difficulty=task_info.difficulty,
                    api_calls_count=task_info.api_calls,
                    error_message=str(e)
                ))
        
        # Generate report
        total_time = (datetime.now() - start_time).total_seconds()
        successful = [r for r in results if r.correct and not r.error_message]
        
        report = BatchEvaluationReport(
            total_tasks=len(results),
            successful_tasks=len(successful),
            failed_tasks=len(results) - len(successful),
            accuracy=len(successful) / len(results) if results else 0.0,
            avg_difficulty=sum(r.difficulty for r in results) / len(results) if results else 0.0,
            avg_api_calls=sum(r.api_calls_count for r in results) / len(results) if results else 0.0,
            avg_execution_time=sum(r.execution_time for r in results) / len(results) if results else 0.0,
            results=results
        )
        
        logger.info(f"\n{'='*60}")
        logger.info(f"Batch Evaluation Complete")
        logger.info(f"{'='*60}")
        logger.info(f"Total Tasks: {report.total_tasks}")
        logger.info(f"Successful: {report.successful_tasks}")
        logger.info(f"Failed: {report.failed_tasks}")
        logger.info(f"Accuracy: {report.accuracy:.1%}")
        logger.info(f"Avg Difficulty: {report.avg_difficulty:.1f}/5")
        logger.info(f"Avg Execution Time: {report.avg_execution_time:.2f}s")
        logger.info(f"Total Time: {total_time:.2f}s")
        logger.info(f"{'='*60}\n")
        
        # Save to file
        if output_file:
            output_path = Path(output_file)
            output_path.parent.mkdir(parents=True, exist_ok=True)
            with open(output_path, 'w') as f:
                json.dump(report.model_dump(), f, indent=2, default=str)
            logger.info(f"Results saved to: {output_file}")
        
        return report


# ============================================================================
# CLI Interface
# ============================================================================

def list_tasks_cli(limit: Optional[int] = None):
    """CLI: List available AppWorld tasks"""
    loader = AppWorldLoader()
    task_ids = loader.list_all_tasks()
    
    if limit:
        task_ids = task_ids[:limit]
    
    print(f"\n📋 AppWorld Tasks (showing {len(task_ids)} of {len(loader.list_all_tasks())} total)\n")
    print(f"{'#':<5} {'Task ID':<15} {'Instruction':<60}")
    print("=" * 80)
    
    for idx, task_id in enumerate(task_ids, 1):
        try:
            task_info = loader.load_task(task_id)
            instruction = task_info.instruction[:57] + "..." if len(task_info.instruction) > 60 else task_info.instruction
            print(f"{idx:<5} {task_id:<15} {instruction:<60}")
        except Exception as e:
            print(f"{idx:<5} {task_id:<15} [Error loading: {e}]")
    
    print()


def inspect_task_cli(task_id: str):
    """CLI: Show detailed task information"""
    loader = AppWorldLoader()
    task_info = loader.load_task(task_id)
    
    print(f"\n📌 Task Details: {task_id}")
    print("=" * 80)
    print(f"Instruction: {task_info.instruction}")
    print(f"Difficulty: {task_info.difficulty}/5 ⭐")
    print(f"API Calls: {task_info.api_calls}")
    print(f"Required Apps: {', '.join(task_info.required_apps)}")
    print(f"Supervisor: {task_info.supervisor['name']} ({task_info.supervisor['email']})")
    print(f"DateTime: {task_info.datetime}")
    print(f"DB Version: {task_info.db_version}")
    print("=" * 80)
    print()


async def run_task_cli(task_id: str, verbose: bool = False):
    """CLI: Run CUGA Agent on a task and evaluate"""
    runner = AppWorldCUGARunner()
    
    print(f"\n🚀 Running CUGA Agent on task: {task_id}\n")
    
    result = await runner.evaluate_task(task_id=task_id, verbose=verbose)
    
    print(f"\n📊 Evaluation Results")
    print("=" * 80)
    print(f"Task ID: {result.task_id}")
    print(f"Status: {'✅ CORRECT' if result.correct else '❌ INCORRECT'}")
    print(f"Difficulty: {result.difficulty}/5")
    print(f"Tests Passed: {result.pass_count}/{result.total_tests}")
    print(f"Execution Time: {result.execution_time:.2f}s")
    if result.error_message:
        print(f"Error: {result.error_message}")
    print("=" * 80)
    print()


async def batch_eval_cli(
    max_tasks: Optional[int] = None,
    output: str = "appworld_results.json",
    verbose: bool = False
):
    """CLI: Batch evaluate multiple tasks"""
    evaluator = AppWorldBatchEvaluator()
    
    await evaluator.evaluate_batch(
        max_tasks=max_tasks,
        verbose=verbose,
        output_file=output
    )


# ============================================================================
# Main Entry Point
# ============================================================================

def main():
    """Main CLI entry point"""
    import argparse
    
    parser = argparse.ArgumentParser(
        description="CUGA Agent × AppWorld Evaluation System",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # List first 10 tasks
  python -m cuga.evaluation.evaluate_appworld list-tasks --limit 10
  
  # Inspect specific task
  python -m cuga.evaluation.evaluate_appworld inspect-task 024c982_1
  
  # Run agent and evaluate
  python -m cuga.evaluation.evaluate_appworld run-task 024c982_1 --verbose
  
  # Batch evaluate 50 tasks
  python -m cuga.evaluation.evaluate_appworld batch-eval --max-tasks 50 --output results.json
        """
    )
    
    subparsers = parser.add_subparsers(dest='command', help='Available commands')
    
    # list-tasks command
    list_parser = subparsers.add_parser('list-tasks', help='List available AppWorld tasks')
    list_parser.add_argument('--limit', type=int, help='Maximum number of tasks to show')
    
    # inspect-task command
    inspect_parser = subparsers.add_parser('inspect-task', help='Show detailed task information')
    inspect_parser.add_argument('task_id', help='Task identifier (e.g., 024c982_1)')
    
    # run-task command
    run_parser = subparsers.add_parser('run-task', help='Run CUGA Agent on task and evaluate')
    run_parser.add_argument('task_id', help='Task identifier')
    run_parser.add_argument('--verbose', '-v', action='store_true', help='Verbose output')
    
    # batch-eval command
    batch_parser = subparsers.add_parser('batch-eval', help='Batch evaluate multiple tasks')
    batch_parser.add_argument('--max-tasks', type=int, help='Maximum number of tasks to evaluate')
    batch_parser.add_argument('--output', '-o', default='appworld_results.json', help='Output JSON file')
    batch_parser.add_argument('--verbose', '-v', action='store_true', help='Verbose output')
    
    args = parser.parse_args()
    
    if not args.command:
        parser.print_help()
        sys.exit(1)
    
    # Enable tracker for evaluation
    settings.update({"ADVANCED_FEATURES": {"TRACKER_ENABLED": True}}, merge=True)
    
    # Execute command
    if args.command == 'list-tasks':
        list_tasks_cli(limit=args.limit)
    elif args.command == 'inspect-task':
        inspect_task_cli(args.task_id)
    elif args.command == 'run-task':
        asyncio.run(run_task_cli(args.task_id, verbose=args.verbose))
    elif args.command == 'batch-eval':
        asyncio.run(batch_eval_cli(
            max_tasks=args.max_tasks,
            output=args.output,
            verbose=args.verbose
        ))


if __name__ == "__main__":
    main()
