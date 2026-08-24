import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Container } from "@/components/layout/container";
import { localizedPath, type Locale } from "@/lib/i18n";
import { getCatalogCategories } from "@/services/categories";

type CategoryGridProps = {
  locale?: Locale;
};

const preferredCategorySlugs = [
  "yangin-sistemleri",
  "video-nezaret",
  "girise-nezaret",
  "sebeke-avadanliqlari",
  "domofoniya",
  "siqnalizasiya",
];

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

const translations = {
  az: {
    title: "Məhsul və sistem istiqamətləri",
    description:
      "Obyektiniz üçün tələb olunan avadanlıq və sistemləri əsas istiqamətlər üzrə nəzərdən keçirin.",
    viewAll: "Bütün məhsullar",
  },
  en: {
    title: "Products and system solutions",
    description:
      "Explore equipment and systems for your property across our main areas of expertise.",
    viewAll: "View all products",
  },
  ru: {
    title: "Оборудование и системные решения",
    description:
      "Выберите оборудование и системы для вашего объекта по основным направлениям.",
    viewAll: "Все товары",
  },
} as const;

export async function CategoryGrid({ locale = "az" }: CategoryGridProps) {
  const categories = await getCatalogCategories(locale);
  const t = translations[locale];

  const categoryBySlug = new Map(
    categories.map((category) => [category.slug, category]),
  );

  const prioritizedCategories = preferredCategorySlugs
    .map((slug) => categoryBySlug.get(slug))
    .filter(
      (category): category is (typeof categories)[number] =>
        Boolean(category),
    );

  const prioritizedSlugs = new Set(
    prioritizedCategories.map((category) => category.slug),
  );

  const remainingCategories = categories.filter(
    (category) => !prioritizedSlugs.has(category.slug),
  );

  const visibleCategories = [
    ...prioritizedCategories,
    ...remainingCategories,
  ].slice(0, 6);

  if (visibleCategories.length === 0) {
    return null;
  }

  return (
    <section className="bg-[#f6f7f5] py-14 md:py-20">
      <Container>
        <div className="flex flex-col justify-between gap-6 border-b border-neutral-300 pb-7 md:flex-row md:items-end">
          <div>
            <h2 className="max-w-2xl text-3xl font-semibold tracking-[-0.035em] text-neutral-950 md:text-4xl">
              {t.title}
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-neutral-600 md:text-base">
              {t.description}
            </p>
          </div>

          <Link
            href={localizedPath("/products", locale)}
            className="inline-flex w-fit items-center text-sm font-semibold text-neutral-900 transition hover:text-emerald-800"
          >
            {t.viewAll}

            <ArrowUpRight
              className="ml-2 size-4"
              aria-hidden="true"
            />
          </Link>
        </div>

        <div className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {visibleCategories.map((category) => {
            const imageSrc =
              categoryImages[category.slug] ??
              "/categories/accessories.webp";

            return (
              <Link
                key={category.id}
                href={`${localizedPath(
                  "/products",
                  locale,
                )}?category=${category.slug}`}
                className="group block"
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-neutral-200">
                  <Image
                    src={imageSrc}
                    alt={category.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.025]"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-60" />
                </div>

                <div className="mt-4 flex items-start justify-between gap-5 border-t border-neutral-300 pt-4">
                  <h3 className="text-lg font-semibold leading-7 text-neutral-950">
                    {category.name}
                  </h3>

                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-neutral-300 text-neutral-700 transition group-hover:border-emerald-800 group-hover:bg-emerald-800 group-hover:text-white">
                    <ArrowUpRight
                      className="size-4"
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