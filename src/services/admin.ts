import "server-only";
import { redirect } from "next/navigation";
import { createAuthServerClient } from "@/lib/supabase/auth-server";

export async function requireAdmin() {
  const supabase = await createAuthServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const { data: adminUser, error } = await supabase
    .from("admin_users")
    .select("id, role, is_active")
    .eq("user_id", user.id)
    .eq("is_active", true)
    .single();

  if (error || !adminUser) {
    redirect("/admin/login");
  }

  return {
    user,
    adminUser,
  };
}