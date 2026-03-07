import Link from 'next/link';
import { Shell } from '@/components/shell';
import { Badge, Card } from '@/components/ui';
import { voiceRooms } from '@/data/mock';

export default function Page() {
  return (
    <Shell>
      <h1 className="text-2xl font-semibold">语音房（Voice）</h1>
      <p className="mt-2 text-sm text-amber-900/80">MVP：房间 UI + 文字侧聊 + AI 助手“房间总结”（3.A）。</p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {voiceRooms.map((r) => (
          <Link key={r.id} href={`/voice/${r.id}`}>
            <Card className="p-6">
              <div className="text-sm font-semibold">{r.title}</div>
              <div className="mt-2 flex flex-wrap gap-2">
                <Badge>{r.game}</Badge>
                <Badge tone="green">{r.lang}</Badge>
                <Badge tone="orange">在线 {r.members.length}</Badge>
              </div>
              <div className="mt-3 text-sm text-amber-700 underline">进入房间</div>
            </Card>
          </Link>
        ))}
      </div>
    </Shell>
  );
}
