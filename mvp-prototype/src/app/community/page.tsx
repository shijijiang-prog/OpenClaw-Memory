'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Shell } from '@/components/shell';
import { Card, Segmented, Badge, Button } from '@/components/ui';

const fixed = [
  { href: '/forums', title: '论坛', desc: '讨论/吐槽/提问/分享；可自建版块（默认待审核）', key: 'forums' },
  { href: '/guides', title: '攻略', desc: '可交互：Checklist / 分步评论 / 版本标记', key: 'guides' },
  { href: '/db', title: '资料库', desc: '结构化条目：收藏/纠错提交/对比', key: 'db' },
  { href: '/simulators', title: '模拟器', desc: '栏目 + 入口（MVP：资源规划器）', key: 'sims' },
  { href: '/community/more', title: '更多', desc: '自定义频道：#版本更新 #组队 #活动日历 #语音房…', key: 'more' },
];

export default function Page() {
  const [tab, setTab] = useState('forums');
  const item = fixed.find((x) => x.key === tab) ?? fixed[0];

  return (
    <Shell>
      <div className="mx-auto max-w-4xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">社区（固定标签）</h1>
            <p className="mt-2 text-black/60">进入任一游戏/社区，都呈现同一套固定标签入口。</p>
          </div>
          <div className="hidden md:flex gap-2">
            <Link href="/games/warm-guild"><Button variant="ghost">示例游戏</Button></Link>
            <Link href="/post/new"><Button>发布</Button></Link>
          </div>
        </div>

        <div className="mt-6">
          <Segmented
            value={tab}
            onChange={setTab}
            options={fixed.map((x) => ({ label: x.title, value: x.key }))}
          />
        </div>

        <div className="mt-6">
          <Link href={item.href}>
            <Card className="p-8">
              <div className="flex items-center gap-2">
                <Badge tone="blue">固定标签</Badge>
                <div className="text-lg font-semibold">{item.title}</div>
              </div>
              <div className="mt-2 text-sm text-black/60">{item.desc}</div>
              <div className="mt-4 text-sm text-[#0071e3]">进入 →</div>
            </Card>
          </Link>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {fixed
            .filter((x) => x.key !== tab)
            .slice(0, 4)
            .map((x) => (
              <Link key={x.key} href={x.href}>
                <Card className="p-6">
                  <div className="text-lg font-semibold">{x.title}</div>
                  <div className="mt-2 text-sm text-black/60">{x.desc}</div>
                </Card>
              </Link>
            ))}
        </div>
      </div>
    </Shell>
  );
}
