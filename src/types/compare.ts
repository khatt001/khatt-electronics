export type CompareSpecification = {
  key: string;
  value: string;
};

export type CompareItem = {
  id: string;
  name: string;
  slug: string;
  price: string;
  priceAmount: number | null;
  imageUrl: string | null;
  category: string;
  brand: string | null;
  stockStatus: "in_stock" | "out_of_stock" | "pre_order";
  stockQuantity: number;
  specifications?: CompareSpecification[];
};
