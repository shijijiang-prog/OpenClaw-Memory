'use client';

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { seedDiscordServers } from '@/lib/discord-mock';
import { getLastRead, getUnread, setLastSeenServer } from '@/lib/discord-state';

export default function Page({ params }: { params: { id: string } }) {
  const server = seedDiscordServers.find((s) => s.id === params.id);
  if (!server) return notFound();

  const textChannels = server.channels.filter((c) => c.type === 'text');
  const voiceChannels = server.channels.filter((c) => c.type === 'voice');

  if (typeof window !== 'undefined') {
    setLastSeenServer(server.id, Date.now());
  }

  return (
    <div className="grid gap-3 lg:grid-cols-[280px_1fr]">
      <div className="rounded-2xl border border-black/5 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold text-gray-900">{server.name}</div>
            <div className="mt-1 text-xs text-gray-500">{server.members.length} 成员</div>
          </div>
          <Link
            href={`/discord/servers/${server.id}/settings/roles`}
            className="rounded-full bg-white px-3 py-1 text-xs ring-1 ring-black/10"
          >
            角色权限
          </Link>
        </div>

        <div className="mt-4">
          <div className="text-xs font-semibold text-gray-500">文字频道</div>
          <div className="mt-2 space-y-1">
            {textChannels.map((c) => {
              const unread = typeof window === 'undefined' ? 0 : getUnread(server.id, c.id);
              const lastRead = typeof window === 'undefined' ? 0 : getLastRead(server.id, c.id);
              const hint = unread > 0 ? `${unread} 未读` : lastRead ? '已读' : '';
              return (
                <Link
                  key={c.id}
                  href={`/discord/servers/${server.id}/channel/${c.id}`}
                  className="flex items-center justify-between rounded-xl px-3 py-2 text-sm text-gray-800 hover:bg-[#f5f5f7]"
                >
                  <span># {c.name}</span>
                  {hint ? (
                    <span
                      className={
                        'rounded-full px-2 py-0.5 text-xs ' +
                        (unread > 0
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-gray-500 ring-1 ring-black/10')
                      }
                    >
                      {hint}
                    </span>
                  ) : null}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="mt-4">
          <div className="text-xs font-semibold text-gray-500">语音频道</div>
          <div className="mt-2 space-y-1">
            {voiceChannels.map((c) => (
              <Link
                key={c.id}
                href={`/discord/servers/${server.id}/voice/${c.id}`}
                className="block rounded-xl px-3 py-2 text-sm text-gray-800 hover:bg-[#f5f5f7]"
              >
                🔊 {c.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <Link
            href={`/discord/servers/${server.id}/members`}
            className="block rounded-xl bg-white px-3 py-2 text-sm ring-1 ring-black/10"
          >
            查看成员
          </Link>
        </div>
      </div>

      <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
        <div className="text-lg font-semibold">选择一个频道</div>
        <div className="mt-2 text-sm text-gray-600">
          左侧选择 #文字频道 开始聊天，或进入 🔊语音频道（占位）。
        </div>
        <div className="mt-4 text-xs text-gray-500">
          新增能力：本页会显示每个频道的未读数（来自 localStorage）。
        </div>
      </div>
    </div>
  );
}
