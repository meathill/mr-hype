import Image from 'next/image';
import Link from 'next/link';

export function TopNav() {
  return (
    <header className="sticky top-0 z-30 hidden items-center justify-between border-b border-rule bg-cream/90 px-10 py-4 backdrop-blur md:flex">
      <Link href="/" className="flex items-center gap-2.5 no-underline">
        <span className="overflow-hidden rounded-lg border-2 border-ink bg-yellow-warm">
          <Image src="/assets/mui-mark.png" alt="鸡血君" width={32} height={32} />
        </span>
        <span className="text-lg font-extrabold text-ink">鸡血君</span>
      </Link>
      <nav className="flex items-center gap-7">
        <Link href="/templates" className="text-sm font-bold text-ink-soft no-underline">
          模板
        </Link>
        <Link href="/how-to-set-wallpaper" className="text-sm font-bold text-ink-soft no-underline">
          使用说明
        </Link>
        <Link
          href="/generate"
          className="press-ink rounded-lg border-2 border-ink bg-yellow px-4.5 py-2.5 text-sm font-extrabold text-ink no-underline"
        >
          生成我的鸡血
        </Link>
      </nav>
    </header>
  );
}
