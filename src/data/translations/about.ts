import {
  BadgeCheck,
  Building2,
  ShieldCheck,
  Target,
  Users,
  Wrench,
} from "lucide-react";

export type Locale = "az" | "en" | "ru";

export const aboutTranslations = {
  az: {
    metadataTitle: "Haqqımızda",
    metadataDescription:
      "KHATT Electronics təhlükəsizlik sistemləri, videomüşahidə, keçidə nəzarət, domofon, siqnalizasiya və ağıllı texnologiya həlləri üzrə peşəkar xidmət göstərir.",

    eyebrow: "Haqqımızda",
    title:
      "Təhlükəsizlik və elektronika həllərində etibarlı texniki tərəfdaş",
    description:
      "KHATT Electronics olaraq məqsədimiz obyektlər üçün stabil, ölçülə bilən və uzunmüddətli işləyən təhlükəsizlik və elektronika həlləri təqdim etməkdir.",
    contactButton: "Bizimlə əlaqə",
    servicesButton: "Xidmətlərə bax",

    darkCardIcon: Building2,
    darkCardTitle: "Biz nə edirik?",
    darkCardDescription:
      "Kamera sistemləri, keçidə nəzarət, siqnalizasiya, domofon, şəbəkə infrastrukturu və texniki dəstək istiqamətində məhsul və layihə əsaslı həllər təqdim edirik.",

    stats: [
      { label: "Xidmət istiqaməti", value: "6+" },
      { label: "Məhsul kateqoriyası", value: "10+" },
      { label: "Texniki yanaşma", value: "360°" },
    ],

    values: [
      {
        title: "Düzgün məhsul seçimi",
        description:
          "Sadəcə məhsul satmırıq, obyektə və ehtiyaca uyğun texniki həll seçməyə kömək edirik.",
        icon: Target,
      },
      {
        title: "Peşəkar yanaşma",
        description:
          "Layihə, qiymət təklifi, avadanlıq siyahısı və quraşdırma mərhələlərində səliqəli yanaşma tətbiq edirik.",
        icon: BadgeCheck,
      },
      {
        title: "Texniki dəstək",
        description:
          "Məhsul seçimi, sazlama, sistem yoxlanışı və modernləşdirmə üzrə dəstək göstəririk.",
        icon: Wrench,
      },
    ],

    capabilitiesTitle: "Əsas fəaliyyət istiqamətlərimiz",
    capabilitiesDescription:
      "Layihəyə başlamazdan əvvəl ehtiyacları analiz edir, uyğun avadanlıq seçir və daha sonra obyektə uyğun həll təqdim edirik.",
    capabilities: [
      "Videomüşahidə və CCTV sistemləri",
      "Keçidə nəzarət və giriş sistemləri",
      "Domofon və siqnalizasiya həlləri",
      "PoE switch, router və şəbəkə avadanlıqları",
      "Kabel infrastrukturu və montaj",
      "Texniki məsləhət və qiymət təklifi hazırlığı",
    ],

    collaborationEyebrow: "Əməkdaşlıq",
    collaborationTitle:
      "Layihəniz üçün uyğun məhsul və texniki həll seçək",
    collaborationDescription:
      "Obyektiniz barədə məlumat göndərin, sizə uyğun avadanlıq siyahısı və ilkin texniki yanaşma hazırlayaq.",
    quoteButton: "Qiymət təklifi al",
    usersIcon: Users,
    shieldIcon: ShieldCheck,
  },

  en: {
    metadataTitle: "About us",
    metadataDescription:
      "KHATT Electronics provides professional solutions for security systems, video surveillance, access control, intercoms, alarm systems and smart technologies.",

    eyebrow: "About us",
    title: "A reliable technical partner for security and electronics solutions",
    description:
      "At KHATT Electronics, our goal is to provide stable, scalable and long-lasting security and electronics solutions for different types of facilities.",
    contactButton: "Contact us",
    servicesButton: "View services",

    darkCardIcon: Building2,
    darkCardTitle: "What do we do?",
    darkCardDescription:
      "We provide product-based and project-based solutions for CCTV systems, access control, alarm systems, intercoms, network infrastructure and technical support.",

    stats: [
      { label: "Service areas", value: "6+" },
      { label: "Product categories", value: "10+" },
      { label: "Technical approach", value: "360°" },
    ],

    values: [
      {
        title: "Correct product selection",
        description:
          "We do not simply sell products; we help you choose a technical solution that fits your site and needs.",
        icon: Target,
      },
      {
        title: "Professional approach",
        description:
          "We follow a structured approach across project planning, quotation, equipment lists and installation stages.",
        icon: BadgeCheck,
      },
      {
        title: "Technical support",
        description:
          "We support product selection, configuration, system checks and modernization.",
        icon: Wrench,
      },
    ],

    capabilitiesTitle: "Our main areas of activity",
    capabilitiesDescription:
      "Before starting a project, we analyze the requirements, select the right equipment and provide a solution suitable for the facility.",
    capabilities: [
      "Video surveillance and CCTV systems",
      "Access control and entrance systems",
      "Intercom and alarm solutions",
      "PoE switches, routers and network equipment",
      "Cable infrastructure and installation",
      "Technical consulting and quotation preparation",
    ],

    collaborationEyebrow: "Cooperation",
    collaborationTitle:
      "Let’s choose the right products and technical solution for your project",
    collaborationDescription:
      "Send us information about your facility and we will prepare a suitable equipment list and initial technical approach.",
    quoteButton: "Request a quote",
    usersIcon: Users,
    shieldIcon: ShieldCheck,
  },

  ru: {
    metadataTitle: "О нас",
    metadataDescription:
      "KHATT Electronics предоставляет профессиональные решения в сфере систем безопасности, видеонаблюдения, контроля доступа, домофонов, сигнализации и умных технологий.",

    eyebrow: "О нас",
    title:
      "Надежный технический партнер в сфере безопасности и электроники",
    description:
      "Цель KHATT Electronics — предлагать стабильные, масштабируемые и долгосрочные решения в сфере безопасности и электроники для различных объектов.",
    contactButton: "Связаться с нами",
    servicesButton: "Смотреть услуги",

    darkCardIcon: Building2,
    darkCardTitle: "Что мы делаем?",
    darkCardDescription:
      "Мы предлагаем товарные и проектные решения для систем видеонаблюдения, контроля доступа, сигнализации, домофонов, сетевой инфраструктуры и технической поддержки.",

    stats: [
      { label: "Направлений услуг", value: "6+" },
      { label: "Категорий товаров", value: "10+" },
      { label: "Технический подход", value: "360°" },
    ],

    values: [
      {
        title: "Правильный подбор товаров",
        description:
          "Мы не просто продаем товары, а помогаем подобрать техническое решение под объект и потребности.",
        icon: Target,
      },
      {
        title: "Профессиональный подход",
        description:
          "Мы применяем структурированный подход на этапах проекта, коммерческого предложения, списка оборудования и монтажа.",
        icon: BadgeCheck,
      },
      {
        title: "Техническая поддержка",
        description:
          "Мы помогаем с подбором товаров, настройкой, проверкой системы и модернизацией.",
        icon: Wrench,
      },
    ],

    capabilitiesTitle: "Основные направления деятельности",
    capabilitiesDescription:
      "Перед началом проекта мы анализируем потребности, подбираем подходящее оборудование и предлагаем решение под конкретный объект.",
    capabilities: [
      "Видеонаблюдение и CCTV системы",
      "Контроль доступа и входные системы",
      "Домофонные и охранные решения",
      "PoE switch, router и сетевое оборудование",
      "Кабельная инфраструктура и монтаж",
      "Техническая консультация и подготовка коммерческого предложения",
    ],

    collaborationEyebrow: "Сотрудничество",
    collaborationTitle:
      "Подберем подходящие товары и техническое решение для вашего проекта",
    collaborationDescription:
      "Отправьте информацию об объекте, и мы подготовим список оборудования и первичный технический подход.",
    quoteButton: "Получить предложение",
    usersIcon: Users,
    shieldIcon: ShieldCheck,
  },
} as const;

export type AboutLocale = keyof typeof aboutTranslations;