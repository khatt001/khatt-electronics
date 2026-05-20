import type { Locale } from "@/lib/i18n";
export type NavbarTranslation = {
  languageLabel: string;
  workingHours: string;
  logoAriaLabel: string;
  mainNavigationLabel: string;
  mobileMenuOpenLabel: string;
  mobileMenuCloseLabel: string;
  mobileMenuLabel: string;
  searchPlaceholder: string;
  trackOrder: string;
  compare: string;
  favorites: string;
  cart: string;
  productsCta: string;
  navLinks: {
    name: string;
    href: string;
  }[];
  languages: {
    label: string;
    href: string;
    locale: Locale;
  }[];
};

export const navbarTranslations: Record<Locale, NavbarTranslation> = {
  az: {
    languageLabel: "Dil:",
    workingHours: "B.e - Şənbə: 09:00 - 18:00",
    logoAriaLabel: "KHATT Electronics ana səhifə",
    mainNavigationLabel: "Əsas naviqasiya",
    mobileMenuOpenLabel: "Mobil menyunu aç",
    mobileMenuCloseLabel: "Mobil menyunu bağla",
    mobileMenuLabel: "Mobil menyu",
    searchPlaceholder: "Məhsul axtar...",
    trackOrder: "Sifariş izləmə",
    compare: "Müqayisə",
    favorites: "Sevimli",
    cart: "Səbət",
    productsCta: "Məhsullar",
    navLinks: [
      { name: "Məhsullar", href: "/products" },
      { name: "Həllər", href: "/solutions" },
      { name: "Xidmətlər", href: "/services" },
      { name: "Layihələr", href: "/projects" },
      { name: "Haqqımızda", href: "/about" },
      { name: "Əlaqə", href: "/contact" },
    ],
    languages: [
      { label: "AZ", href: "/", locale: "az" },
      { label: "EN", href: "/en", locale: "en" },
      { label: "RU", href: "/ru", locale: "ru" },
    ],
  },

  en: {
    languageLabel: "Language:",
    workingHours: "Mon - Sat: 09:00 - 18:00",
    logoAriaLabel: "KHATT Electronics home page",
    mainNavigationLabel: "Main navigation",
    mobileMenuOpenLabel: "Open mobile menu",
    mobileMenuCloseLabel: "Close mobile menu",
    mobileMenuLabel: "Mobile menu",
    searchPlaceholder: "Search products...",
    trackOrder: "Track order",
    compare: "Compare",
    favorites: "Favorites",
    cart: "Cart",
    productsCta: "Products",
    navLinks: [
      { name: "Products", href: "/en/products" },
      { name: "Solutions", href: "/en/solutions" },
      { name: "Services", href: "/en/services" },
      { name: "Projects", href: "/en/projects" },
      { name: "About", href: "/en/about" },
      { name: "Contact", href: "/en/contact" },
    ],
    languages: [
      { label: "AZ", href: "/", locale: "az" },
      { label: "EN", href: "/en", locale: "en" },
      { label: "RU", href: "/ru", locale: "ru" },
    ],
  },

  ru: {
    languageLabel: "Язык:",
    workingHours: "Пн - Сб: 09:00 - 18:00",
    logoAriaLabel: "Главная страница KHATT Electronics",
    mainNavigationLabel: "Основная навигация",
    mobileMenuOpenLabel: "Открыть мобильное меню",
    mobileMenuCloseLabel: "Закрыть мобильное меню",
    mobileMenuLabel: "Мобильное меню",
    searchPlaceholder: "Поиск товаров...",
    trackOrder: "Отследить заказ",
    compare: "Сравнение",
    favorites: "Избранное",
    cart: "Корзина",
    productsCta: "Товары",
    navLinks: [
      { name: "Товары", href: "/ru/products" },
      { name: "Решения", href: "/ru/solutions" },
      { name: "Услуги", href: "/ru/services" },
      { name: "Проекты", href: "/ru/projects" },
      { name: "О нас", href: "/ru/about" },
      { name: "Контакты", href: "/ru/contact" },
    ],
    languages: [
      { label: "AZ", href: "/", locale: "az" },
      { label: "EN", href: "/en", locale: "en" },
      { label: "RU", href: "/ru", locale: "ru" },
    ],
  },
};