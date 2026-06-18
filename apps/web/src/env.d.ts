// 补充 wrangler types 未覆盖的运行时变量（密钥放 .dev.vars / wrangler secret，不进 wrangler.jsonc）
declare global {
  interface CloudflareEnv {
    ANTHROPIC_API_KEY?: string;
    BETTER_AUTH_URL?: string;
  }
}

export {};
