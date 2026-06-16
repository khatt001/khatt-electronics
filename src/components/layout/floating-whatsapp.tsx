"use client";

import { MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";

import { siteConfig } from "@/data/site";

type FloatingWhatsAppLocale = "az" | "en" | "ru";

const floatingWhatsAppTranslations = {
  az: {
    message:
      "Salam. KHATT Electronics məhsul və xidmətləri haqqında məlumat almaq istəyirəm.",
    ariaLabel: "WhatsApp ilə əlaqə",
  },
  en: {
    message:
      "Hello. I would like to get information about KHATT Electronics products and services.",
    ariaLabel: "Contact via WhatsApp",
  },
  ru: {
    message:
      "Здравствуйте. Я хочу получить информацию о товарах и услугах KHATT Electronics.",
    ariaLabel: "Связаться через WhatsApp",
  },
} as const;

function getLocaleFromPathname(pathname: string): FloatingWhatsAppLocale {
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    return "en";
  }

  if (pathname === "/ru" || pathname.startsWith("/ru/")) {
    return "ru";
  }

  return "az";
}

export function FloatingWhatsApp() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return null;
  }

  const locale = getLocaleFromPathname(pathname);

  const t = floatingWhatsAppTranslations[locale];

  return (
    <a
      href={`${siteConfig.whatsappHref}?text=${encodeURIComponent(t.message)}`}
      target="_blank"
      rel="noreferrer"
      aria-label={t.ariaLabel}
      className="fixed bottom-24 right-4 z-40 inline-flex size-14 touch-manipulation items-center justify-center rounded-full border border-emerald-300 bg-emerald-500 text-white shadow-2xl shadow-emerald-950/20 transition hover:scale-105 hover:bg-emerald-600 focus:outline-none focus:ring-4 focus:ring-emerald-200 lg:bottom-6 lg:right-6 lg:z-50"
    >
      <MessageCircle className="size-6" aria-hidden="true" />
    </a>
  );
}
