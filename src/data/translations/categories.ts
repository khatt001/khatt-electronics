import type { Locale } from "@/lib/i18n";

export const categoryNameTranslations: Record<
  Locale,
  Record<string, string>
> = {
  az: {
    Videomüşahidə: "Videomüşahidə",
    "Video Nəzarət Sistemi": "Video Nəzarət Sistemi",
    "Video Nazarət Sistemi": "Video Nəzarət Sistemi",
    "Keçidə nəzarət": "Keçidə nəzarət",
    Domofon: "Domofon",
    Siqnalizasiya: "Siqnalizasiya",
    Şəbəkə: "Şəbəkə",
    "Şəbəkə avadanlıqları": "Şəbəkə avadanlıqları",
  },
  en: {
    Videomüşahidə: "Video surveillance",
    "Video Nəzarət Sistemi": "Video surveillance systems",
    "Video Nazarət Sistemi": "Video surveillance systems",
    "Keçidə nəzarət": "Access control",
    Domofon: "Intercom",
    Siqnalizasiya: "Alarm systems",
    Şəbəkə: "Networking",
    "Şəbəkə avadanlıqları": "Network equipment",
  },
  ru: {
    Videomüşahidə: "Видеонаблюдение",
    "Video Nəzarət Sistemi": "Системы видеонаблюдения",
    "Video Nazarət Sistemi": "Системы видеонаблюдения",
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
