import { ProjectsPageView } from "@/components/projects/projects-page-view";
import { generateStaticPageMetadata } from "@/lib/page-metadata";

export const metadata = generateStaticPageMetadata({
  page: "projects",
  locale: "en",
});

export default function EnglishProjectsPage() {
  return <ProjectsPageView locale="en" />;
}