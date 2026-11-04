import Link from "next/link";

import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/shared/page-header";
import { QuoteBand } from "@/components/shared/quote-band";
import { licenses } from "@/data/licenses";
import { siteConfig } from "@/data/site";
import { aboutTranslations } from "@/data/translations/about";
import { localizedPath, type Locale } from "@/lib/i18n";

export function AboutPageView({ locale = "az" }: { locale?: Locale }) {
  const t = aboutTranslations[locale];

  return (
    <div className="bg-paper">
      <PageHeader eyebrow={t.eyebrow} title={t.title} text={t.lead} />

      <Container className="section-spacing grid gap-14 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="min-w-0">
          <h2 className="font-display text-3xl font-medium text-ink">{t.principlesTitle}</h2>
          <ul className="mt-8 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
            {t.principles.map((item) => (
              <li key={item.title} className="bg-surface p-6">
                <h3 className="font-sans text-base font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{item.text}</p>
              </li>
            ))}
          </ul>
        </section>

        <aside className="min-w-0 self-start border border-line bg-surface p-6 md:p-8">
          <h2 className="font-sans text-lg font-semibold text-ink">{t.detailsTitle}</h2>
          <dl className="mt-6 grid gap-4 text-sm">
            <div>
              <dt className="text-xs text-muted">{t.name}</dt>
              <dd className="mt-1 text-ink">{siteConfig.legalName}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted">{t.tax}</dt>
              <dd className="mt-1 font-mono text-ink">{siteConfig.taxId}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted">{t.address}</dt>
              <dd className="mt-1 text-ink">{siteConfig.legalAddress}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted">{t.licensesRow}</dt>
              <dd className="mt-2 grid gap-2">
                {licenses.map((license) => (
                  <Link
                    key={license.id}
                    href={`${localizedPath("/licenses", locale)}#${license.id}`}
                    className="flex items-center justify-between gap-3 border border-line px-3 py-2 transition hover:border-ink"
                  >
                    <span className="text-ink">{license.short[locale]}</span>
                    <span className="font-mono text-xs text-muted">{license.number}</span>
                  </Link>
                ))}
              </dd>
            </div>
          </dl>
        </aside>
      </Container>

      <QuoteBand locale={locale} source="about" />
    </div>
  );
}
