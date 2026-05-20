import type { Locale } from "@/lib/i18n";

export const categoryNameTranslations: Record<
  Locale,
  Record<string, string>
> = {
  az: {
    "Videomüşahidə": "Videomüşahidə",
    "Keçidə nəzarət": "Keçidə nəzarət",
    Domofon: "Domofon",
    Siqnalizasiya: "Siqnalizasiya",
    Şəbəkə: "Şəbəkə",
    "Şəbəkə avadanlıqları": "Şəbəkə avadanlıqları",
  },
  en: {
    "Videomüşahidə": "Video surveillance",
    "Keçidə nəzarət": "Access control",
    Domofon: "Intercom",
    Siqnalizasiya: "Alarm systems",
    Şəbəkə: "Networking",
    "Şəbəkə avadanlıqları": "Network equipment",
  },
  ru: {
    "Videomüşahidə": "Видеонаблюдение",
    "Keçidə nəzarət": "Контроль доступа",
    Domofon: "Домофон",
    Siqnalizasiya: "Сигнализация",
    Şəbəkə: "Сеть",
    "Şəbəkə avadanlıqları": "Сетевое оборудование",
  },
};

export function getCategoryName(category: string, locale: Locale): string {
  return categoryNameTranslations[locale][category] ?? category;
}