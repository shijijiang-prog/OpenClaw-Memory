'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import { Shell } from '@/components/shell';
import { Badge, Button, Card, Segmented } from '@/components/ui';

export default function Page() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;

  // 按你截图：详情 / 论坛 / 攻略 / 数据 / 模拟器 / 语音
  const [tab, setTab] = useState('detail');

  const game = useMemo(
    () => ({
      name: slug === 'warm-guild' ? '示例游戏' : `游戏：${slug}`,
      tagline: '选择游戏后开启社区能力：论坛/攻略/数据/模拟器/语音。',
      tags: ['MMORPG', '组队', '轻量日常'],
    }),
    [slug]
  );

  return (
    <Shell>
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">{game.name}</h1>
            <p className="mt-2 text-black/60">{game.tagline}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {game.tags.map((t) => (
                <Badge key={t}>{t}</Badge>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <Link href="/"><Button variant="ghost">返回首页</Button></Link>
            <Link href="/search"><Button>继续发现</Button></Link>
          </div>
        </div>

        <div className="mt-6">
          <Segmented
            value={tab}
            onChange={setTab}
            options={[
              { label: '详情', value: 'detail' },
              { label: '论坛', value: 'forum' },
              { label: '攻略', value: 'guides' },
              { label: '数据', value: 'data' },
              { label: '模拟器', value: 'sims' },
              { label: '语音', value: 'voice' },
            ]}
          />
        </div>

        <div className="mt-6">
          {tab === 'detail' && (
            <Card className="p-6">
              <div className="text-lg font-semibold">详情</div>
              <div className="mt-2 text-sm text-black/60">
                对齐 P3/P5 的“先看懂再行动”：一句话看懂 + 适合人群 + 亮点/痛点（占位）。
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link href="/topics"><Button variant="ghost">看专题</Button></Link>
                <Link href="/notifications"><Button variant="ghost">看通知</Button></Link>
              </div>
            </Card>
          )}

          {tab === 'forum' && (
            <Card className="p-6">
              <div className="text-lg font-semibold">论坛</div>
              <div className="mt-2 text-sm text-black/60">讨论/吐槽/提问/分享；可自建版块。</div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link href="/forums"><Button>进入论坛</Button></Link>
                <Link href="/post/new"><Button variant="ghost">发布</Button></Link>
                <Link href="/forums/new"><Button variant="ghost">创建版块</Button></Link>
              </div>
            </Card>
          )}

          {tab === 'guides' && (
            <Card className="p-6">
              <div className="text-lg font-semibold">攻略</div>
              <div className="mt-2 text-sm text-black/60">可交互：Checklist / 分步评论 / 版本标记。</div>
              <div className="mt-4">
                <Link href="/guides"><Button>进入攻略</Button></Link>
              </div>
            </Card>
          )}

          {tab === 'data' && (
            <Card className="p-6">
              <div className="text-lg font-semibold">数据</div>
              <div className="mt-2 text-sm text-black/60">对齐 P4：资料库条目、版本、配置、平台、语言、时长等。</div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link href="/db"><Button>进入资料库</Button></Link>
                <Link href="/simulators"><Button variant="ghost">去模拟器</Button></Link>
              </div>
            </Card>
          )}

          {tab === 'sims' && (
            <Card className="p-6">
              <div className="text-lg font-semibold">模拟器</div>
              <div className="mt-2 text-sm text-black/60">工具化入口：资源规划/配装评分/抽卡概率…（MVP 先做资源规划器）。</div>
              <div className="mt-4">
                <Link href="/simulators/resource-planner"><Button>打开资源规划器</Button></Link>
              </div>
            </Card>
          )}

          {tab === 'voice' && (
            <Card className="p-6">
              <div className="text-lg font-semibold">语音</div>
              <div className="mt-2 text-sm text-black/60">语音房入口 + 房间总结沉淀（MVP：规则摘要）。</div>
              <div className="mt-4">
                <Link href="/voice"><Button>进入语音房</Button></Link>
              </div>
            </Card>
          )}
        </div>
      </div>
    </Shell>
  );
}
