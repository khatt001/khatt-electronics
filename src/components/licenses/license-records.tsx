import { LicenseViewer } from "@/components/licenses/license-viewer";
import { formatLicenseDate, licenseIssuer, licenses } from "@/data/licenses";
import { homeCopy } from "@/data/translations/home";
import type { Locale } from "@/lib/i18n";

const viewerLabels = {
  az: { open: "Böyüt", close: "Bağla" },
  en: { open: "Enlarge", close: "Close" },
  ru: { open: "Увеличить", close: "Закрыть" },
} as const;

type LicenseRecordsProps = {
  locale: Locale;
  /** Full layout for the licenses page; compact for the home page */
  large?: boolean;
};

export function LicenseRecords({ locale, large = false }: LicenseRecordsProps) {
  const t = homeCopy[locale];
  const labels = viewerLabels[locale];

  return (
    <div className={large ? "grid gap-8" : "grid gap-6 md:grid-cols-2"}>
      {licenses.map((license, index) => {
        const alt = `${license.kind[locale]} ${license.number}`;

        const rows = [
          { label: t.licenseScope, value: license.scope[locale] },
          { label: t.licenseDate, value: formatLicenseDate(license.issuedAt, locale), tabular: true },
          ...(large ? [{ label: t.licenseIssuer, value: licenseIssuer[locale] }] : []),
        ];

        return (
          <article
            key={license.id}
            id={license.id}
            className={
              large
                ? "grid scroll-mt-32 gap-8 border border-line bg-surface p-5 md:grid-cols-[minmax(0,320px)_1fr] md:gap-12 md:p-10"
                : "grid min-w-0 grid-cols-[112px_1fr] gap-5 border border-line bg-surface p-5 md:grid-cols-[148px_1fr] md:gap-7 md:p-7"
            }
          >
            <div className={large ? "mx-auto w-full max-w-[320px] bg-paper p-4 md:p-5" : "bg-paper p-2.5"}>
              <LicenseViewer
                image={license.image}
                thumb={license.thumb}
                alt={alt}
                openLabel={labels.open}
                closeLabel={labels.close}
                sizes={large ? "320px" : "(min-width: 768px) 148px, 112px"}
                priority={large && index === 0}
                showLabel={large}
              />
            </div>

            <div className="min-w-0 self-center">
              <p className="eyebrow text-signal">{license.kind[locale]}</p>
              <p className={large ? "mt-3 text-3xl text-ink md:text-4xl" : "mt-2 text-xl text-ink md:text-2xl"}>
                {license.number}
              </p>

              <dl className={large ? "mt-8 border-t border-line" : "mt-4 grid gap-3"}>
                {rows.map((row) =>
                  large ? (
                    <div key={row.label} className="grid gap-1 border-b border-line py-4 sm:grid-cols-[160px_1fr] sm:gap-6">
                      <dt className="text-xs text-muted sm:pt-0.5">{row.label}</dt>
                      <dd className={row.tabular ? "tabular text-ink" : "leading-7 text-ink"}>{row.value}</dd>
                    </div>
                  ) : (
                    <div key={row.label}>
                      <dt className="text-xs text-muted">{row.label}</dt>
                      <dd className={row.tabular ? "mt-1 tabular text-sm text-ink" : "mt-1 text-sm leading-6 text-ink"}>{row.value}</dd>
                    </div>
                  ),
                )}
              </dl>
            </div>
          </article>
        );
      })}
    </div>
  );
}
