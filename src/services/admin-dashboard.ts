import "server-only";
import { supabaseAdmin } from "@/lib/supabase/admin";

export type AdminDashboardStats = {
  totalProducts: number;
  activeProducts: number;
  draftProducts: number;
  newInquiries: number;
  totalCategories: number;
  totalBrands: number;
  totalOrders: number;
  newOrders: number;
  todayOrders: number;
  totalSales: number;
};
export type RecentAdminProduct = {
  id: string;
  name_az: string;
  slug: string;
  status: string;
  created_at: string;
};

export type RecentAdminInquiry = {
  id: string;
  full_name: string;
  phone: string | null;
  email: string | null;
  status: string;
  created_at: string;
};
export type RecentAdminOrder = {
  id: string;
  order_number: string;
  customer_name: string;
  phone: string;
  order_status: string;
  payment_status: string;
  total: number | string;
  created_at: string;
};
async function getTotalProductsCount() {
  const { count, error } = await supabaseAdmin
    .from("products")
    .select("id", { count: "exact", head: true });

  if (error) {
    console.error("Failed to count products:", error.message);
    return 0;
  }

  return count ?? 0;
}

async function getActiveProductsCount() {
  const { count, error } = await supabaseAdmin
    .from("products")
    .select("id", { count: "exact", head: true })
    .eq("status", "active");

  if (error) {
    console.error("Failed to count active products:", error.message);
    return 0;
  }

  return count ?? 0;
}

async function getDraftProductsCount() {
  const { count, error } = await supabaseAdmin
    .from("products")
    .select("id", { count: "exact", head: true })
    .eq("status", "draft");

  if (error) {
    console.error("Failed to count draft products:", error.message);
    return 0;
  }

  return count ?? 0;
}

async function getNewInquiriesCount() {
  const { count, error } = await supabaseAdmin
    .from("inquiries")
    .select("id", { count: "exact", head: true })
    .eq("status", "new");

  if (error) {
    console.error("Failed to count new inquiries:", error.message);
    return 0;
  }

  return count ?? 0;
}

async function getTotalCategoriesCount() {
  const { count, error } = await supabaseAdmin
    .from("categories")
    .select("id", { count: "exact", head: true });

  if (error) {
    console.error("Failed to count categories:", error.message);
    return 0;
  }

  return count ?? 0;
}

async function getTotalBrandsCount() {
  const { count, error } = await supabaseAdmin
    .from("brands")
    .select("id", { count: "exact", head: true });

  if (error) {
    console.error("Failed to count brands:", error.message);
    return 0;
  }

  return count ?? 0;
}
function getTodayStartIso() {
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return todayStart.toISOString();
}

async function getTotalOrdersCount() {
  const { count, error } = await supabaseAdmin
    .from("orders")
    .select("id", { count: "exact", head: true });

  if (error) {
    console.error("Failed to count orders:", error.message);
    return 0;
  }

  return count ?? 0;
}

async function getNewOrdersCount() {
  const { count, error } = await supabaseAdmin
    .from("orders")
    .select("id", { count: "exact", head: true })
    .eq("order_status", "new");

  if (error) {
    console.error("Failed to count new orders:", error.message);
    return 0;
  }

  return count ?? 0;
}

async function getTodayOrdersCount() {
  const { count, error } = await supabaseAdmin
    .from("orders")
    .select("id", { count: "exact", head: true })
    .gte("created_at", getTodayStartIso());

  if (error) {
    console.error("Failed to count today orders:", error.message);
    return 0;
  }

  return count ?? 0;
}

async function getTotalSalesAmount() {
  const { data, error } = await supabaseAdmin
    .from("orders")
    .select("total")
    .neq("order_status", "cancelled");

  if (error) {
    console.error("Failed to sum order sales:", error.message);
    return 0;
  }

  return (
    data?.reduce((sum, order) => {
      return sum + Number(order.total ?? 0);
    }, 0) ?? 0
  );
}
export async function getAdminDashboardStats(): Promise<AdminDashboardStats> {
  const [
    totalProducts,
    activeProducts,
    draftProducts,
    newInquiries,
    totalCategories,
    totalBrands,
    totalOrders,
    newOrders,
    todayOrders,
    totalSales,
  ] = await Promise.all([
    getTotalProductsCount(),
    getActiveProductsCount(),
    getDraftProductsCount(),
    getNewInquiriesCount(),
    getTotalCategoriesCount(),
    getTotalBrandsCount(),
    getTotalOrdersCount(),
    getNewOrdersCount(),
    getTodayOrdersCount(),
    getTotalSalesAmount(),
  ]);

  return {
    totalProducts,
    activeProducts,
    draftProducts,
    newInquiries,
    totalCategories,
    totalBrands,
    totalOrders,
    newOrders,
    todayOrders,
    totalSales,
  };
}

export async function getRecentAdminProducts(): Promise<RecentAdminProduct[]> {
  const { data, error } = await supabaseAdmin
    .from("products")
    .select("id, name_az, slug, status, created_at")
    .order("created_at", { ascending: false })
    .limit(5)
    .returns<RecentAdminProduct[]>();

  if (error) {
    console.error("Failed to fetch recent admin products:", error.message);
    return [];
  }

  return data;
}

export async function getRecentAdminInquiries(): Promise<RecentAdminInquiry[]> {
  const { data, error } = await supabaseAdmin
    .from("inquiries")
    .select("id, full_name, phone, email, status, created_at")
    .order("created_at", { ascending: false })
    .limit(5)
    .returns<RecentAdminInquiry[]>();

  if (error) {
    console.error("Failed to fetch recent admin inquiries:", error.message);
    return [];
  }

  return data;
}
export async function getRecentAdminOrders(): Promise<RecentAdminOrder[]> {
  const { data, error } = await supabaseAdmin
    .from("orders")
    .select(
      `
      id,
      order_number,
      customer_name,
      phone,
      order_status,
      payment_status,
      total,
      created_at
    `
    )
    .order("created_at", { ascending: false })
    .limit(5)
    .returns<RecentAdminOrder[]>();

  if (error) {
    console.error("Failed to fetch recent admin orders:", error.message);
    return [];
  }

  return data;
}