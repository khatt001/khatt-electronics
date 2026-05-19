"use client";

import Link from "next/link";
import { BarChart3 } from "lucide-react";
import { useCompare } from "@/components/compare/compare-provider";

export function CompareNavLink() {
  const { count } = useCompare();

  return (
    <Link
      href="/compare"
      aria-label="Müqayisə"
      className="relative hidden size-10 items-center justify-center rounded-full text-neutral-700 transition hover:bg-neutral-100 hover:text-neutral-950 md:inline-flex"
    >
      <BarChart3 size={18} aria-hidden="true" />

      {count > 0 ? (
        <span className="absolute -right-0.5 -top-0.5 flex size-5 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-semibold text-white">
          {count > 9 ? "9+" : count}
        </span>
      ) : null}
    </Link>
  );
}