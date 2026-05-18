import type { MetadataRoute } from "next";
import { createServerSupabaseClient } from "@/lib/supabase/server";

function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const supabase = createServerSupabaseClient();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${siteUrl}/products`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const { data: products } = await supabase
    .from("products")
    .select("slug, updated_at, created_at")
    .eq("status", "active")
    .order("created_at", { ascending: false })
    .limit(500)
    .returns<
      {
        slug: string;
        updated_at: string | null;
        created_at: string;
      }[]
    >();

  const productRoutes: MetadataRoute.Sitemap =
    products?.map((product) => ({
      url: `${siteUrl}/products/${product.slug}`,
      lastModified: product.updated_at ?? product.created_at,
      changeFrequency: "weekly",
      priority: 0.8,
    })) ?? [];

  return [...staticRoutes, ...productRoutes];
}