import type { Metadata } from "next";
import { getProductBySlug, type ProductLocale } from "@/services/products";
import { productDetailTranslations } from "@/data/translations/product-detail";
import { productsTranslations } from "@/data/translations/products";
import type { ProductsSearchParams } from "@/components/product/products-page-view";
import { localizedPath } from "@/lib/i18n";

function hasSearchQuery(query: Record<string, string | string[] | undefined>) {
  return Object.values(query).some((value) => {
    if (Array.isArray(value)) return value.length > 0;
    return Boolean(value);
  });
}

export async function generateProductDetailMetadata({
  slug,
  locale,
}: {
  slug: string;
  locale: ProductLocale;
}): Promise<Metadata> {
  const product = await getProductBySlug(slug, locale);
  const t = productDetailTranslations[locale];

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
  const productPath = localizedPath(`/products/${product.slug}`, locale);

  return {
    title,
    description,
    alternates: {
      canonical: productPath,
      languages: {
        az: `/products/${product.slug}`,
        en: `/en/products/${product.slug}`,
        ru: `/ru/products/${product.slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: productPath,
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

export function generateProductsListingMetadata({
  query,
  locale,
}: {
  query: ProductsSearchParams;
  locale: ProductLocale;
}): Metadata {
  const t = productsTranslations[locale];
  const productsPath = localizedPath("/products", locale);
  const queryActive = hasSearchQuery(query);

  return {
    title: t.metadataTitle,
    description: t.metadataDescription,
    alternates: {
      canonical: productsPath,
      languages: {
        az: "/products",
        en: "/en/products",
        ru: "/ru/products",
      },
    },
    robots: queryActive
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
      url: productsPath,
      type: "website",
    },
  };
}