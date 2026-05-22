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
  if (pathname === "/en" || pathname.startsWith("/en/")) return "en";
  if (pathname === "/ru" || pathname.startsWith("/ru/")) return "ru";
  return "az";
}

export function FloatingWhatsApp() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) return null;

  const locale = getLocaleFromPathname(pathname);
  const t = floatingWhatsAppTranslations[locale];

  return (
    <a
      href={`${siteConfig.whatsappHref}?text=${encodeURIComponent(t.message)}`}
      target="_blank"
      rel="noreferrer"
      aria-label={t.ariaLabel}
      /*
        TOUCH TARGET FIX: Lighthouse flagged this button for insufficient touch
        target size/spacing. size-14 = 56×56px which is above the 44×44px minimum,
        but bottom-5 right-5 = 20px from edges. On some devices the OS gesture
        zone overlaps. Moving to bottom-6 right-6 (24px) gives enough clearance.
        Also added `touch-manipulation` to remove the 300ms tap delay on iOS.
      */
      className="fixed bottom-6 right-6 z-50 inline-flex size-14 touch-manipulation items-center justify-center rounded-full border border-emerald-300 bg-emerald-500 text-white shadow-2xl shadow-emerald-950/20 transition hover:scale-105 hover:bg-emerald-600 focus:outline-none focus:ring-4 focus:ring-emerald-200"
    >
      <MessageCircle className="size-6" aria-hidden="true" />
    </a>
  );
}