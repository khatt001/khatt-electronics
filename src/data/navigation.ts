import type { Locale } from "@/lib/i18n";
import { localizedPath } from "@/lib/i18n";

export const mainNavigationItems = [
  { key: "services", path: "/services" },
  { key: "products", path: "/products" },
  { key: "licenses", path: "/licenses" },
  { key: "projects", path: "/projects" },
  { key: "about", path: "/about" },
  { key: "contact", path: "/contact" },
] as const;

export type MainNavigationKey = (typeof mainNavigationItems)[number]["key"];

export type NavigationLink = {
  key: MainNavigationKey;
  name: string;
  href: string;
};

export function getMainNavigationLinks(
  labels: Record<MainNavigationKey, string>,
  locale: Locale,
): NavigationLink[] {
  return mainNavigationItems.map((item) => ({
    key: item.key,
    name: labels[item.key],
    href: localizedPath(item.path, locale),
  }));
}
