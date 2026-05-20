import type { Metadata } from "next";
import { TrackOrderPage } from "@/components/order/track-order-page";
import { trackOrderTranslations } from "@/data/translations/track-order";

const t = trackOrderTranslations.ru;

export const metadata: Metadata = {
  title: t.metadataTitle,
  description: t.metadataDescription,
  alternates: {
    canonical: "/ru/track-order",
    languages: {
      az: "/track-order",
      en: "/en/track-order",
      ru: "/ru/track-order",
    },
  },
};

type TrackOrderRouteProps = {
  searchParams: Promise<{
    order?: string;
    phone?: string;
  }>;
};

export default async function RussianTrackOrderRoute({
  searchParams,
}: TrackOrderRouteProps) {
  const query = await searchParams;

  return (
    <TrackOrderPage
      locale="ru"
      orderNumber={query.order ?? ""}
      phone={query.phone ?? ""}
    />
  );
}