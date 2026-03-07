import Link from 'next/link';
import { Shell } from '@/components/shell';
import { Button, Card, Input, Textarea } from '@/components/ui';

export default function Page() {
  return (
    <Shell>
      <h1 className="text-2xl font-semibold">发布帖子（占位原型）</h1>
      <p className="mt-2 text-sm text-amber-900/80">MVP 暂不落库，只做交互与样式示范。</p>

      <Card className="mt-6 p-6">
        <div className="grid gap-3">
          <div>
            <div className="mb-1 text-sm font-medium">标题</div>
            <Input placeholder="例如：ROO 30分钟日常路线（求补充）" />
          </div>
          <div>
            <div className="mb-1 text-sm font-medium">内容</div>
            <Textarea rows={8} placeholder="写下你的经验、截图、结论与问题…" />
          </div>
          <div className="flex gap-2">
            <Button>发布（未实现）</Button>
            <Link href="/forums"><Button variant="ghost">返回论坛</Button></Link>
          </div>
        </div>
      </Card>
    </Shell>
  );
}
