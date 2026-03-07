'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Page() {
  const router = useRouter();
  const [name, setName] = useState('我的新服务器');

  function create() {
    // 原型：不真正创建，只跳转到 seed server
    router.push('/discord/servers/wg');
  }

  return (
    <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
      <div className="text-lg font-semibold">创建服务器（原型）</div>
      <div className="mt-2 text-sm text-gray-600">
        MVP 先不做真实创建，点击创建会跳到示例服务器 Warm Guild。
      </div>

      <div className="mt-4 space-y-2">
        <div className="text-xs font-semibold text-gray-500">服务器名称</div>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="h-10 w-full rounded-xl border border-black/10 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-blue-200"
        />
      </div>

      <div className="mt-4 flex gap-2">
        <button onClick={create} className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white">
          创建
        </button>
        <Link href="/discord/servers" className="rounded-xl bg-white px-4 py-2 text-sm ring-1 ring-black/10">
          取消
        </Link>
      </div>
    </div>
  );
}
