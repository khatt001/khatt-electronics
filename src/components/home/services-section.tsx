import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/layout/container";
import { homeTranslations } from "@/data/translations/home";
import { localizedPath, type Locale } from "@/lib/i18n";

type ServicesSectionProps = {
  locale?: Locale;
};

export function ServicesSection({ locale = "az" }: ServicesSectionProps) {
  const t = homeTranslations[locale];

  return (
    <section className="bg-neutral-950 py-20 text-white lg:py-28">
      <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div>
          {/*
            CONTRAST FIX: text-white/40 on bg-neutral-950 is ~2.3:1 — fails WCAG AA.
            text-white/60 gives ~4.5:1 which passes for small text.
          */}
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-white/60">
            {t.servicesEyebrow}
          </p>

          <h2 className="text-4xl font-semibold md:text-5xl">
            {t.servicesTitle}
          </h2>

          <p className="mt-6 leading-8 text-white/70">
            {t.servicesDescription}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={localizedPath("/products", locale)}
              className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-neutral-200"
            >
              {t.servicesProductsButton}
            </Link>

            {/*
              IDENTICAL LINKS FIX: Both hero and services sections had
              "Məsləhət al" linking to /contact with different ?source= params.
              Lighthouse flags same visible text + different href as confusing.
              Fix: use aria-label to distinguish the two links for screen readers.
            */}
            <Link
              href={`${localizedPath("/contact", locale)}?source=services`}
              aria-label={`${t.servicesConsultationButton} — ${t.servicesTitle}`}
              className="rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              {t.servicesConsultationButton}
            </Link>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {t.services.map((service) => (
            <div
              key={service}
              className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-5"
            >
              <CheckCircle2
                className="size-5 shrink-0 text-emerald-300"
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