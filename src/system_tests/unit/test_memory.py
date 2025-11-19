#!/usr/bin/env python3
"""
Unit tests for Memory module with mocked HTTP responses.

Tests the Memory singleton and V1MemoryClient without requiring the memory service to be running.
Uses unittest.mock to simulate API responses.
"""

import pytest
from unittest.mock import Mock, patch, MagicMock
from datetime import datetime
import httpx

from cuga.backend.memory.memory import Memory
from cuga.backend.memory.agentic_memory import V1MemoryClient
from cuga.backend.memory.agentic_memory.schema import Namespace, RecordedFact, Run
from cuga.backend.memory.agentic_memory.client.exceptions import (
    NamespaceNotFoundException,
    FactNotFoundException,
    APIRequestException,
)


class TestMemorySingleton:
    """Test suite for Memory singleton pattern."""

    def test_memory_singleton_instance(self):
        """Test that Memory returns the same instance."""
        memory1 = Memory()
        memory2 = Memory()

        assert memory1 is memory2, "Memory should be a singleton"

    def test_memory_singleton_initialization(self):
        """Test that Memory initializes only once."""
        memory = Memory()

        assert hasattr(memory, 'memory_client')
        assert isinstance(memory.memory_client, V1MemoryClient)
        assert memory.user_id is None


class TestV1MemoryClientMocked:
    """Test suite for V1MemoryClient with mocked HTTP responses."""

    @pytest.fixture
    def mock_client(self):
        """Create a V1MemoryClient with mocked httpx client."""
        with patch('httpx.Client'):
            client = V1MemoryClient(base_url="http://localhost:8888")
            mock_httpx_instance = MagicMock()
            client.client = mock_httpx_instance
            yield client, mock_httpx_instance

    def test_health_check_success(self, mock_client):
        """Test successful health check."""
        client, mock_httpx = mock_client

        # Mock successful response
        mock_response = Mock()
        mock_response.status_code = 200
        mock_response.json.return_value = {"status": "ok"}
        mock_httpx.request.return_value = mock_response

        result = client.health_check()

        assert result is True
        mock_httpx.request.assert_called_once_with("GET", "/v1/health/live")

    def test_health_check_failure(self, mock_client):
        """Test health check when service is down."""
        client, mock_httpx = mock_client

        # Mock failed response
        mock_httpx.request.side_effect = httpx.RequestError("Connection failed")

        result = client.health_check()

        assert result is False

    def test_create_namespace_success(self, mock_client):
        """Test creating a namespace successfully."""
        client, mock_httpx = mock_client

        # Mock successful response
        mock_response = Mock()
        mock_response.status_code = 200
        mock_response.json.return_value = {
            "id": "test_namespace",
            "user_id": "user123",
            "agent_id": "cuga",
            "app_id": "test_app",
            "created_at": datetime.now().isoformat(),
        }
        mock_httpx.request.return_value = mock_response

        namespace = client.create_namespace(
            namespace_id="test_namespace", user_id="user123", agent_id="cuga", app_id="test_app"
        )

        assert isinstance(namespace, Namespace)
        assert namespace.id == "test_namespace"
        assert namespace.user_id == "user123"
        assert namespace.agent_id == "cuga"

    def test_create_namespace_minimal(self, mock_client):
        """Test creating a namespace with minimal parameters."""
        client, mock_httpx = mock_client

        # Mock successful response
        mock_response = Mock()
        mock_response.status_code = 200
        mock_response.json.return_value = {
            "id": "auto_generated_id",
            "user_id": None,
            "agent_id": None,
            "app_id": None,
            "created_at": datetime.now().isoformat(),
        }
        mock_httpx.request.return_value = mock_response

        namespace = client.create_namespace()

        assert isinstance(namespace, Namespace)
        assert namespace.id is not None

    def test_get_namespace_details_success(self, mock_client):
        """Test getting namespace details."""
        client, mock_httpx = mock_client

        mock_response = Mock()
        mock_response.status_code = 200
        mock_response.json.return_value = {
            "id": "test_namespace",
            "user_id": "user123",
            "agent_id": "cuga",
            "app_id": "test_app",
            "created_at": datetime.now().isoformat(),
        }
        mock_httpx.request.return_value = mock_response

        namespace = client.get_namespace_details("test_namespace")

        assert isinstance(namespace, Namespace)
        assert namespace.id == "test_namespace"

    def test_get_namespace_details_not_found(self, mock_client):
        """Test getting non-existent namespace."""
        client, mock_httpx = mock_client

        mock_response = Mock()
        mock_response.status_code = 404
        mock_httpx.request.return_value = mock_response

        with pytest.raises(NamespaceNotFoundException):
            client.get_namespace_details("nonexistent")

    def test_search_namespaces_with_filters(self, mock_client):
        """Test searching namespaces with filters."""
        client, mock_httpx = mock_client

        mock_response = Mock()
        mock_response.status_code = 200
        mock_response.json.return_value = [
            {
                "id": "namespace1",
                "user_id": "user123",
                "agent_id": "cuga",
                "app_id": "app1",
                "created_at": datetime.now().isoformat(),
            },
            {
                "id": "namespace2",
                "user_id": "user123",
                "agent_id": "cuga",
                "app_id": "app2",
                "created_at": datetime.now().isoformat(),
            },
        ]
        mock_httpx.request.return_value = mock_response

        namespaces = client.search_namespaces(user_id="user123", agent_id="cuga", limit=10)

        assert len(namespaces) == 2
        assert all(isinstance(ns, Namespace) for ns in namespaces)
        assert namespaces[0].user_id == "user123"

    def test_delete_namespace_success(self, mock_client):
        """Test deleting a namespace."""
        client, mock_httpx = mock_client

        mock_response = Mock()
        mock_response.status_code = 204
        mock_httpx.request.return_value = mock_response

        # Should not raise exception
        client.delete_namespace("test_namespace")

        mock_httpx.request.assert_called_once()

    def test_create_and_store_fact_success(self, mock_client):
        """Test storing a fact in a namespace."""
        client, mock_httpx = mock_client

        mock_response = Mock()
        mock_response.status_code = 200
        mock_response.json.return_value = "fact_id_123"
        mock_httpx.request.return_value = mock_response

        fact_id = client.create_and_store_fact(
            namespace_id="test_namespace",
            content="This is a test fact",
            metadata={"type": "test", "agent": "TestAgent"},
        )

        assert fact_id == "fact_id_123"

    def test_search_for_facts_with_query(self, mock_client):
        """Test searching for facts with a query."""
        client, mock_httpx = mock_client

        mock_response = Mock()
        mock_response.status_code = 200
        mock_response.json.return_value = [
            {
                "id": "1",
                "content": "Test fact 1",
                "metadata": {"type": "test"},
                "created_at": datetime.now().isoformat(),
                "run_id": None,
            },
            {
                "id": "2",
                "content": "Test fact 2",
                "metadata": {"type": "test"},
                "created_at": datetime.now().isoformat(),
                "run_id": None,
            },
        ]
        mock_httpx.request.return_value = mock_response

        facts = client.search_for_facts(namespace_id="test_namespace", query="test query", limit=10)

        assert len(facts) == 2
        assert all(isinstance(f, RecordedFact) for f in facts)
        assert facts[0].content == "Test fact 1"

    def test_search_for_facts_with_filters(self, mock_client):
        """Test searching for facts with metadata filters."""
        client, mock_httpx = mock_client

        mock_response = Mock()
        mock_response.status_code = 200
        mock_response.json.return_value = [
            {
                "id": "1",
                "content": "Agent tip fact",
                "metadata": {"type": "tip", "agent": "APIPlannerAgent"},
                "created_at": datetime.now().isoformat(),
                "run_id": None,
            }
        ]
        mock_httpx.request.return_value = mock_response

        facts = client.search_for_facts(
            namespace_id="test_namespace",
            query="API errors",
            filters={"agent": "APIPlannerAgent", "type": "tip"},
            limit=5,
        )

        assert len(facts) == 1
        assert facts[0].metadata["agent"] == "APIPlannerAgent"

    def test_get_all_facts_empty_namespace(self, mock_client):
        """Test getting all facts from an empty namespace."""
        client, mock_httpx = mock_client

        mock_response = Mock()
        mock_response.status_code = 200
        mock_response.json.return_value = []
        mock_httpx.request.return_value = mock_response

        facts = client.get_all_facts("test_namespace")

        assert len(facts) == 0

    def test_create_run_success(self, mock_client):
        """Test creating a run."""
        client, mock_httpx = mock_client

        mock_response = Mock()
        mock_response.status_code = 200
        mock_response.json.return_value = {
            "id": "run_123",
            "namespace_id": "test_namespace",
            "created_at": datetime.now().isoformat(),
            "ended": False,
            "steps": [],
        }
        mock_httpx.request.return_value = mock_response

        run = client.create_run("test_namespace", run_id="run_123")

        assert isinstance(run, Run)
        assert run.id == "run_123"
        assert run.ended is False

    def test_add_step_to_run(self, mock_client):
        """Test adding a step to a run."""
        client, mock_httpx = mock_client

        mock_response = Mock()
        mock_response.status_code = 200
        mock_response.json.return_value = "step_id_456"
        mock_httpx.request.return_value = mock_response

        step_id = client.add_step(
            namespace_id="test_namespace",
            run_id="run_123",
            step={"agent": "TaskAnalyzerAgent", "status": "success"},
            prompt="Analyze this step",
        )

        assert step_id == "step_id_456"

    def test_search_runs_success(self, mock_client):
        """Test searching for runs."""
        client, mock_httpx = mock_client

        mock_response = Mock()
        mock_response.status_code = 200
        mock_response.json.return_value = {
            "id": "run_123",
            "namespace_id": "test_namespace",
            "created_at": datetime.now().isoformat(),
            "ended": True,
            "steps": [
                {
                    "id": "1",
                    "content": "Step 1",
                    "metadata": {"agent": "TaskAnalyzerAgent"},
                    "created_at": datetime.now().isoformat(),
                    "run_id": "run_123",
                }
            ],
        }
        mock_httpx.request.return_value = mock_response

        run = client.search_runs(
            namespace_id="test_namespace", query="revenue calculation", filters={"status": "success"}
        )

        assert isinstance(run, Run)
        assert run.id == "run_123"

    def test_end_run_success(self, mock_client):
        """Test ending a run (triggers tips extraction)."""
        client, mock_httpx = mock_client

        mock_response = Mock()
        mock_response.status_code = 200
        mock_httpx.request.return_value = mock_response

        # Should not raise exception
        client.end_run("test_namespace", "run_123")

        mock_httpx.request.assert_called_once()

    def test_namespace_exists_true(self, mock_client):
        """Test checking if namespace exists (true case)."""
        client, mock_httpx = mock_client

        mock_response = Mock()
        mock_response.status_code = 200
        mock_response.json.return_value = []
        mock_httpx.request.return_value = mock_response

        result = client.namespace_exists("test_namespace")

        assert result is True

    def test_namespace_exists_false(self, mock_client):
        """Test checking if namespace exists (false case)."""
        client, mock_httpx = mock_client

        mock_response = Mock()
        mock_response.status_code = 404
        mock_httpx.request.return_value = mock_response

        result = client.namespace_exists("nonexistent")

        assert result is False


class TestMemoryWrapperMocked:
    """Test suite for Memory wrapper class with mocked client."""

    @pytest.fixture
    def mock_memory(self):
        """Create a Memory instance with mocked V1MemoryClient."""
        with patch.object(Memory, '_initialized', False):
            with patch('cuga.backend.memory.memory.V1MemoryClient') as mock_client_class:
                mock_client = MagicMock()
                mock_client_class.return_value = mock_client
                memory = Memory()
                yield memory, mock_client

    def test_create_namespace_wrapper(self, mock_memory):
        """Test Memory.create_namespace wrapper."""
        memory, mock_client = mock_memory

        mock_namespace = Namespace(
            id="test_ns", user_id="user123", agent_id="cuga", app_id="test", created_at=datetime.now()
        )
        mock_client.create_namespace.return_value = mock_namespace

        result = memory.create_namespace(
            namespace_id="test_ns", user_id="user123", agent_id="cuga", app_id="test"
        )

        assert result.id == "test_ns"
        mock_client.create_namespace.assert_called_once()

    def test_search_for_facts_wrapper(self, mock_memory):
        """Test Memory.search_for_facts wrapper."""
        memory, mock_client = mock_memory

        mock_facts = [
            RecordedFact(
                id="1", content="Test fact", metadata={"type": "test"}, created_at=datetime.now(), run_id=None
            )
        ]
        mock_client.search_for_facts.return_value = mock_facts

        result = memory.search_for_facts(namespace_id="test_ns", query="test", limit=5)

        assert len(result) == 1
        assert result[0].content == "Test fact"
        mock_client.search_for_facts.assert_called_once()

    def test_get_matching_tips(self, mock_memory):
        """Test Memory.get_matching_tips method."""
        memory, mock_client = mock_memory

        mock_facts = [
            RecordedFact(
                id="1",
                content="Tip 1: Validate inputs",
                metadata={"type": "tip", "agent": "APIPlannerAgent"},
                created_at=datetime.now(),
                run_id=None,
            ),
            RecordedFact(
                id="2",
                content="Tip 2: Handle errors gracefully",
                metadata={"type": "tip", "agent": "APIPlannerAgent"},
                created_at=datetime.now(),
                run_id=None,
            ),
        ]
        mock_client.search_for_facts.return_value = mock_facts

        result = memory.get_matching_tips(
            namespace_id="test_ns", agent_id="APIPlannerAgent", query="API errors", limit=3
        )

        assert len(result) == 2
        assert "Tip 1" in result[0]
        assert "Tip 2" in result[1]

    def test_create_run_wrapper(self, mock_memory):
        """Test Memory.create_run wrapper."""
        memory, mock_client = mock_memory

        mock_run = Run(id="run_123", namespace_id="test_ns", created_at=datetime.now(), ended=False, steps=[])
        mock_client.create_run.return_value = mock_run

        result = memory.create_run("test_ns", run_id="run_123")

        assert result.id == "run_123"
        assert result.ended is False
        mock_client.create_run.assert_called_once()

    def test_add_step_wrapper(self, mock_memory):
        """Test Memory.add_step wrapper."""
        memory, mock_client = mock_memory

        mock_client.add_step.return_value = "step_456"

        result = memory.add_step(
            namespace_id="test_ns",
            run_id="run_123",
            step={"agent": "CodeAgent", "status": "success"},
            prompt="Analyze code step",
        )

        assert result == "step_456"
        mock_client.add_step.assert_called_once()

    def test_end_run_wrapper(self, mock_memory):
        """Test Memory.end_run wrapper."""
        memory, mock_client = mock_memory

        mock_client.end_run.return_value = None

        # Should not raise exception
        memory.end_run("test_ns", "run_123")

        mock_client.end_run.assert_called_once_with("test_ns", "run_123")


class TestExceptionHandling:
    """Test suite for exception handling in V1MemoryClient."""

    @pytest.fixture
    def mock_client(self):
        """Create a V1MemoryClient with mocked httpx client."""
        with patch('httpx.Client'):
            client = V1MemoryClient(base_url="http://localhost:8888")
            mock_httpx_instance = MagicMock()
            client.client = mock_httpx_instance
            yield client, mock_httpx_instance

    def test_request_error_handling(self, mock_client):
        """Test handling of network request errors."""
        client, mock_httpx = mock_client

        mock_httpx.request.side_effect = httpx.RequestError("Network error")

        with pytest.raises(APIRequestException) as exc_info:
            client.create_namespace()

        assert "request failed" in str(exc_info.value).lower()

    def test_http_status_error_handling(self, mock_client):
        """Test handling of HTTP status errors."""
        client, mock_httpx = mock_client

        mock_response = Mock()
        mock_response.status_code = 500
        mock_response.raise_for_status.side_effect = httpx.HTTPStatusError(
            "Server error", request=Mock(), response=mock_response
        )
        mock_httpx.request.return_value = mock_response

        with pytest.raises(APIRequestException) as exc_info:
            client.create_namespace()

        assert "500" in str(exc_info.value)

    def test_namespace_not_found_error(self, mock_client):
        """Test NamespaceNotFoundException."""
        client, mock_httpx = mock_client

        mock_response = Mock()
        mock_response.status_code = 404
        mock_httpx.request.return_value = mock_response

        with pytest.raises(NamespaceNotFoundException):
            client.get_namespace_details("nonexistent")

    def test_fact_not_found_error(self, mock_client):
        """Test FactNotFoundException."""
        client, mock_httpx = mock_client

        mock_response = Mock()
        mock_response.status_code = 404
        mock_httpx.request.return_value = mock_response

        with pytest.raises(FactNotFoundException):
            client.delete_fact("test_ns", 999)


class TestEdgeCases:
    """Test suite for edge cases and boundary conditions."""

    @pytest.fixture
    def mock_client(self):
        """Create a V1MemoryClient with mocked httpx client."""
        with patch('httpx.Client'):
            client = V1MemoryClient(base_url="http://localhost:8888")
            mock_httpx_instance = MagicMock()
            client.client = mock_httpx_instance
            yield client, mock_httpx_instance

    def test_empty_query_search(self, mock_client):
        """Test searching with None/empty query."""
        client, mock_httpx = mock_client

        mock_response = Mock()
        mock_response.status_code = 200
        mock_response.json.return_value = []
        mock_httpx.request.return_value = mock_response

        facts = client.search_for_facts("test_ns", query=None, limit=10)

        assert len(facts) == 0

    def test_large_limit_search(self, mock_client):
        """Test searching with large limit."""
        client, mock_httpx = mock_client

        mock_response = Mock()
        mock_response.status_code = 200
        # Simulate returning many facts
        mock_response.json.return_value = [
            {
                "id": str(i),
                "content": f"Fact {i}",
                "metadata": {},
                "created_at": datetime.now().isoformat(),
                "run_id": None,
            }
            for i in range(100)
        ]
        mock_httpx.request.return_value = mock_response

        facts = client.search_for_facts("test_ns", query="test", limit=100)

        assert len(facts) == 100

    def test_fact_without_metadata(self, mock_client):
        """Test storing fact without metadata."""
        client, mock_httpx = mock_client

        mock_response = Mock()
        mock_response.status_code = 200
        mock_response.json.return_value = "fact_id"
        mock_httpx.request.return_value = mock_response

        fact_id = client.create_and_store_fact(namespace_id="test_ns", content="Fact without metadata")

        assert fact_id == "fact_id"

    def test_run_with_no_steps(self, mock_client):
        """Test run with empty steps list."""
        client, mock_httpx = mock_client

        mock_response = Mock()
        mock_response.status_code = 200
        mock_response.json.return_value = {
            "id": "run_empty",
            "namespace_id": "test_ns",
            "created_at": datetime.now().isoformat(),
            "ended": False,
            "steps": [],
        }
        mock_httpx.request.return_value = mock_response

        run = client.create_run("test_ns", run_id="run_empty")

        assert len(run.steps) == 0
