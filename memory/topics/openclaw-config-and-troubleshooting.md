# 主题｜OpenClaw 配置与排障

## 配置与运行
- 配置文件：`~/.openclaw/openclaw.json`
- Gateway：`127.0.0.1:18789`（Dashboard: http://127.0.0.1:18789/）

## 超时修复（长任务）
- 已设置：`agents.defaults.timeoutSeconds = 1800`

## 常见告警/坑
- Feishu：`channels.feishu.groupPolicy` 为 allowlist 但 allowlist 为空 → 群消息会被静默丢弃。
- Web 搜索语言参数不一致：有时要求 2-letter ISO（如 `en`），有时 Brave 期望 `zh-hans/zh-hant`（注意兼容）。
