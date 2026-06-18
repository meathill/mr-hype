'use client';

import type { TemplateId } from '@mr-hype/shared';
import { Heart as HeartIcon } from '@phosphor-icons/react';
import { useState } from 'react';
import { Wallpaper } from '@/components/wallpaper';
import { removeFavoriteAction } from '@/src/actions/data';

export interface FavoriteItem {
  id: string;
  templateId: TemplateId;
  main: string;
  sub: string;
  dayNum: string;
  dateText: string;
  tplName: string;
}

export function FavoriteGrid({ items: initial }: { items: FavoriteItem[] }) {
  const [items, setItems] = useState(initial);

  async function remove(id: string) {
    setItems((prev) => prev.filter((i) => i.id !== id));
    await removeFavoriteAction(id);
  }

  return (
    <div className="grid grid-cols-2 gap-3.5 px-6 pt-3">
      {items.map((item) => (
        <div key={item.id} className="flex flex-col gap-2">
          <div className="overflow-hidden rounded-xl border border-rule-strong shadow-md">
            <Wallpaper
              templateId={item.templateId}
              main={item.main}
              sub={item.sub}
              dayNum={item.dayNum}
              dateText={item.dateText}
              width={160}
              height={284}
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-ink">{item.tplName}</span>
            <button
              type="button"
              aria-label="取消收藏"
              onClick={() => remove(item.id)}
              className="text-tongue"
            >
              <HeartIcon size={16} weight="fill" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
