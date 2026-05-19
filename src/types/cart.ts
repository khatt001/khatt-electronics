export type CartItem = {
  id: string;
  name: string;
  slug: string;
  price: number;
  priceLabel: string;
  imageUrl: string | null;
  category: string;
  brand: string | null;
  maxQuantity: number;
  quantity: number;
};

export type CartState = {
  items: CartItem[];
};