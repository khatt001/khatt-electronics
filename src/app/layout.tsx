import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Navbar from "@/components/layout/navbar";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: {
    default: "KHATT Electronics",
    template: "%s | KHATT Electronics",
  },
  description:
    "KHATT Electronics — təhlükəsizlik sistemləri, videomüşahidə, keçidə nəzarət, domofon, siqnalizasiya və ağıllı texnologiya həlləri.",
  applicationName: "KHATT Electronics",
  metadataBase: new URL("https://khatt.electronics"),
  alternates: {
    canonical: "/",
    languages: {
      az: "/",
      en: "/en",
      ru: "/ru",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="az" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}