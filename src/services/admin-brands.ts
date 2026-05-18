import "server-only";
import { supabaseAdmin } from "@/lib/supabase/admin";

export type AdminBrand = {
  id: string;
  name: string;
  slug: string;
  website_url: string | null;
  is_active: boolean;
  created_at: string;
};

export async function getAdminBrands(): Promise<AdminBrand[]> {
  const { data, error } = await supabaseAdmin
    .from("brands")
    .select("id, name, slug, website_url, is_active, created_at")
    .order("created_at", { ascending: false })
    .returns<AdminBrand[]>();

  if (error) {
    console.error("Failed to fetch admin brands:", error.message);
    return [];
  }

  return data;
}