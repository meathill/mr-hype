'use client';

import { DISLIKES, GOAL_TYPES, type GoalTypeChip, TONES, type ToneId } from '@mr-hype/shared';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { type SaveGoalInput, saveGoalAction } from '@/src/actions/data';

const LABEL = 'mb-2 block text-sm font-extrabold text-ink';
const FIELD =
  'w-full resize-none rounded-lg border border-rule-strong bg-cream px-3.5 py-3 font-sans text-base leading-relaxed text-ink outline-none focus:border-yellow-deep';

function chipClass(selected: boolean) {
  return `cursor-pointer rounded-full px-3.5 py-2 text-sm font-bold text-ink ${
    selected
      ? 'border-2 border-ink bg-yellow shadow-[0_2px_0_0_var(--color-ink)]'
      : 'border border-rule-strong bg-paper'
  }`;
}

export function GoalForm({
  initial,
  loggedIn,
}: {
  initial: SaveGoalInput | null;
  loggedIn: boolean;
}) {
  const router = useRouter();
  const [name, setName] = useState(initial?.name ?? '');
  const [type, setType] = useState<GoalTypeChip>(initial?.type ?? 'diet');
  const [description, setDescription] = useState(initial?.description ?? '');
  const [deadline, setDeadline] = useState(initial?.deadline ?? '');
  const [difficulty, setDifficulty] = useState(initial?.difficulty ?? '');
  const [dislikes, setDislikes] = useState<string[]>(initial?.dislikes ?? []);
  const [defaultTone, setDefaultTone] = useState<ToneId>(initial?.defaultTone ?? 'chuuni');
  const [toast, setToast] = useState('');
  const [saving, setSaving] = useState(false);

  function toggleDislike(item: string) {
    setDislikes((prev) => (prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item]));
  }

  async function handleSave() {
    if (!loggedIn) {
      router.push('/login');
      return;
    }
    setSaving(true);
    const res = await saveGoalAction({
      name: name || '我的战役',
      type,
      description,
      deadline,
      difficulty,
      dislikes,
      defaultTone,
    });
    setSaving(false);
    if (res.ok) {
      setToast('战役已保存。明天的鸡血会更懂你。');
      window.setTimeout(() => setToast(''), 2800);
    } else {
      router.push('/login');
    }
  }

  return (
    <main className="mx-auto max-w-lg pb-28">
      <div className="px-6 pt-4 pb-1.5">
        <h1 className="text-2xl font-extrabold text-ink">我的战役</h1>
        <p className="mt-0.5 text-sm text-mute">保存一个长期目标，每天生成的鸡血会更懂你。</p>
      </div>

      <div className="flex flex-col gap-5 px-6 pt-3">
        <div>
          <label className={LABEL} htmlFor="gname">
            目标名称
          </label>
          <input
            id="gname"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="例如：90 天减脂计划 / 考研上岸"
            className={FIELD}
          />
        </div>

        <div>
          <span className={LABEL}>目标类型</span>
          <div className="flex flex-wrap gap-2">
            {GOAL_TYPES.map((g) => (
              <button
                key={g.id}
                type="button"
                onClick={() => setType(g.id)}
                className={chipClass(type === g.id)}
              >
                {g.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className={LABEL} htmlFor="gdesc">
            目标描述
          </label>
          <textarea
            id="gdesc"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="例如：我想在 90 天内从 82kg 减到 75kg，并养成每周运动 4 次的习惯。"
            className={`${FIELD} min-h-[64px]`}
          />
        </div>

        <div>
          <label className={LABEL} htmlFor="gdeadline">
            截止日期 <span className="font-medium text-mute">可选</span>
          </label>
          <input
            id="gdeadline"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            placeholder="2026-09-30"
            className={`${FIELD} font-mono`}
          />
        </div>

        <div>
          <label className={LABEL} htmlFor="gdiff">
            当前最大的困难
          </label>
          <textarea
            id="gdiff"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            placeholder="例如：晚上容易吃夜宵，而且一累就想放弃。"
            className={`${FIELD} min-h-[56px]`}
          />
        </div>

        <div>
          <span className={LABEL}>我不喜欢的表达</span>
          <p className="-mt-1 mb-2.5 text-xs text-mute">鸡血君会避开这些，让文案更安全、更像你。</p>
          <div className="flex flex-wrap gap-2">
            {DISLIKES.map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => toggleDislike(d)}
                className={chipClass(dislikes.includes(d))}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        <div>
          <span className={LABEL}>默认语气</span>
          <div className="flex flex-wrap gap-2">
            {TONES.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setDefaultTone(t.id)}
                className={chipClass(defaultTone === t.id)}
              >
                {t.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-10 mx-auto max-w-lg bg-gradient-to-t from-cream from-70% to-transparent px-6 pt-4 pb-20 md:pb-5">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="press-ink w-full rounded-lg border-2 border-ink bg-yellow py-4 text-base font-extrabold text-ink disabled:opacity-70"
        >
          {saving ? '保存中…' : loggedIn ? '保存我的战役' : '登录后保存'}
        </button>
      </div>

      {toast && (
        <div className="fixed inset-x-6 bottom-28 z-40 mx-auto max-w-md rounded-lg bg-ink px-4 py-3.5 text-center text-sm font-semibold text-cream shadow-lg">
          {toast}
        </div>
      )}
    </main>
  );
}
