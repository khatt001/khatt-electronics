import type { MetadataRoute } from "next";
import { getBaseUrl } from "@/lib/seo";
import { getSitemapCategories, getSitemapProducts } from "@/services/sitemap";

function createUrl(path: string) {
  const baseUrl = getBaseUrl();
  return `${baseUrl}${path}`;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, categories] = await Promise.all([
    getSitemapProducts(),
    getSitemapCategories(),
  ]);

  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: createUrl("/"),
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: createUrl("/products"),
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: createUrl("/services"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: createUrl("/solutions"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.75,
    },
    {
      url: createUrl("/projects"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.75,
    },
    {
      url: createUrl("/about"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.65,
    },
    {
      url: createUrl("/contact"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.65,
    },
    {
      url: createUrl("/track-order"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.45,
    },
    {
      url: createUrl("/favorites"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.35,
    },
    {
      url: createUrl("/compare"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
    },
  ];

  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: createUrl(`/products/${product.slug}`),
    lastModified: product.updated_at ? new Date(product.updated_at) : now,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const categoryPages: MetadataRoute.Sitemap = categories.map((category) => ({
    url: createUrl(`/category/${category.slug}`),
    lastModified: category.updated_at ? new Date(category.updated_at) : now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticPages, ...categoryPages, ...productPages];
}
