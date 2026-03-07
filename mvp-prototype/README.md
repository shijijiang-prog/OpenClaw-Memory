# Warm Guild MVP Prototype

暖色调（偏吉卜力氛围）+ 社区优先（论坛/攻略/资料库/模拟器）+ Discord 式语音房 + AI 助手（房间总结）的 Web 原型。

## Run

```bash
cd /Users/steven/.openclaw/workspace/mvp-prototype
npm i
npm run dev
```

Then open: http://localhost:3000

## Routes

- `/` Discover
- `/community` 社区总览
- `/forums` 论坛列表（含 localStorage 自建版块）
- `/forums/new` 创建版块（任何人可创建，默认“待审核”）
- `/forums/[slug]` 版块详情（帖子流：mock）
- `/post/new` 发帖占位
- `/guides` 攻略列表
- `/guides/[slug]` 攻略详情（Checklist 可勾选，存 localStorage）
- `/db` 资料库列表
- `/db/[slug]` 条目详情（结构化字段）
- `/simulators` 模拟器栏目
- `/simulators/resource-planner` 资源规划器（1.A）
- `/voice` 语音房大厅
- `/voice/[id]` 语音房（UI + 文字侧聊 mock + AI 总结 3.A）

## LocalStorage keys

- `wg.forums.custom`：自建论坛版块（数组）
- `wg.guide.checklist.<slug>`：攻略 checklist 勾选状态（对象）

## Notes

- 全部数据为 mock（见 `src/data/mock.ts`），不接真实后端。
- AI 总结为 rule-based summarizer（见 `src/lib/summarize.ts`），用于原型演示。
