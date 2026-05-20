export type Locale = "az" | "en" | "ru";

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
  footerLinks: {
    name: string;
    href: string;
  }[];
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
    footerLinks: [
      { name: "Ana səhifə", href: "/" },
      { name: "Məhsullar", href: "/products" },
      { name: "Sifariş izləmə", href: "/track-order" },
      { name: "Əlaqə", href: "/contact" },
    ],
    categoryLinks: [
      {
        name: "Videomüşahidə sistemləri",
        href: "/products?category=video-nezaret",
      },
      {
        name: "Keçidə nəzarət",
        href: "/products?category=girise-nezaret",
      },
      {
        name: "Domofon sistemləri",
        href: "/products?category=domofoniya",
      },
      {
        name: "Siqnalizasiya",
        href: "/products?category=siqnalizasiya",
      },
      {
        name: "Şəbəkə avadanlıqları",
        href: "/products?category=sebeke",
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
    footerLinks: [
      { name: "Home", href: "/en" },
      { name: "Products", href: "/en/products" },
      { name: "Track order", href: "/en/track-order" },
      { name: "Contact", href: "/en/contact" },
    ],
    categoryLinks: [
      {
        name: "Video surveillance systems",
        href: "/en/products?category=video-nezaret",
      },
      {
        name: "Access control",
        href: "/en/products?category=girise-nezaret",
      },
      {
        name: "Intercom systems",
        href: "/en/products?category=domofoniya",
      },
      {
        name: "Alarm systems",
        href: "/en/products?category=siqnalizasiya",
      },
      {
        name: "Network equipment",
        href: "/en/products?category=sebeke",
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
    footerLinks: [
      { name: "Главная", href: "/ru" },
      { name: "Товары", href: "/ru/products" },
      { name: "Отследить заказ", href: "/ru/track-order" },
      { name: "Контакты", href: "/ru/contact" },
    ],
    categoryLinks: [
      {
        name: "Системы видеонаблюдения",
        href: "/ru/products?category=video-nezaret",
      },
      {
        name: "Контроль доступа",
        href: "/ru/products?category=girise-nezaret",
      },
      {
        name: "Домофонные системы",
        href: "/ru/products?category=domofoniya",
      },
      {
        name: "Сигнализация",
        href: "/ru/products?category=siqnalizasiya",
      },
      {
        name: "Сетевое оборудование",
        href: "/ru/products?category=sebeke",
      },
    ],
  },
};