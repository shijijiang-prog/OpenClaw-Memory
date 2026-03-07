import Link from 'next/link';
import { Shell } from '@/components/shell';
import { Card, Badge, Button } from '@/components/ui';

const topics = [
  { title: '新手友好 · 轻量养成', desc: '适合碎片时间的 MMO/ARPG 清单' },
  { title: '版本更新速览', desc: '你关注的游戏最近发生了什么' },
  { title: '最适合组队的 10 款游戏', desc: '社交留存导向的策展专题' },
];

export default function Page() {
  return (
    <Shell>
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-semibold tracking-tight">专题</h1>
        <p className="mt-2 text-black/60">P2 榜单/专题（占位）：编辑策展 + 标签专题。</p>

        <div className="mt-6 grid gap-4">
          {topics.map((t) => (
            <Card key={t.title} className="p-6">
              <div className="flex items-center gap-2">
                <Badge tone="orange">专题</Badge>
                <div className="text-lg font-semibold">{t.title}</div>
              </div>
              <div className="mt-2 text-sm text-black/60">{t.desc}</div>
              <div className="mt-4 flex gap-2">
                <Link href="/search"><Button variant="ghost">用筛选打开</Button></Link>
                <Link href="/games/warm-guild"><Button variant="ghost">示例游戏</Button></Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Shell>
  );
}
