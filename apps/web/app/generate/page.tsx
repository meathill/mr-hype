'use client';

import { GOALS, LOADING_TEXTS, SIZES, TEMPLATES, TONES } from '@mr-hype/shared';
import { ArrowLeft as ArrowLeftIcon, Lightning as LightningIcon } from '@phosphor-icons/react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { Wallpaper } from '@/components/wallpaper';
import { useGenerateStore } from '@/src/lib/store';

const LABEL = 'mb-2 block text-sm font-extrabold text-ink';
const FIELD =
  'w-full resize-none rounded-lg border border-rule-strong bg-cream px-3.5 py-3 font-sans text-base leading-relaxed text-ink outline-none focus:border-yellow-deep';

function chipClass(selected: boolean) {
  return `shrink-0 cursor-pointer whitespace-nowrap rounded-full px-3.5 py-2 text-sm font-bold text-ink ${
    selected
      ? 'border-2 border-ink bg-yellow shadow-[0_2px_0_0_var(--color-ink)]'
      : 'border border-rule-strong bg-paper'
  }`;
}

function GenerateForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const store = useGenerateStore();
  const [loadingText, setLoadingText] = useState(LOADING_TEXTS[0]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: 仅在挂载时按 URL seed 预填一次
  useEffect(() => {
    const seed = searchParams.get('seed');
    if (seed && !store.goalText) store.setGoalText(seed);
  }, []);

  async function handleGenerate() {
    setLoadingText(
      LOADING_TEXTS[Math.floor(Math.random() * LOADING_TEXTS.length)] ?? LOADING_TEXTS[0],
    );
    const ok = await store.generate();
    if (ok) router.push('/result');
  }

  if (store.loading) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center gap-6 px-10 text-center">
        <div className="size-16 animate-[jx-spin_0.9s_linear_infinite] rounded-full border-4 border-paper-deep border-t-yellow-warm" />
        <div className="max-w-xs font-display text-xl font-bold leading-snug text-ink">
          {loadingText}
        </div>
        <div className="animate-[jx-pulse_1.4s_ease-in-out_infinite] font-mono text-xs tracking-[0.14em] text-mute">
          CHARGING…
        </div>
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-lg pb-28">
      <div className="flex items-center gap-3 px-6 pt-4 pb-4">
        <Link
          href="/"
          className="flex size-9 items-center justify-center rounded-md border border-rule-strong bg-paper text-ink no-underline"
        >
          <ArrowLeftIcon size={18} />
        </Link>
        <h1 className="text-xl font-extrabold text-ink">今天你想赢下哪一件事？</h1>
      </div>

      <div className="flex flex-col gap-6 px-6">
        <div>
          <label className={LABEL} htmlFor="goal">
            我的目标
          </label>
          <textarea
            id="goal"
            value={store.goalText}
            onChange={(e) => store.setGoalText(e.target.value)}
            placeholder="写下你的目标，越具体越好。例如：我想在 90 天内从 82kg 减到 75kg"
            className={`${FIELD} min-h-[72px]`}
          />
          <div className="no-scrollbar mt-2.5 flex gap-2 overflow-x-auto pb-0.5">
            {GOALS.map((goal) => (
              <button
                key={goal.id}
                type="button"
                onClick={() => store.setGoalText(goal.seed)}
                className={chipClass(false)}
              >
                {goal.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className={LABEL} htmlFor="status">
            今天的状态 <span className="font-medium text-mute">可选</span>
          </label>
          <textarea
            id="status"
            value={store.statusText}
            onChange={(e) => store.setStatusText(e.target.value)}
            placeholder="懒、累、焦虑、想放弃，都可以写。例如：最近有点懒，总是想拖延"
            className={`${FIELD} min-h-[56px]`}
          />
        </div>

        <div>
          <span className={LABEL}>想要的语气</span>
          <div className="flex flex-col gap-2">
            {TONES.map((tone) => {
              const selected = store.tone === tone.id;
              return (
                <button
                  key={tone.id}
                  type="button"
                  onClick={() => store.setTone(tone.id)}
                  className={`flex flex-col gap-1.5 rounded-lg p-3.5 text-left transition ${
                    selected
                      ? 'border-2 border-ink bg-fluff shadow-[0_3px_0_0_var(--color-ink)]'
                      : 'border border-rule-strong bg-paper'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-base font-extrabold text-ink">{tone.name}</span>
                    <span
                      className={`size-4.5 rounded-full ${
                        selected ? 'border-2 border-ink bg-yellow' : 'border-2 border-rule-strong'
                      }`}
                    />
                  </div>
                  <span className="text-sm leading-relaxed text-ink-soft">「{tone.ex}」</span>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <span className={LABEL}>视觉风格</span>
          <div className="no-scrollbar flex gap-3 overflow-x-auto pb-1">
            {TEMPLATES.map((tpl) => {
              const selected = store.templateId === tpl.id;
              return (
                <button
                  key={tpl.id}
                  type="button"
                  onClick={() => store.setTemplateId(tpl.id)}
                  className={`shrink-0 rounded-xl p-1.5 ${selected ? 'border-2 border-ink bg-fluff' : 'border-2 border-transparent'}`}
                >
                  <div className="overflow-hidden rounded-lg">
                    <Wallpaper templateId={tpl.id} main={tpl.show} sub="" width={92} height={163} />
                  </div>
                  <div className="mt-1.5 text-center text-xs font-bold text-ink">{tpl.name}</div>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <span className={LABEL}>壁纸尺寸</span>
          <div className="flex gap-2">
            {SIZES.map((size) => {
              const selected = store.size === size.id;
              return (
                <button
                  key={size.id}
                  type="button"
                  onClick={() => store.setSize(size.id)}
                  className={`flex-1 rounded-md px-2 py-2.5 text-sm font-bold text-ink ${
                    selected
                      ? 'border-2 border-ink bg-yellow shadow-[0_2px_0_0_var(--color-ink)]'
                      : 'border border-rule-strong bg-paper'
                  }`}
                >
                  {size.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-10 mx-auto max-w-lg bg-gradient-to-t from-cream from-70% to-transparent px-6 pt-4 pb-5">
        <button
          type="button"
          onClick={handleGenerate}
          className="press-ink flex w-full items-center justify-center gap-2 rounded-lg border-2 border-ink bg-yellow py-4 text-base font-extrabold text-ink"
        >
          <LightningIcon size={20} weight="fill" /> 生成今日鸡血
        </button>
      </div>
    </main>
  );
}

export default function GeneratePage() {
  return (
    <Suspense>
      <GenerateForm />
    </Suspense>
  );
}
