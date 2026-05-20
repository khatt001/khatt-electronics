import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/layout/container";
import {
  homeTranslations,
  type Locale,
} from "@/data/translations/home";

type ServicesSectionProps = {
  locale?: Locale;
};

function withLocalePath(locale: Locale, path: string) {
  if (locale === "az") {
    return path;
  }

  return `/${locale}${path}`;
}

export function ServicesSection({ locale = "az" }: ServicesSectionProps) {
  const t = homeTranslations[locale];

  return (
    <section className="bg-neutral-950 py-20 text-white lg:py-28">
      <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-white/40">
            {t.servicesEyebrow}
          </p>

          <h2 className="text-4xl font-semibold md:text-5xl">
            {t.servicesTitle}
          </h2>

          <p className="mt-6 leading-8 text-white/60">
            {t.servicesDescription}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={withLocalePath(locale, "/products")}
              className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-neutral-200"
            >
              {t.servicesProductsButton}
            </Link>

            <Link
              href={withLocalePath(locale, "/contact")}
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