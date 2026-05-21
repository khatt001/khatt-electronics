import {
  ContactPageView,
  type ContactSearchParams,
} from "@/components/contact/contact-page-view";
import { generateStaticPageMetadata } from "@/lib/page-metadata";

type ContactPageProps = {
  searchParams: Promise<ContactSearchParams>;
};

export const metadata = generateStaticPageMetadata({
  page: "contact",
  locale: "en",
});

export default async function EnglishContactPage({
  searchParams,
}: ContactPageProps) {
  const query = await searchParams;

  return <ContactPageView query={query} locale="en" />;
}