import {
  Building2,
  Factory,
  Home,
  Hotel,
  Store,
  Warehouse,
} from "lucide-react";

export const projectsTranslations = {
  az: {
    metadataTitle: "Layihə istiqamətləri",
    metadataDescription:
      "Ofis, mağaza, anbar, yaşayış, hotel və sənaye obyektləri üçün təhlükəsizlik, elektrik, HVAC və zəif axın layihə həlləri.",

    eyebrow: "Layihə istiqamətləri",
    title: "Hər obyekt üçün fərqli texniki yanaşma",
    description:
      "Obyektin təyinatı, sahəsi, riskləri və istifadə intensivliyi fərqli olduğuna görə hər layihə ayrıca qiymətləndirilir və uyğun sistemlər birlikdə planlaşdırılır.",

    quoteButton: "Layihəni müzakirə et",
    servicesButton: "Xidmətlərə bax",

    directionsEyebrow: "Obyekt növləri",
    directionsTitle: "Fərqli sahələr üçün kompleks sistem həlləri",
    directionsDescription:
      "Aşağıdakı nümunələr tamamlanmış layihə iddiası deyil, obyekt növləri üzrə təqdim etdiyimiz texniki yanaşmalardır.",

    projects: [
      {
        title: "Ofis və biznes mərkəzləri",
        type: "Kommersiya",
        description:
          "İşçi və ziyarətçi təhlükəsizliyi, giriş-çıxış nəzarəti və stabil iş infrastrukturu üçün vahid sistem.",
        icon: Building2,
        items: [
          "Yanğın aşkarlama və xəbərdarlıq",
          "Videomüşahidə və girişə nəzarət",
          "Şəbəkə və zəif axın infrastrukturu",
          "Elektrik və iqlim sistemləri",
        ],
      },
      {
        title: "Mağaza və restoranlar",
        type: "Retail və HoReCa",
        description:
          "Müştəri zonaları, kassa, anbar və texniki sahələrin təhlükəsiz və rahat idarə olunması.",
        icon: Store,
        items: [
          "Yanğın və təxliyə sistemləri",
          "Kassa və ümumi sahə videomüşahidəsi",
          "Elektrik və işıqlandırma infrastrukturu",
          "Havalandırma və iqlim nəzarəti",
        ],
      },
      {
        title: "Anbar və logistika obyektləri",
        type: "Logistika",
        description:
          "Böyük sahələr, yükləmə zonaları, perimetr və məhsul saxlama sahələri üçün texniki həllər.",
        icon: Warehouse,
        items: [
          "Yanğın aşkarlama və xəbərdarlıq",
          "Perimetr və anbar videomüşahidəsi",
          "Girişə və nəqliyyata nəzarət",
          "Elektrik və kabel infrastrukturu",
        ],
      },
      {
        title: "Villa və yaşayış obyektləri",
        type: "Yaşayış",
        description:
          "Gündəlik istifadə rahatlığı ilə təhlükəsizliyi birləşdirən kompakt və idarəolunan sistemlər.",
        icon: Home,
        items: [
          "Yanğın və qaz xəbərdarlığı",
          "Kamera və domofon sistemləri",
          "Giriş və həyət nəzarəti",
          "İsitmə, soyutma və havalandırma",
        ],
      },
      {
        title: "Hotel və qonaqlama obyektləri",
        type: "Hospitality",
        description:
          "Qonaq təhlükəsizliyi, işçi girişləri, ümumi zonalar və fasiləsiz xidmət üçün inteqrasiya edilmiş həll.",
        icon: Hotel,
        items: [
          "Yanğın və təxliyə sistemləri",
          "Ümumi sahələrin videomüşahidəsi",
          "Girişə nəzarət və şəbəkə",
          "HVAC və elektrik sistemləri",
        ],
      },
      {
        title: "İstehsalat və sənaye sahələri",
        type: "Sənaye",
        description:
          "Riskli istehsal zonaları və yüksək texniki tələblər üçün dayanıqlı mühəndis infrastrukturu.",
        icon: Factory,
        items: [
          "Sənaye yanğın təhlükəsizliyi",
          "Elektrik və enerji paylanması",
          "Havalandırma və tüstü idarəetməsi",
          "Texniki monitorinq və giriş nəzarəti",
        ],
      },
    ],

    processEyebrow: "Layihə modeli",
    processTitle: "Sistemlər ayrı deyil, vahid layihə kimi planlanır",
    processDescription:
      "Yanğın təhlükəsizliyi, elektrik, HVAC, videomüşahidə və şəbəkə xətləri əvvəlcədən koordinasiya edilir. Bu, montaj zamanı uyğunsuzluqları və əlavə xərcləri azaldır.",

    processSteps: [
      "Obyekt və texniki tələblər qiymətləndirilir",
      "Sistemlər və kabel marşrutları birlikdə planlanır",
      "Avadanlıq siyahısı və iş həcmi hazırlanır",
      "Montaj, sazlama, sınaq və təhvil həyata keçirilir",
    ],

    ctaTitle: "Obyektiniz üçün layihə yanaşması hazırlayaq",
    ctaDescription:
      "Obyektin növünü, sahəsini və tələb olunan sistemləri qeyd edin. İlkin texniki ehtiyacları birlikdə müəyyənləşdirək.",
    ctaButton: "Layihə sorğusu göndər",
  },

  en: {
    metadataTitle: "Project directions",
    metadataDescription:
      "Security, electrical, HVAC and low-current project solutions for offices, retail, warehouses, residential, hospitality and industrial facilities.",

    eyebrow: "Project directions",
    title: "A different technical approach for every facility",
    description:
      "Each project is assessed individually because the purpose, size, risks and intensity of use vary between facilities.",

    quoteButton: "Discuss your project",
    servicesButton: "View services",

    directionsEyebrow: "Facility types",
    directionsTitle: "Integrated system solutions for different sectors",
    directionsDescription:
      "The following are technical approaches we provide for different facility types, not claims of completed projects.",

    projects: [
      {
        title: "Offices and business centers",
        type: "Commercial",
        description:
          "A unified system for employee and visitor safety, access management and stable business infrastructure.",
        icon: Building2,
        items: [
          "Fire detection and notification",
          "Video surveillance and access control",
          "Network and low-current infrastructure",
          "Electrical and climate systems",
        ],
      },
      {
        title: "Retail and restaurants",
        type: "Retail and HoReCa",
        description:
          "Safe and convenient management of customer areas, cash desks, storage and technical zones.",
        icon: Store,
        items: [
          "Fire and evacuation systems",
          "Cash desk and general surveillance",
          "Electrical and lighting infrastructure",
          "Ventilation and climate control",
        ],
      },
      {
        title: "Warehouses and logistics",
        type: "Logistics",
        description:
          "Technical solutions for large areas, loading zones, perimeters and product storage facilities.",
        icon: Warehouse,
        items: [
          "Fire detection and notification",
          "Perimeter and warehouse surveillance",
          "Access and vehicle control",
          "Electrical and cable infrastructure",
        ],
      },
      {
        title: "Villas and residential facilities",
        type: "Residential",
        description:
          "Compact and manageable systems combining everyday convenience with safety.",
        icon: Home,
        items: [
          "Fire and gas notification",
          "Camera and intercom systems",
          "Entrance and perimeter control",
          "Heating, cooling and ventilation",
        ],
      },
      {
        title: "Hotels and hospitality",
        type: "Hospitality",
        description:
          "Integrated solutions for guest safety, employee access, common areas and uninterrupted service.",
        icon: Hotel,
        items: [
          "Fire and evacuation systems",
          "Common-area video surveillance",
          "Access control and networking",
          "HVAC and electrical systems",
        ],
      },
      {
        title: "Production and industrial sites",
        type: "Industrial",
        description:
          "Reliable engineering infrastructure for high-risk production areas and demanding technical environments.",
        icon: Factory,
        items: [
          "Industrial fire safety",
          "Electrical and power distribution",
          "Ventilation and smoke management",
          "Technical monitoring and access control",
        ],
      },
    ],

    processEyebrow: "Project model",
    processTitle: "Systems are planned as one coordinated project",
    processDescription:
      "Fire safety, electrical, HVAC, surveillance and network routes are coordinated in advance, reducing installation conflicts and additional costs.",

    processSteps: [
      "Facility and technical requirements are assessed",
      "Systems and cable routes are planned together",
      "Equipment list and scope of work are prepared",
      "Installation, setup, testing and handover are completed",
    ],

    ctaTitle: "Let us prepare a project approach for your facility",
    ctaDescription:
      "Specify the type, area and required systems. We will identify the initial technical requirements together.",
    ctaButton: "Send project request",
  },

  ru: {
    metadataTitle: "Направления проектов",
    metadataDescription:
      "Решения по безопасности, электрике, HVAC и слаботочным системам для офисов, магазинов, складов, жилья, гостиниц и промышленных объектов.",

    eyebrow: "Направления проектов",
    title: "Индивидуальный технический подход к каждому объекту",
    description:
      "Каждый проект оценивается отдельно, поскольку назначение, площадь, риски и интенсивность эксплуатации объектов различаются.",

    quoteButton: "Обсудить проект",
    servicesButton: "Смотреть услуги",

    directionsEyebrow: "Типы объектов",
    directionsTitle: "Комплексные системные решения для разных сфер",
    directionsDescription:
      "Ниже представлены технические подходы для различных типов объектов, а не заявления о выполненных проектах.",

    projects: [
      {
        title: "Офисы и бизнес-центры",
        type: "Коммерческие",
        description:
          "Единая система для безопасности сотрудников и посетителей, контроля доступа и стабильной инфраструктуры.",
        icon: Building2,
        items: [
          "Обнаружение и оповещение о пожаре",
          "Видеонаблюдение и контроль доступа",
          "Сетевая и слаботочная инфраструктура",
          "Электрические и климатические системы",
        ],
      },
      {
        title: "Магазины и рестораны",
        type: "Retail и HoReCa",
        description:
          "Безопасное управление клиентскими зонами, кассами, складами и техническими помещениями.",
        icon: Store,
        items: [
          "Пожарные и эвакуационные системы",
          "Наблюдение за кассой и общими зонами",
          "Электрическая инфраструктура",
          "Вентиляция и климат-контроль",
        ],
      },
      {
        title: "Склады и логистика",
        type: "Логистика",
        description:
          "Технические решения для больших площадей, погрузочных зон, периметра и хранения продукции.",
        icon: Warehouse,
        items: [
          "Пожарное обнаружение и оповещение",
          "Наблюдение за периметром и складом",
          "Контроль доступа и транспорта",
          "Электрическая и кабельная инфраструктура",
        ],
      },
      {
        title: "Виллы и жилые объекты",
        type: "Жилые",
        description:
          "Компактные и управляемые системы, объединяющие безопасность и ежедневный комфорт.",
        icon: Home,
        items: [
          "Пожарное и газовое оповещение",
          "Камеры и домофонные системы",
          "Контроль входа и территории",
          "Отопление, охлаждение и вентиляция",
        ],
      },
      {
        title: "Гостиницы",
        type: "Hospitality",
        description:
          "Интегрированные решения для безопасности гостей, доступа персонала и бесперебойного обслуживания.",
        icon: Hotel,
        items: [
          "Пожарные и эвакуационные системы",
          "Видеонаблюдение общих зон",
          "Контроль доступа и сеть",
          "HVAC и электрические системы",
        ],
      },
      {
        title: "Производственные объекты",
        type: "Промышленные",
        description:
          "Надёжная инженерная инфраструктура для опасных зон и объектов с высокими техническими требованиями.",
        icon: Factory,
        items: [
          "Промышленная пожарная безопасность",
          "Электрика и распределение энергии",
          "Вентиляция и дымоудаление",
          "Мониторинг и контроль доступа",
        ],
      },
    ],

    processEyebrow: "Модель проекта",
    processTitle: "Системы планируются как единый проект",
    processDescription:
      "Пожарная безопасность, электрика, HVAC, видеонаблюдение и сетевые трассы координируются заранее, снижая конфликты и дополнительные расходы.",

    processSteps: [
      "Оцениваются объект и технические требования",
      "Системы и кабельные трассы планируются вместе",
      "Готовятся список оборудования и объём работ",
      "Выполняются монтаж, настройка, испытания и сдача",
    ],

    ctaTitle: "Подготовим проектный подход для вашего объекта",
    ctaDescription:
      "Укажите тип, площадь и необходимые системы. Вместе определим первоначальные технические требования.",
    ctaButton: "Отправить запрос",
  },
} as const;