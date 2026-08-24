import {
  BadgeCheck,
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
      "KHATT Electronics təhlükəsizlik, elektrik, isitmə-soyutma, havalandırma və zəif axın sistemləri üzrə layihə, təchizat və texniki xidmət təqdim edir.",

    eyebrow: "KHATT Electronics",
    title: "Obyektlər üçün peşəkar mühəndis və təhlükəsizlik sistemləri",
    description:
      "Biz kommersiya, yaşayış və sənaye obyektləri üçün təhlükəsizlik, elektrik, iqlim və zəif axın sistemlərini layihələndirir, təchiz edir, quraşdırır və texniki xidmət göstəririk.",

    contactButton: "Bizimlə əlaqə",
    servicesButton: "Xidmətlərə bax",

    darkCardTitle: "Sadəcə avadanlıq satmırıq",
    darkCardDescription:
      "Məqsədimiz ayrı-ayrı məhsullar təqdim etmək deyil, obyektin real ehtiyacına uyğun, stabil işləyən və sonradan genişləndirilə bilən sistem qurmaqdır.",

    darkCardItems: [
      "Layihəyə uyğun texniki seçim",
      "Vahid quraşdırma və sazlama prosesi",
      "Satışdan sonrakı texniki dəstək",
    ],

    valuesEyebrow: "Yanaşmamız",
    valuesTitle: "Texniki qərarlarda əsas prinsiplərimiz",

    values: [
      {
        title: "Dəqiq texniki seçim",
        description:
          "Avadanlıq və sistemlər obyektin ölçüsünə, risklərinə, istifadə məqsədinə və büdcəsinə uyğun seçilir.",
        icon: Target,
      },
      {
        title: "Vahid məsuliyyət",
        description:
          "Layihə, təchizat, montaj və sazlama mərhələləri ayrı-ayrı deyil, bir komanda tərəfindən idarə olunur.",
        icon: BadgeCheck,
      },
      {
        title: "Uzunmüddətli işlək sistem",
        description:
          "Sistemin yalnız quraşdırılmasına deyil, stabil işləməsinə, xidmətinə və gələcək inkişafına diqqət edirik.",
        icon: Wrench,
      },
    ],

    capabilitiesEyebrow: "Fəaliyyət sahələri",
    capabilitiesTitle: "Kompleks sistem həlləri",
    capabilitiesDescription:
      "Müxtəlif mühəndis sistemlərini bir layihə çərçivəsində planlaşdıraraq obyekt üçün daha uyğun və idarəolunan infrastruktur yaradırıq.",

    capabilities: [
      "Yanğın aşkarlama və xəbərdarlıq sistemləri",
      "Videomüşahidə və təhlükəsizlik sistemləri",
      "Girişə nəzarət və domofon sistemləri",
      "Elektrik təchizatı və enerji infrastrukturu",
      "İsitmə, soyutma və havalandırma sistemləri",
      "Şəbəkə və zəif axın infrastrukturu",
    ],

    collaborationEyebrow: "Əməkdaşlıq",
    collaborationTitle: "Layihənizə texniki baxışdan başlayaq",
    collaborationDescription:
      "Obyektin növünü və tələb olunan sistemləri qeyd edin. İlkin ehtiyacları birlikdə müəyyənləşdirib uyğun yanaşma hazırlayaq.",

    quoteButton: "Layihə üçün müraciət et",

    usersIcon: Users,
    shieldIcon: ShieldCheck,
  },

  en: {
    metadataTitle: "About us",
    metadataDescription:
      "KHATT Electronics provides design, supply, installation and maintenance for security, electrical, HVAC and low-current systems.",

    eyebrow: "KHATT Electronics",
    title: "Professional engineering and security systems for facilities",
    description:
      "We design, supply, install and maintain security, electrical, climate and low-current systems for commercial, residential and industrial facilities.",

    contactButton: "Contact us",
    servicesButton: "View services",

    darkCardTitle: "We provide more than equipment",
    darkCardDescription:
      "Our goal is not to offer individual products, but to build a reliable and expandable system based on the actual requirements of the facility.",

    darkCardItems: [
      "Project-specific technical selection",
      "Unified installation and commissioning",
      "After-sales technical support",
    ],

    valuesEyebrow: "Our approach",
    valuesTitle: "Our core principles in technical decisions",

    values: [
      {
        title: "Accurate technical selection",
        description:
          "Equipment and systems are selected according to the facility size, risks, intended use and budget.",
        icon: Target,
      },
      {
        title: "Unified responsibility",
        description:
          "Design, supply, installation and commissioning are managed by one team as a connected process.",
        icon: BadgeCheck,
      },
      {
        title: "Long-term operation",
        description:
          "We focus not only on installation, but also on stable operation, maintenance and future expansion.",
        icon: Wrench,
      },
    ],

    capabilitiesEyebrow: "Areas of activity",
    capabilitiesTitle: "Integrated system solutions",
    capabilitiesDescription:
      "We plan different engineering systems within one project to create a more suitable and manageable infrastructure.",

    capabilities: [
      "Fire detection and notification systems",
      "Video surveillance and security systems",
      "Access control and intercom systems",
      "Electrical power and energy infrastructure",
      "Heating, cooling and ventilation systems",
      "Network and low-current infrastructure",
    ],

    collaborationEyebrow: "Cooperation",
    collaborationTitle: "Let us start with a technical review",
    collaborationDescription:
      "Specify the type of facility and the systems required. We will identify the initial needs and prepare a suitable approach.",

    quoteButton: "Submit a project request",

    usersIcon: Users,
    shieldIcon: ShieldCheck,
  },

  ru: {
    metadataTitle: "О нас",
    metadataDescription:
      "KHATT Electronics выполняет проектирование, поставку, монтаж и обслуживание систем безопасности, электрики, HVAC и слаботочных систем.",

    eyebrow: "KHATT Electronics",
    title: "Профессиональные инженерные системы и системы безопасности",
    description:
      "Мы проектируем, поставляем, устанавливаем и обслуживаем системы безопасности, электрики, климата и слаботочные системы для коммерческих, жилых и промышленных объектов.",

    contactButton: "Связаться с нами",
    servicesButton: "Смотреть услуги",

    darkCardTitle: "Мы предлагаем больше, чем оборудование",
    darkCardDescription:
      "Наша цель — не просто предоставить отдельные товары, а создать надёжную и расширяемую систему под реальные требования объекта.",

    darkCardItems: [
      "Технический подбор под проект",
      "Единый процесс монтажа и настройки",
      "Послепродажная техническая поддержка",
    ],

    valuesEyebrow: "Наш подход",
    valuesTitle: "Основные принципы технических решений",

    values: [
      {
        title: "Точный технический подбор",
        description:
          "Оборудование и системы подбираются с учётом размера объекта, рисков, назначения и бюджета.",
        icon: Target,
      },
      {
        title: "Единая ответственность",
        description:
          "Проект, поставка, монтаж и настройка выполняются одной командой как связанный процесс.",
        icon: BadgeCheck,
      },
      {
        title: "Долгосрочная работа",
        description:
          "Мы уделяем внимание не только монтажу, но и стабильной работе, обслуживанию и дальнейшему развитию.",
        icon: Wrench,
      },
    ],

    capabilitiesEyebrow: "Направления работы",
    capabilitiesTitle: "Комплексные системные решения",
    capabilitiesDescription:
      "Мы планируем различные инженерные системы в рамках одного проекта, создавая удобную и управляемую инфраструктуру.",

    capabilities: [
      "Системы обнаружения и оповещения о пожаре",
      "Видеонаблюдение и системы безопасности",
      "Контроль доступа и домофонные системы",
      "Электроснабжение и энергетическая инфраструктура",
      "Отопление, охлаждение и вентиляция",
      "Сетевые и слаботочные системы",
    ],

    collaborationEyebrow: "Сотрудничество",
    collaborationTitle: "Начнём с технического анализа проекта",
    collaborationDescription:
      "Укажите тип объекта и необходимые системы. Мы определим первоначальные требования и подготовим подходящее решение.",

    quoteButton: "Оставить заявку",

    usersIcon: Users,
    shieldIcon: ShieldCheck,
  },
} as const;

export type AboutLocale = keyof typeof aboutTranslations;