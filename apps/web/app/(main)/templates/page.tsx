'use client';

import { TEMPLATES } from '@mr-hype/shared';
import { useRouter } from 'next/navigation';
import { Wallpaper } from '@/components/wallpaper';
import { useGenerateStore } from '@/src/lib/store';

export default function TemplatesPage() {
  const router = useRouter();
  const { templateId, setTemplateId } = useGenerateStore();

  function pick(id: (typeof TEMPLATES)[number]['id']) {
    setTemplateId(id);
    router.push('/generate');
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-6">
      <h1 className="text-2xl font-extrabold text-ink">选一套你喜欢的风格</h1>
      <p className="mt-1 text-sm text-mute">
        同一句话，换个模板就是另一种气质。点选后回生成页即可使用。
      </p>

      <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {TEMPLATES.map((tpl) => {
          const selected = templateId === tpl.id;
          return (
            <button
              key={tpl.id}
              type="button"
              onClick={() => pick(tpl.id)}
              className="flex flex-col gap-2 text-left"
            >
              <div
                className={`overflow-hidden rounded-xl ${
                  selected
                    ? 'border-2 border-ink shadow-[0_4px_0_0_var(--color-ink)]'
                    : 'border border-rule-strong shadow-md'
                }`}
              >
                <Wallpaper
                  templateId={tpl.id}
                  main={tpl.show}
                  sub={tpl.showSub}
                  width={180}
                  height={320}
                />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-extrabold text-ink">{tpl.name}</span>
                  {selected && (
                    <span className="rounded-full bg-yellow px-1.5 py-0.5 font-mono text-[10px] font-bold text-ink">
                      已选
                    </span>
                  )}
                </div>
                <div className="mt-0.5 text-xs leading-snug text-mute">{tpl.desc}</div>
                <div className="mt-1 font-mono text-[11px] text-yellow-deep">{tpl.fit}</div>
              </div>
            </button>
          );
        })}
      </div>
    </main>
  );
}
