import { describe, expect, it } from 'vitest';
import { computeWallpaperLayout, getTemplateConfig, TEMPLATE_CONFIGS } from './templates';
import type { WallpaperProps } from './types';

const base: WallpaperProps = {
  templateId: 'paper',
  main: '第一行\n第二行',
  width: 270,
  height: 480,
};

describe('TEMPLATE_CONFIGS', () => {
  it('包含全部 8 套模板', () => {
    expect(Object.keys(TEMPLATE_CONFIGS)).toHaveLength(8);
  });
  it('未知模板回落到 paper', () => {
    // @ts-expect-error 故意传非法 id 测试兜底
    expect(getTemplateConfig('nope')).toBe(TEMPLATE_CONFIGS.paper);
  });
});

describe('computeWallpaperLayout', () => {
  it('按 \\n 拆分主文案为多行', () => {
    const layout = computeWallpaperLayout(base);
    expect(layout.lines).toEqual(['第一行', '第二行']);
  });

  it('main 为空时使用默认文案', () => {
    const layout = computeWallpaperLayout({ ...base, main: '' });
    expect(layout.lines.join('')).toContain('向旧版本自己的宣战');
  });

  it('尺寸基于高度相对单位 u=h/100', () => {
    const layout = computeWallpaperLayout(base); // paper mainSize 5.7, h 480 → 5.7*4.8=27.36
    expect(layout.mainLineStyle.fontSize).toBe('27.4px');
    expect(layout.rootStyle.backgroundColor).toBe('#f4ead2');
  });

  it('锁屏态：直角、隐藏胶带、隐藏大日期', () => {
    const lockLayout = computeWallpaperLayout({ ...base, templateId: 'calendar', lock: true });
    expect(lockLayout.lock).toBe(true);
    expect(lockLayout.rootStyle.borderRadius).toBe('0px');
    expect(lockLayout.showTape).toBe(false);
    expect(lockLayout.showBigDay).toBe(false);
  });

  it('非锁屏 paper 显示胶带', () => {
    expect(computeWallpaperLayout(base).showTape).toBe(true);
  });

  it('calendar 非锁屏：大日期 + 10 个进度点（7 个已完成）', () => {
    const layout = computeWallpaperLayout({ ...base, templateId: 'calendar' });
    expect(layout.showBigDay).toBe(true);
    expect(layout.showProgress).toBe(true);
    expect(layout.dots).toHaveLength(10);
    const filled = layout.dots.filter((d) => d.background === '#3a2e23');
    expect(filled).toHaveLength(7);
  });
});
