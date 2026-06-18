import { ArrowLeft as ArrowLeftIcon } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';

const VALUES = [
  { t: '战斗感', d: '不是哄你开心，是把目标压成一句能用的狠话。' },
  { t: '每日仪式', d: '每天一张，点亮屏幕就被拉回状态。' },
  { t: '私人定制', d: '按你的目标、状态和语气生成，不是通用语录。' },
  { t: '轻量陪跑', d: '三十秒一张，不做复杂的目标管理。' },
];
const NOTS = [
  '不羞辱你的身材或成绩',
  '不制造体重 / 落榜焦虑',
  '不灌成功学和空泛鸡汤',
  '不诱导自我惩罚',
];
const FAQ = [
  { q: '每天能生成几次？', a: '免费每天可重新生成 3 次，避免无限消耗。明天会刷新。' },
  { q: '文案是 AI 生成的吗？', a: '是。根据你的目标和今天的状态生成，再排版成锁屏壁纸。' },
  { q: '会保存我的隐私吗？', a: '目标和状态只用于生成文案。你不喜欢的表达可以在目标设置里关掉。' },
  { q: '收费吗？', a: 'MVP 阶段核心功能免费。未来会有高清导出等增值项。' },
];

export const metadata = { title: '关于鸡血君' };

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-lg pb-10">
      <div className="flex items-center gap-3 px-6 pt-4 pb-1.5">
        <Link
          href="/me"
          className="flex size-9 shrink-0 items-center justify-center rounded-md border border-rule-strong bg-paper text-ink no-underline"
        >
          <ArrowLeftIcon size={18} />
        </Link>
        <h1 className="text-xl font-extrabold text-ink">关于鸡血君</h1>
      </div>

      <div className="relative mx-6 mt-2.5 overflow-hidden rounded-2xl border-2 border-ink bg-cream p-5 shadow-[0_4px_0_0_var(--color-ink)]">
        <div className="absolute -top-6 -right-6 size-28 rounded-full bg-sun opacity-50" />
        <p className="eyebrow">每日精神燃料</p>
        <div className="mt-2.5 font-display text-2xl font-extrabold leading-snug text-ink">
          鸡血君不是
          <br />
          又一个励志语录网站。
        </div>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">
          它根据你的目标和今天的状态，每天生成一句刚好需要的话，排版成手机锁屏壁纸。让你每次点亮屏幕，都被重新拉回状态。
        </p>
      </div>

      <section className="px-6 pt-6">
        <h2 className="mb-3 text-base font-extrabold text-ink">我们在意的</h2>
        <div className="grid grid-cols-2 gap-2.5">
          {VALUES.map((v) => (
            <div key={v.t} className="rounded-lg border border-rule-strong bg-paper p-3.5">
              <div className="text-sm font-extrabold text-ink">{v.t}</div>
              <div className="mt-1 text-xs leading-relaxed text-mute">{v.d}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 pt-6">
        <h2 className="mb-2.5 text-base font-extrabold text-ink">我们不做的</h2>
        <div className="rounded-lg border border-rule-strong bg-paper px-4">
          {NOTS.map((n) => (
            <div
              key={n}
              className="flex items-center gap-2.5 border-b border-rule py-2.5 last:border-b-0"
            >
              <span className="font-extrabold text-tongue">✕</span>
              <span className="text-sm text-ink-soft">{n}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 pt-6">
        <h2 className="mb-2.5 text-base font-extrabold text-ink">想问的大概率在这里</h2>
        <div className="flex flex-col gap-2">
          {FAQ.map((f) => (
            <div key={f.q} className="rounded-lg border border-rule-strong bg-paper p-3.5">
              <div className="text-sm font-extrabold text-ink">{f.q}</div>
              <div className="mt-1.5 text-sm leading-relaxed text-ink-soft">{f.a}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="px-6 pt-7 text-center font-mono text-xs leading-relaxed text-mute">
        🐾 由柯基 Mui 监修
        <br />
        Meathill Studio · Made with ♥ in 重庆
      </div>
    </main>
  );
}
