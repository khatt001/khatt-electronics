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

  function handleToggle() {
    if (limitReached) return;

    toggleCompare(item);
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={limitReached}
      aria-label={label}
      aria-pressed={isCompared}
      title={label}
      className={cn(
        "inline-flex size-10 shrink-0 items-center justify-center rounded-lg border bg-white text-neutral-700 shadow-sm transition",
        isCompared
          ? "border-emerald-200 bg-emerald-50 text-emerald-700 hover:border-emerald-300 hover:bg-emerald-100"
          : "border-neutral-200 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700",
        limitReached
          ? "cursor-not-allowed border-neutral-200 bg-neutral-100 text-neutral-400 opacity-60"
          : "",
      )}
    >
      <BarChart3
        className={cn("size-5 transition", isCompared ? "scale-105" : "")}
        aria-hidden="true"
      />
    </button>
  );
}
