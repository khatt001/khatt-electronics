import type { Locale } from "@/lib/i18n";
export type NavigationLink = {
  name: string;
  href: string;
};

export const navigationLinks: Record<Locale, NavigationLink[]> = {
  az: [
    { name: "Ana səhifə", href: "/" },
    { name: "Məhsullar", href: "/products" },
    { name: "Sifariş izləmə", href: "/track-order" },
    { name: "Əlaqə", href: "/contact" },
  ],

  en: [
    { name: "Home", href: "/en" },
    { name: "Products", href: "/en/products" },
    { name: "Track order", href: "/en/track-order" },
    { name: "Contact", href: "/en/contact" },
  ],

  ru: [
    { name: "Главная", href: "/ru" },
    { name: "Товары", href: "/ru/products" },
    { name: "Отследить заказ", href: "/ru/track-order" },
    { name: "Контакты", href: "/ru/contact" },
  ],
};

export const navLinks = navigationLinks.az;