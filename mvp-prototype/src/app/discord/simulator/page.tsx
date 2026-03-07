'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { seedDiscordServers } from '@/lib/discord-mock';
import { injectNewMessage, loadSimState, saveSimState } from '@/lib/discord-sim';

export default function Page() {
  const server = seedDiscordServers[0]!;
  const textChannels = server.channels.filter((c) => c.type === 'text');

  const initial = useMemo(() => loadSimState(server.id), [server.id]);
  const [enabled, setEnabled] = useState(initial.enabled);
  const [intervalSec, setIntervalSec] = useState(initial.intervalSec);
  const [last, setLast] = useState<string>('');

  useEffect(() => {
    saveSimState(server.id, { enabled, intervalSec });
  }, [enabled, intervalSec, server.id]);

  useEffect(() => {
    if (!enabled) return;
    const ms = Math.max(2, intervalSec) * 1000;
    const t = setInterval(() => {
      const ch = textChannels[Math.floor(Math.random() * textChannels.length)]!;
      injectNewMessage(server.id, ch.id);
      setLast(`已注入：${server.name} / #${ch.name} @ ${new Date().toLocaleTimeString('zh-CN')}`);
    }, ms);
    return () => clearInterval(t);
  }, [enabled, intervalSec, server.id, server.name, textChannels]);

  function once(channelId: string) {
    const ch = textChannels.find((c) => c.id === channelId)!;
    injectNewMessage(server.id, channelId, '【手动注入】跨频道新消息（用于演示未读与回流）。');
    setLast(`手动注入：${server.name} / #${ch.name} @ ${new Date().toLocaleTimeString('zh-CN')}`);
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-lg font-semibold">跨频道新消息模拟器</div>
          <div className="text-sm text-gray-600">用于演示：未读增长 → 回流 → 进入频道清未读。</div>
        </div>
        <Link href="/discord/servers" className="rounded-full bg-white px-3 py-1 text-sm ring-1 ring-black/10">
          返回服务器
        </Link>
      </div>

      <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
        <div className="text-sm font-semibold text-gray-900">定时注入</div>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={enabled} onChange={(e) => setEnabled(e.target.checked)} />
            开启
          </label>

          <label className="flex items-center gap-2 text-sm">
            间隔（秒）
            <input
              type="number"
              min={2}
              value={intervalSec}
              onChange={(e) => setIntervalSec(Number(e.target.value) || 10)}
              className="h-9 w-20 rounded-xl border border-black/10 bg-white px-2 text-sm outline-none focus:ring-2 focus:ring-blue-200"
            />
          </label>

          <div className="text-xs text-gray-500">（状态写入 localStorage，刷新不丢）</div>
        </div>

        {last ? <div className="mt-3 text-xs text-gray-600">{last}</div> : null}
      </div>

      <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
        <div className="text-sm font-semibold text-gray-900">手动注入</div>
        <div className="mt-2 flex flex-wrap gap-2">
          {textChannels.map((c) => (
            <button
              key={c.id}
              onClick={() => once(c.id)}
              className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white"
            >
              注入到 #{c.name}
            </button>
          ))}
        </div>
      </div>

      <div className="text-xs text-gray-500">
        建议演示流程：打开本页→开启定时→另开一页看 /discord/servers 和 /discord/servers/wg 未读点变化→点进频道清未读。
      </div>
    </div>
  );
}
