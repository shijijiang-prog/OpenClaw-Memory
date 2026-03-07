'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Page() {
  const router = useRouter();
  const [code, setCode] = useState('WG');

  function join() {
    // 原型：WG 直接映射到 wg
    router.push('/discord/servers/wg');
  }

  return (
    <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
      <div className="text-lg font-semibold">加入服务器（原型）</div>
      <div className="mt-2 text-sm text-gray-600">输入邀请码（原型：WG）。</div>

      <div className="mt-4 space-y-2">
        <div className="text-xs font-semibold text-gray-500">邀请码</div>
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="h-10 w-full rounded-xl border border-black/10 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-blue-200"
        />
      </div>

      <div className="mt-4 flex gap-2">
        <button onClick={join} className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white">
          加入
        </button>
        <Link href="/discord/servers" className="rounded-xl bg-white px-4 py-2 text-sm ring-1 ring-black/10">
          返回
        </Link>
      </div>
    </div>
  );
}
