import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';

const VARIANT: Record<Variant, string> = {
  primary: 'bg-yellow text-ink border-2 border-ink press-ink',
  secondary: 'bg-paper text-ink border border-rule-strong',
  ghost: 'bg-transparent text-ink-soft border-none',
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: ReactNode;
}

/** 鸡血君 press 风格按钮（底部厚墨边的立体卡通感） */
export function Button({ variant = 'primary', className = '', children, ...props }: ButtonProps) {
  return (
    <button
      type="button"
      className={`cursor-pointer rounded-lg px-4 py-3.5 font-sans text-base font-extrabold transition disabled:cursor-not-allowed disabled:opacity-50 ${VARIANT[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
