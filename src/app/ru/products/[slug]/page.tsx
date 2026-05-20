import type { Metadata } from "next";
import { getProductBySlug } from "@/services/products";
import { ProductDetailPageView } from "@/components/product/product-detail-page";
import { productDetailTranslations } from "@/data/translations/product-detail";

type ProductDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  const t = productDetailTranslations.ru;

  if (!product) {
    return {
      title: t.notFoundTitle,
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = product.seoTitle ?? product.name;
  const description =
    product.seoDescription ??
    product.shortDescription ??
    `${product.name} — ${t.productPageSuffix}`;

  const imageUrl = product.images[0]?.url;

  return {
    title,
    description,
    alternates: {
      canonical: `/ru/products/${product.slug}`,
      languages: {
        az: `/products/${product.slug}`,
        en: `/en/products/${product.slug}`,
        ru: `/ru/products/${product.slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `/ru/products/${product.slug}`,
      type: "website",
      images: imageUrl
        ? [
            {
              url: imageUrl,
              alt: product.name,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
}

export default async function RussianProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { slug } = await params;

  return <ProductDetailPageView slug={slug} locale="ru" />;
}