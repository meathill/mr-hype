'use client';

import { useRouter } from 'next/navigation';
import { signOut } from '@/src/lib/auth-client';

export function LogoutButton() {
  const router = useRouter();
  async function handleLogout() {
    await signOut();
    router.refresh();
  }
  return (
    <button
      type="button"
      onClick={handleLogout}
      className="w-full cursor-pointer px-4 py-3.5 text-left font-sans text-base font-bold text-mute"
    >
      退出登录
    </button>
  );
}
