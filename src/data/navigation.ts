import type { Locale } from "@/lib/i18n";
import { localizedPath } from "@/lib/i18n";

export const mainNavigationItems = [
  {
    key: "products",
    path: "/products",
  },
  {
    key: "solutions",
    path: "/solutions",
  },
  {
    key: "services",
    path: "/services",
  },
  {
    key: "projects",
    path: "/projects",
  },
  {
    key: "about",
    path: "/about",
  },
  {
    key: "contact",
    path: "/contact",
  },
] as const;

export const footerNavigationItems = [
  {
    key: "home",
    path: "/",
  },
  {
    key: "products",
    path: "/products",
  },
  {
    key: "trackOrder",
    path: "/track-order",
  },
  {
    key: "contact",
    path: "/contact",
  },
] as const;

export type MainNavigationKey = (typeof mainNavigationItems)[number]["key"];
export type FooterNavigationKey =
  (typeof footerNavigationItems)[number]["key"];

export type NavigationLink = {
  name: string;
  href: string;
};

export function getMainNavigationLinks(
  labels: Record<MainNavigationKey, string>,
  locale: Locale
): NavigationLink[] {
  return mainNavigationItems.map((item) => ({
    name: labels[item.key],
    href: localizedPath(item.path, locale),
  }));
}

export function getFooterNavigationLinks(
  labels: Record<FooterNavigationKey, string>,
  locale: Locale
): NavigationLink[] {
  return footerNavigationItems.map((item) => ({
    name: labels[item.key],
    href: localizedPath(item.path, locale),
  }));
}