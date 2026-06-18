import type { ReactNode } from 'react';
import { BottomTabBar } from '@/components/nav/bottom-tab-bar';
import { TopNav } from '@/components/nav/top-nav';

// 带导航的主区：桌面顶部导航 + 移动端底部 Tab（今日/目标/模板/我的）
export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <TopNav />
      <div className="pb-20 md:pb-0">{children}</div>
      <BottomTabBar />
    </>
  );
}
