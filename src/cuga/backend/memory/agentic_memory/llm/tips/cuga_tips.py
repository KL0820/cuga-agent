import json
import uuid
from typing import Optional

from cuga.backend.memory.agentic_memory.utils.logging import Logging
from cuga.backend.memory.agentic_memory.llm.tips.cuga_tips_extractor import TipsExtractor
from timeit import default_timer as timer

logger = Logging.get_logger()


async def extract_cuga_tips_from_data(data: Optional[dict]) -> (dict, str):
    """
    Extract and store CUGA tips from trajectory data.
    Compatible with the existing API endpoint interface.

    Args:
        data: Dictionary containing trajectory data

    Returns:
        Dictionary containing extracted tips organized by agent
    """
    # Ensure we always return a tuple (tips_by_agent, trajectory_id)
    if data is None:
        raise RuntimeError("No trajectory data provided for tips extraction")

    trajectory_id = f"api_{uuid.uuid4().hex[:8]}"
    if isinstance(data, dict) and data.get("trajectory_id"):
        trajectory_id = data["trajectory_id"]

    # Check if we received processed viewer output or raw trajectory data
    if "trajectory_text" in data:
        # Use the processed viewer output text
        trajectory_text = data["trajectory_text"]
        trajectory_id = data.get("trajectory_id", trajectory_id)
    else:
        # Fall back to raw JSON processing (less effective)
        trajectory_text = json.dumps(data, indent=2)
        trajectory_id = f"api_{uuid.uuid4().hex[:8]}"

    extractor = TipsExtractor()

    if not extractor.llm:
        raise RuntimeError("LLM not available for tips extraction")

    logger.info(f"Processing trajectory: {trajectory_id}")
    start = timer()
    tips_by_agent = await extractor.extract_tips_from_trajectory(
        trajectory_text, trajectory_id, focus_on_failures=True
    )
    end = timer()

    logger.info(f"Finished processing trajectory: {trajectory_id} in {end - start} seconds")

    return tips_by_agent, trajectory_id
