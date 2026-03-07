'use client';

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useMemo, useState } from 'react';
import {
  DiscordMessage,
  loadMessages,
  saveMessages,
  seedDiscordServers,
} from '@/lib/discord-mock';

function nowId() {
  return Math.random().toString(16).slice(2);
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
  if (!channel || channel.type !== 'text') return notFound();
  const cid = channel.id;

  const initial = useMemo(
    () => loadMessages(sid, cid),
    [sid, cid],
  );
  const [msgs, setMsgs] = useState<DiscordMessage[]>(
    initial.length
      ? initial
      : [
          {
            id: 'seed1',
            user: 'System',
            text: '欢迎来到 #公告（原型）。这里会展示消息流/未读回流/权限等能力。',
            ts: Date.now() - 1000 * 60 * 5,
          },
        ],
  );
  const [text, setText] = useState('');

  function send() {
    const t = text.trim();
    if (!t) return;
    const next = [
      ...msgs,
      { id: nowId(), user: 'Steven', text: t, ts: Date.now() },
    ];
    setMsgs(next);
    saveMessages(sid, cid, next);
    setText('');
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-lg font-semibold">{server.name}</div>
          <div className="text-sm text-gray-600"># {channel.name}</div>
        </div>
        <div className="flex gap-2">
          <Link
            href={`/discord/servers/${server.id}`}
            className="rounded-full bg-white px-3 py-1 text-sm ring-1 ring-black/10"
          >
            频道列表
          </Link>
          <Link
            href={`/discord/servers/${server.id}/members`}
            className="rounded-full bg-white px-3 py-1 text-sm ring-1 ring-black/10"
          >
            成员
          </Link>
        </div>
      </div>

      <div className="rounded-2xl border border-black/5 bg-white p-4 shadow-sm">
        <div className="space-y-3">
          {msgs.map((m) => (
            <div key={m.id} className="flex gap-3">
              <div className="mt-0.5 h-8 w-8 shrink-0 rounded-full bg-[#f5f5f7]" />
              <div className="min-w-0">
                <div className="flex items-baseline gap-2">
                  <div className="text-sm font-semibold text-gray-900">{m.user}</div>
                  <div className="text-xs text-gray-400">
                    {new Date(m.ts).toLocaleTimeString('zh-CN', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </div>
                <div className="mt-0.5 text-sm text-gray-800 whitespace-pre-wrap break-words">
                  {m.text}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') send();
            }}
            placeholder="发消息…（回车发送）"
            className="h-10 flex-1 rounded-xl border border-black/10 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-blue-200"
          />
          <button
            onClick={send}
            className="h-10 rounded-xl bg-blue-600 px-4 text-sm font-semibold text-white"
          >
            发送
          </button>
        </div>

        <div className="mt-2 text-xs text-gray-500">
          原型说明：消息存 localStorage（key=wg.discord.msg.{server.id}.{channel.id}）。
        </div>
      </div>
    </div>
  );
}
