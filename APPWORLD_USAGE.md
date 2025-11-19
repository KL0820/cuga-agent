# 🌍 CUGA Agent × AppWorld 整合使用指南

## 📋 快速開始

### 1. 環境設定

```bash
# 設定 AppWorld 根目錄
export APPWORLD_ROOT=/Users/yichien/Desktop/ThesisResearch/cuga-agent/appworld

# 確認設定成功
echo $APPWORLD_ROOT
```

### 2. 安裝依賴

```bash
# 啟用虛擬環境
source .venv/bin/activate

# 確認 AppWorld 已安裝
python -c "import appworld; print(f'AppWorld version: {appworld.__version__}')"
```

## 🚀 基本使用

### 啟動所有必要服務（執行任務評估時需要）

**何時需要啟動服務？**
- ❌ `list-tasks` - 不需要
- ❌ `inspect-task` - 不需要
- ✅ `run-task` - **需要 3 個服務**
- ✅ `batch-eval` - **需要 3 個服務**

**需要的服務：**
1. **Registry 服務** (Port 8001) - CUGA Agent 工具註冊
2. **AppWorld Environment** (Port 8000) - 任務環境
3. **AppWorld APIs** (Port 9000) - 應用 API

**🚀 方法 1: 一鍵啟動所有服務（推薦）**

```bash
# 啟動全部服務（Registry + AppWorld Environment + APIs）
chmod +x start-all-services
./start-all-services
```

這會自動啟動所有 3 個服務，並顯示狀態。

**方法 2: 分別啟動**

```bash
# 終端 1: 啟動 Registry
cuga start registry

# 終端 2: 啟動 AppWorld（自動啟動 Environment + APIs）
export APPWORLD_ROOT=/Users/yichien/Desktop/ThesisResearch/cuga-agent/appworld
cuga start appworld
```

**成功啟動的訊息：**
```
┌──────────────────────────────────────────────────┐
│ AppWorld services are running. Press Ctrl+C to stop  │
│ Environment: http://localhost:8000               │
│ API: http://localhost:9000                       │
└──────────────────────────────────────────────────┘
```

**常見啟動錯誤：**

如果看到 `Did not find any ./data in the AppWorld's root directory`：
1. 確認當前目錄：`pwd` 應該顯示專案根目錄
2. 確認 appworld 子目錄存在：`ls -la appworld/data/`
3. 或手動設定：`export APPWORLD_ROOT=/path/to/appworld`

---

### 列出可用任務

```bash
# 列出前 10 個任務
python -m cuga.evaluation.evaluate_appworld list-tasks --limit 10

# 列出所有任務
python -m cuga.evaluation.evaluate_appworld list-tasks
```

**輸出範例：**
```
📋 AppWorld Tasks (showing 10 of 732 total)

#     Task ID         Instruction                                          
================================================================================
1     024c982_1       Request $13 publicly on Venmo from my friend...     
2     024c982_2       Request $28 on Venmo from my friend Joyce...        
3     042a9fc_1       Schedule a meeting with friend Joyce...             
...
```

### 檢查任務詳情

```bash
python -m cuga.evaluation.evaluate_appworld inspect-task 024c982_1
```

**輸出範例：**
```
📌 Task Details: 024c982_1
================================================================================
Instruction: Request $13 publicly on Venmo from my friend Joyce Weaver
Difficulty: 1/5 ⭐
API Calls: 7
Required Apps: venmo
Supervisor: Joyce Weaver (joyce.weaver@email.com)
DateTime: 2024-01-15 14:30:00
DB Version: 1.0
================================================================================
```

### 執行單一任務評估

**重要**: 執行任務評估前，需要先啟動 AppWorld 服務：

```bash
# 方法 1: 自動啟動（推薦）- CLI 會自動偵測 appworld 目錄
cuga start appworld

# 方法 2: 手動設定環境變數
export APPWORLD_ROOT=/Users/yichien/Desktop/ThesisResearch/cuga-agent/appworld
cuga start appworld
```

等服務啟動後，在另一個終端執行評估：

```bash
# 執行 CUGA Agent 並自動評估
python -m cuga.evaluation.evaluate_appworld run-task 024c982_1

# 詳細模式（顯示執行過程）
python -m cuga.evaluation.evaluate_appworld run-task 024c982_1 --verbose
```

**注意**: 
- `list-tasks` 和 `inspect-task` 命令不需要啟動 AppWorld 服務
- `run-task` 和 `batch-eval` 命令需要 AppWorld 服務運行

**輸出範例：**
```
🚀 Running CUGA Agent on task: 024c982_1

📊 Evaluation Results
================================================================================
Task ID: 024c982_1
Status: ✅ CORRECT
Difficulty: 1/5
Tests Passed: 15/15
Execution Time: 45.23s
================================================================================
```

### 批次評估多個任務

```bash
# 評估前 50 個任務
python -m cuga.evaluation.evaluate_appworld batch-eval --max-tasks 50 --output results.json

# 評估所有任務（需要較長時間）
python -m cuga.evaluation.evaluate_appworld batch-eval --output all_results.json

# 詳細模式
python -m cuga.evaluation.evaluate_appworld batch-eval --max-tasks 10 --verbose
```

**輸出範例：**
```
Evaluating tasks: 100%|████████████████| 50/50 [38:45<00:00, 46.51s/it]

============================================================
Batch Evaluation Complete
============================================================
Total Tasks: 50
Successful: 35
Failed: 15
Accuracy: 70.0%
Avg Difficulty: 2.1/5
Avg Execution Time: 46.5s
Total Time: 2325.3s
============================================================

Results saved to: results.json
```

## 📊 結果格式

### 批次評估輸出 JSON 格式

```json
{
  "total_tasks": 50,
  "successful_tasks": 35,
  "failed_tasks": 15,
  "accuracy": 0.70,
  "avg_difficulty": 2.1,
  "avg_api_calls": 12.4,
  "avg_execution_time": 46.5,
  "timestamp": "2024-11-17T10:30:00",
  "results": [
    {
      "task_id": "024c982_1",
      "correct": true,
      "difficulty": 1,
      "api_calls_count": 7,
      "agent_answer": "...",
      "pass_count": 15,
      "fail_count": 0,
      "total_tests": 15,
      "execution_time": 45.23,
      "error_message": null
    },
    ...
  ]
}
```

## 🐍 Python API 使用

### 基本使用

```python
from cuga.evaluation.evaluate_appworld import (
    AppWorldLoader,
    AppWorldCUGARunner,
    AppWorldBatchEvaluator
)

# 1. 載入任務
loader = AppWorldLoader()
task_ids = loader.list_all_tasks()
print(f"Total tasks: {len(task_ids)}")

# 2. 檢查特定任務
task_info = loader.load_task('024c982_1')
print(f"Instruction: {task_info.instruction}")
print(f"Difficulty: {task_info.difficulty}/5")

# 3. 執行單一任務
runner = AppWorldCUGARunner()
result = await runner.evaluate_task('024c982_1', verbose=True)
print(f"Result: {'✅' if result.correct else '❌'}")
print(f"Tests: {result.pass_count}/{result.total_tests}")

# 4. 批次評估
evaluator = AppWorldBatchEvaluator()
report = await evaluator.evaluate_batch(max_tasks=10)
print(f"Accuracy: {report.accuracy:.1%}")
```

### 進階使用：自訂評估流程

```python
import asyncio
from cuga.evaluation.evaluate_appworld import AppWorldCUGARunner

async def custom_evaluation():
    runner = AppWorldCUGARunner(experiment_name="my_experiment")
    
    # 只執行 Agent，不評估
    result = await runner.run_task('024c982_1', verbose=True)
    print(f"Agent answer: {result.answer}")
    
    # 後續再評估
    eval_result = await runner.evaluate_task(
        task_id='024c982_1',
        agent_answer=result.answer,
        run_agent=False
    )
    print(f"Evaluation: {eval_result.correct}")

asyncio.run(custom_evaluation())
```

### 批次處理特定難度任務

```python
from cuga.evaluation.evaluate_appworld import AppWorldLoader, AppWorldBatchEvaluator

async def evaluate_by_difficulty(difficulty: int):
    loader = AppWorldLoader()
    
    # 篩選特定難度的任務
    all_task_ids = loader.list_all_tasks()
    filtered_tasks = []
    
    for task_id in all_task_ids:
        task_info = loader.load_task(task_id)
        if task_info.difficulty == difficulty:
            filtered_tasks.append(task_id)
    
    print(f"Found {len(filtered_tasks)} tasks with difficulty {difficulty}")
    
    # 評估篩選後的任務
    evaluator = AppWorldBatchEvaluator()
    report = await evaluator.evaluate_batch(
        task_ids=filtered_tasks,
        output_file=f"difficulty_{difficulty}_results.json"
    )
    
    return report

# 評估難度 1 的所有任務
import asyncio
report = asyncio.run(evaluate_by_difficulty(1))
print(f"Difficulty 1 accuracy: {report.accuracy:.1%}")
```

## 🔧 進階設定

### 自訂 AppWorld 根目錄

```python
from cuga.evaluation.evaluate_appworld import AppWorldLoader

# 方法 1: 使用環境變數
import os
os.environ['APPWORLD_ROOT'] = '/path/to/appworld'

# 方法 2: 直接傳入參數
loader = AppWorldLoader(appworld_root='/path/to/appworld')
```

### 自訂實驗名稱

```python
runner = AppWorldCUGARunner(experiment_name="experiment_20241117")
```

### 設定超時時間

```python
result = await runner.run_task('024c982_1', timeout=120)  # 120 秒超時
```

## � 日誌與追蹤

### 日誌檔案位置

執行過程中會產生多種日誌檔案：

#### 1. 服務日誌（由 `start-all-services` 建立）

```bash
logging/services/cuga_registry.log      # Registry 服務日誌
logging/services/appworld_env.log       # AppWorld Environment 日誌
logging/services/appworld_api.log       # AppWorld APIs 日誌
```

**查看方法：**
```bash
# 即時監看 Registry 日誌
tail -f logging/services/cuga_registry.log

# 查看完整 AppWorld Environment 日誌
cat logging/services/appworld_env.log

# 查看最後 50 行 API 日誌
tail -50 logging/services/appworld_api.log
```

#### 2. Agent 執行追蹤（Trajectory Data）

CUGA Agent 會記錄每個任務的完整執行過程：

```bash
logging/                     # CUGA Agent 主日誌目錄
├── d0b1f43_2.json          # 任務 d0b1f43_2 的執行摘要
├── 024c982_1.json          # 任務 024c982_1 的執行摘要
└── services/                # 服務日誌
    ├── cuga_registry.log
    ├── appworld_env.log
    └── appworld_api.log
```

**日誌內容包含：**
- **intent**: 任務指令
- **task_id**: 任務 ID
- **steps**: Agent 每一步的執行細節
  - Agent 名稱（TaskAnalyzerAgent, PlanControllerAgent 等）
  - 使用的 API 和工具
  - 每步的輸入輸出
- **actions_count**: 執行的動作數量
- **score**: 評估分數
- **eval**: 評估結果詳情

**查看範例：**
```bash
# 查看任務執行記錄（格式化 JSON）
cat logging/d0b1f43_2.json | python3 -m json.tool

# 提取關鍵資訊
cat logging/d0b1f43_2.json | python3 -c "
import json, sys
data = json.load(sys.stdin)
print(f'任務: {data[\"intent\"]}')
print(f'步驟數: {len(data[\"steps\"])}')
print(f'動作數: {data[\"actions_count\"]}')
print(f'分數: {data[\"score\"]}')
"
```

#### 3. AppWorld 實驗輸出（完整執行記錄）

AppWorld 會保存**最詳細**的執行記錄到實驗目錄：

```bash
appworld/experiments/outputs/default/tasks/<task_id>/
├── logs/
│   ├── api_calls.jsonl         # 🔥 所有 API 呼叫記錄（含請求/回應）
│   └── environment_io.md       # 🔥 Agent 與環境的互動過程
├── dbs/                        # 資料庫最終狀態
│   ├── venmo.jsonl            # Venmo 交易記錄
│   ├── gmail.jsonl            # 郵件記錄
│   └── ...                    # 其他 app 資料
├── checkpoints/               # 執行過程的快照
├── misc/                      # 其他中繼資料
└── version/                   # 版本資訊
    ├── code.txt
    └── data.txt
```

**最重要的檔案：**

1. **`logs/api_calls.jsonl`** - 完整的 API 呼叫記錄
   ```bash
   # 查看所有 API 呼叫
   cat appworld/experiments/outputs/default/tasks/d0b1f43_2/logs/api_calls.jsonl
   
   # 每一行是一個 JSON 物件，包含：
   # - endpoint: API 端點
   # - method: HTTP 方法
   # - request: 請求參數
   # - response: 回應內容
   # - timestamp: 時間戳記
   ```

2. **`logs/environment_io.md`** - Agent 與環境的對話記錄
   ```bash
   # 查看 Agent 執行過程（Markdown 格式）
   cat appworld/experiments/outputs/default/tasks/d0b1f43_2/logs/environment_io.md
   
   # 包含：
   # - Agent 的每個動作
   # - 環境的回應
   # - 執行的 API 呼叫
   # - 時間序列
   ```

3. **`dbs/*.jsonl`** - 執行後的資料庫狀態
   ```bash
   # 查看 Venmo 交易記錄
   cat appworld/experiments/outputs/default/tasks/d0b1f43_2/dbs/venmo.jsonl
   
   # 可以比對初始狀態和最終狀態，看 Agent 做了哪些修改
   ```

**查看完整執行過程：**
```bash
# 1. 查看 CUGA Agent 執行摘要
cat logging/d0b1f43_2.json | python3 -m json.tool

# 2. 查看詳細的 API 呼叫記錄
cat appworld/experiments/outputs/default/tasks/d0b1f43_2/logs/api_calls.jsonl | python3 -m json.tool

# 3. 查看人類可讀的執行過程
cat appworld/experiments/outputs/default/tasks/d0b1f43_2/logs/environment_io.md

# 4. 查看資料庫最終狀態
ls -lh appworld/experiments/outputs/default/tasks/d0b1f43_2/dbs/
```

#### 4. 批次評估結果（統計報告）

```bash
results.json                 # 批次評估輸出（自訂路徑）
all_results.json            # 完整評估結果
difficulty_1_results.json   # 難度分類結果
```

**完整的日誌層級：**

| 層級 | 位置 | 詳細程度 | 用途 |
|------|------|---------|------|
| **服務日誌** | `logging/services/*.log` | ⭐ | 排查服務問題 |
| **Agent 摘要** | `logging/<task_id>.json` | ⭐⭐ | 快速查看執行狀態 |
| **完整記錄** | `appworld/experiments/outputs/default/tasks/<task_id>/` | ⭐⭐⭐⭐⭐ | 詳細分析、除錯 |
| **統計報告** | `results.json` | ⭐ | 批次評估統計 |

### 啟用/停用追蹤

預設情況下，tracker 是**停用**的（節省磁碟空間）。你會看到：
```
WARNING | cuga.config:<module>:147 - tracker disabled - logs and trajectory data will not be saved
```

**啟用完整追蹤：**
```bash
# 設定環境變數
export CUGA_ENABLE_TRACKER=true

# 執行評估
python -m cuga.evaluation.evaluate_appworld run-task d0b1f43_2 --verbose
```

啟用後會產生更詳細的 trajectory 資料在 `logging/trajectory_data/` 目錄。

### 自訂日誌目錄

```bash
# 更改日誌根目錄
export CUGA_LOGGING_DIR=/path/to/your/logs

# 確認設定
python3 -c "from cuga.config import LOGGING_DIR; print(LOGGING_DIR)"
```

## �📈 評估指標說明

### 任務層級指標

- **correct**: 是否完全正確（所有測試通過）
- **difficulty**: 任務難度 (1-5)
- **pass_count**: 通過的測試數量
- **fail_count**: 失敗的測試數量
- **total_tests**: 總測試數量
- **execution_time**: 執行時間（秒）

### 批次層級指標

- **accuracy**: 正確率 (successful_tasks / total_tasks)
- **avg_difficulty**: 平均難度
- **avg_api_calls**: 平均 API 呼叫次數
- **avg_execution_time**: 平均執行時間

## 🛠️ 故障排除

### 問題 1: APPWORLD_ROOT 未設定

**錯誤訊息：**
```
ValueError: APPWORLD_ROOT not set
Exception: Did not find any ./data in the AppWorld's root directory
```

**解決方案：**

方法 1 - 讓 CLI 自動偵測（推薦）：
```bash
# 確保在專案根目錄
cd /Users/yichien/Desktop/ThesisResearch/cuga-agent

# CLI 會自動偵測 ./appworld 目錄
cuga start appworld
```

方法 2 - 手動設定環境變數：
```bash
export APPWORLD_ROOT=/Users/yichien/Desktop/ThesisResearch/cuga-agent/appworld

# 或添加到 ~/.zshrc 永久設定
echo 'export APPWORLD_ROOT=/Users/yichien/Desktop/ThesisResearch/cuga-agent/appworld' >> ~/.zshrc
source ~/.zshrc
```

方法 3 - 使用評估工具的 wrapper 腳本：
```bash
# wrapper 腳本會自動設定 APPWORLD_ROOT
./appworld-eval list-tasks --limit 10
```

### 問題 2: AppWorld 套件未安裝

```
ImportError: AppWorld package not installed
```

**解決方案：**
```bash
cd appworld
pip install -e .
```

### 問題 3: 任務載入失敗

```
FileNotFoundError: AppWorld tasks directory not found
```

**解決方案：**
檢查 AppWorld 資料是否完整：
```bash
ls $APPWORLD_ROOT/data/tasks
# 應該看到 732 個任務目錄
```

### 問題 4: Agent 載入錯誤的 API（如 digital_sales）

**症狀：**
```
DEBUG | cuga.backend.cuga_graph.nodes.task_decomposition_planning.analyze_task:node_handler:140 - all apps are: [AnalyzeTaskAppsOutput(name='digital_sales', ...)]
```

**原因：**
Registry 服務載入了預設配置 (`mcp_servers.yaml`) 而不是 AppWorld 配置 (`mcp_servers_appworld.yaml`)

**解決方案：**
使用更新後的 `start-all-services` 腳本，它會自動載入 AppWorld API 配置：
```bash
# 確保使用最新版本的啟動腳本
./start-all-services
```

腳本會設定環境變數 `MCP_SERVERS_FILE` 指向 AppWorld 配置，確保 Registry 載入正確的 API（Venmo, Gmail, Phone, Calendar 等）而不是 digital_sales。

**驗證方法：**
```bash
# 檢查 Registry 日誌確認使用的配置檔
cat logging/services/cuga_registry.log | grep "MCP_SERVERS_FILE"
# 應該顯示：.../mcp_servers_appworld.yaml
```

### 問題 5: Google Gemini API 超時 (504 Deadline Exceeded)

**錯誤訊息：**
```
Retrying langchain_google_genai.chat_models._achat_with_retry.<locals>._achat_with_retry in 2.0 seconds as it raised DeadlineExceeded: 504 Deadline Exceeded.
```

**原因：**
1. ❌ 環境變數 `GOOGLE_API_KEY` 未載入
2. ⚠️ API 請求超時（網路問題或 API 過載）
3. ⚠️ API 配額達到上限

**解決方案 1: 使用自動環境設定腳本（最推薦）**

專案提供了 `setup-env.sh` 自動載入所有環境變數：

```bash
# ⚠️ 重要：必須在「執行評估的同一個 terminal」中執行！
source setup-env.sh

# 確認環境變數已載入
# 應該會看到：✅ GOOGLE_API_KEY 已設定 (39 字元)

# 啟用虛擬環境
source .venv/bin/activate

# 執行評估
python -m cuga.evaluation.evaluate_appworld run-task d0b1f43_2 --verbose
```

**常見錯誤：環境變數不跨 terminal！**

如果你在 Terminal 1 執行 `source setup-env.sh`，但在 Terminal 2 執行評估，API Key 不會被載入。必須在**同一個 terminal** 中執行所有命令，或在每個新 terminal 重新執行 `source setup-env.sh`。

**方法 2: 手動載入 .env 檔案（備用）**

```bash
# 使用 export
export $(cat .env | grep -v '^#' | xargs)

# 或使用 source
set -a
source .env
set +a

# 驗證 API Key 已載入
if [ -z "$GOOGLE_API_KEY" ]; then 
  echo "❌ GOOGLE_API_KEY 未設定"
else 
  echo "✅ GOOGLE_API_KEY 已設定"
fi
```

**解決方案 2: 檢查 API 配額和連線**

**步驟 1: 測試 API 連線**

執行以下腳本測試 Google Gemini API 是否可用：

```bash
python3 <<EOF
import os
from langchain_google_genai import ChatGoogleGenerativeAI

# 檢查 API Key
if not os.getenv('GOOGLE_API_KEY'):
    print('❌ GOOGLE_API_KEY 未設定 - 請先執行 source setup-env.sh')
    exit(1)

print('✅ GOOGLE_API_KEY 已設定')

# 測試 API 連線
try:
    llm = ChatGoogleGenerativeAI(model='gemini-2.0-flash-exp', temperature=0.1, timeout=60)
    response = llm.invoke('Say hello in one word')
    print('✅ API 連線成功')
    print(f'回應: {response.content}')
except Exception as e:
    print(f'❌ API 連線失敗: {type(e).__name__}')
    print(f'錯誤訊息: {e}')
    print('\n可能原因：')
    print('1. API 配額達到上限')
    print('2. 網路連線問題')
    print('3. API Key 無效或過期')
    print('4. Google API 服務暫時不可用')
EOF
```

**步驟 2: 檢查 Google AI Studio**

前往 [Google AI Studio](https://aistudio.google.com/) 檢查：
- ✅ API Key 是否有效（"Get API key" 頁面）
- ✅ 是否達到每日配額限制（免費版：15 RPM / 1500 RPD / 1M TPM）
- ✅ 請求頻率是否過高（查看使用統計）

**步驟 3: 檢查網路連線**

```bash
# 測試是否能連線到 Google API
curl -H "x-goog-api-key: $GOOGLE_API_KEY" \
  https://generativelanguage.googleapis.com/v1beta/models \
  --max-time 10

# 如果超時或連線失敗，可能是防火牆或網路問題
```

**解決方案 3: 增加重試和超時設定**

如果網路不穩定，可以修改重試設定：

```bash
# 設定環境變數增加超時時間
export LANGCHAIN_TIMEOUT=120  # 增加到 120 秒

# 執行評估
python -m cuga.evaluation.evaluate_appworld run-task d0b1f43_2 --verbose
```

**解決方案 4: 切換到其他 LLM 提供者**

如果 Gemini 持續不穩定，可以切換到 OpenAI：

```bash
# 複製並修改配置
cp src/cuga/configurations/models/settings.google.toml src/cuga/configurations/models/settings.openai_backup.toml

# 修改 platform 從 "google-genai" 改為 "openai"
# 並設定 OPENAI_API_KEY
export OPENAI_API_KEY="your-openai-api-key"

# 使用 OpenAI 配置執行
CUGA_MODEL_CONFIG=openai_backup python -m cuga.evaluation.evaluate_appworld run-task d0b1f43_2
```

**快速測試 API 連線：**

```bash
# 測試 Google Gemini API
python3 -c "
import os
from langchain_google_genai import ChatGoogleGenerativeAI

# 載入 API Key
import sys
if not os.getenv('GOOGLE_API_KEY'):
    print('❌ GOOGLE_API_KEY 未設定')
    sys.exit(1)

# 測試連線
try:
    llm = ChatGoogleGenerativeAI(model='gemini-2.0-flash', temperature=0.1)
    response = llm.invoke('Say hello')
    print('✅ API 連線正常')
    print(f'回應: {response.content}')
except Exception as e:
    print(f'❌ API 連線失敗: {e}')
"
```

### 問題 6: LLM 初始化失敗

```
TypeError: 'NoneType' object is not callable
```

**解決方案：**
這是上游 CUGA Agent 的 LLM 配置問題，請檢查：
1. Google GenAI API 配置
2. OpenAI API 配置
3. 使用替代 LLM 提供者

**臨時解決方案：**
可以先手動執行 Agent，再使用評估功能：
```python
# 方法 1: 使用現有答案評估
result = await runner.evaluate_task(
    task_id='024c982_1',
    agent_answer='your_answer_here',
    run_agent=False
)
```

## 📝 完整使用流程範例

### 場景 1: 快速測試單一任務

```bash
# 1. 設定環境
export APPWORLD_ROOT=/Users/yichien/Desktop/ThesisResearch/cuga-agent/appworld

# 2. 檢查任務
python -m cuga.evaluation.evaluate_appworld inspect-task 024c982_1

# 3. 執行評估
python -m cuga.evaluation.evaluate_appworld run-task 024c982_1 --verbose
```

### 場景 2: 批次評估並分析結果

```bash
# 1. 執行批次評估
python -m cuga.evaluation.evaluate_appworld batch-eval --max-tasks 50 --output results.json

# 2. 分析結果
python -c "
import json
with open('results.json') as f:
    data = json.load(f)
    
print(f'總任務數: {data[\"total_tasks\"]}')
print(f'準確率: {data[\"accuracy\"]:.1%}')
print(f'平均難度: {data[\"avg_difficulty\"]:.1f}/5')

# 按難度分組
from collections import defaultdict
by_difficulty = defaultdict(list)
for r in data['results']:
    by_difficulty[r['difficulty']].append(r)

for diff in sorted(by_difficulty.keys()):
    tasks = by_difficulty[diff]
    correct = sum(1 for t in tasks if t['correct'])
    print(f'難度 {diff}: {correct}/{len(tasks)} ({correct/len(tasks):.1%})')
"
```

### 場景 3: 持續評估與監控

```python
import asyncio
from cuga.evaluation.evaluate_appworld import AppWorldBatchEvaluator
from datetime import datetime

async def continuous_evaluation():
    evaluator = AppWorldBatchEvaluator()
    
    while True:
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        
        # 每次評估 20 個任務
        report = await evaluator.evaluate_batch(
            max_tasks=20,
            output_file=f"eval_{timestamp}.json"
        )
        
        print(f"[{timestamp}] Accuracy: {report.accuracy:.1%}")
        
        # 等待 1 小時
        await asyncio.sleep(3600)

asyncio.run(continuous_evaluation())
```

## 🎯 效能建議

1. **批次大小**: 建議每批 50-100 個任務，平衡速度與記憶體使用
2. **並行執行**: 目前為序列執行，可考慮改用 asyncio 並行加速
3. **結果儲存**: 定期儲存中間結果，避免長時間執行後失敗
4. **資源監控**: 執行大批次時注意 CPU 和記憶體使用

## 📚 相關文檔

- [AppWorld 官方文檔](../appworld/README.md)
- [CUGA Agent 評估系統](./evaluate_cuga.py)
- [實驗追蹤系統](../backend/activity_tracker/)

## 🤝 貢獻與回饋

如有問題或建議，請開 Issue 或提交 PR。

---

**最後更新**: 2024-11-17
**版本**: 1.0.0
