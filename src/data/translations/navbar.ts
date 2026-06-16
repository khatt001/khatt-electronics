import type { Locale } from "@/lib/i18n";
import type { MainNavigationKey } from "@/data/navigation";

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
  navLinks: Record<MainNavigationKey, string>;
  languages: {
    label: string;
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
    navLinks: {
      products: "Məhsullar",
      solutions: "Həllər",
      services: "Xidmətlər",
      projects: "Layihələr",
      about: "Haqqımızda",
      contact: "Əlaqə",
    },
    languages: [
      { label: "AZ", locale: "az" },
      { label: "EN", locale: "en" },
      { label: "RU", locale: "ru" },
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
    navLinks: {
      products: "Products",
      solutions: "Solutions",
      services: "Services",
      projects: "Projects",
      about: "About",
      contact: "Contact",
    },
    languages: [
      { label: "AZ", locale: "az" },
      { label: "EN", locale: "en" },
      { label: "RU", locale: "ru" },
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
    navLinks: {
      products: "Товары",
      solutions: "Решения",
      services: "Услуги",
      projects: "Проекты",
      about: "О нас",
      contact: "Контакты",
    },
    languages: [
      { label: "AZ", locale: "az" },
      { label: "EN", locale: "en" },
      { label: "RU", locale: "ru" },
    ],
  },
};
