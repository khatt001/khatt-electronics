export type FavoritesLocale = "az" | "en" | "ru";

export const favoritesTranslations = {
  az: {
    metadataTitle: "Sevimlilər",
    metadataDescription:
      "KHATT Electronics sevimli məhsullar səhifəsi. Bəyəndiyiniz məhsulları saxlayın və sonra sifariş edin.",

    eyebrow: "Sevimlilər",
    title: "Sevimli məhsullarınız",
    description:
      "Bəyəndiyiniz məhsulları burada saxlayın, sonra səbətə əlavə edib sifarişinizi tamamlayın.",

    syncing: "Sevimli məhsullar yenilənir...",
    countSuffix: "məhsul sevimlilərdədir",
    clearAll: "Hamısını təmizlə",

    inStockPrefix: "Stokda",
    inStockSuffix: "ədəd",
    preOrder: "Öncədən sifariş",
    outOfStock: "Stokda yoxdur",

    addToCart: "Səbətə əlavə et",
    removeAria: "Sevimlilərdən sil",

    emptyEyebrow: "Boş siyahı",
    emptyTitle: "Hələ sevimli məhsul yoxdur",
    emptyDescription:
      "Məhsulları bəyənərək bu siyahıya əlavə edə bilərsiniz.",
    emptyButton: "Məhsullara bax",
  },

  en: {
    metadataTitle: "Favorites",
    metadataDescription:
      "KHATT Electronics favorites page. Save products you like and order them later.",

    eyebrow: "Favorites",
    title: "Your favorite products",
    description:
      "Save products you like here, then add them to your cart and complete your order.",

    syncing: "Favorite products are updating...",
    countSuffix: "products in favorites",
    clearAll: "Clear all",

    inStockPrefix: "In stock",
    inStockSuffix: "pcs",
    preOrder: "Pre-order",
    outOfStock: "Out of stock",

    addToCart: "Add to cart",
    removeAria: "Remove from favorites",

    emptyEyebrow: "Empty list",
    emptyTitle: "No favorite products yet",
    emptyDescription:
      "You can add products to this list by marking them as favorite.",
    emptyButton: "View products",
  },

  ru: {
    metadataTitle: "Избранное",
    metadataDescription:
      "Страница избранных товаров KHATT Electronics. Сохраняйте понравившиеся товары и заказывайте позже.",

    eyebrow: "Избранное",
    title: "Ваши избранные товары",
    description:
      "Сохраняйте понравившиеся товары здесь, затем добавляйте их в корзину и оформляйте заказ.",

    syncing: "Избранные товары обновляются...",
    countSuffix: "товаров в избранном",
    clearAll: "Очистить все",

    inStockPrefix: "В наличии",
    inStockSuffix: "шт.",
    preOrder: "Предзаказ",
    outOfStock: "Нет в наличии",

    addToCart: "В корзину",
    removeAria: "Удалить из избранного",

    emptyEyebrow: "Пустой список",
    emptyTitle: "Избранных товаров пока нет",
    emptyDescription:
      "Вы можете добавить товары в этот список, отметив их как избранные.",
    emptyButton: "Смотреть товары",
  },
} as const;