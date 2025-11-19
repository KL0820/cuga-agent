import json
from typing import Any, Dict, Optional
from datetime import datetime
from pathlib import Path
import traceback
import inspect
from loguru import logger
from cuga.config import settings


class VariableMetadata:
    def __init__(self, value: Any, description: Optional[str] = None, created_at: Optional[datetime] = None):
        self.value = value
        self.description = description or ""
        self.type = type(value).__name__
        self.created_at = created_at if created_at is not None else datetime.now()
        self.count_items = self._calculate_count(value)

    def _calculate_count(self, value: Any) -> int:
        """Calculate the count of items in the value based on its type."""
        if isinstance(value, (list, tuple, set)):
            return len(value)
        elif isinstance(value, dict):
            return len(value)
        elif isinstance(value, str):
            return len(value)
        elif hasattr(value, '__len__'):
            try:
                return len(value)
            except Exception:
                return 1
        else:
            return 1

    def to_dict(
        self, include_value: bool = True, include_value_preview: bool = False, max_preview_length: int = 5000
    ) -> Dict[str, Any]:
        """Convert metadata to dictionary representation."""
        result = {
            "description": self.description,
            "type": self.type,
            "created_at": self.created_at.isoformat(),
            "count_items": self.count_items,
        }
        if include_value:
            result["value"] = self.value
        if include_value_preview:
            result["value_preview"] = str(self.value)[:max_preview_length]
        return result


class VariablesManager(object):
    _instance = None
    variables: Dict[str, VariableMetadata] = {}
    variable_counter: int = 0
    _creation_order: list = []  # Track creation order
    _log_file: Optional[Path] = None
    _session_start: Optional[datetime] = None

    def __new__(cls, *args, **kwargs):
        if not cls._instance:
            cls._instance = super(VariablesManager, cls).__new__(cls)
            if settings.advanced_features.tracker_enabled:
                cls._instance._initialize_logging()
        return cls._instance

    def _initialize_logging(self):
        """Initialize the markdown log file."""
        log_dir = Path("logging/variables_manager")
        log_dir.mkdir(parents=True, exist_ok=True)

        self._session_start = datetime.now()
        timestamp = self._session_start.strftime("%Y%m%d_%H%M%S")
        self._log_file = log_dir / f"variables_log_{timestamp}.md"

        # Write header
        with open(self._log_file, 'w') as f:
            f.write("# Variables Manager Log\n\n")
            f.write(f"**Session Started:** {self._session_start.strftime('%Y-%m-%d %H:%M:%S')}\n\n")
            f.write("---\n\n")

    def _get_caller_info(self, skip_frames=2) -> str:
        """Get information about the caller function."""
        try:
            stack = inspect.stack()
            if len(stack) > skip_frames:
                frame = stack[skip_frames]
                filename = Path(frame.filename).name
                function = frame.function
                line = frame.lineno
                return f"{filename}:{function}:{line}"
            return "Unknown caller"
        except Exception:
            return "Unknown caller"

    def _log_operation(self, operation: str, details: str, extra_info: Optional[str] = None):
        """Log an operation to the markdown file."""
        if not settings.advanced_features.tracker_enabled or not self._log_file:
            return

        try:
            timestamp = datetime.now().strftime('%H:%M:%S.%f')[:-3]
            caller = self._get_caller_info(skip_frames=3)

            with open(self._log_file, 'a') as f:
                f.write(f"## {operation}\n\n")
                f.write(f"- **Time:** {timestamp}\n")
                f.write(f"- **Caller:** `{caller}`\n")
                f.write(f"- **Details:** {details}\n")
                if extra_info:
                    f.write(f"\n{extra_info}\n")
                f.write("\n---\n\n")
        except Exception as e:
            logger.warning(f"Failed to write to variables log: {e}")

    def add_variable(self, value: Any, name: Optional[str] = None, description: Optional[str] = None) -> str:
        """
        Add a new variable with an optional name or auto-generated name and description.

        Args:
            value (Any): The value to store
            name (Optional[str]): Optional custom name, if None will auto-generate
            description (Optional[str]): Optional description of the variable

        Returns:
            str: The name of the variable that was created
        """
        is_new = True
        original_name = name

        if name is None:
            self.variable_counter += 1
            name = f"variable_{self.variable_counter}"
        else:
            # If a custom name is provided and it's a 'variable_X' format,
            # update the counter to avoid future collisions.
            if name.startswith("variable_") and name[9:].isdigit():
                num = int(name[9:])
                if num >= self.variable_counter:
                    self.variable_counter = num

            # Check if variable already exists
            if name in self.variables:
                is_new = False

        self.variables[name] = VariableMetadata(value, description)

        # Track creation order
        if name not in self._creation_order:
            self._creation_order.append(name)

        # Log the operation
        operation = "➕ Variable Added" if is_new else "🔄 Variable Updated"
        value_preview = self._get_value_preview(value, max_length=200)
        details = f"**{name}** = `{type(value).__name__}` ({len(str(value))} chars)"

        extra_info = f"""
### Variable Info
- **Name:** `{name}` {'(auto-generated)' if original_name is None else '(explicit)'}
- **Type:** `{type(value).__name__}`
- **Description:** {description or 'N/A'}
- **Value Preview:**
```python
{value_preview}
```

### Current State
- **Total Variables:** {len(self.variables)}
- **Variable Counter:** {self.variable_counter}
- **All Variables:** {', '.join(f'`{v}`' for v in self._creation_order)}
"""
        self._log_operation(operation, details, extra_info)

        return name

    def get_variable(self, name: str) -> Any:
        """
        Get a variable value by name.

        Args:
            name (str): The name of the variable

        Returns:
            Any: The value of the variable, or None if not found
        """
        metadata = self.variables.get(name)
        return metadata.value if metadata else None

    def get_variable_metadata(self, name: str) -> Optional[VariableMetadata]:
        """
        Get complete metadata for a variable by name.

        Args:
            name (str): The name of the variable

        Returns:
            Optional[VariableMetadata]: The metadata of the variable, or None if not found
        """
        return self.variables.get(name)

    def get_all_variables_metadata(
        self, include_value: bool = False, include_value_preview: bool = True
    ) -> Dict[str, Dict[str, Any]]:
        """
        Get metadata for all variables including description, type, and item count.

        Args:
            include_value: Whether to include actual value in metadata (default: False)
            include_value_preview: Whether to include value preview in metadata (default: True)

        Returns:
            Dict[str, Dict[str, Any]]: Dictionary with variable names as keys and metadata as values
        """
        return {
            name: metadata.to_dict(include_value=include_value, include_value_preview=include_value_preview)
            for name, metadata in self.variables.items()
        }

    def get_variables_summary(
        self, variable_names: list[str] = None, last_n: Optional[int] = None, max_length: Optional[int] = 5000
    ) -> str:
        """
        Get a formatted summary of variables with their metadata.

        Args:
            variable_names: Optional list of variable names to include in summary.
                           If None, all variables are included.
            last_n: Optional number of last created variables to include in summary.
                    If provided, overrides variable_names parameter.
            max_length: max preview length

        Returns:
            str: Formatted string with variable summaries
        """
        if not self.variables:
            return "# No variables stored"

        # Determine which variables to include
        if last_n is not None:
            # Get the last n variables based on creation order
            if last_n <= 0:
                return "# Invalid last_n value: must be greater than 0"

            # Get the last n variable names from creation order
            last_n_names = (
                self._creation_order[-last_n:]
                if len(self._creation_order) >= last_n
                else self._creation_order[:]
            )
            filtered_variables = {
                name: metadata for name, metadata in self.variables.items() if name in last_n_names
            }

            # Sort by creation order to maintain chronological order
            sorted_vars = [
                (name, filtered_variables[name]) for name in last_n_names if name in filtered_variables
            ]

        elif variable_names is not None:
            filtered_variables = {
                name: metadata for name, metadata in self.variables.items() if name in variable_names
            }

            # Check if any requested variables were not found
            missing_vars = set(variable_names) - set(filtered_variables.keys())
            if missing_vars:
                # You might want to handle this differently based on your needs
                pass  # Could log warning or raise exception

            # Sort by creation order for consistency
            sorted_vars = [
                (name, filtered_variables[name])
                for name in self._creation_order
                if name in filtered_variables
            ]
        else:
            # Use creation order for all variables
            sorted_vars = [
                (name, self.variables[name]) for name in self._creation_order if name in self.variables
            ]

        if not sorted_vars:
            return "# No matching variables found"

        # Build summary with appropriate header
        if last_n is not None:
            actual_count = len(sorted_vars)
            if actual_count < last_n:
                summary_lines = [
                    f"# Last {actual_count} Variables Summary (only {actual_count} variables exist)",
                    "",
                ]
            else:
                summary_lines = [f"# Last {last_n} Variables Summary", ""]
        else:
            summary_lines = ["# Variables Summary", ""]

        for name, metadata in sorted_vars:
            lines = [
                f"## {name}",
                f"- Type: {metadata.type}",
                f"- Items: {metadata.count_items}",
                f"- Description: {metadata.description or 'No description'}",
                f"- Created: {metadata.created_at.strftime('%Y-%m-%d %H:%M:%S')}",
                f"- Value Preview: {self._get_value_preview(metadata.value, max_length=max_length)}",
                "",
            ]
            summary_lines.extend(lines)

        return '\n'.join(summary_lines)

    def _get_value_preview(self, value: Any, max_length: int = 5000) -> str:
        """Get a structured preview of the value, truncating nested content when large.

        This preserves high-level structure (e.g., dict keys) while shortening
        long strings and large lists/tuples nested within.
        """

        # First try full representation to see if it fits
        try:
            full_repr = repr(value)
            if len(full_repr) <= max_length:
                return full_repr
        except Exception:
            pass  # Fall back to smart truncation if repr fails

        # Tunable preview thresholds
        max_string_chars = max(50, min(200, max_length // 4))
        max_list_items = 10
        max_depth = 6  # Increased from 4 to allow deeper nesting when it fits

        def shorten(val: Any, depth: int = 0, current_length: int = 0) -> str:
            # Try full representation first if we're not too deep and it might fit
            if depth < max_depth:
                try:
                    full_val_repr = repr(val)
                    if current_length + len(full_val_repr) <= max_length:
                        return full_val_repr
                except Exception:
                    pass

            if depth >= max_depth:
                return "..."

            # Strings: cap length and show as repr
            if isinstance(val, str):
                if len(val) <= max_string_chars:
                    return repr(val)
                truncated = val[:max_string_chars] + "..."
                return repr(truncated)

            # Lists/Tuples: show first N items, then indicate remainder
            if isinstance(val, (list, tuple)):
                open_b, close_b = ("[", "]") if isinstance(val, list) else ("(", ")")
                items: list[str] = []
                total = len(val)
                running_length = current_length + 2  # Account for brackets

                for index, item in enumerate(val):
                    if index >= max_list_items:
                        remaining = total - index
                        items.append(f"... (+{remaining} more)")
                        break

                    item_repr = shorten(item, depth + 1, running_length)
                    if running_length + len(item_repr) + 2 > max_length:  # +2 for ", "
                        remaining = total - index
                        items.append(f"... (+{remaining} more)")
                        break

                    items.append(item_repr)
                    running_length += len(item_repr) + 2  # +2 for ", "

                return f"{open_b}{', '.join(items)}{close_b}"

            # Dicts: preserve keys and shorten nested values
            if isinstance(val, dict):
                if not val:
                    return "{}"

                parts: list[str] = []
                running_length = current_length + 2  # Account for braces

                for key, nested in val.items():
                    key_repr = repr(key)

                    # Try to fit at least the key with a truncated value
                    nested_repr = shorten(nested, depth + 1, running_length + len(key_repr) + 2)
                    part = f"{key_repr}: {nested_repr}"

                    # If even the key won't fit, just show ellipsis
                    if running_length + len(key_repr) + 5 > max_length:  # +5 for ": ..."
                        if not parts:  # If no parts yet, at least show one key
                            parts.append(f"{key_repr}: ...")
                        else:
                            parts.append("...")
                        break

                    # If the full part won't fit, truncate the nested value more aggressively
                    if running_length + len(part) + 2 > max_length:
                        if depth + 1 < max_depth:
                            # Try with just "..." for the nested value
                            part = f"{key_repr}: ..."
                            if running_length + len(part) + 2 <= max_length:
                                parts.append(part)
                        break

                    parts.append(part)
                    running_length += len(part) + 2  # +2 for ", "

                return "{" + ", ".join(parts) + "}"

            # Fallback for other types
            return repr(val)

        preview = shorten(value, 0, 0)
        if len(preview) > max_length:
            return preview[:max_length] + "..."
        return preview

    def get_variables_formatted(self) -> str:
        """
        Get all variables formatted as key-value strings in valid Python syntax.

        Returns:
            str: Formatted string with all variables
        """
        if not self.variables:
            return "# No variables stored"

        formatted_lines = []
        for name, metadata in self.variables.items():
            value = metadata.value
            # Use repr() for all values to ensure valid Python syntax
            formatted_lines.append(f'{name} = {repr(value)}')

        return '\n'.join(formatted_lines)

    def get_variables_as_json(self) -> str:
        """
        Get all variables formatted as JSON strings.

        Returns:
            str: Formatted string with all variables in JSON format
        """
        if not self.variables:
            return "# No variables stored"

        formatted_lines = []
        for name, metadata in self.variables.items():
            value = metadata.value
            try:
                json_value = json.dumps(value, indent=2)
                formatted_lines.append(f'{name} = {json_value}')
            except (TypeError, ValueError):
                # Fallback for non-JSON-serializable values
                formatted_lines.append(f'{name} = {repr(value)}')

        return '\n'.join(formatted_lines)

    def get_last_variable(self) -> tuple[str, VariableMetadata]:
        """
        Get the last added variable.

        Returns:
            tuple[str, Any]: Tuple of (name, value) of the last variable, or (None, None) if empty
        """
        if not self.variables:
            return None, None

        # Get the last key from creation order
        last_key = self._creation_order[-1] if self._creation_order else None
        if last_key and last_key in self.variables:
            return last_key, self.variables[last_key]
        return None, None

    def present_variable(self, variable_name):
        """
        Presents a given Python variable in a structured format:
        - Markdown table for a list of dictionaries if suitable.
        - JSON format for dictionaries, lists (non-dict lists), and other complex objects.
        - String representation for basic types.

        Args:
            variable_name: The Python variable (any type) to be presented.

        Returns:
            A string representing the data in Markdown or JSON format.
        """
        data = self.variables.get(variable_name).value

        # --- Helper function for Markdown table ---
        def _create_markdown_table(list_of_dicts):
            if not list_of_dicts:
                return "No data to display in table format (empty list)."

            # Collect all unique keys from all dictionaries for the header
            all_keys = set()
            for item in list_of_dicts:
                if not isinstance(item, dict):
                    # If not all items are dictionaries, a table is not suitable
                    return None
                all_keys.update(item.keys())

            # Sort keys for consistent column order
            headers = sorted(list(all_keys))

            if not headers:
                return "No data to display in table format (dictionaries have no keys)."

            # Calculate maximum column widths
            column_widths = {header: len(header) for header in headers}

            for item in list_of_dicts:
                for key in headers:
                    value = item.get(key, "")
                    # Convert complex types to JSON string for length calculation
                    if isinstance(value, (dict, list)):
                        cell_content = json.dumps(value)
                    else:
                        cell_content = str(value)
                    column_widths[key] = max(column_widths[key], len(cell_content))

            # Build the table
            table_str = ""

            # Header row
            header_row = [header.ljust(column_widths[header]) for header in headers]
            table_str += "| " + " | ".join(header_row) + " |\n"

            # Separator row
            separator_row = ["-" * column_widths[header] for header in headers]
            table_str += "| " + " | ".join(separator_row) + " |\n"

            # Data rows
            for item in list_of_dicts:
                row_values = []
                for key in headers:
                    value = item.get(key, "")  # Use empty string if key is missing
                    # Ensure values are simple strings for table display, serialize nested
                    if isinstance(value, (dict, list)):
                        cell_content = json.dumps(value)  # Serialize nested structures to JSON
                    else:
                        cell_content = str(value)
                    row_values.append(cell_content.ljust(column_widths[key]))
                table_str += "| " + " | ".join(row_values) + " |\n"

            return table_str

        # --- Main presentation logic ---

        if isinstance(data, list) and all(isinstance(item, dict) for item in data):
            # Try to create a Markdown table for list of dictionaries
            markdown_table = _create_markdown_table(data)
            if markdown_table:
                return "\n\n```\n" + markdown_table + "\n```\n\n"
            else:
                # Fallback to JSON if table creation failed (e.g., mixed types in list)
                try:
                    return "\n\n```json\n" + json.dumps(data, indent=4) + "\n```\n\n"
                except TypeError:
                    return f"Could not serialize list to JSON: {data}"
        elif isinstance(data, (dict, list)):
            # For general dictionaries and lists (not exclusively list of dicts for table)
            try:
                return "\n\n```json\n" + json.dumps(data, indent=4) + "\n```\n\n"
            except TypeError:
                return f"Could not serialize object to JSON: {data}"
        else:
            # For basic types and other non-serializable objects, return string representation
            return str(data)

    def get_last_variable_metadata(self) -> tuple[str, VariableMetadata]:
        """
        Get the last added variable with its complete metadata.

        Returns:
            tuple[str, VariableMetadata]: Tuple of (name, metadata) of the last variable, or (None, None) if empty
        """
        if not self.variables:
            return None, None

        last_key = self._creation_order[-1] if self._creation_order else None
        if last_key and last_key in self.variables:
            return last_key, self.variables[last_key]
        return None, None

    def get_variable_names(self) -> list[str]:
        """
        Get all variable names.

        Returns:
            list[str]: List of all variable names
        """
        return list(self.variables.keys())

    def get_last_n_variable_names(self, n: int) -> list[str]:
        """
        Get the names of the last n created variables.

        Args:
            n (int): Number of last variables to get

        Returns:
            list[str]: List of variable names in creation order
        """
        if n <= 0:
            return []
        return self._creation_order[-n:] if len(self._creation_order) >= n else self._creation_order[:]

    def remove_variable(self, name: str) -> bool:
        """
        Remove a variable by name.

        Args:
            name (str): The name of the variable to remove

        Returns:
            bool: True if variable was removed, False if not found
        """
        if name in self.variables:
            var_type = self.variables[name].type
            var_value_preview = self._get_value_preview(self.variables[name].value, max_length=100)

            del self.variables[name]
            # Also remove from creation order
            if name in self._creation_order:
                self._creation_order.remove(name)

            details = f"Removed **{name}** (`{var_type}`)"
            extra_info = f"""
### Removed Variable
- **Name:** `{name}`
- **Type:** `{var_type}`
- **Value Preview:** `{var_value_preview}`

### Remaining State
- **Total Variables:** {len(self.variables)}
- **Variables:** {', '.join(f'`{v}`' for v in self._creation_order) if self._creation_order else 'None'}
"""
            self._log_operation("➖ Variable Removed", details, extra_info)
            return True
        else:
            self._log_operation("⚠️ Remove Failed", f"Variable **{name}** not found", None)
            return False

    def update_variable_description(self, name: str, description: str) -> bool:
        """
        Update the description of an existing variable.

        Args:
            name (str): The name of the variable
            description (str): New description

        Returns:
            bool: True if variable was updated, False if not found
        """
        if name in self.variables:
            self.variables[name].description = description
            return True
        return False

    def get_variables_by_type(self, type_name: str) -> Dict[str, Any]:
        """
        Get all variables of a specific type.

        Args:
            type_name (str): The type name to filter by (e.g., 'str', 'list', 'dict')

        Returns:
            Dict[str, Any]: Dictionary of variables matching the type
        """
        return {
            name: metadata.value for name, metadata in self.variables.items() if metadata.type == type_name
        }

    def replace_variables_placeholders(self, text: str):
        for variable_name in self.get_last_n_variable_names(5):
            relevant_key = "{" + variable_name + "}"
            if relevant_key in text:
                text = text.replace(relevant_key, self.present_variable(variable_name))
        return text

    def reset(self) -> None:
        """
        Reset the variables manager, clearing all variables and counter.
        """
        # Log before reset
        variables_before = list(self._creation_order)
        count_before = len(self.variables)

        details = f"Clearing **{count_before}** variables"
        extra_info = f"""
### 🗑️ Reset Operation

**Variables Cleared:**
{chr(10).join(f'- `{name}`: {self.variables[name].type}' for name in variables_before) if variables_before else '- None'}

### Stack Trace
```python
{''.join(traceback.format_stack()[:-1])}
```
"""
        self._log_operation("🔄 RESET", details, extra_info)

        self.variables = {}
        self.variable_counter = 0
        self._creation_order = []

    def reset_keep_last_n(self, n: int) -> None:
        """
        Reset the variables manager, keeping only the last 'n' added variables.

        Args:
            n (int): The number of last added variables to keep.
        """
        if n <= 0:
            # For n <= 0, keep no variables (full reset)
            self.reset()
            return

        variables_to_keep = {}
        original_creation_order = []
        max_variable_counter = 0

        # Identify the last 'n' variables and their metadata
        names_to_keep = self._creation_order[-n:]
        names_to_remove = [name for name in self._creation_order if name not in names_to_keep]

        for name in names_to_keep:
            if name in self.variables:
                variables_to_keep[name] = self.variables[name]
                original_creation_order.append(name)
                # Update max_variable_counter if the kept variable name is auto-generated
                if name.startswith("variable_") and name[9:].isdigit():
                    max_variable_counter = max(max_variable_counter, int(name[9:]))

        details = f"Keeping last **{n}** variables, removing **{len(names_to_remove)}** variables"
        extra_info = f"""
### 🔄 Partial Reset (Keep Last {n})

**Variables Kept:**
{chr(10).join(f'- ✅ `{name}`: {self.variables[name].type}' for name in names_to_keep) if names_to_keep else '- None'}

**Variables Removed:**
{chr(10).join(f'- ❌ `{name}`: {self.variables[name].type}' for name in names_to_remove) if names_to_remove else '- None'}

### Stack Trace
```python
{''.join(traceback.format_stack()[:-1])}
```
"""
        self._log_operation("🔄 PARTIAL RESET", details, extra_info)

        # Perform the reset (this will log again, but that's ok)
        self.variables = {}
        self.variable_counter = 0
        self._creation_order = []

        # Re-add the identified variables
        for name in original_creation_order:
            metadata = variables_to_keep[name]
            self.variables[name] = VariableMetadata(
                metadata.value, description=metadata.description, created_at=metadata.created_at
            )
            self._creation_order.append(name)

        # Set the variable counter to ensure future auto-generated names don't conflict
        self.variable_counter = max_variable_counter

    def get_variable_count(self) -> int:
        """
        Get the total number of variables stored.

        Returns:
            int: Number of variables
        """
        return len(self.variables)

    def __str__(self) -> str:
        """String representation of the variables manager."""
        return f"VariablesManager(count={self.get_variable_count()})"

    def __repr__(self) -> str:
        """Detailed representation of the variables manager."""
        return f"VariablesManager(variables={self.variables}, counter={self.variable_counter})"
