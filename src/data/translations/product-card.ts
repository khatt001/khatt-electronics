export type ProductCardLocale = "az" | "en" | "ru";

export const productCardTranslations = {
  az: {
    viewProductAria: "məhsuluna bax",
    priceLabel: "Qiymət",
    inStockPrefix: "Stokda",
    inStockSuffix: "ədəd",
    preOrder: "Öncədən sifariş",
    outOfStock: "Stokda yoxdur",
    priceInactive: "Qiymət aktiv deyil",

    badgeInStock: "Stokda var",
    badgePreOrder: "Öncədən sifariş",
    badgeOutOfStock: "Sorğu ilə",
    priceOnRequest: "Qiymət sorğu ilə",
  },

  en: {
    viewProductAria: "view product",
    priceLabel: "Price",
    inStockPrefix: "In stock",
    inStockSuffix: "pcs",
    preOrder: "Pre-order",
    outOfStock: "Out of stock",
    priceInactive: "Price not available",

    badgeInStock: "In stock",
    badgePreOrder: "Pre-order",
    badgeOutOfStock: "On request",
    priceOnRequest: "Price on request",
  },

  ru: {
    viewProductAria: "смотреть товар",
    priceLabel: "Цена",
    inStockPrefix: "В наличии",
    inStockSuffix: "шт.",
    preOrder: "Предзаказ",
    outOfStock: "Нет в наличии",
    priceInactive: "Цена недоступна",

    badgeInStock: "В наличии",
    badgePreOrder: "Предзаказ",
    badgeOutOfStock: "По запросу",
    priceOnRequest: "Цена по запросу",
  },
} as const;