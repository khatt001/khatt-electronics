export const locales = ["az", "en", "ru"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "az";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getLocaleFromPathname(pathname: string): Locale {
  const normalizedPathname = pathname.split("?")[0].split("#")[0];

  if (
    normalizedPathname === "/en" ||
    normalizedPathname.startsWith("/en/")
  ) {
    return "en";
  }

  if (
    normalizedPathname === "/ru" ||
    normalizedPathname.startsWith("/ru/")
  ) {
    return "ru";
  }

  return defaultLocale;
}

export function localizedPath(path: string, locale: Locale): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

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
  const [pathnamePart, suffix = ""] = pathname.split(/(?=[?#])/);

  let pathWithoutLocale = pathnamePart;

  if (pathnamePart === "/en" || pathnamePart === "/ru") {
    pathWithoutLocale = "/";
  } else if (pathnamePart.startsWith("/en/")) {
    pathWithoutLocale = pathnamePart.replace(/^\/en/, "") || "/";
  } else if (pathnamePart.startsWith("/ru/")) {
    pathWithoutLocale = pathnamePart.replace(/^\/ru/, "") || "/";
  }

  return `${pathWithoutLocale}${suffix}`;
}

export function switchLocalePathname(
  pathname: string,
  targetLocale: Locale,
): string {
  const pathnameWithoutLocale = removeLocaleFromPathname(pathname);

  return localizedPath(pathnameWithoutLocale, targetLocale);
}