'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { useParams } from 'next/navigation';
import { Shell } from '@/components/shell';
import { Badge, Button, Card } from '@/components/ui';
import { Forum, seedForums } from '@/data/mock';
import { readJson } from '@/lib/storage';

const LS_KEY = 'wg.forums.custom';

type Post = { id: string; title: string; author: string; createdAt: string; tags: string[] };

const seedPosts: Record<string, Post[]> = {
  'roo-newbie': [
    { id: 'p1', title: '30分钟日常路线：求补充（新手友好）', author: 'Aki', createdAt: '今天', tags: ['日常','新手'] },
    { id: 'p2', title: '开荒队伍怎么配？奶妈/输出/坦克优先级', author: 'Kirin', createdAt: '昨天', tags: ['组队','开荒'] },
  ],
  'dnm-builds': [
    { id: 'p3', title: '技能循环：螺旋连击如何插入不丢DPS', author: 'Momo', createdAt: '今天', tags: ['职业','技能'] },
  ],
};

export default function Page() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;

  const custom = readJson<Forum[]>(LS_KEY, []);

  const forum = useMemo(() => {
    return [...seedForums, ...custom].find((f) => f.slug === slug);
  }, [custom, slug]);

  const posts = seedPosts[slug] ?? [];

  return (
    <Shell>
      {!forum ? (
        <Card className="p-6">
          <div className="text-sm font-semibold">未找到该版块</div>
          <div className="mt-2 text-sm text-amber-900/80">可能是 slug 不存在，或 localStorage 尚未创建。</div>
          <div className="mt-4">
            <Link href="/forums"><Button>返回论坛列表</Button></Link>
          </div>
        </Card>
      ) : (
        <>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-semibold">{forum.name}</h1>
                {forum.status === 'pending' ? <Badge tone="red">待审核</Badge> : <Badge tone="green">活跃</Badge>}
              </div>
              <p className="mt-2 text-sm text-amber-900/80">{forum.desc}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {forum.tags.map((t) => (
                  <Badge key={t}>{t}</Badge>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <Link href="/post/new"><Button>发帖</Button></Link>
              <Link href="/forums"><Button variant="ghost">返回</Button></Link>
            </div>
          </div>

          <div className="mt-6 grid gap-4">
            {posts.length === 0 ? (
              <Card className="p-6">
                <div className="text-sm font-semibold">这里还没有帖子</div>
                <div className="mt-2 text-sm text-amber-900/80">MVP 下一步可把帖子落库到 localStorage。</div>
              </Card>
            ) : (
              posts.map((p) => (
                <Card key={p.id} className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-sm font-semibold">{p.title}</div>
                      <div className="mt-1 text-xs text-amber-900/70">{p.author} · {p.createdAt}</div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {p.tags.map((t) => (
                          <Badge key={t}>{t}</Badge>
                        ))}
                      </div>
                    </div>
                    <div className="text-xs text-amber-700">占位</div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </>
      )}
    </Shell>
  );
}
