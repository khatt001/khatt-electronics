"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { FloatingWhatsApp } from "@/components/layout/floating-whatsapp";
import { CartToast } from "@/components/cart/cart-toast";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { getLocaleFromPathname } from "@/lib/i18n";

type SiteShellProps = {
  children: React.ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);

  const isAdminRoute = pathname === "/admin" || pathname.startsWith("/admin/");

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar locale={locale} />
      <div className="pt-[7.25rem] lg:pt-0">{children}</div>
      <Footer locale={locale} />
      <FloatingWhatsApp />
      <CartToast locale={locale} />
      <MobileBottomNav locale={locale} />
    </>
  );
}