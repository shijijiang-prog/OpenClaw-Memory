export const games = [
  {
    id: 'neon-echo',
    name: '霓虹回声',
    tagline: '赛博城市里的合作解谜冒险，适合 30-60 分钟轻度社交。',
    tags: ['合作', '解谜', '剧情', '轻度'],
    why: '你偏好「独立 + RPG」，且偏好 30-60 分钟的节奏；本作剧情驱动且可协作。',
    communityHot: [
      { id: 't1', title: '1.0 更新后最强开局路线？', up: 328, replies: 64 },
      { id: 't2', title: '通关后有哪些隐藏结局？（剧透）', up: 212, replies: 51 },
      { id: 't3', title: '求队友：周末固定两小时', up: 88, replies: 19 },
    ],
    db: {
      platforms: ['PC', 'Mac'],
      languages: ['中文', '英文'],
      sessionLength: '30-60 分钟',
      difficulty: '中',
      version: '1.0.0',
      lastUpdate: '2026-03-05',
    },
    reviews: {
      pros: ['氛围感强', '协作机制有趣', '剧情节奏好'],
      cons: ['后期难度陡增', '部分谜题提示不足'],
      forWho: '喜欢剧情+协作、时间碎片化的玩家。',
    },
  },
  {
    id: 'pixel-quest',
    name: '像素远征',
    tagline: '像素风 Roguelite，十分钟一局，越玩越上头。',
    tags: ['Roguelite', '动作', '独立', '高复玩'],
    why: '你偏好独立；本作高复玩，适合快速获得爽感与成长反馈。',
    communityHot: [
      { id: 'p1', title: '新手必看：三套通用 Build', up: 512, replies: 103 },
      { id: 'p2', title: '1.2 平衡性改动讨论', up: 190, replies: 37 },
      { id: 'p3', title: '晒你的最高连胜！', up: 140, replies: 80 },
    ],
    db: {
      platforms: ['PC', 'Switch'],
      languages: ['中文', '英文', '日文'],
      sessionLength: '10-20 分钟',
      difficulty: '中-高',
      version: '1.2.3',
      lastUpdate: '2026-03-02',
    },
    reviews: {
      pros: ['打击感爽', 'Build 多样', '节奏快'],
      cons: ['学习曲线偏陡', '重复感在后期出现'],
      forWho: '喜欢动作与成长循环、追求复玩挑战的玩家。',
    },
  },
  {
    id: 'moon-library',
    name: '月光图书馆',
    tagline: '治愈系互动叙事：每晚 15 分钟，收集你的情绪。',
    tags: ['治愈', '叙事', '轻度', '氛围'],
    why: 'AI 时代精神需求上升；本作提供陪伴感与意义感。',
    communityHot: [
      { id: 'm1', title: '你最喜欢哪一段对白？', up: 90, replies: 44 },
      { id: 'm2', title: '隐藏章节触发条件汇总', up: 61, replies: 18 },
      { id: 'm3', title: '今晚一起读书（语音房）', up: 35, replies: 9 },
    ],
    db: {
      platforms: ['PC', 'iOS', 'Android'],
      languages: ['中文'],
      sessionLength: '10-20 分钟',
      difficulty: '低',
      version: '0.9.8',
      lastUpdate: '2026-02-28',
    },
    reviews: {
      pros: ['治愈陪伴', '文案细腻', '适合睡前'],
      cons: ['玩法偏轻', '偏好硬核的玩家可能不适应'],
      forWho: '想要放松、治愈、短时沉浸的玩家。',
    },
  },
];

export function getGame(id) {
  return games.find((g) => g.id === id);
}
