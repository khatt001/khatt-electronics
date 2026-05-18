import { createServerSupabaseClient } from "@/lib/supabase/server";

export type CatalogBrand = {
  id: string;
  name: string;
  slug: string;
};

export async function getCatalogBrands(): Promise<CatalogBrand[]> {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("brands")
    .select("id, name, slug")
    .eq("is_active", true)
    .order("name", { ascending: true });

  if (error) {
    console.error("Failed to fetch brands:", error.message);
    return [];
  }

  return data.map((brand) => ({
    id: brand.id,
    name: brand.name,
    slug: brand.slug,
  }));
}