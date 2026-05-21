import type { Locale } from "@/lib/i18n";

export function getClientLocaleFromPathname(): Locale {
  if (typeof window === "undefined") {
    return "az";
  }

  const pathname = window.location.pathname;

  if (pathname === "/en" || pathname.startsWith("/en/")) {
    return "en";
  }

  if (pathname === "/ru" || pathname.startsWith("/ru/")) {
    return "ru";
  }

  return "az";
}