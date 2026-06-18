import { buildPrompt, type GenerateInput } from '@mr-hype/shared';
import { getEnv } from '@/src/lib/cf';

const ANTHROPIC_MODEL = 'claude-sonnet-4-6';

/** 是否配置了真 AI（ANTHROPIC_API_KEY） */
export function hasAI(): boolean {
  try {
    return Boolean(getEnv().ANTHROPIC_API_KEY);
  } catch {
    return false;
  }
}

/** 用 Claude 生成文案；失败返回 null（调用方回落到本地文案池） */
export async function generateWithAI(
  input: GenerateInput,
): Promise<{ main: string; sub: string } | null> {
  const key = getEnv().ANTHROPIC_API_KEY;
  if (!key) return null;

  const { system, user } = buildPrompt(input);
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': key,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: ANTHROPIC_MODEL,
      max_tokens: 200,
      system,
      messages: [{ role: 'user', content: user }],
    }),
  });
  if (!res.ok) return null;

  const data = (await res.json()) as { content?: Array<{ text?: string }> };
  const text = data.content?.[0]?.text ?? '';
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) return null;
  try {
    const parsed = JSON.parse(match[0]) as { main?: string; sub?: string };
    if (parsed.main) return { main: parsed.main, sub: parsed.sub ?? '' };
  } catch {
    // 模型没返回纯 JSON，回落
  }
  return null;
}
