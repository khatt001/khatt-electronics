"use client";

import { BarChart3 } from "lucide-react";
import { useCompare } from "@/components/compare/compare-provider";
import { cn } from "@/lib/utils";
import type { CompareItem } from "@/types/compare";

export type CompareButtonLocale = "az" | "en" | "ru";

const compareButtonTranslations = {
  az: {
    add: "Müqayisəyə əlavə et",
    remove: "Müqayisədən sil",
    limit: "Müqayisə limiti dolub",
  },
  en: {
    add: "Add to compare",
    remove: "Remove from compare",
    limit: "Compare limit reached",
  },
  ru: {
    add: "Добавить к сравнению",
    remove: "Удалить из сравнения",
    limit: "Лимит сравнения достигнут",
  },
} as const;

type CompareButtonProps = {
  item: CompareItem;
  locale?: CompareButtonLocale;
};

export function CompareButton({ item, locale = "az" }: CompareButtonProps) {
  const { items, toggleCompare, limit } = useCompare();
  const t = compareButtonTranslations[locale];

  const isCompared = items.some((compareItem) => compareItem.id === item.id);
  const limitReached = !isCompared && items.length >= limit;
  const label = limitReached ? t.limit : isCompared ? t.remove : t.add;

  return (
    <button
      type="button"
      onClick={() => toggleCompare(item)}
      disabled={limitReached}
      aria-label={label}
      title={label}
      className={cn(
        "inline-flex size-10 items-center justify-center rounded-full border border-white/70 bg-white/90 text-neutral-800 shadow-sm backdrop-blur transition hover:bg-white",
        isCompared ? "text-emerald-600" : "hover:text-emerald-600",
        limitReached ? "cursor-not-allowed opacity-50" : ""
      )}
    >
      <BarChart3 className="size-5" aria-hidden="true" />
    </button>
  );
}