import Link from "next/link";
import {
  BadgeCheck,
  Headphones,
  PackageCheck,
  ShieldCheck,
  Truck,
  Wrench,
} from "lucide-react";

import { Container } from "@/components/layout/container";
import { localizedPath, type Locale } from "@/lib/i18n";

type ServicesSectionProps = {
  locale?: Locale;
};

const advantages = [
  {
    title: "Rəsmi zəmanət",
    description: "Satılan məhsullara uyğun zəmanət və satış sonrası dəstək.",
    icon: BadgeCheck,
  },
  {
    title: "Peşəkar quraşdırma",
    description: "Təhlükəsizlik sistemlərinin layihələndirilməsi və montajı.",
    icon: Wrench,
  },
  {
    title: "Texniki dəstək",
    description: "Avadanlıq seçimi, sazlama və texniki məsələlər üzrə dəstək.",
    icon: Headphones,
  },
  {
    title: "Sürətli çatdırılma",
    description: "Sifarişlərin Bakı və bölgələrə təhlükəsiz çatdırılması.",
    icon: Truck,
  },
];

export function ServicesSection({
  locale = "az",
}: ServicesSectionProps) {
  return (
    <section className="bg-[#f5f6f8] py-8 md:py-12">
      <Container>
        <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
          <div className="grid lg:grid-cols-[0.9fr_2.1fr]">
            <div className="relative overflow-hidden bg-neutral-950 p-7 text-white md:p-9 lg:p-10">
              <div className="absolute -right-20 -top-20 size-64 rounded-full bg-emerald-500/20 blur-3xl" />
              <div className="absolute -bottom-24 -left-20 size-64 rounded-full bg-emerald-800/30 blur-3xl" />

              <div className="relative z-10">
                <div className="flex size-12 items-center justify-center rounded-xl bg-emerald-600">
                  <ShieldCheck className="size-6" aria-hidden="true" />
                </div>

                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
                  Kompleks xidmət
                </p>

                <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
                  Satışdan quraşdırmaya qədər yanınızdayıq
                </h2>

                <p className="mt-4 max-w-md text-sm leading-7 text-white/70">
                  Obyektiniz üçün uyğun avadanlığın seçilməsi, layihələndirmə,
                  quraşdırma və texniki dəstəyi bir yerdən əldə edin.
                </p>

                <Link
                  href={localizedPath("/contact", locale)}
                  className="mt-7 inline-flex items-center rounded-lg bg-white px-5 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-emerald-100"
                >
                  Bizimlə əlaqə saxlayın
                </Link>
              </div>
            </div>

            <div className="grid sm:grid-cols-2">
              {advantages.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="border-b border-r border-neutral-200 p-6 md:p-7"
                  >
                    <div className="flex size-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                      <Icon className="size-5" aria-hidden="true" />
                    </div>

                    <h3 className="mt-5 text-base font-semibold text-neutral-950">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-neutral-600">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-white px-5 py-4">
            <PackageCheck
              className="size-5 shrink-0 text-emerald-700"
              aria-hidden="true"
            />
            <span className="text-sm font-medium text-neutral-800">
              Orijinal məhsullar
            </span>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-white px-5 py-4">
            <ShieldCheck
              className="size-5 shrink-0 text-emerald-700"
              aria-hidden="true"
            />
            <span className="text-sm font-medium text-neutral-800">
              Təhlükəsiz alış
            </span>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-white px-5 py-4">
            <Headphones
              className="size-5 shrink-0 text-emerald-700"
              aria-hidden="true"
            />
            <span className="text-sm font-medium text-neutral-800">
              Operativ dəstək
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}