'use server';

import type { GoalTypeChip, TemplateId, ToneId } from '@mr-hype/shared';
import { and, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { getDb } from '@/src/db';
import { favorite, generation, goal } from '@/src/db/schema';
import { getSession } from '@/src/lib/session';

async function requireUserId(): Promise<string | null> {
  const session = await getSession();
  return session?.user?.id ?? null;
}

export interface SaveGoalInput {
  name: string;
  type: GoalTypeChip;
  description: string;
  deadline: string;
  difficulty: string;
  dislikes: string[];
  defaultTone: ToneId;
}

export async function saveGoalAction(input: SaveGoalInput): Promise<{ ok: boolean }> {
  const userId = await requireUserId();
  if (!userId) return { ok: false };
  const db = getDb();
  const existing = await db.select().from(goal).where(eq(goal.userId, userId)).limit(1);
  if (existing[0]) {
    await db
      .update(goal)
      .set({ ...input, updatedAt: new Date() })
      .where(eq(goal.userId, userId));
  } else {
    await db.insert(goal).values({ id: crypto.randomUUID(), userId, ...input });
  }
  revalidatePath('/me');
  revalidatePath('/goal');
  return { ok: true };
}

export interface FavoriteInput {
  templateId: TemplateId;
  main: string;
  sub: string;
  dayNum: string;
  dateText: string;
}

export async function toggleFavoriteAction(
  input: FavoriteInput,
): Promise<{ ok: boolean; faved: boolean }> {
  const userId = await requireUserId();
  if (!userId) return { ok: false, faved: false };
  const db = getDb();
  const existing = await db
    .select()
    .from(favorite)
    .where(
      and(
        eq(favorite.userId, userId),
        eq(favorite.templateId, input.templateId),
        eq(favorite.main, input.main),
      ),
    )
    .limit(1);
  if (existing[0]) {
    await db.delete(favorite).where(eq(favorite.id, existing[0].id));
    revalidatePath('/favorites');
    revalidatePath('/me');
    return { ok: true, faved: false };
  }
  await db.insert(favorite).values({ id: crypto.randomUUID(), userId, ...input });
  revalidatePath('/favorites');
  revalidatePath('/me');
  return { ok: true, faved: true };
}

export async function removeFavoriteAction(id: string): Promise<{ ok: boolean }> {
  const userId = await requireUserId();
  if (!userId) return { ok: false };
  await getDb()
    .delete(favorite)
    .where(and(eq(favorite.id, id), eq(favorite.userId, userId)));
  revalidatePath('/favorites');
  revalidatePath('/me');
  return { ok: true };
}

export interface RecordGenerationInput {
  templateId: TemplateId;
  main: string;
  sub: string;
  tone: ToneId;
  goalType: string;
  dayNum: string;
  dateText: string;
}

export async function recordGenerationAction(
  input: RecordGenerationInput,
): Promise<{ ok: boolean }> {
  const userId = await requireUserId();
  if (!userId) return { ok: false };
  await getDb()
    .insert(generation)
    .values({ id: crypto.randomUUID(), userId, ...input, downloaded: true });
  revalidatePath('/me');
  return { ok: true };
}
