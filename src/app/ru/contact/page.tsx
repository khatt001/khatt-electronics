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
  locale: "ru",
});

export default async function RussianContactPage({
  searchParams,
}: ContactPageProps) {
  const query = await searchParams;

  return <ContactPageView query={query} locale="ru" />;
}