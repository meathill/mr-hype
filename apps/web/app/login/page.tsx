'use client';

import { AppleLogo as AppleLogoIcon, WechatLogo as WechatLogoIcon } from '@phosphor-icons/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { type FormEvent, useState } from 'react';
import { Button } from '@/components/ui/button';
import { signIn, signUp } from '@/src/lib/auth-client';

type Mode = 'signin' | 'signup';

const INPUT_CLASS =
  'w-full rounded-lg border border-rule-strong bg-cream px-3.5 py-3.5 font-sans text-base text-ink outline-none focus:border-yellow-deep';

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      const result =
        mode === 'signin'
          ? await signIn.email({ email, password })
          : await signUp.email({
              email,
              password,
              name: name || email.split('@')[0] || '战斗中的你',
            });
      if (result.error) {
        setError(result.error.message ?? '出错了，再试一次');
      } else {
        router.push('/');
        router.refresh();
      }
    } catch {
      setError('网络出错了，再试一次');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col px-6 py-6">
      <div className="flex justify-end">
        <Link href="/" className="font-sans text-sm font-bold text-mute no-underline">
          先随便看看 →
        </Link>
      </div>

      <div className="mt-6 flex flex-col items-center text-center">
        <div className="overflow-hidden rounded-2xl border-2 border-ink bg-yellow-warm shadow-[0_4px_0_0_var(--color-ink)]">
          <Image src="/assets/mui-mark.png" alt="鸡血君" width={64} height={64} />
        </div>
        <h1 className="mt-5 font-display text-3xl font-extrabold leading-tight text-ink">
          {mode === 'signin' ? (
            <>
              先登录，
              <br />
              再开始战斗
            </>
          ) : (
            <>
              注册，
              <br />
              开始你的战役
            </>
          )}
        </h1>
        <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-soft">
          登录后，你的目标、历史壁纸和收藏都会留在这里，换设备也不丢。
        </p>
      </div>

      <div className="mt-6 flex gap-2 rounded-lg bg-paper p-1">
        {(['signin', 'signup'] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => {
              setMode(m);
              setError('');
            }}
            className={`flex-1 cursor-pointer rounded-md py-2.5 font-sans text-sm font-bold transition ${
              mode === m
                ? 'bg-yellow text-ink shadow-[0_2px_0_0_var(--color-ink)]'
                : 'bg-transparent text-mute'
            }`}
          >
            {m === 'signin' ? '登录' : '注册'}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3">
        {mode === 'signup' && (
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="昵称（可留空）"
            className={INPUT_CLASS}
          />
        )}
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="邮箱"
          autoComplete="email"
          className={INPUT_CLASS}
        />
        <input
          type="password"
          required
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="密码（至少 8 位）"
          autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
          className={INPUT_CLASS}
        />
        {error && <p className="text-sm font-semibold text-danger">{error}</p>}
        <Button type="submit" disabled={loading} className="mt-1 w-full">
          {loading ? '稍等…' : mode === 'signin' ? '登录' : '注册并开始'}
        </Button>
      </form>

      <div className="mt-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-rule" />
        <span className="text-xs text-mute">或用以下方式</span>
        <div className="h-px flex-1 bg-rule" />
      </div>
      <div className="mt-4 flex gap-2.5">
        <button
          type="button"
          disabled
          title="即将支持"
          className="flex flex-1 cursor-not-allowed items-center justify-center gap-2 rounded-lg border border-rule-strong bg-paper py-3 font-sans text-sm font-bold text-mute opacity-60"
        >
          <WechatLogoIcon size={18} weight="fill" /> 微信
        </button>
        <button
          type="button"
          disabled
          title="即将支持"
          className="flex flex-1 cursor-not-allowed items-center justify-center gap-2 rounded-lg border border-rule-strong bg-paper py-3 font-sans text-sm font-bold text-mute opacity-60"
        >
          <AppleLogoIcon size={18} weight="fill" /> Apple
        </button>
      </div>

      <p className="mt-6 text-center text-xs leading-relaxed text-mute">
        登录即代表你已阅读并同意
        <span className="font-bold text-yellow-deep">《用户协议》</span>与
        <span className="font-bold text-yellow-deep">《隐私政策》</span>
      </p>
    </main>
  );
}
