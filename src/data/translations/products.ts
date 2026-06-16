export const productsTranslations = {
  az: {
    metadataTitle: "Məhsullar",
    metadataDescription:
      "KHATT Electronics məhsul kataloqu: kamera sistemləri, videomüşahidə avadanlıqları, keçidə nəzarət, şəbəkə avadanlıqları və təhlükəsizlik həlləri.",
    openGraphTitle: "Məhsullar | KHATT Electronics",
    openGraphDescription:
      "Kamera sistemləri, videomüşahidə avadanlıqları, keçidə nəzarət və şəbəkə məhsulları.",

    eyebrow: "Məhsullar",
    title: "Peşəkar təhlükəsizlik və elektronika həlləri",
    description:
      "Kamera sistemləri, şəbəkə avadanlıqları, aksesuarlar və layihələr üçün seçilmiş məhsullar.",

    foundSuffix: "məhsul tapıldı",
    searchLabel: "Axtarış",
    categoryLabel: "Kateqoriya",
    brandLabel: "Brend",
    specLabel: "Xüsusiyyət",
    clearAll: "Filtrləri təmizlə",

    stockIn: "Stokda var",
    stockOut: "Stokda yoxdur",
    stockPreOrder: "Öncədən sifariş",

    sortOldest: "Ən köhnə",
    sortFeatured: "Seçilmişlər əvvəl",
    sortPriceAsc: "Qiymət: ucuzdan bahaya",
    sortPriceDesc: "Qiymət: bahadan ucuza",

    emptyTitle: "Məhsul tapılmadı",
    emptyDescription: "Axtarış və filterləri dəyişərək yenidən yoxlayın.",
  },

  en: {
    metadataTitle: "Products",
    metadataDescription:
      "KHATT Electronics product catalog: camera systems, video surveillance equipment, access control, network equipment and security solutions.",
    openGraphTitle: "Products | KHATT Electronics",
    openGraphDescription:
      "Camera systems, video surveillance equipment, access control and network products.",

    eyebrow: "Products",
    title: "Professional security and electronics solutions",
    description:
      "Selected products for camera systems, network equipment, accessories and projects.",

    foundSuffix: "products found",
    searchLabel: "Search",
    categoryLabel: "Category",
    brandLabel: "Brand",
    specLabel: "Specification",
    clearAll: "Clear filters",

    stockIn: "In stock",
    stockOut: "Out of stock",
    stockPreOrder: "Pre-order",

    sortOldest: "Oldest",
    sortFeatured: "Featured first",
    sortPriceAsc: "Price: low to high",
    sortPriceDesc: "Price: high to low",

    emptyTitle: "No products found",
    emptyDescription: "Try changing your search query or selected filters.",
  },

  ru: {
    metadataTitle: "Товары",
    metadataDescription:
      "Каталог KHATT Electronics: системы камер, оборудование видеонаблюдения, контроль доступа, сетевое оборудование и решения безопасности.",
    openGraphTitle: "Товары | KHATT Electronics",
    openGraphDescription:
      "Системы камер, оборудование видеонаблюдения, контроль доступа и сетевые товары.",

    eyebrow: "Товары",
    title: "Профессиональные решения для безопасности и электроники",
    description:
      "Подобранные товары для систем камер, сетевого оборудования, аксессуаров и проектов.",

    foundSuffix: "товаров найдено",
    searchLabel: "Поиск",
    categoryLabel: "Категория",
    brandLabel: "Бренд",
    specLabel: "Характеристика",
    clearAll: "Очистить фильтры",

    stockIn: "В наличии",
    stockOut: "Нет в наличии",
    stockPreOrder: "Предзаказ",

    sortOldest: "Самые старые",
    sortFeatured: "Сначала избранные",
    sortPriceAsc: "Цена: по возрастанию",
    sortPriceDesc: "Цена: по убыванию",

    emptyTitle: "Товары не найдены",
    emptyDescription:
      "Попробуйте изменить поисковый запрос или выбранные фильтры.",
  },
} as const;

export type ProductsLocale = keyof typeof productsTranslations;
