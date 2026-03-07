import Link from 'next/link';
import { Shell } from '@/components/shell';
import { Badge, Button, Card } from '@/components/ui';
import { dbEntries } from '@/data/mock';

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = dbEntries.find((e) => e.slug === slug);

  return (
    <Shell>
      {!entry ? (
        <Card className="p-6">
          <div className="text-sm font-semibold">未找到条目</div>
          <div className="mt-4">
            <Link href="/db"><Button>返回资料库</Button></Link>
          </div>
        </Card>
      ) : (
        <>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold">{entry.name}</h1>
              <div className="mt-3 flex flex-wrap gap-2">
                <Badge>{entry.type}</Badge>
                <Badge tone={entry.rarity === 'SSR' ? 'red' : entry.rarity === 'SR' ? 'orange' : 'green'}>{entry.rarity}</Badge>
              </div>
            </div>
            <Link href="/db"><Button variant="ghost">返回</Button></Link>
          </div>

          <Card className="mt-6 p-6">
            <div className="text-sm font-semibold">属性</div>
            <div className="mt-4 grid gap-2 md:grid-cols-2">
              {entry.stats.map((s) => (
                <div key={s.label} className="rounded-2xl border border-amber-200 bg-white/60 p-4">
                  <div className="text-xs text-amber-900/70">{s.label}</div>
                  <div className="mt-1 text-sm font-semibold">{s.value}</div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <div className="text-sm font-semibold">获取方式</div>
              <div className="mt-2 text-sm text-amber-900/80">{entry.obtain}</div>
            </div>

            {entry.note ? (
              <div className="mt-6">
                <div className="text-sm font-semibold">备注</div>
                <div className="mt-2 text-sm text-amber-900/80">{entry.note}</div>
              </div>
            ) : null}

            <div className="mt-6 text-xs text-amber-900/70">
              MVP 下一步：支持收藏（localStorage）与纠错提交（review queue）。
            </div>
          </Card>
        </>
      )}
    </Shell>
  );
}
