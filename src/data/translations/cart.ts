export type CartLocale = "az" | "en" | "ru";

export const cartTranslations = {
  az: {
    cart: "Səbət",
    cartAriaLabel: "Səbətə keç",
    itemsCount: "məhsul",

    metadataTitle: "Səbət",
    metadataDescription:
      "KHATT Electronics səbətinizdəki məhsulları yoxlayın və sifarişi tamamlayın.",

    eyebrow: "Səbət",
    title: "Sifariş səbəti",
    description:
      "Seçdiyiniz məhsulları yoxlayın, sayını dəyişin və sifarişi tamamlayın.",

    emptyTitle: "Səbət boşdur",
    emptyDescription:
      "Məhsulları səbətə əlavə etdikdən sonra burada görünəcək.",
    emptyButton: "Məhsullara bax",

    productColumn: "Məhsul",
    priceColumn: "Qiymət",
    quantityColumn: "Say",
    totalColumn: "Cəmi",

    orderSummaryTitle: "Sifariş xülasəsi",
    subtotalLabel: "Ara cəm",
    deliveryLabel: "Çatdırılma",
    deliveryValue: "Razılaşma ilə",
    totalLabel: "Yekun",
    checkoutButton: "Sifarişi tamamla",
    continueShoppingButton: "Alış-verişə davam et",

    removeItem: "Sil",
    decreaseQuantity: "Azalt",
    increaseQuantity: "Artır",

    stockLimit: "Stok limiti",
    priceOnRequest: "Qiymət sorğu ilə",
  },

  en: {
    cart: "Cart",
    cartAriaLabel: "Go to cart",
    itemsCount: "items",

    metadataTitle: "Cart",
    metadataDescription:
      "Review the products in your KHATT Electronics cart and complete your order.",

    eyebrow: "Cart",
    title: "Order cart",
    description:
      "Review your selected products, update quantities and complete your order.",

    emptyTitle: "Your cart is empty",
    emptyDescription:
      "Products will appear here after you add them to your cart.",
    emptyButton: "View products",

    productColumn: "Product",
    priceColumn: "Price",
    quantityColumn: "Qty",
    totalColumn: "Total",

    orderSummaryTitle: "Order summary",
    subtotalLabel: "Subtotal",
    deliveryLabel: "Delivery",
    deliveryValue: "By agreement",
    totalLabel: "Total",
    checkoutButton: "Complete order",
    continueShoppingButton: "Continue shopping",

    removeItem: "Remove",
    decreaseQuantity: "Decrease",
    increaseQuantity: "Increase",

    stockLimit: "Stock limit",
    priceOnRequest: "Price on request",
  },

  ru: {
    cart: "Корзина",
    cartAriaLabel: "Перейти в корзину",
    itemsCount: "товаров",

    metadataTitle: "Корзина",
    metadataDescription:
      "Проверьте товары в корзине KHATT Electronics и завершите заказ.",

    eyebrow: "Корзина",
    title: "Корзина заказа",
    description:
      "Проверьте выбранные товары, измените количество и завершите заказ.",

    emptyTitle: "Корзина пуста",
    emptyDescription:
      "Товары появятся здесь после добавления в корзину.",
    emptyButton: "Смотреть товары",

    productColumn: "Товар",
    priceColumn: "Цена",
    quantityColumn: "Кол-во",
    totalColumn: "Итого",

    orderSummaryTitle: "Сводка заказа",
    subtotalLabel: "Промежуточный итог",
    deliveryLabel: "Доставка",
    deliveryValue: "По договоренности",
    totalLabel: "Итого",
    checkoutButton: "Оформить заказ",
    continueShoppingButton: "Продолжить покупки",

    removeItem: "Удалить",
    decreaseQuantity: "Уменьшить",
    increaseQuantity: "Увеличить",

    stockLimit: "Лимит склада",
    priceOnRequest: "Цена по запросу",
  },
} as const;