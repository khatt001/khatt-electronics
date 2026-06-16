import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/layout/container";
import { localizedPath, type Locale } from "@/lib/i18n";

type PromoBannersProps = {
  locale?: Locale;
};

export function PromoBanners({ locale = "az" }: PromoBannersProps) {
  return (
    <section className="bg-[#f5f6f8] py-8 md:py-12">
      <Container>
        <div className="grid gap-5 lg:grid-cols-2">
          <Link
            href={`${localizedPath("/products", locale)}?category=video-nezaret`}
            className="group relative min-h-[320px] overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm"
          >
            <Image
              src="/banners/promo-cctv.webp"
              alt="Videomüşahidə sistemi"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover transition duration-700 group-hover:scale-[1.02]"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-white/10" />

            <div className="relative z-10 flex min-h-[320px] max-w-[60%] flex-col justify-center p-7 md:p-9">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
                Tam CCTV həlli
              </p>

              <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-neutral-950 md:text-4xl">
                Obyektiniz üçün videomüşahidə sistemi
              </h2>

              <p className="mt-4 max-w-md text-sm leading-6 text-neutral-600">
                Kamera, qeydiyyat cihazı, disk və şəbəkə avadanlıqlarını bir
                yerdən seçin.
              </p>

              <span className="mt-6 inline-flex w-fit items-center rounded-lg bg-neutral-950 px-5 py-3 text-sm font-semibold text-white transition group-hover:bg-emerald-700">
                Məhsullara bax
                <ArrowRight
                  className="ml-2 size-4 transition group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </span>
            </div>
          </Link>

          <Link
            href={localizedPath("/contact", locale)}
            className="group relative min-h-[320px] overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm"
          >
            <Image
              src="/banners/promo-fire.webp"
              alt="Yanğın təhlükəsizlik layihəsi"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover transition duration-700 group-hover:scale-[1.02]"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-white/10" />

            <div className="relative z-10 flex min-h-[320px] max-w-[60%] flex-col justify-center p-7 md:p-9">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-600">
                Layihələndirmə və quraşdırma
              </p>

              <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-neutral-950 md:text-4xl">
                Yanğın sistemi üçün qiymət təklifi
              </h2>

              <p className="mt-4 max-w-md text-sm leading-6 text-neutral-600">
                Obyektinizə uyğun avadanlıq siyahısı və texniki həll hazırlayaq.
              </p>

              <span className="mt-6 inline-flex w-fit items-center rounded-lg bg-neutral-950 px-5 py-3 text-sm font-semibold text-white transition group-hover:bg-red-700">
                Sorğu göndər
                <ArrowRight
                  className="ml-2 size-4 transition group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </span>
            </div>
          </Link>
        </div>
      </Container>
    </section>
  );
}