import { createServerSupabaseClient } from "@/lib/supabase/server";

export type CatalogCategory = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
};

export async function getCatalogCategories(): Promise<CatalogCategory[]> {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("categories")
    .select("id, name_az, slug, description_az")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Failed to fetch categories:", error.message);
    return [];
  }

  return data.map((category) => ({
    id: category.id,
    name: category.name_az,
    slug: category.slug,
    description: category.description_az,
  }));
}