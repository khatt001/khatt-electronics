import "server-only";
import { supabaseAdmin } from "@/lib/supabase/admin";

export type SitemapProduct = {
  slug: string;
  updated_at: string | null;
};

export type SitemapCategory = {
  slug: string;
  updated_at: string | null;
};

export async function getSitemapProducts(): Promise<SitemapProduct[]> {
  const { data, error } = await supabaseAdmin
    .from("products")
    .select("slug, updated_at")
    .eq("status", "active")
    .order("updated_at", { ascending: false })
    .returns<SitemapProduct[]>();

  if (error || !data) {
    return [];
  }

  return data;
}

export async function getSitemapCategories(): Promise<SitemapCategory[]> {
  const { data, error } = await supabaseAdmin
    .from("categories")
    .select("slug, updated_at")
    .eq("is_active", true)
    .order("updated_at", { ascending: false })
    .returns<SitemapCategory[]>();

  if (error || !data) {
    return [];
  }

  return data;
}
