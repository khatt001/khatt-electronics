import type { Metadata } from "next";
import "@fontsource-variable/manrope";
import "./globals.css";
import { JsonLd } from "@/components/seo/json-ld";
import { SiteShell } from "@/components/layout/site-shell";
import { createOrganizationSchema, createWebsiteSchema } from "@/lib/seo";

// Fonts are self-hosted from npm (@fontsource): no requests to Google at build or run time.

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://khatt.electronics";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "KHATT Electronics",
    template: "%s | KHATT Electronics",
  },
  description:
    "KHATT Electronics — lisenziyalı yanğından mühafizə şirkəti: yanğın siqnalizasiyası, avtomatik söndürmə, xəbərdarlıq və təxliyə sistemlərinin satışı, quraşdırılması, texniki xidməti və tikinti-quraşdırma işləri.",
  applicationName: "KHATT Electronics",
  keywords: [
    "KHATT Electronics",
    "yanğından mühafizə",
    "yanğın siqnalizasiyası",
    "yanğınsöndürmə sistemi",
    "sprinkler",
    "yanğınsöndürən",
    "xəbərdarlıq və təxliyə",
    "tüstü çıxarma",
    "tikinti-quraşdırma",
    "lisenziya",
    "Bakı",
    "Azərbaycan",
  ],
  alternates: {
    canonical: "/",
    languages: {
      az: "/",
      en: "/en",
      ru: "/ru",
    },
  },
  openGraph: {
    title: "KHATT Electronics",
    description:
      "Yanğından mühafizə sistemlərinin satışı, quraşdırılması və texniki xidməti. Tikinti-quraşdırma işləri. Dövlət lisenziyaları ilə.",
    url: siteUrl,
    siteName: "KHATT Electronics",
    locale: "az_AZ",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="az" data-scroll-behavior="smooth" suppressHydrationWarning>
      
      <body className="antialiased">
        <JsonLd data={[createOrganizationSchema(), createWebsiteSchema()]} />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
