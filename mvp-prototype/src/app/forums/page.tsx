'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { Shell } from '@/components/shell';
import { Badge, Button, Card } from '@/components/ui';
import { seedForums, Forum } from '@/data/mock';
import { readJson } from '@/lib/storage';

const LS_KEY = 'wg.forums.custom';

export default function Page() {
  const custom = readJson<Forum[]>(LS_KEY, []);

  const forums = useMemo(() => {
    const map = new Map<string, Forum>();
    for (const f of [...seedForums, ...custom]) map.set(f.slug, f);
    return [...map.values()].sort((a, b) => a.name.localeCompare(b.name));
  }, [custom]);

  return (
    <Shell>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">论坛（Forums）</h1>
          <p className="mt-2 text-sm text-amber-900/80">
            像 Discord 一样：任何人都可以创建版块（MVP 默认标记为“待审核”）。
          </p>
        </div>
        <Link href="/forums/new"><Button>创建版块</Button></Link>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {forums.map((f) => (
          <Link key={f.slug} href={`/forums/${f.slug}`}>
            <Card className="p-6">
              <div className="flex items-center justify-between gap-2">
                <div className="text-sm font-semibold">{f.name}</div>
                {f.status === 'pending' ? <Badge tone="red">待审核</Badge> : <Badge tone="green">活跃</Badge>}
              </div>
              <div className="mt-2 text-sm text-amber-900/80">{f.desc}</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {f.tags.map((t) => (
                  <Badge key={t}>{t}</Badge>
                ))}
              </div>
              <div className="mt-3 text-sm text-amber-700 underline">进入版块</div>
            </Card>
          </Link>
        ))}
      </div>
    </Shell>
  );
}
