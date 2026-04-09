from typing import Literal, Sequence

from pydantic import ValidationError


ExecutionMode = Literal["api", "web", "hybrid"]
SubtaskType = Literal["api", "web"]


class InvalidSubtaskTypeForModeError(ValueError):
    """Raised when a generated subtask type is not allowed for the current execution mode."""


def normalize_execution_mode(execution_mode: str | None) -> ExecutionMode:
    normalized = (execution_mode or "hybrid").strip().lower()
    if normalized not in {"api", "web", "hybrid"}:
        raise ValueError(f"Unsupported execution mode: {execution_mode!r}")
    return normalized  # type: ignore[return-value]


def get_allowed_subtask_types(execution_mode: str | None) -> tuple[SubtaskType, ...]:
    normalized = normalize_execution_mode(execution_mode)
    if normalized == "hybrid":
        return ("api", "web")
    return (normalized,)  # type: ignore[return-value]


def validate_subtask_types_for_mode(
    subtask_types: Sequence[str | None],
    execution_mode: str | None,
    *,
    context: str,
    allow_none: bool = False,
) -> None:
    allowed_types = set(get_allowed_subtask_types(execution_mode))
    invalid_types = []

    for index, subtask_type in enumerate(subtask_types, start=1):
        if subtask_type is None:
            if allow_none:
                continue
            invalid_types.append((index, "null"))
            continue

        if subtask_type not in allowed_types:
            invalid_types.append((index, subtask_type))

    if not invalid_types:
        return

    allowed_types_text = ", ".join(sorted(allowed_types))
    invalid_types_text = ", ".join(
        f"item {index}: {subtask_type}" for index, subtask_type in invalid_types
    )
    raise InvalidSubtaskTypeForModeError(
        f"{context} generated disallowed subtask types for execution mode "
        f"'{normalize_execution_mode(execution_mode)}'. Allowed types: [{allowed_types_text}]. "
        f"Invalid values: {invalid_types_text}."
    )


def is_invalid_subtask_type_validation_error(error: Exception) -> bool:
    if not isinstance(error, ValidationError):
        return False

    return any(
        issue.get("type") == "value_error"
        and "disallowed subtask types" in issue.get("msg", "")
        for issue in error.errors(include_url=False)
    )
