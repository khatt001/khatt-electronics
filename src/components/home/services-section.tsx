import Link from "next/link";
import {
  ArrowRight,
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

const services = [
  {
    title: "Rəsmi zəmanət",
    description: "Məhsullara etibarlı zəmanət və satış sonrası dəstək.",
    icon: BadgeCheck,
  },
  {
    title: "Texniki məsləhət",
    description: "Layihənizə uyğun avadanlıq seçimi üçün mütəxəssis dəstəyi.",
    icon: Headphones,
  },
  {
    title: "Sürətli təchizat",
    description: "Stokda olan məhsulların operativ hazırlanması və çatdırılması.",
    icon: Truck,
  },
  {
    title: "Quraşdırma dəstəyi",
    description: "Quraşdırma və sazlama üzrə texniki istiqamətləndirmə.",
    icon: Wrench,
  },
];

export function ServicesSection({ locale = "az" }: ServicesSectionProps) {
  return (
    <section className="bg-[#f5f6f8] pb-12 pt-7 md:pb-16 md:pt-10">
      <Container>
        <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
          <div className="grid lg:grid-cols-[1.1fr_1.9fr]">
            <div className="relative overflow-hidden bg-neutral-950 p-8 text-white md:p-10">
              <div className="absolute -right-20 -top-20 size-60 rounded-full bg-emerald-400/15 blur-3xl" />

              <div className="relative z-10">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
                  KHATT Electronics
                </span>

                <h2 className="mt-4 text-3xl font-semibold leading-tight">
                  Məhsul seçimindən texniki dəstəyə qədər yanınızdayıq
                </h2>

                <p className="mt-4 text-sm leading-7 text-white/65">
                  Təhlükəsizlik və elektronika sistemləri üçün uyğun məhsul
                  seçimi, qiymət təklifi və texniki məsləhət təqdim edirik.
                </p>

                <Link
                  href={`${localizedPath("/contact", locale)}?source=services`}
                  className="mt-7 inline-flex items-center rounded-lg bg-emerald-400 px-5 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-emerald-300"
                >
                  Bizimlə əlaqə
                  <ArrowRight className="ml-2 size-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="grid sm:grid-cols-2">
              {services.map((service) => {
                const Icon = service.icon;

                return (
                  <div
                    key={service.title}
                    className="border-b border-r border-neutral-200 p-7 transition hover:bg-neutral-50"
                  >
                    <div className="flex size-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                      <Icon className="size-5" aria-hidden="true" />
                    </div>

                    <h3 className="mt-5 text-base font-semibold text-neutral-950">
                      {service.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-neutral-600">
                      {service.description}
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
              className="size-5 text-emerald-600"
              aria-hidden="true"
            />
            <span className="text-sm font-medium text-neutral-800">
              Stok məlumatı
            </span>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-white px-5 py-4">
            <ShieldCheck
              className="size-5 text-emerald-600"
              aria-hidden="true"
            />
            <span className="text-sm font-medium text-neutral-800">
              Təhlükəsiz sifariş
            </span>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-white px-5 py-4">
            <Headphones
              className="size-5 text-emerald-600"
              aria-hidden="true"
            />
            <span className="text-sm font-medium text-neutral-800">
              Satış sonrası dəstək
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}