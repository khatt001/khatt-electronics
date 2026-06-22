import { headers } from "next/headers";

import { CartToast } from "@/components/cart/cart-toast";
import { Footer } from "@/components/layout/footer";
import { FloatingWhatsApp } from "@/components/layout/floating-whatsapp";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import Navbar from "@/components/layout/navbar";
import { getLocaleFromPathname } from "@/lib/i18n";

type SiteShellProps = {
  children: React.ReactNode;
};

export async function SiteShell({ children }: SiteShellProps) {
  const headersList = await headers();

  const pathname = headersList.get("x-pathname") ?? "/";
  const locale = getLocaleFromPathname(pathname);

  const isAdminRoute =
    pathname === "/admin" || pathname.startsWith("/admin/");

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar locale={locale} pathname={pathname} />

      <main className="min-h-screen pt-[8rem] lg:pt-[10rem] xl:pt-[9rem]">
        {children}
      </main>

      <Footer locale={locale} />
      <FloatingWhatsApp />
      <CartToast locale={locale} />
      <MobileBottomNav locale={locale} />
    </>
  );
}