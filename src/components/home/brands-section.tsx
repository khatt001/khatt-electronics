import Link from "next/link";

import { Container } from "@/components/layout/container";
import { localizedPath, type Locale } from "@/lib/i18n";

type BrandsSectionProps = {
  locale?: Locale;
};

const brands = [
  "Hikvision",
  "Dahua",
  "Uniview",
  "Ajax",
  "Ruijie",
  "TP-Link",
  "MikroTik",
  "ZKTeco",
];

export function BrandsSection({ locale = "az" }: BrandsSectionProps) {
  return (
    <section className="bg-[#f5f6f8] py-7 md:py-10">
      <Container>
        <div className="mb-5 flex items-end justify-between gap-5">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-neutral-950 md:text-3xl">
              Brendlər
            </h2>

            <div className="mt-4 h-0.5 w-20 bg-emerald-500" />
          </div>

          <Link
            href={localizedPath("/products", locale)}
            className="text-sm font-medium text-neutral-600 transition hover:text-neutral-950"
          >
            Bütün məhsullar
          </Link>
        </div>

        <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8">
            {brands.map((brand) => (
              <Link
                key={brand}
                href={`${localizedPath("/products", locale)}?brand=${encodeURIComponent(
                  brand,
                )}`}
                className="group flex min-h-24 items-center justify-center border-b border-r border-neutral-200 px-4 py-5 text-center transition hover:bg-neutral-50"
              >
                <span className="text-base font-semibold tracking-tight text-neutral-400 transition group-hover:text-neutral-950">
                  {brand}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}