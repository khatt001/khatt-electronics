export type ProductsFilterLocale = "az" | "en" | "ru";

export const productsFilterTranslations = {
  az: {
    searchTitle: "Axtarış",
    searchSrLabel: "Məhsul axtar",
    searchPlaceholder: "Məhsul axtar...",

    categoryTitle: "Kateqoriya",
    allCategories: "Bütün kateqoriyalar",

    brandTitle: "Brend",

    stockTitle: "Stok vəziyyəti",
    stockIn: "Stokda var",
    stockOut: "Stokda yoxdur",
    stockPreOrder: "Öncədən sifariş",

    loadingFilters: "Filterlər yüklənir...",

    mobileFilterButton: "Filter",
    sortNewest: "Ən yeni",
    sortOldest: "Ən köhnə",
    sortFeatured: "Seçilmişlər əvvəl",
    sortPriceAsc: "Qiymət: ucuzdan bahaya",
    sortPriceDesc: "Qiymət: bahadan ucuza",

    filtersTitle: "Filterlər",
    filtersDescription: "Məhsulları dəqiqləşdirin.",
    clearAll: "Hamısını təmizlə",
    closeFilterAria: "Filteri bağla",
    showResults: "Nəticələri göstər",
  },

  en: {
    searchTitle: "Search",
    searchSrLabel: "Search product",
    searchPlaceholder: "Search product...",

    categoryTitle: "Category",
    allCategories: "All categories",

    brandTitle: "Brand",

    stockTitle: "Stock status",
    stockIn: "In stock",
    stockOut: "Out of stock",
    stockPreOrder: "Pre-order",

    loadingFilters: "Loading filters...",

    mobileFilterButton: "Filter",
    sortNewest: "Newest",
    sortOldest: "Oldest",
    sortFeatured: "Featured first",
    sortPriceAsc: "Price: low to high",
    sortPriceDesc: "Price: high to low",

    filtersTitle: "Filters",
    filtersDescription: "Refine products.",
    clearAll: "Clear all",
    closeFilterAria: "Close filter",
    showResults: "Show results",
  },

  ru: {
    searchTitle: "Поиск",
    searchSrLabel: "Поиск товара",
    searchPlaceholder: "Поиск товара...",

    categoryTitle: "Категория",
    allCategories: "Все категории",

    brandTitle: "Бренд",

    stockTitle: "Наличие",
    stockIn: "В наличии",
    stockOut: "Нет в наличии",
    stockPreOrder: "Предзаказ",

    loadingFilters: "Фильтры загружаются...",

    mobileFilterButton: "Фильтр",
    sortNewest: "Сначала новые",
    sortOldest: "Самые старые",
    sortFeatured: "Сначала избранные",
    sortPriceAsc: "Цена: по возрастанию",
    sortPriceDesc: "Цена: по убыванию",

    filtersTitle: "Фильтры",
    filtersDescription: "Уточните товары.",
    clearAll: "Очистить все",
    closeFilterAria: "Закрыть фильтр",
    showResults: "Показать результаты",
  },
} as const;