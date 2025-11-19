from json import JSONDecodeError

import json

import uuid
from fastapi import HTTPException

from cuga.backend.memory.agentic_memory.backend.base import BaseMemoryBackend
from cuga.backend.memory.agentic_memory.config import milvus_config
from cuga.backend.memory.agentic_memory.db.sqlite_manager import SQLiteManager
from cuga.backend.memory.agentic_memory.schema import fact_schema, Fact, RecordedFact, Message, Namespace, Run
from cuga.backend.memory.agentic_memory.utils.fact_extraction import process_messages
from cuga.backend.memory.agentic_memory.utils.logging import Logging
from cuga.backend.memory.agentic_memory.utils.utils import (
    get_milvus_client,
    get_embedding_model,
    get_chat_model,
)
from collections.abc import Generator

logger = Logging.get_logger()


class MilvusMemoryBackend(BaseMemoryBackend):
    milvus = get_milvus_client()
    embedding_model = get_embedding_model('sentence-transformers/all-MiniLM-L6-v2')

    def ready(self):
        _ = self.milvus.list_collections()
        return {"status": "ok"}

    def validate_namespace(self, namespace_id: str):
        if not self.milvus.has_collection(namespace_id):
            raise LookupError(f"Namespace {namespace_id}' not found")

    def create_namespace(
        self,
        namespace_id: str | None = None,
        user_id: str | None = None,
        agent_id: str | None = None,
        app_id: str | None = None,
    ) -> Namespace:
        """Create a new namespace for facts to exist in."""
        namespace_id = 'ns_' + str(uuid.uuid4()).replace('-', '_')

        if not self.milvus.has_collection(namespace_id):
            self.milvus.create_collection(
                collection_name=namespace_id, dimension=768, auto_id=False, schema=fact_schema
            )

        with SQLiteManager() as db_manager:
            return db_manager.create_namespace(namespace_id, user_id, agent_id, app_id)

    def get_namespace_details(self, namespace_id: str) -> Namespace:
        self.validate_namespace(namespace_id)

        with SQLiteManager() as db_manager:
            namespace = db_manager.get_namespace(namespace_id)
            namespace.num_entities = self.milvus.get_collection_stats(namespace_id)['row_count']
            return namespace

    def all_namespaces(self) -> list[Namespace]:
        with SQLiteManager() as db_manager:
            return db_manager.all_namespaces()

    def search_namespaces(
        self,
        user_id: str | None = None,
        agent_id: str | None = None,
        app_id: str | None = None,
        limit: int = 10,
    ) -> Generator[Namespace]:
        with SQLiteManager() as db_manager:
            for namespace in db_manager.search_namespaces(user_id, agent_id, app_id, limit):
                namespace.num_entities = self.milvus.get_collection_stats(namespace.id)['row_count']
                yield namespace

    def delete_namespace(self, namespace_id: str):
        """Delete a namespace that facts exist in."""
        self.milvus.drop_collection(collection_name=namespace_id)

        with SQLiteManager() as db_manager:
            db_manager.delete_namespace(namespace_id)

    def create_and_store_fact(self, namespace_id: str, fact: Fact) -> str:
        self.validate_namespace(namespace_id)

        # Use fact's metadata if provided, otherwise default to empty dict for Milvus compatibility
        fact_data = fact.model_dump()
        if fact_data.get('metadata') is None:
            fact_data['metadata'] = {}

        return str(
            self.milvus.insert(
                collection_name=namespace_id,
                data={**fact_data, 'embedding': self.embedding_model.encode(fact.content)},
            )['ids'][0]
        )

    def search_for_facts(
        self, namespace_id: str, query: str | None = None, limit: int = 10, filters: dict | None = None
    ) -> list[RecordedFact]:
        self.validate_namespace(namespace_id)

        if query is None:
            return [
                RecordedFact.model_validate(i)
                for i in self.milvus.query(
                    collection_name=namespace_id,
                    filter='AND'.join(['id > 0'] + [f"{k} == '{v}'" for k, v in filters.items()]),
                )
            ]
        else:
            return [
                RecordedFact.model_validate(i)
                for i in self.milvus.query(
                    collection_name=namespace_id,
                    anns_field='embedding',
                    data=[self.embedding_model.encode(query)],
                    filter='AND'.join([f"{k} == '{v}'" for k, v in filters.items()]),
                    limit=limit,
                    search_params={"metric_type": "IP"},
                )
            ]

    def delete_fact_by_id(self, namespace_id: str, fact_id: str):
        fact_id = int(fact_id)
        self.validate_namespace(namespace_id)
        self.milvus.delete(collection_name=namespace_id, ids=[fact_id])

    def extract_facts_from_messages(self, namespace_id: str, messages: list[Message]) -> str:
        """Takes a list of messages between a user and a chatbot, extracting and storing facts about the user,
        their personal preferences, upcoming plans, professional details, and other miscellaneous information.
        """
        self.validate_namespace(namespace_id)
        process_messages(namespace_id, messages)
        return f'{len(messages)} messages received for namespace {namespace_id}'

    def create_run(self, namespace_id: str, run_id: str) -> Run:
        """Create a new agentic workflow run."""
        run_id = run_id or 'run_' + str(uuid.uuid4()).replace('-', '_')
        with SQLiteManager() as db_manager:
            return db_manager.create_run(namespace_id, run_id)

    def delete_run(self, namespace_id: str, run_id: str):
        self.validate_namespace(namespace_id)
        self.milvus.delete(collection_name=namespace_id, filter=f"run_id == '{run_id}'")
        with SQLiteManager() as db_manager:
            db_manager.delete_run(namespace_id=namespace_id, run_id=run_id)

    def add_step(self, namespace_id: str, run_id: str, step: dict, prompt: str):
        self.validate_namespace(namespace_id)
        llm = get_chat_model(milvus_config.step_processing)
        messages = [
            {
                "role": "system",
                "content": prompt
                + '\n\nHere is the actual step you are working on:\n'
                + json.dumps(step, indent=4),
            }
        ]

        for attempt in range(3):
            extraction = llm.invoke(messages).content
            try:
                parsed_extraction = json.loads(extraction)
            except JSONDecodeError:
                continue
            else:
                break
        else:
            raise HTTPException(
                status_code=500, detail=f"Unable to parse JSON output from llm prompt:\n{extraction}"
            )

        added_step = self.milvus.insert(
            collection_name=namespace_id,
            data={
                'content': parsed_extraction['summary'],
                'embedding': self.embedding_model.encode(parsed_extraction['summary']),
                'metadata': {**parsed_extraction, 'run_id': run_id, 'step': step},
            },
        )['ids'][0]

        if len(added_step) > 0:
            return added_step['results'][0]['id']
        else:
            raise HTTPException(status_code=500, detail="Unable to add step.")

    def get_run(self, namespace_id: str, run_id: str) -> Run:
        self.validate_namespace(namespace_id)
        steps = [
            RecordedFact.model_validate(i)
            for i in self.milvus.query(
                collection_name=namespace_id,
                filter=f"run_id == '{run_id}'",
            )
        ]
        sorted_steps = sorted(steps, key=lambda step: step.created_at)

        with SQLiteManager() as db_manager:
            run = db_manager.get_run(namespace_id=namespace_id, run_id=run_id)
        run.steps = sorted_steps
        return run

    def search_runs(self, namespace_id: str, query: str, filters: dict[str, str]) -> Run | None:
        self.validate_namespace(namespace_id)
        results = [
            RecordedFact.model_validate(i)
            for i in self.milvus.query(
                collection_name=namespace_id,
                anns_field='embedding',
                data=[self.embedding_model.encode(query)],
                filter='AND'.join(['run_id IS NOT NULL'] + [f"{k} == '{v}'" for k, v in filters.items()]),
                limit=5,
                search_params={"metric_type": "IP"},
            )
        ]

        if len(results) > 0:
            run_id = results[0].run_id
            return self.get_run(namespace_id, run_id)
        else:
            return None
