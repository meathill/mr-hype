import { TEMPLATES } from '@mr-hype/shared';
import { Wallpaper } from '@/components/wallpaper';

// 临时首页：8 套模板画廊（视觉冒烟测试）。Phase 5 替换为正式落地页。
export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-7 py-12">
      <p className="eyebrow">每日精神燃料 · 设计系统冒烟测试</p>
      <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight text-ink">
        鸡血君 · 8 套壁纸模板
      </h1>
      <p className="mt-3 max-w-xl text-ink-soft leading-relaxed">
        同一句话，换个模板就是另一种气质。下面是 <code>@mr-hype/shared</code> 的{' '}
        <code>Wallpaper</code> 组件渲染的全部模板。
      </p>

      <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
        {TEMPLATES.map((tpl) => (
          <div key={tpl.id} className="flex flex-col items-center gap-3">
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
    </main>
  );
}
