from cuga.backend.cuga_graph.nodes.api.code_agent.code_act_agent import extract_and_combine_codeblocks


class TestExtractAndCombineCodeblocks:
    """Test suite for extract_and_combine_codeblocks function."""

    def test_plain_identifier(self):
        """Plain identifier should compile and return as-is."""
        result = extract_and_combine_codeblocks('sami')
        assert result == 'sami'

    def test_plain_number(self):
        """Plain number should compile and return as-is."""
        result = extract_and_combine_codeblocks('123')
        assert result == '123'

    def test_invalid_syntax(self):
        """Invalid syntax should return empty string."""
        result = extract_and_combine_codeblocks('hello world')
        assert result == ''

    def test_function_call(self):
        """Function call without markdown should compile and return."""
        result = extract_and_combine_codeblocks('print("hello")')
        assert result == 'print("hello")'

    def test_assignment(self):
        """Assignment statement should compile and return."""
        result = extract_and_combine_codeblocks('x = 5')
        assert result == 'x = 5'

    def test_multiple_statements(self):
        """Multiple statements should compile and return."""
        result = extract_and_combine_codeblocks('x = 5\nprint(x)')
        assert result == 'x = 5\nprint(x)'

    def test_function_definition(self):
        """Function definition should compile and return."""
        result = extract_and_combine_codeblocks('def foo():\n    pass')
        assert result == 'def foo():\n    pass'

    def test_simple_markdown_block(self):
        """Simple markdown code block should extract code."""
        result = extract_and_combine_codeblocks('```python\nprint("hello")\n```')
        assert result == 'print("hello")'

    def test_text_before_markdown(self):
        """Text before markdown should extract only code."""
        result = extract_and_combine_codeblocks('Here is some code:\n```python\nx = 5\n```')
        assert result == 'x = 5'

    def test_text_before_markdown_with_newline(self):
        """Text before markdown should extract only code."""
        result = extract_and_combine_codeblocks('Here is some code:\n\n```python\n\n\nx = 5\n\n```')
        assert result == 'x = 5'

    def test_text_and_markdown(self):
        """Text with markdown should extract only code."""
        result = extract_and_combine_codeblocks('Let me show you:\n```python\nprint("test")\n```')
        assert result == 'print("test")'

    def test_markdown_with_text_after(self):
        """Markdown with text after should extract only code."""
        result = extract_and_combine_codeblocks('```python\nx = 10\n```\nThat was the code')
        assert result == 'x = 10'

    def test_markdown_with_text(self):
        """Markdown with text should extract only code."""
        result = extract_and_combine_codeblocks('```python\nprint("hi")\n```\nEnd of example')
        assert result == 'print("hi")'

    def test_text_markdown_text(self):
        """Text before and after markdown should extract only code."""
        result = extract_and_combine_codeblocks('Here is code:\n```python\ny = 20\n```\nThat was it')
        assert result == 'y = 20'

    def test_full_example_with_loop(self):
        """Full example with loop in markdown should extract code."""
        result = extract_and_combine_codeblocks(
            'Example:\n```python\nfor i in range(5):\n    print(i)\n```\nDone!'
        )
        assert result == 'for i in range(5):\n    print(i)'

    def test_two_markdown_blocks(self):
        """Two markdown blocks should combine with double newline."""
        result = extract_and_combine_codeblocks('```python\nx = 1\n```\n```python\ny = 2\n```')
        assert result == 'x = 1\n\ny = 2'

    def test_two_blocks_with_text(self):
        """Two blocks with text between should combine code only."""
        result = extract_and_combine_codeblocks(
            'Code 1:\n```python\na = 5\n```\nCode 2:\n```python\nb = 10\n```'
        )
        assert result == 'a = 5\n\nb = 10'

    def test_function_in_markdown(self):
        """Complex multi-line function in markdown should extract properly."""
        result = extract_and_combine_codeblocks(
            '```python\ndef calculate(x, y):\n    result = x + y\n    return result\n```'
        )
        assert result == 'def calculate(x, y):\n    result = x + y\n    return result'

    def test_empty_string(self):
        """Empty string should return empty."""
        result = extract_and_combine_codeblocks('')
        assert result == ''

    def test_whitespace_only(self):
        """Whitespace only should return empty."""
        result = extract_and_combine_codeblocks('   \n  \n  ')
        assert result == ''

    def test_markdown_without_python_tag(self):
        """Markdown without python tag should not match (requires python tag)."""
        result = extract_and_combine_codeblocks('```\nprint("test")\n```')
        assert result == ''

    def test_incomplete_markdown_block(self):
        """Incomplete markdown block should not match."""
        result = extract_and_combine_codeblocks('```python\nprint("test")')
        assert result == ''

    def test_nested_code_structures(self):
        """Nested code structures should be preserved."""
        code = '''def outer():
    def inner():
        return 42
    return inner()'''
        result = extract_and_combine_codeblocks(code)
        assert result == code

    def test_code_with_strings_containing_backticks(self):
        """Code with strings containing backticks should work."""
        result = extract_and_combine_codeblocks('x = "some `text` here"')
        assert result == 'x = "some `text` here"'

    def test_markdown_with_empty_code_block(self):
        """Markdown with empty code block should return empty string."""
        result = extract_and_combine_codeblocks('```python\n```')
        assert result == ''

    def test_class_definition(self):
        """Class definition should compile and return."""
        code = '''class MyClass:
    def __init__(self):
        self.value = 10'''
        result = extract_and_combine_codeblocks(code)
        assert result == code

    def test_import_statements(self):
        """Import statements should compile and return."""
        result = extract_and_combine_codeblocks('import os\nfrom sys import path')
        assert result == 'import os\nfrom sys import path'

    def test_markdown_with_class_definition(self):
        """Class definition in markdown should extract properly."""
        result = extract_and_combine_codeblocks('```python\nclass Test:\n    pass\n```')
        assert result == 'class Test:\n    pass'

    def test_multiple_functions_in_markdown(self):
        """Multiple functions in one markdown block should extract all."""
        code = '''def func1():
    return 1

def func2():
    return 2'''
        result = extract_and_combine_codeblocks(f'```python\n{code}\n```')
        assert result == code

    def test_async_await_statement(self):
        """Async await statement should compile and return."""
        result = extract_and_combine_codeblocks(
            'accounts_data = await get_accounts_accounts()\nprint(accounts_data)'
        )
        assert result == 'accounts_data = await get_accounts_accounts()\nprint(accounts_data)'

    def test_async_await_statement_without_variable(self):
        """Async await statement without variable should compile and return."""
        result = extract_and_combine_codeblocks('await get_accounts_accounts()\nprint(accounts_data)')
        assert result == 'await get_accounts_accounts()\nprint(accounts_data)'

    def test_async_await_in_mid_of_code(self):
        """Async await statement in mid of code should compile and return."""
        result = extract_and_combine_codeblocks(
            'accounts_data = await get_accounts_accounts()\nprint(accounts_data)\nawait get_accounts_accounts()'
        )
        assert (
            result
            == 'accounts_data = await get_accounts_accounts()\nprint(accounts_data)\nawait get_accounts_accounts()'
        )
