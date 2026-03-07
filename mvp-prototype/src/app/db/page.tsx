import Link from 'next/link';
import { Shell } from '@/components/shell';
import { Badge, Card } from '@/components/ui';
import { dbEntries } from '@/data/mock';

export default function Page() {
  return (
    <Shell>
      <h1 className="text-2xl font-semibold">游戏资料库（DB）</h1>
      <p className="mt-2 text-sm text-amber-900/80">结构化条目：类型 / 稀有度 / 属性 / 获取方式（可扩展纠错与收藏）。</p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {dbEntries.map((e) => (
          <Link key={e.slug} href={`/db/${e.slug}`}>
            <Card className="p-6">
              <div className="text-sm font-semibold">{e.name}</div>
              <div className="mt-2 flex flex-wrap gap-2">
                <Badge>{e.type}</Badge>
                <Badge tone={e.rarity === 'SSR' ? 'red' : e.rarity === 'SR' ? 'orange' : 'green'}>{e.rarity}</Badge>
              </div>
              <div className="mt-3 text-sm text-amber-700 underline">查看条目</div>
            </Card>
          </Link>
        ))}
      </div>
    </Shell>
  );
}
