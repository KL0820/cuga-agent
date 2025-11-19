#!/usr/bin/env python3
"""
Verify Gemini Configuration Script
用於驗證 Google Gemini 配置是否正確設置

Usage:
    python scripts/verify_gemini_config.py
"""

import os
import sys
from pathlib import Path

# Color codes for terminal output
GREEN = '\033[92m'
RED = '\033[91m'
YELLOW = '\033[93m'
BLUE = '\033[94m'
RESET = '\033[0m'


def print_header(text):
    """Print a formatted header"""
    print(f"\n{BLUE}{'='*60}{RESET}")
    print(f"{BLUE}{text}{RESET}")
    print(f"{BLUE}{'='*60}{RESET}\n")


def check_mark(condition, success_msg, failure_msg=""):
    """Print a check mark or X with message"""
    if condition:
        print(f"{GREEN}✓{RESET} {success_msg}")
        return True
    else:
        print(f"{RED}✗{RESET} {failure_msg or success_msg}")
        return False


def verify_gemini_config():
    """Verify all Gemini configuration requirements"""
    print_header("🚀 Google Gemini Configuration Verification")
    
    all_passed = True
    
    # Check 1: AGENT_SETTING_CONFIG environment variable
    print(f"{YELLOW}Checking environment variables...{RESET}")
    config_file = os.environ.get('AGENT_SETTING_CONFIG')
    check_1 = check_mark(
        config_file == 'settings.google.toml',
        f"AGENT_SETTING_CONFIG = {config_file}",
        f"AGENT_SETTING_CONFIG should be 'settings.google.toml' but is '{config_file}'"
    )
    all_passed &= check_1
    
    # Check 2: GOOGLE_API_KEY is set
    google_api_key = os.environ.get('GOOGLE_API_KEY')
    check_2 = check_mark(
        google_api_key and len(google_api_key) > 10,
        f"GOOGLE_API_KEY is set ({len(google_api_key)} characters)",
        "GOOGLE_API_KEY is not set or too short. Please set: export GOOGLE_API_KEY=your-key-here"
    )
    all_passed &= check_2
    
    # Check 3: Config file exists
    print(f"\n{YELLOW}Checking configuration files...{RESET}")
    config_path = Path("/Users/yichien/Desktop/ThesisResearch/cuga-agent/src/cuga/configurations/models/settings.google.toml")
    check_3 = check_mark(
        config_path.exists(),
        f"settings.google.toml exists at {config_path}",
        f"settings.google.toml not found at {config_path}"
    )
    all_passed &= check_3
    
    # Check 4: Config file contains google-genai platform
    if config_path.exists():
        config_content = config_path.read_text()
        check_4 = check_mark(
            'platform = "google-genai"' in config_content,
            "settings.google.toml contains 'platform = \"google-genai\"'",
            "settings.google.toml does not contain correct platform configuration"
        )
        all_passed &= check_4
        
        # Check 5: API key name is correct
        check_5 = check_mark(
            'apikey_name = "GOOGLE_API_KEY"' in config_content,
            "settings.google.toml uses 'GOOGLE_API_KEY' environment variable",
            "settings.google.toml is not using correct API key variable name"
        )
        all_passed &= check_5
    
    # Check 6: Verify Python packages
    print(f"\n{YELLOW}Checking required packages...{RESET}")
    try:
        import langchain_google_genai
        check_mark(True, "langchain-google-genai package is installed")
    except ImportError:
        check_mark(False, "langchain-google-genai package is not installed")
        print(f"   {YELLOW}Install with: pip install langchain-google-genai{RESET}")
        all_passed = False
    
    try:
        from langchain_google_genai import ChatGoogleGenerativeAI
        check_mark(True, "ChatGoogleGenerativeAI can be imported")
    except ImportError as e:
        check_mark(False, f"Cannot import ChatGoogleGenerativeAI: {e}")
        all_passed = False
    
    # Test Google API connection (optional)
    print(f"\n{YELLOW}Testing Google API connection (optional)...{RESET}")
    if google_api_key and len(google_api_key) > 10:
        try:
            from langchain_google_genai import ChatGoogleGenerativeAI
            llm = ChatGoogleGenerativeAI(
                api_key=google_api_key,
                model="gemini-2.0-flash",
                temperature=0.1,
                max_tokens=100,
            )
            # Try a simple invoke
            result = llm.invoke("Say 'Hello from Gemini!' in exactly those words.")
            check_mark(True, f"✓ Successfully connected to Google Gemini API")
            print(f"   Response: {result.content[:100]}")
        except Exception as e:
            check_mark(False, f"Failed to connect to Google Gemini API: {str(e)[:100]}")
            all_passed = False
    
    # Summary
    print_header("Summary")
    if all_passed:
        print(f"{GREEN}✓ All checks passed! Your Gemini configuration is ready.{RESET}")
        print(f"\n{YELLOW}Next steps:{RESET}")
        print(f"  1. Run: cuga start demo")
        print(f"  2. Open: https://localhost:8005")
        print(f"  3. Try a task!")
        return 0
    else:
        print(f"{RED}✗ Some checks failed. Please review the errors above.{RESET}")
        return 1


def show_config_status():
    """Show current configuration status"""
    print_header("Current Configuration")
    
    print(f"AGENT_SETTING_CONFIG: {os.environ.get('AGENT_SETTING_CONFIG', 'NOT SET')}")
    print(f"GOOGLE_API_KEY: {os.environ.get('GOOGLE_API_KEY', 'NOT SET')}")
    
    # Show config file content preview
    config_path = Path("/Users/yichien/Desktop/ThesisResearch/cuga-agent/src/cuga/configurations/models/settings.google.toml")
    if config_path.exists():
        print(f"\nFirst 10 lines of settings.google.toml:")
        lines = config_path.read_text().split('\n')[:10]
        for line in lines:
            print(f"  {line}")


if __name__ == "__main__":
    if "--show-config" in sys.argv:
        show_config_status()
    else:
        exit_code = verify_gemini_config()
        sys.exit(exit_code)
