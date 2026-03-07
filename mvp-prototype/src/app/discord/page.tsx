import Link from 'next/link';

export default function Page() {
  return (
    <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
      <div className="text-lg font-semibold">Discord-like MVP（Web 原型）</div>
      <p className="mt-2 text-sm text-gray-600">
        目标：演示最小闭环——创建/加入服务器 → 频道聊天 → 语音房（占位） →
        角色权限（简化）。
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        <Link className="rounded-full bg-blue-600 px-4 py-2 text-sm text-white" href="/discord/servers">
          进入服务器列表
        </Link>
        <Link className="rounded-full bg-white px-4 py-2 text-sm text-gray-700 ring-1 ring-black/10" href="/discord/servers/join">
          加入服务器
        </Link>
        <Link className="rounded-full bg-white px-4 py-2 text-sm text-gray-700 ring-1 ring-black/10" href="/discord/servers/new">
          创建服务器
        </Link>
      </div>
    </div>
  );
}
