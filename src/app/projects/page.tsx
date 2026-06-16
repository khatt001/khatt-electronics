import { ProjectsPageView } from "@/components/projects/projects-page-view";
import { generateStaticPageMetadata } from "@/lib/page-metadata";

export const metadata = generateStaticPageMetadata({
  page: "projects",
  locale: "az",
});

export default function ProjectsPage() {
  return <ProjectsPageView locale="az" />;
}
