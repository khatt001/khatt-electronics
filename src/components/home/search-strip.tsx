"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { FormEvent, useState } from "react";
import { miniCategories } from "@/data/home";
import { homeTranslations } from "@/data/translations/home";
import { localizedPath, type Locale } from "@/lib/i18n";

type SearchStripProps = {
  locale?: Locale;
};

export function SearchStrip({ locale = "az" }: SearchStripProps) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const t = homeTranslations[locale];

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cleanSearch = search.trim();
    const productsPath = localizedPath("/products", locale);
    if (!cleanSearch) {
      router.push(productsPath);
      return;
    }
    router.push(`${productsPath}?search=${encodeURIComponent(cleanSearch)}`);
  }

  return (
    <section className="border-b border-black/10 bg-white">
      <div className="container-custom py-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <form onSubmit={handleSubmit} className="relative flex-1">
            <Search
              className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-neutral-400"
              aria-hidden="true"
            />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={t.searchPlaceholder}
              className="h-14 w-full rounded-2xl border border-neutral-200 bg-[#f6f6f4] pl-12 pr-32 text-sm outline-none transition focus:border-neutral-950"
            />

            <button
              type="submit"
              className="absolute right-2 top-1/2 hidden h-10 -translate-y-1/2 rounded-xl bg-neutral-950 px-5 text-sm font-semibold text-white transition hover:bg-neutral-800 sm:inline-flex sm:items-center"
            >
              {t.searchButton}
            </button>
          </form>

          <div className="grid grid-cols-3 gap-3 lg:w-[420px]">
            {miniCategories[locale].map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  // ACCESSIBILITY FIX: On mobile, <span> is hidden (hidden sm:inline)
                  // so the link only contains an icon — no discernible name for screen
                  // readers. aria-label provides the name regardless of viewport.
                  aria-label={item.title}
                  className="flex items-center justify-center gap-2 rounded-2xl border border-neutral-200 bg-white px-3 py-4 text-xs font-semibold text-neutral-700 transition hover:border-emerald-400 hover:bg-emerald-50 hover:text-neutral-950"
                >
                  <Icon className="size-4" aria-hidden="true" />
                  <span className="hidden sm:inline" aria-hidden="true">
                    {item.title}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}