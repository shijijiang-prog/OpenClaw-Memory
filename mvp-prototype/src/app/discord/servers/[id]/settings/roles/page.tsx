'use client';

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useState } from 'react';
import { seedDiscordServers, DiscordRole } from '@/lib/discord-mock';

export default function Page({ params }: { params: { id: string } }) {
  const server = seedDiscordServers.find((s) => s.id === params.id);
  if (!server) return notFound();

  const [roles, setRoles] = useState<DiscordRole[]>(server.roles);

  function toggle(roleId: string, key: keyof DiscordRole['permissions']) {
    setRoles((prev) =>
      prev.map((r) =>
        r.id === roleId
          ? { ...r, permissions: { ...r.permissions, [key]: !r.permissions[key] } }
          : r,
      ),
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-lg font-semibold">角色与权限（简化版）</div>
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
        <div className="text-sm text-gray-600">
          原型只做 4 个权限：发消息 / @全体 / 管理频道 / 踢人（不做完整矩阵与继承）。
        </div>

        <div className="mt-4 space-y-3">
          {roles.map((r) => (
            <div key={r.id} className="rounded-2xl border border-black/5 bg-[#f5f5f7] p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="inline-block h-2.5 w-2.5 rounded-full"
                    style={{ background: r.color ?? '#94a3b8' }}
                  />
                  <div className="font-semibold">{r.name}</div>
                </div>
                <div className="text-xs text-gray-500">id: {r.id}</div>
              </div>

              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {(
                  [
                    ['sendMessage', '发消息'],
                    ['mentionEveryone', '@全体'],
                    ['manageChannels', '管理频道'],
                    ['kickMembers', '踢人'],
                  ] as const
                ).map(([k, label]) => (
                  <label
                    key={k}
                    className="flex items-center justify-between rounded-xl bg-white px-3 py-2 ring-1 ring-black/10"
                  >
                    <span className="text-sm text-gray-800">{label}</span>
                    <input
                      type="checkbox"
                      checked={r.permissions[k]}
                      onChange={() => toggle(r.id, k)}
                      className="h-4 w-4"
                    />
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 text-xs text-gray-500">
          下一步：把权限落库（server.roles），并在频道发言/管理入口处做权限拦截。
        </div>
      </div>
    </div>
  );
}
