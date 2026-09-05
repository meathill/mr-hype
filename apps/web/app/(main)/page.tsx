import { GOALS, TEMPLATES, TONES } from '@mr-hype/shared';
import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { Wallpaper } from '@/components/wallpaper';

const STEPS = [
  { n: '1', t: '写下你的目标', d: '减肥、备考、健身、做项目、戒拖延，越具体越好。' },
  { n: '2', t: '选择你的语气', d: '温柔鼓励、热血教练、冷酷战友、中二燃、极简冷酷。' },
  { n: '3', t: '下载今日壁纸', d: '保存到手机，设成锁屏或桌面，每天被拉回状态。' },
];

const HERO_PHONES = [
  {
    id: 'paper' as const,
    main: '今天不用满血，\n只要别消失，就已经很好。',
    sub: '慢一点，但别停。',
  },
  { id: 'cyber' as const, main: '没人会替你 ship，\n今天你来。', sub: '' },
];

function Section({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <section className={`border-t border-rule px-6 py-12 md:px-10 md:py-16 ${className}`}>
      {children}
    </section>
  );
}

function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-[30px] bg-[#15110b] p-[7px] shadow-lg">
      <div className="overflow-hidden rounded-3xl">{children}</div>
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl">
      {/* 移动端问候头 */}
      <div className="flex items-center justify-between px-6 pt-4 pb-2 md:hidden">
        <div>
          <div className="text-sm text-mute">6月16日 星期二</div>
          <div className="text-xl font-extrabold text-ink">准备好今天的鸡血了吗</div>
        </div>
        <span className="overflow-hidden rounded-xl border-2 border-ink bg-corgi">
          <Image src="/assets/mui-mascot.png" alt="柯基 Mui" width={42} height={42} />
        </span>
      </div>

      {/* Hero */}
      <section className="bg-sun px-6 py-10 md:grid md:grid-cols-[1.05fr_0.95fr] md:items-center md:gap-8 md:px-10 md:py-16">
        <div>
          <p className="eyebrow">每日精神燃料 · 锁屏友好</p>
          <h1 className="mt-3 font-display text-4xl font-extrabold leading-[1.12] tracking-tight text-ink md:text-6xl">
            每天一张，
            <br />
            专属于你的
            <br />
            <span className="highlight">鸡血壁纸</span>。
          </h1>
          <p className="mt-4 max-w-md text-base leading-relaxed text-ink-soft md:text-lg">
            写下你的目标，选择你喜欢的语气，鸡血君会生成一句今天刚好需要的话，并排版成适合手机锁屏的壁纸。
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/generate"
              className="press-ink rounded-lg border-2 border-ink bg-yellow px-6 py-3.5 text-base font-extrabold text-ink no-underline"
            >
              生成我的今日鸡血
            </Link>
            <Link
              href="/templates"
              prefetch={false}
              className="rounded-lg border-2 border-ink bg-transparent px-5 py-3.5 text-base font-extrabold text-ink no-underline"
            >
              查看示例
            </Link>
          </div>
        </div>
        <div className="mt-10 flex justify-center gap-4 md:mt-0">
          {HERO_PHONES.map((phone, i) => (
            <div key={phone.id} className={i === 0 ? 'mt-8' : ''}>
              <PhoneFrame>
                <Wallpaper
                  templateId={phone.id}
                  main={phone.main}
                  sub={phone.sub}
                  lock
                  width={150}
                  height={316}
                />
              </PhoneFrame>
            </div>
          ))}
        </div>
      </section>

      {/* 它怎么工作 */}
      <Section>
        <h2 className="text-center font-display text-3xl font-extrabold text-ink">三步，三十秒</h2>
        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {STEPS.map((step) => (
            <div key={step.n} className="rounded-xl border border-rule-strong bg-paper p-5">
              <div className="flex size-9 items-center justify-center rounded-md border-2 border-ink bg-yellow font-mono text-base font-extrabold text-ink">
                {step.n}
              </div>
              <div className="mt-3.5 text-lg font-extrabold text-ink">{step.t}</div>
              <div className="mt-1.5 text-sm leading-relaxed text-mute">{step.d}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* 适合哪些目标 */}
      <Section>
        <h2 className="font-display text-2xl font-extrabold text-ink md:text-3xl">适合哪些目标</h2>
        <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
          {GOALS.map((goal) => (
            <Link
              key={goal.id}
              href={`/generate?seed=${encodeURIComponent(goal.seed)}`}
              prefetch={false}
              className="block rounded-lg border border-rule-strong bg-paper p-3.5 no-underline shadow-xs"
            >
              <div className="mb-1.5 flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-yellow-warm" />
                <span className="text-sm font-extrabold text-ink">{goal.name}</span>
              </div>
              <div className="text-xs leading-relaxed text-mute">{goal.ex}</div>
            </Link>
          ))}
        </div>
      </Section>

      {/* 五种语气人格 */}
      <Section>
        <h2 className="font-display text-2xl font-extrabold text-ink md:text-3xl">五种语气人格</h2>
        <div className="mt-5 grid gap-2 md:grid-cols-2">
          {TONES.map((tone) => (
            <div
              key={tone.id}
              className="flex items-baseline gap-3 rounded-lg border border-corgi/45 bg-fluff px-3.5 py-3"
            >
              <span className="shrink-0 text-sm font-extrabold text-ink">{tone.name}</span>
              <span className="text-sm leading-relaxed text-ink-soft">「{tone.ex}」</span>
            </div>
          ))}
        </div>
      </Section>

      {/* 八套模板 */}
      <Section className="bg-paper">
        <h2 className="text-center font-display text-2xl font-extrabold text-ink md:text-3xl">
          八套模板，八种气质
        </h2>
        <p className="mt-2 text-center text-sm text-mute">
          从冷酷极简到温柔便签，总有一张是今天的你。
        </p>
        <div className="mt-7 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {TEMPLATES.map((tpl) => (
            <div key={tpl.id} className="flex flex-col items-center gap-2.5">
              <div className="overflow-hidden rounded-xl border border-rule-strong shadow-md">
                <Wallpaper
                  templateId={tpl.id}
                  main={tpl.show}
                  sub={tpl.showSub}
                  width={150}
                  height={266}
                />
              </div>
              <div className="text-center">
                <div className="text-sm font-extrabold text-ink">{tpl.name}</div>
                <div className="mt-0.5 text-xs text-mute">{tpl.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 最终 CTA */}
      <Section className="!border-t-0">
        <div className="rounded-2xl bg-ink px-6 py-12 text-center md:py-14">
          <h2 className="font-display text-2xl font-extrabold leading-snug text-cream md:text-4xl">
            今天你想赢下哪一件事？
          </h2>
          <Link
            href="/generate"
            className="mt-5 inline-block rounded-lg bg-yellow px-7 py-3.5 text-base font-extrabold text-ink no-underline shadow-[0_4px_0_0_var(--color-yellow-deep)] md:text-lg"
          >
            生成我的第一张鸡血壁纸
          </Link>
          <div className="mt-7 font-mono text-xs tracking-wide text-mute">
            🐾 由柯基 Mui 监修 · Made with ♥ in 重庆
          </div>
        </div>
      </Section>
    </main>
  );
}
