import { computeWallpaperLayout, type WallpaperProps, type WallpaperStyle } from '@mr-hype/shared';
import type { CSSProperties } from 'react';

const s = (style: WallpaperStyle): CSSProperties => style as CSSProperties;

/**
 * 壁纸渲染组件 —— 消费 @mr-hype/shared 的 computeWallpaperLayout()。
 * 纯展示、无状态，缩略图与全分辨率导出通用。结构与 design/Wallpaper.dc.html 一一对应。
 */
export function Wallpaper(props: WallpaperProps) {
  const l = computeWallpaperLayout(props);

  return (
    <div style={s(l.rootStyle)}>
      {l.showTape && <div style={s(l.tapeStyle)} />}

      {l.lock && (
        <div style={s(l.lockTopStyle)}>
          <div style={s(l.statusStyle)}>
            <span>5G</span>
            <span style={s(l.statusRightStyle)}>100%</span>
          </div>
          <div style={s(l.clockStyle)}>{l.time}</div>
          <div style={s(l.lockDateStyle)}>{l.dateLabel}</div>
        </div>
      )}

      {l.notLock && (
        <div style={s(l.topStyle)}>
          {l.showBigDay && (
            <div style={s(l.bigDayWrapStyle)}>
              <div style={s(l.bigDayNumStyle)}>{l.dayNum}</div>
              <div style={s(l.bigDayMetaStyle)}>
                <div style={s(l.bigDayLabelStyle)}>DAY</div>
                <div style={s(l.bigDayDateStyle)}>{l.dateText}</div>
              </div>
            </div>
          )}
          {l.showDayLabel && <div style={s(l.dayStyle)}>{l.dayLabel}</div>}
        </div>
      )}

      <div style={s(l.panelStyle)}>
        {l.showClip && <div style={s(l.clipStyle)} />}
        {l.showBar && <div style={s(l.barStyle)} />}
        <div style={s(l.mainWrapStyle)}>
          {l.lines.map((line, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: 文案行顺序固定，不会重排
            <div key={`line-${i}`} style={s(l.mainLineStyle)}>
              {line}
            </div>
          ))}
        </div>
        {l.hasSub && <div style={s(l.subStyle)}>{l.sub}</div>}
      </div>

      {l.lock && (
        <div style={s(l.lockBarStyle)}>
          <div style={s(l.lockGlyphStyle)}>🐾</div>
          <div style={s(l.lockHintStyle)}>{l.brandLine}</div>
        </div>
      )}

      {l.notLock && (
        <div style={s(l.bottomStyle)}>
          {l.showProgress && (
            <div style={s(l.dotsWrapStyle)}>
              {l.dots.map((dot, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: 固定 10 个进度点，不会重排
                <div key={`dot-${i}`} style={s(dot)} />
              ))}
            </div>
          )}
          <div style={s(l.brandStyle)}>{l.brandLine}</div>
        </div>
      )}
    </div>
  );
}
