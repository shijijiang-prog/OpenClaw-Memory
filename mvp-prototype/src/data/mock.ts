export type Forum = {
  id: string;
  slug: string;
  name: string;
  desc: string;
  tags: string[];
  status: 'pending' | 'active';
  createdAt: string;
};

export type Guide = {
  slug: string;
  title: string;
  game: string;
  version: string;
  steps: string[];
};

export type DbEntry = {
  slug: string;
  name: string;
  type: string;
  rarity: 'N'|'R'|'SR'|'SSR';
  stats: { label: string; value: string }[];
  obtain: string;
  note?: string;
};

export const seedForums: Forum[] = [
  {
    id: 'f_roo',
    slug: 'roo-newbie',
    name: 'ROO 新手村',
    desc: '从 0 到开荒：配装、任务、队伍、日常。',
    tags: ['ROO','新手','日常'],
    status: 'active',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'f_dnm',
    slug: 'dnm-builds',
    name: '龙之谷M：Build 研究所',
    desc: '职业、技能循环、装备搭配与实战复盘。',
    tags: ['DNM','职业','配装'],
    status: 'active',
    createdAt: new Date().toISOString(),
  },
];

export const guides: Guide[] = [
  {
    slug: 'roo-daily-30min',
    title: 'ROO 30 分钟日常路线（版本通用）',
    game: 'ROO',
    version: 'v1.x',
    steps: [
      '领取邮件/活动入口，确认今日加成',
      '完成 3 个高收益日常（优先体力/经验）',
      '组队 1 次副本：优先缺口材料',
      '拍卖行看材料价差（可选）',
      '整理背包与强化，记录明日目标',
    ],
  },
  {
    slug: 'dnm-newbie-week1',
    title: '龙之谷M：新手第一周成长清单',
    game: 'DNM',
    version: 'v1.x',
    steps: [
      '选定职业方向：PVE/PVP优先级',
      '完成主线到解锁核心系统',
      '加入公会并参加第一次公会活动',
      '把资源集中投入 1 套主装备',
      '记录核心循环技能并练习 10 分钟木桩',
    ],
  },
];

export const dbEntries: DbEntry[] = [
  {
    slug: 'roo-gear-sunblade',
    name: '日曜之刃',
    type: '武器 / 单手剑',
    rarity: 'SSR',
    stats: [
      { label: '攻击', value: '+120~160' },
      { label: '暴击', value: '+8%' },
      { label: '特效', value: '对 Boss 伤害 +10%' },
    ],
    obtain: '团队副本掉落 / 交易行',
    note: '适合爆发流派；注意与暴击溢出搭配。',
  },
  {
    slug: 'dnm-skill-spiral',
    name: '螺旋连击',
    type: '技能 / 近战',
    rarity: 'SR',
    stats: [
      { label: '伤害系数', value: '320%' },
      { label: '冷却', value: '12s' },
      { label: '破甲', value: '+15' },
    ],
    obtain: '技能书 / 职业任务',
  },
];

export const voiceRooms = [
  {
    id: 'room_roo_001',
    title: 'ROO 开荒语音房：今晚打什么',
    game: 'ROO',
    lang: '中文',
    members: ['Momo','Kirin','Steven','Aki','Nico'],
    chat: [
      { user: 'Momo', text: '今晚先把团队本摸一下？我缺日曜材料。' },
      { user: 'Kirin', text: '可以，先统一路线：体力→经验→材料。' },
      { user: 'Aki', text: '我想要一份30分钟日常清单，别太肝。' },
      { user: 'Nico', text: '公会活动时间记得看，今晚有buff。' },
      { user: 'Steven', text: '我们先把攻略写成 checklist，然后挂到版块置顶。' },
    ],
  },
];
