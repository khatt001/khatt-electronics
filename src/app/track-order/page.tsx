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
  locale: "az",
});

export default async function TrackOrderRoute({
  searchParams,
}: TrackOrderRouteProps) {
  const query = await searchParams;

  return (
    <TrackOrderPage
      locale="az"
      orderNumber={query.order ?? ""}
      phone={query.phone ?? ""}
    />
  );
}