import type { Locale } from "@/lib/i18n";

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

  catalogTitle: string;
  catalogAriaLabel: string;
  catalogCategories: {
    title: string;
    href: string;
    subcategories: string[];
  }[];

  promoReadMore: string;
  promoItems: {
    title: string;
    description: string;
    href: string;
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
    heroEyebrow: "Təhlükəsizlik və smart sistemlər",
heroTitle: "Obyektiniz üçün etibarlı təhlükəsizlik həlləri",
heroDescription:
  "Videomüşahidə, yanğın siqnalizasiya, keçidə nəzarət və şəbəkə sistemlərini layihənizə uyğun seçir, təchiz edir və texniki dəstək göstəririk.",
heroPoints: [
  "Rəsmi zəmanət",
  "Layihəyə uyğun seçim",
  "Texniki dəstək",
],
productsButton: "Məhsullara bax",
consultationButton: "Layihə üçün təklif al",
    quickStats: [
      { value: "24/7", label: "Texniki dəstək" },
      { value: "100+", label: "Məhsul seçimi" },
      { value: "AZ", label: "Lokal xidmət" },
    ],

    catalogTitle: "Məhsul kataloqu",
    catalogAriaLabel: "Məhsul kataloqu",
    catalogCategories: [
      {
        title: "Videomüşahidə",
        href: "/products?category=video-nezaret",
        subcategories: ["IP kamera", "NVR", "DVR", "PTZ"],
      },
      {
        title: "Keçidə nəzarət",
        href: "/products?category=girise-nezaret",
        subcategories: ["Turniket", "Kart oxuyucu", "Biometrik sistem"],
      },
      {
        title: "Domofon",
        href: "/products?category=domofoniya",
        subcategories: ["IP domofon", "Monitor", "Panel"],
      },
      {
        title: "Siqnalizasiya",
        href: "/products?category=siqnalizasiya",
        subcategories: ["Sensor", "Panel", "Sirena"],
      },
      {
        title: "Şəbəkə",
        href: "/products?category=sebeke",
        subcategories: ["Switch", "Router", "Kabel"],
      },
    ],

    promoReadMore: "Ətraflı",
    promoItems: [
      {
        title: "Layihəyə uyğun seçim",
        description:
          "Obyektinizə uyğun kamera, NVR, PoE switch və kabel ehtiyacını birlikdə hesablayaq.",
        href: "/contact?source=consultation",
      },
      {
        title: "Qiymət təklifi al",
        description:
          "Məhsul siyahınızı göndərin, sizə uyğun qiymət təklifi hazırlayaq.",
        href: "/contact?source=estimate",
      },
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

    catalogTitle: "Product catalog",
    catalogAriaLabel: "Product catalog",
    catalogCategories: [
      {
        title: "Video surveillance",
        href: "/en/products?category=video-nezaret",
        subcategories: ["IP camera", "NVR", "DVR", "PTZ"],
      },
      {
        title: "Access control",
        href: "/en/products?category=girise-nezaret",
        subcategories: ["Turnstile", "Card reader", "Biometric system"],
      },
      {
        title: "Intercom",
        href: "/en/products?category=domofoniya",
        subcategories: ["IP intercom", "Monitor", "Panel"],
      },
      {
        title: "Alarm systems",
        href: "/en/products?category=siqnalizasiya",
        subcategories: ["Sensor", "Panel", "Siren"],
      },
      {
        title: "Networking",
        href: "/en/products?category=sebeke",
        subcategories: ["Switch", "Router", "Cable"],
      },
    ],

    promoReadMore: "Learn more",
    promoItems: [
      {
        title: "Project-based selection",
        description:
          "Let us calculate the camera, NVR, PoE switch and cable requirements for your site.",
        href: "/en/contact?source=consultation",
      },
      {
        title: "Request a quote",
        description:
          "Send your product list and we will prepare a suitable price offer for you.",
        href: "/en/contact?source=estimate",
      },
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

    catalogTitle: "Каталог товаров",
    catalogAriaLabel: "Каталог товаров",
    catalogCategories: [
      {
        title: "Видеонаблюдение",
        href: "/ru/products?category=video-nezaret",
        subcategories: ["IP камера", "NVR", "DVR", "PTZ"],
      },
      {
        title: "Контроль доступа",
        href: "/ru/products?category=girise-nezaret",
        subcategories: ["Турникет", "Картридер", "Биометрия"],
      },
      {
        title: "Домофон",
        href: "/ru/products?category=domofoniya",
        subcategories: ["IP домофон", "Монитор", "Панель"],
      },
      {
        title: "Сигнализация",
        href: "/ru/products?category=siqnalizasiya",
        subcategories: ["Датчик", "Панель", "Сирена"],
      },
      {
        title: "Сеть",
        href: "/ru/products?category=sebeke",
        subcategories: ["Switch", "Router", "Кабель"],
      },
    ],

    promoReadMore: "Подробнее",
    promoItems: [
      {
        title: "Подбор под проект",
        description:
          "Рассчитаем камеры, NVR, PoE switch и кабельные потребности под ваш объект.",
        href: "/ru/contact?source=consultation",
      },
      {
        title: "Получить предложение",
        description:
          "Отправьте список товаров, и мы подготовим для вас подходящее ценовое предложение.",
        href: "/ru/contact?source=estimate",
      },
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