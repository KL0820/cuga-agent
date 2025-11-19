from cuga.backend.memory.agentic_memory.utils.logging import Logging
from sentence_transformers import SentenceTransformer
from pymilvus import MilvusClient
from dotenv import load_dotenv

load_dotenv()

logger = Logging.get_logger()


def get_milvus_client() -> MilvusClient:
    return MilvusClient("memory.db")


def get_chat_model(model_settings, max_tokens=None):
    """Create LLM instance using the unified LLMManager (compat wrapper).

    Note: Deprecated. Prefer using `LLMManager().get_model(model_settings, max_tokens)` directly.
    """
    # Lazy import to avoid circulars and keep compatibility
    from cuga.backend.llm.models import LLMManager

    # Determine max_tokens: prefer explicit arg, then settings, else keep legacy default 5000
    effective_max_tokens = max_tokens if max_tokens is not None else model_settings.get('max_tokens', 5000)

    # Ensure compatibility with LLMManager expecting objects that may implement to_dict()
    if isinstance(model_settings, dict) and not hasattr(model_settings, 'to_dict'):

        class _ModelSettingsWrapper(dict):
            def to_dict(self):
                return dict(self)

        model_settings = _ModelSettingsWrapper(model_settings)

    manager = LLMManager()
    return manager.get_model(model_settings, max_tokens=effective_max_tokens)


def get_embedding_model(model_name) -> SentenceTransformer:
    return SentenceTransformer(model_name)
