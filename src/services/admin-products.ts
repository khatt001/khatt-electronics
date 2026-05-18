import "server-only";
import { supabaseAdmin } from "@/lib/supabase/admin";

export type AdminProductListItem = {
  id: string;
  name: string;
  slug: string;
  category: string;
  brand: string | null;
  status: string;
  stockStatus: string;
  isFeatured: boolean;
  price: string;
  createdAt: string;
};

type AdminProductRow = {
  id: string;
  name_az: string;
  slug: string;
  price: number | string | null;
  price_visible: boolean;
  status: string;
  stock_status: string;
  is_featured: boolean;
  created_at: string;
  category: {
    name_az: string;
  } | null;
  brand: {
    name: string;
  } | null;
};

function formatPrice(priceVisible: boolean, price: number | string | null) {
  return priceVisible && price ? `${Number(price).toFixed(2)} AZN` : "Sorğu ilə";
}

export async function getAdminProducts(): Promise<AdminProductListItem[]> {
  const { data, error } = await supabaseAdmin
    .from("products")
    .select(
      `
      id,
      name_az,
      slug,
      price,
      price_visible,
      status,
      stock_status,
      is_featured,
      created_at,
      category:categories (
        name_az
      ),
      brand:brands (
        name
      )
    `
    )
    .order("created_at", { ascending: false })
    .limit(100)
    .returns<AdminProductRow[]>();

  if (error) {
    console.error("Failed to fetch admin products:", error.message);
    return [];
  }

  return data.map((product) => ({
    id: product.id,
    name: product.name_az,
    slug: product.slug,
    category: product.category?.name_az ?? "Kateqoriya yoxdur",
    brand: product.brand?.name ?? null,
    status: product.status,
    stockStatus: product.stock_status,
    isFeatured: product.is_featured,
    price: formatPrice(product.price_visible, product.price),
    createdAt: product.created_at,
  }));
}