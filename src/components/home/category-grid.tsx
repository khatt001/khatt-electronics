import Link from "next/link";
import {
  ArrowRight,
  Boxes,
  Camera,
  DoorOpen,
  Flame,
  Network,
  ShieldCheck,
  Siren,
} from "lucide-react";

import { Container } from "@/components/layout/container";
import { homeTranslations } from "@/data/translations/home";
import { localizedPath, type Locale } from "@/lib/i18n";
import { getCatalogCategories } from "@/services/categories";

type CategoryGridProps = {
  locale?: Locale;
};

const categoryIcons = [
  Camera,
  Flame,
  DoorOpen,
  Siren,
  Network,
  ShieldCheck,
  Boxes,
];

export async function CategoryGrid({ locale = "az" }: CategoryGridProps) {
  const categories = await getCatalogCategories(locale);
  const visibleCategories = categories.slice(0, 10);
  const t = homeTranslations[locale];

  if (visibleCategories.length === 0) {
    return null;
  }

  return (
    <section className="bg-[#f5f6f8] py-7 md:py-10">
      <Container>
        <div className="mb-5 flex items-end justify-between gap-5">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-neutral-950 md:text-3xl">
              Populyar kateqoriyalar
            </h2>

            <div className="mt-4 h-0.5 w-32 bg-emerald-500" />
          </div>

          <Link
            href={localizedPath("/products", locale)}
            className="hidden items-center text-sm font-medium text-neutral-600 transition hover:text-neutral-950 sm:inline-flex"
          >
            {t.categoriesViewAll}
            <ArrowRight className="ml-2 size-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
            {visibleCategories.map((category, index) => {
              const Icon = categoryIcons[index % categoryIcons.length];

              return (
                <Link
                  key={category.id}
                  href={localizedPath(`/category/${category.slug}`, locale)}
                  aria-label={`${category.name} — ${t.categoryViewButton}`}
                  className="group relative flex min-h-[190px] flex-col items-center justify-center border-b border-r border-neutral-200 px-4 py-6 text-center transition duration-300 hover:bg-neutral-50"
                >
                  <div className="relative flex h-24 w-full items-center justify-center">
                    <div className="absolute size-20 rounded-full bg-neutral-100 transition duration-300 group-hover:scale-110 group-hover:bg-emerald-50" />

                    <Icon
                      className="relative size-12 text-neutral-700 transition duration-300 group-hover:scale-110 group-hover:text-emerald-600"
                      strokeWidth={1.35}
                      aria-hidden="true"
                    />
                  </div>

                  <h3 className="mt-4 line-clamp-2 min-h-10 text-sm font-medium leading-5 text-neutral-900">
                    {category.name}
                  </h3>

                  <span className="mt-3 inline-flex items-center text-xs font-medium text-neutral-400 opacity-0 transition duration-300 group-hover:text-emerald-600 group-hover:opacity-100">
                    {t.categoryViewButton}
                    <ArrowRight
                      className="ml-1 size-3.5 transition group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        <Link
          href={localizedPath("/products", locale)}
          className="mt-4 inline-flex items-center text-sm font-medium text-neutral-700 sm:hidden"
        >
          {t.categoriesViewAll}
          <ArrowRight className="ml-2 size-4" aria-hidden="true" />
        </Link>
      </Container>
    </section>
  );
}