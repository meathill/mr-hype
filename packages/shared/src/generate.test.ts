import { describe, expect, it } from 'vitest';
import { COPY, TONE_LINES } from './content';
import { computeResult, detectGoal } from './generate';
import type { GenerateInput } from './types';

const base: GenerateInput = { goalText: '', tone: 'chuuni' };

describe('detectGoal', () => {
  it('从关键词识别各目标类型', () => {
    expect(detectGoal({ goalText: '我想在 90 天内从 82kg 减到 75kg' })).toBe('diet');
    expect(detectGoal({ goalText: '我想增肌，每周撸铁四次' })).toBe('fit');
    expect(detectGoal({ goalText: '考研上岸，每天复习' })).toBe('exam');
    expect(detectGoal({ goalText: '我想戒掉拖延' })).toBe('anti');
    expect(detectGoal({ goalText: '30 天内完成产品 MVP' })).toBe('project');
    expect(detectGoal({ goalText: '每月存钱三分之一' })).toBe('save');
    expect(detectGoal({ goalText: '每天早睡早起' })).toBe('sleep');
    expect(detectGoal({ goalText: '最近很焦虑，想恢复状态' })).toBe('mood');
  });

  it('大小写无关（app/MVP/ship）', () => {
    expect(detectGoal({ goalText: '独立开发我的 App' })).toBe('project');
    expect(detectGoal({ goalText: '今天要 SHIP 上线' })).toBe('project');
  });

  it('无关键词时回落到已保存战役类型', () => {
    expect(detectGoal({ goalText: '随便写点什么', savedGoalType: 'work' })).toBe('project');
    expect(detectGoal({ goalText: '随便写点什么', savedGoalType: 'habit' })).toBe('anti');
    expect(detectGoal({ goalText: '随便写点什么', savedGoalType: 'custom' })).toBe('generic');
  });

  it('完全无信息时返回 generic', () => {
    expect(detectGoal({ goalText: '' })).toBe('generic');
    expect(detectGoal({ goalText: 'xyz' })).toBe('generic');
  });

  it('也会参考已保存战役描述', () => {
    expect(detectGoal({ goalText: '', savedGoalDesc: '90 天减脂计划' })).toBe('diet');
  });
});

describe('computeResult', () => {
  it('idx=0 取目标文案池第一句', () => {
    const r = computeResult({ ...base, goalText: '减肥', tone: 'coach' }, 0);
    expect(r.goalType).toBe('diet');
    expect(r.main).toBe(COPY.diet[0]?.main);
    expect(r.sub).toBe(COPY.diet[0]?.sub);
  });

  it('idx 在「文案池 + 语气代表句」之间循环（换一句）', () => {
    const input: GenerateInput = { ...base, goalText: '减肥', tone: 'minimal' };
    const poolLen = COPY.diet.length + 1; // +1 语气代表句
    const first = computeResult(input, 0);
    const wrapped = computeResult(input, poolLen);
    expect(wrapped.main).toBe(first.main);

    // 池尾是该语气的代表句
    const last = computeResult(input, poolLen - 1);
    expect(last.main).toBe(TONE_LINES.minimal.main);
  });

  it('空目标走 generic 文案池', () => {
    const r = computeResult({ ...base, goalText: '' }, 0);
    expect(r.goalType).toBe('generic');
    expect(r.main).toBe(COPY.generic[0]?.main);
  });
});
