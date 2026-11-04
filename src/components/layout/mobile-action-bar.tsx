import Link from "next/link";
import { FileText, MessageCircle, Phone } from "lucide-react";

import { siteConfig } from "@/data/site";
import { chromeCopy } from "@/data/translations/chrome";
import { localizedPath, type Locale } from "@/lib/i18n";

export function MobileActionBar({ locale }: { locale: Locale }) {
  const t = chromeCopy[locale];

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface/95 px-3 pt-2 pb-[calc(env(safe-area-inset-bottom)+0.5rem)] backdrop-blur-md lg:hidden">
      <div className="mx-auto grid max-w-md grid-cols-3 gap-2">
        <a
          href={siteConfig.phoneHref}
          className="flex min-h-12 flex-col items-center justify-center rounded-md border border-line text-[11px] font-semibold text-ink"
        >
          <Phone className="size-4" aria-hidden="true" />
          {t.call}
        </a>
        <a
          href={`${siteConfig.whatsappHref}?text=${encodeURIComponent(t.whatsappMessage)}`}
          target="_blank"
          rel="noreferrer"
          className="flex min-h-12 flex-col items-center justify-center rounded-md border border-line text-[11px] font-semibold text-ink"
        >
          <MessageCircle className="size-4" aria-hidden="true" />
          {t.whatsapp}
        </a>
        <Link
          href={localizedPath("/contact", locale)}
          className="flex min-h-12 flex-col items-center justify-center rounded-md bg-signal text-[11px] font-semibold text-white"
        >
          <FileText className="size-4" aria-hidden="true" />
          {t.quote}
        </Link>
      </div>
    </div>
  );
}
