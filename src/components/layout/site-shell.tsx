"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import { Footer } from "@/components/layout/footer";
import { FloatingWhatsApp } from "@/components/layout/floating-whatsapp";
import { MobileActionBar } from "@/components/layout/mobile-action-bar";
import Navbar from "@/components/layout/navbar";
import { getLocaleFromPathname } from "@/lib/i18n";

type SiteShellProps = {
  children: React.ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  const pathname = usePathname() || "/";
  const locale = getLocaleFromPathname(pathname);

  const isAdminRoute = pathname === "/admin" || pathname.startsWith("/admin/");

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar key={`navbar-${locale}`} locale={locale} pathname={pathname} />

      <main className="min-h-screen pt-16 lg:pt-[116px]">{children}</main>

      <Footer locale={locale} />
      <FloatingWhatsApp locale={locale} />
      <MobileActionBar locale={locale} />
    </>
  );
}
