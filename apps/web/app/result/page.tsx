'use client';

import { templateName, toneName } from '@mr-hype/shared';
import {
  ArrowLeft as ArrowLeftIcon,
  X as CloseIcon,
  DownloadSimple as DownloadIcon,
  Heart as HeartIcon,
} from '@phosphor-icons/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Wallpaper } from '@/components/wallpaper';
import { recordGenerationAction, toggleFavoriteAction } from '@/src/actions/data';
import { useSession } from '@/src/lib/auth-client';
import { captureNodeToPng, triggerBrowserDownload } from '@/src/lib/download';
import { useGenerateStore } from '@/src/lib/store';

const DAY_NUM = '07';
const DATE_TEXT = '2026.06.16';

export default function ResultPage() {
  const router = useRouter();
  const store = useGenerateStore();
  const exportRef = useRef<HTMLDivElement>(null);
  const [downloaded, setDownloaded] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [working, setWorking] = useState(false);
  const [toast, setToast] = useState('');
  const { data: session } = useSession();
  const loggedIn = Boolean(session?.user);
  const [faved, setFaved] = useState(false);

  useEffect(() => {
    if (!store.result) router.replace('/generate');
  }, [store.result, router]);

  function showToast(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(''), 2800);
  }

  async function handleDownload() {
    if (!exportRef.current || working) return;
    setWorking(true);
    try {
      const dataUrl = await captureNodeToPng(exportRef.current);
      setImageUrl(dataUrl);
      setDownloaded(true);
      const r = store.result;
      if (loggedIn && r) {
        void recordGenerationAction({
          templateId: store.templateId,
          main: r.main,
          sub: r.sub,
          tone: store.tone,
          goalType: r.goalType,
          dayNum: DAY_NUM,
          dateText: DATE_TEXT,
        });
      }
    } catch (error) {
      console.error('[download]', error);
      showToast('导出失败了，再试一次。');
    } finally {
      setWorking(false);
    }
  }

  async function handleFavorite() {
    const r = store.result;
    if (!r) return;
    if (!loggedIn) {
      showToast('登录后可把喜欢的壁纸收藏到「我的」。');
      return;
    }
    const res = await toggleFavoriteAction({
      templateId: store.templateId,
      main: r.main,
      sub: r.sub,
      dayNum: DAY_NUM,
      dateText: DATE_TEXT,
    });
    if (res.ok) {
      setFaved(res.faved);
      showToast(res.faved ? '已收藏。在「我的 → 我的收藏」随时再下载。' : '已取消收藏。');
    }
  }

  const result = store.result;
  if (!result) return null;
  const filename = `鸡血君-${store.templateId}-${DATE_TEXT}.png`;

  return (
    <main className="mx-auto max-w-lg pb-8">
      <div className="flex items-center gap-3 px-6 pt-4 pb-1.5">
        <Link
          href="/generate"
          className="flex size-9 shrink-0 items-center justify-center rounded-md border border-rule-strong bg-paper text-ink no-underline"
        >
          <ArrowLeftIcon size={18} />
        </Link>
        <h1 className="flex-1 text-xl font-extrabold text-ink">这是你的今日鸡血</h1>
        <button
          type="button"
          onClick={handleFavorite}
          aria-label="收藏"
          className={`flex size-9 items-center justify-center rounded-md border ${
            faved
              ? 'border-tongue bg-tongue/10 text-tongue'
              : 'border-rule-strong bg-paper text-mute'
          }`}
        >
          <HeartIcon size={18} weight={faved ? 'fill' : 'regular'} />
        </button>
      </div>

      {/* 预览：锁屏机框 */}
      <div className="flex justify-center px-6 pt-3.5 pb-2">
        <div className="rounded-[38px] bg-[#15110b] p-2 shadow-lg">
          <div ref={exportRef} className="overflow-hidden rounded-[31px]">
            <Wallpaper
              templateId={store.templateId}
              main={result.main}
              sub={result.sub}
              dayNum={DAY_NUM}
              dateText={DATE_TEXT}
              lock
              width={264}
              height={552}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-2 px-6 pt-1 pb-3.5">
        <span className="rounded-full bg-fluff px-3 py-1.5 font-mono text-xs font-bold tracking-wide text-yellow-deep">
          {toneName(store.tone)}
        </span>
        <span className="rounded-full bg-paper-deep px-3 py-1.5 font-mono text-xs font-bold tracking-wide text-ink-soft">
          {templateName(store.templateId)}
        </span>
      </div>

      <div className="flex flex-col gap-2.5 px-6">
        <button
          type="button"
          onClick={handleDownload}
          disabled={working}
          className="press-ink flex w-full items-center justify-center gap-2 rounded-lg border-2 border-ink bg-yellow py-4 text-base font-extrabold text-ink disabled:opacity-70"
        >
          <DownloadIcon size={20} weight="bold" /> {working ? '正在生成…' : '下载壁纸'}
        </button>
        <div className="flex gap-2">
          <button
            type="button"
            disabled={store.regenLeft <= 0}
            onClick={() => store.regen()}
            className="flex-1 rounded-lg border border-rule-strong bg-paper px-1.5 py-3 text-sm font-bold text-ink disabled:bg-paper-deep disabled:text-mute"
          >
            换一句 · 剩 {store.regenLeft}
          </button>
          <button
            type="button"
            onClick={() => store.nextTemplate()}
            className="flex-1 rounded-lg border border-rule-strong bg-paper px-1.5 py-3 text-sm font-bold text-ink"
          >
            换模板
          </button>
          <button
            type="button"
            onClick={() => {
              navigator.clipboard?.writeText(window.location.href).catch(() => {});
              showToast('已复制分享链接，同款壁纸可发给朋友。');
            }}
            className="flex-1 rounded-lg border border-rule-strong bg-paper px-1.5 py-3 text-sm font-bold text-ink"
          >
            分享同款
          </button>
        </div>
      </div>

      {downloaded && (
        <div className="mx-6 mt-4 flex flex-col gap-1 rounded-lg border border-success bg-success-bg p-3.5">
          <div className="text-sm font-extrabold text-success">✓ 壁纸已生成</div>
          <div className="text-sm leading-relaxed text-ink-soft">
            手机上长按图片即可存进相册，再设成锁屏。让今天每一次点亮屏幕，都把你拉回目标。
          </div>
          <Link
            href="/how-to-set-wallpaper"
            className="mt-0.5 self-start text-sm font-bold text-yellow-deep underline underline-offset-2"
          >
            如何设置为手机壁纸？ →
          </Link>
        </div>
      )}

      <div className="mx-6 mt-4.5 rounded-lg border border-dashed border-rule-strong bg-fluff p-3.5 text-center">
        <div className="text-sm font-extrabold text-ink">明天再来 🐾</div>
        <div className="mt-0.5 text-sm leading-relaxed text-mute">
          鸡血君明天会根据你的状态，再生成一张新的。今天先赢下这一件事。
        </div>
      </div>

      {/* 保存弹层：手机长按存图，电脑点下载 */}
      {imageUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <button
            type="button"
            aria-label="关闭"
            className="absolute inset-0 bg-ink/70"
            onClick={() => setImageUrl(null)}
          />
          <div className="relative flex w-full max-w-xs flex-col items-center gap-3 rounded-2xl bg-cream p-5">
            {/* biome-ignore lint/performance/noImgElement: 运行时生成的 dataURL，next/image 无法处理 */}
            <img
              src={imageUrl}
              alt="今日鸡血壁纸"
              className="w-44 rounded-xl border border-rule-strong"
            />
            <p className="text-center text-sm leading-relaxed text-ink-soft">
              手机：<strong className="text-ink">长按上图</strong> →「存储图像」。电脑：点下面下载。
            </p>
            <button
              type="button"
              onClick={() => triggerBrowserDownload(imageUrl, filename)}
              className="press-ink w-full rounded-lg border-2 border-ink bg-yellow py-3 text-sm font-extrabold text-ink"
            >
              下载到本地
            </button>
            <button
              type="button"
              onClick={() => setImageUrl(null)}
              className="flex items-center gap-1 text-sm font-bold text-mute"
            >
              <CloseIcon size={14} /> 关闭
            </button>
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed inset-x-6 bottom-24 z-40 mx-auto max-w-md rounded-lg bg-ink px-4 py-3.5 text-center text-sm font-semibold text-cream shadow-lg">
          {toast}
        </div>
      )}
    </main>
  );
}
