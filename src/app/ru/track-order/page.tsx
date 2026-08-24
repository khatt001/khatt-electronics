import { TrackOrderPage } from "@/components/order/track-order-page";
import { generateStaticPageMetadata } from "@/lib/page-metadata";

type TrackOrderRouteProps = {
 searchParams: Promise<{
  order?: string;
  phone?: string;
  "cf-turnstile-response"?: string;
}>;
};

export const metadata = generateStaticPageMetadata({
  page: "track-order",
  locale: "ru",
});

export default async function RussianTrackOrderRoute({
  searchParams,
}: TrackOrderRouteProps) {
  const query = await searchParams;

  return (
    <TrackOrderPage
      locale="ru"
      orderNumber={query.order ?? ""}
      phone={query.phone ?? ""}
      turnstileToken={query["cf-turnstile-response"] ?? ""}
    />
  );
}
