import { Container } from "@/components/layout/container";
import { ObjectTypes } from "@/components/shared/object-types";
import { PageHeader } from "@/components/shared/page-header";
import { QuoteBand } from "@/components/shared/quote-band";
import { projectsTranslations } from "@/data/translations/projects";
import type { Locale } from "@/lib/i18n";

export function ProjectsPageView({ locale = "az" }: { locale?: Locale }) {
  const t = projectsTranslations[locale];

  return (
    <div className="bg-paper">
      <PageHeader eyebrow={t.eyebrow} title={t.title} text={t.text} />
      <Container className="section-spacing">
        <ObjectTypes locale={locale} />
      </Container>
      <QuoteBand locale={locale} source="project" />
    </div>
  );
}
