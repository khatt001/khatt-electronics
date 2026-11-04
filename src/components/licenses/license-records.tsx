import Image from "next/image";
import Link from "next/link";

import { formatLicenseDate, licenseIssuer, licenses } from "@/data/licenses";
import { homeCopy } from "@/data/translations/home";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type LicenseRecordsProps = {
  locale: Locale;
  /** Link each thumbnail to the full-size image */
  linkImages?: boolean;
  large?: boolean;
};

export function LicenseRecords({ locale, linkImages = false, large = false }: LicenseRecordsProps) {
  const t = homeCopy[locale];

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {licenses.map((license) => {
        const image = (
          <Image
            src={large ? license.image : license.thumb}
            alt={`${license.kind[locale]} ${license.number}`}
            width={large ? 1240 : 620}
            height={large ? 1754 : 877}
            sizes={large ? "(min-width: 768px) 45vw, 100vw" : "(min-width: 768px) 180px, 120px"}
            className="h-auto w-full"
          />
        );

        return (
          <article
            key={license.id}
            id={license.id}
            className={cn(
              "grid min-w-0 gap-5 border border-line bg-surface p-5 md:p-6",
              large ? "content-start" : "grid-cols-[110px_1fr] md:grid-cols-[150px_1fr]",
            )}
          >
            <div className="overflow-hidden border border-line bg-paper">
              {linkImages ? (
                <a href={license.image} target="_blank" rel="noreferrer" aria-label={license.number}>
                  {image}
                </a>
              ) : (
                image
              )}
            </div>

            <div className="min-w-0">
              <p className="eyebrow text-signal">{license.kind[locale]}</p>
              <p className="mt-3 font-mono text-xl text-ink md:text-2xl">{license.number}</p>

              <dl className="mt-4 grid gap-3 text-sm">
                <div>
                  <dt className="text-xs text-muted">{t.licenseScope}</dt>
                  <dd className="mt-1 leading-6 text-ink">{license.scope[locale]}</dd>
                </div>
                <div className="flex flex-wrap gap-x-6 gap-y-3">
                  <div>
                    <dt className="text-xs text-muted">{t.licenseDate}</dt>
                    <dd className="mt-1 tabular text-ink">{formatLicenseDate(license.issuedAt, locale)}</dd>
                  </div>
                  {large ? (
                    <div className="min-w-0">
                      <dt className="text-xs text-muted">{t.licenseIssuer}</dt>
                      <dd className="mt-1 text-ink">{licenseIssuer[locale]}</dd>
                    </div>
                  ) : null}
                </div>
              </dl>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export function LicensesLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="text-sm font-semibold text-ink underline decoration-brass underline-offset-4 hover:decoration-signal">
      {label}
    </Link>
  );
}
