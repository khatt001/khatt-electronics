import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Container } from "@/components/layout/container";
import { LicenseRecords } from "@/components/licenses/license-records";
import { PageHeader } from "@/components/shared/page-header";
import { siteConfig } from "@/data/site";
import { licensesTranslations } from "@/data/translations/licenses";
import { localizedPath, type Locale } from "@/lib/i18n";

export function LicensesPageView({ locale }: { locale: Locale }) {
  const t = licensesTranslations[locale];

  return (
    <div className="bg-paper">
      <PageHeader eyebrow={t.eyebrow} title={t.title} text={t.text} />

      <Container className="section-spacing grid gap-10">
        <LicenseRecords locale={locale} linkImages large />

        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="min-w-0 border border-line bg-surface p-6 md:p-8">
            <h2 className="font-sans text-lg font-semibold text-ink">{t.holderTitle}</h2>
            <dl className="mt-5 grid gap-4 text-sm">
              <div>
                <dt className="text-xs text-muted">{t.holderName}</dt>
                <dd className="mt-1 text-ink">{siteConfig.legalName}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted">{t.holderTax}</dt>
                <dd className="mt-1 font-mono text-ink">{siteConfig.taxId}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted">{t.holderAddress}</dt>
                <dd className="mt-1 text-ink">{siteConfig.legalAddress}</dd>
              </div>
            </dl>
          </div>

          <div className="flex min-w-0 flex-col justify-between gap-6 border-l-2 border-signal bg-surface p-6 md:p-8">
            <p className="leading-7 text-muted">{t.note}</p>
            <Link
              href={`${localizedPath("/contact", locale)}?source=license_copy`}
              className="inline-flex min-h-12 w-fit items-center gap-2 rounded-md bg-ink px-6 text-sm font-semibold text-white transition hover:bg-ink-3"
            >
              {t.noteButton}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
