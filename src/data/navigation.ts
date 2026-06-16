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

export const footerCategoryItems = [
  {
    key: "videoSurveillance",
    path: "/products?category=video-nezaret",
  },
  {
    key: "accessControl",
    path: "/products?category=girise-nezaret",
  },
  {
    key: "intercom",
    path: "/products?category=domofoniya",
  },
  {
    key: "alarm",
    path: "/products?category=siqnalizasiya",
  },
  {
    key: "network",
    path: "/products?category=sebeke",
  },
] as const;

export type MainNavigationKey = (typeof mainNavigationItems)[number]["key"];
export type FooterNavigationKey =
  (typeof footerNavigationItems)[number]["key"];
export type FooterCategoryKey = (typeof footerCategoryItems)[number]["key"];

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

export function getFooterCategoryLinks(
  labels: Record<FooterCategoryKey, string>,
  locale: Locale
): NavigationLink[] {
  return footerCategoryItems.map((item) => {
    const url = new URL(item.path, "https://khatt.local");
    const category = url.searchParams.get("category");

    const productsPath = localizedPath("/products", locale);

    return {
      name: labels[item.key],
      href: category
        ? `${productsPath}?category=${category}`
        : productsPath,
    };
  });
}