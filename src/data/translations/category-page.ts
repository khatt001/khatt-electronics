export type CategoryPageLocale = "az" | "en" | "ru";

export const categoryPageTranslations = {
  az: {
    notFoundTitle: "Kateqoriya tapılmadı",
    metadataProductsSuffix: "məhsulları",
    metadataFallbackSuffix: "kateqoriyasına aid məhsullar — KHATT Electronics.",

    homeBreadcrumb: "Ana səhifə",
    productsBreadcrumb: "Məhsullar",

    backToProducts: "Bütün məhsullara qayıt",
    eyebrow: "Kateqoriya",
    fallbackDescriptionSuffix:
      "kateqoriyasına aid təhlükəsizlik, şəbəkə və elektronika məhsullarını kəşf edin.",
    allProducts: "Bütün məhsullar",
    clearFilters: "Filterləri təmizlə",

    foundSuffix: "məhsul tapıldı",
    searchLabel: "Axtarış",
    brandLabel: "Brend",
    specLabel: "Xüsusiyyət",

    stockIn: "Stokda var",
    stockOut: "Stokda yoxdur",
    stockPreOrder: "Öncədən sifariş",

    sortOldest: "Ən köhnə",
    sortFeatured: "Seçilmişlər əvvəl",
    sortPriceAsc: "Qiymət: ucuzdan bahaya",
    sortPriceDesc: "Qiymət: bahadan ucuza",

    emptyEyebrow: "Məhsul yoxdur",
    emptyTitle: "Seçilmiş filterlərə uyğun məhsul tapılmadı",
    emptyDescription: "Filterləri dəyişərək yenidən yoxlaya bilərsiniz.",
  },

  en: {
    notFoundTitle: "Category not found",
    metadataProductsSuffix: "products",
    metadataFallbackSuffix: "category products — KHATT Electronics.",

    homeBreadcrumb: "Home",
    productsBreadcrumb: "Products",

    backToProducts: "Back to all products",
    eyebrow: "Category",
    fallbackDescriptionSuffix:
      "category products for security, networking and electronics.",
    allProducts: "All products",
    clearFilters: "Clear filters",

    foundSuffix: "products found",
    searchLabel: "Search",
    brandLabel: "Brand",
    specLabel: "Specification",

    stockIn: "In stock",
    stockOut: "Out of stock",
    stockPreOrder: "Pre-order",

    sortOldest: "Oldest",
    sortFeatured: "Featured first",
    sortPriceAsc: "Price: low to high",
    sortPriceDesc: "Price: high to low",

    emptyEyebrow: "No products",
    emptyTitle: "No products found for selected filters",
    emptyDescription: "Try changing the filters and checking again.",
  },

  ru: {
    notFoundTitle: "Категория не найдена",
    metadataProductsSuffix: "товары",
    metadataFallbackSuffix: "товары категории — KHATT Electronics.",

    homeBreadcrumb: "Главная",
    productsBreadcrumb: "Товары",

    backToProducts: "Назад ко всем товарам",
    eyebrow: "Категория",
    fallbackDescriptionSuffix:
      "товары категории для безопасности, сетей и электроники.",
    allProducts: "Все товары",
    clearFilters: "Очистить фильтры",

    foundSuffix: "товаров найдено",
    searchLabel: "Поиск",
    brandLabel: "Бренд",
    specLabel: "Характеристика",

    stockIn: "В наличии",
    stockOut: "Нет в наличии",
    stockPreOrder: "Предзаказ",

    sortOldest: "Самые старые",
    sortFeatured: "Сначала избранные",
    sortPriceAsc: "Цена: по возрастанию",
    sortPriceDesc: "Цена: по убыванию",

    emptyEyebrow: "Нет товаров",
    emptyTitle: "По выбранным фильтрам товары не найдены",
    emptyDescription: "Попробуйте изменить фильтры и проверить снова.",
  },
} as const;
