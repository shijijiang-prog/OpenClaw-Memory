import { PropsWithChildren } from 'react';
import { NavLink } from './ui';

// 顶层只保留 IA 的“顶层入口”（社区下沉到游戏详情内）
const nav = [
  { href: '/', label: '首页' },
  { href: '/search', label: '搜索' },
  { href: '/topics', label: '专题' },
  { href: '/notifications', label: '通知' },
  { href: '/me', label: '我的' },
];

export function Shell({ children }: PropsWithChildren) {
  return (
    <div className="min-h-dvh bg-[#f5f5f7] text-[#1d1d1f]">
      <header className="sticky top-0 z-20 border-b border-black/10 bg-white/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-2xl bg-black" />
            <div>
              <div className="text-sm font-semibold">温暖社区</div>
              <div className="text-xs text-black/60">先选游戏，再进入社区功能</div>
            </div>
          </div>

          <nav className="hidden flex-1 items-center justify-center gap-1 md:flex">
            {nav.map((n) => (
              <NavLink key={n.href} href={n.href}>
                {n.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden text-xs text-black/60 md:block">MVP Demo</div>
        </div>

        {/* mobile nav */}
        <div className="md:hidden border-t border-black/10 bg-white/70">
          <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-2">
            {nav.map((n) => (
              <NavLink key={n.href} href={n.href}>
                {n.label}
              </NavLink>
            ))}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
      <footer className="mx-auto max-w-6xl px-4 py-10 text-xs text-black/50">简洁布局 · 中文优先 · iOS 风格</footer>
    </div>
  );
}
