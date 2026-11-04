import { Check } from "lucide-react";

import { Container } from "@/components/layout/container";
import { licenses } from "@/data/licenses";
import { homeCopy } from "@/data/translations/home";
import type { Locale } from "@/lib/i18n";

export function ConstructionBand({ locale }: { locale: Locale }) {
  const t = homeCopy[locale];
  const license = licenses.find((item) => item.id === "construction")!;

  return (
    <section className="bg-ink-2 text-white">
      <Container className="section-spacing">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-start">
          <div className="min-w-0">
            <p className="eyebrow text-brass">{t.constructionEyebrow}</p>
            <h2 className="mt-4 font-display text-3xl leading-[1.12] font-medium md:text-[2.75rem]">
              {t.constructionTitle}
            </h2>
            <p className="mt-6 max-w-[60ch] leading-8 text-white/70">{t.constructionText}</p>
          </div>

          <div className="min-w-0 border border-white/12">
            <div className="flex items-center justify-between gap-4 border-b border-white/12 px-6 py-4">
              <span className="text-sm text-white/60">{license.kind[locale]}</span>
              <span className="font-mono text-white">{license.number}</span>
            </div>
            <p className="border-b border-white/12 px-6 py-5 text-sm leading-6 text-white/80">
              {license.scope[locale]}
            </p>
            <ul className="grid gap-4 px-6 py-6">
              {t.constructionPoints.map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm text-white/85">
                  <Check className="mt-0.5 size-4 shrink-0 text-brass" aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
