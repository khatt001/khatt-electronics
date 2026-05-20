export type Locale = "az" | "en" | "ru";

export type HomeTranslation = {
  heroEyebrow: string;
  heroTitle: string;
  heroDescription: string;
  heroPoints: string[];
  productsButton: string;
  consultationButton: string;
  quickStats: {
    value: string;
    label: string;
  }[];

  searchPlaceholder: string;
  searchButton: string;

  featuredEyebrow: string;
  featuredTitle: string;
  featuredViewAll: string;
  featuredEmptyTitle: string;
  featuredEmptyDescription: string;

  categoriesEyebrow: string;
  categoriesTitle: string;
  categoriesDescription: string;
  categoriesViewAll: string;
  categoryViewButton: string;
  categoryFallbackDescription: string;

  servicesEyebrow: string;
  servicesTitle: string;
  servicesDescription: string;
  servicesProductsButton: string;
  servicesConsultationButton: string;
  services: string[];
};

export const homeTranslations: Record<Locale, HomeTranslation> = {
  az: {
    heroEyebrow: "KHATT Electronics",
    heroTitle: "Təhlükəsizlik və smart elektronika məhsulları",
    heroDescription:
      "Kamera sistemləri, keçidə nəzarət, domofon, siqnalizasiya və şəbəkə avadanlıqlarını onlayn seçin, səbətə əlavə edin və sifarişinizi tamamlayın.",
    heroPoints: ["Stok və qiymət", "Sürətli sifariş", "Texniki dəstək"],
    productsButton: "Məhsullara bax",
    consultationButton: "Məsləhət al",
    quickStats: [
      { value: "24/7", label: "Texniki dəstək" },
      { value: "100+", label: "Məhsul seçimi" },
      { value: "AZ", label: "Lokal xidmət" },
    ],

    searchPlaceholder: "Məhsul, kateqoriya və ya model axtar...",
    searchButton: "Axtar",

    featuredEyebrow: "Məhsullar",
    featuredTitle: "Seçilmiş məhsullar",
    featuredViewAll: "Hamısına bax",
    featuredEmptyTitle: "Seçilmiş məhsul yoxdur",
    featuredEmptyDescription:
      "Admin paneldən məhsul əlavə edildikdən sonra burada görünəcək.",

    categoriesEyebrow: "Kateqoriyalar",
    categoriesTitle: "Əsas məhsul istiqamətləri",
    categoriesDescription:
      "Təhlükəsizlik, videomüşahidə, şəbəkə və ağıllı sistemlər üzrə məhsulları kateqoriyalara görə kəşf edin.",
    categoriesViewAll: "Bütün məhsullar",
    categoryViewButton: "Kateqoriyaya bax",
    categoryFallbackDescription:
      "Bu kateqoriyaya aid məhsullara baxın.",

    servicesEyebrow: "Dəstək və xidmət",
    servicesTitle: "Məhsul seçimi və quraşdırılmada yanınızdayıq",
    servicesDescription:
      "Məhsulu onlayn sifariş edə, layihənizə uyğun seçim üçün bizimlə əlaqə saxlaya və sifarişinizi sonradan izləyə bilərsiniz.",
    servicesProductsButton: "Məhsullara bax",
    servicesConsultationButton: "Məsləhət al",
    services: [
      "Obyektə uyğun məhsul seçimi",
      "Kamera sayı və texniki ehtiyac hesablanması",
      "Qiymət təklifi və avadanlıq siyahısı",
      "Quraşdırma üçün texniki məsləhət",
    ],
  },

  en: {
    heroEyebrow: "KHATT Electronics",
    heroTitle: "Security and smart electronics products",
    heroDescription:
      "Choose CCTV systems, access control, intercoms, alarm systems and networking equipment online, add products to your cart and complete your order.",
    heroPoints: ["Stock and pricing", "Fast ordering", "Technical support"],
    productsButton: "View products",
    consultationButton: "Get consultation",
    quickStats: [
      { value: "24/7", label: "Technical support" },
      { value: "100+", label: "Product range" },
      { value: "AZ", label: "Local service" },
    ],

    searchPlaceholder: "Search by product, category or model...",
    searchButton: "Search",

    featuredEyebrow: "Products",
    featuredTitle: "Featured products",
    featuredViewAll: "View all",
    featuredEmptyTitle: "No featured products yet",
    featuredEmptyDescription:
      "Products will appear here after they are added from the admin panel.",

    categoriesEyebrow: "Categories",
    categoriesTitle: "Main product directions",
    categoriesDescription:
      "Discover products by category across security, video surveillance, networking and smart systems.",
    categoriesViewAll: "All products",
    categoryViewButton: "View category",
    categoryFallbackDescription:
      "Explore products available in this category.",

    servicesEyebrow: "Support and service",
    servicesTitle: "We help you choose and install the right products",
    servicesDescription:
      "You can order products online, contact us for project-based selection support and track your order afterwards.",
    servicesProductsButton: "View products",
    servicesConsultationButton: "Get consultation",
    services: [
      "Product selection based on your site",
      "Camera quantity and technical needs calculation",
      "Quotation and equipment list",
      "Technical advice for installation",
    ],
  },

  ru: {
    heroEyebrow: "KHATT Electronics",
    heroTitle: "Товары для безопасности и умной электроники",
    heroDescription:
      "Выбирайте системы видеонаблюдения, контроль доступа, домофоны, сигнализацию и сетевое оборудование онлайн, добавляйте товары в корзину и оформляйте заказ.",
    heroPoints: ["Наличие и цены", "Быстрый заказ", "Техническая поддержка"],
    productsButton: "Смотреть товары",
    consultationButton: "Получить консультацию",
    quickStats: [
      { value: "24/7", label: "Техническая поддержка" },
      { value: "100+", label: "Ассортимент товаров" },
      { value: "AZ", label: "Локальный сервис" },
    ],

    searchPlaceholder: "Поиск по товару, категории или модели...",
    searchButton: "Поиск",

    featuredEyebrow: "Товары",
    featuredTitle: "Избранные товары",
    featuredViewAll: "Смотреть все",
    featuredEmptyTitle: "Избранных товаров пока нет",
    featuredEmptyDescription:
      "Товары появятся здесь после добавления через панель администратора.",

    categoriesEyebrow: "Категории",
    categoriesTitle: "Основные направления товаров",
    categoriesDescription:
      "Откройте товары по категориям: безопасность, видеонаблюдение, сети и умные системы.",
    categoriesViewAll: "Все товары",
    categoryViewButton: "Смотреть категорию",
    categoryFallbackDescription:
      "Посмотрите товары, доступные в этой категории.",

    servicesEyebrow: "Поддержка и сервис",
    servicesTitle: "Мы поможем выбрать и установить подходящие товары",
    servicesDescription:
      "Вы можете заказать товары онлайн, связаться с нами для подбора под проект и затем отслеживать заказ.",
    servicesProductsButton: "Смотреть товары",
    servicesConsultationButton: "Получить консультацию",
    services: [
      "Подбор товаров под объект",
      "Расчет количества камер и технических потребностей",
      "Коммерческое предложение и список оборудования",
      "Техническая консультация по установке",
    ],
  },
};