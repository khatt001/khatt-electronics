"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import { CartToast } from "@/components/cart/cart-toast";
import { Footer } from "@/components/layout/footer";
import { FloatingWhatsApp } from "@/components/layout/floating-whatsapp";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import Navbar from "@/components/layout/navbar";
import { getLocaleFromPathname } from "@/lib/i18n";

type SiteShellProps = {
  children: React.ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  const pathname = usePathname() || "/";
  const locale = getLocaleFromPathname(pathname);

  const isAdminRoute =
    pathname === "/admin" || pathname.startsWith("/admin/");

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar
        key={`navbar-${locale}`}
        locale={locale}
        pathname={pathname}
      />

      <main className="min-h-screen pt-[7.25rem] lg:pt-[9.75rem] xl:pt-28">
        {children}
      </main>

      <Footer
        key={`footer-${locale}`}
        locale={locale}
      />

      <FloatingWhatsApp />

      <CartToast
        key={`cart-toast-${locale}`}
        locale={locale}
      />

      <MobileBottomNav
        key={`mobile-nav-${locale}`}
        locale={locale}
      />
    </>
  );
}