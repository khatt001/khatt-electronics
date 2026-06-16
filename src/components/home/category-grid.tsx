import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/layout/container";
import { homeTranslations } from "@/data/translations/home";
import { localizedPath, type Locale } from "@/lib/i18n";
import { getCatalogCategories } from "@/services/categories";

type CategoryGridProps = {
  locale?: Locale;
};

const categoryImages: Record<string, string> = {
  "video-nezaret": "/categories/video-surveillance.webp",
  "yangin-sistemleri": "/categories/fire-systems.webp",
  "girise-nezaret": "/categories/access-control.webp",
  domofoniya: "/categories/intercom.webp",
  siqnalizasiya: "/categories/alarm.webp",
  "sebeke-avadanliqlari": "/categories/network.webp",
  kabeller: "/categories/cables.webp",
  ups: "/categories/ups.webp",
  "smart-home": "/categories/smart-home.webp",
  aksesuarlar: "/categories/accessories.webp",
};

const sectionTitles = {
  az: "Populyar kateqoriyalar",
  en: "Popular categories",
  ru: "Популярные категории",
} as const;

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
              {sectionTitles[locale]}
            </h2>

            <div className="mt-4 h-0.5 w-24 bg-emerald-500 md:w-32" />
          </div>

          <Link
            href={localizedPath("/products", locale)}
            className="hidden items-center text-sm font-medium text-neutral-600 transition hover:text-emerald-700 sm:inline-flex"
          >
            {t.categoriesViewAll}

            <ArrowRight
              className="ml-2 size-4 transition group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>

        <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
            {visibleCategories.map((category) => {
              const imageSrc =
                categoryImages[category.slug] ?? "/categories/accessories.webp";

              return (
                <Link
                  key={category.id}
                  href={`${localizedPath(
                    "/products",
                    locale,
                  )}?category=${category.slug}`}
                  aria-label={`${category.name} — ${t.categoryViewButton}`}
                  className="group relative flex min-h-[220px] flex-col border-b border-r border-neutral-200 bg-white p-3 transition duration-300 hover:bg-emerald-50/40 sm:p-4"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-[#f7f8f8]">
                    <Image
                      src={imageSrc}
                      alt={category.name}
                      fill
                      sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="flex flex-1 flex-col px-1 pb-1 pt-4">
                    <h3 className="line-clamp-2 min-h-10 text-sm font-semibold leading-5 text-neutral-950">
                      {category.name}
                    </h3>

                    <span className="mt-auto inline-flex items-center pt-3 text-xs font-medium text-neutral-500 transition group-hover:text-emerald-700">
                      {t.categoryViewButton}

                      <ArrowRight
                        className="ml-1 size-3.5 transition group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        <Link
          href={localizedPath("/products", locale)}
          className="mt-4 inline-flex items-center text-sm font-medium text-neutral-700 transition hover:text-emerald-700 sm:hidden"
        >
          {t.categoriesViewAll}

          <ArrowRight className="ml-2 size-4" aria-hidden="true" />
        </Link>
      </Container>
    </section>
  );
}
