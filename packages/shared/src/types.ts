// 鸡血君跨端共享类型

/** 语气人格 id */
export type ToneId = 'gentle' | 'coach' | 'cold' | 'chuuni' | 'minimal';

/** 文案池/目标识别的目标类型（含兜底 generic） */
export type GoalType =
  | 'diet'
  | 'fit'
  | 'exam'
  | 'anti'
  | 'project'
  | 'save'
  | 'sleep'
  | 'mood'
  | 'generic';

/** 目标设置页的目标类型选项（与文案池的 GoalType 不完全一致） */
export type GoalTypeChip =
  | 'diet'
  | 'fit'
  | 'exam'
  | 'work'
  | 'project'
  | 'save'
  | 'habit'
  | 'custom';

/** 壁纸模板 id */
export type TemplateId =
  | 'paper'
  | 'black_minimal'
  | 'gym'
  | 'calendar'
  | 'retro'
  | 'cyber'
  | 'sunrise'
  | 'desk';

/** 壁纸尺寸 id */
export type SizeId = 'lock' | 'home' | 'social';

export interface Tone {
  id: ToneId;
  name: string;
  ex: string;
}

export interface GoalCard {
  id: Exclude<GoalType, 'generic'>;
  name: string;
  ex: string;
  seed: string;
}

export interface TemplateMeta {
  id: TemplateId;
  name: string;
  desc: string;
  fit: string;
  show: string;
  showSub: string;
}

export interface GoalTypeOption {
  id: GoalTypeChip;
  name: string;
}

export interface SizeOption {
  id: SizeId;
  name: string;
}

export interface CopyLine {
  main: string;
  sub: string;
}

/** 生成输入（mock 生成器与真 AI 共用） */
export interface GenerateInput {
  goalText: string;
  statusText?: string;
  tone: ToneId;
  savedGoalDesc?: string;
  savedGoalType?: GoalTypeChip;
  dislikes?: string[];
}

/** mock 生成器的结果 */
export interface GenerateResult {
  main: string;
  sub: string;
  goalType: GoalType;
}

/** 对外（API/PRD §12）的结构化结果 */
export interface AIResult {
  dayLabel: string;
  mainText: string;
  subText: string;
  tone: ToneId;
  goalType: GoalType;
  templateId: TemplateId;
}

/** 壁纸模板视觉配置（来自 Wallpaper.dc.html cfg） */
export interface TemplateConfig {
  bgColor: string;
  bgImage?: string;
  bgSize?: string;
  bgRepeat?: string;
  ink: string;
  inkSub: string;
  inkDay: string;
  inkBrand: string;
  mainSize: number;
  mainWeight: number;
  serif: boolean;
  mainLh: number;
  letter: string;
  align: 'left' | 'center';
  panel: 'plain' | 'note' | 'frame';
  pad: number;
  dark: boolean;
  showTape?: boolean;
  accent?: string;
  subDashed?: boolean;
  showBar?: boolean;
  showBigDay?: boolean;
  showProgress?: boolean;
  border?: string;
  glow?: boolean;
  showClip?: boolean;
}

/** 框架无关的样式对象（可直接作为 React 的 style 使用） */
export type WallpaperStyle = Record<string, string | number>;

export interface WallpaperProps {
  templateId: TemplateId;
  main: string;
  sub?: string;
  dayNum?: string;
  dateText?: string;
  lock?: boolean;
  time?: string;
  dateLabel?: string;
  width: number;
  height: number;
}

/** computeWallpaperLayout 的产物：与 Wallpaper.dc.html 模板的字段一一对应 */
export interface WallpaperLayout {
  rootStyle: WallpaperStyle;
  lock: boolean;
  notLock: boolean;

  lines: string[];
  mainLineStyle: WallpaperStyle;
  mainWrapStyle: WallpaperStyle;
  panelStyle: WallpaperStyle;

  hasSub: boolean;
  sub: string;
  subStyle: WallpaperStyle;

  showTape: boolean;
  tapeStyle: WallpaperStyle;
  showBar: boolean;
  barStyle: WallpaperStyle;
  showClip: boolean;
  clipStyle: WallpaperStyle;

  showBigDay: boolean;
  showDayLabel: boolean;
  dayLabel: string;
  dayStyle: WallpaperStyle;
  topStyle: WallpaperStyle;

  bigDayWrapStyle: WallpaperStyle;
  bigDayNumStyle: WallpaperStyle;
  dayNum: string;
  bigDayMetaStyle: WallpaperStyle;
  bigDayLabelStyle: WallpaperStyle;
  dateText: string;
  bigDayDateStyle: WallpaperStyle;

  showProgress: boolean;
  dots: WallpaperStyle[];
  dotsWrapStyle: WallpaperStyle;

  brandLine: string;
  brandStyle: WallpaperStyle;
  bottomStyle: WallpaperStyle;

  time: string;
  dateLabel: string;
  lockTopStyle: WallpaperStyle;
  statusStyle: WallpaperStyle;
  statusRightStyle: WallpaperStyle;
  clockStyle: WallpaperStyle;
  lockDateStyle: WallpaperStyle;
  lockBarStyle: WallpaperStyle;
  lockGlyphStyle: WallpaperStyle;
  lockHintStyle: WallpaperStyle;
}
