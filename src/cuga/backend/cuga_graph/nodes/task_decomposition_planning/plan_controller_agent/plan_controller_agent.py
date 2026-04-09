import json
from typing import Any

from langchain_core.language_models import BaseChatModel
from langchain_core.messages import AIMessage
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnableLambda
from pydantic import ValidationError

from cuga.backend.activity_tracker.tracker import ActivityTracker
from cuga.backend.cuga_graph.nodes.shared.base_agent import BaseAgent
from cuga.backend.cuga_graph.state.agent_state import AgentState
from cuga.backend.cuga_graph.nodes.task_decomposition_planning.mode_constraints import (
    get_allowed_subtask_types,
    is_invalid_subtask_type_validation_error,
)
from cuga.backend.cuga_graph.nodes.task_decomposition_planning.plan_controller_agent.prompts.load_prompt import (
    PlanControllerOutput,
    parser,
)
from cuga.backend.llm.models import LLMManager
from cuga.backend.llm.utils.helpers import load_prompt_simple
from cuga.config import settings
from cuga.configurations.instructions_manager import InstructionsManager
from loguru import logger

instructions_manager = InstructionsManager()
tracker = ActivityTracker()
llm_manager = LLMManager()


class PlanControllerAgent(BaseAgent):
    def __init__(self, prompt_template: ChatPromptTemplate, llm: BaseChatModel, tools: Any = None):
        super().__init__()
        self.name = "PlanControllerAgent"
        parser = RunnableLambda(PlanControllerAgent.output_parser)
        # if not enable_format:
        self.chain = BaseAgent.get_chain(prompt_template, llm, PlanControllerOutput) | (
            parser.bind(name=self.name)
        )

        # else:
        # self.chain = prompt_template | llm | controller_step_parser | (parser.bind(name=self.name))

    @staticmethod
    def output_parser(result: PlanControllerOutput, name) -> Any:
        logger.debug(
            f"\n\n------\n\nPlanControllerOutput: {json.dumps(result.model_dump(), indent=4)} \n\n------\n\n"
        )
        result = AIMessage(content=json.dumps(result.model_dump()), name=name)
        return result

    @staticmethod
    def _build_mode_retry_instructions(
        base_instructions: str | None,
        execution_mode: str,
        correction_feedback: str,
        previous_invalid_output: str,
    ) -> str:
        allowed_subtask_types = ", ".join(sorted(get_allowed_subtask_types(execution_mode)))
        retry_instructions = (
            "Execution mode hard contract:\n"
            f"- Current execution mode: {execution_mode}\n"
            f"- Allowed next_subtask_type values: {allowed_subtask_types}\n"
            f"- {correction_feedback}\n"
            "Previous invalid output:\n"
            f"{previous_invalid_output}\n"
            "Regenerate the full JSON. The non-concluded next_subtask_type must respect the execution mode hard contract."
        )
        return retry_instructions if not base_instructions else f"{base_instructions}\n\n{retry_instructions}"

    async def _run_with_mode_retry(
        self,
        data: dict[str, Any],
        execution_mode: str,
        base_instructions: str | None = None,
    ) -> AIMessage:
        retry_instructions = base_instructions or ""

        for attempt in range(2):
            data["instructions"] = retry_instructions
            result = await self.chain.ainvoke(data)

            try:
                validated_output = PlanControllerOutput.model_validate_json(
                    result.content,
                    context={"execution_mode": execution_mode},
                )
            except ValidationError as exc:
                if attempt == 0 and is_invalid_subtask_type_validation_error(exc):
                    retry_instructions = self._build_mode_retry_instructions(
                        base_instructions=base_instructions,
                        execution_mode=execution_mode,
                        correction_feedback=str(exc),
                        previous_invalid_output=result.content,
                    )
                    logger.warning(
                        "PlanControllerAgent produced a disallowed subtask type for mode {}. "
                        "Retrying once with correction feedback.",
                        execution_mode,
                    )
                    continue
                raise

            return AIMessage(content=json.dumps(validated_output.model_dump()), name=self.name)

        raise RuntimeError("PlanControllerAgent retry loop exited unexpectedly")

    async def run(self, input_variables: AgentState) -> AIMessage:
        logger.info(
            f"PlanControllerAgent received - Variables count: {input_variables.variables_manager.get_variable_count()}"
        )
        logger.info(
            f"PlanControllerAgent received - Variables names: {input_variables.variables_manager.get_variable_names()}"
        )
        logger.info(
            f"PlanControllerAgent received - Storage keys: {list(input_variables.variables_storage.keys())}"
        )
        logger.info(f"PlanControllerAgent received - Counter: {input_variables.variable_counter_state}")
        logger.info(
            f"PlanControllerAgent received - Creation order: {input_variables.variable_creation_order}"
        )

        task_input = {
            "task_decomposition": input_variables.task_decomposition.format_as_list(),
            "stm_all_history": [item.model_dump() for item in input_variables.stm_all_history]
            if input_variables.stm_all_history
            else [],
        }
        data = input_variables.model_dump()
        if tracker.images and len(tracker.images) > 0:
            data["img"] = tracker.images[-1]
        data["task_decomposition"] = task_input["task_decomposition"]
        data["stm_all_history"] = task_input["stm_all_history"]
        data["sub_tasks_progress"] = input_variables.sub_tasks_progress or []
        data["variables_history"] = input_variables.variables_manager.get_variables_summary(last_n=15)
        logger.info(
            f"Variables history being passed to prompt (length: {len(data['variables_history'])} chars):"
        )
        logger.info(
            f"{data['variables_history'][:500]}..."
            if len(data['variables_history']) > 500
            else data['variables_history']
        )
        base_instructions = instructions_manager.get_instructions(self.name)
        data["instructions"] = base_instructions
        # Add API applications list
        data["api_applications_list"] = [
            app.name for app in input_variables.api_intent_relevant_apps or [] if app.type == 'api'
        ]
        return await self._run_with_mode_retry(data, settings.advanced_features.mode, base_instructions)

    @staticmethod
    def create():
        dyna_model = settings.agent.plan_controller.model
        return PlanControllerAgent(
            prompt_template=load_prompt_simple(
                "./prompts/system.jinja2",
                "./prompts/user.jinja2",
                model_config=dyna_model,
                format_instructions=BaseAgent.get_format_instructions(parser),
            ),
            llm=llm_manager.get_model(dyna_model),
        )
