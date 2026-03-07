'use client';

import { useMemo, useState } from 'react';
import { Shell } from '@/components/shell';
import { Badge, Card, Input } from '@/components/ui';

function plan(targetLevel: number, days: number, minutesPerDay: number) {
  const intensity = minutesPerDay >= 90 ? 'high' : minutesPerDay >= 45 ? 'mid' : 'low';

  const base = [
    { name: '领取活动/加成', cost: 5 },
    { name: '高收益日常（经验/体力）', cost: intensity === 'low' ? 15 : 20 },
    { name: '材料副本/团队本（组队）', cost: intensity === 'low' ? 15 : 25 },
    { name: '整理背包/强化/交易行', cost: 10 },
  ];

  if (intensity !== 'low') base.splice(3, 0, { name: '公会活动/周常推进', cost: 20 });
  if (intensity === 'high') base.push({ name: 'Build 复盘（木桩/录像/笔记）', cost: 20 });

  // 简单把目标等级映射为“需要的总进度点”
  const totalPoints = Math.max(10, Math.floor((targetLevel - 1) * 10));
  const pointsPerDay = Math.max(1, Math.floor(totalPoints / Math.max(1, days)));

  // 生成每日建议（模板）
  const schedule = base.map((x) => `- ${x.name}（约 ${x.cost} 分钟）`).join('\n');

  return {
    intensity,
    pointsPerDay,
    summary: `目标等级 Lv.${targetLevel} / ${days} 天 / 每天 ${minutesPerDay} 分钟 → 建议日均推进 ${pointsPerDay} 个“进度点”（MVP 规则）。`,
    schedule,
  };
}

export default function Page() {
  const [targetLevel, setTargetLevel] = useState(60);
  const [days, setDays] = useState(14);
  const [minutes, setMinutes] = useState(45);

  const result = useMemo(() => plan(targetLevel, days, minutes), [targetLevel, days, minutes]);

  return (
    <Shell>
      <h1 className="text-2xl font-semibold">资源规划器（MVP）</h1>
      <p className="mt-2 text-sm text-amber-900/80">用简单规则把“目标”拆成“每日任务”，先让用户愿意每天打开。</p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Card className="p-6">
          <div className="text-sm font-semibold">输入</div>
          <div className="mt-4 grid gap-3">
            <label className="grid gap-1 text-sm">
              目标等级
              <Input type="number" value={targetLevel} onChange={(e) => setTargetLevel(Number(e.target.value))} />
            </label>
            <label className="grid gap-1 text-sm">
              计划天数
              <Input type="number" value={days} onChange={(e) => setDays(Number(e.target.value))} />
            </label>
            <label className="grid gap-1 text-sm">
              每日可投入时间（分钟）
              <Input type="number" value={minutes} onChange={(e) => setMinutes(Number(e.target.value))} />
            </label>
            <div className="text-xs text-amber-900/70">提示：MVP 只做规则规划；后续可接入具体游戏的任务库与掉落数据。</div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold">输出</div>
            <Badge tone={result.intensity === 'high' ? 'red' : result.intensity === 'mid' ? 'orange' : 'green'}>
              强度：{result.intensity}
            </Badge>
          </div>
          <div className="mt-3 text-sm text-amber-900/80">{result.summary}</div>

          <div className="mt-4 rounded-2xl border border-amber-200 bg-white/60 p-4">
            <div className="text-xs text-amber-900/70">每日任务建议</div>
            <pre className="mt-2 whitespace-pre-wrap text-sm leading-6 text-amber-950">{result.schedule}</pre>
          </div>

          <div className="mt-4 text-xs text-amber-900/70">下一步（非 MVP）：支持一键生成“我的日常 checklist”并推送到攻略/版块置顶。</div>
        </Card>
      </div>
    </Shell>
  );
}
