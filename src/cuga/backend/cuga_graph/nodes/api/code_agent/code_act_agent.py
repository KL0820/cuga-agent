# Copyright (c) 2025 LangChain
# Modifications Copyright 2025 CUGA
# Licensed under the MIT License

import inspect
from typing import Any, Awaitable, Callable, Optional, Sequence, Type, TypeVar, Union

from langchain_core.language_models import BaseChatModel
from langchain_core.tools import StructuredTool
from langchain_core.tools import tool as create_tool
from langgraph.graph import END, START, MessagesState, StateGraph
from langgraph.types import Command
import re

EvalFunction = Callable[[str, dict[str, Any]], tuple[str, dict[str, Any]]]
EvalCoroutine = Callable[[str, dict[str, Any]], Awaitable[tuple[str, dict[str, Any]]]]


BACKTICK_PATTERN = r'```python(.*?)```'


def extract_and_combine_codeblocks(text: str) -> str:
    """
    Extracts all codeblocks from a text string and combines them into a single code string.

    Args:
        text: A string containing zero or more codeblocks, where each codeblock is
            surrounded by triple backticks (```).

    Returns:
        A string containing the combined code from all codeblocks, with each codeblock
        separated by a newline.

    Example:
        text = '''Here's some code:

        ```python
        print('hello')
        ```
        And more:

        ```
        print('world')
        ```'''

        result = extract_and_combine_codeblocks(text)

        Result:

        print('hello')

        print('world')
    """
    # First check if the full text is already valid Python code

    # Find all code blocks in the text using regex
    # Pattern matches anything between triple backticks, with or without a language identifier
    code_blocks = re.findall(BACKTICK_PATTERN, text, re.DOTALL)

    if not code_blocks:
        try:
            compile(text.strip().replace('await ', ''), '<string>', 'exec')
            return text.strip()
        except SyntaxError:
            return ""

    # Process each codeblock
    processed_blocks = []
    for block in code_blocks:
        # Strip leading and trailing whitespace
        block = block.strip()
        processed_blocks.append(block)

    # Combine all codeblocks with newlines between them
    combined_code = "\n\n".join(processed_blocks)
    return combined_code


EvalFunction = Callable[[str, dict[str, Any]], tuple[str, dict[str, Any]]]
EvalCoroutine = Callable[[str, dict[str, Any]], Awaitable[tuple[str, dict[str, Any]]]]


class CodeActState(MessagesState):
    """State for CodeAct agent."""

    script: Optional[str]
    """The Python code script to be executed."""
    context: dict[str, Any]
    """Dictionary containing the execution context with available tools and variables."""


StateSchema = TypeVar("StateSchema", bound=CodeActState)
StateSchemaType = Type[StateSchema]


def create_default_prompt(tools: list[StructuredTool], base_prompt: Optional[str] = None):
    """Create default prompt for the CodeAct agent."""
    tools = [t if isinstance(t, StructuredTool) else create_tool(t) for t in tools]
    prompt = f"{base_prompt}\n\n" if base_prompt else ""
    prompt += """You will be given a task to perform. You should output either
- a Python code snippet that provides the solution to the task, or a step towards the solution. Any output you want to extract from the code should be printed to the console. Code should be output in a fenced code block.
- text to be shown directly to the user, if you want to ask for more information or provide the final answer.

In addition to the Python Standard Library, you can use the following functions:
"""

    for tool in tools:
        prompt += f'''
def {tool.name}{str(inspect.signature(tool.func))}:
    """{tool.description}"""
    ...
'''

    prompt += """

Variables defined at the top level of previous code snippets can be referenced in your code.

Reminder: use Python code snippets to call tools"""
    return prompt


def create_codeact(
    model: BaseChatModel,
    tools: Sequence[Union[StructuredTool, Callable]],
    eval_fn: Union[EvalFunction, EvalCoroutine],
    *,
    prompt: Optional[str] = None,
    state_schema: StateSchemaType = CodeActState,
) -> StateGraph:
    """Create a CodeAct agent.

    Args:
        model: The language model to use for generating code
        tools: List of tools available to the agent. Can be passed as python functions or StructuredTool instances.
        eval_fn: Function or coroutine that executes code in a sandbox. Takes code string and locals dict,
            returns a tuple of (stdout output, new variables dict)
        prompt: Optional custom system prompt. If None, uses default prompt.
            To customize default prompt you can use `create_default_prompt` helper:
            `create_default_prompt(tools, "You are a helpful assistant.")`
        state_schema: The state schema to use for the agent.

    Returns:
        A StateGraph implementing the CodeAct architecture
    """
    tools = [t if isinstance(t, StructuredTool) else create_tool(t) for t in tools]

    if prompt is None:
        prompt = create_default_prompt(tools)

    # Make tools available to the code sandbox
    tools_context = {tool.name: tool.func for tool in tools}

    async def call_model(state: StateSchema) -> Command:
        messages = [{"role": "system", "content": prompt}] + state["messages"]
        # Disable tool calling by binding no tools
        model_without_tools = model
        response = await model_without_tools.ainvoke(messages, config={"tool_choice": "none"})
        # Extract and combine all code blocks
        content = response.content
        reasoning_content = response.additional_kwargs.get('reasoning_content')
        if not content or (reasoning_content and '```python' in reasoning_content):
            content = reasoning_content or content
        code = extract_and_combine_codeblocks(content)
        if code:
            return Command(goto="sandbox", update={"messages": [response], "script": code})
        else:
            # No code block found - continue to generate code
            # Add instruction to generate code
            planning_response = response.content
            return Command(
                update={"messages": [{"role": "assistant", "content": planning_response}], "script": None}
            )

    # If eval_fn is a async, we define async node function.
    if inspect.iscoroutinefunction(eval_fn):

        async def sandbox(state: StateSchema):
            existing_context = state.get("context", {})
            context = {**existing_context, **tools_context}
            # Execute the script in the sandbox
            output, new_vars = await eval_fn(state["script"], context)
            new_context = {**existing_context, **new_vars}
            # Return execution output as a user message so the model sees it
            return {
                "messages": [{"role": "user", "content": f"Execution output:\n{output}"}],
                "context": new_context,
            }
    else:

        def sandbox(state: StateSchema):
            existing_context = state.get("context", {})
            context = {**existing_context, **tools_context}
            # Execute the script in the sandbox
            output, new_vars = eval_fn(state["script"], context)
            new_context = {**existing_context, **new_vars}
            # Return execution output as a user message so the model sees it
            return {
                "messages": [{"role": "user", "content": f"Execution output:\n{output}"}],
                "context": new_context,
            }

    agent = StateGraph(state_schema)
    agent.add_node(call_model, destinations=(END, "sandbox"))
    agent.add_node(sandbox)
    agent.add_edge(START, "call_model")
    agent.add_edge("sandbox", "call_model")
    return agent
