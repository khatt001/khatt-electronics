import "server-only";
import { supabaseAdmin } from "@/lib/supabase/admin";

export type AdminCategory = {
  id: string;
  name_az: string;
  slug: string;
  description_az: string | null;
  is_active: boolean;
  sort_order: number;
  created_at: string;
};

export async function getAdminCategories(): Promise<AdminCategory[]> {
  const { data, error } = await supabaseAdmin
    .from("categories")
    .select(
      `
      id,
      name_az,
      slug,
      description_az,
      is_active,
      sort_order,
      created_at
    `,
    )
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false })
    .returns<AdminCategory[]>();

  if (error) {
    console.error("Failed to fetch admin categories:", error.message);
    return [];
  }

  return data;
}
