import type { Metadata } from "next";
import { getProductBySlug, type ProductLocale } from "@/services/products";
import { productDetailTranslations } from "@/data/translations/product-detail";
import { productsTranslations } from "@/data/translations/products";
import type { ProductsSearchParams } from "@/components/product/products-page-view";
import { localizedPath } from "@/lib/i18n";
import { getCategoryBySlug } from "@/services/categories";
import { categoryPageTranslations } from "@/data/translations/category-page";
import type { CategorySearchParams } from "@/components/category/category-page-view";
import type { Locale } from "@/lib/i18n";
import { aboutTranslations } from "@/data/translations/about";
import { servicesPageTranslations } from "@/data/translations/services-page";
import { solutionsPageTranslations } from "@/data/translations/solutions-page";
import { cartTranslations } from "@/data/translations/cart";
import { favoritesTranslations } from "@/data/translations/favorites";
import { contactTranslations } from "@/data/translations/contact";
import { compareTranslations } from "@/data/translations/compare";
import { checkoutTranslations } from "@/data/translations/checkout";
import { checkoutSuccessTranslations } from "@/data/translations/checkout-success";
import { trackOrderTranslations } from "@/data/translations/track-order";
import { projectsTranslations } from "@/data/translations/projects";

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
}export async function generateCategoryPageMetadata({
  slug,
  query,
  locale,
}: {
  slug: string;
  query: CategorySearchParams;
  locale: ProductLocale;
}): Promise<Metadata> {
  const category = await getCategoryBySlug(slug, locale);
  const t = categoryPageTranslations[locale];

  if (!category) {
    return {
      title: t.notFoundTitle,
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const queryActive = Object.values(query).some((value) => {
    if (Array.isArray(value)) return value.length > 0;
    return Boolean(value);
  });

  const categoryPath = localizedPath(`/category/${category.slug}`, locale);

  return {
    title: category.seoTitle ?? `${category.name} ${t.metadataProductsSuffix}`,
    description:
      category.seoDescription ??
      category.description ??
      `${category.name} ${t.metadataFallbackSuffix}`,
    alternates: {
      canonical: categoryPath,
      languages: {
        az: `/category/${category.slug}`,
        en: `/en/category/${category.slug}`,
        ru: `/ru/category/${category.slug}`,
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
  };
}
type StaticPageKey =
  | "about"
  | "services"
  | "solutions"
  | "cart"
  | "favorites"
  | "contact"
  | "compare"
  | "checkout"
  | "track-order"
  | "projects";
const staticPageTranslations = {
  about: aboutTranslations,
  services: servicesPageTranslations,
  solutions: solutionsPageTranslations,
  cart: cartTranslations,
  favorites: favoritesTranslations,
  contact: contactTranslations,
  compare: compareTranslations,
  checkout: checkoutTranslations,
  "track-order": trackOrderTranslations,
  projects: projectsTranslations,
} as const;

function getStaticPagePath(page: StaticPageKey) {
  return `/${page}`;
}

export function generateStaticPageMetadata({
  page,
  locale,
}: {
  page: StaticPageKey;
  locale: Locale;
}): Metadata {
  const translations = staticPageTranslations[page];
  const t = translations[locale];
  const path = getStaticPagePath(page);
  const canonical = localizedPath(path, locale);

  return {
    title: t.metadataTitle,
    description: t.metadataDescription,
    alternates: {
      canonical,
      languages: {
        az: path,
        en: `/en${path}`,
        ru: `/ru${path}`,
      },
    },
  };
}
export function generateCheckoutSuccessMetadata({
  locale,
}: {
  locale: Locale;
}): Metadata {
  const t = checkoutSuccessTranslations[locale];
  const path = "/checkout/success";
  const canonical = localizedPath(path, locale);

  return {
    title: t.metadataTitle,
    description: t.metadataDescription,
    alternates: {
      canonical,
      languages: {
        az: path,
        en: `/en${path}`,
        ru: `/ru${path}`,
      },
    },
  };
}