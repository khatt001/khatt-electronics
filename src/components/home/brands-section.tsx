import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { localizedPath, type Locale } from "@/lib/i18n";

type BrandsSectionProps = {
  locale?: Locale;
};

const brands = [
  {
    name: "Hikvision",
    slug: "hikvision",
    image: "/brands/hikvision.png",
  },
  {
    name: "Dahua",
    slug: "dahua",
    image: "/brands/dahua.png",
  },
  {
    name: "Uniview",
    slug: "uniview",
    image: "/brands/uniview.png",
  },
  {
    name: "Ajax",
    slug: "ajax",
    image: "/brands/ajax.png",
  },
  {
    name: "Ruijie",
    slug: "ruijie",
    image: "/brands/ruijie.png",
  },
  {
    name: "TP-Link",
    slug: "tp-link",
    image: "/brands/tp-link.png",
  },
  {
    name: "MikroTik",
    slug: "mikrotik",
    image: "/brands/mikrotik.png",
  },
  {
    name: "ZKTeco",
    slug: "zkteco",
    image: "/brands/zkteco.png",
  },
];

const translations = {
  az: {
    title: "Etibarlı istehsalçıların avadanlıqları",
    description:
      "Layihələr üçün beynəlxalq istehsalçıların peşəkar və uyğun avadanlıqlarını təklif edirik.",
    ariaSuffix: "məhsulları",
  },
  en: {
    title: "Equipment from trusted manufacturers",
    description:
      "We supply professional equipment from established international manufacturers.",
    ariaSuffix: "products",
  },
  ru: {
    title: "Оборудование надёжных производителей",
    description:
      "Предлагаем профессиональное оборудование ведущих международных производителей.",
    ariaSuffix: "товары",
  },
} as const;

export function BrandsSection({ locale = "az" }: BrandsSectionProps) {
  const t = translations[locale];

  return (
    <section className="border-b border-neutral-200 bg-white py-14 md:py-20">
      <Container>
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-[-0.035em] text-neutral-950 md:text-4xl">
            {t.title}
          </h2>

          <p className="mt-4 text-sm leading-7 text-neutral-600 md:text-base">
            {t.description}
          </p>
        </div>

        <div className="mt-8 grid border-y border-neutral-300 grid-cols-2 sm:grid-cols-4 lg:grid-cols-8">
          {brands.map((brand) => (
            <Link
              key={brand.slug}
              href={`${localizedPath(
                "/products",
                locale,
              )}?brand=${brand.slug}`}
              aria-label={`${brand.name} ${t.ariaSuffix}`}
              className="group flex min-h-[110px] items-center justify-center border-b border-r border-neutral-200 px-5 py-6 transition hover:bg-neutral-50 sm:min-h-[125px]"
            >
              <div className="relative h-12 w-full">
                <Image
                  src={brand.image}
                  alt={brand.name}
                  fill
                  sizes="(min-width: 1024px) 12vw, (min-width: 640px) 25vw, 50vw"
                  className="object-contain opacity-55 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0"
                />
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}