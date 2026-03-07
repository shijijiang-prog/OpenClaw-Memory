'use client';

import Link from 'next/link';
import { seedDiscordServers } from '@/lib/discord-mock';

export default function Page() {
  return (
    <div className="space-y-3">
      <div className="flex items-end justify-between">
        <div>
          <div className="text-lg font-semibold">服务器</div>
          <div className="text-sm text-gray-600">选择一个服务器进入频道列表。</div>
        </div>
        <div className="flex gap-2">
          <Link className="rounded-full bg-white px-3 py-1 text-sm ring-1 ring-black/10" href="/discord/servers/join">加入</Link>
          <Link className="rounded-full bg-blue-600 px-3 py-1 text-sm text-white" href="/discord/servers/new">创建</Link>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {seedDiscordServers.map((s) => (
          <Link
            key={s.id}
            href={`/discord/servers/${s.id}`}
            className="rounded-2xl border border-black/5 bg-white p-4 shadow-sm hover:shadow"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-sm font-semibold text-white">
                {s.icon ?? s.name.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="font-semibold text-gray-900">{s.name}</div>
                <div className="text-xs text-gray-500">
                  {s.channels.length} 个频道 · {s.members.length} 位成员
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
