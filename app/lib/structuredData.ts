import { contactPhone, contactEmail } from "./contact";
import { SITE_URL, absoluteUrl } from "./site";

type BreadcrumbItem = {
  name: string;
  path: string;
};

export const SCHEMA_CONTEXT = "https://schema.org";
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export function organizationJsonLd() {
  return {
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: "Crecimiento sin complicaciones",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      "@id": `${SITE_URL}/#logo`,
      url: absoluteUrl("/brand/logo.svg"),
      width: 256,
      height: 256,
    },
    telephone: contactPhone,
    email: contactEmail,
    description:
      "Agencia de marketing digital para startups, pymes y negocios que combina SEO, diseño web, Google Ads, landing pages, redes sociales, analítica y automatizaciones con IA.",
    areaServed: {
      "@type": "Country",
      name: "España",
    },
    knowsAbout: [
      "SEO",
      "SEO local",
      "Diseño web profesional",
      "Google Ads",
      "Landing pages",
      "Redes sociales",
      "Automatizaciones con IA",
      "Analítica digital",
    ],
    makesOffer: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "SEO" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "SEO local" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Diseño web profesional" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Google Ads" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Diseño de landing pages" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Gestión de redes sociales" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Automatizaciones e IA para empresas" } },
    ],
  };
}

export function webSiteJsonLd() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: "Crecimiento sin complicaciones",
    url: SITE_URL,
    inLanguage: "es-ES",
    publisher: {
      "@id": ORGANIZATION_ID,
    },
  };
}

export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

// The free audit is a separate service; it does not price the ongoing engagement.
export function freeAuditJsonLd(name: string, path: string) {
  const pageUrl = absoluteUrl(path);
  const auditId = `${pageUrl}#audit`;

  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "Service",
    "@id": auditId,
    name,
    url: `${pageUrl}#audit-request`,
    provider: { "@id": ORGANIZATION_ID },
    offers: {
      "@type": "Offer",
      name,
      price: 0,
      priceCurrency: "EUR",
      url: `${pageUrl}#audit-request`,
      seller: { "@id": ORGANIZATION_ID },
      itemOffered: { "@id": auditId },
    },
  };
}
