import { desc, eq } from 'drizzle-orm';
import { getDb } from '@/src/db';
import { favorite, generation, goal } from '@/src/db/schema';

/** 当前用户的长期战役（无则 null） */
export async function getUserGoal(userId: string) {
  const rows = await getDb().select().from(goal).where(eq(goal.userId, userId)).limit(1);
  return rows[0] ?? null;
}

/** 当前用户的收藏（最新在前） */
export async function getUserFavorites(userId: string) {
  return getDb()
    .select()
    .from(favorite)
    .where(eq(favorite.userId, userId))
    .orderBy(desc(favorite.createdAt));
}

/** 当前用户的生成历史 */
export async function getUserHistory(userId: string, limit = 9) {
  return getDb()
    .select()
    .from(generation)
    .where(eq(generation.userId, userId))
    .orderBy(desc(generation.createdAt))
    .limit(limit);
}

export interface UserStats {
  generated: number;
  downloaded: number;
  favorites: number;
  days: number;
}

/** 当前用户的统计（已生成/已下载/已收藏/累计天数） */
export async function getUserStats(userId: string): Promise<UserStats> {
  const db = getDb();
  const gens = await db.select().from(generation).where(eq(generation.userId, userId));
  const favs = await db.select().from(favorite).where(eq(favorite.userId, userId));
  const days = new Set(gens.map((g) => g.createdAt.toISOString().slice(0, 10))).size;
  return {
    generated: gens.length,
    downloaded: gens.filter((g) => g.downloaded).length,
    favorites: favs.length,
    days,
  };
}
