import { siteConfig } from "@/data/site";

export function getBaseUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    siteConfig.websiteUrl ||
    "https://khatt.electronics"
  ).replace(/\/$/, "");
}

export function createOrganizationSchema() {
  const baseUrl = getBaseUrl();
  const socialLinks = Object.values(siteConfig.social).filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${baseUrl}/#organization`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: baseUrl,
    logo: {
      "@type": "ImageObject",
      url: `${baseUrl}/logo-khatt.jpeg`,
    },
    description: siteConfig.description,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bakı",
      addressCountry: "AZ",
      streetAddress: siteConfig.address,
    },
    sameAs: socialLinks,
  };
}

export function createWebsiteSchema() {
  const baseUrl = getBaseUrl();

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    name: siteConfig.name,
    url: baseUrl,
    inLanguage: ["az", "en", "ru"],
    publisher: {
      "@id": `${baseUrl}/#organization`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/products?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function createBreadcrumbSchema(
  items: {
    name: string;
    url: string;
  }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}