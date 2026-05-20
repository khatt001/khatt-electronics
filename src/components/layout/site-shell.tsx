"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { FloatingWhatsApp } from "@/components/layout/floating-whatsapp";
import { CartToast } from "@/components/cart/cart-toast";
import type { Locale } from "@/data/translations/layout";

type SiteShellProps = {
  children: React.ReactNode;
};

function getLocaleFromPathname(pathname: string): Locale {
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    return "en";
  }

  if (pathname === "/ru" || pathname.startsWith("/ru/")) {
    return "ru";
  }

  return "az";
}

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