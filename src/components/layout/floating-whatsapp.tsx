import { MessageCircle } from "lucide-react";

import { siteConfig } from "@/data/site";
import { chromeCopy } from "@/data/translations/chrome";
import type { Locale } from "@/lib/i18n";

export function FloatingWhatsApp({ locale }: { locale: Locale }) {
  const t = chromeCopy[locale];

  return (
    <a
      href={`${siteConfig.whatsappHref}?text=${encodeURIComponent(t.whatsappMessage)}`}
      target="_blank"
      rel="noreferrer"
      aria-label={t.whatsapp}
      className="fixed right-6 bottom-6 z-40 hidden size-14 items-center justify-center rounded-full bg-[#1f8f4e] text-white shadow-[0_12px_30px_rgba(15,28,23,0.25)] transition hover:scale-105 lg:flex"
    >
      <MessageCircle className="size-6" aria-hidden="true" />
    </a>
  );
}
