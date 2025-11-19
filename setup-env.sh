#!/bin/bash
# Setup environment variables for CUGA Agent evaluation
# Usage: source setup-env.sh

set -a  # Automatically export all variables

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "╔══════════════════════════════════════════════════╗"
echo "║  🔧 CUGA Agent 環境設定                          ║"
echo "╚══════════════════════════════════════════════════╝"
echo ""

# Load .env file
if [ -f .env ]; then
    echo -e "${GREEN}✅ 載入 .env 檔案...${NC}"
    source .env
else
    echo -e "${RED}❌ .env 檔案不存在${NC}"
    echo "請建立 .env 檔案並設定 GOOGLE_API_KEY"
    set +a
    return 1
fi

# Set APPWORLD_ROOT
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
export APPWORLD_ROOT="$SCRIPT_DIR/appworld"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  環境變數檢查"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Check GOOGLE_API_KEY
if [ -z "$GOOGLE_API_KEY" ]; then
    echo -e "${RED}❌ GOOGLE_API_KEY 未設定${NC}"
    MISSING_VARS=true
else
    echo -e "${GREEN}✅ GOOGLE_API_KEY 已設定${NC} (${#GOOGLE_API_KEY} 字元)"
fi

# Check APPWORLD_ROOT
if [ -d "$APPWORLD_ROOT" ]; then
    echo -e "${GREEN}✅ APPWORLD_ROOT 已設定${NC}"
    echo "   路徑: $APPWORLD_ROOT"
else
    echo -e "${RED}❌ APPWORLD_ROOT 目錄不存在${NC}"
    MISSING_VARS=true
fi

echo ""

if [ "$MISSING_VARS" = true ]; then
    echo -e "${RED}⚠️  部分環境變數未正確設定${NC}"
    set +a
    return 1
else
    echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${GREEN}  ✅ 環境設定完成！${NC}"
    echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    echo "💡 現在可以執行評估："
    echo "   python -m cuga.evaluation.evaluate_appworld run-task d0b1f43_2 --verbose"
    echo ""
fi

set +a
