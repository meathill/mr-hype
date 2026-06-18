'use client';

import { toPng } from 'html-to-image';

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => setTimeout(() => reject(new Error('timeout')), ms)),
  ]);
}

/**
 * 把 DOM 节点截成 PNG dataURL。
 * 优先内联字体（最高保真）；若卡住/失败，退化为不内联（中文走系统字体）。
 */
export async function captureNodeToPng(node: HTMLElement): Promise<string> {
  try {
    return await withTimeout(toPng(node, { pixelRatio: 3, cacheBust: true }), 6000);
  } catch {
    // 字体内联卡住/失败时退化为不内联（中文走系统字体）；同样限时，避免无限等待
    return await withTimeout(
      toPng(node, { pixelRatio: 3, cacheBust: true, skipFonts: true }),
      6000,
    );
  }
}

/** 桌面端用 <a download> 触发下载（移动端 iOS 会被忽略，靠长按图片保存） */
export function triggerBrowserDownload(dataUrl: string, filename: string): void {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename;
  link.click();
}
