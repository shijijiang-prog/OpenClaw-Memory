import Link from 'next/link';
import { Shell } from '@/components/shell';
import { Card, Badge, Button } from '@/components/ui';

const items = [
  { type: '关注游戏更新', tone: 'blue' as const, title: '《示例游戏》发布 1.2.0 更新', link: '/games/warm-guild' },
  { type: '热帖', tone: 'orange' as const, title: '【吐槽】这次掉率是不是又暗改了？', link: '/forums/mmorpg' },
  { type: '@我', tone: 'red' as const, title: '@Steven 你这个配装思路有问题', link: '/forums/mmorpg' },
];

export default function Page() {
  return (
    <Shell>
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-semibold tracking-tight">通知</h1>
        <p className="mt-2 text-black/60">P8 通知中心（占位）：把更新/互动拉回首页或话题。</p>

        <div className="mt-6 grid gap-4">
          {items.map((it) => (
            <Link key={it.title} href={it.link}>
              <Card className="p-6">
                <div className="flex items-center gap-2">
                  <Badge tone={it.tone}>{it.type}</Badge>
                  <div className="text-base font-semibold">{it.title}</div>
                </div>
                <div className="mt-2 text-sm text-black/60">点击进入相关页面 →</div>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-6">
          <Link href="/"><Button variant="ghost">回首页</Button></Link>
        </div>
      </div>
    </Shell>
  );
}
