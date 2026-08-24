export const locales = ["az", "en", "ru"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "az";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getLocaleFromPathname(pathname: string): Locale {
  const cleanPathname = pathname.split("?")[0].split("#")[0];

  const firstSegment = cleanPathname.split("/").filter(Boolean)[0];

  if (firstSegment === "en") {
    return "en";
  }

  if (firstSegment === "ru") {
    return "ru";
  }

  return defaultLocale;
}

export function localizedPath(path: string, locale: Locale): string {
  let normalizedPath = path.startsWith("/") ? path : `/${path}`;

  normalizedPath = removeLocaleFromPathname(normalizedPath);

  if (locale === defaultLocale) {
    return normalizedPath;
  }

  if (normalizedPath === "/") {
    return `/${locale}`;
  }

  return `/${locale}${normalizedPath}`;
}

export function getLocalePrefix(locale: Locale): string {
  return locale === defaultLocale ? "" : `/${locale}`;
}

export function removeLocaleFromPathname(pathname: string): string {
  const match = pathname.match(/^([^?#]*)(.*)$/);

  const pathnamePart = match?.[1] || "/";
  const suffix = match?.[2] || "";

  let cleanPath = pathnamePart;

  if (pathnamePart === "/en" || pathnamePart === "/ru") {
    cleanPath = "/";
  } else if (pathnamePart.startsWith("/en/")) {
    cleanPath = pathnamePart.slice(3) || "/";
  } else if (pathnamePart.startsWith("/ru/")) {
    cleanPath = pathnamePart.slice(3) || "/";
  }

  if (!cleanPath.startsWith("/")) {
    cleanPath = `/${cleanPath}`;
  }

  return `${cleanPath}${suffix}`;
}

export function switchLocalePathname(
  pathname: string,
  targetLocale: Locale,
): string {
  const pathnameWithoutLocale = removeLocaleFromPathname(pathname);

  return localizedPath(pathnameWithoutLocale, targetLocale);
}