import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";

import { serviceIcons } from "@/components/shared/service-icon";

import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/shared/page-header";
import { ProcessSteps } from "@/components/shared/process-steps";
import { QuoteBand } from "@/components/shared/quote-band";
import { SectionHeading } from "@/components/shared/section-heading";
import { fireServices, type FireService } from "@/data/fire-services";
import { licenses } from "@/data/licenses";
import { servicesPageTranslations } from "@/data/translations/services-page";
import { localizedPath, type Locale } from "@/lib/i18n";

function ServiceRow({ service, locale }: { service: FireService; locale: Locale }) {
  const t = servicesPageTranslations[locale];
  const c = service.content[locale];
  const Icon = serviceIcons[service.id];

  return (
    <article id={service.id} className="scroll-mt-28 grid gap-6 border-b border-line py-10 lg:grid-cols-[64px_1fr_1fr] lg:gap-10">
      <span className="flex size-12 items-center justify-center rounded-lg bg-surface text-signal ring-1 ring-line">
        <Icon className="size-6" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <h3 className="text-2xl font-bold text-ink md:text-3xl">{c.title}</h3>
        <p className="mt-4 max-w-[56ch] leading-7 text-muted">{c.summary}</p>
        <Link
          href={`${localizedPath("/contact", locale)}?service=${service.id}`}
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ink hover:text-signal"
        >
          {t.ask}
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
      <div className="min-w-0">
        <p className="eyebrow text-muted">{t.includes}</p>
        <ul className="mt-4 grid gap-3">
          {c.includes.map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm text-ink">
              <Check className="mt-0.5 size-4 shrink-0 text-ok" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export function ServicesPageView({ locale = "az" }: { locale?: Locale }) {
  const t = servicesPageTranslations[locale];
  const groups = [
    { id: "fire" as const, title: t.fireGroup },
    { id: "construction" as const, title: t.constructionGroup },
  ];

  return (
    <div className="bg-paper">
      <PageHeader eyebrow={t.eyebrow} title={t.title} text={t.text} />

      <Container className="section-spacing">
        {groups.map((group) => {
          const license = licenses.find((item) => item.id === group.id)!;

          return (
            <section key={group.id} className="mb-16 last:mb-0">
              <div className="flex flex-wrap items-baseline justify-between gap-3 border-b-2 border-ink pb-4">
                <h2 className="font-sans text-sm font-semibold tracking-wide text-ink uppercase">{group.title}</h2>
                <span className="text-xs text-muted">
                  {license.kind[locale]} {license.number}
                </span>
              </div>
              {fireServices
                .filter((service) => service.group === group.id)
                .map((service) => (
                  <ServiceRow key={service.id} service={service} locale={locale} />
                ))}
            </section>
          );
        })}
      </Container>

      <section className="border-t border-line">
        <Container className="section-spacing">
          <SectionHeading eyebrow={t.processEyebrow} title={t.processTitle} />
          <div className="mt-10">
            <ProcessSteps locale={locale} />
          </div>
        </Container>
      </section>

      <QuoteBand locale={locale} source="services" />
    </div>
  );
}
