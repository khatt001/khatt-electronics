import { AboutPageView } from "@/components/about/about-page-view";
import { generateStaticPageMetadata } from "@/lib/page-metadata";

export const metadata = generateStaticPageMetadata({
  page: "about",
  locale: "en",
});

export default function EnglishAboutPage() {
  return <AboutPageView locale="en" />;
}
