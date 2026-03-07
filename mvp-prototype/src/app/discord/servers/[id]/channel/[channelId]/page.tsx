'use client';

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  DiscordMessage,
  loadMessages,
  saveMessages,
  seedDiscordServers,
} from '@/lib/discord-mock';
import { incUnread, markRead } from '@/lib/discord-state';
import { hasPermission } from '@/lib/discord-perms';

function nowId() {
  return Math.random().toString(16).slice(2);
}

function formatTime(ts: number) {
  return new Date(ts).toLocaleTimeString('zh-CN', {
    hour: '2-digit',
    minute: '2-digit',
  });
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

  // 原型：当前用户固定为 Steven (u1)
  const meId = 'u1';

  const initial = useMemo(() => loadMessages(sid, cid), [sid, cid]);
  const [msgs, setMsgs] = useState<DiscordMessage[]>(
    initial.length
      ? initial
      : [
          {
            id: 'seed1',
            user: 'System',
            text: '欢迎来到频道（原型）。这里演示：未读/回流 + 权限生效（@全体）。',
            ts: Date.now() - 1000 * 60 * 5,
          },
        ],
  );
  const [text, setText] = useState('');
  const listRef = useRef<HTMLDivElement | null>(null);
  const lastMsgTs = msgs.length ? msgs[msgs.length - 1]!.ts : Date.now();

  const canMentionEveryone = hasPermission(server, meId, 'mentionEveryone');
  const canSend = hasPermission(server, meId, 'sendMessage');

  // 进入频道：清未读 + 记录 lastRead
  useEffect(() => {
    markRead(sid, cid, lastMsgTs);
    // 回流：滚到底
    setTimeout(() => {
      listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
    }, 50);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sid, cid]);

  function send() {
    if (!canSend) return;

    const t = text.trim();
    if (!t) return;

    if (t.includes('@everyone') && !canMentionEveryone) {
      alert('权限不足：该角色不允许 @everyone（原型拦截）。');
      return;
    }

    const next = [...msgs, { id: nowId(), user: 'Steven', text: t, ts: Date.now() }];
    setMsgs(next);
    saveMessages(sid, cid, next);
    setText('');

    // 原型：模拟“其他频道未读增长”（为了演示 server/card 的未读点）
    const other = seedDiscordServers.find((s) => s.id === sid)!.channels.find((c) => c.type === 'text' && c.id !== cid);
    if (other) incUnread(sid, other.id, 1);

    // 当前频道仍视为已读
    markRead(sid, cid, next[next.length - 1]!.ts);

    setTimeout(() => {
      listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
    }, 30);
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
          <Link
            href={`/discord/servers/${sid}/settings/roles`}
            className="rounded-full bg-white px-3 py-1 text-sm ring-1 ring-black/10"
          >
            权限
          </Link>
        </div>
      </div>

      <div className="rounded-2xl border border-black/5 bg-white p-4 shadow-sm">
        <div className="mb-3 rounded-xl bg-[#f5f5f7] px-3 py-2 text-xs text-gray-600">
          当前用户：Steven（u1 / admin）。
          <span className="ml-2">sendMessage: {String(canSend)}</span>
          <span className="ml-2">mentionEveryone: {String(canMentionEveryone)}</span>
          <span className="ml-2">提示：发消息会给“另一个频道”模拟 +1 未读，用于演示回流。</span>
        </div>

        <div
          ref={listRef}
          className="max-h-[60dvh] space-y-3 overflow-auto rounded-xl border border-black/5 bg-white p-3"
        >
          {msgs.map((m) => (
            <div key={m.id} className="flex gap-3">
              <div className="mt-0.5 h-8 w-8 shrink-0 rounded-full bg-[#f5f5f7]" />
              <div className="min-w-0">
                <div className="flex items-baseline gap-2">
                  <div className="text-sm font-semibold text-gray-900">{m.user}</div>
                  <div className="text-xs text-gray-400">{formatTime(m.ts)}</div>
                </div>
                <div className="mt-0.5 whitespace-pre-wrap break-words text-sm text-gray-800">
                  {m.text}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-3 flex gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') send();
            }}
            placeholder={canSend ? '发消息…（回车发送，@everyone 需权限）' : '你没有发消息权限（原型）'}
            disabled={!canSend}
            className="h-10 flex-1 rounded-xl border border-black/10 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-blue-200 disabled:bg-gray-50"
          />
          <button
            onClick={send}
            disabled={!canSend}
            className="h-10 rounded-xl bg-blue-600 px-4 text-sm font-semibold text-white disabled:opacity-40"
          >
            发送
          </button>
        </div>

        <div className="mt-2 text-xs text-gray-500">
          未读机制（原型）：本频道进入即 markRead；发送消息会给另一个频道 incUnread(+1)。
        </div>
      </div>
    </div>
  );
}
