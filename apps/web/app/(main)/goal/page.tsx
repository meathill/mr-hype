import type { GoalTypeChip, ToneId } from '@mr-hype/shared';
import { GoalForm } from '@/components/goal/goal-form';
import type { SaveGoalInput } from '@/src/actions/data';
import { getUserGoal } from '@/src/db/queries';
import { getSession } from '@/src/lib/session';

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
