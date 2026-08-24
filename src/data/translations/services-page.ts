import {
  Cable,
  ClipboardList,
  MapPinned,
  PackageCheck,
  Settings,
  ShieldCheck,
} from "lucide-react";

export type ServicesPageLocale = "az" | "en" | "ru";

export const servicesPageTranslations = {
  az: {
    metadataTitle: "Mühəndislik xidmətləri",
    metadataDescription:
      "KHATT Electronics obyektə baxış, layihələndirmə, avadanlıq təchizatı, quraşdırma, sazlama və texniki xidmət təqdim edir.",

    eyebrow: "Xidmətlər",
    title: "Layihənin bütün texniki mərhələləri bir komandada",
    description:
      "Yanğın təhlükəsizliyi, videomüşahidə, girişə nəzarət, elektrik, HVAC və şəbəkə sistemləri üzrə layihədən texniki xidmətə qədər vahid yanaşma təqdim edirik.",

    quoteButton: "Layihəni müzakirə et",
    productsButton: "Həllərə bax",

    servicesLabel: "Xidmət istiqamətləri",
    servicesTitle: "Ehtiyacdan işlək sistemə qədər",
    servicesDescription:
      "Xidmətlər ayrıca deyil, bir-birini tamamlayan vahid layihə prosesi kimi həyata keçirilir.",

    services: [
      {
        title: "Obyektə baxış və konsultasiya",
        description:
          "Obyektin təyinatı, sahəsi, riskləri və mövcud infrastrukturu yerində qiymətləndirilir.",
        icon: MapPinned,
        items: [
          "Texniki ehtiyacların müəyyənləşdirilməsi",
          "Mövcud sistemlərin yoxlanılması",
          "İlkin həll və tövsiyələrin hazırlanması",
        ],
      },
      {
        title: "Layihələndirmə",
        description:
          "Sistem sxemi, avadanlıq yerləşməsi, kabel marşrutları və iş həcmi hazırlanır.",
        icon: ClipboardList,
        items: [
          "Avadanlıq və sistem sxemləri",
          "Kabel və yerləşmə planı",
          "İş həcmi və texniki sənədlər",
        ],
      },
      {
        title: "Avadanlıq təchizatı",
        description:
          "Layihəyə və büdcəyə uyğun peşəkar avadanlıqlar seçilir və komplektləşdirilir.",
        icon: PackageCheck,
        items: [
          "Uyğun avadanlıq seçimi",
          "Məhsulların komplektləşdirilməsi",
          "Çatdırılma və zəmanət dəstəyi",
        ],
      },
      {
        title: "Quraşdırma və montaj",
        description:
          "Kabel infrastrukturu və avadanlıqlar texniki standartlara uyğun quraşdırılır.",
        icon: Cable,
        items: [
          "Kabel xətlərinin çəkilməsi",
          "Avadanlıqların montajı",
          "Səliqəli və təhlükəsiz quraşdırma",
        ],
      },
      {
        title: "Sazlama və inteqrasiya",
        description:
          "Sistem proqramlaşdırılır, digər avadanlıqlarla inteqrasiya edilir və sınaqdan keçirilir.",
        icon: Settings,
        items: [
          "Proqramlaşdırma və konfiqurasiya",
          "Sistemlərarası inteqrasiya",
          "Test və işə salınma",
        ],
      },
      {
        title: "Texniki xidmət",
        description:
          "Quraşdırılmış və mövcud sistemlərin stabil işləməsi üçün periodik dəstək göstərilir.",
        icon: ShieldCheck,
        items: [
          "Periodik yoxlama və profilaktika",
          "Nasazlıqların diaqnostikası",
          "Təmir və modernləşdirmə",
        ],
      },
    ],

    processEyebrow: "Vahid məsuliyyət",
    processTitle: "Bir layihə, bir komanda, davamlı texniki dəstək",
    processDescription:
      "Müxtəlif podratçılarla ayrıca işləməyə ehtiyac qalmır. Layihə, təchizat, montaj və xidmət vahid komanda tərəfindən idarə olunur.",

    processSteps: [
      "Ehtiyac və texniki tələblər müəyyənləşdirilir",
      "Layihə, avadanlıq siyahısı və qiymət hazırlanır",
      "Quraşdırma, sazlama və bütün sınaqlar aparılır",
      "Sistem təhvil verilir və texniki dəstək davam edir",
    ],
  },

  en: {
    metadataTitle: "Engineering services",
    metadataDescription:
      "KHATT Electronics provides site inspection, design, equipment supply, installation, commissioning and maintenance services.",

    eyebrow: "Services",
    title: "Every technical stage of the project under one team",
    description:
      "We provide a unified approach from design to maintenance for fire safety, video surveillance, access control, electrical, HVAC and network systems.",

    quoteButton: "Discuss your project",
    productsButton: "View solutions",

    servicesLabel: "Service areas",
    servicesTitle: "From requirement to an operational system",
    servicesDescription:
      "Our services work as a single connected project process rather than separate activities.",

    services: [
      {
        title: "Site inspection and consultation",
        description:
          "The purpose, area, risks and existing infrastructure of the facility are assessed on site.",
        icon: MapPinned,
        items: [
          "Identification of technical requirements",
          "Inspection of existing systems",
          "Initial solution recommendations",
        ],
      },
      {
        title: "System design",
        description:
          "System diagrams, equipment layout, cable routes and scope of work are prepared.",
        icon: ClipboardList,
        items: [
          "Equipment and system diagrams",
          "Cable and equipment layout",
          "Scope and technical documentation",
        ],
      },
      {
        title: "Equipment supply",
        description:
          "Professional equipment is selected and supplied according to the project and budget.",
        icon: PackageCheck,
        items: [
          "Suitable equipment selection",
          "Complete product configuration",
          "Delivery and warranty support",
        ],
      },
      {
        title: "Installation",
        description:
          "Cable infrastructure and equipment are installed according to technical standards.",
        icon: Cable,
        items: [
          "Cable route installation",
          "Equipment mounting",
          "Clean and safe installation",
        ],
      },
      {
        title: "Setup and integration",
        description:
          "The system is programmed, integrated with other equipment and fully tested.",
        icon: Settings,
        items: [
          "Programming and configuration",
          "System integration",
          "Testing and commissioning",
        ],
      },
      {
        title: "Technical maintenance",
        description:
          "Periodic support is provided to ensure stable operation of new and existing systems.",
        icon: ShieldCheck,
        items: [
          "Periodic inspection and prevention",
          "Fault diagnostics",
          "Repair and modernization",
        ],
      },
    ],

    processEyebrow: "Unified responsibility",
    processTitle: "One project, one team and ongoing technical support",
    processDescription:
      "There is no need to manage several separate contractors. Design, supply, installation and support are managed by one team.",

    processSteps: [
      "Requirements and technical needs are identified",
      "Design, equipment list and quotation are prepared",
      "Installation, setup and all tests are completed",
      "The system is handed over and support continues",
    ],
  },

  ru: {
    metadataTitle: "Инженерные услуги",
    metadataDescription:
      "KHATT Electronics выполняет обследование, проектирование, поставку оборудования, монтаж, настройку и техническое обслуживание.",

    eyebrow: "Услуги",
    title: "Все технические этапы проекта выполняет одна команда",
    description:
      "Мы обеспечиваем единый подход от проекта до обслуживания систем пожарной безопасности, видеонаблюдения, контроля доступа, электрики, HVAC и сетей.",

    quoteButton: "Обсудить проект",
    productsButton: "Смотреть решения",

    servicesLabel: "Направления услуг",
    servicesTitle: "От потребности до готовой системы",
    servicesDescription:
      "Все услуги выполняются как единый связанный процесс, а не как отдельные работы.",

    services: [
      {
        title: "Осмотр и консультация",
        description:
          "На объекте оцениваются назначение, площадь, риски и существующая инфраструктура.",
        icon: MapPinned,
        items: [
          "Определение технических требований",
          "Проверка существующих систем",
          "Предварительные рекомендации",
        ],
      },
      {
        title: "Проектирование",
        description:
          "Подготавливаются схемы системы, размещение оборудования, кабельные трассы и объём работ.",
        icon: ClipboardList,
        items: [
          "Схемы оборудования и системы",
          "План кабелей и размещения",
          "Объём работ и документация",
        ],
      },
      {
        title: "Поставка оборудования",
        description:
          "Профессиональное оборудование подбирается и комплектуется под проект и бюджет.",
        icon: PackageCheck,
        items: [
          "Подбор оборудования",
          "Полная комплектация",
          "Доставка и гарантия",
        ],
      },
      {
        title: "Монтаж",
        description:
          "Кабельная инфраструктура и оборудование устанавливаются по техническим стандартам.",
        icon: Cable,
        items: [
          "Прокладка кабельных линий",
          "Монтаж оборудования",
          "Аккуратная и безопасная установка",
        ],
      },
      {
        title: "Настройка и интеграция",
        description:
          "Система программируется, интегрируется с другим оборудованием и тестируется.",
        icon: Settings,
        items: [
          "Программирование и настройка",
          "Интеграция систем",
          "Тестирование и запуск",
        ],
      },
      {
        title: "Техническое обслуживание",
        description:
          "Проводится периодическая поддержка новых и существующих систем.",
        icon: ShieldCheck,
        items: [
          "Периодическая проверка",
          "Диагностика неисправностей",
          "Ремонт и модернизация",
        ],
      },
    ],

    processEyebrow: "Единая ответственность",
    processTitle: "Один проект, одна команда и постоянная поддержка",
    processDescription:
      "Нет необходимости управлять несколькими подрядчиками. Проект, поставка, монтаж и обслуживание выполняются одной командой.",

    processSteps: [
      "Определяются требования и технические задачи",
      "Готовятся проект, список оборудования и стоимость",
      "Выполняются монтаж, настройка и испытания",
      "Система сдаётся и обеспечивается поддержка",
    ],
  },
} as const;