import type { Metadata } from "next";

import type { CategorySearchParams } from "@/components/category/category-page-view";
import type { ProductsSearchParams } from "@/components/product/products-page-view";
import { aboutTranslations } from "@/data/translations/about";
import { cartTranslations } from "@/data/translations/cart";
import { categoryPageTranslations } from "@/data/translations/category-page";
import { checkoutSuccessTranslations } from "@/data/translations/checkout-success";
import { checkoutTranslations } from "@/data/translations/checkout";
import { compareTranslations } from "@/data/translations/compare";
import { contactTranslations } from "@/data/translations/contact";
import { favoritesTranslations } from "@/data/translations/favorites";
import { productDetailTranslations } from "@/data/translations/product-detail";
import { productsTranslations } from "@/data/translations/products";
import { projectsTranslations } from "@/data/translations/projects";
import { servicesPageTranslations } from "@/data/translations/services-page";
import { solutionsPageTranslations } from "@/data/translations/solutions-page";
import { trackOrderTranslations } from "@/data/translations/track-order";
import { localizedPath, type Locale } from "@/lib/i18n";
import { getCategoryBySlug } from "@/services/categories";
import {
  getProductBySlug,
  type ProductLocale,
} from "@/services/products";

function normalizeMetadataTitle(title: string) {
  return title
    .replace(/\s*\|\s*KHATT Electronics\s*$/i, "")
    .trim();
}

function hasSearchQuery(
  query: Record<string, string | string[] | undefined>,
) {
  return Object.values(query).some((value) => {
    if (Array.isArray(value)) {
      return value.length > 0;
    }

    return Boolean(value);
  });
}

function createLanguageAlternates(path: string) {
  return {
    az: path,
    en: `/en${path}`,
    ru: `/ru${path}`,
    "x-default": path,
  };
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

  const title = normalizeMetadataTitle(
    product.seoTitle ?? product.name,
  );

  const description =
    product.seoDescription ??
    product.shortDescription ??
    `${product.name} — ${t.productPageSuffix}`;

  const imageUrl = product.images[0]?.url;
  const basePath = `/products/${product.slug}`;
  const productPath = localizedPath(basePath, locale);

  return {
    title,
    description,

    alternates: {
      canonical: productPath,
      languages: createLanguageAlternates(basePath),
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
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
  const title = normalizeMetadataTitle(t.metadataTitle);
  const basePath = "/products";
  const productsPath = localizedPath(basePath, locale);
  const queryActive = hasSearchQuery(query);

  return {
    title,
    description: t.metadataDescription,

    alternates: {
      canonical: productsPath,
      languages: createLanguageAlternates(basePath),
    },

    robots: {
      index: !queryActive,
      follow: true,
      googleBot: {
        index: !queryActive,
        follow: true,
      },
    },

    openGraph: {
      title: t.openGraphTitle,
      description: t.openGraphDescription,
      url: productsPath,
      type: "website",
    },
  };
}

export async function generateCategoryPageMetadata({
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

  const queryActive = hasSearchQuery(query);

  const title = normalizeMetadataTitle(
    category.seoTitle ??
      `${category.name} ${t.metadataProductsSuffix}`,
  );

  const description =
    category.seoDescription ??
    category.description ??
    `${category.name} ${t.metadataFallbackSuffix}`;

  const basePath = `/category/${category.slug}`;
  const categoryPath = localizedPath(basePath, locale);

  return {
    title,
    description,

    alternates: {
      canonical: categoryPath,
      languages: createLanguageAlternates(basePath),
    },

    robots: {
      index: !queryActive,
      follow: true,
      googleBot: {
        index: !queryActive,
        follow: true,
      },
    },

    openGraph: {
      title,
      description,
      url: categoryPath,
      type: "website",
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

const noIndexStaticPages = new Set<StaticPageKey>([
  "cart",
  "favorites",
  "compare",
  "checkout",
  "track-order",
]);

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
  const title = normalizeMetadataTitle(t.metadataTitle);
  const path = getStaticPagePath(page);
  const canonical = localizedPath(path, locale);
  const shouldIndex = !noIndexStaticPages.has(page);

  return {
    title,
    description: t.metadataDescription,

    alternates: {
      canonical,
      languages: shouldIndex
        ? createLanguageAlternates(path)
        : undefined,
    },

    robots: {
      index: shouldIndex,
      follow: shouldIndex,
      googleBot: {
        index: shouldIndex,
        follow: shouldIndex,
      },
    },

    openGraph: shouldIndex
      ? {
          title,
          description: t.metadataDescription,
          url: canonical,
          type: "website",
        }
      : undefined,
  };
}

export function generateCheckoutSuccessMetadata({
  locale,
}: {
  locale: Locale;
}): Metadata {
  const t = checkoutSuccessTranslations[locale];
  const title = normalizeMetadataTitle(t.metadataTitle);
  const path = "/checkout/success";
  const canonical = localizedPath(path, locale);

  return {
    title,
    description: t.metadataDescription,

    alternates: {
      canonical,
    },

    robots: {
      index: false,
      follow: false,
      googleBot: {
        index: false,
        follow: false,
      },
    },
  };
}