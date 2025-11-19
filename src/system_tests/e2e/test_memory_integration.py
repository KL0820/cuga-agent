#!/usr/bin/env python3
"""
Integration tests for Memory module.

Tests make use of LLM models, so ensure that they are accessible.

These tests verify the full end-to-end functionality of the memory system
including Milvus vector store, SQLite metadata, and tips extraction.
"""

import unittest
import time
import os

os.environ['DYNACONF_ADVANCED_FEATURES__ENABLE_MEMORY'] = 'true'
from cuga.backend.memory.agentic_memory.main import app
from cuga.backend.memory.memory import Memory
from cuga.backend.memory.agentic_memory.schema import Namespace, RecordedFact, Run
from cuga.backend.memory.agentic_memory.client.exceptions import NamespaceNotFoundException
from cuga.config import DBS_DIR
from fastapi.testclient import TestClient
from pathlib import Path
from unittest import mock

test_env = {
    "WXO_MILVUS_URI": str(Path(DBS_DIR) / "milvus.db"),
    "MEM0_HISTORY_DB_PATH": str(Path(DBS_DIR) / "mem0_history.db"),
    "MILVUS_DB": str(Path(DBS_DIR) / "test_memory.db"),
    "AGENTIC_DB": str(Path(DBS_DIR) / "agentic.db"),
    "MODEL_NAME": "Azure/gpt-4o",
}


class TestMemoryOperations(unittest.TestCase):
    """Test memory CRUD operations against a test service."""

    def setUp(self):
        """Set up test client"""
        Memory._instance = None
        Memory._initialized = False
        self.client = Memory()
        self.client.memory_client.client = TestClient(app)

    def tearDown(self):
        """Clean up created databases."""
        Memory._instance = None
        Memory._initialized = False
        self.client.memory_client.client.close()
        Path(test_env["WXO_MILVUS_URI"]).unlink(missing_ok=True)
        Path(test_env["MEM0_HISTORY_DB_PATH"]).unlink(missing_ok=True)
        Path(test_env["MILVUS_DB"]).unlink(missing_ok=True)
        Path(test_env["AGENTIC_DB"]).unlink(missing_ok=True)

    @mock.patch.dict(os.environ, test_env)
    def test_full(self):
        """End-to-end test of memory CRUD operations."""
        namespace_id = f"test_namespace_{int(time.time() * 1000)}"

        # Create Namespace
        namespace = self.client.create_namespace(
            namespace_id=namespace_id, user_id="test_user", agent_id="cuga", app_id="test_app"
        )

        # Verify namespace was created correctly
        self.assertIsInstance(namespace, Namespace)
        self.assertEqual(namespace.id, namespace_id)
        self.assertEqual(namespace.user_id, "test_user")
        self.assertEqual(namespace.agent_id, "cuga")
        self.assertEqual(namespace.app_id, "test_app")
        self.assertIsNotNone(namespace.created_at)

        # Get namespace details another way
        namespace = self.client.get_namespace_details(namespace_id)
        self.assertEqual(namespace.id, namespace_id)
        self.assertEqual(namespace.user_id, "test_user")
        self.assertEqual(namespace.agent_id, "cuga")
        self.assertEqual(namespace.app_id, "test_app")

        # Add fact
        self.client.create_and_store_fact(
            namespace_id, "Python is a programming language", {"topic": "programming", "user_id": "test_user"}
        )
        self.client.create_and_store_fact(
            namespace_id,
            "JavaScript is used for web development",
            {"topic": "programming", "user_id": "test_user"},
        )
        self.client.create_and_store_fact(
            namespace_id, "Machine learning uses neural networks", {"topic": "AI", "user_id": "test_user"}
        )

        facts = self.client.search_for_facts(
            namespace_id=namespace_id,
            query="programming languages",
            filters={"user_id": "test_user"},
            limit=5,
        )
        self.assertIsInstance(facts, list)
        self.assertGreater(len(facts), 0)
        self.assertIsInstance(facts[0], RecordedFact)

        # Create Run
        run_id = f"run_{int(time.time() * 1000)}"
        run = self.client.create_run(namespace_id, run_id=run_id)
        self.assertIsInstance(run, Run)
        self.assertEqual(run.id, run_id)
        self.assertFalse(run.ended)
        self.assertEqual(len(run.steps), 0)

        step_1 = self.client.add_step(
            namespace_id=namespace_id,
            run_id=run.id,
            step={"name": "TaskAnalyzerAgent", "status": "success", "action": "analyzed task"},
            prompt="Output a JSON object without any extra thoughts or commentary. Add a summary field.",
        )

        step_2 = self.client.add_step(
            namespace_id=namespace_id,
            run_id=run.id,
            step={"agent": "APIPlannerAgent", "status": "success", "action": "selected APIs"},
            prompt="Output a JSON object without any extra thoughts or commentary. Add a summary field.",
        )
        self.assertIsNotNone(step_1)
        self.assertIsNotNone(step_2)

        run = self.client.get_run(namespace_id, run.id)
        self.assertGreaterEqual(len(run.steps), 2)

        # End the run
        self.client.end_run(namespace_id, run.id)

        retrieved_run = self.client.get_run(namespace_id, run.id)
        self.assertTrue(retrieved_run.ended)

        # Delete run
        self.client.delete_run(namespace_id, run.id)
        with self.assertRaises(Exception):
            self.client.get_run(namespace_id, run.id)

        # Delete it
        self.client.delete_namespace(namespace.id)

        # Verify it's gone
        with self.assertRaises(NamespaceNotFoundException):
            self.client.get_namespace_details(namespace_id)


if __name__ == "__main__":
    unittest.main()
