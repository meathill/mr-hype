'use client';

import { ArrowLeft as ArrowLeftIcon } from '@phosphor-icons/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type Platform = 'ios' | 'android';

const DATA: Record<Platform, { steps: string[]; tip: string }> = {
  ios: {
    steps: [
      '打开「设置」→「墙纸」，或在锁定屏幕长按进入编辑。',
      '点「添加新墙纸」，从相册里选中刚下载的这张图。',
      '调整好位置，点右上角「完成」，选「设定锁定屏幕」。',
    ],
    tip: '想每次抬手就看到？把它单独设给锁屏，别动桌面 —— 你看锁屏的次数远比桌面多。',
  },
  android: {
    steps: [
      '打开「相册 / 图库」，找到刚下载的壁纸。',
      '点右上角「⋮」菜单 →「设为」/「用作壁纸」。',
      '选「锁定屏幕壁纸」，调整后确认。',
    ],
    tip: '部分机型在「设置」→「壁纸与个性化」里设置，路径大同小异，认准「锁屏」。',
  },
};

function tabClass(selected: boolean) {
  return `flex-1 rounded-md py-2.5 text-sm font-bold text-ink ${
    selected
      ? 'border-2 border-ink bg-yellow shadow-[0_2px_0_0_var(--color-ink)]'
      : 'border border-rule-strong bg-paper'
  }`;
}

export default function HowToPage() {
  const router = useRouter();
  const [platform, setPlatform] = useState<Platform>('ios');
  const current = DATA[platform];

  return (
    <main className="mx-auto max-w-lg pb-10">
      <div className="flex items-center gap-3 px-6 pt-4 pb-1.5">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex size-9 shrink-0 items-center justify-center rounded-md border border-rule-strong bg-paper text-ink"
        >
          <ArrowLeftIcon size={18} />
        </button>
        <h1 className="text-xl font-extrabold text-ink">把它设成你的锁屏</h1>
      </div>

      <p className="px-6 pt-1.5 text-sm leading-relaxed text-ink-soft">
        保存好壁纸后，照下面三步走。建议设成<strong className="text-ink">锁屏</strong>
        而不是桌面 —— 你每天看锁屏的次数，远比桌面多。
      </p>

      <div className="flex gap-2 px-6 pt-4">
        <button
          type="button"
          onClick={() => setPlatform('ios')}
          className={tabClass(platform === 'ios')}
        >
          iPhone
        </button>
        <button
          type="button"
          onClick={() => setPlatform('android')}
          className={tabClass(platform === 'android')}
        >
          Android
        </button>
      </div>

      <div className="flex flex-col gap-3 px-6 pt-4">
        {current.steps.map((step, i) => (
          <div
            key={step}
            className="flex items-start gap-3.5 rounded-lg border border-rule-strong bg-paper p-3.5"
          >
            <div className="flex size-7 shrink-0 items-center justify-center rounded-md border-2 border-ink bg-yellow font-mono text-sm font-extrabold text-ink">
              {i + 1}
            </div>
            <div className="pt-0.5 text-sm leading-relaxed text-ink">{step}</div>
          </div>
        ))}
      </div>

      <div className="mx-6 mt-4 flex items-start gap-2.5 rounded-lg border border-corgi/50 bg-fluff p-3.5">
        <span>🐾</span>
        <div className="text-sm leading-relaxed text-ink-soft">{current.tip}</div>
      </div>
    </main>
  );
}
