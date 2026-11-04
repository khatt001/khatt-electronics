import type { Locale } from "@/lib/i18n";

export type ServiceId =
  | "alarm"
  | "sprinkler"
  | "gas"
  | "evacuation"
  | "smoke"
  | "hydrants"
  | "extinguishers"
  | "maintenance"
  | "construction";

type LocalizedService = {
  title: string;
  summary: string;
  includes: string[];
};

export type FireService = {
  id: ServiceId;
  group: "fire" | "construction";
  content: Record<Locale, LocalizedService>;
};

export const fireServices: FireService[] = [
  {
    id: "alarm",
    group: "fire",
    content: {
      az: {
        title: "Yanğın siqnalizasiyası",
        summary:
          "Ünvanlı və ənənəvi sistemlər: tüstü, istilik və alov detektorları, əl ilə xəbər verən düymələr, idarəetmə panelləri.",
        includes: [
          "Detektorların seçimi və yerləşdirmə sxemi",
          "Ünvanlı və ənənəvi panellərin quraşdırılması",
          "Kabel xətlərinin çəkilməsi",
          "Sazlama, sınaq və təhvil aktı",
        ],
      },
      en: {
        title: "Fire alarm systems",
        summary:
          "Addressable and conventional systems: smoke, heat and flame detectors, manual call points and control panels.",
        includes: [
          "Detector selection and placement plan",
          "Addressable and conventional panel installation",
          "Cable routing",
          "Commissioning, testing and handover",
        ],
      },
      ru: {
        title: "Пожарная сигнализация",
        summary:
          "Адресные и пороговые системы: дымовые, тепловые и пламенные извещатели, ручные извещатели, приёмно-контрольные приборы.",
        includes: [
          "Подбор извещателей и схема размещения",
          "Монтаж адресных и пороговых панелей",
          "Прокладка кабельных линий",
          "Пусконаладка, испытания и сдача",
        ],
      },
    },
  },
  {
    id: "sprinkler",
    group: "fire",
    content: {
      az: {
        title: "Su ilə avtomatik söndürmə",
        summary:
          "Sprinkler və drencher sistemləri, nəzarət-siqnal klapanları, boru şəbəkəsi və nasos qovşaqları.",
        includes: [
          "Sprinkler və drencher şəbəkəsi",
          "Nəzarət-siqnal qovşaqları",
          "Yanğın nasos stansiyası",
          "Hidravlik sınaq",
        ],
      },
      en: {
        title: "Water-based automatic extinguishing",
        summary:
          "Sprinkler and deluge systems, alarm valves, pipework and pump assemblies.",
        includes: [
          "Sprinkler and deluge networks",
          "Alarm valve stations",
          "Fire pump station",
          "Hydraulic pressure testing",
        ],
      },
      ru: {
        title: "Автоматическое водяное пожаротушение",
        summary:
          "Спринклерные и дренчерные системы, узлы управления, трубопроводы и насосные установки.",
        includes: [
          "Спринклерные и дренчерные сети",
          "Узлы управления",
          "Пожарная насосная станция",
          "Гидравлические испытания",
        ],
      },
    },
  },
  {
    id: "gas",
    group: "fire",
    content: {
      az: {
        title: "Qaz və aerozol ilə söndürmə",
        summary:
          "Su ilə söndürülməsi mümkün olmayan otaqlar üçün: server və elektrik otaqları, arxivlər, texniki zonalar.",
        includes: [
          "Qazla söndürmə modulları",
          "Aerozol generatorları",
          "Avtomatik işəsalma və gecikmə",
          "Otaqda sızdırmazlıq yoxlaması",
        ],
      },
      en: {
        title: "Gas and aerosol extinguishing",
        summary:
          "For rooms where water cannot be used: server and electrical rooms, archives and plant rooms.",
        includes: [
          "Clean-agent gas modules",
          "Aerosol generators",
          "Automatic release with time delay",
          "Room integrity check",
        ],
      },
      ru: {
        title: "Газовое и аэрозольное тушение",
        summary:
          "Для помещений, где нельзя применять воду: серверные и электрощитовые, архивы, технические зоны.",
        includes: [
          "Модули газового тушения",
          "Генераторы аэрозоля",
          "Автоматический пуск с задержкой",
          "Проверка герметичности помещения",
        ],
      },
    },
  },
  {
    id: "evacuation",
    group: "fire",
    content: {
      az: {
        title: "Xəbərdarlıq və təxliyə",
        summary:
          "Səsli və işıqlı xəbərdarlıq, nitq ilə elan sistemi, təxliyə istiqamət göstəriciləri və qəza işıqlandırması.",
        includes: [
          "Siren və işıqlı tablolar",
          "Səsli elan sistemi",
          "\"Çıxış\" və istiqamət göstəriciləri",
          "Qəza işıqlandırması",
        ],
      },
      en: {
        title: "Warning and evacuation",
        summary:
          "Sounders and beacons, voice alarm, exit and direction signs, and emergency lighting.",
        includes: [
          "Sounders and visual beacons",
          "Voice alarm system",
          "Exit and direction signs",
          "Emergency lighting",
        ],
      },
      ru: {
        title: "Оповещение и эвакуация",
        summary:
          "Звуковое и световое оповещение, речевое оповещение, указатели эвакуации и аварийное освещение.",
        includes: [
          "Сирены и световые табло",
          "Система речевого оповещения",
          "Указатели «Выход» и направления",
          "Аварийное освещение",
        ],
      },
    },
  },
  {
    id: "smoke",
    group: "fire",
    content: {
      az: {
        title: "Tüstü çıxarma",
        summary:
          "Tüstü çıxarma və hava basqısı sistemləri, yanğın klapanları və onların siqnalizasiya ilə əlaqələndirilməsi.",
        includes: [
          "Tüstü çıxarma ventilyatorları",
          "Hava basqısı sistemi",
          "Yanğına qarşı klapanlar",
          "Siqnalizasiya ilə avtomatik işə düşmə",
        ],
      },
      en: {
        title: "Smoke control",
        summary:
          "Smoke extraction and pressurisation systems, fire dampers and their link to the fire alarm.",
        includes: [
          "Smoke extraction fans",
          "Stairwell pressurisation",
          "Fire dampers",
          "Automatic start from the fire alarm",
        ],
      },
      ru: {
        title: "Противодымная защита",
        summary:
          "Системы дымоудаления и подпора воздуха, огнезадерживающие клапаны и их связь с сигнализацией.",
        includes: [
          "Вентиляторы дымоудаления",
          "Подпор воздуха",
          "Огнезадерживающие клапаны",
          "Автоматический запуск от сигнализации",
        ],
      },
    },
  },
  {
    id: "hydrants",
    group: "fire",
    content: {
      az: {
        title: "Daxili yanğın kranları",
        summary:
          "Yanğın kranı şkafları, şlanqlar, lülələr və daxili yanğın su kəməri şəbəkəsi.",
        includes: [
          "Yanğın kranı şkafları",
          "Şlanq və lülə dəstləri",
          "Daxili su kəməri xətti",
          "Təzyiq və sərf yoxlaması",
        ],
      },
      en: {
        title: "Internal fire hydrants",
        summary:
          "Hose reel cabinets, hoses, nozzles and the internal firefighting water main.",
        includes: [
          "Hose reel cabinets",
          "Hose and nozzle sets",
          "Internal fire water main",
          "Pressure and flow test",
        ],
      },
      ru: {
        title: "Внутренний противопожарный водопровод",
        summary:
          "Пожарные шкафы, рукава, стволы и сеть внутреннего противопожарного водопровода.",
        includes: [
          "Пожарные шкафы",
          "Рукава и стволы",
          "Линия внутреннего водопровода",
          "Проверка давления и расхода",
        ],
      },
    },
  },
  {
    id: "extinguishers",
    group: "fire",
    content: {
      az: {
        title: "İlkin söndürmə vasitələri",
        summary:
          "Toz, karbon qazı və köpüklü yanğınsöndürənlər, yanğın şkafları, stendlər və yanğın təhlükəsizliyi nişanları.",
        includes: [
          "Yanğınsöndürənlərin satışı",
          "Obyektə uyğun say və növün hesablanması",
          "Yerləşdirmə və nişanlanma",
          "Dövri baxış",
        ],
      },
      en: {
        title: "Primary firefighting equipment",
        summary:
          "Powder, CO₂ and foam extinguishers, cabinets, stands and fire safety signage.",
        includes: [
          "Extinguisher supply",
          "Quantity and type calculation for the site",
          "Placement and signage",
          "Periodic inspection",
        ],
      },
      ru: {
        title: "Первичные средства пожаротушения",
        summary:
          "Порошковые, углекислотные и пенные огнетушители, шкафы, стенды и знаки пожарной безопасности.",
        includes: [
          "Продажа огнетушителей",
          "Расчёт количества и типа для объекта",
          "Размещение и знаки",
          "Периодический осмотр",
        ],
      },
    },
  },
  {
    id: "maintenance",
    group: "fire",
    content: {
      az: {
        title: "Texniki xidmət və təmir",
        summary:
          "Mövcud sistemlərə plan üzrə texniki xidmət, nasazlıqların aradan qaldırılması və köhnə avadanlığın yenilənməsi.",
        includes: [
          "Aylıq və rüblük texniki xidmət",
          "Nasazlıq çağırışına çıxış",
          "Detektor və panel dəyişimi",
          "Xidmət jurnalının aparılması",
        ],
      },
      en: {
        title: "Maintenance and repair",
        summary:
          "Scheduled maintenance of existing systems, fault repair and upgrades of outdated equipment.",
        includes: [
          "Monthly and quarterly service",
          "Fault call-outs",
          "Detector and panel replacement",
          "Service log keeping",
        ],
      },
      ru: {
        title: "Техническое обслуживание и ремонт",
        summary:
          "Плановое обслуживание действующих систем, устранение неисправностей и модернизация устаревшего оборудования.",
        includes: [
          "Ежемесячное и ежеквартальное ТО",
          "Выезд по неисправности",
          "Замена извещателей и панелей",
          "Ведение журнала обслуживания",
        ],
      },
    },
  },
  {
    id: "construction",
    group: "construction",
    content: {
      az: {
        title: "Tikinti-quraşdırma işləri",
        summary:
          "Tikintisinə icazə tələb olunan bina və qurğularda tikinti-quraşdırma işləri, o cümlədən yanğın sistemləri üçün inşaat hissəsi.",
        includes: [
          "Nasos otaqları və texniki otaqlar",
          "Boru və kabel trasları",
          "Montaj və quraşdırma işləri",
          "Yanğın sistemləri ilə birlikdə icra",
        ],
      },
      en: {
        title: "Construction and installation works",
        summary:
          "Construction and installation works on buildings and structures that require a permit, including the civil part of fire systems.",
        includes: [
          "Pump rooms and plant rooms",
          "Pipe and cable routes",
          "Assembly and installation works",
          "Delivered together with fire systems",
        ],
      },
      ru: {
        title: "Строительно-монтажные работы",
        summary:
          "Строительно-монтажные работы на зданиях и сооружениях, требующих разрешения, включая строительную часть противопожарных систем.",
        includes: [
          "Насосные и технические помещения",
          "Трассы трубопроводов и кабелей",
          "Монтажные работы",
          "Выполнение вместе с пожарными системами",
        ],
      },
    },
  },
];

export const processSteps: Record<Locale, { title: string; text: string }[]> = {
  az: [
    { title: "Obyektə baxış", text: "Mütəxəssis obyekti yerində qiymətləndirir, mövcud vəziyyəti və tələbləri qeyd edir." },
    { title: "Layihə və smeta", text: "Sistemin tərkibi, avadanlıq siyahısı və iş həcmi ilə dəqiq qiymət təklifi hazırlanır." },
    { title: "Avadanlıq təchizatı", text: "Lazım olan avadanlıq və materiallar təchiz olunur, sertifikatları ilə birlikdə." },
    { title: "Quraşdırma və sazlama", text: "Lisenziyalı komanda montajı aparır, sistemi sazlayır və sınaqdan keçirir." },
    { title: "Təhvil və sənədlər", text: "İcra sənədləri, sınaq aktları və istifadə təlimatı ilə sistem təhvil verilir." },
    { title: "Texniki xidmət", text: "Müqavilə ilə dövri xidmət və nasazlıq zamanı çıxış təmin olunur." },
  ],
  en: [
    { title: "Site survey", text: "A specialist assesses the site in person and records its current state and requirements." },
    { title: "Design and estimate", text: "You receive an exact quote with system scope, equipment list and work volume." },
    { title: "Equipment supply", text: "We supply the required equipment and materials with their certificates." },
    { title: "Installation and commissioning", text: "Our licensed team installs, configures and tests the system." },
    { title: "Handover and documents", text: "The system is handed over with as-built documents, test reports and user instructions." },
    { title: "Maintenance", text: "Scheduled service and fault call-outs under a maintenance contract." },
  ],
  ru: [
    { title: "Обследование объекта", text: "Специалист оценивает объект на месте, фиксирует состояние и требования." },
    { title: "Проект и смета", text: "Готовим точное коммерческое предложение: состав системы, оборудование и объём работ." },
    { title: "Поставка оборудования", text: "Поставляем оборудование и материалы вместе с сертификатами." },
    { title: "Монтаж и наладка", text: "Лицензированная команда выполняет монтаж, наладку и испытания." },
    { title: "Сдача и документы", text: "Система сдаётся с исполнительной документацией, актами испытаний и инструкцией." },
    { title: "Обслуживание", text: "Плановое ТО и выезды по неисправности по договору." },
  ],
};

export const objectTypes: Record<Locale, { title: string; systems: string }[]> = {
  az: [
    { title: "Yaşayış binaları", systems: "Siqnalizasiya, təxliyə, tüstü çıxarma, daxili kranlar" },
    { title: "Ofis və biznes mərkəzləri", systems: "Ünvanlı siqnalizasiya, sprinkler, səsli elan" },
    { title: "Ticarət və restoranlar", systems: "Sprinkler, siqnalizasiya, mətbəx söndürmə, yanğınsöndürənlər" },
    { title: "Anbar və sənaye", systems: "Sprinkler, nasos stansiyası, alov detektorları" },
    { title: "Məktəb, xəstəxana, otel", systems: "Siqnalizasiya, xəbərdarlıq və təxliyə, qəza işıqlandırması" },
    { title: "Server və elektrik otaqları", systems: "Qazla söndürmə, erkən aşkarlama" },
  ],
  en: [
    { title: "Residential buildings", systems: "Fire alarm, evacuation, smoke control, hose reels" },
    { title: "Offices and business centres", systems: "Addressable alarm, sprinklers, voice alarm" },
    { title: "Retail and restaurants", systems: "Sprinklers, fire alarm, kitchen suppression, extinguishers" },
    { title: "Warehouses and industry", systems: "Sprinklers, pump station, flame detectors" },
    { title: "Schools, hospitals, hotels", systems: "Fire alarm, warning and evacuation, emergency lighting" },
    { title: "Server and electrical rooms", systems: "Gas extinguishing, early detection" },
  ],
  ru: [
    { title: "Жилые здания", systems: "Сигнализация, эвакуация, дымоудаление, пожарные краны" },
    { title: "Офисы и бизнес-центры", systems: "Адресная сигнализация, спринклеры, речевое оповещение" },
    { title: "Торговля и рестораны", systems: "Спринклеры, сигнализация, тушение кухни, огнетушители" },
    { title: "Склады и производство", systems: "Спринклеры, насосная станция, извещатели пламени" },
    { title: "Школы, больницы, отели", systems: "Сигнализация, оповещение и эвакуация, аварийное освещение" },
    { title: "Серверные и электрощитовые", systems: "Газовое тушение, раннее обнаружение" },
  ],
};
