import { TrackOrderPage } from "@/components/order/track-order-page";
import { generateStaticPageMetadata } from "@/lib/page-metadata";

type TrackOrderRouteProps = {
  searchParams: Promise<{
    order?: string;
    phone?: string;
  }>;
};

export const metadata = generateStaticPageMetadata({
  page: "track-order",
  locale: "en",
});

export default async function EnglishTrackOrderRoute({
  searchParams,
}: TrackOrderRouteProps) {
  const query = await searchParams;

  return (
    <TrackOrderPage
      locale="en"
      orderNumber={query.order ?? ""}
      phone={query.phone ?? ""}
    />
  );
}
