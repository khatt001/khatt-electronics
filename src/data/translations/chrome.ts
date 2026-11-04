import type { MainNavigationKey } from "@/data/navigation";
import type { Locale } from "@/lib/i18n";

type ChromeCopy = {
  nav: Record<MainNavigationKey, string>;
  home: string;
  quote: string;
  call: string;
  whatsapp: string;
  menuOpen: string;
  menuClose: string;
  mainNav: string;
  hours: string;
  licensedBadge: string;
  footerAbout: string;
  footerPages: string;
  footerServices: string;
  footerContact: string;
  footerLegal: string;
  taxId: string;
  rights: string;
  whatsappMessage: string;
};

export const chromeCopy: Record<Locale, ChromeCopy> = {
  az: {
    nav: {
      services: "Xidmətlər",
      products: "Avadanlıq",
      licenses: "Lisenziyalar",
      projects: "Obyektlər",
      about: "Haqqımızda",
      contact: "Əlaqə",
    },
    home: "Ana səhifə",
    quote: "Qiymət sorğusu",
    call: "Zəng et",
    whatsapp: "WhatsApp",
    menuOpen: "Menyunu aç",
    menuClose: "Menyunu bağla",
    mainNav: "Əsas naviqasiya",
    hours: "B.e – Şənbə, 09:00 – 18:00",
    licensedBadge: "Lisenziyalı şirkət",
    footerAbout:
      "Yanğından mühafizə sistemlərinin satışı, quraşdırılması, texniki xidməti və təmiri. Tikinti-quraşdırma işləri. İqtisadiyyat Nazirliyinin lisenziyaları ilə.",
    footerPages: "Səhifələr",
    footerServices: "Xidmətlər",
    footerContact: "Əlaqə",
    footerLegal: "Rekvizitlər",
    taxId: "VÖEN",
    rights: "Bütün hüquqlar qorunur.",
    whatsappMessage: "Salam, yanğından mühafizə sistemi ilə bağlı məlumat almaq istəyirəm.",
  },
  en: {
    nav: {
      services: "Services",
      products: "Equipment",
      licenses: "Licenses",
      projects: "Sectors",
      about: "About",
      contact: "Contact",
    },
    home: "Home",
    quote: "Request a quote",
    call: "Call",
    whatsapp: "WhatsApp",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    mainNav: "Main navigation",
    hours: "Mon – Sat, 09:00 – 18:00",
    licensedBadge: "Licensed company",
    footerAbout:
      "Sale, installation, maintenance and repair of fire protection systems. Construction and installation works. Licensed by the Ministry of Economy.",
    footerPages: "Pages",
    footerServices: "Services",
    footerContact: "Contact",
    footerLegal: "Company details",
    taxId: "Tax ID (VÖEN)",
    rights: "All rights reserved.",
    whatsappMessage: "Hello, I would like information about a fire protection system.",
  },
  ru: {
    nav: {
      services: "Услуги",
      products: "Оборудование",
      licenses: "Лицензии",
      projects: "Объекты",
      about: "О компании",
      contact: "Контакты",
    },
    home: "Главная",
    quote: "Запросить цену",
    call: "Позвонить",
    whatsapp: "WhatsApp",
    menuOpen: "Открыть меню",
    menuClose: "Закрыть меню",
    mainNav: "Основная навигация",
    hours: "Пн – Сб, 09:00 – 18:00",
    licensedBadge: "Лицензированная компания",
    footerAbout:
      "Продажа, монтаж, техническое обслуживание и ремонт систем противопожарной защиты. Строительно-монтажные работы. По лицензиям Министерства экономики.",
    footerPages: "Страницы",
    footerServices: "Услуги",
    footerContact: "Контакты",
    footerLegal: "Реквизиты",
    taxId: "ВОЕН",
    rights: "Все права защищены.",
    whatsappMessage: "Здравствуйте, хочу получить информацию о системе пожарной защиты.",
  },
};
