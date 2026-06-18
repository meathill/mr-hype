import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { nextCookies } from 'better-auth/next-js';
import { getDb, schema } from '@/src/db';
import { getEnv } from '@/src/lib/cf';

/** 按请求构建 BetterAuth 实例（DB 绑定来自 Cloudflare 运行时，故不能模块级单例） */
export function getAuth() {
  const db = getDb();
  return betterAuth({
    secret: getEnv().BETTER_AUTH_SECRET,
    database: drizzleAdapter(db, {
      provider: 'sqlite',
      schema: {
        user: schema.user,
        session: schema.session,
        account: schema.account,
        verification: schema.verification,
      },
    }),
    emailAndPassword: {
      enabled: true,
      // MVP 无邮件服务，暂不要求邮箱验证（后续接 Cloudflare Email 再开）
      requireEmailVerification: false,
    },
    plugins: [nextCookies()],
  });
}

export type Auth = ReturnType<typeof getAuth>;
