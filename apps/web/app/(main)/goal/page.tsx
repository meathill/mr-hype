import type { GoalTypeChip, ToneId } from '@mr-hype/shared';
import { GoalForm } from '@/components/goal/goal-form';
import type { SaveGoalInput } from '@/src/actions/data';
import { getUserGoal } from '@/src/db/queries';
import { getSession } from '@/src/lib/session';

// 按用户/会话渲染，禁止预渲染（否则 build 时 getCloudflareContext 无请求上下文）
export const dynamic = 'force-dynamic';

export default async function GoalPage() {
  const session = await getSession();
  const userId = session?.user?.id;
  const saved = userId ? await getUserGoal(userId) : null;

  const initial: SaveGoalInput | null = saved
    ? {
        name: saved.name,
        type: saved.type as GoalTypeChip,
        description: saved.description,
        deadline: saved.deadline ?? '',
        difficulty: saved.difficulty,
        dislikes: saved.dislikes,
        defaultTone: saved.defaultTone as ToneId,
      }
    : null;

  return <GoalForm initial={initial} loggedIn={Boolean(userId)} />;
}
