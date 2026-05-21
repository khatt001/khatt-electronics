import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  CircuitBoard,
  ShieldCheck,
  ShoppingCart,
} from "lucide-react";
import { homeTranslations } from "@/data/translations/home";
import { localizedPath, type Locale } from "@/lib/i18n";

type HeroBannerProps = {
  locale?: Locale;
};

export function HeroBanner({ locale = "az" }: HeroBannerProps) {
  const t = homeTranslations[locale];

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-neutral-200 bg-neutral-950 text-white shadow-sm">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(16,185,129,0.22),transparent_30%),radial-gradient(circle_at_12%_88%,rgba(34,211,238,0.10),transparent_34%),linear-gradient(135deg,#050505,#0b0f0d_55%,#061f1a)]" />
      <div className="absolute inset-0 opacity-[0.055] [background-image:linear-gradient(rgba(255,255,255,.9)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.9)_1px,transparent_1px)] [background-size:48px_48px]" />

      <div className="absolute -right-28 -top-28 size-80 rounded-full border border-emerald-300/15" />
      <div className="absolute -bottom-32 right-16 size-80 rounded-full bg-emerald-400/10 blur-3xl" />
      <div className="absolute -left-28 bottom-0 size-64 rounded-full bg-cyan-400/10 blur-3xl" />

     <div className="relative z-10 flex min-h-[420px] flex-col justify-between p-6 md:min-h-[500px] md:p-10 xl:p-12">
       <div className="max-w-4xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-200 backdrop-blur">
            <CircuitBoard className="size-4" aria-hidden="true" />
            {t.heroEyebrow}
          </div>

         <h1 className="max-w-3xl text-[2.55rem] font-semibold leading-[1.04] tracking-tight md:text-5xl xl:text-6xl">
            {t.heroTitle}
          </h1>

          <p className="mt-6 max-w-2xl text-sm leading-7 text-white/68 md:text-base">
            {t.heroDescription}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {t.heroPoints.map((point) => (
              <span
                key={point}
               className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-2 text-xs text-white/78 md:px-4 md:text-sm"
              >
                <CheckCircle2
                  className="size-4 shrink-0 text-emerald-300"
                  aria-hidden="true"
                />
                {point}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href={localizedPath("/products", locale)}
              className="inline-flex items-center justify-center rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-emerald-300"
            >
              <ShoppingCart className="mr-2 size-4" aria-hidden="true" />
              {t.productsButton}
              <ArrowRight className="ml-2 size-4" aria-hidden="true" />
            </Link>

            <Link
              href={`${localizedPath("/contact", locale)}?source=hero`}
              className="inline-flex items-center justify-center rounded-full border border-white/18 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              {t.consultationButton}
            </Link>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-2 md:gap-3">
          {t.quickStats.map((item, index) => (
            <div
              key={item.label}
            className="rounded-2xl border border-white/10 bg-white/[0.055] p-3 backdrop-blur md:rounded-3xl md:p-4"
            >
              <div className="mb-4 flex items-center justify-between">
                <strong className="text-xl text-emerald-200">
                  {item.value}
                </strong>

                {index === 0 ? (
                  <ShieldCheck
                    className="size-5 text-emerald-300"
                    aria-hidden="true"
                  />
                ) : (
                  <span className="size-2 rounded-full bg-emerald-300" />
                )}
              </div>

              <span className="block text-[11px] leading-4 text-white/55 md:text-xs md:leading-5">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}