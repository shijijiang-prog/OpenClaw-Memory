import Link from 'next/link';
import { Shell } from '@/components/shell';
import { Badge, Button, Card } from '@/components/ui';

const games = [
  { slug: 'warm-guild', name: '示例游戏', desc: '用于演示：游戏详情 Hub + 社区固定标签' },
  { slug: 'dragon-nest-m', name: '龙之谷 M（占位）', desc: '后续接入真实游戏数据后替换' },
  { slug: 'roo', name: 'ROO（占位）', desc: '后续接入真实游戏数据后替换' },
];

export default function Page() {
  return (
    <Shell>
      <div className="mx-auto max-w-5xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge>中文</Badge>
              <Badge tone="blue">简洁</Badge>
              <Badge tone="green">iOS 风格</Badge>
            </div>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight">先选一个游戏</h1>
            <p className="mt-3 text-base text-black/60">社区功能下沉到“游戏详情”里：选择游戏后才看到社区/攻略/资料库/模拟器等入口。</p>
          </div>
          <div className="hidden md:flex gap-2">
            <Link href="/search"><Button>搜索游戏</Button></Link>
            <Link href="/topics"><Button variant="ghost">看专题</Button></Link>
          </div>
        </div>

        <div className="mt-6 grid gap-4">
          {games.map((g) => (
            <Link key={g.slug} href={`/games/${g.slug}`}>
              <Card className="p-8">
                <div className="text-sm font-medium text-black/60">游戏</div>
                <div className="mt-2 text-2xl font-semibold">{g.name}</div>
                <div className="mt-2 text-sm text-black/60">{g.desc}</div>
                <div className="mt-4 text-sm text-[#0071e3]">进入游戏 →</div>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <Link href="/notifications"><Button variant="ghost">通知（回流）</Button></Link>
          <Link href="/me"><Button variant="ghost">我的</Button></Link>
        </div>
      </div>
    </Shell>
  );
}
