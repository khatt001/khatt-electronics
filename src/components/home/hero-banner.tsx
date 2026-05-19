import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { quickStats } from "@/data/home";

export function HeroBanner() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-950 p-6 text-white shadow-sm md:p-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(16,185,129,0.25),_transparent_34%),linear-gradient(145deg,_#171717,_#050505)]" />

      <div className="relative z-10 flex min-h-[420px] flex-col justify-between">
        <div>
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.32em] text-white/50">
            KHATT Electronics
          </p>

          <h1 className="max-w-3xl text-4xl font-semibold leading-[0.98] tracking-tight md:text-6xl lg:text-7xl">
            Təhlükəsizlik və smart texnologiya məhsulları
          </h1>

          <p className="mt-6 max-w-xl text-sm leading-7 text-white/65 md:text-base">
            Kamera sistemləri, keçidə nəzarət, domofon, siqnalizasiya, şəbəkə
            avadanlıqları və quraşdırılma xidmətləri.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/products"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-medium text-neutral-950 transition hover:bg-neutral-200"
            >
              Məhsullara bax
              <ArrowRight className="ml-2 size-4" aria-hidden="true" />
            </Link>

            <Link
              href="/track-order"
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10"
            >
              Sifariş izləmə
            </Link>
          </div>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-3">
          {quickStats.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-white/10 bg-white/[0.05] p-4"
            >
              <strong className="block text-lg">{item.value}</strong>
              <span className="text-xs text-white/50">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}