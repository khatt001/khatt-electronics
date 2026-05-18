import "server-only";
import { supabaseAdmin } from "@/lib/supabase/admin";

export type AdminDashboardStats = {
  totalProducts: number;
  activeProducts: number;
  draftProducts: number;
  newInquiries: number;
  totalCategories: number;
  totalBrands: number;
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

export async function getAdminDashboardStats(): Promise<AdminDashboardStats> {
  const [
    totalProducts,
    activeProducts,
    draftProducts,
    newInquiries,
    totalCategories,
    totalBrands,
  ] = await Promise.all([
    getTotalProductsCount(),
    getActiveProductsCount(),
    getDraftProductsCount(),
    getNewInquiriesCount(),
    getTotalCategoriesCount(),
    getTotalBrandsCount(),
  ]);

  return {
    totalProducts,
    activeProducts,
    draftProducts,
    newInquiries,
    totalCategories,
    totalBrands,
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