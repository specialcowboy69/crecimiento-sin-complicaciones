import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://crecimientosincomplicaciones.com"),
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
