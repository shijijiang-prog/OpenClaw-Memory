'use client';

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useMemo, useState } from 'react';
import { seedDiscordServers } from '@/lib/discord-mock';

function voiceKey(serverId: string, channelId: string) {
  return `wg.discord.voice.${serverId}.${channelId}.joined`;
}

export default function Page({
  params,
}: {
  params: { id: string; channelId: string };
}) {
  const server = seedDiscordServers.find((s) => s.id === params.id);
  if (!server) return notFound();
  const sid = server.id;
  const channel = server.channels.find((c) => c.id === params.channelId);
  if (!channel || channel.type !== 'voice') return notFound();
  const cid = channel.id;

  const initialJoined = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(voiceKey(sid, cid)) === '1';
  }, [sid, cid]);

  const [joined, setJoined] = useState(initialJoined);
  const membersInRoom = joined
    ? ['Steven', 'Mika', 'Luca']
    : ['Mika'];

  function toggle() {
    const next = !joined;
    setJoined(next);
    if (typeof window !== 'undefined') {
      localStorage.setItem(voiceKey(sid, cid), next ? '1' : '0');
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-lg font-semibold">{server.name}</div>
          <div className="text-sm text-gray-600">🔊 {channel.name}</div>
        </div>
        <div className="flex gap-2">
          <Link
            href={`/discord/servers/${sid}`}
            className="rounded-full bg-white px-3 py-1 text-sm ring-1 ring-black/10"
          >
            频道列表
          </Link>
          <Link
            href={`/discord/servers/${sid}/members`}
            className="rounded-full bg-white px-3 py-1 text-sm ring-1 ring-black/10"
          >
            成员
          </Link>
        </div>
      </div>

      <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold text-gray-900">房间状态</div>
            <div className="mt-1 text-sm text-gray-600">
              {joined ? '已加入语音（原型占位）' : '未加入'}
            </div>
          </div>
          <button
            onClick={toggle}
            className={
              'rounded-xl px-4 py-2 text-sm font-semibold ' +
              (joined
                ? 'bg-white text-gray-800 ring-1 ring-black/10'
                : 'bg-blue-600 text-white')
            }
          >
            {joined ? '离开' : '加入'}
          </button>
        </div>

        <div className="mt-4">
          <div className="text-xs font-semibold text-gray-500">在房间的成员</div>
          <div className="mt-2 grid gap-2 sm:grid-cols-3">
            {membersInRoom.map((m) => (
              <div
                key={m}
                className="rounded-xl border border-black/5 bg-[#f5f5f7] px-3 py-2 text-sm"
              >
                {m}
                <div className="mt-1 text-xs text-gray-500">
                  {m === 'Steven' && joined ? '🎙️ 说话中（占位）' : '静音/空闲（占位）'}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 text-xs text-gray-500">
          下一步接入：WebRTC + SFU（如 mediasoup/livekit）。原型先用状态占位。
        </div>
      </div>
    </div>
  );
}
