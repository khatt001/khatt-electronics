import type { Locale } from "@/lib/i18n";

export const aboutTranslations = {
  az: {
    metadataTitle: "Haqqımızda",
    metadataDescription:
      "\"KHATT ELECTRONICS\" MMC — yanğından mühafizə sistemləri və tikinti-quraşdırma işləri üzrə lisenziyalı şirkət.",
    eyebrow: "Haqqımızda",
    title: "Yanğın təhlükəsizliyinə ixtisaslaşmış mühəndis şirkəti",
    lead:
      "\"KHATT ELECTRONICS\" MMC yanğından mühafizə sistemlərinin satışı, quraşdırılması, texniki xidməti və təmiri ilə məşğuldur. 2026-cı ildə İqtisadiyyat Nazirliyindən yanğından mühafizə üzrə xüsusi lisenziya və tikinti-quraşdırma lisenziyası almışıq.",
    principlesTitle: "Necə işləyirik",
    principles: [
      { title: "Bir məsul tərəf", text: "Avadanlıq, montaj, inşaat hissəsi və xidmət bir müqavilədə. Nəticəyə görə cavabdeh olan bir şirkət." },
      { title: "Yazılı və şəffaf smeta", text: "Qiymət təklifində avadanlığın siyahısı, sayı və iş həcmi ayrıca göstərilir." },
      { title: "Təhvildən sonra da yanınızdayıq", text: "Quraşdırdığımız sistemlərə texniki xidmət müqaviləsi təklif edirik." },
      { title: "Sənədlər qaydasında", text: "İcra sənədləri, sınaq aktları və sertifikatlar sistemlə birlikdə təhvil verilir." },
    ],
    detailsTitle: "Şirkət məlumatları",
    name: "Adı",
    tax: "VÖEN",
    address: "Ünvan",
    licensesRow: "Lisenziyalar",
  },
  en: {
    metadataTitle: "About",
    metadataDescription:
      "\"KHATT ELECTRONICS\" LLC — a licensed company for fire protection systems and construction-installation works.",
    eyebrow: "About",
    title: "An engineering company focused on fire safety",
    lead:
      "\"KHATT ELECTRONICS\" LLC sells, installs, maintains and repairs fire protection systems. In 2026 we received a special fire protection license and a construction-installation license from the Ministry of Economy.",
    principlesTitle: "How we work",
    principles: [
      { title: "One responsible party", text: "Equipment, installation, construction and maintenance under one contract, with one company accountable for the result." },
      { title: "Written, itemised quotes", text: "Every quote lists the equipment, quantities and scope of work separately." },
      { title: "Support after handover", text: "We offer maintenance contracts for the systems we install." },
      { title: "Documents in order", text: "As-built documents, test reports and certificates are handed over with the system." },
    ],
    detailsTitle: "Company details",
    name: "Name",
    tax: "Tax ID (VÖEN)",
    address: "Address",
    licensesRow: "Licenses",
  },
  ru: {
    metadataTitle: "О компании",
    metadataDescription:
      "ООО \"KHATT ELECTRONICS\" — лицензированная компания в области противопожарной защиты и строительно-монтажных работ.",
    eyebrow: "О компании",
    title: "Инженерная компания, специализирующаяся на пожарной безопасности",
    lead:
      "ООО \"KHATT ELECTRONICS\" занимается продажей, монтажом, техническим обслуживанием и ремонтом систем противопожарной защиты. В 2026 году мы получили специальную лицензию на противопожарную защиту и лицензию на строительно-монтажные работы Министерства экономики.",
    principlesTitle: "Как мы работаем",
    principles: [
      { title: "Одна ответственная сторона", text: "Оборудование, монтаж, строительная часть и обслуживание в одном договоре. За результат отвечает одна компания." },
      { title: "Письменная и прозрачная смета", text: "В предложении отдельно указаны оборудование, количество и объём работ." },
      { title: "Остаёмся рядом после сдачи", text: "Предлагаем договор технического обслуживания для смонтированных систем." },
      { title: "Документы в порядке", text: "Исполнительная документация, акты испытаний и сертификаты передаются вместе с системой." },
    ],
    detailsTitle: "Реквизиты",
    name: "Название",
    tax: "ВОЕН",
    address: "Адрес",
    licensesRow: "Лицензии",
  },
} satisfies Record<Locale, Record<string, unknown>>;
