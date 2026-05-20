import Link from "next/link";
import {
  ArrowRight,
  Boxes,
  Camera,
  DoorOpen,
  Network,
  ShieldCheck,
  Siren,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { getCatalogCategories } from "@/services/categories";
import { homeTranslations } from "@/data/translations/home";
import type { Locale } from "@/lib/i18n";

const categoryIcons = [
  Camera,
  Network,
  DoorOpen,
  Siren,
  ShieldCheck,
  Boxes,
];

type CategoryGridProps = {
  locale?: Locale;
};

function withLocalePath(locale: Locale, path: string) {
  if (locale === "az") {
    return path;
  }

  return `/${locale}${path}`;
}

export async function CategoryGrid({ locale = "az" }: CategoryGridProps) {
  const categories = await getCatalogCategories();
  const visibleCategories = categories.slice(0, 6);
  const t = homeTranslations[locale];

  if (visibleCategories.length === 0) {
    return null;
  }

  return (
    <section className="bg-white py-16 lg:py-24">
      <Container>
        <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-neutral-500">
              {t.categoriesEyebrow}
            </p>

            <h2 className="text-3xl font-semibold tracking-tight text-neutral-950 md:text-5xl">
              {t.categoriesTitle}
            </h2>

            <p className="mt-4 leading-8 text-neutral-600">
              {t.categoriesDescription}
            </p>
          </div>

          <Link
            href={withLocalePath(locale, "/products")}
            className="inline-flex w-fit items-center rounded-full border border-neutral-200 px-5 py-2.5 text-sm font-medium text-neutral-700 transition hover:border-neutral-950 hover:text-neutral-950"
          >
            {t.categoriesViewAll}
            <ArrowRight className="ml-2 size-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visibleCategories.map((category, index) => {
            const Icon = categoryIcons[index % categoryIcons.length];

            return (
              <Link
                key={category.id}
                href={withLocalePath(locale, `/category/${category.slug}`)}
                className="group relative overflow-hidden rounded-3xl border border-neutral-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-neutral-950 hover:shadow-xl"
              >
                <div className="absolute -right-10 -top-10 size-32 rounded-full bg-neutral-100 transition duration-300 group-hover:scale-125" />

                <div className="relative">
                  <div className="mb-10 flex size-12 items-center justify-center rounded-2xl bg-neutral-950 text-white">
                    <Icon className="size-6" aria-hidden="true" />
                  </div>

                  <h3 className="text-2xl font-semibold text-neutral-950">
                    {category.name}
                  </h3>

                  <p className="mt-3 line-clamp-2 leading-7 text-neutral-600">
                    {category.description ?? t.categoryFallbackDescription}
                  </p>

                  <span className="mt-8 inline-flex items-center text-sm font-medium text-neutral-950">
                    {t.categoryViewButton}
                    <ArrowRight
                      className="ml-2 size-4 transition group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}