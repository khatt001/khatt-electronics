import {
  Cable,
  Camera,
  DoorOpen,
  ShieldAlert,
  ShieldCheck,
  Wifi,
} from "lucide-react";

export type Locale = "az" | "en" | "ru";

export const servicesTranslations = {
  az: {
    metadataTitle: "Xidmətlər",
    metadataDescription:
      "KHATT Electronics təhlükəsizlik sistemləri, videomüşahidə, keçidə nəzarət, domofon, siqnalizasiya və şəbəkə infrastrukturu üzrə peşəkar xidmətlər təqdim edir.",

    eyebrow: "Xidmətlər",
    title:
      "Təhlükəsizlik və elektronika layihələri üçün tam texniki dəstək",
    description:
      "Məhsul seçimi, sistem planlaması, quraşdırma və texniki dəstək mərhələlərində biznes və fərdi obyektlər üçün peşəkar həllər təqdim edirik.",
    quoteButton: "Qiymət təklifi al",
    productsButton: "Məhsullara bax",

    services: [
      {
        title: "Videomüşahidə sistemləri",
        description:
          "Obyektin ölçüsünə uyğun IP kamera, analoq kamera, NVR/DVR və yaddaş həllərinin seçimi və quraşdırılması.",
        icon: Camera,
        items: [
          "IP və analoq kamera sistemləri",
          "NVR/DVR seçimi",
          "Uzaqdan izləmə",
          "Obyektə uyğun kamera planlaması",
        ],
      },
      {
        title: "Keçidə nəzarət",
        description:
          "Ofis, anbar, bina və kommersiya obyektləri üçün kartlı keçid, turniket və giriş nəzarət sistemləri.",
        icon: DoorOpen,
        items: [
          "Kartlı giriş sistemləri",
          "Turniket inteqrasiyası",
          "İşçi giriş-çıxış nəzarəti",
          "Access control avadanlığı",
        ],
      },
      {
        title: "Siqnalizasiya sistemləri",
        description:
          "Məkanın təhlükəsizliyi üçün hərəkət sensorları, maqnit kontaktlar, sirenalar və alarm panelləri.",
        icon: ShieldAlert,
        items: [
          "Hərəkət sensorları",
          "Alarm panelləri",
          "Siren və xəbərdarlıq",
          "Obyekt təhlükəsizliyi",
        ],
      },
      {
        title: "Şəbəkə infrastrukturu",
        description:
          "PoE switch, router, access point, rack kabinet və kabel infrastrukturu üzrə stabil şəbəkə qurulması.",
        icon: Wifi,
        items: [
          "PoE switch seçimi",
          "Wi-Fi coverage planlaması",
          "LAN kabel infrastrukturu",
          "Rack və patch panel",
        ],
      },
      {
        title: "Kabel və quraşdırma",
        description:
          "Kabel çəkilişi, montaj, konnektorlaşdırma, test və təhvil mərhələlərini səliqəli şəkildə həyata keçiririk.",
        icon: Cable,
        items: [
          "UTP/FTP kabel çəkilişi",
          "Konnektorlaşdırma",
          "Kabel testləri",
          "Səliqəli montaj",
        ],
      },
      {
        title: "Texniki dəstək",
        description:
          "Mövcud sistemlərin yoxlanması, sazlanması, diaqnostikası və ehtiyac olduqda modernləşdirilməsi.",
        icon: ShieldCheck,
        items: [
          "Sistem yoxlanışı",
          "Diaqnostika",
          "Parametrlərin sazlanması",
          "Modernləşdirmə təklifi",
        ],
      },
    ],

    processEyebrow: "İş prosesi",
    processTitle:
      "Layihəni səliqəli və ölçülə bilən mərhələlərlə aparırıq",
    processDescription:
      "Məqsəd sadəcə avadanlıq satmaq deyil, obyektə uyğun və stabil işləyən sistem qurmaqdır.",
    processSteps: [
      "Ehtiyac və obyekt məlumatları toplanır",
      "Avadanlıq siyahısı və ilkin qiymət təklifi hazırlanır",
      "Uyğun məhsullar və texniki həll seçilir",
      "Quraşdırma və təhvil prosesi planlanır",
    ],
  },

  en: {
    metadataTitle: "Services",
    metadataDescription:
      "KHATT Electronics provides professional services for security systems, video surveillance, access control, intercoms, alarm systems and network infrastructure.",

    eyebrow: "Services",
    title:
      "Complete technical support for security and electronics projects",
    description:
      "We provide professional solutions for businesses and private facilities across product selection, system planning, installation and technical support.",
    quoteButton: "Request a quote",
    productsButton: "View products",

    services: [
      {
        title: "Video surveillance systems",
        description:
          "Selection and installation of IP cameras, analog cameras, NVR/DVR and storage solutions according to the size of the facility.",
        icon: Camera,
        items: [
          "IP and analog camera systems",
          "NVR/DVR selection",
          "Remote monitoring",
          "Camera planning for the facility",
        ],
      },
      {
        title: "Access control",
        description:
          "Card access, turnstile and entrance control systems for offices, warehouses, buildings and commercial facilities.",
        icon: DoorOpen,
        items: [
          "Card access systems",
          "Turnstile integration",
          "Employee entry-exit control",
          "Access control equipment",
        ],
      },
      {
        title: "Alarm systems",
        description:
          "Motion sensors, magnetic contacts, sirens and alarm panels for facility security.",
        icon: ShieldAlert,
        items: [
          "Motion sensors",
          "Alarm panels",
          "Sirens and alerts",
          "Facility security",
        ],
      },
      {
        title: "Network infrastructure",
        description:
          "Stable network setup with PoE switches, routers, access points, rack cabinets and cable infrastructure.",
        icon: Wifi,
        items: [
          "PoE switch selection",
          "Wi-Fi coverage planning",
          "LAN cable infrastructure",
          "Rack and patch panel",
        ],
      },
      {
        title: "Cabling and installation",
        description:
          "We handle cabling, mounting, connectorization, testing and handover in a clean and structured way.",
        icon: Cable,
        items: [
          "UTP/FTP cable installation",
          "Connectorization",
          "Cable testing",
          "Clean installation",
        ],
      },
      {
        title: "Technical support",
        description:
          "Inspection, configuration, diagnostics and modernization of existing systems when needed.",
        icon: ShieldCheck,
        items: [
          "System inspection",
          "Diagnostics",
          "Parameter configuration",
          "Modernization proposal",
        ],
      },
    ],

    processEyebrow: "Work process",
    processTitle:
      "We manage projects through clear and measurable stages",
    processDescription:
      "The goal is not just to sell equipment, but to build a stable system that fits the facility.",
    processSteps: [
      "Requirements and facility information are collected",
      "Equipment list and initial quotation are prepared",
      "Suitable products and technical solution are selected",
      "Installation and handover process is planned",
    ],
  },

  ru: {
    metadataTitle: "Услуги",
    metadataDescription:
      "KHATT Electronics предоставляет профессиональные услуги по системам безопасности, видеонаблюдению, контролю доступа, домофонам, сигнализации и сетевой инфраструктуре.",

    eyebrow: "Услуги",
    title:
      "Полная техническая поддержка для проектов безопасности и электроники",
    description:
      "Мы предлагаем профессиональные решения для бизнеса и частных объектов на этапах подбора товаров, планирования системы, установки и технической поддержки.",
    quoteButton: "Получить предложение",
    productsButton: "Смотреть товары",

    services: [
      {
        title: "Системы видеонаблюдения",
        description:
          "Подбор и установка IP-камер, аналоговых камер, NVR/DVR и решений хранения с учетом размера объекта.",
        icon: Camera,
        items: [
          "IP и аналоговые камеры",
          "Подбор NVR/DVR",
          "Удаленный просмотр",
          "Планирование камер под объект",
        ],
      },
      {
        title: "Контроль доступа",
        description:
          "Карточный доступ, турникеты и системы контроля входа для офисов, складов, зданий и коммерческих объектов.",
        icon: DoorOpen,
        items: [
          "Карточные системы доступа",
          "Интеграция турникетов",
          "Контроль входа и выхода сотрудников",
          "Оборудование access control",
        ],
      },
      {
        title: "Системы сигнализации",
        description:
          "Датчики движения, магнитные контакты, сирены и alarm-панели для безопасности объекта.",
        icon: ShieldAlert,
        items: [
          "Датчики движения",
          "Alarm-панели",
          "Сирены и оповещение",
          "Безопасность объекта",
        ],
      },
      {
        title: "Сетевая инфраструктура",
        description:
          "Стабильная сеть на базе PoE switch, router, access point, rack cabinet и кабельной инфраструктуры.",
        icon: Wifi,
        items: [
          "Подбор PoE switch",
          "Планирование Wi-Fi покрытия",
          "LAN кабельная инфраструктура",
          "Rack и patch panel",
        ],
      },
      {
        title: "Кабель и монтаж",
        description:
          "Мы выполняем прокладку кабеля, монтаж, коннекторизацию, тестирование и сдачу объекта аккуратно и структурировано.",
        icon: Cable,
        items: [
          "Прокладка UTP/FTP кабеля",
          "Коннекторизация",
          "Тестирование кабеля",
          "Аккуратный монтаж",
        ],
      },
      {
        title: "Техническая поддержка",
        description:
          "Проверка, настройка, диагностика и модернизация существующих систем при необходимости.",
        icon: ShieldCheck,
        items: [
          "Проверка системы",
          "Диагностика",
          "Настройка параметров",
          "Предложение по модернизации",
        ],
      },
    ],

    processEyebrow: "Рабочий процесс",
    processTitle:
      "Мы ведем проект по понятным и измеримым этапам",
    processDescription:
      "Цель — не просто продать оборудование, а построить стабильную систему, подходящую под объект.",
    processSteps: [
      "Собираются требования и информация об объекте",
      "Готовится список оборудования и первичное коммерческое предложение",
      "Подбираются подходящие товары и техническое решение",
      "Планируется процесс установки и сдачи объекта",
    ],
  },
} as const;

export type ServicesLocale = keyof typeof servicesTranslations;