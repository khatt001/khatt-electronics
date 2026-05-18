import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.trim() ?? "";

  if (query.length < 2) {
    return NextResponse.json({ products: [] });
  }

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
      stock_status,
      category:categories (
        name_az
      ),
      brand:brands (
        name
      ),
      images:product_images (
        url,
        is_primary
      )
    `
    )
    .eq("status", "active")
    .ilike("name_az", `%${query}%`)
    .order("created_at", { ascending: false })
    .limit(6)
    .returns<
      {
        id: string;
        name_az: string;
        slug: string;
        price: number | string | null;
        price_visible: boolean;
        stock_status: string;
        category: { name_az: string } | null;
        brand: { name: string } | null;
        images: { url: string; is_primary: boolean }[];
      }[]
    >();

  if (error) {
    return NextResponse.json({ products: [] }, { status: 200 });
  }

  const products = data.map((product) => {
    const sortedImages = [...(product.images ?? [])].sort((a, b) => {
      if (a.is_primary && !b.is_primary) return -1;
      if (!a.is_primary && b.is_primary) return 1;
      return 0;
    });

    return {
      id: product.id,
      name: product.name_az,
      href: `/products/${product.slug}`,
      category: product.category?.name_az ?? "Məhsul",
      brand: product.brand?.name ?? null,
      imageUrl: sortedImages[0]?.url ?? null,
      price:
        product.price_visible && product.price
          ? `${Number(product.price).toFixed(2)} AZN`
          : "Qiymət sorğu ilə",
    };
  });

  return NextResponse.json({ products });
}