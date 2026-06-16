import "server-only";
import { supabaseAdmin } from "@/lib/supabase/admin";

export type AdminInquiry = {
  id: string;
  full_name: string;
  phone: string | null;
  email: string | null;
  company_name: string | null;
  message: string;
  source: string | null;
  status: string;
  created_at: string;
  updated_at: string;
};

export async function getAdminInquiries(): Promise<AdminInquiry[]> {
  const { data, error } = await supabaseAdmin
    .from("inquiries")
    .select(
      `
      id,
      full_name,
      phone,
      email,
      company_name,
      message,
      source,
      status,
      created_at,
      updated_at
    `,
    )
    .order("created_at", { ascending: false })
    .limit(100)
    .returns<AdminInquiry[]>();

  if (error) {
    console.error("Failed to fetch admin inquiries:", error.message);
    return [];
  }

  return data;
}
