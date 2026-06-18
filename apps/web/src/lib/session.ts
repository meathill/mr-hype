import { headers } from 'next/headers';
import { getAuth } from '@/src/lib/auth';

/** 取当前登录会话（未登录返回 null）。在 Server Component / server action 中调用。 */
export async function getSession() {
  return getAuth().api.getSession({ headers: await headers() });
}
