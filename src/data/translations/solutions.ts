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

export const solutionsTranslations = {
  en: {
    metadataTitle: "Solutions",
    metadataDescription:
      "KHATT Electronics provides security, video surveillance, access control, intercom and network solutions based on facility type.",

    eyebrow: "Solutions",
    title: "Security and electronics solutions for every facility",
    description:
      "We prepare CCTV, access control, alarm and network solutions for offices, stores, warehouses, residential buildings and production facilities based on real project needs.",
    quoteButton: "Request a project quote",
    servicesButton: "View services",

    solutions: [
      {
        title: "Offices and business centers",
        description:
          "Camera systems, access control, employee entry-exit monitoring and stable network infrastructure for office spaces.",
        icon: Building2,
        items: ["IP camera system", "Access control", "Wi-Fi and LAN", "Server/rack equipment"],
      },
      {
        title: "Stores and retail points",
        description:
          "Solutions for monitoring customer flow, cash desks, entrances/exits and storage areas in retail spaces.",
        icon: Store,
        items: ["Cash desk monitoring", "Entrance cameras", "Warehouse monitoring", "Remote viewing"],
      },
      {
        title: "Warehouses and logistics",
        description:
          "Wide-angle cameras, PoE switches, NVR storage planning and network mapping for large areas.",
        icon: Warehouse,
        items: ["Perimeter monitoring", "Large area cameras", "PoE infrastructure", "Storage calculation"],
      },
      {
        title: "Factories and production",
        description:
          "Technical solutions for production lines, risk zones, entry-exit points and workplace safety.",
        icon: Factory,
        items: ["Production zone monitoring", "Entry-exit system", "Alarm integration", "Technical monitoring"],
      },
      {
        title: "Residential buildings and villas",
        description:
          "Entrance blocks, yard areas, garage, intercom, alarm and smart security solutions.",
        icon: Home,
        items: ["Intercom system", "Yard cameras", "Alarm system", "Mobile monitoring"],
      },
      {
        title: "Hotels and facilities",
        description:
          "Security planning for guest areas, reception, corridors, entry-exit and service zones.",
        icon: Hotel,
        items: ["Reception monitoring", "Corridor cameras", "Access zones", "Network planning"],
      },
      {
        title: "Educational institutions",
        description:
          "Access control, camera systems and secure network solutions for schools, courses and training centers.",
        icon: School,
        items: ["Entrance control", "Classroom/corridor cameras", "Wi-Fi coverage", "Remote monitoring"],
      },
      {
        title: "Government and administrative facilities",
        description:
          "Structured and reliable system approach for facilities with higher security requirements.",
        icon: Landmark,
        items: ["Multi-zone monitoring", "Access control", "Perimeter security", "Technical documentation"],
      },
    ],

    planningTitle: "We plan solutions according to the facility",
    planningDescription:
      "The same product may not be the right choice for every facility. That is why camera quantity, viewing angle, storage duration, cable distance and network load should be calculated separately.",
    steps: [
      "Facility type and risk zones are analyzed",
      "Camera, access and network points are planned",
      "Suitable equipment list and quotation are prepared",
      "Installation and technical handover are completed",
    ],
  },

  ru: {
    metadataTitle: "Решения",
    metadataDescription:
      "KHATT Electronics предлагает решения по безопасности, видеонаблюдению, контролю доступа, домофонам и сетям в зависимости от типа объекта.",

    eyebrow: "Решения",
    title: "Решения по безопасности и электронике для каждого объекта",
    description:
      "Мы подготавливаем решения по видеонаблюдению, контролю доступа, сигнализации и сетям для офисов, магазинов, складов, жилых зданий и производственных объектов с учетом реальных потребностей проекта.",
    quoteButton: "Получить предложение по проекту",
    servicesButton: "Смотреть услуги",

    solutions: [
      {
        title: "Офисы и бизнес-центры",
        description:
          "Системы камер, контроль доступа, учет входа-выхода сотрудников и стабильная сетевая инфраструктура для офисных помещений.",
        icon: Building2,
        items: ["IP камеры", "Access control", "Wi-Fi и LAN", "Server/rack оборудование"],
      },
      {
        title: "Магазины и торговые точки",
        description:
          "Решения для контроля потока клиентов, касс, входов-выходов и складских зон в торговых помещениях.",
        icon: Store,
        items: ["Контроль кассы", "Камеры входной зоны", "Контроль склада", "Удаленный просмотр"],
      },
      {
        title: "Склады и логистика",
        description:
          "Широкоугольные камеры, PoE switch, планирование NVR-хранилища и сетевой карты для больших площадей.",
        icon: Warehouse,
        items: ["Контроль периметра", "Камеры для больших зон", "PoE инфраструктура", "Расчет хранения"],
      },
      {
        title: "Заводы и производство",
        description:
          "Технические решения для производственных линий, опасных зон, точек входа-выхода и безопасности труда.",
        icon: Factory,
        items: ["Контроль производственной зоны", "Система входа-выхода", "Интеграция сигнализации", "Технический мониторинг"],
      },
      {
        title: "Жилые здания и виллы",
        description:
          "Подъезды, двор, гараж, домофон, сигнализация и smart-решения для безопасности.",
        icon: Home,
        items: ["Домофонная система", "Камеры во дворе", "Сигнализация", "Мобильный просмотр"],
      },
      {
        title: "Отели и объекты",
        description:
          "Планирование безопасности для гостевых зон, reception, коридоров, входов-выходов и сервисных зон.",
        icon: Hotel,
        items: ["Контроль reception", "Камеры коридоров", "Access зоны", "Планирование сети"],
      },
      {
        title: "Учебные заведения",
        description:
          "Контроль доступа, камеры и безопасные сетевые решения для школ, курсов и учебных центров.",
        icon: School,
        items: ["Контроль входа", "Камеры классов/коридоров", "Wi-Fi coverage", "Удаленный мониторинг"],
      },
      {
        title: "Государственные и административные объекты",
        description:
          "Структурированный и надежный системный подход для объектов с повышенными требованиями безопасности.",
        icon: Landmark,
        items: ["Многозональный контроль", "Access control", "Безопасность периметра", "Техническая документация"],
      },
    ],

    planningTitle: "Мы планируем решения под конкретный объект",
    planningDescription:
      "Один и тот же товар не всегда подходит каждому объекту. Поэтому количество камер, угол обзора, срок хранения, расстояние кабеля и нагрузка на сеть должны рассчитываться отдельно.",
    steps: [
      "Анализируется тип объекта и зоны риска",
      "Планируются точки камер, доступа и сети",
      "Готовится список подходящего оборудования и предложение",
      "Выполняется монтаж и техническая сдача",
    ],
  },
} as const;