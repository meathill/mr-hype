// 文案生成逻辑：关键词识别目标 + 精选文案池（mock 生成器），以及真 AI 的 prompt 构建
// 移植自 design/鸡血君.dc.html 的 detectGoal()/computeResult()
import { COPY, TONE_LINES, TONE_NAME } from './content';
import type { GenerateInput, GenerateResult, GoalType, ToneId } from './types';

/** savedGoal.type → 文案池 GoalType 的映射 */
const SAVED_TYPE_MAP: Record<string, GoalType> = {
  work: 'project',
  project: 'project',
  habit: 'anti',
  custom: 'generic',
};

/** 根据目标文本（+ 已保存战役）识别目标类型 */
export function detectGoal(
  input: Pick<GenerateInput, 'goalText' | 'savedGoalDesc' | 'savedGoalType'>,
): GoalType {
  const haystack = `${input.goalText || ''} ${input.savedGoalDesc || ''}`.toLowerCase();
  const has = (...keywords: string[]) => keywords.some((k) => haystack.includes(k));

  if (has('减肥', '减脂', '瘦', '体重', 'kg', '夜宵')) return 'diet';
  if (has('健身', '增肌', '训练', '撸铁', '练')) return 'fit';
  if (has('考', '背', '复习', '学习', '上岸', '刷题')) return 'exam';
  if (has('拖延', '拖', '懒')) return 'anti';
  if (has('项目', '产品', '创业', 'app', 'mvp', 'ship', '上线', '独立开发')) return 'project';
  if (has('存钱', '省', '攒')) return 'save';
  if (has('早睡', '早起', '睡')) return 'sleep';
  if (has('情绪', '累', '焦虑', '恢复', '难过')) return 'mood';

  if (input.savedGoalType) {
    return SAVED_TYPE_MAP[input.savedGoalType] ?? 'generic';
  }
  return 'generic';
}

/**
 * 从文案池里取第 idx 句（带语气代表句兜底）。
 * idx 递增即「换一句」，循环取用。
 */
export function computeResult(input: GenerateInput, idx = 0): GenerateResult {
  const goalType = detectGoal(input);
  const pool = [...(COPY[goalType] ?? COPY.generic), TONE_LINES[input.tone]];
  const index = ((idx % pool.length) + pool.length) % pool.length;
  const pick = pool[index] ?? pool[0] ?? { main: '', sub: '' };
  return { main: pick.main, sub: pick.sub || '', goalType };
}

/** 每个语气的写作风格提示（喂给真 AI） */
const TONE_STYLE: Record<ToneId, string> = {
  gentle: '温柔、接纳、给安全感，但不软弱',
  coach: '热血、有冲劲、像教练喊话，但不油腻',
  cold: '冷静、克制、直接，像并肩战友',
  chuuni: '燃、有仪式感、像向旧自己宣战，但不尴尬',
  minimal: '极简、克制到只剩动作，越短越好',
};

export interface BuiltPrompt {
  system: string;
  user: string;
}

/**
 * 构建真 AI 文案生成的 prompt（PRD §8 文案要求 + §14 安全边界）。
 * 要求模型只输出 JSON：{ "main": string, "sub": string }
 */
export function buildPrompt(input: GenerateInput): BuiltPrompt {
  const system = [
    '你是「鸡血君」，一个为用户生成每日打气文案的中文文案生成器。',
    '你的文案会被排版成手机锁屏壁纸，所以必须短、有力量、能在一瞥之间击中人。',
    '',
    '硬性要求：',
    '- 主文案 mainText：10～30 个汉字，可用一个换行 \\n 分成两行。',
    '- 副文案 subText：0～40 个汉字，可留空字符串。',
    '- 具体、短、有力量、与用户目标强相关。',
    '- 避免空泛鸡汤（如「你是最棒的」「坚持就是胜利」）、避免冒犯、羞辱、极端表达。',
    '',
    '安全边界：',
    '- 减肥/身材：可鼓励健康饮食、运动、规律作息；不得羞辱身材、不制造体重焦虑、不诱导自我惩罚或极端节食。',
    '- 学习/考试：鼓励专注与推进；不说「考不上就完了」之类制造极端焦虑。',
    '- 工作/创业：鼓励行动与完成小步；不鼓吹成功学、不鼓励牺牲健康。',
    '- 情绪：温柔支持、允许休息；不否认痛苦、不说教、不替代心理治疗。',
    '',
    '只输出一个 JSON 对象：{"main": string, "sub": string}，不要任何额外说明或 markdown。',
  ].join('\n');

  const parts: string[] = [];
  parts.push(`用户目标：${input.goalText || '（未填写，按通用打气处理）'}`);
  if (input.statusText) parts.push(`今天的状态：${input.statusText}`);
  if (input.savedGoalDesc) parts.push(`长期战役描述：${input.savedGoalDesc}`);
  parts.push(`想要的语气：${TONE_NAME[input.tone]}（${TONE_STYLE[input.tone]}）`);
  if (input.dislikes && input.dislikes.length > 0) {
    parts.push(`必须避开的表达：${input.dislikes.join('、')}`);
  }
  parts.push('请据此生成今天的文案。');

  return { system, user: parts.join('\n') };
}
