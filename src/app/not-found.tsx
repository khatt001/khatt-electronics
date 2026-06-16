"use client";

import Link from "next/link";
import { Home, PackageSearch } from "lucide-react";
import { usePathname } from "next/navigation";

import {
  getLocaleFromPathname,
  localizedPath,
  type Locale,
} from "@/lib/i18n";

const translations: Record<
  Locale,
  {
    eyebrow: string;
    title: string;
    description: string;
    home: string;
    products: string;
  }
> = {
  az: {
    eyebrow: "404",
    title: "Səhifə tapılmadı",
    description:
      "Axtardığınız səhifə silinmiş, ünvanı dəyişmiş və ya müvəqqəti olaraq əlçatan olmaya bilər.",
    home: "Ana səhifə",
    products: "Məhsullara bax",
  },
  en: {
    eyebrow: "404",
    title: "Page not found",
    description:
      "The page you are looking for may have been removed, renamed, or temporarily unavailable.",
    home: "Home page",
    products: "View products",
  },
  ru: {
    eyebrow: "404",
    title: "Страница не найдена",
    description:
      "Страница, которую вы ищете, могла быть удалена, переименована или временно недоступна.",
    home: "Главная",
    products: "Смотреть товары",
  },
};

export default function NotFound() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const t = translations[locale];

  return (
    <div className="min-h-screen bg-[#f5f6f8]">
      <section className="px-5 py-12 md:py-16 lg:py-20">
        <div className="mx-auto max-w-3xl rounded-2xl border border-neutral-200 bg-white p-7 text-center shadow-sm md:p-10 lg:p-12">
          <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-neutral-950 text-white md:size-20">
            <PackageSearch
              className="size-8 md:size-9"
              aria-hidden="true"
            />
          </div>

          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
            {t.eyebrow}
          </p>

          <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-neutral-950 md:text-4xl lg:text-5xl">
            {t.title}
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-neutral-600 md:text-base">
            {t.description}
          </p>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href={localizedPath("/", locale)}
              className="inline-flex min-h-12 items-center justify-center rounded-lg bg-neutral-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              <Home
                className="mr-2 size-4"
                aria-hidden="true"
              />
              {t.home}
            </Link>

            <Link
              href={localizedPath(
                "/products",
                locale,
              )}
              className="inline-flex min-h-12 items-center justify-center rounded-lg border border-neutral-300 bg-white px-5 py-3 text-sm font-semibold text-neutral-950 transition hover:border-emerald-600 hover:bg-emerald-50 hover:text-emerald-700"
            >
              {t.products}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}