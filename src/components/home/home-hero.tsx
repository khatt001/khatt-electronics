import Link from "next/link";
import {
  ArrowRight,
  Camera,
  Flame,
  Network,
  ScanFace,
  ShieldCheck,
} from "lucide-react";

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
            className="group relative min-h-[390px] overflow-hidden rounded-2xl border border-black/5 bg-gradient-to-br from-[#eef7ff] via-white to-[#d9ecff] shadow-sm md:min-h-[470px]"
          >
            <div className="absolute inset-0">
              <div className="absolute -right-20 -top-28 size-96 rounded-full bg-blue-300/30 blur-3xl" />
              <div className="absolute -bottom-28 right-[18%] size-80 rounded-full bg-cyan-300/25 blur-3xl" />
              <div className="absolute right-[5%] top-[12%] h-[78%] w-[46%] rounded-[45%_55%_35%_65%] bg-gradient-to-br from-blue-500/15 to-blue-700/5" />
            </div>

            <div className="relative z-10 flex h-full min-h-[390px] flex-col justify-between p-7 md:min-h-[470px] md:p-10 lg:p-12">
              <div className="max-w-[650px]">
                <span className="inline-flex items-center rounded-full bg-blue-600 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white">
                  Yeni nəsil təhlükəsizlik
                </span>

                <h1 className="mt-6 max-w-2xl text-4xl font-semibold leading-[1.05] tracking-[-0.04em] text-neutral-950 md:text-5xl lg:text-6xl">
                  Obyektiniz üçün tam təhlükəsizlik həlləri
                </h1>

                <p className="mt-5 max-w-xl text-sm leading-7 text-neutral-600 md:text-base">
                  Videomüşahidə, yanğın siqnalizasiya, keçidə nəzarət və
                  şəbəkə avadanlıqlarını bir ünvandan seçin.
                </p>

                <span className="mt-7 inline-flex items-center rounded-lg bg-neutral-950 px-5 py-3 text-sm font-semibold text-white transition group-hover:bg-blue-700">
                  Məhsullara bax
                  <ArrowRight
                    className="ml-2 size-4 transition group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </div>

              <div className="mt-10 flex flex-wrap items-end justify-between gap-6">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <div className="rounded-xl border border-white/70 bg-white/75 p-3 backdrop-blur">
                    <Camera className="size-5 text-blue-600" aria-hidden="true" />
                    <p className="mt-2 text-xs font-semibold text-neutral-800">
                      CCTV
                    </p>
                  </div>

                  <div className="rounded-xl border border-white/70 bg-white/75 p-3 backdrop-blur">
                    <Flame className="size-5 text-blue-600" aria-hidden="true" />
                    <p className="mt-2 text-xs font-semibold text-neutral-800">
                      Yanğın
                    </p>
                  </div>

                  <div className="rounded-xl border border-white/70 bg-white/75 p-3 backdrop-blur">
                    <ScanFace className="size-5 text-blue-600" aria-hidden="true" />
                    <p className="mt-2 text-xs font-semibold text-neutral-800">
                      Access
                    </p>
                  </div>

                  <div className="rounded-xl border border-white/70 bg-white/75 p-3 backdrop-blur">
                    <Network className="size-5 text-blue-600" aria-hidden="true" />
                    <p className="mt-2 text-xs font-semibold text-neutral-800">
                      Şəbəkə
                    </p>
                  </div>
                </div>

                <div className="hidden items-end gap-4 md:flex">
                  <div className="flex h-44 w-24 items-center justify-center rounded-[2rem] border border-white bg-white/90 shadow-xl">
                    <Camera
                      className="size-12 text-neutral-800"
                      strokeWidth={1.35}
                      aria-hidden="true"
                    />
                  </div>

                  <div className="flex h-56 w-40 items-center justify-center rounded-[2.5rem] border border-white bg-white shadow-2xl">
                    <ShieldCheck
                      className="size-20 text-blue-600"
                      strokeWidth={1.25}
                      aria-hidden="true"
                    />
                  </div>

                  <div className="flex h-40 w-24 items-center justify-center rounded-[2rem] border border-white bg-white/90 shadow-xl">
                    <ScanFace
                      className="size-12 text-neutral-800"
                      strokeWidth={1.35}
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2">
              <span className="h-2 w-6 rounded-full bg-blue-600" />
              <span className="size-2 rounded-full bg-blue-200" />
              <span className="size-2 rounded-full bg-blue-200" />
              <span className="size-2 rounded-full bg-blue-200" />
            </div>
          </Link>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <Link
              href={`${localizedPath("/products", locale)}?category=video-nezaret`}
              className="group relative min-h-[225px] overflow-hidden rounded-2xl bg-gradient-to-br from-[#173d76] to-[#347fd0] p-7 text-white shadow-sm"
            >
              <div className="absolute -bottom-20 -right-16 size-64 rounded-full bg-cyan-300/25 blur-2xl" />

              <div className="relative z-10 flex h-full flex-col justify-between">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-100">
                    KHATT Electronics
                  </span>

                  <h2 className="mt-3 max-w-[250px] text-3xl font-semibold leading-tight">
                    Videomüşahidə sistemləri
                  </h2>
                </div>

                <div className="mt-8 flex items-end justify-between">
                  <span className="inline-flex items-center rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-neutral-950">
                    Kataloqa keç
                    <ArrowRight
                      className="ml-2 size-4 transition group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>

                  <div className="flex size-20 items-center justify-center rounded-2xl border border-white/20 bg-white/10 backdrop-blur">
                    <Camera className="size-10" strokeWidth={1.3} />
                  </div>
                </div>
              </div>
            </Link>

            <Link
              href={`${localizedPath("/contact", locale)}?source=estimate`}
              className="group relative min-h-[225px] overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 p-7 text-white shadow-sm"
            >
              <div className="absolute -right-16 -top-20 size-60 rounded-full bg-white/15 blur-2xl" />

              <div className="relative z-10 flex h-full flex-col justify-between">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-100">
                    Layihəniz üçün
                  </span>

                  <h2 className="mt-3 max-w-[250px] text-3xl font-semibold leading-tight">
                    Qiymət təklifi alın
                  </h2>

                  <p className="mt-3 max-w-[260px] text-sm leading-6 text-white/80">
                    Məhsul siyahınızı göndərin, sizə uyğun təklif hazırlayaq.
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <span className="inline-flex items-center rounded-lg bg-neutral-950 px-4 py-2.5 text-sm font-semibold text-white">
                    Sorğu göndər
                    <ArrowRight
                      className="ml-2 size-4 transition group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>

                  <ShieldCheck
                    className="size-14 text-white/90"
                    strokeWidth={1.3}
                    aria-hidden="true"
                  />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}