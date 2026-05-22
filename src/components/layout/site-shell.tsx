// NO "use client" here — this is now a Server Component.
// Only the locale-detection logic needs the pathname, which we read
// from Next.js's built-in headers() on the server side.
// This eliminates the client-side JS bundle cost of SiteShell itself.

import { headers } from "next/headers";
import Navbar from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { FloatingWhatsApp } from "@/components/layout/floating-whatsapp";
import { CartToast } from "@/components/cart/cart-toast";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { getLocaleFromPathname } from "@/lib/i18n";

type SiteShellProps = {
  children: React.ReactNode;
};

export async function SiteShell({ children }: SiteShellProps) {
  const headersList = await headers();
  // Next.js injects x-pathname (or x-invoke-path) — fall back to "/" safely
  const pathname =
    headersList.get("x-pathname") ??
    headersList.get("x-invoke-path") ??
    "/";

  const locale = getLocaleFromPathname(pathname);
  const isAdminRoute =
    pathname === "/admin" || pathname.startsWith("/admin/");

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar locale={locale} />
      {/* 
        Removed the extra pt-[7.25rem] wrapper div — this was causing a
        double top-padding on mobile since HomePageContent already has pt-16.
        Use a single padding source: the page's own pt-* class.
      */}
      {children}
      <Footer locale={locale} />
      <FloatingWhatsApp />
      <CartToast locale={locale} />
      <MobileBottomNav locale={locale} />
    </>
  );
}