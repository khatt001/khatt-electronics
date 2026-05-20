import {
  Building2,
  Factory,
  Home,
  Hotel,
  Landmark,
  School,
  Store,
  Warehouse,
} from "lucide-react";

export type SolutionsPageLocale = "az" | "en" | "ru";

export const solutionsPageTranslations = {
  az: {
    metadataTitle: "Həllər",
    metadataDescription:
      "KHATT Electronics obyekt tipinə uyğun təhlükəsizlik, videomüşahidə, keçidə nəzarət, domofon və şəbəkə həlləri təqdim edir.",
    eyebrow: "Həllər",
    title: "Hər obyekt üçün uyğun təhlükəsizlik və elektronika həlli",
    description:
      "Ofis, mağaza, anbar, yaşayış binası və istehsalat obyektləri üçün ehtiyaca uyğun kamera, keçidə nəzarət, siqnalizasiya və şəbəkə həlləri hazırlayırıq.",
    quoteButton: "Layihə üçün qiymət təklifi al",
    servicesButton: "Xidmətlərə bax",
    planningTitle: "Həlləri obyektə görə planlayırıq",
    planningDescription:
      "Eyni məhsul hər obyekt üçün doğru seçim olmaya bilər. Buna görə kamera sayı, baxış bucağı, yaddaş müddəti, kabel məsafəsi və şəbəkə yükü ayrıca hesablanmalıdır.",
    solutions: [
      {
        title: "Ofislər və biznes mərkəzləri",
        description:
          "Ofis sahələri üçün kamera sistemi, keçidə nəzarət, işçi giriş-çıxış nəzarəti və stabil şəbəkə infrastrukturu.",
        icon: Building2,
        items: ["IP kamera sistemi", "Access control", "Wi-Fi və LAN", "Server/rack avadanlığı"],
      },
      {
        title: "Mağaza və satış nöqtələri",
        description:
          "Satış sahələrində müştəri axını, kassalar, giriş-çıxış və anbar zonalarının izlənməsi üçün həllər.",
        icon: Store,
        items: ["Kassa nəzarəti", "Giriş zonası kameraları", "Anbar izləmə", "Uzaqdan baxış"],
      },
      {
        title: "Anbar və logistika",
        description:
          "Böyük sahələr üçün geniş bucaqlı kameralar, PoE switch-lər, NVR yaddaş planlaması və şəbəkə xəritəsi.",
        icon: Warehouse,
        items: ["Perimetr nəzarəti", "Geniş sahə kameraları", "PoE infrastruktur", "Yaddaş hesablanması"],
      },
      {
        title: "Zavod və istehsalat",
        description:
          "İstehsal xətləri, təhlükəli zonalar, giriş-çıxış nöqtələri və iş təhlükəsizliyi üçün texniki həllər.",
        icon: Factory,
        items: ["İstehsal zonası nəzarəti", "Giriş-çıxış sistemi", "Alarm inteqrasiyası", "Texniki monitorinq"],
      },
      {
        title: "Yaşayış binaları və villalar",
        description:
          "Giriş blokları, həyət, qaraj, domofon, siqnalizasiya və smart təhlükəsizlik həlləri.",
        icon: Home,
        items: ["Domofon sistemi", "Həyət kameraları", "Siqnalizasiya", "Mobil izləmə"],
      },
      {
        title: "Hotel və obyektlər",
        description:
          "Qonaq zonaları, reception, koridorlar, giriş-çıxış və servis sahələri üçün təhlükəsizlik planlaması.",
        icon: Hotel,
        items: ["Reception nəzarəti", "Koridor kameraları", "Access zonalar", "Şəbəkə planlaması"],
      },
      {
        title: "Təhsil müəssisələri",
        description:
          "Məktəb, kurs və tədris mərkəzləri üçün giriş nəzarəti, kamera sistemi və təhlükəsiz şəbəkə həlləri.",
        icon: School,
        items: ["Giriş nəzarəti", "Sinif/koridor kameraları", "Wi-Fi coverage", "Uzaqdan monitorinq"],
      },
      {
        title: "Dövlət və inzibati obyektlər",
        description:
          "Daha ciddi təhlükəsizlik tələbləri olan obyektlər üçün strukturlaşdırılmış və etibarlı sistem yanaşması.",
        icon: Landmark,
        items: ["Çoxzonallı nəzarət", "Access control", "Perimetr təhlükəsizliyi", "Texniki sənədləşmə"],
      },
    ],
    steps: [
      "Obyekt tipi və risk zonaları analiz edilir",
      "Kamera, keçid və şəbəkə nöqtələri planlanır",
      "Uyğun avadanlıq siyahısı və qiymət təklifi hazırlanır",
      "Quraşdırma və texniki təhvil mərhələsi icra olunur",
    ],
  },

  en: {
    metadataTitle: "Solutions",
    metadataDescription:
      "KHATT Electronics provides security, video surveillance, access control, intercom and network solutions tailored to different facility types.",
    eyebrow: "Solutions",
    title: "Security and electronics solutions for every facility",
    description:
      "We design camera, access control, alarm and network solutions for offices, stores, warehouses, residential buildings and production facilities.",
    quoteButton: "Request a project quote",
    servicesButton: "View services",
    planningTitle: "We plan solutions according to the facility",
    planningDescription:
      "The same product may not be the right choice for every facility. Camera count, viewing angle, storage duration, cable distance and network load must be calculated separately.",
    solutions: [
      {
        title: "Offices and business centers",
        description:
          "Camera systems, access control, employee entry-exit control and stable network infrastructure for office spaces.",
        icon: Building2,
        items: ["IP camera system", "Access control", "Wi-Fi and LAN", "Server/rack equipment"],
      },
      {
        title: "Stores and retail points",
        description:
          "Solutions for monitoring customer flow, cash desks, entrances and warehouse areas in retail spaces.",
        icon: Store,
        items: ["Cash desk monitoring", "Entrance zone cameras", "Warehouse monitoring", "Remote view"],
      },
      {
        title: "Warehouses and logistics",
        description:
          "Wide-angle cameras, PoE switches, NVR storage planning and network mapping for large areas.",
        icon: Warehouse,
        items: ["Perimeter monitoring", "Wide-area cameras", "PoE infrastructure", "Storage calculation"],
      },
      {
        title: "Factories and production",
        description:
          "Technical solutions for production lines, dangerous zones, entry-exit points and workplace safety.",
        icon: Factory,
        items: ["Production zone monitoring", "Entry-exit system", "Alarm integration", "Technical monitoring"],
      },
      {
        title: "Residential buildings and villas",
        description:
          "Entrance blocks, yard, garage, intercom, alarm and smart security solutions.",
        icon: Home,
        items: ["Intercom system", "Yard cameras", "Alarm system", "Mobile monitoring"],
      },
      {
        title: "Hotels and facilities",
        description:
          "Security planning for guest areas, reception, corridors, entry-exit and service areas.",
        icon: Hotel,
        items: ["Reception monitoring", "Corridor cameras", "Access zones", "Network planning"],
      },
      {
        title: "Educational institutions",
        description:
          "Access control, camera systems and secure network solutions for schools, courses and training centers.",
        icon: School,
        items: ["Access control", "Classroom/corridor cameras", "Wi-Fi coverage", "Remote monitoring"],
      },
      {
        title: "Government and administrative facilities",
        description:
          "Structured and reliable system approach for facilities with stricter security requirements.",
        icon: Landmark,
        items: ["Multi-zone monitoring", "Access control", "Perimeter security", "Technical documentation"],
      },
    ],
    steps: [
      "Facility type and risk zones are analyzed",
      "Camera, access and network points are planned",
      "Suitable equipment list and quotation are prepared",
      "Installation and technical handover stage is completed",
    ],
  },

  ru: {
    metadataTitle: "Решения",
    metadataDescription:
      "KHATT Electronics предлагает решения по безопасности, видеонаблюдению, контролю доступа, домофонам и сетям под тип объекта.",
    eyebrow: "Решения",
    title: "Решения безопасности и электроники для каждого объекта",
    description:
      "Мы подготавливаем решения по камерам, контролю доступа, сигнализации и сетям для офисов, магазинов, складов, жилых зданий и производственных объектов.",
    quoteButton: "Получить предложение по проекту",
    servicesButton: "Смотреть услуги",
    planningTitle: "Мы планируем решения под объект",
    planningDescription:
      "Один и тот же товар не всегда подходит для каждого объекта. Количество камер, угол обзора, срок хранения, расстояние кабеля и нагрузка сети должны рассчитываться отдельно.",
    solutions: [
      {
        title: "Офисы и бизнес-центры",
        description:
          "Камеры, контроль доступа, учет входа-выхода сотрудников и стабильная сетевая инфраструктура для офисов.",
        icon: Building2,
        items: ["IP камеры", "Access control", "Wi-Fi и LAN", "Server/rack оборудование"],
      },
      {
        title: "Магазины и точки продаж",
        description:
          "Решения для контроля потока клиентов, касс, входов-выходов и складских зон.",
        icon: Store,
        items: ["Контроль кассы", "Камеры входной зоны", "Контроль склада", "Удаленный просмотр"],
      },
      {
        title: "Склады и логистика",
        description:
          "Широкоугольные камеры, PoE switch, планирование NVR хранения и карта сети для больших площадей.",
        icon: Warehouse,
        items: ["Контроль периметра", "Камеры для больших зон", "PoE инфраструктура", "Расчет хранения"],
      },
      {
        title: "Заводы и производство",
        description:
          "Технические решения для производственных линий, опасных зон, входов-выходов и безопасности труда.",
        icon: Factory,
        items: ["Контроль производственной зоны", "Система входа-выхода", "Интеграция alarm", "Технический мониторинг"],
      },
      {
        title: "Жилые здания и виллы",
        description:
          "Подъезды, двор, гараж, домофон, сигнализация и smart решения безопасности.",
        icon: Home,
        items: ["Домофонная система", "Камеры двора", "Сигнализация", "Мобильный просмотр"],
      },
      {
        title: "Отели и объекты",
        description:
          "Планирование безопасности для guest зон, reception, коридоров, входов-выходов и сервисных зон.",
        icon: Hotel,
        items: ["Контроль reception", "Камеры коридоров", "Access зоны", "Планирование сети"],
      },
      {
        title: "Учебные заведения",
        description:
          "Контроль доступа, камеры и безопасные сетевые решения для школ, курсов и учебных центров.",
        icon: School,
        items: ["Контроль доступа", "Камеры классов/коридоров", "Wi-Fi coverage", "Удаленный мониторинг"],
      },
      {
        title: "Государственные и административные объекты",
        description:
          "Структурированный и надежный системный подход для объектов с более строгими требованиями безопасности.",
        icon: Landmark,
        items: ["Многозонный контроль", "Access control", "Безопасность периметра", "Техническая документация"],
      },
    ],
    steps: [
      "Анализируется тип объекта и зоны риска",
      "Планируются точки камер, доступа и сети",
      "Готовится список оборудования и предложение",
      "Выполняется установка и техническая сдача",
    ],
  },
} as const;