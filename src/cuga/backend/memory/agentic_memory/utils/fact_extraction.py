import ast
import os
from datetime import datetime
import threading
from langchain.prompts import PromptTemplate
from cuga.backend.memory.agentic_memory.utils.logging import Logging
from cuga.backend.memory.agentic_memory.utils.utils import (
    get_embedding_model,
    get_milvus_client,
    get_chat_model,
)
from cuga.backend.memory.agentic_memory.config import milvus_config
from cuga.backend.memory.agentic_memory.schema import Fact, Message

messages_tracker = {}
logger = Logging.get_logger()


def process_messages(namespace_id: str, messages: list[Message]) -> None:
    """Maintains messages Q for individual namespaces. Performs the fact CRUD operations as the background process

    Args:
        namespace_id (str): namespace for which the messages should be processed
        messages (list[Message]): Messages to be processed
    """
    logger.debug(f"Processing messages for namespace: {namespace_id}")
    max_len = milvus_config.get("max_num_messages", '10')

    # if messages for a specific namespace has reached its limit, perform the fact extraction
    # Otherwise simply add to the queue and return
    # TODO: Summarizer can be triggered along with the fact extraction.
    if namespace_id in messages_tracker:
        existing_count = len(messages_tracker[namespace_id])
        curr_count = len(messages)
        if int(existing_count) + int(curr_count) >= max_len:
            logger.debug(
                f"MAX Q-Len reached for namespace {namespace_id}. Total messages: {int(curr_count) + len(messages)}. Performing fact extraction"
            )
            all_messages = messages_tracker[namespace_id]
            all_messages.extend(messages)
            threading.Thread(target=extract_and_store_facts, args=(namespace_id, all_messages)).start()
            logger.debug(f"Removing namespace {namespace_id} from messages Q.")
            del messages_tracker[namespace_id]
        else:
            messages_tracker[namespace_id].extend(messages)
            logger.debug(f"Q-Len for namespace {namespace_id}:  {len(messages_tracker[namespace_id])}")
    else:
        if len(messages) >= max_len:
            logger.debug(
                f"Received messages for namespace {namespace_id} exceeds max Q-Len:  Total messages: {len(messages)}. Performing fact extraction."
            )
            threading.Thread(target=extract_and_store_facts, args=(namespace_id, messages)).start()
        else:
            messages_tracker[namespace_id] = messages
            logger.debug(
                f"Added messages to Q for namespace {namespace_id}:  Total messages: {len(messages_tracker[namespace_id])}"
            )
    logger.debug("Done")
    return


def extract_and_store_facts(namespace_id: str, messages: list[Message]) -> str:
    """Extracts and stores facts

    Args:
        namespace_id (str): namespace for which fact extraction should be performed
        messages (list[Message]): List of messages

    Returns:
        str: Returns status as "Done" after fact extraction completes.
    """
    llm = get_chat_model(milvus_config.fact_extraction)
    # extract facts
    filtered_messages = [m.content for m in messages if m.role == 'user']
    messages_str = ""
    for one_msg in filtered_messages:
        messages_str += one_msg
        messages_str += "\n"

    current_datetime = datetime.now()
    prompt_input = {"current_datetime": current_datetime, "user_messages": messages_str}
    current_dir = os.path.dirname(__file__)
    prompt_file = os.path.join(current_dir, "../tips/prompts/fact_extraction.jinja2")
    fact_ext_inst = PromptTemplate.from_file(prompt_file, template_format="jinja2", encoding='utf-8')
    fact_ext_prompt = fact_ext_inst.format(**prompt_input)

    llm_output = llm.invoke(fact_ext_prompt).content

    # Parse facts and store them
    milvus = get_milvus_client()
    embedding_model = get_embedding_model(
        milvus_config.get('embedding_mode', 'sentence-transformers/all-MiniLM-L6-v2')
    )
    try:
        llm_output = ast.literal_eval(llm_output)
        if isinstance(llm_output, dict):
            facts = llm_output['facts']
            if isinstance(facts, list):
                if len(facts) > 0:
                    for one_fact in facts:
                        fact = Fact(content=one_fact)
                        fact_data = fact.model_dump()
                        # Use fact's metadata if provided, otherwise default to empty dict for Milvus compatibility
                        if fact_data.get('metadata') is None:
                            fact_data['metadata'] = {}

                        upsert = milvus.insert(
                            collection_name=namespace_id,
                            data={**fact_data, 'embedding': embedding_model.encode(fact.content)},
                        )
                        print(upsert['ids'])
                else:
                    logger.debug(f"No Facts or invalid format: {llm_output}")
    except (SyntaxError, ValueError) as _:
        logger.debug("Facts not formatted properly")

    return
