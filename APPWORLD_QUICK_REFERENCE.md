# 🚀 AppWorld 評估快速參考

## 常用命令速查

### 📋 瀏覽任務（無需服務）

```bash
# 列出任務
./appworld-eval list-tasks --limit 10

# 檢查任務詳情
./appworld-eval inspect-task 82e2fac_1
```

### 🏃 執行評估（需要服務）

**第 1 步：啟動所有服務（3 個，自動載入 AppWorld API）**
```bash
# 終端 1: 一鍵啟動全部服務（保持運行）
cd /Users/yichien/Desktop/ThesisResearch/cuga-agent
chmod +x start-all-services
./start-all-services

# 成功啟動會顯示：
# [1/3] 啟動 Registry 服務 (Port 8001) - 使用 AppWorld API 配置...
# ✅ Registry       http://localhost:8001  (載入 Venmo, Gmail, Phone 等)
# ✅ Environment    http://localhost:8000  
# ✅ APIs           http://localhost:9000
```

**第 2 步：執行評估**
```bash
# 終端 2: 執行任務評估
./appworld-eval run-task 82e2fac_1 --verbose

# 或批次評估
./appworld-eval batch-eval --max-tasks 10 --output results.json
```

---

## 三種使用方式比較

| 方式 | 命令範例 | 優點 | 需要環境變數 |
|------|---------|------|------------|
| **Wrapper 腳本**<br/>（推薦） | `./appworld-eval list-tasks` | • 最簡單<br/>• 自動設定環境 | ❌ 否 |
| **Python 模組** | `python -m cuga.evaluation.evaluate_appworld list-tasks` | • 標準方式<br/>• 適合整合 | ⚠️ 建議設定 |
| **Python API** | `from cuga.evaluation...` | • 最靈活<br/>• 程式化使用 | ⚠️ 建議設定 |

---

## 完整工作流程

### 場景 1: 快速查看任務（30 秒）

```bash
# 1. 列出任務
./appworld-eval list-tasks --limit 5

# 2. 查看詳情
./appworld-eval inspect-task 82e2fac_1
```

### 場景 2: 執行單一任務評估（2-3 分鐘）

```bash
# 終端 1: 啟動服務
cd /Users/yichien/Desktop/ThesisResearch/cuga-agent
cuga start appworld

# 終端 2: 執行評估
export APPWORLD_ROOT=/Users/yichien/Desktop/ThesisResearch/cuga-agent/appworld
.venv/bin/python -m cuga.evaluation.evaluate_appworld run-task 82e2fac_1 --verbose
```

### 場景 3: 批次評估 10 個任務（10-15 分鐘）

```bash
# 終端 1: 啟動服務
cuga start appworld

# 終端 2: 批次評估
./appworld-eval batch-eval --max-tasks 10 --output batch_10.json --verbose

# 檢查結果
cat batch_10.json | python -m json.tool | head -30
```

---

## 環境設定速查

### 檢查環境

```bash
# 檢查 APPWORLD_ROOT
echo $APPWORLD_ROOT

# 檢查 appworld 目錄
ls -la appworld/data/tasks/ | head

# 檢查 Python 環境
.venv/bin/python -c "import appworld; print(appworld.__version__)"
```

### 設定環境變數

```bash
# 臨時設定（當前終端有效）
export APPWORLD_ROOT=/Users/yichien/Desktop/ThesisResearch/cuga-agent/appworld

# 永久設定（添加到 ~/.zshrc）
echo 'export APPWORLD_ROOT=/Users/yichien/Desktop/ThesisResearch/cuga-agent/appworld' >> ~/.zshrc
source ~/.zshrc
```

### 驗證整合

```bash
# 運行系統驗證
.venv/bin/python verify_appworld_integration.py

# 應該看到 9/9 檢查通過
```

---

## 常見錯誤快速修復

| 錯誤訊息 | 原因 | 快速修復 |
|---------|------|---------|
| `APPWORLD_ROOT not set` | 環境變數未設定 | `export APPWORLD_ROOT=.../appworld` |
| `Did not find any ./data` | AppWorld 服務在錯誤目錄啟動 | 在專案根目錄執行 `cuga start appworld` |
| `AppWorld package not installed` | 缺少套件 | `cd appworld && pip install -e .` |
| `No module named 'pandas'` | 缺少依賴 | `uv pip install pandas` |
| `TypeError: 'NoneType' object is not callable` | LLM API 未配置 | 設定 Google GenAI 或 OpenAI API key |

---

## 服務狀態檢查

```bash
# 檢查 AppWorld 服務是否運行
curl http://localhost:8000/ 2>/dev/null && echo "✅ Environment server running" || echo "❌ Not running"
curl http://localhost:9000/ 2>/dev/null && echo "✅ API server running" || echo "❌ Not running"

# 停止服務
# 按 Ctrl+C 在運行 cuga start appworld 的終端
```

---

## 效能參考

| 操作 | 預估時間 | 備註 |
|------|---------|------|
| 列出任務 | < 1 秒 | 不需要服務 |
| 檢查任務 | < 1 秒 | 不需要服務 |
| 執行單一任務 | 30-60 秒 | 需要 LLM API |
| 批次評估 (10 任務) | 5-10 分鐘 | 視任務複雜度 |
| 批次評估 (50 任務) | 25-50 分鐘 | 建議分批執行 |

---

## 📝 日誌查看

### 服務日誌
```bash
# 查看 Registry 服務日誌
tail -f logging/services/cuga_registry.log

# 查看 AppWorld 服務日誌
tail -f logging/services/appworld_env.log
tail -f logging/services/appworld_api.log
```

### Agent 執行記錄
```bash
# 查看任務執行追蹤
cat logging/d0b1f43_2.json | python3 -m json.tool

# 提取關鍵資訊
cat logging/d0b1f43_2.json | python3 -c "
import json, sys
data = json.load(sys.stdin)
print(f'任務: {data[\"intent\"]}')
print(f'步驟數: {len(data[\"steps\"])}')
print(f'使用的 API:', [s['name'] for s in data['steps']])
"
```

### 評估結果
```bash
# 查看 JSON 結果
cat results.json | python -m json.tool

# 提取準確率
cat results.json | python -c "import json, sys; data=json.load(sys.stdin); print(f'Accuracy: {data[\"accuracy\"]:.1%}')"

# 按難度統計
cat results.json | python -c "
import json, sys
from collections import defaultdict
data = json.load(sys.stdin)
by_diff = defaultdict(list)
for r in data['results']:
    by_diff[r['difficulty']].append(r['correct'])
for diff in sorted(by_diff.keys()):
    results = by_diff[diff]
    acc = sum(results) / len(results)
    print(f'難度 {diff}: {sum(results)}/{len(results)} ({acc:.1%})')
"
```

---

## 更多資訊

- 📖 完整文檔：[APPWORLD_USAGE.md](APPWORLD_USAGE.md)
- 🏁 整合總結：[APPWORLD_INTEGRATION_COMPLETE.md](APPWORLD_INTEGRATION_COMPLETE.md)
- 🔍 系統驗證：`./verify_appworld_integration.py`
- 💻 原始碼：`src/cuga/evaluation/evaluate_appworld.py`

---

**最後更新**: 2024-11-17  
**版本**: 1.0.0
