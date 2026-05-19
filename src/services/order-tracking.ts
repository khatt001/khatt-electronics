import "server-only";
import { supabaseAdmin } from "@/lib/supabase/admin";

export type TrackedOrder = {
  id: string;
  order_number: string;
  customer_name: string;
  phone: string;
  payment_method: string;
  payment_status: string;
  order_status: string;
  total: number;
  created_at: string;
  items: {
    id: string;
    product_name: string;
    product_slug: string;
    unit_price: number;
    quantity: number;
    line_total: number;
  }[];
};

type TrackedOrderRow = {
  id: string;
  order_number: string;
  customer_name: string;
  phone: string;
  payment_method: string;
  payment_status: string;
  order_status: string;
  total: number | string;
  created_at: string;
  items: {
    id: string;
    product_name: string;
    product_slug: string;
    unit_price: number | string;
    quantity: number;
    line_total: number | string;
  }[];
};

function normalizePhone(value: string) {
  const digits = value.replace(/\D/g, "");

  if (digits.startsWith("994")) {
    return digits.slice(3).slice(-9);
  }

  if (digits.startsWith("0")) {
    return digits.slice(1).slice(-9);
  }

  return digits.slice(-9);
}

export async function trackOrder({
  orderNumber,
  phone,
}: {
  orderNumber: string;
  phone: string;
}): Promise<TrackedOrder | null> {
  const cleanOrderNumber = orderNumber.trim().toUpperCase();
  const cleanPhone = normalizePhone(phone);

  if (!cleanOrderNumber || cleanPhone.length < 7) {
    return null;
  }

  const { data, error } = await supabaseAdmin
    .from("orders")
    .select(
      `
      id,
      order_number,
      customer_name,
      phone,
      payment_method,
      payment_status,
      order_status,
      total,
      created_at,
      items:order_items (
        id,
        product_name,
        product_slug,
        unit_price,
        quantity,
        line_total
      )
    `
    )
    .eq("order_number", cleanOrderNumber)
    .maybeSingle()
    .returns<TrackedOrderRow | null>();

  if (error || !data) {
    return null;
  }

const dbPhone = normalizePhone(data.phone);

if (dbPhone !== cleanPhone) {
  return null;
}
  return {
    ...data,
    total: Number(data.total),
    items: data.items.map((item) => ({
      ...item,
      unit_price: Number(item.unit_price),
      line_total: Number(item.line_total),
    })),
  };
}