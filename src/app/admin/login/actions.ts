"use server";

import { redirect } from "next/navigation";
import { createAuthServerClient } from "@/lib/supabase/auth-server";

export async function loginAdmin(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const nextPath = String(formData.get("nextPath") ?? "/admin");

  if (!email || !password) {
    redirect("/admin/login?error=missing");
  }

  const supabase = await createAuthServerClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    redirect("/admin/login?error=invalid");
  }

  redirect(nextPath.startsWith("/admin") ? nextPath : "/admin");
}
