import type { Locale } from "@/lib/i18n";

export const projectsTranslations = {
  az: {
    metadataTitle: "Obyektlər",
    metadataDescription:
      "Yaşayış binaları, ofislər, ticarət, anbar, sosial obyektlər və server otaqları üçün yanğından mühafizə sistemləri.",
    eyebrow: "Obyektlər",
    title: "Hər obyekt növü üçün öz sistem tərkibi",
    text:
      "Sistemin tərkibi binanın təyinatından, sahəsindən, mərtəbə sayından və istifadə rejimindən asılıdır. Aşağıda ən çox rast gəlinən obyekt növləri və onlarda adətən tələb olunan sistemlər göstərilib. Dəqiq tərkib obyektə baxışdan sonra müəyyən olunur.",
    note: "Tamamlanmış layihələrimizin şəkilləri və siyahısı tezliklə burada olacaq.",
  },
  en: {
    metadataTitle: "Sectors",
    metadataDescription:
      "Fire protection systems for residential buildings, offices, retail, warehouses, public buildings and server rooms.",
    eyebrow: "Sectors",
    title: "Each type of building has its own set of systems",
    text:
      "What a building needs depends on its use, area, number of floors and occupancy. Below are the most common building types and the systems they usually require. The exact scope is defined after a site survey.",
    note: "Photos and a list of our completed projects will appear here soon.",
  },
  ru: {
    metadataTitle: "Объекты",
    metadataDescription:
      "Системы противопожарной защиты для жилых зданий, офисов, торговли, складов, социальных объектов и серверных.",
    eyebrow: "Объекты",
    title: "Для каждого типа объекта — свой состав систем",
    text:
      "Состав системы зависит от назначения здания, площади, этажности и режима использования. Ниже — самые распространённые типы объектов и системы, которые для них обычно требуются. Точный состав определяется после осмотра.",
    note: "Фотографии и список завершённых проектов скоро появятся здесь.",
  },
} satisfies Record<Locale, Record<string, string>>;
