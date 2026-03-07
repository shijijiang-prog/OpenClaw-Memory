'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

function Tab({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const active = pathname === href || pathname.startsWith(href + '/');
  return (
    <Link
      href={href}
      className={
        'rounded-full px-3 py-1 text-sm transition ' +
        (active
          ? 'bg-blue-600 text-white'
          : 'bg-white/70 text-gray-700 hover:bg-white')
      }
    >
      {label}
    </Link>
  );
}

export default function DiscordShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-[#f5f5f7]">
      <div className="sticky top-0 z-10 border-b border-black/5 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/50">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <div className="text-sm font-semibold text-gray-900">Discord 原型</div>
          <div className="flex gap-2">
            <Tab href="/discord/servers" label="服务器" />
            <Tab href="/discord/servers/join" label="加入" />
            <Tab href="/discord/servers/new" label="创建" />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-4">{children}</div>
    </div>
  );
}
