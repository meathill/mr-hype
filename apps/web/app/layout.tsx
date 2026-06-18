import type { Metadata } from 'next';
import { Fraunces, JetBrains_Mono, Nunito } from 'next/font/google';
import type { ReactNode } from 'react';
import './globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-fraunces',
  display: 'swap',
});
const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-nunito',
  display: 'swap',
});
const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  title: '鸡血君 · 每天一张专属于你的鸡血壁纸',
  description:
    '输入你的目标，选择你喜欢的语气，鸡血君会生成一句今天刚好需要的话，并排版成适合手机锁屏的壁纸。',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="zh-CN"
      className={`${fraunces.variable} ${nunito.variable} ${jetBrainsMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
