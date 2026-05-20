export type CartLocale = "az" | "en" | "ru";

export const cartTranslations = {
  az: {
    cart: "Səbət",
    cartAriaLabel: "Səbətə keç",
    itemsCount: "məhsul",

    metadataTitle: "Səbət",
    metadataDescription:
      "KHATT Electronics səbət səhifəsi. Məhsullarınızı səbətə əlavə edin və sifarişi tamamlayın.",

    eyebrow: "Səbət",
    title: "Səbətinizdəki məhsullar",
    description:
      "Məhsulları yoxlayın, sayını dəyişin və sifarişi tamamlamağa keçin.",

    stockLimit: "Stok limiti",
    stockUnit: "ədəd",
    removeProductAria: "Məhsulu səbətdən sil",
    decreaseQuantityAria: "Say azalt",
    increaseQuantityAria: "Say artır",
    oneItemPrice: "Bir ədəd",

    summaryTitle: "Sifariş xülasəsi",
    productCount: "Məhsul sayı",
    subtotal: "Ara cəm",
    delivery: "Çatdırılma",
    deliveryDescription: "Checkout-da hesablanacaq",
    total: "Cəmi",
    syncing: "Səbət məlumatları yenilənir...",
    checkoutButton: "Sifarişi tamamla",
    clearCartButton: "Səbəti təmizlə",

    emptyEyebrow: "Boş səbət",
    emptyTitle: "Səbətiniz hələ boşdur",
    emptyDescription:
      "Məhsul kataloquna keçərək kamera, şəbəkə və təhlükəsizlik avadanlıqlarını səbətə əlavə edə bilərsiniz.",
    emptyButton: "Məhsullara bax",
  },

  en: {
    cart: "Cart",
    cartAriaLabel: "Go to cart",
    itemsCount: "items",

    metadataTitle: "Cart",
    metadataDescription:
      "KHATT Electronics cart page. Add products to your cart and complete your order.",

    eyebrow: "Cart",
    title: "Products in your cart",
    description:
      "Review your products, change quantities and proceed to complete your order.",

    stockLimit: "Stock limit",
    stockUnit: "pcs",
    removeProductAria: "Remove product from cart",
    decreaseQuantityAria: "Decrease quantity",
    increaseQuantityAria: "Increase quantity",
    oneItemPrice: "One item",

    summaryTitle: "Order summary",
    productCount: "Product count",
    subtotal: "Subtotal",
    delivery: "Delivery",
    deliveryDescription: "Calculated at checkout",
    total: "Total",
    syncing: "Cart data is updating...",
    checkoutButton: "Complete order",
    clearCartButton: "Clear cart",

    emptyEyebrow: "Empty cart",
    emptyTitle: "Your cart is still empty",
    emptyDescription:
      "Go to the product catalog to add camera, network and security equipment to your cart.",
    emptyButton: "View products",
  },

  ru: {
    cart: "Корзина",
    cartAriaLabel: "Перейти в корзину",
    itemsCount: "товаров",

    metadataTitle: "Корзина",
    metadataDescription:
      "Страница корзины KHATT Electronics. Добавьте товары в корзину и завершите заказ.",

    eyebrow: "Корзина",
    title: "Товары в вашей корзине",
    description:
      "Проверьте товары, измените количество и перейдите к оформлению заказа.",

    stockLimit: "Лимит склада",
    stockUnit: "шт.",
    removeProductAria: "Удалить товар из корзины",
    decreaseQuantityAria: "Уменьшить количество",
    increaseQuantityAria: "Увеличить количество",
    oneItemPrice: "За единицу",

    summaryTitle: "Сводка заказа",
    productCount: "Количество товаров",
    subtotal: "Промежуточный итог",
    delivery: "Доставка",
    deliveryDescription: "Будет рассчитано при оформлении",
    total: "Итого",
    syncing: "Данные корзины обновляются...",
    checkoutButton: "Оформить заказ",
    clearCartButton: "Очистить корзину",

    emptyEyebrow: "Пустая корзина",
    emptyTitle: "Ваша корзина пока пуста",
    emptyDescription:
      "Перейдите в каталог товаров, чтобы добавить камеры, сетевое оборудование и системы безопасности в корзину.",
    emptyButton: "Смотреть товары",
  },
} as const;