'use client';

import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  DiscordMessage,
  loadMessages,
  saveMessages,
  seedDiscordServers,
} from '@/lib/discord-mock';
import { markRead } from '@/lib/discord-state';
import { hasPermission } from '@/lib/discord-perms';
import { getFirstUnreadIndex } from '@/lib/discord-unread';

function nowId() {
  return Math.random().toString(16).slice(2);
}

function formatTime(ts: number) {
  return new Date(ts).toLocaleTimeString('zh-CN', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function Page() {
  const params = useParams<{ id: string; channelId: string }>();

  const server = seedDiscordServers.find((s) => s.id === params?.id);
  if (!server) return notFound();
  const sid = server.id;

  const channel = server.channels.find((c) => c.id === params?.channelId);
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
            text: '欢迎来到频道（原型）。这里演示：未读定位（分割线 + 一键跳转）。',
            ts: Date.now() - 1000 * 60 * 5,
          },
        ],
  );
  const [text, setText] = useState('');

  const listRef = useRef<HTMLDivElement | null>(null);
  const markerRef = useRef<HTMLDivElement | null>(null);

  const canMentionEveryone = hasPermission(server, meId, 'mentionEveryone');
  const canSend = hasPermission(server, meId, 'sendMessage');

  const firstUnreadIndex = useMemo(
    () => getFirstUnreadIndex(sid, cid, msgs),
    [sid, cid, msgs],
  );

  function scrollToFirstUnread() {
    markerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  useEffect(() => {
    setTimeout(() => {
      if (firstUnreadIndex >= 0) {
        scrollToFirstUnread();
      } else {
        listRef.current?.scrollTo({
          top: listRef.current.scrollHeight,
          behavior: 'smooth',
        });
      }
    }, 80);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sid, cid]);

  useEffect(() => {
    return () => {
      const lastTs = msgs.length ? msgs[msgs.length - 1]!.ts : Date.now();
      markRead(sid, cid, lastTs);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sid, cid, msgs]);

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
          {firstUnreadIndex >= 0 ? (
            <button
              onClick={scrollToFirstUnread}
              className="rounded-full bg-blue-600 px-3 py-1 text-sm text-white"
            >
              跳到首条未读
            </button>
          ) : null}
        </div>
      </div>

      <div className="rounded-2xl border border-black/5 bg-white p-4 shadow-sm">
        <div className="mb-3 rounded-xl bg-[#f5f5f7] px-3 py-2 text-xs text-gray-600">
          未读定位说明：用 lastReadTs 推导首条未读消息，渲染“未读分割线”，并支持一键跳转。
        </div>

        <div
          ref={listRef}
          className="max-h-[60dvh] space-y-3 overflow-auto rounded-xl border border-black/5 bg-white p-3"
        >
          {msgs.map((m, idx) => (
            <div key={m.id}>
              {idx === firstUnreadIndex ? (
                <div ref={markerRef} className="my-3 flex items-center gap-3">
                  <div className="h-px flex-1 bg-blue-200" />
                  <div className="rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
                    未读
                  </div>
                  <div className="h-px flex-1 bg-blue-200" />
                </div>
              ) : null}

              <div className="flex gap-3">
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
          修复：Next 16 dev 下动态 params 读取报错导致 404；本页改为 useParams（client）。
        </div>
      </div>
    </div>
  );
}
