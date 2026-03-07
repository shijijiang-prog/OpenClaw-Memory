import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Warm Guild MVP',
  description: '暖色调 · 社区/攻略/资料库/模拟器/语音房 原型',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="antialiased text-amber-950">{children}</body>
    </html>
  );
}
