import type { Metadata } from "next";
import {
  ProductsPageView,
  type ProductsSearchParams,
} from "@/components/product/products-page-view";
import { productsTranslations } from "@/data/translations/products";

type ProductsPageProps = {
  searchParams: Promise<ProductsSearchParams>;
};

const t = productsTranslations.ru;

export async function generateMetadata({
  searchParams,
}: ProductsPageProps): Promise<Metadata> {
  const query = await searchParams;

  const hasQuery = Object.values(query).some((value) => {
    if (Array.isArray(value)) return value.length > 0;
    return Boolean(value);
  });

  return {
    title: t.metadataTitle,
    description: t.metadataDescription,
    alternates: {
      canonical: "/ru/products",
      languages: {
        az: "/products",
        en: "/en/products",
        ru: "/ru/products",
      },
    },
    robots: hasQuery
      ? {
          index: false,
          follow: true,
        }
      : {
          index: true,
          follow: true,
        },
    openGraph: {
      title: t.openGraphTitle,
      description: t.openGraphDescription,
      url: "/ru/products",
      type: "website",
    },
  };
}

export default async function RussianProductsPage({
  searchParams,
}: ProductsPageProps) {
  const query = await searchParams;

  return <ProductsPageView query={query} locale="ru" />;
}