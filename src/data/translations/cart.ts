export type CartLocale = "az" | "en" | "ru";

export const cartTranslations = {
  az: {
    cart: "Səbət",
    cartAriaLabel: "Səbətə keç",
    itemsCount: "məhsul",
  },

  en: {
    cart: "Cart",
    cartAriaLabel: "Go to cart",
    itemsCount: "items",
  },

  ru: {
    cart: "Корзина",
    cartAriaLabel: "Перейти в корзину",
    itemsCount: "товаров",
  },
} as const;