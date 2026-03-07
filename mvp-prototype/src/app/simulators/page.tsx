import Link from 'next/link';
import { Shell } from '@/components/shell';
import { Card } from '@/components/ui';

export default function Page() {
  return (
    <Shell>
      <h1 className="text-2xl font-semibold">模拟器（Simulators）</h1>
      <p className="mt-2 text-sm text-amber-900/80">先落地 1 个最小工具：资源规划器（1.A）。</p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Link href="/simulators/resource-planner">
          <Card className="p-6">
            <div className="text-sm font-semibold">资源规划器</div>
            <div className="mt-2 text-sm text-amber-900/80">输入目标等级/天数/每日投入时间 → 输出每日任务建议。</div>
            <div className="mt-3 text-sm text-amber-700 underline">打开</div>
          </Card>
        </Link>
      </div>
    </Shell>
  );
}
