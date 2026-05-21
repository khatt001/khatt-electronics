import type { Metadata } from "next";
import { ProductDetailPageView } from "@/components/product/product-detail-page";
import { generateProductDetailMetadata } from "@/lib/page-metadata";

type ProductDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;

  return generateProductDetailMetadata({
    slug,
    locale: "az",
  });
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { slug } = await params;

  return <ProductDetailPageView slug={slug} locale="az" />;
}