import type { Locale } from "@/lib/i18n";
import type {
  FooterCategoryKey,
  FooterNavigationKey,
} from "@/data/navigation";

export type FooterTranslation = {
  description: string;
  productsButton: string;
  trackOrderButton: string;
  pagesTitle: string;
  categoriesTitle: string;
  contactTitle: string;
  contactPageButton: string;
  copyrightSuffix: string;
  tagline: string;
  footerLinks: Record<FooterNavigationKey, string>;
  categoryLinks: Record<FooterCategoryKey, string>;
};

export const footerTranslations: Record<Locale, FooterTranslation> = {
  az: {
    description:
      "Təhlükəsizlik sistemləri, videomüşahidə, keçidə nəzarət, domofon, siqnalizasiya və ağıllı texnologiya həlləri.",
    productsButton: "Məhsullara bax",
    trackOrderButton: "Sifarişi izlə",
    pagesTitle: "Səhifələr",
    categoriesTitle: "Kateqoriyalar",
    contactTitle: "Əlaqə",
    contactPageButton: "Əlaqə səhifəsinə keç",
    copyrightSuffix: "Bütün hüquqlar qorunur.",
    tagline: "Təhlükəsizlik, elektronika və smart texnologiya həlləri.",
    footerLinks: {
      home: "Ana səhifə",
      products: "Məhsullar",
      trackOrder: "Sifariş izləmə",
      contact: "Əlaqə",
    },
    categoryLinks: {
      videoSurveillance: "Videomüşahidə sistemləri",
      accessControl: "Keçidə nəzarət",
      intercom: "Domofon sistemləri",
      alarm: "Siqnalizasiya",
      network: "Şəbəkə avadanlıqları",
    },
  },

  en: {
    description:
      "Security systems, video surveillance, access control, intercom, alarm and smart technology solutions.",
    productsButton: "View products",
    trackOrderButton: "Track order",
    pagesTitle: "Pages",
    categoriesTitle: "Categories",
    contactTitle: "Contact",
    contactPageButton: "Go to contact page",
    copyrightSuffix: "All rights reserved.",
    tagline: "Security, electronics and smart technology solutions.",
    footerLinks: {
      home: "Home",
      products: "Products",
      trackOrder: "Track order",
      contact: "Contact",
    },
    categoryLinks: {
      videoSurveillance: "Video surveillance systems",
      accessControl: "Access control",
      intercom: "Intercom systems",
      alarm: "Alarm systems",
      network: "Network equipment",
    },
  },

  ru: {
    description:
      "Системы безопасности, видеонаблюдение, контроль доступа, домофоны, сигнализация и решения для умных технологий.",
    productsButton: "Смотреть товары",
    trackOrderButton: "Отследить заказ",
    pagesTitle: "Страницы",
    categoriesTitle: "Категории",
    contactTitle: "Контакты",
    contactPageButton: "Перейти на страницу контактов",
    copyrightSuffix: "Все права защищены.",
    tagline: "Решения для безопасности, электроники и умных технологий.",
    footerLinks: {
      home: "Главная",
      products: "Товары",
      trackOrder: "Отследить заказ",
      contact: "Контакты",
    },
    categoryLinks: {
      videoSurveillance: "Системы видеонаблюдения",
      accessControl: "Контроль доступа",
      intercom: "Домофонные системы",
      alarm: "Сигнализация",
      network: "Сетевое оборудование",
    },
  },
};