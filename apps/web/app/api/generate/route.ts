import { computeResult, type GenerateInput, type ToneId } from '@mr-hype/shared';
import { generateWithAI, hasAI } from '@/src/lib/ai';

interface GenerateBody {
  goalText?: string;
  statusText?: string;
  tone?: ToneId;
  savedGoalDesc?: string;
  dislikes?: string[];
  variant?: number;
}

// 注意：不要用 edge runtime（Cloudflare Workers + OpenNext 不支持）
export async function POST(request: Request): Promise<Response> {
  const body = (await request.json().catch(() => ({}))) as GenerateBody;
  const input: GenerateInput = {
    goalText: body.goalText ?? '',
    statusText: body.statusText,
    tone: body.tone ?? 'chuuni',
    savedGoalDesc: body.savedGoalDesc,
    dislikes: body.dislikes,
  };

  // 配了 ANTHROPIC_API_KEY 就走真 Claude；否则用本地精选文案池
  if (hasAI()) {
    const ai = await generateWithAI(input).catch(() => null);
    if (ai) return Response.json({ ...ai, goalType: computeResult(input, 0).goalType });
  }

  return Response.json(computeResult(input, body.variant ?? 0));
}
