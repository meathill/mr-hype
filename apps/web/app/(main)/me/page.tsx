import { templateName } from '@mr-hype/shared';
import {
  CaretRight as CaretRightIcon,
  DeviceMobile as DeviceMobileIcon,
  Heart as HeartIcon,
  PawPrint as PawPrintIcon,
} from '@phosphor-icons/react/dist/ssr';
import Image from 'next/image';
import Link from 'next/link';
import { LogoutButton } from '@/components/me/logout-button';
import { Wallpaper } from '@/components/wallpaper';
import { getUserGoal, getUserHistory, getUserStats } from '@/src/db/queries';
import { getSession } from '@/src/lib/session';

function StatCard({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex-1 rounded-lg border border-rule-strong bg-paper px-2 py-3 text-center">
      <div className="font-display text-2xl font-extrabold text-ink">{value}</div>
      <div className="mt-0.5 text-[11px] text-mute">{label}</div>
    </div>
  );
}

export default async function MePage() {
  const session = await getSession();
  const user = session?.user;

  if (!user) {
    return (
      <main className="mx-auto max-w-lg px-6 pt-5">
        <div className="rounded-2xl border-2 border-ink bg-cream p-6 text-center shadow-[0_4px_0_0_var(--color-ink)]">
          <span className="mx-auto block w-fit overflow-hidden rounded-2xl border-2 border-ink bg-corgi">
            <Image src="/assets/mui-mascot.png" alt="柯基 Mui" width={60} height={60} />
          </span>
          <div className="mt-3.5 text-lg font-extrabold text-ink">登录后查看你的战斗记录</div>
          <p className="mt-1.5 text-sm leading-relaxed text-mute">
            目标、历史壁纸和收藏都会留在这里，换设备也不丢。
          </p>
          <Link
            href="/login"
            className="press-ink mt-4 inline-block w-full rounded-lg border-2 border-ink bg-yellow py-3 text-sm font-extrabold text-ink no-underline"
          >
            登录 / 注册
          </Link>
        </div>
      </main>
    );
  }

  const [stats, goal, history] = await Promise.all([
    getUserStats(user.id),
    getUserGoal(user.id),
    getUserHistory(user.id),
  ]);
  const since = `${user.createdAt.getMonth() + 1}月${user.createdAt.getDate()}日`;

  return (
    <main className="mx-auto max-w-lg pb-6">
      <div className="flex items-center gap-3.5 px-6 pt-3 pb-4">
        <span className="overflow-hidden rounded-2xl border-2 border-ink bg-corgi shadow-[0_3px_0_0_var(--color-ink)]">
          <Image src="/assets/mui-mascot.png" alt="" width={56} height={56} />
        </span>
        <div>
          <div className="text-lg font-extrabold text-ink">{user.name}</div>
          <div className="mt-1 flex items-center gap-2">
            <span className="rounded-full bg-fluff px-2.5 py-0.5 font-mono text-xs font-bold text-yellow-deep">
              累计 {stats.days} 天
            </span>
            <span className="font-mono text-xs text-mute">{since} 加入</span>
          </div>
        </div>
      </div>

      <div className="flex gap-2.5 px-6">
        <StatCard value={stats.generated} label="已生成" />
        <StatCard value={stats.downloaded} label="已下载" />
        <StatCard value={stats.favorites} label="已收藏" />
      </div>

      <div className="px-6 pt-4">
        {goal ? (
          <div className="rounded-xl border-2 border-ink bg-cream p-4 shadow-[0_3px_0_0_var(--color-ink)]">
            <div className="eyebrow">当前战役</div>
            <div className="mt-1.5 text-lg font-extrabold text-ink">{goal.name}</div>
            <div className="mt-1 text-sm leading-relaxed text-ink-soft">
              {goal.description || '（还没有写描述）'}
            </div>
            <Link
              href="/goal"
              className="mt-3.5 block w-full rounded-lg border border-rule-strong bg-paper py-2.5 text-center text-sm font-bold text-ink no-underline"
            >
              编辑战役
            </Link>
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-rule-strong bg-paper p-5 text-center">
            <div className="text-sm font-extrabold text-ink">还没有保存战役</div>
            <p className="mt-1 text-sm text-mute">设一个长期目标，让每天的鸡血都对准它。</p>
            <Link
              href="/goal"
              className="press-ink mt-3.5 inline-block rounded-lg border-2 border-ink bg-yellow px-5 py-2.5 text-sm font-extrabold text-ink no-underline"
            >
              设置我的战役
            </Link>
          </div>
        )}
      </div>

      <div className="px-6 pt-4">
        <div className="overflow-hidden rounded-xl border border-rule-strong bg-paper">
          <Link
            href="/favorites"
            className="flex items-center gap-3 border-b border-rule px-4 py-3.5 no-underline"
          >
            <HeartIcon size={18} className="text-tongue" />
            <span className="flex-1 text-base font-bold text-ink">我的收藏</span>
            <span className="font-mono text-sm text-mute">{stats.favorites}</span>
            <CaretRightIcon size={16} className="text-mute" />
          </Link>
          <Link
            href="/how-to-set-wallpaper"
            className="flex items-center gap-3 border-b border-rule px-4 py-3.5 no-underline"
          >
            <DeviceMobileIcon size={18} className="text-ink" />
            <span className="flex-1 text-base font-bold text-ink">怎么设成手机壁纸</span>
            <CaretRightIcon size={16} className="text-mute" />
          </Link>
          <Link
            href="/about"
            className="flex items-center gap-3 border-b border-rule px-4 py-3.5 no-underline"
          >
            <PawPrintIcon size={18} className="text-ink" />
            <span className="flex-1 text-base font-bold text-ink">关于鸡血君</span>
            <CaretRightIcon size={16} className="text-mute" />
          </Link>
          <LogoutButton />
        </div>
      </div>

      {history.length > 0 && (
        <div className="px-6 pt-5">
          <div className="mb-3 text-base font-extrabold text-ink">历史壁纸</div>
          <div className="grid grid-cols-3 gap-2.5">
            {history.map((h) => (
              <div
                key={h.id}
                className="overflow-hidden rounded-xl border border-rule-strong shadow-sm"
              >
                <Wallpaper
                  templateId={h.templateId as Parameters<typeof Wallpaper>[0]['templateId']}
                  main={h.main}
                  sub=""
                  dayNum={h.dayNum}
                  dateText={h.dateText}
                  width={108}
                  height={192}
                />
                <div className="truncate bg-paper px-2 py-1 text-center text-[10px] text-mute">
                  {templateName(h.templateId)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
