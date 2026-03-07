import Link from 'next/link';
import { Shell } from '@/components/shell';
import { Badge, Card } from '@/components/ui';
import { guides } from '@/data/mock';

export default function Page() {
  return (
    <Shell>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">攻略（Guides）</h1>
          <p className="mt-2 text-sm text-amber-900/80">把攻略做成可交互 checklist，降低“看完就忘”的损耗。</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {guides.map((g) => (
          <Link key={g.slug} href={`/guides/${g.slug}`}>
            <Card className="p-6">
              <div className="flex items-center gap-2">
                <div className="text-sm font-semibold">{g.title}</div>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                <Badge>{g.game}</Badge>
                <Badge tone="green">{g.version}</Badge>
                <Badge tone="orange">Checklist</Badge>
              </div>
              <div className="mt-3 text-sm text-amber-700 underline">打开攻略</div>
            </Card>
          </Link>
        ))}
      </div>
    </Shell>
  );
}
