"""AppWorld benchmark runner for CUGA LangGraph agent.

Usage:
  # Single task
  uv run appworld_eval --dataset dev --task-id 1150ed6_2

  # Full dataset
  uv run appworld_eval --dataset test_normal_2 --experiment-name my_run

  # With offset/limit
  uv run appworld_eval --dataset test_normal_2 --offset 0 --limit 20

Entry point registered in pyproject.toml:
  appworld_eval = "evaluation.appworld_eval:run_main"
"""

from __future__ import annotations

import argparse
import asyncio
import importlib
import json
import os
import re
import shutil
import subprocess
import sys
import time
import uuid
from pathlib import Path
from typing import Any, Sequence

import httpx
from loguru import logger
from pydantic import BaseModel, ConfigDict, Field

from cuga.backend.activity_tracker.tracker import ActivityTracker
from cuga.backend.cuga_graph.graph import DynamicAgentGraph
from cuga.backend.cuga_graph.state.agent_state import AgentState, default_state
from cuga.backend.cuga_graph.utils.agent_loop import AgentLoop
from cuga.config import PACKAGE_ROOT, settings

_INT_RE = re.compile(r"^-?\d+$")
_FLOAT_RE = re.compile(r"^-?(?:\d+\.\d*|\d*\.\d+)$")

_DEFAULT_TASK_TIMEOUT_SECONDS = 800
_APPWORLD_REGISTRY_CONFIG = str(
    Path(PACKAGE_ROOT) / "backend" / "tools_env" / "registry" / "config" / "mcp_servers_appworld.yaml"
)


# ---------------------------------------------------------------------------
# Models
# ---------------------------------------------------------------------------

class AppWorldTaskResult(BaseModel):
    model_config = ConfigDict(arbitrary_types_allowed=True)

    task_id: str
    instruction: str = ""
    final_answer: str = ""
    submitted_answer: Any = None
    submit_output: str | None = None
    success: bool | None = None
    duration_seconds: float | None = None
    total_tokens: int | None = None
    llm_calls: int = 0
    exception: str | None = None
    evaluation: dict[str, Any] = Field(default_factory=dict)
    evaluation_report: str | None = None
    compact_trajectory_path: str | None = None
    appworld_task_output_dir: str | None = None


class AppWorldBenchmarkSummary(BaseModel):
    model_config = ConfigDict(arbitrary_types_allowed=True)

    experiment_name: str
    dataset_name: str
    selected_task_ids: list[str] = Field(default_factory=list)
    total_tasks: int = 0
    succeeded_tasks: int = 0
    failed_tasks: int = 0
    output_dir: str = ""
    benchmark_json_path: str = ""
    benchmark_markdown_path: str = ""
    appworld_output_dir: str = ""
    results: list[AppWorldTaskResult] = Field(default_factory=list)


# ---------------------------------------------------------------------------
# AppWorld helpers
# ---------------------------------------------------------------------------

def _resolve_appworld_root() -> Path:
    root = os.getenv("APPWORLD_ROOT", "").strip()
    if not root:
        raise RuntimeError("APPWORLD_ROOT env var must be set to the AppWorld root directory.")
    return Path(root).expanduser().resolve()


def _import_appworld(appworld_root: Path):
    """Import appworld package, ensuring the root is known."""
    sys.path.insert(0, str(appworld_root / "src"))
    try:
        module = importlib.import_module("appworld")
    except ImportError as exc:
        raise RuntimeError(
            "Could not import `appworld`. Make sure APPWORLD_ROOT points to a valid clone."
        ) from exc
    os.environ["APPWORLD_ROOT"] = str(appworld_root)
    update_root = getattr(module, "update_root", None)
    if callable(update_root):
        update_root(str(appworld_root))
    return module


def _reset_registry_state() -> None:
    registry_url = f"http://127.0.0.1:{settings.server_ports.registry}/api/reset"
    try:
        httpx.get(registry_url, timeout=5.0).raise_for_status()
    except Exception as exc:
        raise RuntimeError(f"Failed to reset registry state: {registry_url}") from exc


def _reset_environment_state(remote_environment_url: str, retries: int = 3) -> None:
    url = f"{remote_environment_url.rstrip('/')}/close_all"
    last_exc: Exception | None = None
    for attempt in range(1, retries + 1):
        try:
            httpx.post(url, timeout=5.0).raise_for_status()
            return
        except Exception as exc:
            last_exc = exc
            logger.warning("Environment reset attempt {}/{} failed ({}): {}", attempt, retries, url, exc)
    logger.error("All {} reset attempts failed — proceeding with potentially dirty environment state", retries)


def _coerce_submission_value(answer: str | None) -> str | int | float | None:
    if answer is None:
        return None
    stripped = answer.strip()
    if stripped.lower() in {"", "n/a"}:
        return None
    if _INT_RE.fullmatch(stripped):
        return int(stripped)
    if _FLOAT_RE.fullmatch(stripped):
        return float(stripped)
    return answer


def _submit_final_answer(world: Any, submitted_answer: Any) -> str | None:
    code = f"apis.supervisor.complete_task(answer={submitted_answer!r})"
    try:
        out = world.execute(code)
        return str(out).strip() if out is not None else None
    except Exception as exc:
        logger.warning("submit failed: {}", exc)
        return str(exc)


def _evaluate_world(world: Any) -> tuple[dict[str, Any], str | None]:
    try:
        ev = world.evaluate()
    except Exception as exc:
        logger.warning("evaluate() failed: {}", exc)
        return {}, None

    def _jsonable(v: Any) -> Any:
        if v is None or isinstance(v, (bool, int, float, str)):
            return v
        if isinstance(v, dict):
            return {str(k): _jsonable(w) for k, w in v.items()}
        if isinstance(v, (list, tuple)):
            return [_jsonable(w) for w in v]
        if hasattr(v, "to_dict"):
            return _jsonable(v.to_dict())
        if hasattr(v, "__dict__"):
            return _jsonable(vars(v))
        return str(v)

    evaluation = _jsonable(ev)
    report_text: str | None = None
    report_fn = getattr(ev, "report", None)
    if callable(report_fn):
        try:
            r = report_fn(print_it=False)
            report_text = r if isinstance(r, str) else json.dumps(_jsonable(r), ensure_ascii=False, indent=2)
        except Exception:
            pass
    if not isinstance(evaluation, dict):
        evaluation = {"evaluation": evaluation}
    return evaluation, report_text


def _extract_success(evaluation: dict[str, Any]) -> bool | None:
    success = evaluation.get("success")
    return bool(success) if isinstance(success, bool) else None


def _task_site(world: Any) -> str:
    task = getattr(world, "task", None)
    app_descriptions = getattr(task, "app_descriptions", None)
    if isinstance(app_descriptions, dict) and app_descriptions:
        return ",".join(sorted(str(k) for k in app_descriptions.keys()))
    return "appworld"


def _resolve_selected_task_ids(
    *,
    dataset_name: str,
    load_task_ids_fn: Any,
    task_ids: Sequence[str] | None,
    offset: int,
    limit: int | None,
) -> tuple[list[str], list[str]]:
    dataset_task_ids = [str(t) for t in load_task_ids_fn(dataset_name)]
    if task_ids:
        selected = [t.strip() for t in task_ids if t.strip()]
        return selected, dataset_task_ids
    sliced = dataset_task_ids[offset:]
    if limit is not None:
        sliced = sliced[:limit]
    return sliced, dataset_task_ids


def _run_official_evaluation(experiment_name: str, dataset_name: str, appworld_root: Path) -> dict[str, Any]:
    cmd = [
        sys.executable, "-m", "appworld.cli",
        "evaluate", experiment_name, dataset_name,
        "--root", str(appworld_root),
    ]
    completed = subprocess.run(cmd, capture_output=True, text=True)
    if completed.returncode != 0:
        logger.warning("Official evaluation failed:\n{}", completed.stderr.strip())
        return {}
    json_path = appworld_root / "experiments" / "outputs" / experiment_name / "evaluations" / f"{dataset_name}.json"
    if json_path.exists():
        return json.loads(json_path.read_text(encoding="utf-8"))
    return {}


# ---------------------------------------------------------------------------
# LangGraph runner
# ---------------------------------------------------------------------------

class _AppWorldGraph(DynamicAgentGraph):
    """DynamicAgentGraph compiled without interrupt_after for autonomous execution."""

    async def build_graph(self):
        from langgraph.checkpoint.memory import MemorySaver
        from langgraph.graph import StateGraph as _StateGraph

        graph = _StateGraph(AgentState)
        await self.add_nodes(graph)
        self.add_edges(graph)
        # Compile WITHOUT interrupt_after — AppWorld API tasks run autonomously
        self.graph = graph.compile(checkpointer=MemorySaver())
        self._policy_system = self.policy_system


async def _run_langgraph_task(
    task_instruction: str,
    task_id: str,
    task_datetime: str | None,
    tracker: ActivityTracker,
) -> tuple[str, int, int]:
    """Run a single AppWorld task through the LangGraph agent.

    Returns:
        (final_answer, total_tokens, llm_call_count)
    """
    thread_id = str(uuid.uuid4())
    tracker.reset(intent=task_instruction, task_id=task_id)

    agent = _AppWorldGraph(None)
    await agent.build_graph()

    state = default_state(page=None, observation={}, goal=task_instruction)
    state.current_datetime = task_datetime or ""

    loop = AgentLoop(
        thread_id=thread_id,
        langfuse_handler=None,
        graph=agent.graph,
        tracker=tracker,
        env_pointer=None,
    )

    result = await loop.run(state=state)

    # Try to get final answer from tracker first, then fall back to loop result
    final_answer = tracker.final_answer or (result.answer if result else "") or ""
    total_tokens = tracker.token_usage or 0
    llm_call_count = getattr(tracker, "llm_call_count", 0)
    return final_answer, total_tokens, llm_call_count


# ---------------------------------------------------------------------------
# Markdown report
# ---------------------------------------------------------------------------

def _fail_category(result: AppWorldTaskResult) -> str:
    if result.success is True:
        return "-"
    if result.exception:
        return "exception"
    return "evaluation_failed"


def _first_failure(evaluation: dict[str, Any]) -> str:
    failures = evaluation.get("failures", [])
    if isinstance(failures, list) and failures:
        first = failures[0]
        if isinstance(first, dict):
            req = first.get("requirement")
            if req:
                return str(req)
    return "-"


def _fmt_float(v: Any) -> str:
    if v is None:
        return "-"
    try:
        return f"{float(v):.1f}"
    except (TypeError, ValueError):
        return str(v)


def _fmt_int(v: Any) -> str:
    if v is None:
        return "-"
    try:
        return str(int(v))
    except (TypeError, ValueError):
        return str(v)


def _build_markdown(summary: AppWorldBenchmarkSummary) -> str:
    completed = len(summary.results)
    selected = len(summary.selected_task_ids)
    pass_rate = (summary.succeeded_tasks / completed * 100) if completed else 0.0
    total_dur = sum(float(r.duration_seconds or 0) for r in summary.results)
    total_tokens = sum(int(r.total_tokens or 0) for r in summary.results)
    total_llm_calls = sum(r.llm_calls for r in summary.results)
    avg_dur = total_dur / completed if completed else 0.0
    avg_tokens = total_tokens / completed if completed else 0.0
    total_tests_passed = sum(len(r.evaluation.get("passes", [])) for r in summary.results)
    total_tests_total = sum(int(r.evaluation.get("num_tests", 0)) for r in summary.results)

    lines = [
        "# AppWorld Benchmark Report",
        "",
        "## Summary",
        "",
        "| Field | Value |",
        "| --- | --- |",
        f"| Experiment | {summary.experiment_name} |",
        f"| Dataset | {summary.dataset_name} |",
        f"| Completed | {completed}/{selected} |",
        f"| Succeeded | {summary.succeeded_tasks} |",
        f"| Failed | {summary.failed_tasks} |",
        f"| Pass rate | {pass_rate:.1f}% |",
        f"| Test pass | {total_tests_passed}/{total_tests_total} |",
        f"| Duration (sec) | {total_dur:.1f} (avg {avg_dur:.1f}) |",
        f"| Tokens | {total_tokens} (avg {avg_tokens:.0f}) |",
        f"| LLM calls | {total_llm_calls} (avg {total_llm_calls/completed:.1f}) |" if completed else "| LLM calls | 0 |",
        f"| Output dir | `{summary.output_dir}` |",
        f"| Benchmark JSON | `{summary.benchmark_json_path}` |",
        "",
        "## Per-task",
        "",
        "| Task | Status | Test pass | Sec | Tokens | LLM calls | Fail category |",
        "| --- | --- | ---: | ---: | ---: | ---: | --- |",
    ]

    for r in summary.results:
        status = "PASS" if r.success is True else "FAIL"
        t_pass = len(r.evaluation.get("passes", []))
        t_total = int(r.evaluation.get("num_tests", 0))
        test_str = f"{t_pass}/{t_total}" if t_total else "-"
        lines.append(
            f"| {r.task_id} | {status} | {test_str} | "
            f"{_fmt_float(r.duration_seconds)} | {_fmt_int(r.total_tokens)} | {_fmt_int(r.llm_calls)} | {_fail_category(r)} |"
        )

    failures = [r for r in summary.results if r.success is not True]
    if failures:
        lines.extend(["", "## Failure Details"])
        for r in failures:
            lines.extend([
                "",
                f"### {r.task_id}",
                "",
                f"- status: FAIL",
                f"- duration_sec: {_fmt_float(r.duration_seconds)}",
                f"- total_tokens: {_fmt_int(r.total_tokens)}",
                f"- fail_category: {_fail_category(r)}",
                f"- first_failure: {_first_failure(r.evaluation)}",
                f"- exception: {r.exception or '-'}",
            ])
            if r.compact_trajectory_path:
                lines.append(f"- trajectory: `{r.compact_trajectory_path}`")
            if r.appworld_task_output_dir:
                lines.append(f"- evaluation_report: `{r.appworld_task_output_dir}/evaluation/report.md`")

    return "\n".join(lines) + "\n"


def _write_reports(summary: AppWorldBenchmarkSummary, output_dir: Path) -> None:
    output_dir.mkdir(parents=True, exist_ok=True)
    json_path = output_dir / "appworld_benchmark.json"
    json_path.write_text(
        json.dumps(summary.model_dump(mode="json"), ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    md_path = output_dir / "appworld_benchmark.md"
    md_path.write_text(_build_markdown(summary), encoding="utf-8")


# ---------------------------------------------------------------------------
# Main benchmark loop
# ---------------------------------------------------------------------------

async def run_appworld_benchmark(
    *,
    dataset_name: str,
    experiment_name: str,
    task_ids: Sequence[str] | None = None,
    limit: int | None = None,
    offset: int = 0,
    remote_environment_url: str | None = None,
    remote_apis_url: str | None = None,
    task_timeout_seconds: int = _DEFAULT_TASK_TIMEOUT_SECONDS,
    run_official_evaluation: bool = False,
) -> AppWorldBenchmarkSummary:
    appworld_root = _resolve_appworld_root()
    appworld_module = _import_appworld(appworld_root)
    AppWorld = appworld_module.AppWorld
    load_task_ids_fn = appworld_module.load_task_ids

    # Force AppWorld benchmark settings
    settings.update(
        {
            "ADVANCED_FEATURES": {
                "BENCHMARK": "appworld",
                "MODE": "api",
                "TRACKER_ENABLED": True,
            }
        },
        merge=True,
    )
    os.environ["MCP_SERVERS_FILE"] = _APPWORLD_REGISTRY_CONFIG

    remote_environment_url = remote_environment_url or f"http://localhost:{settings.server_ports.environment_url}"
    remote_apis_url = remote_apis_url or f"http://localhost:{settings.server_ports.apis_url}"

    selected_task_ids, _ = _resolve_selected_task_ids(
        dataset_name=dataset_name,
        load_task_ids_fn=load_task_ids_fn,
        task_ids=task_ids,
        offset=offset,
        limit=limit,
    )

    tracker = ActivityTracker()
    tracker_experiment_name = tracker.start_experiment(
        task_ids=selected_task_ids,
        experiment_name=experiment_name,
        description=f"AppWorld LangGraph | dataset={dataset_name}",
    )

    appworld_output_dir = appworld_root / "experiments" / "outputs" / tracker_experiment_name
    tracker_base_dir = Path(tracker.get_base_dir())

    # Output layout: trajectory_data/{experiment_name}/{timestamp}/
    _ts = tracker_experiment_name[len(experiment_name) + 1:]
    output_dir = tracker_base_dir / experiment_name / _ts
    tasks_dir = output_dir / "tasks"
    tasks_dir.mkdir(parents=True, exist_ok=True)

    # Write INFO-level logs to a file; DEBUG stays on console only
    _log_sink_id = logger.add(
        output_dir / "run.log",
        level="INFO",
        format="{time:HH:mm:ss} | {level:<7} | {message}",
        encoding="utf-8",
    )

    results: list[AppWorldTaskResult] = []

    # Build a partial summary object we can update incrementally
    summary = AppWorldBenchmarkSummary(
        experiment_name=tracker_experiment_name,
        dataset_name=dataset_name,
        selected_task_ids=selected_task_ids,
        output_dir=str(output_dir),
        benchmark_json_path=str(output_dir / "appworld_benchmark.json"),
        benchmark_markdown_path=str(output_dir / "appworld_benchmark.md"),
        appworld_output_dir=str(appworld_output_dir),
    )

    for task_id in selected_task_ids:
        logger.info("Starting task {}", task_id)

        # Per-task output directory: tasks/{task_id}/
        task_dir = tasks_dir / task_id
        task_dir.mkdir(parents=True, exist_ok=True)
        task_appworld_dir = appworld_output_dir / "tasks" / task_id
        (task_appworld_dir / "logs").mkdir(parents=True, exist_ok=True)

        # Per-task log file at INFO level
        _task_log_sink_id = logger.add(
            task_dir / f"{task_id}.log",
            level="INFO",
            format="{time:HH:mm:ss} | {level:<7} | {message}",
            encoding="utf-8",
        )

        # Force-reset environment before every task to prevent stale state from
        # a previous timeout or failed close corrupting subsequent tasks.
        _reset_environment_state(remote_environment_url)

        instruction = ""
        start_time = time.perf_counter()
        exception_str: str | None = None
        final_answer = ""
        total_tokens = 0
        llm_calls = 0
        submitted_answer: Any = None
        submit_output: str | None = None
        evaluation: dict[str, Any] = {}
        evaluation_report: str | None = None
        success: bool | None = None

        try:
            with AppWorld(
                task_id=task_id,
                experiment_name=tracker_experiment_name,
                remote_environment_url=remote_environment_url,
                remote_apis_url=remote_apis_url,
            ) as world:  # noqa: SIM117
                instruction = str(world.task.instruction)
                task_datetime: str | None = None
                raw_dt = getattr(world.task, "datetime", None)
                if raw_dt is not None:
                    task_datetime = str(raw_dt.isoformat()) if hasattr(raw_dt, "isoformat") else str(raw_dt)

                _reset_registry_state()

                try:
                    final_answer, total_tokens, llm_calls = await asyncio.wait_for(
                        _run_langgraph_task(instruction, task_id, task_datetime, tracker),
                        timeout=task_timeout_seconds,
                    )
                except asyncio.TimeoutError:
                    exception_str = f"TimeoutError: exceeded {task_timeout_seconds}s"
                    logger.warning("Task {} timed out", task_id)
                    # Force-reset on timeout so the environment is clean for the next task
                    _reset_environment_state(remote_environment_url)
                except Exception as exc:
                    exception_str = f"{type(exc).__name__}: {exc}"
                    logger.exception("Task {} failed with exception", task_id)

                if not exception_str:
                    submitted_answer = _coerce_submission_value(final_answer)
                    submit_output = _submit_final_answer(world, submitted_answer)

                save_fn = getattr(world, "save", None)
                if callable(save_fn):
                    save_fn()

                if not exception_str:
                    evaluation, evaluation_report = _evaluate_world(world)
                    success = _extract_success(evaluation)

        except Exception as exc:
            close_error = f"{type(exc).__name__}: {exc}"
            if success is not None:
                # Evaluation already completed before __exit__ failed.
                # Log the close error but do NOT discard the evaluation result.
                logger.warning(
                    "Task {} world close failed (evaluation already done, keeping result): {}",
                    task_id, close_error,
                )
            elif exception_str:
                # Task already failed (e.g. timeout) — keep original error, log close error separately.
                logger.warning(
                    "Task {} world close also failed (original error: {}): {}",
                    task_id, exception_str, close_error,
                )
            else:
                exception_str = close_error
                logger.exception("Task {} outer exception", task_id)

        duration_seconds = round(time.perf_counter() - start_time, 3)

        fail_category = None
        if success is not True:
            fail_category = "exception" if exception_str else "evaluation_failed"

        tracker.finish_task(
            task_id=task_id,
            site=_task_site_from_str(instruction),
            intent=instruction,
            agent_answer=final_answer,
            eval=json.dumps(evaluation, ensure_ascii=False) if evaluation else None,
            score=1.0 if success else 0.0,
            exception=bool(exception_str),
            fail_category=fail_category,
            agent_v="langgraph_appworld",
            duration=duration_seconds,
            total_tokens=total_tokens,
        )

        # Save compact trajectory into per-task directory
        compact_path = _write_compact_trajectory(task_dir, task_id, instruction, tracker)
        logger.remove(_task_log_sink_id)

        task_result = AppWorldTaskResult(
            task_id=task_id,
            instruction=instruction,
            final_answer=final_answer,
            submitted_answer=submitted_answer,
            submit_output=submit_output,
            success=success,
            duration_seconds=duration_seconds,
            total_tokens=total_tokens,
            llm_calls=llm_calls,
            exception=exception_str,
            evaluation=evaluation,
            evaluation_report=evaluation_report,
            compact_trajectory_path=str(compact_path) if compact_path else None,
            appworld_task_output_dir=str(task_appworld_dir),
        )
        results.append(task_result)

        # Update summary and write report after every task
        succeeded_so_far = sum(1 for r in results if r.success is True)
        summary.results = results
        summary.total_tasks = len(results)
        summary.succeeded_tasks = succeeded_so_far
        summary.failed_tasks = len(results) - succeeded_so_far
        _write_reports(summary, output_dir)

        logger.info(
            "Task {} done | success={} | {:.1f}s | {}/{} passed",
            task_id,
            success,
            duration_seconds,
            succeeded_so_far,
            len(results),
        )

    if run_official_evaluation:
        _run_official_evaluation(tracker_experiment_name, dataset_name, appworld_root)

    logger.info(
        "Benchmark done: {}/{} passed | report: {}",
        summary.succeeded_tasks,
        summary.total_tasks,
        summary.benchmark_markdown_path,
    )
    logger.remove(_log_sink_id)

    # Remove the tracker's flat directory (trajectory_data/{experiment_name_timestamp}/)
    # — our nested output_dir already contains everything we need.
    tracker_flat_dir = tracker_base_dir / tracker_experiment_name
    if tracker_flat_dir.exists() and tracker_flat_dir != output_dir:
        shutil.rmtree(tracker_flat_dir, ignore_errors=True)
        logger.debug("Removed tracker flat dir: {}", tracker_flat_dir)

    return summary


def _task_site_from_str(instruction: str) -> str:
    return "appworld"


def _write_compact_trajectory(
    tasks_dir: Path, task_id: str, instruction: str, tracker: ActivityTracker
) -> Path | None:
    try:
        tasks_dir.mkdir(parents=True, exist_ok=True)
        # Aggregate LLM calls per node type
        llm_calls_per_node: dict[str, int] = {}
        for ev in getattr(tracker, "node_events", []):
            n = ev.get("node", "unknown")
            llm_calls_per_node[n] = llm_calls_per_node.get(n, 0) + ev.get("llm_calls", 0)

        compact = {
            "task_id": task_id,
            "instruction": instruction,
            "final_answer": tracker.final_answer,
            "total_tokens": tracker.token_usage,
            "total_llm_calls": getattr(tracker, "llm_call_count", 0),
            "llm_calls_per_node": llm_calls_per_node,
            "steps": [
                {"index": i + 1, "name": s.name, "data": s.data if hasattr(s, "data") else str(s)}
                for i, s in enumerate(tracker.steps or [])
            ],
        }
        path = tasks_dir / f"{task_id}.json"
        path.write_text(json.dumps(compact, ensure_ascii=False, indent=2), encoding="utf-8")
        return path
    except Exception as exc:
        logger.warning("Could not write compact trajectory for {}: {}", task_id, exc)
        return None


# ---------------------------------------------------------------------------
# CLI entry point
# ---------------------------------------------------------------------------

def run_main() -> None:
    parser = argparse.ArgumentParser(description="AppWorld benchmark for CUGA LangGraph agent")
    parser.add_argument("--dataset", default="dev", help="AppWorld dataset name")
    parser.add_argument("--task-id", action="append", dest="task_ids", help="Run specific task ID(s)")
    parser.add_argument("--experiment-name", default=None, help="Experiment name prefix")
    parser.add_argument("--offset", type=int, default=0, help="Skip first N tasks in dataset")
    parser.add_argument("--limit", type=int, default=None, help="Max number of tasks to run")
    parser.add_argument("--timeout", type=int, default=_DEFAULT_TASK_TIMEOUT_SECONDS, help="Per-task timeout in seconds")
    parser.add_argument("--env-url", default=None, help="AppWorld environment server URL")
    parser.add_argument("--api-url", default=None, help="AppWorld APIs server URL")
    parser.add_argument("--official-eval", action="store_true", help="Run official AppWorld evaluation at the end")
    args = parser.parse_args()

    experiment_name = args.experiment_name or args.dataset

    summary = asyncio.run(
        run_appworld_benchmark(
            dataset_name=args.dataset,
            experiment_name=experiment_name,
            task_ids=args.task_ids or None,
            limit=args.limit,
            offset=args.offset,
            remote_environment_url=args.env_url,
            remote_apis_url=args.api_url,
            task_timeout_seconds=args.timeout,
            run_official_evaluation=args.official_eval,
        )
    )

    print(f"\n{'='*60}")
    print(f"Experiment: {summary.experiment_name}")
    print(f"Pass rate:  {summary.succeeded_tasks}/{summary.total_tasks}")
    print(f"Report:     {summary.benchmark_markdown_path}")
    print(f"{'='*60}\n")


if __name__ == "__main__":
    run_main()
