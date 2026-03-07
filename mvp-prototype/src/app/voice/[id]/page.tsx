'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import { Shell } from '@/components/shell';
import { Badge, Button, Card, Textarea } from '@/components/ui';
import { voiceRooms } from '@/data/mock';
import { simpleSummary } from '@/lib/summarize';

export default function Page() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const room = useMemo(() => voiceRooms.find((r) => r.id === id), [id]);

  const [handUp, setHandUp] = useState(false);
  const [summaryText, setSummaryText] = useState('');

  if (!room) {
    return (
      <Shell>
        <Card className="p-6">
          <div className="text-sm font-semibold">未找到房间</div>
          <div className="mt-4">
            <Link href="/voice"><Button>返回语音大厅</Button></Link>
          </div>
        </Card>
      </Shell>
    );
  }

  function gen() {
    if (!room) return;
    const s = simpleSummary(room.chat);
    const text = [
      `【${s.title}】`,
      ...s.bullets.map((b) => `- ${b}`),
      '',
      '【高亮消息】',
      ...(s.highlights.length ? s.highlights : ['- （无）']),
    ].join('\n');
    setSummaryText(text);
  }

  return (
    <Shell>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">{room.title}</h1>
          <div className="mt-3 flex flex-wrap gap-2">
            <Badge>{room.game}</Badge>
            <Badge tone="green">{room.lang}</Badge>
            <Badge tone="orange">在线 {room.members.length}</Badge>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant={handUp ? 'solid' : 'ghost'} onClick={() => setHandUp(!handUp)}>
            {handUp ? '已举手' : '举手'}
          </Button>
          <Link href="/voice"><Button variant="ghost">返回</Button></Link>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="text-sm font-semibold">成员</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {room.members.map((m) => (
                <Badge key={m}>{m}</Badge>
              ))}
            </div>
          </Card>

          <Card className="mt-4 p-6">
            <div className="text-sm font-semibold">文字侧聊（Mock）</div>
            <div className="mt-4 space-y-3">
              {room.chat.map((c, i) => (
                <div key={i} className="rounded-2xl border border-amber-200 bg-white/60 p-4">
                  <div className="text-xs text-amber-900/70">{c.user}</div>
                  <div className="mt-1 text-sm">{c.text}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold">AI 助手（3.A：房间总结）</div>
              <Badge tone="red">MVP</Badge>
            </div>
            <div className="mt-3 text-sm text-amber-900/80">
              点击生成总结：从侧聊消息里抽取关键词 + 高亮消息，形成“规则摘要”。
            </div>
            <div className="mt-4 flex gap-2">
              <Button onClick={gen}>生成总结</Button>
              <Button variant="ghost" onClick={() => setSummaryText('')}>清空</Button>
            </div>

            <div className="mt-4">
              <div className="mb-1 text-xs text-amber-900/70">输出</div>
              <Textarea value={summaryText} readOnly rows={14} placeholder="这里会生成房间总结…" />
            </div>

            <div className="mt-4 text-xs text-amber-900/70">
              下一步（非 MVP）：把总结一键发布到论坛置顶/转为攻略 checklist。
            </div>
          </Card>
        </div>
      </div>
    </Shell>
  );
}
