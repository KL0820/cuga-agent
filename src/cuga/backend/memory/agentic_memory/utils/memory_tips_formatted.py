import os
from langchain_core.prompts import PromptTemplate
from cuga.backend.memory.memory import Memory


def get_formatted_tips(namespace_id: str, agent_id: str, query: str, limit: int):
    """
    Fetch the tips for a given query for a specific agent and return a formatted string that can directly be embedded in existing prompt.
    """
    tips_str = None

    memory = Memory()
    rtrvd_tips = memory.get_matching_tips(
        namespace_id=namespace_id, agent_id=agent_id, query=query, limit=limit
    )

    if len(rtrvd_tips) > 0:
        current_dir = os.path.dirname(__file__)
        prompt_file = os.path.join(current_dir, "../llm/tips/prompts/tips_inclusion.jinja2")
        tips_inclusion_inst = PromptTemplate.from_file(
            prompt_file, template_format="jinja2", encoding='utf-8'
        )
        prompt_input = {"tips": rtrvd_tips}
        tips_str = tips_inclusion_inst.format(**prompt_input)
    return tips_str
