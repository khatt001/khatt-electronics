"use client";

import { BarChart3 } from "lucide-react";
import { useCompare } from "@/components/compare/compare-provider";
import type { CompareItem } from "@/types/compare";
import { cn } from "@/lib/utils";

type CompareButtonProps = {
  item: CompareItem;
  className?: string;
};

export function CompareButton({ item, className }: CompareButtonProps) {
  const { isCompared, toggleCompare, count, limit } = useCompare();

  const active = isCompared(item.id);
  const limitReached = !active && count >= limit;

  return (
    <button
      type="button"
      onClick={() => toggleCompare(item)}
      disabled={limitReached}
      aria-label={active ? "Müqayisədən çıxar" : "Müqayisəyə əlavə et"}
      title={limitReached ? `Maksimum ${limit} məhsul müqayisə edilə bilər` : undefined}
      className={cn(
        "inline-flex size-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 transition hover:border-neutral-950 hover:text-neutral-950 disabled:cursor-not-allowed disabled:opacity-45",
        active && "border-blue-200 bg-blue-50 text-blue-700 hover:text-blue-700",
        className
      )}
    >
      <BarChart3
        className={cn("size-4", active && "fill-current")}
        aria-hidden="true"
      />
    </button>
  );
}