import { ProjectsPageView } from "@/components/projects/projects-page-view";
import { generateStaticPageMetadata } from "@/lib/page-metadata";

export const metadata = generateStaticPageMetadata({
  page: "projects",
  locale: "ru",
});

export default function RussianProjectsPage() {
  return <ProjectsPageView locale="ru" />;
}
