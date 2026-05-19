import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  CircuitBoard,
  ShieldCheck,
  ShoppingCart,
} from "lucide-react";
import { quickStats } from "@/data/home";

export function HeroBanner() {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-emerald-400/20 bg-neutral-950 p-6 text-white shadow-sm md:p-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(16,185,129,0.38),transparent_30%),radial-gradient(circle_at_18%_82%,rgba(34,211,238,0.18),transparent_34%),linear-gradient(135deg,#050505,#101010_55%,#03261d)]" />
      <div className="absolute -right-24 -top-24 size-72 rounded-full border border-emerald-300/20" />
      <div className="absolute -bottom-28 right-10 size-72 rounded-full bg-emerald-400/10 blur-3xl" />

      <div className="relative z-10 flex min-h-[440px] flex-col justify-between">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-200">
            <CircuitBoard className="size-4" aria-hidden="true" />
            KHATT Electronics
          </div>

          <h1 className="max-w-3xl text-4xl font-semibold leading-[0.98] tracking-tight md:text-6xl lg:text-7xl">
            Təhlükəsizlik və smart elektronika məhsulları
          </h1>

          <p className="mt-6 max-w-xl text-sm leading-7 text-white/70 md:text-base">
            Kamera sistemləri, keçidə nəzarət, domofon, siqnalizasiya və şəbəkə
            avadanlıqlarını onlayn seçin, səbətə əlavə edin və sifarişinizi
            tamamlayın.
          </p>

          <div className="mt-6 grid gap-2 text-sm text-white/70 sm:grid-cols-3">
            <span className="inline-flex items-center gap-2">
              <CheckCircle2 className="size-4 text-emerald-300" />
              Stok və qiymət
            </span>
            <span className="inline-flex items-center gap-2">
              <CheckCircle2 className="size-4 text-emerald-300" />
              Sürətli sifariş
            </span>
            <span className="inline-flex items-center gap-2">
              <CheckCircle2 className="size-4 text-emerald-300" />
              Texniki dəstək
            </span>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/products"
              className="inline-flex items-center justify-center rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-emerald-300"
            >
              <ShoppingCart className="mr-2 size-4" aria-hidden="true" />
              Məhsullara bax
              <ArrowRight className="ml-2 size-4" aria-hidden="true" />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Məsləhət al
            </Link>
          </div>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-3">
          {quickStats.map((item) => (
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