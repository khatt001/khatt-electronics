import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  CircuitBoard,
  ShieldCheck,
  ShoppingCart,
} from "lucide-react";
import { homeTranslations } from "@/data/translations/home";
import type { Locale } from "@/lib/i18n";

type HeroBannerProps = {
  locale?: Locale;
};

export function HeroBanner({ locale = "az" }: HeroBannerProps) {
  const t = homeTranslations[locale];

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-emerald-400/20 bg-neutral-950 p-6 text-white shadow-sm md:p-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(16,185,129,0.38),transparent_30%),radial-gradient(circle_at_18%_82%,rgba(34,211,238,0.18),transparent_34%),linear-gradient(135deg,#050505,#101010_55%,#03261d)]" />
      <div className="absolute -right-24 -top-24 size-72 rounded-full border border-emerald-300/20" />
      <div className="absolute -bottom-28 right-10 size-72 rounded-full bg-emerald-400/10 blur-3xl" />

      <div className="relative z-10 flex min-h-[440px] flex-col justify-between">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-200">
            <CircuitBoard className="size-4" aria-hidden="true" />
            {t.heroEyebrow}
          </div>

          <h1 className="max-w-3xl text-4xl font-semibold leading-[0.98] tracking-tight md:text-6xl lg:text-7xl">
            {t.heroTitle}
          </h1>

          <p className="mt-6 max-w-xl text-sm leading-7 text-white/70 md:text-base">
            {t.heroDescription}
          </p>

          <div className="mt-6 grid gap-2 text-sm text-white/70 sm:grid-cols-3">
            {t.heroPoints.map((point) => (
              <span key={point} className="inline-flex items-center gap-2">
                <CheckCircle2 className="size-4 text-emerald-300" />
                {point}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href={locale === "az" ? "/products" : `/${locale}/products`}
              className="inline-flex items-center justify-center rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-emerald-300"
            >
              <ShoppingCart className="mr-2 size-4" aria-hidden="true" />
              {t.productsButton}
              <ArrowRight className="ml-2 size-4" aria-hidden="true" />
            </Link>

            <Link
              href={locale === "az" ? "/contact" : `/${locale}/contact`}
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              {t.consultationButton}
            </Link>
          </div>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-3">
          {t.quickStats.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur"
            >
              <strong className="block text-lg text-emerald-200">
                {item.value}
              </strong>
              <span className="text-xs text-white/55">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute right-8 top-8 hidden rounded-3xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur lg:block">
        <ShieldCheck className="size-10 text-emerald-300" aria-hidden="true" />
      </div>
    </div>
  );
}