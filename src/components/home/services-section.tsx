import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/layout/container";
import { services } from "@/data/home";

export function ServicesSection() {
  return (
    <section className="bg-neutral-950 py-20 text-white lg:py-28">
      <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-white/40">
            Dəstək və xidmət
          </p>

          <h2 className="text-4xl font-semibold md:text-5xl">
            Məhsul seçimi və quraşdırılmada yanınızdayıq
          </h2>

          <p className="mt-6 leading-8 text-white/60">
            Məhsulu onlayn sifariş edə, layihənizə uyğun seçim üçün bizimlə
            əlaqə saxlaya və sifarişinizi sonradan izləyə bilərsiniz.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/products"
              className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-neutral-200"
            >
              Məhsullara bax
            </Link>

            <Link
              href="/contact"
              className="rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Məsləhət al
            </Link>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {services.map((service) => (
            <div
              key={service}
              className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-5"
            >
              <CheckCircle2
                className="size-5 text-emerald-300"
                aria-hidden="true"
              />
              <span>{service}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}