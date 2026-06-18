// 壁纸模板配置 + 尺寸布局算法 —— 框架无关
// 移植自 design/Wallpaper.dc.html 的 cfg() 与 renderVals()
import type {
  TemplateConfig,
  TemplateId,
  WallpaperLayout,
  WallpaperProps,
  WallpaperStyle,
} from './types';

export const SERIF_STACK = "'Fraunces', 'Songti SC', 'STSong', 'SimSun', serif";

/** 8 套模板的视觉配置 */
export const TEMPLATE_CONFIGS: Record<TemplateId, TemplateConfig> = {
  paper: {
    bgColor: '#f4ead2',
    bgImage: 'repeating-linear-gradient(transparent 0 22px, rgba(58,46,35,0.045) 22px 23px)',
    bgSize: 'auto',
    bgRepeat: 'repeat',
    ink: '#4a3c2c',
    inkSub: '#7a6a52',
    inkDay: '#a08a66',
    inkBrand: '#a08a66',
    mainSize: 5.7,
    mainWeight: 700,
    serif: true,
    mainLh: 1.55,
    letter: '0.01em',
    align: 'center',
    panel: 'plain',
    pad: 8,
    dark: false,
    showTape: true,
    accent: '#f3c574',
    subDashed: true,
  },
  black_minimal: {
    bgColor: '#0B0B0B',
    bgImage: 'none',
    ink: '#ffffff',
    inkSub: '#B8B8B8',
    inkDay: 'rgba(255,255,255,0.5)',
    inkBrand: 'rgba(255,255,255,0.42)',
    mainSize: 6.6,
    mainWeight: 800,
    serif: false,
    mainLh: 1.28,
    letter: '-0.01em',
    align: 'center',
    panel: 'plain',
    pad: 9,
    dark: true,
  },
  gym: {
    bgColor: '#17120c',
    bgImage: 'none',
    ink: '#ffffff',
    inkSub: '#f3c574',
    inkDay: '#e6c34a',
    inkBrand: 'rgba(255,255,255,0.5)',
    mainSize: 7.0,
    mainWeight: 900,
    serif: false,
    mainLh: 1.06,
    letter: '-0.015em',
    align: 'left',
    panel: 'plain',
    pad: 8,
    dark: true,
    showBar: true,
    accent: '#e6c34a',
  },
  calendar: {
    bgColor: '#fdfaf2',
    bgImage: 'radial-gradient(circle, rgba(58,46,35,0.05) 1px, transparent 1px)',
    bgSize: '18px 18px',
    bgRepeat: 'repeat',
    ink: '#3a2e23',
    inkSub: '#5a4938',
    inkDay: '#8a7660',
    inkBrand: '#8a7660',
    mainSize: 5.3,
    mainWeight: 700,
    serif: false,
    mainLh: 1.4,
    letter: '0',
    align: 'center',
    panel: 'plain',
    pad: 7,
    dark: false,
    showBigDay: true,
    showProgress: true,
    border: '2px solid #3a2e23',
    accent: '#e6c34a',
  },
  retro: {
    bgColor: '#c7ad7e',
    bgImage:
      'radial-gradient(rgba(42,32,22,0.12) 0.5px, transparent 0.7px), linear-gradient(158deg,#d6c096,#b89a66)',
    bgSize: '3px 3px, 100% 100%',
    bgRepeat: 'repeat, no-repeat',
    ink: '#2a2016',
    inkSub: '#5a4530',
    inkDay: '#5a4530',
    inkBrand: '#5a4530',
    mainSize: 5.7,
    mainWeight: 800,
    serif: true,
    mainLh: 1.3,
    letter: '0.02em',
    align: 'center',
    panel: 'frame',
    pad: 8,
    dark: false,
    accent: '#2a2016',
  },
  cyber: {
    bgColor: '#0a0b10',
    bgImage:
      'linear-gradient(rgba(255,215,102,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,215,102,0.06) 1px, transparent 1px)',
    bgSize: '26px 26px',
    bgRepeat: 'repeat',
    ink: '#ffd766',
    inkSub: '#ff9a6c',
    inkDay: '#9a7a3a',
    inkBrand: 'rgba(255,215,102,0.5)',
    mainSize: 6.1,
    mainWeight: 800,
    serif: false,
    mainLh: 1.3,
    letter: '0',
    align: 'center',
    panel: 'plain',
    pad: 8,
    dark: true,
    glow: true,
  },
  sunrise: {
    bgColor: '#fff6e4',
    bgImage: 'radial-gradient(ellipse 95% 75% at 50% 118%, #f2c87e 0%, #fbe6b6 42%, #fff7e8 100%)',
    bgSize: '100% 100%',
    bgRepeat: 'no-repeat',
    ink: '#3a2e23',
    inkSub: '#6a5640',
    inkDay: '#b3851c',
    inkBrand: '#b3851c',
    mainSize: 6.1,
    mainWeight: 800,
    serif: false,
    mainLh: 1.32,
    letter: '0',
    align: 'center',
    panel: 'plain',
    pad: 8,
    dark: false,
  },
  desk: {
    bgColor: '#e7dcc1',
    bgImage:
      'linear-gradient(rgba(58,46,35,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(58,46,35,0.05) 1px, transparent 1px)',
    bgSize: '20px 20px',
    bgRepeat: 'repeat',
    ink: '#3a2e23',
    inkSub: '#6a5640',
    inkDay: '#8a7660',
    inkBrand: '#8a7660',
    mainSize: 4.9,
    mainWeight: 700,
    serif: false,
    mainLh: 1.45,
    letter: '0',
    align: 'center',
    panel: 'note',
    pad: 7,
    dark: false,
    showClip: true,
    accent: '#f3c574',
  },
};

export function getTemplateConfig(id: TemplateId): TemplateConfig {
  return TEMPLATE_CONFIGS[id] ?? TEMPLATE_CONFIGS.paper;
}

const DEFAULT_MAIN = '今天这一步，\n是你向旧版本自己的宣战。';

/**
 * 根据模板与尺寸计算壁纸的全部样式 spec（纯函数，无 DOM）。
 * 所有尺寸基于高度的相对单位 u = h/100，因此任意 w/h 下都自适配。
 */
export function computeWallpaperLayout(props: WallpaperProps): WallpaperLayout {
  const w = Number(props.width) || 270;
  const h = Number(props.height) || 480;
  const u = h / 100;
  const px = (n: number) => `${(n * u).toFixed(1)}px`;
  const c = getTemplateConfig(props.templateId);
  const lock = !!props.lock;
  const fontFam = c.serif ? SERIF_STACK : 'var(--font-sans)';

  const main = props.main != null && props.main !== '' ? props.main : DEFAULT_MAIN;
  const lines = String(main).split('\n');
  const sub = props.sub || '';
  const dayNum = props.dayNum || '07';
  const dateText = props.dateText || '2026.06.16';
  const dayLabel = `DAY ${dayNum}   ·   ${dateText}`;

  const glow: WallpaperStyle = c.glow
    ? { textShadow: `0 0 ${px(1.8)} rgba(255,215,102,0.55), 0 0 ${px(3.6)} rgba(255,160,90,0.35)` }
    : {};
  const subGlow: WallpaperStyle = c.glow
    ? { textShadow: `0 0 ${px(1.6)} rgba(255,140,90,0.5)` }
    : {};

  const rootStyle: WallpaperStyle = {
    position: 'relative',
    width: `${w}px`,
    height: `${h}px`,
    borderRadius: lock ? '0px' : px(2.6),
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    boxSizing: 'border-box',
    padding: px(c.pad || 7),
    backgroundColor: c.bgColor,
    backgroundImage: c.bgImage || 'none',
    backgroundSize: c.bgSize || 'auto',
    backgroundRepeat: c.bgRepeat || 'no-repeat',
    backgroundPosition: 'center',
    color: c.ink,
    fontFamily: 'var(--font-sans)',
    ...(c.border ? { border: c.border } : {}),
  };

  const alignItems = c.align === 'left' ? 'flex-start' : 'center';
  let panelStyle: WallpaperStyle = {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems,
    gap: px(1),
  };
  if (c.panel === 'note') {
    panelStyle = {
      ...panelStyle,
      alignItems: 'center',
      alignSelf: 'center',
      background: c.accent || '#f3c574',
      padding: `${px(5)} ${px(5)}`,
      borderRadius: px(1.4),
      transform: 'rotate(-2.4deg)',
      boxShadow: `0 ${px(1.8)} ${px(4)} rgba(58,46,35,0.28)`,
      maxWidth: '86%',
    };
  } else if (c.panel === 'frame') {
    panelStyle = {
      ...panelStyle,
      alignItems: 'center',
      alignSelf: 'center',
      border: `1.5px solid ${c.accent}`,
      padding: `${px(5)} ${px(4.5)}`,
      boxShadow: `inset 0 0 0 ${px(0.5)} ${c.accent}`,
      maxWidth: '92%',
    };
  }

  const noteInk = c.panel === 'note' ? '#3a2e23' : c.ink;
  const mainLineStyle: WallpaperStyle = {
    fontFamily: fontFam,
    fontSize: px(c.mainSize),
    fontWeight: c.mainWeight,
    lineHeight: c.mainLh,
    letterSpacing: c.letter,
    color: noteInk,
    textAlign: c.align,
    margin: 0,
    ...glow,
  };
  const mainWrapStyle: WallpaperStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems,
    gap: px(0.4),
  };

  const hasSub = !!sub;
  const subStyle: WallpaperStyle = {
    marginTop: px(c.subDashed ? 3 : 2.4),
    fontSize: px(2.7),
    fontWeight: 500,
    lineHeight: 1.5,
    color: c.panel === 'note' ? '#6a5640' : c.inkSub,
    textAlign: c.align,
    maxWidth: '92%',
    ...(c.subDashed ? { borderTop: `1px dashed ${c.inkDay}`, paddingTop: px(2.4) } : {}),
    ...subGlow,
  };

  const dayStyle: WallpaperStyle = {
    fontFamily: 'var(--font-mono)',
    fontSize: px(2.5),
    fontWeight: 600,
    letterSpacing: '0.12em',
    color: c.inkDay,
    textAlign: c.align === 'left' ? 'left' : 'center',
    width: '100%',
  };
  const topStyle: WallpaperStyle = {
    display: 'flex',
    justifyContent: c.align === 'left' ? 'flex-start' : 'center',
  };

  const bigDayWrapStyle: WallpaperStyle = { display: 'flex', alignItems: 'flex-end', gap: px(2.4) };
  const bigDayNumStyle: WallpaperStyle = {
    fontFamily: SERIF_STACK,
    fontSize: px(15),
    fontWeight: 800,
    lineHeight: 0.86,
    color: c.ink,
    letterSpacing: '-0.02em',
  };
  const bigDayMetaStyle: WallpaperStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: px(0.6),
    paddingBottom: px(1),
  };
  const bigDayLabelStyle: WallpaperStyle = {
    fontFamily: 'var(--font-mono)',
    fontSize: px(2.4),
    fontWeight: 800,
    letterSpacing: '0.28em',
    color: '#3a2e23',
    background: c.accent || '#e6c34a',
    padding: `${px(0.5)} ${px(1.4)}`,
    borderRadius: px(0.6),
    display: 'inline-block',
    width: 'fit-content',
  };
  const bigDayDateStyle: WallpaperStyle = {
    fontFamily: 'var(--font-mono)',
    fontSize: px(2.4),
    fontWeight: 600,
    letterSpacing: '0.06em',
    color: c.inkDay,
  };

  const barStyle: WallpaperStyle = {
    width: px(13),
    height: px(1.1),
    background: c.accent || '#e6c34a',
    marginBottom: px(2.4),
    borderRadius: px(0.4),
  };

  const clipStyle: WallpaperStyle = {
    position: 'absolute',
    top: px(-2.6),
    left: '50%',
    width: px(3.2),
    height: px(6.4),
    transform: 'translateX(-50%) rotate(8deg)',
    border: '2px solid #9a8a6a',
    borderBottom: 'none',
    borderRadius: `${px(2)} ${px(2)} 0 0`,
    background: 'transparent',
  };

  const tapeStyle: WallpaperStyle = {
    position: 'absolute',
    top: px(4),
    left: '50%',
    transform: 'translateX(-50%) rotate(-3deg)',
    width: px(22),
    height: px(4.6),
    background: 'rgba(243,197,116,0.7)',
    borderRadius: px(0.6),
    zIndex: 2,
    boxShadow: 'inset 0 0 0 1px rgba(160,138,102,0.3)',
  };

  const dotBase: WallpaperStyle = { width: px(2.2), height: px(2.2), borderRadius: '50%' };
  const dots: WallpaperStyle[] = [];
  for (let i = 0; i < 10; i++) {
    dots.push({
      ...dotBase,
      background: i < 7 ? '#3a2e23' : 'transparent',
      border: i < 7 ? 'none' : '1.5px solid #c9b790',
    });
  }
  const dotsWrapStyle: WallpaperStyle = { display: 'flex', gap: px(1.4), justifyContent: 'center' };

  const brandLine = '🐾 鸡血君';
  const brandStyle: WallpaperStyle = {
    fontFamily: 'var(--font-mono)',
    fontSize: px(2.3),
    fontWeight: 600,
    letterSpacing: '0.12em',
    color: c.inkBrand,
    textAlign: 'center',
    width: '100%',
  };
  const bottomStyle: WallpaperStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: px(2.2),
    alignItems: 'center',
  };

  const lockTextColor = c.dark ? 'rgba(255,255,255,0.97)' : 'rgba(40,30,20,0.9)';
  const lockMuted = c.dark ? 'rgba(255,255,255,0.66)' : 'rgba(58,46,35,0.62)';
  const lockTopStyle: WallpaperStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: px(0.4),
    width: '100%',
  };
  const statusStyle: WallpaperStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    fontFamily: 'var(--font-mono)',
    fontSize: px(2.3),
    fontWeight: 600,
    color: lockMuted,
    marginBottom: px(2.4),
  };
  const statusRightStyle: WallpaperStyle = { letterSpacing: '0.04em' };
  const clockStyle: WallpaperStyle = {
    fontFamily: 'var(--font-sans)',
    fontSize: px(15),
    fontWeight: 600,
    lineHeight: 0.95,
    letterSpacing: '-0.02em',
    color: lockTextColor,
  };
  const lockDateStyle: WallpaperStyle = {
    fontFamily: 'var(--font-sans)',
    fontSize: px(3),
    fontWeight: 600,
    color: lockTextColor,
    marginTop: px(0.4),
  };
  const lockBarStyle: WallpaperStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: px(1.8),
    width: '100%',
  };
  const lockGlyphStyle: WallpaperStyle = {
    width: px(3.4),
    height: px(2.6),
    borderRadius: px(0.8),
    border: `2px solid ${lockMuted}`,
    position: 'relative',
    marginTop: px(1),
  };
  const lockHintStyle: WallpaperStyle = {
    fontFamily: 'var(--font-mono)',
    fontSize: px(2.2),
    fontWeight: 600,
    letterSpacing: '0.1em',
    color: lockMuted,
  };

  return {
    rootStyle,
    lock,
    notLock: !lock,
    lines,
    mainLineStyle,
    mainWrapStyle,
    panelStyle,
    hasSub,
    sub,
    subStyle,
    showTape: !!c.showTape && !lock,
    tapeStyle,
    showBar: !!c.showBar,
    barStyle,
    showClip: !!c.showClip,
    clipStyle,
    showBigDay: !!c.showBigDay && !lock,
    showDayLabel: !c.showBigDay && !lock,
    dayLabel,
    dayStyle,
    topStyle,
    bigDayWrapStyle,
    bigDayNumStyle,
    dayNum,
    bigDayMetaStyle,
    bigDayLabelStyle,
    dateText,
    bigDayDateStyle,
    showProgress: !!c.showProgress && !lock,
    dots,
    dotsWrapStyle,
    brandLine,
    brandStyle,
    bottomStyle,
    time: props.time || '9:41',
    dateLabel: props.dateLabel || '6月16日 星期二',
    lockTopStyle,
    statusStyle,
    statusRightStyle,
    clockStyle,
    lockDateStyle,
    lockBarStyle,
    lockGlyphStyle,
    lockHintStyle,
  };
}
