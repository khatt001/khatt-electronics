export type CompareLocale = "az" | "en" | "ru";

export const compareTranslations = {
  az: {
    metadataTitle: "Məhsul müqayisəsi",
    metadataDescription:
      "KHATT Electronics məhsullarını qiymət, kateqoriya, brend və stok vəziyyətinə görə müqayisə edin.",

    eyebrow: "Müqayisə",
    title: "Məhsulları müqayisə edin",
    description:
      "Kamera, təhlükəsizlik və şəbəkə avadanlıqlarını texniki göstəricilər, qiymət və stok üzrə yan-yana müqayisə edin.",

    syncing: "Müqayisə məlumatları yenilənir...",
    countText: "məhsul müqayisədədir",
    clearAll: "Hamısını təmizlə",

    featureColumn: "Xüsusiyyət",
    removeAria: "Müqayisədən sil",

    price: "Qiymət",
    category: "Kateqoriya",
    brand: "Brend",
    stock: "Stok",
    technicalSpecs: "Texniki göstəricilər",
    order: "Sifariş",

    inStockPrefix: "Stokda",
    inStockSuffix: "ədəd",
    preOrder: "Öncədən sifariş",
    outOfStock: "Stokda yoxdur",

    addToCart: "Səbətə əlavə et",

    emptyEyebrow: "Boş müqayisə",
    emptyTitle: "Müqayisə üçün məhsul yoxdur",
    emptyDescription:
      "Məhsulları müqayisəyə əlavə edərək seçim prosesini daha rahat edin.",
    emptyButton: "Məhsullara bax",
  },

  en: {
    metadataTitle: "Product comparison",
    metadataDescription:
      "Compare KHATT Electronics products by price, category, brand and stock status.",

    eyebrow: "Compare",
    title: "Compare products",
    description:
      "Compare cameras, security and network equipment side by side by specifications, price and stock status.",

    syncing: "Comparison data is updating...",
    countText: "products in comparison",
    clearAll: "Clear all",

    featureColumn: "Feature",
    removeAria: "Remove from comparison",

    price: "Price",
    category: "Category",
    brand: "Brand",
    stock: "Stock",
    technicalSpecs: "Technical specifications",
    order: "Order",

    inStockPrefix: "In stock",
    inStockSuffix: "pcs",
    preOrder: "Pre-order",
    outOfStock: "Out of stock",

    addToCart: "Add to cart",

    emptyEyebrow: "Empty comparison",
    emptyTitle: "No products to compare",
    emptyDescription:
      "Add products to comparison to make your selection process easier.",
    emptyButton: "View products",
  },

  ru: {
    metadataTitle: "Сравнение товаров",
    metadataDescription:
      "Сравнивайте товары KHATT Electronics по цене, категории, бренду и наличию.",

    eyebrow: "Сравнение",
    title: "Сравните товары",
    description:
      "Сравнивайте камеры, системы безопасности и сетевое оборудование по характеристикам, цене и наличию.",

    syncing: "Данные сравнения обновляются...",
    countText: "товаров в сравнении",
    clearAll: "Очистить все",

    featureColumn: "Характеристика",
    removeAria: "Удалить из сравнения",

    price: "Цена",
    category: "Категория",
    brand: "Бренд",
    stock: "Наличие",
    technicalSpecs: "Технические характеристики",
    order: "Заказ",

    inStockPrefix: "В наличии",
    inStockSuffix: "шт.",
    preOrder: "Предзаказ",
    outOfStock: "Нет в наличии",

    addToCart: "В корзину",

    emptyEyebrow: "Пустое сравнение",
    emptyTitle: "Нет товаров для сравнения",
    emptyDescription:
      "Добавьте товары в сравнение, чтобы упростить выбор.",
    emptyButton: "Смотреть товары",
  },
} as const;