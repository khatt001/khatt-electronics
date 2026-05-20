import {
  Cable,
  Camera,
  Fingerprint,
  Flame,
  Home,
  Monitor,
  Network,
  Router,
  ShieldCheck,
  Video,
  Zap,
} from "lucide-react";
import type { Locale } from "@/data/translations/layout";

export const catalogCategories = {
  az: [
    {
      title: "Video Nəzarət Sistemi",
      href: "/category/video-nezaret",
      subcategories: ["IP kameralar", "Analog kameralar", "NVR", "DVR", "PTZ kameralar"],
    },
    {
      title: "Girişə Nəzarət",
      href: "/category/girise-nezaret",
      subcategories: ["Biometrik terminallar", "Kart oxuyucular", "Turniketlər", "Elektron kilidlər"],
    },
    {
      title: "Domofoniya",
      href: "/category/domofoniya",
      subcategories: ["IP domofonlar", "Analog domofonlar", "Monitorlar", "Çağırış panelləri"],
    },
    {
      title: "Ağıllı Ev Sistemləri",
      href: "/category/agilli-ev",
      subcategories: ["Smart hub", "Sensorlar", "İşıqlandırma", "Avtomatlaşdırma"],
    },
    {
      title: "Yanğın Sistemləri",
      href: "/category/yangin-sistemleri",
      subcategories: ["Detektorlar", "İdarəetmə panelləri", "Sirena", "Yanğın kabeli"],
    },
    {
      title: "Təhlükəsizlik Siqnalizasiyası",
      href: "/category/siqnalizasiya",
      subcategories: ["Simli sistemlər", "Simsiz sistemlər", "Sensorlar", "Sirenalar"],
    },
    {
      title: "Şəbəkə Avadanlıqları",
      href: "/category/sebeke",
      subcategories: ["PoE switch", "Routerlər", "Access point", "SFP modullar"],
    },
    {
      title: "Kabellər və Aksessuarlar",
      href: "/category/kabeller",
      subcategories: ["UTP kabel", "Koaksial kabel", "BNC", "Adapterlər"],
    },
  ],

  en: [
    {
      title: "Video Surveillance System",
      href: "/en/category/video-nezaret",
      subcategories: ["IP cameras", "Analog cameras", "NVR", "DVR", "PTZ cameras"],
    },
    {
      title: "Access Control",
      href: "/en/category/girise-nezaret",
      subcategories: ["Biometric terminals", "Card readers", "Turnstiles", "Electronic locks"],
    },
    {
      title: "Intercom",
      href: "/en/category/domofoniya",
      subcategories: ["IP intercoms", "Analog intercoms", "Monitors", "Call panels"],
    },
    {
      title: "Smart Home Systems",
      href: "/en/category/agilli-ev",
      subcategories: ["Smart hub", "Sensors", "Lighting", "Automation"],
    },
    {
      title: "Fire Systems",
      href: "/en/category/yangin-sistemleri",
      subcategories: ["Detectors", "Control panels", "Siren", "Fire cable"],
    },
    {
      title: "Security Alarm",
      href: "/en/category/siqnalizasiya",
      subcategories: ["Wired systems", "Wireless systems", "Sensors", "Sirens"],
    },
    {
      title: "Network Equipment",
      href: "/en/category/sebeke",
      subcategories: ["PoE switch", "Routers", "Access point", "SFP modules"],
    },
    {
      title: "Cables and Accessories",
      href: "/en/category/kabeller",
      subcategories: ["UTP cable", "Coaxial cable", "BNC", "Adapters"],
    },
  ],

  ru: [
    {
      title: "Система видеонаблюдения",
      href: "/ru/category/video-nezaret",
      subcategories: ["IP камеры", "Аналоговые камеры", "NVR", "DVR", "PTZ камеры"],
    },
    {
      title: "Контроль доступа",
      href: "/ru/category/girise-nezaret",
      subcategories: ["Биометрические терминалы", "Считыватели карт", "Турникеты", "Электронные замки"],
    },
    {
      title: "Домофония",
      href: "/ru/category/domofoniya",
      subcategories: ["IP домофоны", "Аналоговые домофоны", "Мониторы", "Вызывные панели"],
    },
    {
      title: "Системы умного дома",
      href: "/ru/category/agilli-ev",
      subcategories: ["Smart hub", "Датчики", "Освещение", "Автоматизация"],
    },
    {
      title: "Пожарные системы",
      href: "/ru/category/yangin-sistemleri",
      subcategories: ["Детекторы", "Панели управления", "Сирена", "Пожарный кабель"],
    },
    {
      title: "Охранная сигнализация",
      href: "/ru/category/siqnalizasiya",
      subcategories: ["Проводные системы", "Беспроводные системы", "Датчики", "Сирены"],
    },
    {
      title: "Сетевое оборудование",
      href: "/ru/category/sebeke",
      subcategories: ["PoE switch", "Роутеры", "Access point", "SFP модули"],
    },
    {
      title: "Кабели и аксессуары",
      href: "/ru/category/kabeller",
      subcategories: ["UTP кабель", "Коаксиальный кабель", "BNC", "Адаптеры"],
    },
  ],
} satisfies Record<Locale, readonly {
  title: string;
  href: string;
  subcategories: readonly string[];
}[]>;

export const categoryCards = {
  az: [
    {
      title: "Videomüşahidə",
      description: "IP, Turbo HD, PTZ və smart kamera sistemləri.",
      href: "/category/video-nezaret",
      icon: Camera,
    },
    {
      title: "Keçidə Nəzarət",
      description: "Biometrik, kartlı və korporativ keçid sistemləri.",
      href: "/category/girise-nezaret",
      icon: Fingerprint,
    },
    {
      title: "Domofon",
      description: "Ev və obyektlər üçün IP və analog domofon sistemləri.",
      href: "/category/domofoniya",
      icon: Video,
    },
    {
      title: "Siqnalizasiya",
      description: "Mühafizə və yanğın siqnalizasiya həlləri.",
      href: "/category/siqnalizasiya",
      icon: ShieldCheck,
    },
    {
      title: "Şəbəkə",
      description: "PoE switch, router, access point və optik avadanlıqlar.",
      href: "/category/sebeke",
      icon: Network,
    },
    {
      title: "Ağıllı Ev",
      description: "Smart təhlükəsizlik və avtomatlaşdırma sistemləri.",
      href: "/category/agilli-ev",
      icon: Home,
    },
  ],

  en: [
    {
      title: "Video Surveillance",
      description: "IP, Turbo HD, PTZ and smart camera systems.",
      href: "/en/category/video-nezaret",
      icon: Camera,
    },
    {
      title: "Access Control",
      description: "Biometric, card-based and corporate access systems.",
      href: "/en/category/girise-nezaret",
      icon: Fingerprint,
    },
    {
      title: "Intercom",
      description: "IP and analog intercom systems for homes and facilities.",
      href: "/en/category/domofoniya",
      icon: Video,
    },
    {
      title: "Alarm Systems",
      description: "Security and fire alarm solutions.",
      href: "/en/category/siqnalizasiya",
      icon: ShieldCheck,
    },
    {
      title: "Network",
      description: "PoE switches, routers, access points and optical equipment.",
      href: "/en/category/sebeke",
      icon: Network,
    },
    {
      title: "Smart Home",
      description: "Smart security and automation systems.",
      href: "/en/category/agilli-ev",
      icon: Home,
    },
  ],

  ru: [
    {
      title: "Видеонаблюдение",
      description: "IP, Turbo HD, PTZ и smart системы камер.",
      href: "/ru/category/video-nezaret",
      icon: Camera,
    },
    {
      title: "Контроль доступа",
      description: "Биометрические, карточные и корпоративные системы доступа.",
      href: "/ru/category/girise-nezaret",
      icon: Fingerprint,
    },
    {
      title: "Домофон",
      description: "IP и аналоговые домофонные системы для домов и объектов.",
      href: "/ru/category/domofoniya",
      icon: Video,
    },
    {
      title: "Сигнализация",
      description: "Решения для охранной и пожарной сигнализации.",
      href: "/ru/category/siqnalizasiya",
      icon: ShieldCheck,
    },
    {
      title: "Сеть",
      description: "PoE switch, router, access point и оптическое оборудование.",
      href: "/ru/category/sebeke",
      icon: Network,
    },
    {
      title: "Умный дом",
      description: "Smart безопасность и системы автоматизации.",
      href: "/ru/category/agilli-ev",
      icon: Home,
    },
  ],
} satisfies Record<Locale, readonly {
  title: string;
  description: string;
  href: string;
  icon: typeof Camera;
}[]>;

export const featuredProducts = {
  az: [
    {
      name: "4MP IP Dome Kamera",
      category: "IP Kamera",
      price: "Qiymət sorğu ilə",
      badge: "Populyar",
      href: "/products",
    },
    {
      name: "8 Kanal NVR Qeydiyyatçı",
      category: "NVR",
      price: "Qiymət sorğu ilə",
      badge: "Yeni",
      href: "/products",
    },
    {
      name: "PoE Switch 8 Port",
      category: "Şəbəkə",
      price: "Qiymət sorğu ilə",
      badge: "Tövsiyə",
      href: "/products",
    },
    {
      name: "Üz Tanıma Terminalı",
      category: "Access Control",
      price: "Qiymət sorğu ilə",
      badge: "B2B",
      href: "/products",
    },
  ],

  en: [
    {
      name: "4MP IP Dome Camera",
      category: "IP Camera",
      price: "Price on request",
      badge: "Popular",
      href: "/en/products",
    },
    {
      name: "8 Channel NVR Recorder",
      category: "NVR",
      price: "Price on request",
      badge: "New",
      href: "/en/products",
    },
    {
      name: "PoE Switch 8 Port",
      category: "Network",
      price: "Price on request",
      badge: "Recommended",
      href: "/en/products",
    },
    {
      name: "Face Recognition Terminal",
      category: "Access Control",
      price: "Price on request",
      badge: "B2B",
      href: "/en/products",
    },
  ],

  ru: [
    {
      name: "4MP IP Dome камера",
      category: "IP камера",
      price: "Цена по запросу",
      badge: "Популярное",
      href: "/ru/products",
    },
    {
      name: "8-канальный NVR регистратор",
      category: "NVR",
      price: "Цена по запросу",
      badge: "Новинка",
      href: "/ru/products",
    },
    {
      name: "PoE Switch 8 Port",
      category: "Сеть",
      price: "Цена по запросу",
      badge: "Рекомендуем",
      href: "/ru/products",
    },
    {
      name: "Терминал распознавания лица",
      category: "Access Control",
      price: "Цена по запросу",
      badge: "B2B",
      href: "/ru/products",
    },
  ],
} satisfies Record<Locale, readonly {
  name: string;
  category: string;
  price: string;
  badge: string;
  href: string;
}[]>;

export const quickStats = {
  az: [
    { label: "Kamera və təhlükəsizlik", value: "CCTV" },
    { label: "Onlayn sifariş", value: "Cart" },
    { label: "Texniki seçim dəstəyi", value: "Support" },
  ],
  en: [
    { label: "Camera and security", value: "CCTV" },
    { label: "Online order", value: "Cart" },
    { label: "Technical selection support", value: "Support" },
  ],
  ru: [
    { label: "Камеры и безопасность", value: "CCTV" },
    { label: "Онлайн-заказ", value: "Cart" },
    { label: "Поддержка подбора", value: "Support" },
  ],
} satisfies Record<Locale, readonly { label: string; value: string }[]>;

export const services = {
  az: [
    "Məhsul seçimi üzrə məsləhət",
    "Sistem layihələndirilməsi",
    "Professional quraşdırılma",
    "Uzaqdan konfiqurasiya",
    "Servis və baxım",
    "Korporativ həllər",
  ],
  en: [
    "Product selection consulting",
    "System project planning",
    "Professional installation",
    "Remote configuration",
    "Service and maintenance",
    "Corporate solutions",
  ],
  ru: [
    "Консультация по подбору товаров",
    "Проектирование системы",
    "Профессиональная установка",
    "Удаленная настройка",
    "Сервис и обслуживание",
    "Корпоративные решения",
  ],
} satisfies Record<Locale, readonly string[]>;

export const promoItems = {
  az: [
    {
      title: "Kamera sistemi qurmaq istəyirsiniz?",
      description:
        "Məhsulları kataloqdan seçin, uyğun kamera, qeydiyyatçı və aksesuarları səbətə əlavə edin.",
      href: "/category/video-nezaret",
      icon: Monitor,
    },
    {
      title: "Şəbəkə və PoE avadanlıqları",
      description:
        "PoE switch, router və access point kimi avadanlıqları layihənizə uyğun seçin.",
      href: "/category/sebeke",
      icon: Router,
    },
  ],

  en: [
    {
      title: "Planning to build a camera system?",
      description:
        "Choose products from the catalog and add suitable cameras, recorders and accessories to your cart.",
      href: "/en/category/video-nezaret",
      icon: Monitor,
    },
    {
      title: "Network and PoE equipment",
      description:
        "Choose PoE switches, routers and access points according to your project.",
      href: "/en/category/sebeke",
      icon: Router,
    },
  ],

  ru: [
    {
      title: "Планируете установить систему камер?",
      description:
        "Выберите товары из каталога и добавьте подходящие камеры, регистраторы и аксессуары в корзину.",
      href: "/ru/category/video-nezaret",
      icon: Monitor,
    },
    {
      title: "Сетевое и PoE оборудование",
      description:
        "Выберите PoE switch, router и access point под ваш проект.",
      href: "/ru/category/sebeke",
      icon: Router,
    },
  ],
} satisfies Record<Locale, readonly {
  title: string;
  description: string;
  href: string;
  icon: typeof Monitor;
}[]>;

export const miniCategories = {
  az: [
    { title: "Enerji təminatı", href: "/products", icon: Zap },
    { title: "Yanğın sistemi", href: "/category/yangin-sistemleri", icon: Flame },
    { title: "Kabellər", href: "/category/kabeller", icon: Cable },
  ],
  en: [
    { title: "Power supply", href: "/en/products", icon: Zap },
    { title: "Fire system", href: "/en/category/yangin-sistemleri", icon: Flame },
    { title: "Cables", href: "/en/category/kabeller", icon: Cable },
  ],
  ru: [
    { title: "Питание", href: "/ru/products", icon: Zap },
    { title: "Пожарная система", href: "/ru/category/yangin-sistemleri", icon: Flame },
    { title: "Кабели", href: "/ru/category/kabeller", icon: Cable },
  ],
} satisfies Record<Locale, readonly {
  title: string;
  href: string;
  icon: typeof Zap;
}[]>;

export const defaultHomeData = {
  catalogCategories: catalogCategories.az,
  categoryCards: categoryCards.az,
  featuredProducts: featuredProducts.az,
  quickStats: quickStats.az,
  services: services.az,
  promoItems: promoItems.az,
  miniCategories: miniCategories.az,
};