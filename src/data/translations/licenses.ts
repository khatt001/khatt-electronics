import type { Locale } from "@/lib/i18n";

export const licensesTranslations = {
  az: {
    metadataTitle: "Lisenziyalar",
    metadataDescription:
      "\"KHATT ELECTRONICS\" MMC-nin yanğından mühafizə (EL-775/2026) və tikinti-quraşdırma (EL-840/2026) lisenziyaları.",
    eyebrow: "Lisenziyalar",
    title: "Fəaliyyətimiz dövlət lisenziyaları ilə təsdiqlənib",
    text:
      "Lisenziyalar Azərbaycan Respublikasının İqtisadiyyat Nazirliyi tərəfindən verilib. Sənədə toxunaraq onu böyüdə bilərsiniz.",
    holderTitle: "Lisenziya sahibi",
    holderName: "Hüquqi şəxs",
    holderAddress: "Ünvan",
    holderTax: "VÖEN",
    note:
      "Müqavilə bağlanarkən lisenziyaların əslini və ya notarial surətini təqdim edirik. Tender və ya bank üçün surət lazımdırsa, sorğu göndərin.",
    noteButton: "Surət istə",
  },
  en: {
    metadataTitle: "Licenses",
    metadataDescription:
      "Fire protection (EL-775/2026) and construction-installation (EL-840/2026) licenses held by \"KHATT ELECTRONICS\" LLC.",
    eyebrow: "Licenses",
    title: "Our work is backed by state licenses",
    text:
      "Both licenses were issued by the Ministry of Economy of the Republic of Azerbaijan. Tap a document to enlarge it.",
    holderTitle: "License holder",
    holderName: "Legal entity",
    holderAddress: "Address",
    holderTax: "Tax ID (VÖEN)",
    note:
      "We present originals or notarised copies when the contract is signed. If you need a copy for a tender or a bank, send us a request.",
    noteButton: "Request a copy",
  },
  ru: {
    metadataTitle: "Лицензии",
    metadataDescription:
      "Лицензии ООО \"KHATT ELECTRONICS\" на противопожарную защиту (EL-775/2026) и строительно-монтажные работы (EL-840/2026).",
    eyebrow: "Лицензии",
    title: "Наша деятельность подтверждена государственными лицензиями",
    text:
      "Лицензии выданы Министерством экономики Азербайджанской Республики. Нажмите на документ, чтобы увеличить его.",
    holderTitle: "Владелец лицензий",
    holderName: "Юридическое лицо",
    holderAddress: "Адрес",
    holderTax: "ВОЕН",
    note:
      "При заключении договора предоставляем оригиналы или нотариальные копии. Если копия нужна для тендера или банка, отправьте запрос.",
    noteButton: "Запросить копию",
  },
} satisfies Record<Locale, Record<string, string>>;
