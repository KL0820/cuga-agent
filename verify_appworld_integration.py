#!/usr/bin/env python3
"""
驗證 CUGA × AppWorld 整合系統

This script verifies that the AppWorld evaluation integration is properly set up.
"""

import os
import sys
from pathlib import Path
from typing import List, Tuple

def check_item(name: str, check_func, fix_hint: str = "") -> bool:
    """執行檢查並顯示結果"""
    try:
        result = check_func()
        if result:
            print(f"✅ {name}")
            return True
        else:
            print(f"❌ {name}")
            if fix_hint:
                print(f"   💡 {fix_hint}")
            return False
    except Exception as e:
        print(f"❌ {name}")
        print(f"   ⚠️  Error: {e}")
        if fix_hint:
            print(f"   💡 {fix_hint}")
        return False


def check_appworld_root() -> bool:
    """檢查 APPWORLD_ROOT 環境變數"""
    appworld_root = os.getenv('APPWORLD_ROOT')
    if not appworld_root:
        return False
    if not Path(appworld_root).exists():
        return False
    return True


def check_appworld_tasks() -> bool:
    """檢查 AppWorld 任務目錄"""
    appworld_root = os.getenv('APPWORLD_ROOT')
    if not appworld_root:
        return False
    tasks_path = Path(appworld_root) / 'data' / 'tasks'
    return tasks_path.exists() and tasks_path.is_dir()


def check_sample_task() -> bool:
    """檢查樣本任務存在"""
    appworld_root = os.getenv('APPWORLD_ROOT')
    if not appworld_root:
        return False
    sample_task = Path(appworld_root) / 'data' / 'tasks' / '024c982_1'
    return sample_task.exists()


def check_appworld_package() -> bool:
    """檢查 AppWorld 套件已安裝"""
    try:
        import appworld
        return True
    except ImportError:
        return False


def check_cuga_evaluation_module() -> bool:
    """檢查評估模組存在"""
    module_path = Path(__file__).parent / 'src' / 'cuga' / 'evaluation' / 'evaluate_appworld.py'
    return module_path.exists()


def check_module_imports() -> bool:
    """檢查模組可以正確匯入"""
    try:
        sys.path.insert(0, str(Path(__file__).parent / 'src'))
        from cuga.evaluation.evaluate_appworld import AppWorldLoader
        return True
    except ImportError as e:
        print(f"      Import error: {e}")
        return False


def check_task_loading() -> bool:
    """檢查可以載入任務"""
    try:
        sys.path.insert(0, str(Path(__file__).parent / 'src'))
        from cuga.evaluation.evaluate_appworld import AppWorldLoader
        loader = AppWorldLoader()
        task_ids = loader.list_all_tasks()
        return len(task_ids) > 0
    except Exception as e:
        print(f"      Error: {e}")
        return False


def check_sample_task_details() -> bool:
    """檢查可以讀取任務詳情"""
    try:
        sys.path.insert(0, str(Path(__file__).parent / 'src'))
        from cuga.evaluation.evaluate_appworld import AppWorldLoader
        loader = AppWorldLoader()
        task_info = loader.load_task('024c982_1')
        return task_info.task_id == '024c982_1'
    except Exception as e:
        print(f"      Error: {e}")
        return False


def check_cuga_imports() -> bool:
    """檢查 CUGA 相關模組可匯入"""
    try:
        sys.path.insert(0, str(Path(__file__).parent / 'src'))
        from cuga.backend.cuga_graph.utils.controller import AgentRunner
        from cuga.config import settings
        return True
    except ImportError as e:
        print(f"      Import error: {e}")
        return False


def main():
    print("\n" + "="*70)
    print("🔍 CUGA × AppWorld 整合系統驗證")
    print("="*70 + "\n")
    
    checks: List[Tuple[str, callable, str]] = [
        (
            "APPWORLD_ROOT 環境變數已設定",
            check_appworld_root,
            "執行: export APPWORLD_ROOT=/path/to/appworld"
        ),
        (
            "AppWorld 任務目錄存在",
            check_appworld_tasks,
            "確認 $APPWORLD_ROOT/data/tasks 目錄存在"
        ),
        (
            "樣本任務 024c982_1 存在",
            check_sample_task,
            "確認 AppWorld 資料完整"
        ),
        (
            "AppWorld Python 套件已安裝",
            check_appworld_package,
            "執行: cd appworld && pip install -e ."
        ),
        (
            "評估模組檔案存在",
            check_cuga_evaluation_module,
            "確認 src/cuga/evaluation/evaluate_appworld.py 存在"
        ),
        (
            "評估模組可正確匯入",
            check_module_imports,
            "檢查 Python 路徑和依賴"
        ),
        (
            "可以載入 AppWorld 任務列表",
            check_task_loading,
            "確認 AppWorld 設定正確"
        ),
        (
            "可以讀取任務詳細資訊",
            check_sample_task_details,
            "確認任務資料完整"
        ),
        (
            "CUGA 核心模組可匯入",
            check_cuga_imports,
            "確認 CUGA Agent 已正確安裝"
        ),
    ]
    
    results = []
    for name, check_func, fix_hint in checks:
        result = check_item(name, check_func, fix_hint)
        results.append(result)
        print()
    
    # 總結
    passed = sum(results)
    total = len(results)
    
    print("="*70)
    print(f"📊 驗證結果: {passed}/{total} 項檢查通過")
    print("="*70)
    
    if passed == total:
        print("\n✅ 所有檢查通過！系統已就緒。\n")
        print("🚀 快速開始：")
        print("   python -m cuga.evaluation.evaluate_appworld list-tasks --limit 5")
        print("   python -m cuga.evaluation.evaluate_appworld inspect-task 024c982_1")
        print()
        print("📚 完整文檔: APPWORLD_USAGE.md")
        print()
        return 0
    else:
        print(f"\n⚠️  {total - passed} 項檢查失敗，請根據上方提示修復。\n")
        return 1


if __name__ == "__main__":
    sys.exit(main())
