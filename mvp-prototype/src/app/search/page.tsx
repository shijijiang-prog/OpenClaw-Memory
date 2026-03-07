import Link from 'next/link';
import { Shell } from '@/components/shell';
import { Card, Input, Button, Badge } from '@/components/ui';

export default function Page() {
  return (
    <Shell>
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-semibold tracking-tight">搜索</h1>
        <p className="mt-2 text-black/60">P1 搜索/筛选（占位）：后续接入游戏数据与多维筛选。</p>

        <div className="mt-5 flex flex-col gap-3 md:flex-row">
          <Input placeholder="搜索游戏/攻略/资料库…" />
          <Button className="md:w-32">搜索</Button>
        </div>

        <div className="mt-6 grid gap-4">
          <Card className="p-6">
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="blue">筛选</Badge>
              <Badge>平台</Badge>
              <Badge>语言</Badge>
              <Badge>时长</Badge>
              <Badge>标签</Badge>
            </div>
            <div className="mt-3 text-sm text-black/60">（MVP：仅展示结构，不做真实筛选）</div>
          </Card>

          <Card className="p-6">
            <div className="text-sm font-medium text-black/60">推荐入口</div>
            <div className="mt-2 flex flex-wrap gap-2">
              <Link href="/topics"><Button variant="ghost">去看专题</Button></Link>
              <Link href="/"><Button variant="ghost">回首页</Button></Link>
            </div>
          </Card>
        </div>
      </div>
    </Shell>
  );
}
