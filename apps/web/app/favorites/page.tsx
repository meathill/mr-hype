import { type TemplateId, templateName } from '@mr-hype/shared';
import { ArrowLeft as ArrowLeftIcon, Heart as HeartIcon } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';
import { FavoriteGrid, type FavoriteItem } from '@/components/favorites/favorite-grid';
import { getUserFavorites } from '@/src/db/queries';
import { getSession } from '@/src/lib/session';

export const dynamic = 'force-dynamic';

export default async function FavoritesPage() {
  const session = await getSession();
  const user = session?.user;
  const rows = user ? await getUserFavorites(user.id) : [];
  const items: FavoriteItem[] = rows.map((f) => ({
    id: f.id,
    templateId: f.templateId as TemplateId,
    main: f.main,
    sub: f.sub,
    dayNum: f.dayNum,
    dateText: f.dateText,
    tplName: templateName(f.templateId),
  }));

  return (
    <main className="mx-auto max-w-lg pb-8">
      <div className="flex items-center gap-3 px-6 pt-4 pb-2">
        <Link
          href="/me"
          prefetch={false}
          className="flex size-9 shrink-0 items-center justify-center rounded-md border border-rule-strong bg-paper text-ink no-underline"
        >
          <ArrowLeftIcon size={18} />
        </Link>
        <div>
          <div className="text-xl font-extrabold text-ink">我的收藏</div>
          <div className="text-xs text-mute">
            {items.length ? `共 ${items.length} 张` : '还没有收藏'}
          </div>
        </div>
      </div>

      {items.length > 0 ? (
        <FavoriteGrid items={items} />
      ) : (
        <div className="flex flex-col items-center gap-3 px-8 py-16 text-center">
          <HeartIcon size={40} className="text-rule-strong" />
          <div className="text-base font-extrabold text-ink">还没有收藏</div>
          <p className="max-w-[240px] text-sm leading-relaxed text-mute">
            在结果页点右上角的 ♥，把喜欢的壁纸存到这里，随时回来再下载。
          </p>
          <Link
            href="/generate"
            prefetch={false}
            className="press-ink mt-1 inline-block rounded-lg border-2 border-ink bg-yellow px-5 py-2.5 text-sm font-extrabold text-ink no-underline"
          >
            去生成一张
          </Link>
        </div>
      )}
    </main>
  );
}
