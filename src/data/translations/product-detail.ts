export type ProductDetailLocale = "az" | "en" | "ru";

export const productDetailTranslations = {
  az: {
    notFoundTitle: "Məhsul tapılmadı",

    backToProducts: "Məhsullara qayıt",
    viewCart: "Səbətə bax",
    price: "Qiymət",
    priceAdvice:
      "Bu məhsul üçün sifarişdən əvvəl məsləhət almağınız tövsiyə olunur.",
    stockStatus: "Stok vəziyyəti",
    inStockPrefix: "Stokda",
    inStockSuffix: "ədəd var",
    preOrderAvailable: "Öncədən sifariş mümkündür",
    outOfStock: "Stokda yoxdur",

    whatsappTextPrefix: "Salam. Bu məhsul haqqında məlumat almaq istəyirəm:",
    whatsappButton: "WhatsApp ilə məsləhət al",

    trustItems: ["Zəmanət", "Quraşdırılma", "Texniki dəstək"],

    aboutProduct: "Məhsul haqqında",
    fallbackDescription:
      "Bu məhsul üçün detallı məlumat tezliklə əlavə olunacaq.",
    technicalSpecs: "Texniki göstəricilər",
    emptySpecs: "Texniki göstəricilər hələ əlavə edilməyib.",

    documents: "Sənədlər",
    emptyDocuments: "Datasheet və sənədlər tezliklə əlavə olunacaq.",

    homeBreadcrumb: "Ana səhifə",
    productsBreadcrumb: "Məhsullar",

    productPageSuffix: "KHATT Electronics məhsul səhifəsi.",
    priceOnRequest: "Qiymət sorğu ilə",
  },

  en: {
    notFoundTitle: "Product not found",

    backToProducts: "Back to products",
    viewCart: "View cart",
    price: "Price",
    priceAdvice:
      "We recommend getting consultation before ordering this product.",
    stockStatus: "Stock status",
    inStockPrefix: "In stock",
    inStockSuffix: "pcs available",
    preOrderAvailable: "Pre-order is available",
    outOfStock: "Out of stock",

    whatsappTextPrefix:
      "Hello. I would like to get information about this product:",
    whatsappButton: "Get consultation via WhatsApp",

    trustItems: ["Warranty", "Installation", "Technical support"],

    aboutProduct: "About product",
    fallbackDescription:
      "Detailed information for this product will be added soon.",
    technicalSpecs: "Technical specifications",
    emptySpecs: "Technical specifications have not been added yet.",

    documents: "Documents",
    emptyDocuments: "Datasheets and documents will be added soon.",

    homeBreadcrumb: "Home",
    productsBreadcrumb: "Products",

    productPageSuffix: "KHATT Electronics product page.",
    priceOnRequest: "Price on request",
  },

  ru: {
    notFoundTitle: "Товар не найден",

    backToProducts: "Назад к товарам",
    viewCart: "Смотреть корзину",
    price: "Цена",
    priceAdvice:
      "Перед заказом этого товара рекомендуется получить консультацию.",
    stockStatus: "Наличие",
    inStockPrefix: "В наличии",
    inStockSuffix: "шт.",
    preOrderAvailable: "Предзаказ доступен",
    outOfStock: "Нет в наличии",

    whatsappTextPrefix:
      "Здравствуйте. Я хочу получить информацию об этом товаре:",
    whatsappButton: "Получить консультацию в WhatsApp",

    trustItems: ["Гарантия", "Установка", "Техническая поддержка"],

    aboutProduct: "О товаре",
    fallbackDescription:
      "Подробная информация об этом товаре скоро будет добавлена.",
    technicalSpecs: "Технические характеристики",
    emptySpecs: "Технические характеристики пока не добавлены.",

    documents: "Документы",
    emptyDocuments: "Datasheet и документы скоро будут добавлены.",

    homeBreadcrumb: "Главная",
    productsBreadcrumb: "Товары",

    productPageSuffix: "страница товара KHATT Electronics.",
    priceOnRequest: "Цена по запросу",
  },
} as const;
