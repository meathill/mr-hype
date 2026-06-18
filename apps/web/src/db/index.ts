import { drizzle } from 'drizzle-orm/d1';
import { getEnv } from '@/src/lib/cf';
import * as schema from './schema';

/** 取本次请求的 Drizzle D1 实例 */
export function getDb() {
  return drizzle(getEnv().DB, { schema });
}

export type Db = ReturnType<typeof getDb>;
export { schema };
