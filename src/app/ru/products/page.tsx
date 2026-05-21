import type { Metadata } from "next";
import {
  ProductsPageView,
  type ProductsSearchParams,
} from "@/components/product/products-page-view";
import { generateProductsListingMetadata } from "@/lib/page-metadata";

type ProductsPageProps = {
  searchParams: Promise<ProductsSearchParams>;
};

export async function generateMetadata({
  searchParams,
}: ProductsPageProps): Promise<Metadata> {
  const query = await searchParams;

  return generateProductsListingMetadata({
    query,
    locale: "ru",
  });
}

export default async function RussianProductsPage({
  searchParams,
}: ProductsPageProps) {
  const query = await searchParams;

  return <ProductsPageView query={query} locale="ru" />;
}