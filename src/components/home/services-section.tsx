import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/layout/container";
import { services } from "@/data/home";

export function ServicesSection() {
  return (
    <section className="bg-neutral-950 py-20 text-white lg:py-28">
      <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-white/40">
            Xidmətlər
          </p>
          <h2 className="text-4xl font-semibold md:text-5xl">
            Satışdan sonra da dəstək
          </h2>
          <p className="mt-6 leading-8 text-white/60">
            Məhsul seçimi, sistem layihələndirilməsi, quraşdırılma,
            konfiqurasiya və texniki dəstəyi bir yerdə təqdim edirik.
          </p>
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