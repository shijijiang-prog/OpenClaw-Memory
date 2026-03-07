'use client';

import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { Shell } from '@/components/shell';
import { Button, Card, Input, Textarea } from '@/components/ui';
import { Forum } from '@/data/mock';
import { readJson, uid, writeJson } from '@/lib/storage';

const LS_KEY = 'wg.forums.custom';

function slugify(s: string) {
  return s
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\-\u4e00-\u9fa5]/g, '')
    .slice(0, 48);
}

export default function Page() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [tags, setTags] = useState('');

  const previewSlug = useMemo(() => slugify(name || 'my-forum'), [name]);

  function onSubmit() {
    const all = readJson<Forum[]>(LS_KEY, []);
    const forum: Forum = {
      id: uid('forum'),
      slug: previewSlug || uid('slug'),
      name: name || '未命名版块',
      desc: desc || '（暂无简介）',
      tags: tags
        .split(',')
        .map((x) => x.trim())
        .filter(Boolean)
        .slice(0, 8),
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    writeJson(LS_KEY, [forum, ...all]);
    router.push(`/forums/${forum.slug}`);
  }

  return (
    <Shell>
      <h1 className="text-2xl font-semibold">创建论坛版块</h1>
      <p className="mt-2 text-sm text-amber-900/80">任何人可创建，MVP 默认标记为“待审核”。</p>

      <Card className="mt-6 p-6">
        <div className="grid gap-3">
          <div>
            <div className="mb-1 text-sm font-medium">版块名</div>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="例如：ROO 装备研究所" />
            <div className="mt-1 text-xs text-amber-900/70">slug 预览：{previewSlug}</div>
          </div>
          <div>
            <div className="mb-1 text-sm font-medium">简介</div>
            <Textarea value={desc} onChange={(e) => setDesc(e.target.value)} rows={4} placeholder="这个版块讨论什么？适合谁？" />
          </div>
          <div>
            <div className="mb-1 text-sm font-medium">标签（逗号分隔）</div>
            <Input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="ROO, 装备, 新手" />
          </div>

          <div className="flex gap-2">
            <Button onClick={onSubmit}>创建</Button>
            <Button variant="ghost" onClick={() => router.back()}>
              返回
            </Button>
          </div>
        </div>
      </Card>
    </Shell>
  );
}
