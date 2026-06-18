// 鸡血君内容模型 —— 唯一内容来源（web/mobile 共用）
// 移植自 design/鸡血君.dc.html 的 DATA()
import type {
  CopyLine,
  GoalCard,
  GoalType,
  GoalTypeOption,
  SizeOption,
  TemplateMeta,
  Tone,
  ToneId,
} from './types';

export const PRODUCT_NAME = '鸡血君';
export const BRAND_LINE = '🐾 鸡血君';

export const TONES: Tone[] = [
  { id: 'gentle', name: '温柔鼓励', ex: '慢一点也没关系，但今天不要消失。' },
  { id: 'coach', name: '热血教练', ex: '别和懒惰讲道理，今天先赢一次。' },
  { id: 'cold', name: '冷酷战友', ex: '你不需要被理解，你需要完成。' },
  { id: 'chuuni', name: '中二燃', ex: '今天这一步，是你向旧版本自己的宣战。' },
  { id: 'minimal', name: '极简冷酷', ex: '别想。开始。' },
];

export const GOALS: GoalCard[] = [
  {
    id: 'diet',
    name: '减肥',
    ex: '你不是在少吃，是在夺回选择权。',
    seed: '我想在 90 天内从 82kg 减到 75kg',
  },
  {
    id: 'fit',
    name: '健身',
    ex: '今天这组不是训练，是你对懒惰的反击。',
    seed: '我想恢复每周训练 4 次，增肌减脂',
  },
  {
    id: 'exam',
    name: '考试',
    ex: '你背下的每一页，都在把未来往你这边拉。',
    seed: '我想考上理想的学校，每天高效复习',
  },
  {
    id: 'anti',
    name: '戒拖延',
    ex: '别等状态，先开始，状态会追上来。',
    seed: '我想戒掉拖延，每天先开始做事',
  },
  {
    id: 'project',
    name: '做项目',
    ex: '产品不会自己完成，今天推进一寸也算赢。',
    seed: '我想在 30 天内完成第一个产品 MVP',
  },
  {
    id: 'save',
    name: '存钱',
    ex: '省下的不是钱，是你以后的选择权。',
    seed: '我想每月存下三分之一收入',
  },
  {
    id: 'sleep',
    name: '早睡早起',
    ex: '手机可以放下，明天的状态放不下。',
    seed: '我想每天 12 点前睡，早上 7 点起',
  },
  {
    id: 'mood',
    name: '情绪恢复',
    ex: '今天不用满血，只要别消失就很好。',
    seed: '我最近有点累，想慢慢恢复状态',
  },
];

export const TEMPLATES: TemplateMeta[] = [
  {
    id: 'paper',
    name: '日式便签',
    desc: '温暖纸张，柔和文字，手账感',
    fit: '温柔鼓励 · 情绪恢复',
    show: '今天不用满血，\n只要别消失，就已经很好。',
    showSub: '慢一点，但别停。',
  },
  {
    id: 'black_minimal',
    name: '黑底极简',
    desc: '黑色背景，大号白字，留白多',
    fit: '冷酷 · 专注 · 戒拖延',
    show: '别想。\n开始。',
    showSub: '',
  },
  {
    id: 'gym',
    name: '健身房标语',
    desc: '强对比，大字号，硬朗排版',
    fit: '减脂 · 健身 · 早起',
    show: '今天这组不是训练，\n是你对懒惰的反击。',
    showSub: '',
  },
  {
    id: 'calendar',
    name: '日历打卡',
    desc: '日期、DAY 数字、任务感',
    fit: '长期目标 · 考试 · 习惯',
    show: '你现在背下的每一页，\n都在把未来往你这边拉。',
    showSub: '',
  },
  {
    id: 'retro',
    name: '复古海报',
    desc: '复古纹理，海报式标题',
    fit: '中二燃 · 创业 · 冲刺',
    show: '今天这一步，\n是你向旧版本自己的宣战。',
    showSub: '',
  },
  {
    id: 'cyber',
    name: '赛博霓虹',
    desc: '暗色背景，霓虹光效，科技感',
    fit: '程序员 · 创业 · 夜间',
    show: '没人会替你 ship，\n今天你来。',
    showSub: '',
  },
  {
    id: 'sunrise',
    name: '清晨阳光',
    desc: '明亮、干净、正向',
    fit: '早起 · 学习 · 恢复',
    show: '今晚早睡，\n是给明天的自己留力气。',
    showSub: '',
  },
  {
    id: 'desk',
    name: '学习桌便签',
    desc: '书桌、纸条、便利贴感觉',
    fit: '考试 · 阅读 · 写作',
    show: '别等状态，\n先开始，状态会追上来。',
    showSub: '',
  },
];

export const GOAL_TYPES: GoalTypeOption[] = [
  { id: 'diet', name: '减肥' },
  { id: 'fit', name: '健身' },
  { id: 'exam', name: '考试' },
  { id: 'work', name: '工作' },
  { id: 'project', name: '创业' },
  { id: 'save', name: '存钱' },
  { id: 'habit', name: '习惯养成' },
  { id: 'custom', name: '自定义' },
];

export const DISLIKES: string[] = [
  '不要羞辱我',
  '不要太油腻',
  '不要太鸡汤',
  '不要太夸张',
  '不要提体重焦虑',
];

export const SIZES: SizeOption[] = [
  { id: 'lock', name: '手机锁屏' },
  { id: 'home', name: '手机桌面' },
  { id: 'social', name: '社交分享图' },
];

/** 各目标类型的精选文案池 */
export const COPY: Record<GoalType, CopyLine[]> = {
  diet: [
    { main: '你不是在少吃，\n你是在夺回选择权。', sub: '今天赢下一次，就够了。' },
    { main: '奶茶不会让你更轻，\n但拒绝它的你会。', sub: '' },
    { main: '体重是结果，\n今天你管的是选择。', sub: '把注意力放回这一餐。' },
  ],
  fit: [
    { main: '今天这组不是训练，\n是你对懒惰的反击。', sub: '练完，你就赢了今天。' },
    { main: '身体不会记得借口，\n只会记得你练过。', sub: '' },
    { main: '最后一下最难，\n也只有它在塑形。', sub: '再来一个。' },
  ],
  exam: [
    { main: '你现在背下的每一页，\n都在把未来往你这边拉。', sub: '坐下，翻开，开始。' },
    { main: '不是在熬时间，\n是在把名字写进名单。', sub: '' },
    { main: '今天多坐三十分钟，\n考场上就少慌三十分钟。', sub: '' },
  ],
  anti: [
    { main: '别等状态。\n先开始，状态会追上来。', sub: '今天只欠你十分钟。' },
    { main: '别跟拖延谈判，\n先做十分钟。', sub: '' },
    { main: '你不是没时间，\n你只是还没把自己排进日程。', sub: '先做十分钟，剩下的交给惯性。' },
  ],
  project: [
    { main: '产品不会自己完成。\n今天推进一寸，也算赢。', sub: '提交一次，今天就没白过。' },
    { main: '想清楚是奢侈，\n先做出来才是路。', sub: '' },
    { main: '没人会替你 ship，\n今天你来。', sub: '' },
  ],
  save: [
    { main: '这笔不花，\n是给未来的自己转账。', sub: '' },
    { main: '省下的不是钱，\n是你以后的选择权。', sub: '' },
  ],
  sleep: [
    { main: '今晚早睡，\n是给明天的自己留力气。', sub: '' },
    { main: '手机可以放下，\n明天的状态放不下。', sub: '' },
  ],
  mood: [
    { main: '今天不用满血。\n只要别消失，就已经很好。', sub: '慢一点，但别停。' },
    { main: '允许自己慢，\n但别骗自己说放弃。', sub: '' },
  ],
  generic: [
    { main: '今天这一步，\n是你向旧版本自己的宣战。', sub: '旧的你，到此为止。' },
    { main: '别想。\n开始。', sub: '' },
    { main: '今天别跟拖延谈判，\n先做十分钟。', sub: '' },
  ],
};

/** 各语气的代表句（作为文案池的补充候选） */
export const TONE_LINES: Record<ToneId, CopyLine> = {
  gentle: { main: '慢一点也没关系，\n但今天不要消失。', sub: '' },
  coach: { main: '别和懒惰讲道理，\n今天先赢一次。', sub: '' },
  cold: { main: '你不需要被理解，\n你需要完成。', sub: '' },
  chuuni: { main: '今天这一步，\n是你向旧版本自己的宣战。', sub: '旧的你，到此为止。' },
  minimal: { main: '别想。\n开始。', sub: '' },
};

/** 生成中的情绪化 loading 文案 */
export const LOADING_TEXTS: string[] = [
  '正在提炼你的今日战斗宣言……',
  '鸡血君正在把目标压缩成一句狠话……',
  '今天这张壁纸，正在加载能量……',
];

export const TONE_NAME: Record<ToneId, string> = {
  gentle: '温柔鼓励',
  coach: '热血教练',
  cold: '冷酷战友',
  chuuni: '中二燃',
  minimal: '极简冷酷',
};

export function toneName(id: ToneId): string {
  return TONE_NAME[id] ?? '';
}

export function templateName(id: string): string {
  return TEMPLATES.find((t) => t.id === id)?.name ?? '';
}
