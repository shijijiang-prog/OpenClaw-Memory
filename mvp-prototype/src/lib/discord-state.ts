export function unreadKey(serverId: string, channelId: string) {
  return `wg.discord.unread.${serverId}.${channelId}`;
}

export function lastReadKey(serverId: string, channelId: string) {
  return `wg.discord.lastRead.${serverId}.${channelId}`;
}

export function lastSeenTsKey(serverId: string, channelId: string) {
  return `wg.discord.lastSeenTs.${serverId}.${channelId}`;
}

export function getNumber(key: string, fallback = 0) {
  if (typeof window === 'undefined') return fallback;
  const v = localStorage.getItem(key);
  if (!v) return fallback;
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}

export function setNumber(key: string, value: number) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, String(value));
}

export function incUnread(serverId: string, channelId: string, delta = 1) {
  const k = unreadKey(serverId, channelId);
  const next = getNumber(k, 0) + delta;
  setNumber(k, next);
}

export function clearUnread(serverId: string, channelId: string) {
  setNumber(unreadKey(serverId, channelId), 0);
}

export function getUnread(serverId: string, channelId: string) {
  return getNumber(unreadKey(serverId, channelId), 0);
}

export function markRead(serverId: string, channelId: string, lastMsgTs: number) {
  clearUnread(serverId, channelId);
  setNumber(lastReadKey(serverId, channelId), lastMsgTs);
}

export function getLastRead(serverId: string, channelId: string) {
  return getNumber(lastReadKey(serverId, channelId), 0);
}

export function setLastSeenServer(serverId: string, ts: number) {
  setNumber(lastSeenTsKey(serverId, 'server'), ts);
}

export function getLastSeenServer(serverId: string) {
  return getNumber(lastSeenTsKey(serverId, 'server'), 0);
}
