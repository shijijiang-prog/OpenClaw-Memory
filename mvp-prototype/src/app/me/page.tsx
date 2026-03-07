import Link from 'next/link';
import { Shell } from '@/components/shell';
import { Card, Badge, Button } from '@/components/ui';

export default function Page() {
  return (
    <Shell>
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-semibold tracking-tight">我的</h1>
        <p className="mt-2 text-black/60">P9 我的（占位）：关注/收藏/历史/订阅/偏好设置。</p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Card className="p-6">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-black/10" />
              <div>
                <div className="text-lg font-semibold">Steven</div>
                <div className="text-sm text-black/60">玩家端 MVP</div>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge>关注 3</Badge>
              <Badge>收藏 12</Badge>
              <Badge tone="green">偏好已设置</Badge>
            </div>
          </Card>

          <Card className="p-6">
            <div className="text-sm font-medium text-black/60">快捷入口</div>
            <div className="mt-3 flex flex-wrap gap-2">
              <Link href="/community"><Button variant="ghost">社区</Button></Link>
              <Link href="/notifications"><Button variant="ghost">通知</Button></Link>
              <Link href="/search"><Button variant="ghost">搜索</Button></Link>
            </div>
          </Card>
        </div>
      </div>
    </Shell>
  );
}
