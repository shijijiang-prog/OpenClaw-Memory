import { Shell } from '@/components/shell';
import { Card, Badge } from '@/components/ui';

const channels = [
  { name: '#版本更新', desc: '官方公告/版本要点/玩家反馈聚合' },
  { name: '#组队', desc: '按时间段/职业/副本快速组队' },
  { name: '#活动日历', desc: '周常/月常/限时活动提醒' },
  { name: '#语音房', desc: '语音房入口 + 房间总结沉淀' },
];

export default function Page() {
  return (
    <Shell>
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-semibold tracking-tight">更多自定义</h1>
        <p className="mt-2 text-black/60">Community 的自定义频道（占位）：后续支持创建/排序/置顶。</p>

        <div className="mt-6 grid gap-4">
          {channels.map((c) => (
            <Card key={c.name} className="p-6">
              <div className="flex items-center gap-2">
                <Badge tone="blue">频道</Badge>
                <div className="text-lg font-semibold">{c.name}</div>
              </div>
              <div className="mt-2 text-sm text-black/60">{c.desc}</div>
            </Card>
          ))}
        </div>
      </div>
    </Shell>
  );
}
