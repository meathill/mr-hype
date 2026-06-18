'use client';

import {
  type GenerateResult,
  type SizeId,
  TEMPLATES,
  type TemplateId,
  type ToneId,
} from '@mr-hype/shared';
import { create } from 'zustand';

interface GeneratePayload {
  goalText: string;
  statusText?: string;
  tone: ToneId;
  variant?: number;
}

async function fetchCopy(payload: GeneratePayload): Promise<GenerateResult> {
  const res = await fetch('/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('生成失败');
  return (await res.json()) as GenerateResult;
}

interface GenerateState {
  goalText: string;
  statusText: string;
  tone: ToneId;
  templateId: TemplateId;
  size: SizeId;
  result: GenerateResult | null;
  copyIdx: number;
  regenLeft: number;
  loading: boolean;

  setGoalText: (value: string) => void;
  setStatusText: (value: string) => void;
  setTone: (value: ToneId) => void;
  setTemplateId: (value: TemplateId) => void;
  setSize: (value: SizeId) => void;

  /** 生成今日鸡血；成功返回 true（含情绪化最小时长） */
  generate: () => Promise<boolean>;
  /** 换一句（消耗一次 regen 额度） */
  regen: () => Promise<void>;
  nextTemplate: () => void;
  reset: () => void;
}

export const useGenerateStore = create<GenerateState>((set, get) => ({
  goalText: '',
  statusText: '',
  tone: 'chuuni',
  templateId: 'paper',
  size: 'lock',
  result: null,
  copyIdx: 0,
  regenLeft: 3,
  loading: false,

  setGoalText: (value) => set({ goalText: value }),
  setStatusText: (value) => set({ statusText: value }),
  setTone: (value) => set({ tone: value }),
  setTemplateId: (value) => set({ templateId: value }),
  setSize: (value) => set({ size: value }),

  generate: async () => {
    const { goalText, statusText, tone } = get();
    set({ loading: true });
    try {
      const [result] = await Promise.all([
        fetchCopy({ goalText, statusText, tone, variant: 0 }),
        new Promise((resolve) => setTimeout(resolve, 1400)),
      ]);
      set({ result, copyIdx: 0, regenLeft: 3, loading: false });
      return true;
    } catch {
      set({ loading: false });
      return false;
    }
  },

  regen: async () => {
    const { regenLeft, copyIdx, goalText, statusText, tone } = get();
    if (regenLeft <= 0) return;
    const variant = copyIdx + 1;
    const result = await fetchCopy({ goalText, statusText, tone, variant });
    set({ result, copyIdx: variant, regenLeft: regenLeft - 1 });
  },

  nextTemplate: () => {
    const index = TEMPLATES.findIndex((t) => t.id === get().templateId);
    const next = TEMPLATES[(index + 1) % TEMPLATES.length];
    if (next) set({ templateId: next.id });
  },

  reset: () =>
    set({ goalText: '', statusText: '', result: null, copyIdx: 0, regenLeft: 3, loading: false }),
}));
