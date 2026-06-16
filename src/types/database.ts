export type ProductStatus = "active" | "draft" | "archived";

export type StockStatus = "in_stock" | "out_of_stock" | "pre_order";

export type Product = {
  id: string;
  category_id: string | null;
  brand_id: string | null;
  name_az: string;
  slug: string;
  short_description_az: string | null;
  description_az: string | null;
  price: number | null;
  price_visible: boolean;
  stock_status: StockStatus;
  status: ProductStatus;
  is_featured: boolean;
  seo_title_az: string | null;
  seo_description_az: string | null;
  created_at: string;
  updated_at: string;
};

export type Category = {
  id: string;
  parent_id: string | null;
  name_az: string;
  slug: string;
  description_az: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
};

export type Brand = {
  id: string;
  name: string;
  slug: string;
  logo_url: string | null;
  is_active: boolean;
  created_at: string;
};
