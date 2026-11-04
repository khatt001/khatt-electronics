import type { Locale } from "@/lib/i18n";

export const servicesPageTranslations = {
  az: {
    metadataTitle: "Xidmətlər",
    metadataDescription:
      "Yanğın siqnalizasiyası, sprinkler, qazla söndürmə, xəbərdarlıq və təxliyə, tüstü çıxarma, yanğınsöndürənlər, texniki xidmət və tikinti-quraşdırma işləri.",
    eyebrow: "Xidmətlər",
    title: "Satış, quraşdırma, texniki xidmət və təmir",
    text:
      "Aşağıdakı sistemlərin hər biri üçün avadanlığı təchiz edir, quraşdırır, sazlayır və sonra xidmətini aparırıq. İnşaat hissəsi tikinti-quraşdırma lisenziyamızla icra olunur.",
    fireGroup: "Yanğından mühafizə",
    constructionGroup: "Tikinti-quraşdırma",
    includes: "Daxildir",
    ask: "Bu xidmət üçün sorğu",
    processEyebrow: "İş qaydası",
    processTitle: "Hər layihə eyni ardıcıllıqla gedir",
  },
  en: {
    metadataTitle: "Services",
    metadataDescription:
      "Fire alarm, sprinklers, gas extinguishing, warning and evacuation, smoke control, extinguishers, maintenance and construction-installation works.",
    eyebrow: "Services",
    title: "Supply, installation, maintenance and repair",
    text:
      "For each system below we supply the equipment, install and commission it, and maintain it afterwards. The construction part is carried out under our construction-installation license.",
    fireGroup: "Fire protection",
    constructionGroup: "Construction & installation",
    includes: "Includes",
    ask: "Request this service",
    processEyebrow: "How we work",
    processTitle: "Every project follows the same sequence",
  },
  ru: {
    metadataTitle: "Услуги",
    metadataDescription:
      "Пожарная сигнализация, спринклеры, газовое тушение, оповещение и эвакуация, дымоудаление, огнетушители, обслуживание и строительно-монтажные работы.",
    eyebrow: "Услуги",
    title: "Поставка, монтаж, обслуживание и ремонт",
    text:
      "Для каждой системы ниже мы поставляем оборудование, выполняем монтаж и наладку, а затем обслуживаем её. Строительная часть выполняется по нашей лицензии на строительно-монтажные работы.",
    fireGroup: "Противопожарная защита",
    constructionGroup: "Строительно-монтажные работы",
    includes: "Включено",
    ask: "Запрос на услугу",
    processEyebrow: "Порядок работы",
    processTitle: "Каждый проект идёт по одной схеме",
  },
} satisfies Record<Locale, Record<string, string>>;
