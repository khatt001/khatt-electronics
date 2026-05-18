"use client";

import { MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/data/site";

export function FloatingWhatsApp() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return null;
  }

  const message =
    "Salam. KHATT Electronics məhsul və xidmətləri haqqında məlumat almaq istəyirəm.";

  return (
    <a
      href={`${siteConfig.whatsappHref}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noreferrer"
      aria-label="WhatsApp ilə əlaqə"
      className="fixed bottom-5 right-5 z-50 inline-flex size-14 items-center justify-center rounded-full border border-emerald-300 bg-emerald-500 text-white shadow-2xl shadow-emerald-950/20 transition hover:scale-105 hover:bg-emerald-600 focus:outline-none focus:ring-4 focus:ring-emerald-200"
    >
      <MessageCircle className="size-6" aria-hidden="true" />
    </a>
  );
}