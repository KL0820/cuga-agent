import json

import pytest
from pydantic import ValidationError
from langchain_core.messages import AIMessage

from cuga.backend.cuga_graph.nodes.task_decomposition_planning.mode_constraints import (
    InvalidSubtaskTypeForModeError,
    get_allowed_subtask_types,
    validate_subtask_types_for_mode,
)
from cuga.backend.cuga_graph.nodes.task_decomposition_planning.plan_controller_agent.plan_controller_agent import (
    PlanControllerAgent,
)
from cuga.backend.cuga_graph.nodes.task_decomposition_planning.plan_controller_agent.prompts.load_prompt import (
    PlanControllerOutput,
)


def test_get_allowed_subtask_types_by_mode():
    assert get_allowed_subtask_types("api") == ("api",)
    assert get_allowed_subtask_types("web") == ("web",)
    assert get_allowed_subtask_types("hybrid") == ("api", "web")


def test_validate_subtask_types_for_mode_rejects_disallowed_type():
    with pytest.raises(InvalidSubtaskTypeForModeError):
        validate_subtask_types_for_mode(["web"], "api", context="test")

    with pytest.raises(InvalidSubtaskTypeForModeError):
        validate_subtask_types_for_mode(["api"], "web", context="test")


def test_plan_controller_output_rejects_web_in_api_mode():
    with pytest.raises(ValidationError, match="disallowed subtask types"):
        PlanControllerOutput.model_validate(
            {
                "thoughts": ["Need to continue."],
                "subtasks_progress": ["in-progress"],
                "next_subtask": "Open the page and continue.",
                "next_subtask_type": "web",
                "next_subtask_app": "",
                "conclude_task": False,
                "conclude_final_answer": "",
            },
            context={"execution_mode": "api"},
        )


def test_plan_controller_output_allows_web_in_hybrid_mode():
    output = PlanControllerOutput.model_validate(
        {
            "thoughts": ["Need to continue."],
            "subtasks_progress": ["in-progress"],
            "next_subtask": "Open the page and continue.",
            "next_subtask_type": "web",
            "next_subtask_app": "",
            "conclude_task": False,
            "conclude_final_answer": "",
        },
        context={"execution_mode": "hybrid"},
    )

    assert output.next_subtask_type == "web"


def test_plan_controller_output_allows_concluded_clarification_in_api_mode():
    output = PlanControllerOutput.model_validate(
        {
            "thoughts": ["The task is blocked on user clarification."],
            "subtasks_progress": ["in-progress"],
            "next_subtask": "",
            "next_subtask_type": None,
            "next_subtask_app": "",
            "conclude_task": True,
            "conclude_final_answer": "Please provide the missing account identifier.",
        },
        context={"execution_mode": "api"},
    )

    assert output.conclude_task is True
    assert output.next_subtask_type is None


class StubChain:
    def __init__(self, outputs):
        self.outputs = outputs
        self.calls = 0

    async def ainvoke(self, data):
        output = self.outputs[self.calls]
        self.calls += 1
        return AIMessage(content=json.dumps(output), name="stub")


@pytest.mark.asyncio
async def test_plan_controller_agent_retries_once_for_mode_mismatch():
    agent = PlanControllerAgent.__new__(PlanControllerAgent)
    agent.name = "PlanControllerAgent"
    agent.chain = StubChain(
        [
            {
                "thoughts": ["Need to continue."],
                "subtasks_progress": ["in-progress"],
                "next_subtask": "Open the page.",
                "next_subtask_type": "web",
                "next_subtask_app": "",
                "conclude_task": False,
                "conclude_final_answer": "",
            },
            {
                "thoughts": ["Need to continue."],
                "subtasks_progress": ["in-progress"],
                "next_subtask": "Continue with the Venmo API.",
                "next_subtask_type": "api",
                "next_subtask_app": "venmo",
                "conclude_task": False,
                "conclude_final_answer": "",
            },
        ]
    )

    result = await PlanControllerAgent._run_with_mode_retry(
        agent,
        data={},
        execution_mode="api",
    )

    assert agent.chain.calls == 2
    assert json.loads(result.content)["next_subtask_type"] == "api"
