"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { FloatingWhatsApp } from "@/components/layout/floating-whatsapp";
import { CartToast } from "@/components/cart/cart-toast";
import { getLocaleFromPathname } from "@/lib/i18n";

type SiteShellProps = {
  children: React.ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);

  return (
    <>
      <Navbar locale={locale} />
      {children}
      <Footer locale={locale} />
      <FloatingWhatsApp />
      <CartToast locale={locale} />
    </>
  );
}