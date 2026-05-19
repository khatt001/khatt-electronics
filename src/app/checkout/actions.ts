"use server";

import { revalidatePath } from "next/cache";
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

type ProductForCheckout = {
  id: string;
  name_az: string;
  slug: string;
  price: number | string | null;
  price_visible: boolean;
  stock_status: "in_stock" | "out_of_stock" | "pre_order";
  stock_quantity: number | null;
  status: string;
};

function createOrderNumber() {
  const date = new Date();
  const datePart = date.toISOString().slice(0, 10).replaceAll("-", "");
  const randomPart = Math.floor(1000 + Math.random() * 9000);

  return `KH-${datePart}-${randomPart}`;
}

function getErrorUrl(message: string) {
  return `/checkout?error=${encodeURIComponent(message)}`;
}

function normalizePrice(value: number | string | null) {
  if (value === null) return null;

  const price = Number(value);

  if (!Number.isFinite(price) || price < 0) {
    return null;
  }

  return price;
}

export async function createOrder(formData: FormData) {
  const rawItems = String(formData.get("items") ?? "[]");

  let items: unknown;

  try {
    items = JSON.parse(rawItems);
  } catch {
    redirect(getErrorUrl("Səbət məlumatı düzgün deyil."));
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
      getErrorUrl(parsed.error.issues[0]?.message ?? "Məlumatlar düzgün deyil.")
    );
  }

  const data = parsed.data;

  if (data.payment_method === "card") {
    redirect(
      getErrorUrl(
        "Kartla ödəniş hələ aktiv deyil. Zəhmət olmasa nağd ödənişi seçin."
      )
    );
  }

  const productIds = data.items.map((item) => item.id);

  const { data: products, error: productsError } = await supabaseAdmin
    .from("products")
    .select(
      `
      id,
      name_az,
      slug,
      price,
      price_visible,
      stock_status,
      stock_quantity,
      status
    `
    )
    .in("id", productIds)
    .returns<ProductForCheckout[]>();

  if (productsError) {
    redirect(getErrorUrl(productsError.message));
  }

  if (!products || products.length !== data.items.length) {
    redirect(getErrorUrl("Səbətdəki məhsullardan biri tapılmadı."));
  }

  const productsById = new Map(products.map((product) => [product.id, product]));

  const verifiedItems = data.items.map((item) => {
    const product = productsById.get(item.id);

    if (!product) {
      redirect(getErrorUrl("Səbətdəki məhsullardan biri tapılmadı."));
    }

    if (product.status !== "active") {
      redirect(getErrorUrl(`${product.name_az} artıq aktiv məhsul deyil.`));
    }

    if (product.stock_status !== "in_stock") {
      redirect(getErrorUrl(`${product.name_az} stokda deyil.`));
    }

    const stockQuantity = product.stock_quantity ?? 0;

    if (stockQuantity <= 0) {
      redirect(getErrorUrl(`${product.name_az} stokda yoxdur.`));
    }

    if (item.quantity > stockQuantity) {
      redirect(
        getErrorUrl(
          `${product.name_az} üçün stokda yalnız ${stockQuantity} ədəd var.`
        )
      );
    }

    if (!product.price_visible) {
      redirect(getErrorUrl(`${product.name_az} üçün qiymət aktiv deyil.`));
    }

    const unitPrice = normalizePrice(product.price);

    if (unitPrice === null) {
      redirect(getErrorUrl(`${product.name_az} üçün qiymət düzgün deyil.`));
    }

    return {
      productId: product.id,
      productName: product.name_az,
      productSlug: product.slug,
      unitPrice,
      quantity: item.quantity,
      lineTotal: unitPrice * item.quantity,
      stockQuantity,
    };
  });

  const subtotal = verifiedItems.reduce((total, item) => total + item.lineTotal, 0);
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
    redirect(getErrorUrl(orderError?.message ?? "Sifariş yaradılmadı."));
  }

  const orderItems = verifiedItems.map((item) => ({
    order_id: order.id,
    product_id: item.productId,
    product_name: item.productName,
    product_slug: item.productSlug,
    unit_price: item.unitPrice,
    quantity: item.quantity,
    line_total: item.lineTotal,
  }));

  const { error: itemsError } = await supabaseAdmin
    .from("order_items")
    .insert(orderItems);

  if (itemsError) {
    await supabaseAdmin.from("orders").delete().eq("id", order.id);
    redirect(getErrorUrl(itemsError.message || "Sifariş məhsulları əlavə edilmədi."));
  }

  for (const item of verifiedItems) {
    const newStockQuantity = Math.max(0, item.stockQuantity - item.quantity);

    const { error: stockError } = await supabaseAdmin
      .from("products")
      .update({
        stock_quantity: newStockQuantity,
        stock_status: newStockQuantity > 0 ? "in_stock" : "out_of_stock",
      })
      .eq("id", item.productId);

    if (stockError) {
      await supabaseAdmin.from("order_items").delete().eq("order_id", order.id);
      await supabaseAdmin.from("orders").delete().eq("id", order.id);

      redirect(
        getErrorUrl(
          `${item.productName} üçün stok yenilənmədi: ${stockError.message}`
        )
      );
    }

    revalidatePath(`/products/${item.productSlug}`);
  }

  revalidatePath("/");
  revalidatePath("/products");
  revalidatePath("/admin/orders");
  revalidatePath("/admin/products");

  redirect(`/checkout/success?order=${encodeURIComponent(order.order_number)}`);
}