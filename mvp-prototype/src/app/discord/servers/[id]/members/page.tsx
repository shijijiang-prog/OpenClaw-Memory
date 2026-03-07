'use client';

import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { seedDiscordServers } from '@/lib/discord-mock';

function badge(status: string) {
  if (status === 'online') return 'bg-green-500';
  if (status === 'idle') return 'bg-yellow-500';
  if (status === 'dnd') return 'bg-red-500';
  return 'bg-gray-400';
}

export default function Page() {
  const params = useParams<{ id: string }>();
  const server = seedDiscordServers.find((s) => s.id === params?.id);
  if (!server) return notFound();

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-lg font-semibold">成员</div>
          <div className="text-sm text-gray-600">{server.name}</div>
        </div>
        <Link
          href={`/discord/servers/${server.id}`}
          className="rounded-full bg-white px-3 py-1 text-sm ring-1 ring-black/10"
        >
          返回
        </Link>
      </div>

      <div className="rounded-2xl border border-black/5 bg-white p-4 shadow-sm">
        <div className="space-y-2">
          {server.members.map((m) => (
            <div
              key={m.id}
              className="flex items-center justify-between rounded-xl border border-black/5 bg-[#f5f5f7] px-3 py-2"
            >
              <div className="flex items-center gap-3">
                <div className="relative h-9 w-9 rounded-full bg-white" />
                <span
                  className={
                    'absolute ml-6 mt-6 inline-block h-3 w-3 rounded-full ring-2 ring-[#f5f5f7] ' +
                    badge(m.status)
                  }
                />
                <div>
                  <div className="text-sm font-semibold text-gray-900">{m.name}</div>
                  <div className="text-xs text-gray-500">角色：{m.roles.join(', ')}</div>
                </div>
              </div>
              <div className="text-xs text-gray-500">{m.status}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
