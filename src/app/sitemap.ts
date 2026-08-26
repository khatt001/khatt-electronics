import type { MetadataRoute } from "next";

import { getBaseUrl } from "@/lib/seo";
import {
  getSitemapCategories,
  getSitemapProducts,
} from "@/services/sitemap";

type SitemapEntry = MetadataRoute.Sitemap[number];

const locales = ["az", "en", "ru"] as const;

type SitemapLocale = (typeof locales)[number];

function createUrl(path: string) {
  const baseUrl = getBaseUrl();

  return `${baseUrl}${path}`;
}

function localizedPath(path: string, locale: SitemapLocale) {
  if (locale === "az") {
    return path;
  }

  if (path === "/") {
    return `/${locale}`;
  }

  return `/${locale}${path}`;
}

function createLanguageAlternates(path: string) {
  return {
    az: createUrl(localizedPath(path, "az")),
    en: createUrl(localizedPath(path, "en")),
    ru: createUrl(localizedPath(path, "ru")),
    "x-default": createUrl(localizedPath(path, "az")),
  };
}

function createLocalizedEntries({
  path,
  lastModified,
  changeFrequency,
  priority,
}: {
  path: string;
  lastModified: Date;
  changeFrequency: SitemapEntry["changeFrequency"];
  priority: number;
}): MetadataRoute.Sitemap {
  const languages = createLanguageAlternates(path);

  return locales.map((locale) => ({
    url: createUrl(localizedPath(path, locale)),
    lastModified,
    changeFrequency,
    priority,
    alternates: {
      languages,
    },
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, categories] = await Promise.all([
    getSitemapProducts(),
    getSitemapCategories(),
  ]);

  const now = new Date();

  const staticPages = [
    {
      path: "/",
      changeFrequency: "daily",
      priority: 1,
    },
    {
      path: "/products",
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      path: "/services",
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      path: "/solutions",
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      path: "/projects",
      changeFrequency: "weekly",
      priority: 0.75,
    },
    {
      path: "/about",
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      path: "/contact",
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ] as const;

  const staticEntries = staticPages.flatMap((page) =>
    createLocalizedEntries({
      path: page.path,
      lastModified: now,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    }),
  );

  const categoryEntries = categories.flatMap((category) =>
    createLocalizedEntries({
      path: `/category/${category.slug}`,
      lastModified: category.updated_at
        ? new Date(category.updated_at)
        : now,
      changeFrequency: "weekly",
      priority: 0.8,
    }),
  );

  const productEntries = products.flatMap((product) =>
    createLocalizedEntries({
      path: `/products/${product.slug}`,
      lastModified: product.updated_at
        ? new Date(product.updated_at)
        : now,
      changeFrequency: "weekly",
      priority: 0.9,
    }),
  );

  return [
    ...staticEntries,
    ...categoryEntries,
    ...productEntries,
  ];
}