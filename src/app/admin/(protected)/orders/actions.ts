"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { requireAdmin } from "@/services/admin";

const updateOrderStatusSchema = z.object({
  order_status: z.enum([
    "new",
    "confirmed",
    "preparing",
    "delivered",
    "cancelled",
  ]),
  payment_status: z.enum(["pending", "paid", "failed"]),
});

export async function updateOrderStatus(orderId: string, formData: FormData) {
  await requireAdmin();

  const parsed = updateOrderStatusSchema.safeParse({
    order_status: String(formData.get("order_status") ?? "new"),
    payment_status: String(formData.get("payment_status") ?? "pending"),
  });

  if (!parsed.success) {
    redirect(
      `/admin/orders/${orderId}?error=${encodeURIComponent(
        parsed.error.issues[0]?.message ?? "Status məlumatı düzgün deyil."
      )}`
    );
  }

  const { error } = await supabaseAdmin
    .from("orders")
    .update({
      order_status: parsed.data.order_status,
      payment_status: parsed.data.payment_status,
      updated_at: new Date().toISOString(),
    })
    .eq("id", orderId);

  if (error) {
    redirect(
      `/admin/orders/${orderId}?error=${encodeURIComponent(
        "Status yenilənmədi."
      )}`
    );
  }

  revalidatePath("/admin/orders");
  revalidatePath(`/admin/orders/${orderId}`);

  redirect(`/admin/orders/${orderId}`);
}