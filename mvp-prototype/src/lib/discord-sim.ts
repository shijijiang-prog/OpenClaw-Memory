import { loadMessages, saveMessages, seedDiscordServers } from './discord-mock';
import { incUnread } from './discord-state';

export function simKey(serverId: string) {
  return `wg.discord.sim.${serverId}`;
}

export type SimState = {
  enabled: boolean;
  intervalSec: number;
};

export function loadSimState(serverId: string): SimState {
  if (typeof window === 'undefined') return { enabled: false, intervalSec: 10 };
  try {
    const raw = localStorage.getItem(simKey(serverId));
    if (!raw) return { enabled: false, intervalSec: 10 };
    const parsed = JSON.parse(raw);
    return {
      enabled: !!parsed.enabled,
      intervalSec: Number(parsed.intervalSec) || 10,
    };
  } catch {
    return { enabled: false, intervalSec: 10 };
  }
}

export function saveSimState(serverId: string, state: SimState) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(simKey(serverId), JSON.stringify(state));
}

function randId() {
  return Math.random().toString(16).slice(2);
}

const BOT_NAMES = ['Bot', 'NewsBot', 'ModBot', 'GuideBot', 'Echo'];
const BOT_LINES = [
  '【模拟】有新消息到达。',
  '【模拟】今天晚上语音开黑吗？',
  '【模拟】更新公告：版本 0.1.0。',
  '【模拟】有人@你了吗？',
  '【模拟】新活动：签到领福利（占位）。',
];

export function injectNewMessage(serverId: string, channelId: string, text?: string) {
  if (typeof window === 'undefined') return;
  const server = seedDiscordServers.find((s) => s.id === serverId);
  if (!server) return;

  const msgs = loadMessages(serverId, channelId);
  const m = {
    id: randId(),
    user: BOT_NAMES[Math.floor(Math.random() * BOT_NAMES.length)]!,
    text: text ?? BOT_LINES[Math.floor(Math.random() * BOT_LINES.length)]!,
    ts: Date.now(),
  };
  const next = [...msgs, m];
  saveMessages(serverId, channelId, next);

  // 只负责“跨频道”增长未读；当前是否在该频道由页面进入时 markRead 覆盖。
  incUnread(serverId, channelId, 1);
}
