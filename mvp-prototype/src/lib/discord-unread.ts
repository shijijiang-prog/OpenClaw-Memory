import { loadMessages, type DiscordMessage } from './discord-mock';
import { getLastRead, markRead } from './discord-state';

export function getFirstUnreadIndex(
  serverId: string,
  channelId: string,
  messages: DiscordMessage[],
) {
  const lastRead = typeof window === 'undefined' ? 0 : getLastRead(serverId, channelId);
  if (!lastRead) return messages.length ? 0 : -1;
  const idx = messages.findIndex((m) => m.ts > lastRead);
  return idx === -1 ? -1 : idx;
}

export function markReadByChannel(serverId: string, channelId: string) {
  if (typeof window === 'undefined') return;
  const msgs = loadMessages(serverId, channelId);
  const lastTs = msgs.length ? msgs[msgs.length - 1]!.ts : Date.now();
  markRead(serverId, channelId, lastTs);
}
