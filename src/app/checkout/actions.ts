"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase/admin";

const checkoutItemSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  slug: z.string().min(1),
  price: z.coerce.number().min(0),
  quantity: z.coerce.number().int().min(1),
});

const checkoutSchema = z.object({
  customer_name: z.string().min(2, "Ad və soyad minimum 2 simvol olmalıdır."),
  phone: z.string().min(7, "Telefon nömrəsi düzgün deyil."),
  email: z.string().email("Email düzgün deyil.").optional().or(z.literal("")),
  city: z.string().min(2, "Şəhər yazılmalıdır."),
  address: z.string().min(5, "Ünvan minimum 5 simvol olmalıdır."),
  note: z.string().optional(),
  payment_method: z.enum(["cash", "card"]),
  items: z.array(checkoutItemSchema).min(1, "Səbət boşdur."),
});

function createOrderNumber() {
  const date = new Date();
  const datePart = date
    .toISOString()
    .slice(0, 10)
    .replaceAll("-", "");

  const randomPart = Math.floor(1000 + Math.random() * 9000);

  return `KH-${datePart}-${randomPart}`;
}

export async function createOrder(formData: FormData) {
  const rawItems = String(formData.get("items") ?? "[]");

  let items: unknown;

  try {
    items = JSON.parse(rawItems);
  } catch {
    redirect(`/checkout?error=${encodeURIComponent("Səbət məlumatı düzgün deyil.")}`);
  }

  const parsed = checkoutSchema.safeParse({
    customer_name: String(formData.get("customer_name") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    email: String(formData.get("email") ?? ""),
    city: String(formData.get("city") ?? ""),
    address: String(formData.get("address") ?? ""),
    note: String(formData.get("note") ?? ""),
    payment_method: String(formData.get("payment_method") ?? "cash"),
    items,
  });

  if (!parsed.success) {
    redirect(
      `/checkout?error=${encodeURIComponent(
        parsed.error.issues[0]?.message ?? "Məlumatlar düzgün deyil."
      )}`
    );
  }

  const data = parsed.data;

  if (data.payment_method === "card") {
    redirect(
      `/checkout?error=${encodeURIComponent(
        "Kartla ödəniş hələ aktiv deyil. Zəhmət olmasa nağd ödənişi seçin."
      )}`
    );
  }

  const subtotal = data.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const deliveryFee = 0;
  const total = subtotal + deliveryFee;

  const { data: order, error: orderError } = await supabaseAdmin
    .from("orders")
    .insert({
      order_number: createOrderNumber(),
      customer_name: data.customer_name.trim(),
      phone: data.phone.trim(),
      email: data.email?.trim() || null,
      city: data.city.trim(),
      address: data.address.trim(),
      note: data.note?.trim() || null,
      payment_method: data.payment_method,
      payment_status: "pending",
      order_status: "new",
      subtotal,
      delivery_fee: deliveryFee,
      total,
    })
    .select("id, order_number")
    .single();

  if (orderError || !order) {
    redirect(
      `/checkout?error=${encodeURIComponent(
        orderError?.message ?? "Sifariş yaradılmadı."
      )}`
    );
  }

  const orderItems = data.items.map((item) => ({
    order_id: order.id,
    product_id: item.id,
    product_name: item.name,
    product_slug: item.slug,
    unit_price: item.price,
    quantity: item.quantity,
    line_total: item.price * item.quantity,
  }));

  const { error: itemsError } = await supabaseAdmin
    .from("order_items")
    .insert(orderItems);

  if (itemsError) {
    await supabaseAdmin.from("orders").delete().eq("id", order.id);

    redirect(
      `/checkout?error=${encodeURIComponent(
        itemsError.message || "Sifariş məhsulları əlavə edilmədi."
      )}`
    );
  }

  redirect(`/checkout/success?order=${encodeURIComponent(order.order_number)}`);
}