"use client";

import Link from "next/link";
import { BarChart3 } from "lucide-react";

import { useCompare } from "@/components/compare/compare-provider";
import { localizedPath } from "@/lib/i18n";

type CompareNavLocale = "az" | "en" | "ru";

const compareNavTranslations = {
  az: {
    ariaLabel: "Müqayisəyə keç",
  },
  en: {
    ariaLabel: "Go to compare",
  },
  ru: {
    ariaLabel: "Перейти к сравнению",
  },
} as const;

type CompareNavLinkProps = {
  locale?: CompareNavLocale;
};

export function CompareNavLink({ locale = "az" }: CompareNavLinkProps) {
  const { items } = useCompare();
  const t = compareNavTranslations[locale];

  const visibleCount = items.length > 99 ? "99+" : items.length;

  return (
    <Link
      href={localizedPath("/compare", locale)}
      aria-label={t.ariaLabel}
      className="relative inline-flex size-10 shrink-0 items-center justify-center rounded-lg text-neutral-800 transition hover:bg-emerald-50 hover:text-emerald-700"
    >
      <BarChart3 className="size-[21px]" aria-hidden="true" />

      {items.length > 0 ? (
        <span className="absolute -right-1 -top-1 flex min-h-5 min-w-5 items-center justify-center rounded-md bg-neutral-950 px-1 text-[10px] font-semibold leading-none text-white shadow-sm">
          {visibleCount}
        </span>
      ) : null}
    </Link>
  );
}
