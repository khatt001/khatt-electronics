import "server-only";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { escapeOrFilterValue } from "@/lib/supabase/query-utils";
export type AdminOrderListItem = {
  id: string;
  orderNumber: string;
  customerName: string;
  phone: string;
  paymentMethod: string;
  paymentStatus: string;
  orderStatus: string;
  total: number;
  createdAt: string;
};

export type AdminOrderDetail = {
  id: string;
  order_number: string;
  customer_name: string;
  phone: string;
  email: string | null;
  city: string | null;
  address: string | null;
  note: string | null;
  payment_method: string;
  payment_status: string;
  order_status: string;
  subtotal: number;
  delivery_fee: number;
  total: number;
  created_at: string;
  items: {
    id: string;
    product_id: string | null;
    product_name: string;
    product_slug: string;
    unit_price: number;
    quantity: number;
    line_total: number;
  }[];
};

type AdminOrderRow = {
  id: string;
  order_number: string;
  customer_name: string;
  phone: string;
  payment_method: string;
  payment_status: string;
  order_status: string;
  total: number | string;
  created_at: string;
};

type AdminOrderDetailRow = Omit<
  AdminOrderDetail,
  "subtotal" | "delivery_fee" | "total" | "items"
> & {
  subtotal: number | string;
  delivery_fee: number | string;
  total: number | string;
  items: {
    id: string;
    product_id: string | null;
    product_name: string;
    product_slug: string;
    unit_price: number | string;
    quantity: number;
    line_total: number | string;
  }[];
};
export type AdminOrderFilters = {
  search?: string;
  status?: string;
};
export async function getAdminOrders(
  filters: AdminOrderFilters = {},
): Promise<AdminOrderListItem[]> {
  let query = supabaseAdmin.from("orders").select(
    `
      id,
      order_number,
      customer_name,
      phone,
      payment_method,
      payment_status,
      order_status,
      total,
      created_at
    `,
  );

  if (filters.status && filters.status !== "all") {
    query = query.eq("order_status", filters.status);
  }

 if (filters.search && filters.search.trim()) {
    const search = escapeOrFilterValue(filters.search.trim());

    query = query.or(
      `order_number.ilike.%${search}%,customer_name.ilike.%${search}%,phone.ilike.%${search}%`,
    );
  }

  const { data, error } = await query
    .order("created_at", { ascending: false })
    .limit(100)
    .returns<AdminOrderRow[]>();

  if (error) {
    console.error("Failed to fetch admin orders:", error.message);
    return [];
  }

  return data.map((order) => ({
    id: order.id,
    orderNumber: order.order_number,
    customerName: order.customer_name,
    phone: order.phone,
    paymentMethod: order.payment_method,
    paymentStatus: order.payment_status,
    orderStatus: order.order_status,
    total: Number(order.total),
    createdAt: order.created_at,
  }));
}

export async function getAdminOrderById(
  id: string,
): Promise<AdminOrderDetail | null> {
  const { data, error } = await supabaseAdmin
    .from("orders")
    .select(
      `
      id,
      order_number,
      customer_name,
      phone,
      email,
      city,
      address,
      note,
      payment_method,
      payment_status,
      order_status,
      subtotal,
      delivery_fee,
      total,
      created_at,
      items:order_items (
        id,
        product_id,
        product_name,
        product_slug,
        unit_price,
        quantity,
        line_total
      )
    `,
    )
    .eq("id", id)
    .maybeSingle()
    .returns<AdminOrderDetailRow | null>();

  if (error) {
    console.error("Failed to fetch admin order:", error.message);
    return null;
  }

  if (!data) return null;

  return {
    ...data,
    subtotal: Number(data.subtotal),
    delivery_fee: Number(data.delivery_fee),
    total: Number(data.total),
    items: data.items.map((item) => ({
      ...item,
      unit_price: Number(item.unit_price),
      line_total: Number(item.line_total),
    })),
  };
}
