import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { ConstructionBand } from "@/components/home/construction-band";
import { FeaturedProducts } from "@/components/home/featured-products";
import { HomeHero } from "@/components/home/home-hero";
import { ServicesIndex } from "@/components/home/services-index";
import { Container } from "@/components/layout/container";
import { LicenseRecords } from "@/components/licenses/license-records";
import { ObjectTypes } from "@/components/shared/object-types";
import { ProcessSteps } from "@/components/shared/process-steps";
import { QuoteBand } from "@/components/shared/quote-band";
import { SectionHeading } from "@/components/shared/section-heading";
import { homeCopy } from "@/data/translations/home";
import { localizedPath, type Locale } from "@/lib/i18n";

function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="group inline-flex items-center gap-2 text-sm font-semibold text-ink hover:text-signal">
      {children}
      <ArrowUpRight
        className="size-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        aria-hidden="true"
      />
    </Link>
  );
}

export function HomePageContent({ locale }: { locale: Locale }) {
  const t = homeCopy[locale];

  return (
    <div className="bg-paper">
      <HomeHero locale={locale} />

      <section>
        <Container className="section-spacing">
          <SectionHeading
            eyebrow={t.licensesEyebrow}
            title={t.licensesTitle}
            text={t.licensesText}
            action={<TextLink href={localizedPath("/licenses", locale)}>{t.licensesLink}</TextLink>}
          />
          <div className="mt-10">
            <LicenseRecords locale={locale} />
          </div>
        </Container>
      </section>

      <section className="border-t border-line">
        <Container className="section-spacing">
          <SectionHeading
            eyebrow={t.servicesEyebrow}
            title={t.servicesTitle}
            text={t.servicesText}
            action={<TextLink href={localizedPath("/services", locale)}>{t.servicesLink}</TextLink>}
          />
          <div className="mt-10">
            <ServicesIndex locale={locale} />
          </div>
        </Container>
      </section>

      <ConstructionBand locale={locale} />

      <section>
        <Container className="section-spacing">
          <SectionHeading eyebrow={t.processEyebrow} title={t.processTitle} />
          <div className="mt-10">
            <ProcessSteps locale={locale} />
          </div>
        </Container>
      </section>

      <section className="border-t border-line">
        <Container className="section-spacing">
          <SectionHeading
            eyebrow={t.objectsEyebrow}
            title={t.objectsTitle}
            action={<TextLink href={localizedPath("/projects", locale)}>{t.objectsLink}</TextLink>}
          />
          <div className="mt-10">
            <ObjectTypes locale={locale} />
          </div>
        </Container>
      </section>

      <FeaturedProducts locale={locale} />

      <QuoteBand locale={locale} source="home" />
    </div>
  );
}
