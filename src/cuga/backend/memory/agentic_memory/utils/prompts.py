import os
from collections import defaultdict
from langchain_core.prompts import PromptTemplate

# Prompts to transform a step into something that can be inserted into memory.
# For every prompt, the "summary" field is *required*. Every additional field will be added to the memory's metadata.
current_dir = os.path.dirname(__file__)
prompt_file = os.path.join(current_dir, "../llm/tips/prompts/default_step.jinja2")
step_prompt_inst = PromptTemplate.from_file(prompt_file, template_format="jinja2", encoding='utf-8')
DEFAULT_PROMPT = step_prompt_inst.template
prompts = defaultdict(lambda: DEFAULT_PROMPT)

prompts.update(
    {
        # Add custom node prompts here.
    }
)
