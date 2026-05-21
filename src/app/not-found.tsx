"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, PackageSearch } from "lucide-react";
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
    <main className="min-h-screen bg-[#f6f6f4] pt-16 lg:pt-[8.25rem] xl:pt-[7.5rem]">
      <section className="px-5 py-20">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-neutral-200 bg-white p-8 text-center shadow-sm lg:p-12">
          <div className="mx-auto flex size-20 items-center justify-center rounded-[2rem] bg-neutral-950 text-white">
            <PackageSearch className="size-9" aria-hidden="true" />
          </div>

          <p className="mt-8 text-xs uppercase tracking-[0.28em] text-neutral-400">
            {t.eyebrow}
          </p>

          <h1 className="mt-4 text-4xl font-semibold leading-tight text-neutral-950 md:text-6xl">
            {t.title}
          </h1>

          <p className="mx-auto mt-5 max-w-xl leading-8 text-neutral-600">
            {t.description}
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href={localizedPath("/", locale)}
              className="inline-flex items-center justify-center rounded-full bg-neutral-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
            >
              <Home className="mr-2 size-4" aria-hidden="true" />
              {t.home}
            </Link>

            <Link
              href={localizedPath("/products", locale)}
              className="inline-flex items-center justify-center rounded-full border border-neutral-300 bg-white px-6 py-3 text-sm font-semibold text-neutral-950 transition hover:border-neutral-950"
            >
              {t.products}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}