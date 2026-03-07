export type DiscordRole = {
  id: string;
  name: string;
  color?: string;
  permissions: {
    sendMessage: boolean;
    mentionEveryone: boolean;
    manageChannels: boolean;
    kickMembers: boolean;
  };
};

export type DiscordMember = {
  id: string;
  name: string;
  roles: string[];
  status: 'online' | 'idle' | 'dnd' | 'offline';
};

export type DiscordTextChannel = {
  id: string;
  type: 'text';
  name: string;
};

export type DiscordVoiceChannel = {
  id: string;
  type: 'voice';
  name: string;
};

export type DiscordChannel = DiscordTextChannel | DiscordVoiceChannel;

export type DiscordServer = {
  id: string;
  name: string;
  icon?: string;
  roles: DiscordRole[];
  members: DiscordMember[];
  channels: DiscordChannel[];
};

export const seedDiscordServers: DiscordServer[] = [
  {
    id: 'wg',
    name: 'Warm Guild（原型）',
    icon: 'WG',
    roles: [
      {
        id: 'admin',
        name: 'Admin',
        color: '#2563eb',
        permissions: {
          sendMessage: true,
          mentionEveryone: true,
          manageChannels: true,
          kickMembers: true,
        },
      },
      {
        id: 'mod',
        name: 'Mod',
        color: '#10b981',
        permissions: {
          sendMessage: true,
          mentionEveryone: false,
          manageChannels: false,
          kickMembers: true,
        },
      },
      {
        id: 'member',
        name: 'Member',
        permissions: {
          sendMessage: true,
          mentionEveryone: false,
          manageChannels: false,
          kickMembers: false,
        },
      },
    ],
    members: [
      { id: 'u1', name: 'Steven', roles: ['admin'], status: 'online' },
      { id: 'u2', name: 'Mika', roles: ['mod'], status: 'idle' },
      { id: 'u3', name: 'Luca', roles: ['member'], status: 'offline' },
    ],
    channels: [
      { id: 'c1', type: 'text', name: '公告' },
      { id: 'c2', type: 'text', name: '闲聊' },
      { id: 'v1', type: 'voice', name: '语音｜大厅' },
      { id: 'v2', type: 'voice', name: '语音｜开黑' },
    ],
  },
];

export function getDiscordStateKey(serverId: string, channelId: string) {
  return `wg.discord.msg.${serverId}.${channelId}`;
}

export type DiscordMessage = {
  id: string;
  user: string;
  text: string;
  ts: number;
};

export function loadMessages(serverId: string, channelId: string): DiscordMessage[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(getDiscordStateKey(serverId, channelId));
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveMessages(serverId: string, channelId: string, msgs: DiscordMessage[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(getDiscordStateKey(serverId, channelId), JSON.stringify(msgs));
}
