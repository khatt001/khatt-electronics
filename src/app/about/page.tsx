import { AboutPageView } from "@/components/about/about-page-view";
import { generateStaticPageMetadata } from "@/lib/page-metadata";

export const metadata = generateStaticPageMetadata({
  page: "about",
  locale: "az",
});

export default function AboutPage() {
  return <AboutPageView locale="az" />;
}