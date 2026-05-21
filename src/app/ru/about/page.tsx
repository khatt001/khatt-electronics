import { AboutPageView } from "@/components/about/about-page-view";
import { generateStaticPageMetadata } from "@/lib/page-metadata";

export const metadata = generateStaticPageMetadata({
  page: "about",
  locale: "ru",
});

export default function RussianAboutPage() {
  return <AboutPageView locale="ru" />;
}