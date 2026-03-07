# 主题｜Discord-like Web Demo

## 目标能力
- 未读/回流
- 权限生效（简化 RBAC）
- 跨频道新消息模拟器
- 未读定位（未读分割线 + 跳到首条未读）

## 关键路由
- `/discord/servers`
- `/discord/servers/wg`
- `/discord/servers/wg/channel/c1`、`/discord/servers/wg/channel/c2`
- `/discord/servers/wg/settings/roles`
- `/discord/servers/wg/members`
- `/discord/simulator`

## localStorage keys
- 消息：`wg.discord.msg.{serverId}.{channelId}`
- 未读：`wg.discord.unread.{serverId}.{channelId}`
- 已读时间戳：`wg.discord.lastRead.{serverId}.{channelId}`
- 模拟器配置：`wg.discord.sim.{serverId}`
- 角色权限快照：`wg.discord.roles.{serverId}`

## 重要工程坑（避免 404）
- Next.js 16 dev 下动态路由 `params` 可能是 Promise；为避免渲染错误导致 404，相关页面统一使用 `useParams()`（client component）。
