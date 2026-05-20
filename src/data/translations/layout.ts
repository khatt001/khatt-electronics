import type { Locale } from "@/lib/i18n";
import type { FooterNavigationKey } from "@/data/navigation";

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
  categoryLinks: {
    name: string;
    href: string;
  }[];
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
    categoryLinks: [
      {
        name: "Videomüşahidə sistemləri",
        href: "/category/video-nezaret",
      },
      {
        name: "Keçidə nəzarət",
        href: "/category/girise-nezaret",
      },
      {
        name: "Domofon sistemləri",
        href: "/category/domofoniya",
      },
      {
        name: "Siqnalizasiya",
        href: "/category/siqnalizasiya",
      },
      {
        name: "Şəbəkə avadanlıqları",
        href: "/category/sebeke",
      },
    ],
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
    categoryLinks: [
      {
        name: "Video surveillance systems",
        href: "/en/category/video-nezaret",
      },
      {
        name: "Access control",
        href: "/en/category/girise-nezaret",
      },
      {
        name: "Intercom systems",
        href: "/en/category/domofoniya",
      },
      {
        name: "Alarm systems",
        href: "/en/category/siqnalizasiya",
      },
      {
        name: "Network equipment",
        href: "/en/category/sebeke",
      },
    ],
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
    categoryLinks: [
      {
        name: "Системы видеонаблюдения",
        href: "/ru/category/video-nezaret",
      },
      {
        name: "Контроль доступа",
        href: "/ru/category/girise-nezaret",
      },
      {
        name: "Домофонные системы",
        href: "/ru/category/domofoniya",
      },
      {
        name: "Сигнализация",
        href: "/ru/category/siqnalizasiya",
      },
      {
        name: "Сетевое оборудование",
        href: "/ru/category/sebeke",
      },
    ],
  },
};