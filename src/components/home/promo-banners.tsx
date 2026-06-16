import Link from "next/link";
import {
  ArrowRight,
  Camera,
  Flame,
  Network,
  ShieldCheck,
} from "lucide-react";

import { Container } from "@/components/layout/container";
import { localizedPath, type Locale } from "@/lib/i18n";

type PromoBannersProps = {
  locale?: Locale;
};

export function PromoBanners({ locale = "az" }: PromoBannersProps) {
  return (
    <section className="bg-[#f5f6f8] py-7 md:py-10">
      <Container>
        <div className="grid gap-5 lg:grid-cols-2">
          <Link
            href={`${localizedPath("/products", locale)}?category=video-nezaret`}
            className="group relative min-h-[280px] overflow-hidden rounded-2xl bg-gradient-to-br from-[#163765] via-[#1d4f8c] to-[#2c7bc5] p-7 text-white shadow-sm md:p-9"
          >
            <div className="absolute -right-24 -top-24 size-72 rounded-full bg-cyan-300/20 blur-3xl" />
            <div className="absolute -bottom-24 right-[20%] size-64 rounded-full bg-white/10 blur-3xl" />

            <div className="relative z-10 flex h-full flex-col justify-between">
              <div className="max-w-[340px]">
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-100">
                  Videomüşahidə
                </span>

                <h2 className="mt-3 text-3xl font-semibold leading-tight md:text-4xl">
                  Kamera sistemi üçün tam həll
                </h2>

                <p className="mt-4 text-sm leading-6 text-white/75">
                  Kamera, NVR, PoE switch, HDD və kabel avadanlıqlarını bir
                  yerdən seçin.
                </p>
              </div>

              <div className="mt-8 flex items-end justify-between gap-6">
                <span className="inline-flex items-center rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-neutral-950">
                  Məhsullara bax
                  <ArrowRight
                    className="ml-2 size-4 transition group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>

                <div className="flex items-end gap-3">
                  <div className="flex size-16 items-center justify-center rounded-2xl border border-white/15 bg-white/10 backdrop-blur">
                    <Camera className="size-8" strokeWidth={1.35} />
                  </div>

                  <div className="flex size-20 items-center justify-center rounded-2xl border border-white/15 bg-white/15 backdrop-blur">
                    <Network className="size-10" strokeWidth={1.35} />
                  </div>
                </div>
              </div>
            </div>
          </Link>

          <Link
            href={`${localizedPath("/contact", locale)}?source=fire-project`}
            className="group relative min-h-[280px] overflow-hidden rounded-2xl bg-gradient-to-br from-[#f1f3f5] via-white to-[#e5e7eb] p-7 text-neutral-950 shadow-sm md:p-9"
          >
            <div className="absolute -right-20 -top-20 size-72 rounded-full bg-emerald-200/45 blur-3xl" />
            <div className="absolute -bottom-24 right-[18%] size-60 rounded-full bg-neutral-300/30 blur-3xl" />

            <div className="relative z-10 flex h-full flex-col justify-between">
              <div className="max-w-[340px]">
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">
                  Yanğın təhlükəsizliyi
                </span>

                <h2 className="mt-3 text-3xl font-semibold leading-tight md:text-4xl">
                  Obyektiniz üçün layihə və avadanlıq seçimi
                </h2>

                <p className="mt-4 text-sm leading-6 text-neutral-600">
                  Detektor, panel, sirena və digər yanğın sistemi avadanlıqları
                  üçün uyğun təklif alın.
                </p>
              </div>

              <div className="mt-8 flex items-end justify-between gap-6">
                <span className="inline-flex items-center rounded-lg bg-neutral-950 px-4 py-2.5 text-sm font-semibold text-white">
                  Təklif al
                  <ArrowRight
                    className="ml-2 size-4 transition group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>

                <div className="flex items-end gap-3">
                  <div className="flex size-16 items-center justify-center rounded-2xl border border-neutral-200 bg-white shadow-sm">
                    <Flame
                      className="size-8 text-emerald-600"
                      strokeWidth={1.35}
                    />
                  </div>

                  <div className="flex size-20 items-center justify-center rounded-2xl bg-neutral-950 text-white shadow-sm">
                    <ShieldCheck className="size-10" strokeWidth={1.35} />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </Container>
    </section>
  );
}