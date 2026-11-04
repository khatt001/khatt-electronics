import type { Locale } from "@/lib/i18n";

export type LicenseRecord = {
  id: "fire" | "construction";
  number: string;
  issuedAt: string; // ISO date
  image: string;
  thumb: string;
  kind: Record<Locale, string>;
  scope: Record<Locale, string>;
  short: Record<Locale, string>;
};

export const licenseIssuer = {
  az: "Azərbaycan Respublikasının İqtisadiyyat Nazirliyi",
  en: "Ministry of Economy of the Republic of Azerbaijan",
  ru: "Министерство экономики Азербайджанской Республики",
} as const;

export const licenses: LicenseRecord[] = [
  {
    id: "fire",
    number: "EL-775/2026",
    issuedAt: "2026-08-31",
    image: "/licenses/yangin-muhafize.webp",
    thumb: "/licenses/yangin-muhafize-thumb.webp",
    kind: {
      az: "Xüsusi lisenziya",
      en: "Special license",
      ru: "Специальная лицензия",
    },
    scope: {
      az: "Yanğından mühafizə sistemlərinin və vasitələrinin quraşdırılması, texniki xidməti və təmiri",
      en: "Installation, maintenance and repair of fire protection systems and equipment",
      ru: "Монтаж, техническое обслуживание и ремонт систем и средств противопожарной защиты",
    },
    short: {
      az: "Yanğından mühafizə",
      en: "Fire protection",
      ru: "Противопожарная защита",
    },
  },
  {
    id: "construction",
    number: "EL-840/2026",
    issuedAt: "2026-09-25",
    image: "/licenses/tikinti-qurasdirma.webp",
    thumb: "/licenses/tikinti-qurasdirma-thumb.webp",
    kind: {
      az: "Lisenziya",
      en: "License",
      ru: "Лицензия",
    },
    scope: {
      az: "Tikintisinə icazə tələb olunan bina və qurğuların tikinti-quraşdırma işləri",
      en: "Construction and installation works on buildings and structures that require a construction permit",
      ru: "Строительно-монтажные работы на зданиях и сооружениях, строительство которых требует разрешения",
    },
    short: {
      az: "Tikinti-quraşdırma",
      en: "Construction & installation",
      ru: "Строительно-монтажные работы",
    },
  },
];

const months = {
  az: ["yanvar", "fevral", "mart", "aprel", "may", "iyun", "iyul", "avqust", "sentyabr", "oktyabr", "noyabr", "dekabr"],
  en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  ru: ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"],
} as const;

export function formatLicenseDate(iso: string, locale: Locale) {
  const [y, m, d] = iso.split("-").map(Number);
  const month = months[locale][m - 1];

  if (locale === "en") return `${d} ${month} ${y}`;
  if (locale === "ru") return `${d} ${month} ${y} г.`;

  return `${d} ${month} ${y}`;
}
