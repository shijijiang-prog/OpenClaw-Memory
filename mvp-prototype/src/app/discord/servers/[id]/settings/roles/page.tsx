'use client';

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useMemo, useState } from 'react';
import { seedDiscordServers, DiscordRole } from '@/lib/discord-mock';

function rolesKey(serverId: string) {
  return `wg.discord.roles.`;
}

function loadRoles(serverId: string, fallback: DiscordRole[]) {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(rolesKey(serverId));
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function saveRoles(serverId: string, roles: DiscordRole[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(rolesKey(serverId), JSON.stringify(roles));
}

export default function Page({ params }: { params: { id: string } }) {
  const server = seedDiscordServers.find((s) => s.id === params.id);
  if (!server) return notFound();

  const initial = useMemo(() => loadRoles(server.id, server.roles), [server.id]);
  const [roles, setRoles] = useState<DiscordRole[]>(initial);

  function toggle(roleId: string, key: keyof DiscordRole['permissions']) {
    setRoles((prev) => {
      const next = prev.map((r) =>
        r.id === roleId
          ? { ...r, permissions: { ...r.permissions, [key]: !r.permissions[key] } }
          : r,
      );
      saveRoles(params.id, next);
      return next;
    });
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
          原型只做 4 个权限：发消息 / @全体 / 管理频道 / 踢人。并把改动写入 localStorage。
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
                    ['mentionEveryone', '@everyone'],
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
          localStorage key：wg.discord.roles.{server.id}
        </div>
      </div>
    </div>
  );
}
