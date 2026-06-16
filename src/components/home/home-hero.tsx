import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/layout/container";
import { localizedPath, type Locale } from "@/lib/i18n";

type HomeHeroProps = {
  locale?: Locale;
};

export function HomeHero({ locale = "az" }: HomeHeroProps) {
  return (
    <section className="border-b border-black/5 bg-[#f5f6f8]">
      <Container className="py-5 md:py-7">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,2.2fr)_minmax(300px,0.8fr)]">
          <Link
            href={localizedPath("/products", locale)}
            className="group relative min-h-[390px] overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm md:min-h-[470px]"
          >
            <Image
              src="/banners/main-cctv.webp"
              alt="Videomüşahidə və təhlükəsizlik sistemləri"
              fill
              priority
              sizes="(min-width: 1024px) 72vw, 100vw"
              className="object-cover transition duration-700 group-hover:scale-[1.015]"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/75 to-white/5" />

            <div className="relative z-10 flex min-h-[390px] max-w-[58%] flex-col justify-center p-7 md:min-h-[470px] md:p-10 lg:p-12">
              <span className="inline-flex w-fit items-center rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white">
                Yeni nəsil təhlükəsizlik
              </span>

              <h1 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-[-0.04em] text-neutral-950 md:text-5xl lg:text-6xl">
                Obyektiniz üçün tam təhlükəsizlik həlləri
              </h1>

              <p className="mt-5 max-w-xl text-sm leading-7 text-neutral-600 md:text-base">
                Videomüşahidə, yanğın siqnalizasiya, keçidə nəzarət və
                şəbəkə avadanlıqlarını bir ünvandan seçin.
              </p>

              <span className="mt-7 inline-flex w-fit items-center rounded-lg bg-neutral-950 px-5 py-3 text-sm font-semibold text-white transition group-hover:bg-emerald-700">
                Məhsullara bax
                <ArrowRight
                  className="ml-2 size-4 transition group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </span>
            </div>

            <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2">
              <span className="h-2 w-6 rounded-full bg-emerald-600" />
              <span className="size-2 rounded-full bg-white/80" />
              <span className="size-2 rounded-full bg-white/80" />
            </div>
          </Link>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <Link
              href={`${localizedPath("/products", locale)}?category=siqnalizasiya`}
              className="group relative min-h-[225px] overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm"
            >
              <Image
                src="/banners/side-fire.webp"
                alt="Yanğın siqnalizasiya sistemləri"
                fill
                sizes="(min-width: 1024px) 28vw, 50vw"
                className="object-cover transition duration-700 group-hover:scale-[1.03]"
              />

              <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/70 to-transparent" />

              <div className="relative z-10 flex h-full min-h-[225px] max-w-[72%] flex-col justify-between p-6">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-red-600">
                    Yanğın təhlükəsizliyi
                  </span>

                  <h2 className="mt-3 text-2xl font-semibold leading-tight text-neutral-950">
                    Yanğın sistemləri
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-neutral-600">
                    Detektor, panel və xəbərdarlıq avadanlıqları.
                  </p>
                </div>

                <span className="mt-5 inline-flex w-fit items-center rounded-lg bg-neutral-950 px-4 py-2.5 text-sm font-semibold text-white">
                  Kataloqa keç
                  <ArrowRight
                    className="ml-2 size-4 transition group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </div>
            </Link>

            <Link
              href={`${localizedPath("/products", locale)}?category=sebeke`}
              className="group relative min-h-[225px] overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm"
            >
              <Image
                src="/banners/side-network.webp"
                alt="Şəbəkə avadanlıqları"
                fill
                sizes="(min-width: 1024px) 28vw, 50vw"
                className="object-cover transition duration-700 group-hover:scale-[1.03]"
              />

              <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/70 to-transparent" />

              <div className="relative z-10 flex h-full min-h-[225px] max-w-[72%] flex-col justify-between p-6">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">
                    Professional şəbəkə
                  </span>

                  <h2 className="mt-3 text-2xl font-semibold leading-tight text-neutral-950">
                    Şəbəkə avadanlıqları
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-neutral-600">
                    Router, switch, access point və kabel həlləri.
                  </p>
                </div>

                <span className="mt-5 inline-flex w-fit items-center rounded-lg bg-neutral-950 px-4 py-2.5 text-sm font-semibold text-white">
                  Məhsullara bax
                  <ArrowRight
                    className="ml-2 size-4 transition group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}