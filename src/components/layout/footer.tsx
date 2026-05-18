import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/layout/container";
import { siteConfig } from "@/data/site";

const footerLinks = [
  { name: "Ana səhifə", href: "/" },
  { name: "Məhsullar", href: "/products" },
  { name: "Əlaqə", href: "/contact" },
];

const serviceLinks = [
  "Videomüşahidə sistemləri",
  "Keçidə nəzarət",
  "Domofon sistemləri",
  "Siqnalizasiya",
  "Şəbəkə avadanlıqları",
];

export function Footer() {
  return (
    <footer className="border-t border-black/10 bg-neutral-950 text-white">
      <Container className="py-12 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]">
          <div>
            <Link href="/" className="text-xl font-semibold tracking-tight">
              {siteConfig.name}
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-7 text-white/60">
              {siteConfig.description}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Səhifələr</h3>
            <div className="mt-4 space-y-3">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-sm text-white/60 transition hover:text-white"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Xidmətlər</h3>
            <div className="mt-4 space-y-3">
              {serviceLinks.map((service) => (
                <p key={service} className="text-sm text-white/60">
                  {service}
                </p>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Əlaqə</h3>
            <div className="mt-4 space-y-3">
              <a
                href={siteConfig.phoneHref}
                className="flex items-center gap-3 text-sm text-white/60 transition hover:text-white"
              >
                <Phone className="size-4" aria-hidden="true" />
                {siteConfig.phone}
              </a>

              <a
                href={siteConfig.emailHref}
                className="flex items-center gap-3 text-sm text-white/60 transition hover:text-white"
              >
                <Mail className="size-4" aria-hidden="true" />
                {siteConfig.email}
              </a>

              <div className="flex items-center gap-3 text-sm text-white/60">
                <MapPin className="size-4" aria-hidden="true" />
                {siteConfig.address}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-white/50 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. Bütün hüquqlar
            qorunur.
          </p>
          <p>Premium security & electronics solutions.</p>
        </div>
      </Container>
    </footer>
  );
}