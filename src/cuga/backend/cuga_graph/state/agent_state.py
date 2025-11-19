from typing import Dict, List, Optional, Literal

from langchain_core.messages import AIMessage, BaseMessage
from pydantic import BaseModel, Field

from cuga.backend.cuga_graph.nodes.api.api_planner_agent.prompts.load_prompt import ApiDescription
from cuga.backend.cuga_graph.nodes.human_in_the_loop.followup_model import FollowUpAction, ActionResponse
from cuga.backend.cuga_graph.state.api_planner_history import (
    HistoricalAction,
)
from cuga.backend.cuga_graph.nodes.browser.browser_planner_agent.prompts.load_prompt import NextAgentPlan
from cuga.backend.cuga_graph.nodes.task_decomposition_planning.task_analyzer_agent.prompts.load_prompt import (
    AnalyzeTaskOutput,
)
from cuga.backend.cuga_graph.nodes.task_decomposition_planning.task_decomposition_agent.prompts.load_prompt import (
    TaskDecompositionPlan,
)


# from browsergym.core.env import BrowserEnv


class Prediction(BaseModel):
    action: str
    args: Optional[List[str]]


def default_state(page, observation, goal):
    return AgentState(input=goal, url=page.url if page else "")


class SubTaskHistory(BaseModel):
    sub_task: Optional[str] = None
    steps: List[str] = Field(default_factory=list)
    final_answer: Optional[str] = None


class AnalyzeTaskAppsOutput(BaseModel):
    name: str
    description: Optional[str] = None
    url: Optional[str] = None
    type: Literal['api', 'web'] = 'web'


class AgentState(BaseModel):
    next: Optional[str] = ""  # The 'next' field indicates where to route to next
    # pages: Annotated[Sequence[str], operator.add]  # List of pages traversed
    # page: Page  # The Playwright web page lets us interact with the web environment
    user_id: Optional[str] = "default"  # TODO: this should be updated in multi user scenario
    current_datetime: Optional[str] = ""
    current_app: Optional[str] = None
    current_app_description: Optional[str] = None
    api_last_step: Optional[str] = None
    guidance: Optional[str] = None
    chat_messages: Optional[List[BaseMessage]] = Field(default_factory=list)
    chat_agent_messages: Optional[List[BaseMessage]] = Field(default_factory=list)
    api_intent_relevant_apps: Optional[List[AnalyzeTaskAppsOutput]] = None
    api_intent_relevant_apps_current: Optional[List[AnalyzeTaskAppsOutput]] = None
    shortlister_relevant_apps: Optional[List[str]] = None
    shortlister_query: Optional[str] = None
    coder_task: Optional[str] = None
    coder_variables: Optional[List[str]] = None
    coder_relevant_apis: Optional[list[ApiDescription]] = None
    api_planner_codeagent_filtered_schemas: Optional[str] = None
    api_planner_codeagent_plan: Optional[str] = None
    api_app_schema_map: Optional[Dict] = None
    api_shortlister_planner_filtered_apis: Optional[str] = None
    api_shortlister_all_filtered_apis: Optional[dict] = None
    sub_task: Optional[str] = None
    api_planner_history: Optional[List[HistoricalAction]] = Field(default_factory=list)
    api_planner_human_consultations: Optional[List[Dict]] = Field(default_factory=list)
    sub_task_app: Optional[str] = None
    sub_task_type: Optional[Literal['web', 'api']] = None
    input: str  # User request
    last_planner_answer: Optional[str] = None
    last_question: Optional[str] = None
    final_answer: Optional[str] = ""
    task_decomposition: Optional[TaskDecompositionPlan] = None
    sub_tasks_progress: Optional[List[str]] = Field(default_factory=list)
    prediction: Optional[Prediction] = None  # The Agent's output
    feedback: Optional[List[Dict]] = Field(default_factory=list)
    # A system message (or messages) containing the intermediate steps]
    sites: Optional[List[str]] = None
    scratchpad: Optional[List[BaseMessage]] = Field(default_factory=list)
    observation: Optional[str] = ""  # The most recent response from a tool
    annotations: Optional[List[str]] = Field(default_factory=list)  # Annotations for the current page
    actions: Optional[str] = ""  # The chosen actions
    url: str  # The URL of the current page
    elements_as_string: Optional[str] = ""
    focused_element_bid: Optional[str] = None
    elements: str = ""  # The elements on the page
    messages: Optional[List[AIMessage]] = Field(
        default_factory=list
    )  # The messages exchanged between the user and the agent
    sender: Optional[str] = ""
    previous_steps: Optional[List[NextAgentPlan]] = Field(default_factory=list)
    stm_steps_history: Optional[List[str]] = Field(default_factory=list)
    stm_all_history: Optional[List[SubTaskHistory]] = Field(default_factory=list)
    next_step: Optional[str] = ""
    task_analyzer_output: Optional[AnalyzeTaskOutput] = None
    plan: Optional[NextAgentPlan] = None
    plan_next_agent: Optional[str] = ""
    pi: Optional[str] = ""
    hitl_action: Optional[FollowUpAction] = None
    hitl_response: Optional[ActionResponse] = None
    update_plan_reason: Optional[str] = "First plan to be created"
    read_page: Optional[str] = ""  # The outer text of the page
    env_policy: List[dict] = Field(default_factory=list)
    tool_call: Optional[dict] = None

    # def add_api_output_to_last_step(
    #     self,
    #     output: AgentOutputHistory
    # ):
    #     self.api_planner_history[-1].agent_output = output
    def append_to_last_chat_message(self, value: str):
        # msg = self.chat_agent_messages[-1]
        # # Update the last message with appended content
        self.chat_agent_messages[-1].content += value

    def format_subtask(self):
        return "{} (type = '{}', app='{}')".format(self.sub_task, self.sub_task_type, self.sub_task_app[:30])
