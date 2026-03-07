'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { useParams } from 'next/navigation';
import { Shell } from '@/components/shell';
import { Badge, Button, Card } from '@/components/ui';
import { guides } from '@/data/mock';
import { readJson, writeJson } from '@/lib/storage';

export default function Page() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;

  const guide = useMemo(() => guides.find((g) => g.slug === slug), [slug]);
  const key = `wg.guide.checklist.${slug}`;

  if (!guide) {
    return (
      <Shell>
        <Card className="p-6">
          <div className="text-sm font-semibold">未找到攻略</div>
          <div className="mt-4">
            <Link href="/guides"><Button>返回攻略列表</Button></Link>
          </div>
        </Card>
      </Shell>
    );
  }

  const checked = readJson<Record<string, boolean>>(key, {});

  function toggle(i: number) {
    const next = { ...checked, [String(i)]: !checked[String(i)] };
    writeJson(key, next);
    // 触发重渲染：简单做法是刷新（原型阶段够用）
    window.location.reload();
  }

  const doneCount = guide.steps.filter((_, i) => checked[String(i)]).length;

  return (
    <Shell>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">{guide.title}</h1>
          <div className="mt-3 flex flex-wrap gap-2">
            <Badge>{guide.game}</Badge>
            <Badge tone="green">{guide.version}</Badge>
            <Badge tone={doneCount === guide.steps.length ? 'green' : 'orange'}>
              进度：{doneCount}/{guide.steps.length}
            </Badge>
          </div>
        </div>
        <div className="flex gap-2">
          <Link href="/guides"><Button variant="ghost">返回</Button></Link>
        </div>
      </div>

      <Card className="mt-6 p-6">
        <div className="text-sm font-semibold">Checklist（可勾选）</div>
        <ul className="mt-4 space-y-2">
          {guide.steps.map((s, i) => {
            const isDone = !!checked[String(i)];
            return (
              <li key={i}>
                <button
                  onClick={() => toggle(i)}
                  className={`w-full rounded-2xl border px-4 py-3 text-left text-sm transition ${
                    isDone
                      ? 'border-emerald-200 bg-emerald-50'
                      : 'border-amber-200 bg-white/60 hover:bg-amber-50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`mt-0.5 h-5 w-5 shrink-0 rounded-md border ${
                        isDone ? 'border-emerald-400 bg-emerald-400' : 'border-amber-300 bg-white'
                      }`}
                    />
                    <div>
                      <div className="font-medium">步骤 {i + 1}</div>
                      <div className="mt-1 text-amber-900/80">{s}</div>
                    </div>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="mt-6 text-xs text-amber-900/70">
          本地存储键：<span className="font-mono">{key}</span>
        </div>
      </Card>
    </Shell>
  );
}
