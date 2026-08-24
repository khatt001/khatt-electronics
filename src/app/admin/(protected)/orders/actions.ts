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

function revalidateOrderAndProductPaths(orderId?: string) {
  revalidatePath("/");
  revalidatePath("/en");
  revalidatePath("/ru");
  revalidatePath("/products");
  revalidatePath("/en/products");
  revalidatePath("/ru/products");
  revalidatePath("/products/[slug]", "page");
  revalidatePath("/en/products/[slug]", "page");
  revalidatePath("/ru/products/[slug]", "page");
  revalidatePath("/admin/orders");
  revalidatePath("/admin/products");

  if (orderId) revalidatePath(`/admin/orders/${orderId}`);
}

export async function updateOrderStatus(orderId: string, formData: FormData) {
  await requireAdmin();

  const parsed = updateOrderStatusSchema.safeParse({
    order_status: String(formData.get("order_status") ?? "new"),
    payment_status: String(formData.get("payment_status") ?? "pending"),
  });

  if (!parsed.success) {
    redirect(
      `/admin/orders/${orderId}?error=${encodeURIComponent(
        parsed.error.issues[0]?.message ?? "Status məlumatı düzgün deyil.",
      )}`,
    );
  }

  const { error } = await supabaseAdmin.rpc(
    "update_order_status_transactional",
    {
      p_order_id: orderId,
      p_order_status: parsed.data.order_status,
      p_payment_status: parsed.data.payment_status,
    },
  );

  if (error) {
    const message = error.message.includes("CANCELLED_ORDER_CANNOT_BE_REOPENED")
      ? "Ləğv edilmiş sifariş yenidən aktiv edilə bilməz."
      : "Status yenilənmədi.";

    redirect(`/admin/orders/${orderId}?error=${encodeURIComponent(message)}`);
  }

  revalidateOrderAndProductPaths(orderId);
  redirect(`/admin/orders/${orderId}`);
}

export async function deleteOrder(orderId: string) {
  await requireAdmin();

  if (!orderId) {
    redirect(
      `/admin/orders?error=${encodeURIComponent("Sifariş ID tapılmadı.")}`,
    );
  }

  const { error } = await supabaseAdmin.rpc("delete_order_transactional", {
    p_order_id: orderId,
  });

  if (error) {
    redirect(
      `/admin/orders/${orderId}?error=${encodeURIComponent(
        "Sifariş silinə bilmədi.",
      )}`,
    );
  }

  revalidateOrderAndProductPaths();
  redirect("/admin/orders");
}