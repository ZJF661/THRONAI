#!/bin/bash
# 启动HTTP服务器脚本

# 检查Python版本
if command -v python3 &> /dev/null; then
    python3 -m http.server 8080
elif command -v python &> /dev/null; then
    python -m http.server 8080
else
    echo "错误: 未找到Python。请安装Python3或Python后再尝试。"
    exit 1
fi 