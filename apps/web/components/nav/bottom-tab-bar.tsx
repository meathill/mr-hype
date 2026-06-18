'use client';

import {
  type Icon,
  SquaresFour as SquaresFourIcon,
  Sun as SunIcon,
  Target as TargetIcon,
  User as UserIcon,
} from '@phosphor-icons/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const TABS: { href: string; label: string; Icon: Icon }[] = [
  { href: '/', label: '今日', Icon: SunIcon },
  { href: '/goal', label: '目标', Icon: TargetIcon },
  { href: '/templates', label: '模板', Icon: SquaresFourIcon },
  { href: '/me', label: '我的', Icon: UserIcon },
];

export function BottomTabBar() {
  const pathname = usePathname();
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 flex h-[72px] border-t border-rule bg-cream/95 px-2 pt-1.5 pb-3.5 backdrop-blur md:hidden">
      {TABS.map(({ href, label, Icon: TabIcon }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={`flex flex-1 flex-col items-center justify-center gap-0.5 no-underline ${
              active ? 'text-yellow-deep' : 'text-mute'
            }`}
          >
            <TabIcon size={22} weight={active ? 'fill' : 'regular'} />
            <span className="text-[11px] font-bold">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
