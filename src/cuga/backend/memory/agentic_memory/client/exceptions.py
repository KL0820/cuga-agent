"""
Custom exceptions for the V1MemoryClient.
"""


class MemoryClientException(Exception):
    """Base exception class for all memory client errors."""

    pass


class NamespaceNotFoundException(MemoryClientException):
    """Raised when a namespace is not found."""

    pass


class FactNotFoundException(MemoryClientException):
    """Raised when a fact is not found."""

    pass


class APIRequestException(MemoryClientException):
    """Raised when an API request fails."""

    pass
