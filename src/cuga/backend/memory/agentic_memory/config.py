from typing import Any
from cuga.config import settings, DBS_DIR
from cuga.backend.llm.models import LLMManager

import os
from dynaconf import Dynaconf  # type: ignore

llm_manager = LLMManager()


def _sanitize_vector_store_config(raw: dict) -> dict:
    cfg = dict(raw or {})
    # Coerce embedding_model_dims to int when possible
    dims = cfg.get("embedding_model_dims")
    if isinstance(dims, str) and dims.isdigit():
        cfg["embedding_model_dims"] = int(dims)
    return cfg


def get_config(namespace_id: str | None = None):
    # Use cached Dynaconf instance to avoid duplication and key normalization issues
    # settings = _get_settings()

    # The memory.toml groups relevant settings under [mem0_config]
    root = dict[Any, Any](settings.get("mem0_config", {}) or {})

    # Defensive deep copies and sanitization of nested configs
    vs = root.get("vector_store", {})
    vs_cfg = _sanitize_vector_store_config((vs or {}).get("config", {}))
    # Default milvus url/path under DBS_DIR if not provided
    default_milvus = os.path.join(DBS_DIR, "milvus.db")
    vs_url = os.environ.get('WXO_MILVUS_URI', vs_cfg.get("url", default_milvus))
    # If the configured url is a relative filesystem path, resolve it under DBS_DIR
    if isinstance(vs_url, str) and not (vs_url.startswith("http://") or vs_url.startswith("https://")):
        if not os.path.isabs(vs_url):
            vs_url = os.path.join(DBS_DIR, vs_url)
        # Ensure the parent directory exists for Milvus-lite local storage
        parent_dir = os.path.dirname(vs_url)
        if parent_dir:
            os.makedirs(parent_dir, exist_ok=True)
    vs_cfg["url"] = vs_url
    vs_cfg["token"] = (
        f'{os.environ.get("MILVUS_USERNAME", "root")}:{os.environ.get("MILVUS_PASSWORD", "Milvus")}'
    )

    # Prefer explicit namespace_id, then env var, then file/default
    vs_cfg["collection_name"] = namespace_id or os.environ.get(
        "MILVUS_COLLECTION", vs_cfg.get("collection_name", "memory")
    )
    cfg: dict = {}
    cfg["vector_store"] = {
        "provider": (vs or {}).get("provider", "milvus"),
        "config": vs_cfg,
    }

    llm_model = llm_manager.get_model(settings.memory.mem0.model)

    # Keep llm config as-is (mem0 handles it), but ensure structure
    cfg["llm"] = {
        "provider": settings.memory.mem0.model.platform,
        "config": {
            "model": llm_model.model_name,
            "temperature": llm_model.temperature,
            "openai_base_url": llm_model.openai_api_base,
            "max_tokens": llm_model.max_tokens,
        },
    }

    emb = root.get("embedder", {})
    emb_cfg = (emb or {}).get("config", {})
    cfg["embedder"] = {
        "provider": (emb or {}).get("provider", "huggingface"),
        "config": emb_cfg,
    }

    # Top-level defaults from [mem0_config]
    # Default history db under DBS_DIR if not provided; resolve relative paths under DBS_DIR
    history_path = root.get("history_db_path", os.path.join(DBS_DIR, "mem0_history.db"))
    if isinstance(history_path, str) and not os.path.isabs(history_path):
        history_path = os.path.join(DBS_DIR, history_path)
    cfg["history_db_path"] = history_path
    cfg["version"] = root.get("version", "v1.1")
    return cfg


def get_milvus_config():
    milvus_config = settings.milvus_config
    milvus_config_dict = milvus_config.to_dict()
    milvus_config_dict["step_processing"] = settings.memory.milvus.step_processing.model
    milvus_config_dict["fact_extraction"] = settings.memory.milvus.fact_extraction.model
    return Dynaconf(settings_files=[], environments=False, milvus_config=milvus_config_dict)


def get_tips_extractor_config():
    tips_extractor_config = settings.tips_extractor_config
    tips_extractor_config_dict = tips_extractor_config.to_dict()
    tips_extractor_config_dict.update(settings.memory.tips_extractor.model.to_dict())
    return Dynaconf(settings_files=[], environments=False, tips_extractor_config=tips_extractor_config_dict)


# Backward compatible module-level variables
config = get_config()
milvus_config = (
    get_milvus_config()
    if settings.features.memory_provider == "milvus"
    else Dynaconf(settings_files=[], environments=False, milvus_config={})
)
tips_extractor_config = get_tips_extractor_config().tips_extractor_config
