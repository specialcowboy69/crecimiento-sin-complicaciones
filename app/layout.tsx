import type { Metadata } from "next";
import { CookieConsent } from "./components/CookieConsent";
import { VercelAnalytics } from "./components/VercelAnalytics";
import { SITE_URL } from "./lib/site";
import { SCHEMA_CONTEXT, organizationJsonLd, webSiteJsonLd } from "./lib/structuredData";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Crecimiento sin complicaciones | Agencia SEO y Ads",
    template: "%s | Crecimiento sin complicaciones",
  },
  description:
    "Agencia de crecimiento para startups y equipos de marketing: SEO tecnico, SEM, CRO, contenido y reporting claro para convertir visitas en leads cualificados.",
  applicationName: "Crecimiento sin complicaciones",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Crecimiento sin complicaciones",
    description:
      "El funnel perfecto para atraer trafico organico, educar con storytelling y convertir sin friccion.",
    url: "/",
    siteName: "Crecimiento sin complicaciones",
    locale: "es_ES",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const globalJsonLd = {
  "@context": SCHEMA_CONTEXT,
  "@graph": [organizationJsonLd(), webSiteJsonLd()],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(globalJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        {children}
        <VercelAnalytics />
        <CookieConsent />
      </body>
    </html>
  );
}
