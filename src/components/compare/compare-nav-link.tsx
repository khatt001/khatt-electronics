"use client";

import Link from "next/link";
import { BarChart3 } from "lucide-react";
import { useCompare } from "@/components/compare/compare-provider";

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

function getCompareHref(locale: CompareNavLocale) {
  if (locale === "az") {
    return "/compare";
  }

  return `/${locale}/compare`;
}

export function CompareNavLink({ locale = "az" }: CompareNavLinkProps) {
  const { items } = useCompare();
  const t = compareNavTranslations[locale];

  return (
    <Link
      href={getCompareHref(locale)}
      aria-label={t.ariaLabel}
      className="relative inline-flex size-10 items-center justify-center rounded-full text-neutral-800 transition hover:bg-neutral-100"
    >
      <BarChart3 size={21} aria-hidden="true" />

      {items.length > 0 ? (
        <span className="absolute -right-1 -top-1 flex min-w-5 items-center justify-center rounded-full bg-neutral-950 px-1.5 text-[11px] font-semibold text-white">
          {items.length}
        </span>
      ) : null}
    </Link>
  );
}