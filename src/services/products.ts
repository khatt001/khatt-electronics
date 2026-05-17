import { createServerSupabaseClient } from "@/lib/supabase/server";

export type FeaturedProduct = {
  id: string;
  name: string;
  category: string;
  price: string;
  badge: string;
  href: string;
};

export async function getFeaturedProducts(): Promise<FeaturedProduct[]> {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("products")
    .select(
      `
      id,
      name_az,
      slug,
      price,
      price_visible,
      is_featured,
      stock_status,
      categories (
        name_az
      )
    `
    )
    .eq("status", "active")
    .eq("is_featured", true)
    .order("created_at", { ascending: false })
    .limit(8);

  if (error) {
    console.error("Failed to fetch featured products:", error.message);
    return [];
  }

  return data.map((product) => {
    const price =
      product.price_visible && product.price
        ? `${Number(product.price).toFixed(2)} AZN`
        : "Qiymət sorğu ilə";

    return {
      id: product.id,
      name: product.name_az,
      category: product.categories?.name_az ?? "Məhsul",
      price,
      badge: product.stock_status === "in_stock" ? "Stokda var" : "Sorğu ilə",
      href: `/products/${product.slug}`,
    };
  });
}