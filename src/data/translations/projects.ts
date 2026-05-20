import {
  Building2,
  Camera,
  Factory,
  Home,
  Hotel,
  Network,
  ShieldCheck,
  Store,
  Warehouse,
} from "lucide-react";

export const projectsTranslations = {
  az: {
    metadataTitle: "Layihələr",
    metadataDescription:
      "KHATT Electronics tərəfindən həyata keçirilə bilən videomüşahidə, təhlükəsizlik, keçidə nəzarət və şəbəkə infrastrukturu layihə istiqamətləri.",

    eyebrow: "Layihələr",
    title: "Təhlükəsizlik və elektronika layihələri üçün praktik həll nümunələri",
    description:
      "Real obyekt ehtiyaclarına uyğun kamera, keçidə nəzarət, siqnalizasiya və şəbəkə infrastrukturu üzrə layihə yanaşmalarını burada təqdim edirik.",
    quoteButton: "Layihə üçün sorğu göndər",
    servicesButton: "Xidmətlərə bax",

    projects: [
      {
        title: "Ofis təhlükəsizlik sistemi",
        type: "Biznes obyektləri",
        description:
          "Ofis daxilində giriş-çıxış, işçi zonaları, reception və ümumi sahələrin izlənməsi üçün kamera və access control həlli.",
        icon: Building2,
        items: ["IP kamera", "Access control", "NVR", "Uzaqdan izləmə"],
      },
      {
        title: "Mağaza və kassa nəzarəti",
        type: "Retail",
        description:
          "Satış nöqtələrində kassa zonası, giriş hissəsi, vitrin və anbar sahələrinin izlənməsi üçün sistem planlaması.",
        icon: Store,
        items: ["Kassa kamerası", "Giriş nəzarəti", "Anbar kamerası", "Mobil baxış"],
      },
      {
        title: "Anbar perimetr nəzarəti",
        type: "Logistika",
        description:
          "Böyük anbar və logistika sahələrində perimetr, yükləmə zonası və giriş nöqtələri üçün təhlükəsizlik planı.",
        icon: Warehouse,
        items: ["Perimetr kamera", "PoE switch", "Geniş bucaq", "Yaddaş hesabı"],
      },
      {
        title: "Villa və fərdi ev sistemi",
        type: "Yaşayış obyektləri",
        description:
          "Həyət, giriş qapısı, qaraj, domofon və siqnalizasiya üçün inteqrasiya olunmuş smart təhlükəsizlik həlli.",
        icon: Home,
        items: ["Domofon", "Həyət kamerası", "Siqnalizasiya", "Mobil bildiriş"],
      },
      {
        title: "Hotel təhlükəsizlik planlaması",
        type: "Qonaqlama obyektləri",
        description:
          "Reception, koridorlar, giriş-çıxış və servis sahələri üçün stabil kamera və şəbəkə infrastrukturu.",
        icon: Hotel,
        items: ["Reception kamera", "Koridor nəzarəti", "Wi-Fi planlama", "NVR"],
      },
      {
        title: "İstehsalat zonası monitorinqi",
        type: "Sənaye obyektləri",
        description:
          "Zavod və istehsalat zonalarında təhlükəli sahələr, iş axını və giriş-çıxış üçün texniki nəzarət sistemi.",
        icon: Factory,
        items: ["İstehsal kamera", "Alarm inteqrasiyası", "Access point", "Texniki nəzarət"],
      },
    ],

    processEyebrow: "Layihə yanaşması",
    processTitle: "Hər layihəni obyektə uyğun planlayırıq",
    processDescription:
      "Kamera sayı, kabel məsafəsi, yaddaş müddəti, şəbəkə yükü və istifadə məqsədi əvvəlcədən analiz olunur.",
    processSteps: [
      "Obyekt və risk zonaları analiz olunur",
      "Kamera, şəbəkə və access nöqtələri planlanır",
      "Avadanlıq siyahısı və qiymət təklifi hazırlanır",
      "Quraşdırma, sazlama və təhvil mərhələsi icra olunur",
    ],

    ctaTitle: "Öz layihəniz üçün uyğun həll istəyirsiniz?",
    ctaDescription:
      "Obyektiniz haqqında məlumat göndərin, sizə uyğun məhsul siyahısı və ilkin texniki yanaşma hazırlayaq.",
    ctaButton: "Sorğu göndər",
    ctaIcon: ShieldCheck,
    cameraIcon: Camera,
    networkIcon: Network,
  },

  en: {
    metadataTitle: "Projects",
    metadataDescription:
      "Project directions for video surveillance, security, access control and network infrastructure solutions by KHATT Electronics.",

    eyebrow: "Projects",
    title: "Practical solution examples for security and electronics projects",
    description:
      "Here we present project approaches for CCTV, access control, alarm and network infrastructure based on real facility needs.",
    quoteButton: "Send project request",
    servicesButton: "View services",

    projects: [
      {
        title: "Office security system",
        type: "Business facilities",
        description:
          "Camera and access control solution for monitoring entrances, employee zones, reception and common office areas.",
        icon: Building2,
        items: ["IP camera", "Access control", "NVR", "Remote monitoring"],
      },
      {
        title: "Store and cash desk monitoring",
        type: "Retail",
        description:
          "System planning for monitoring cash desk areas, entrance zones, showcases and warehouse areas in retail points.",
        icon: Store,
        items: ["Cash desk camera", "Entrance monitoring", "Warehouse camera", "Mobile viewing"],
      },
      {
        title: "Warehouse perimeter monitoring",
        type: "Logistics",
        description:
          "Security planning for perimeters, loading areas and entrance points in large warehouses and logistics facilities.",
        icon: Warehouse,
        items: ["Perimeter camera", "PoE switch", "Wide angle", "Storage calculation"],
      },
      {
        title: "Villa and private house system",
        type: "Residential facilities",
        description:
          "Integrated smart security solution for yard, entrance gate, garage, intercom and alarm system.",
        icon: Home,
        items: ["Intercom", "Yard camera", "Alarm system", "Mobile alerts"],
      },
      {
        title: "Hotel security planning",
        type: "Hospitality facilities",
        description:
          "Stable camera and network infrastructure for reception, corridors, entrances/exits and service areas.",
        icon: Hotel,
        items: ["Reception camera", "Corridor monitoring", "Wi-Fi planning", "NVR"],
      },
      {
        title: "Production zone monitoring",
        type: "Industrial facilities",
        description:
          "Technical monitoring system for risk zones, workflow and entrance-exit points in factories and production areas.",
        icon: Factory,
        items: ["Production camera", "Alarm integration", "Access point", "Technical monitoring"],
      },
    ],

    processEyebrow: "Project approach",
    processTitle: "We plan every project according to the facility",
    processDescription:
      "Camera quantity, cable distance, storage duration, network load and usage purpose are analyzed in advance.",
    processSteps: [
      "Facility and risk zones are analyzed",
      "Camera, network and access points are planned",
      "Equipment list and quotation are prepared",
      "Installation, configuration and handover are completed",
    ],

    ctaTitle: "Need a suitable solution for your project?",
    ctaDescription:
      "Send us information about your facility and we will prepare a suitable product list and initial technical approach.",
    ctaButton: "Send request",
    ctaIcon: ShieldCheck,
    cameraIcon: Camera,
    networkIcon: Network,
  },

  ru: {
    metadataTitle: "Проекты",
    metadataDescription:
      "Проектные направления KHATT Electronics в сфере видеонаблюдения, безопасности, контроля доступа и сетевой инфраструктуры.",

    eyebrow: "Проекты",
    title: "Практические примеры решений для проектов безопасности и электроники",
    description:
      "Здесь представлены проектные подходы по видеонаблюдению, контролю доступа, сигнализации и сетевой инфраструктуре с учетом реальных потребностей объектов.",
    quoteButton: "Отправить запрос по проекту",
    servicesButton: "Смотреть услуги",

    projects: [
      {
        title: "Система безопасности офиса",
        type: "Бизнес-объекты",
        description:
          "Решение с камерами и контролем доступа для входов, рабочих зон, reception и общих офисных помещений.",
        icon: Building2,
        items: ["IP камера", "Access control", "NVR", "Удаленный просмотр"],
      },
      {
        title: "Контроль магазина и кассы",
        type: "Retail",
        description:
          "Планирование системы для контроля кассовой зоны, входа, витрин и складских зон в торговых точках.",
        icon: Store,
        items: ["Камера кассы", "Контроль входа", "Камера склада", "Мобильный просмотр"],
      },
      {
        title: "Периметр склада",
        type: "Логистика",
        description:
          "План безопасности для периметра, зоны загрузки и входных точек на больших складах и логистических объектах.",
        icon: Warehouse,
        items: ["Камера периметра", "PoE switch", "Широкий угол", "Расчет хранения"],
      },
      {
        title: "Система для виллы и частного дома",
        type: "Жилые объекты",
        description:
          "Интегрированное smart-решение для двора, входных ворот, гаража, домофона и сигнализации.",
        icon: Home,
        items: ["Домофон", "Камера двора", "Сигнализация", "Мобильные уведомления"],
      },
      {
        title: "Планирование безопасности отеля",
        type: "Гостиничные объекты",
        description:
          "Стабильная камера и сетевая инфраструктура для reception, коридоров, входов-выходов и сервисных зон.",
        icon: Hotel,
        items: ["Камера reception", "Контроль коридоров", "Wi-Fi планирование", "NVR"],
      },
      {
        title: "Мониторинг производственной зоны",
        type: "Промышленные объекты",
        description:
          "Техническая система контроля для опасных зон, рабочего процесса и точек входа-выхода на производстве.",
        icon: Factory,
        items: ["Производственная камера", "Интеграция alarm", "Access point", "Технический мониторинг"],
      },
    ],

    processEyebrow: "Проектный подход",
    processTitle: "Каждый проект планируется под конкретный объект",
    processDescription:
      "Количество камер, расстояние кабеля, срок хранения, нагрузка на сеть и цель использования анализируются заранее.",
    processSteps: [
      "Анализируется объект и зоны риска",
      "Планируются точки камер, сети и доступа",
      "Готовится список оборудования и предложение",
      "Выполняется установка, настройка и сдача",
    ],

    ctaTitle: "Нужно подходящее решение для вашего проекта?",
    ctaDescription:
      "Отправьте информацию об объекте, и мы подготовим подходящий список товаров и первичный технический подход.",
    ctaButton: "Отправить запрос",
    ctaIcon: ShieldCheck,
    cameraIcon: Camera,
    networkIcon: Network,
  },
} as const;