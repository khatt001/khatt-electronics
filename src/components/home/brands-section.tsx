import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

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

export function BrandsSection({ locale = "az" }: BrandsSectionProps) {
  return (
    <section className="bg-[#f5f6f8] py-8 md:py-12">
      <Container>
        <div className="mb-5 flex items-end justify-between gap-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">
              Etibarlı istehsalçılar
            </p>

            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-neutral-950 md:text-3xl">
              Brendlər
            </h2>

            <div className="mt-4 h-0.5 w-24 bg-emerald-500" />
          </div>

          <Link
            href={localizedPath("/products", locale)}
            className="hidden items-center text-sm font-medium text-neutral-600 transition hover:text-neutral-950 sm:inline-flex"
          >
            Bütün məhsullar
            <ArrowRight className="ml-2 size-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8">
            {brands.map((brand) => (
              <Link
                key={brand.slug}
                href={`${localizedPath("/products", locale)}?brand=${brand.slug}`}
                aria-label={`${brand.name} məhsulları`}
                className="group flex min-h-[120px] items-center justify-center border-b border-r border-neutral-200 p-5 transition hover:bg-neutral-50"
              >
                <div className="relative h-14 w-full">
                  <Image
                    src={brand.image}
                    alt={brand.name}
                    fill
                    sizes="(min-width: 1024px) 12vw, (min-width: 640px) 25vw, 50vw"
                    className="object-contain opacity-65 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}