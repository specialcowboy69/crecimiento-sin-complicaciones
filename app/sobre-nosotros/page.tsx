import type { Metadata } from "next";
import Link from "next/link";
import { LandingServicesMenu } from "../components/LandingServicesMenu";
import { LeadForm } from "../components/LeadForm";
import { Logo } from "../components/Logo";
import { absoluteUrl } from "../lib/site";
import { ORGANIZATION_ID, WEBSITE_ID, breadcrumbJsonLd } from "../lib/structuredData";

const pagePath = "/sobre-nosotros";
const pageUrl = absoluteUrl(pagePath);

const serviceLinks = [
  { href: "/seo", label: "SEO" },
  { href: "/seo/local", label: "SEO local" },
  { href: "/diseno-pagina-web-profesional", label: "Diseño web profesional" },
  { href: "/agencia-marketing-digital/google-ads", label: "Google Ads" },
  { href: "/diseno-landing-pages", label: "Landing pages" },
  { href: "/gestion-redes-sociales-empresas", label: "Redes sociales" },
  { href: "/soluciones-inteligencia-artificial-empresas", label: "Automatizaciones e IA" },
] as const;

const aboutBreadcrumbJsonLd = breadcrumbJsonLd([
  { name: "Inicio", path: "/" },
  { name: "Sobre nosotros", path: pagePath },
]);

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": `${pageUrl}#about`,
      url: pageUrl,
      name: "Sobre Crecimiento sin complicaciones",
      description:
        "Información sobre Crecimiento sin complicaciones, agencia de marketing digital para empresas en España.",
      inLanguage: "es-ES",
      isPartOf: {
        "@id": WEBSITE_ID,
      },
      about: {
        "@id": ORGANIZATION_ID,
      },
    },
    {
      ...aboutBreadcrumbJsonLd,
      "@type": "BreadcrumbList",
    },
  ],
};

export const metadata: Metadata = {
  title: "Sobre Crecimiento sin complicaciones",
  description:
    "Conoce a Crecimiento sin complicaciones: agencia de marketing digital en España especializada en SEO, diseño web, Google Ads, landing pages, redes sociales y automatizaciones.",
  alternates: {
    canonical: pagePath,
  },
  openGraph: {
    title: "Sobre Crecimiento sin complicaciones",
    description:
      "Agencia de marketing digital para empresas que quieren ordenar captación, conversión y automatización.",
    url: pagePath,
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <div className="landing-light min-h-screen bg-slate-950 text-slate-50">
        <header className="sticky top-0 z-20 border-b border-slate-800 bg-slate-950/95 backdrop-blur">
          <nav
            className="mx-auto flex min-h-[72px] max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8"
            aria-label="Navegación principal"
          >
            <Link className="logo-link text-slate-50" href="/" aria-label="Crecimiento sin complicaciones, inicio">
              <Logo variant="light" />
            </Link>

            <div className="hidden items-center gap-2 text-sm font-semibold text-slate-300 lg:flex">
              <a className="rounded-md px-3 py-2 hover:bg-slate-900 hover:text-white" href="#que-hacemos">
                Qué hacemos
              </a>
              <a className="rounded-md px-3 py-2 hover:bg-slate-900 hover:text-white" href="#donde-trabajamos">
                Dónde trabajamos
              </a>
              <a className="rounded-md px-3 py-2 hover:bg-slate-900 hover:text-white" href="#auditoria">
                Auditoría
              </a>
            </div>

            <div className="mobile-header-links" aria-label="Enlaces rápidos">
              <a href="#que-hacemos">Servicios</a>
              <a href="#auditoria">Auditoría</a>
            </div>

            <div className="flex items-center gap-3">
              <LandingServicesMenu currentPath={pagePath} />
              <a
                className="landing-top-cta inline-flex min-h-11 shrink-0 items-center justify-center rounded-lg bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-blue-950/30 hover:bg-blue-500 focus-visible:ring-2 focus-visible:ring-blue-400"
                href="#auditoria"
              >
                Auditoría gratuita
              </a>
            </div>
          </nav>
        </header>

        <main>
          <section
            className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_0.85fr] lg:px-8 lg:py-24"
            aria-labelledby="about-title"
          >
            <div>
              <nav className="mb-5 flex items-center gap-2 text-sm font-bold text-slate-400" aria-label="Migas de pan">
                <Link className="hover:text-blue-300" href="/">
                  Inicio
                </Link>
                <span aria-hidden="true">/</span>
                <span>Sobre nosotros</span>
              </nav>
              <p className="mb-4 text-sm font-black uppercase tracking-normal text-blue-400">Entidad y enfoque</p>
              <h1 id="about-title" className="mb-6 max-w-4xl text-4xl font-black text-slate-900 sm:text-5xl lg:text-6xl">
                Sobre Crecimiento sin complicaciones
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-slate-200">
                Crecimiento sin complicaciones es una Agencia de marketing digital para empresas en España que
                necesitan ordenar su captación, mejorar su web y convertir visitas en conversaciones comerciales.
              </p>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-200">
                Trabajamos con empresas de toda España de forma remota, con procesos claros y foco en las
                oportunidades que pueden acabar en llamadas, formularios o presupuestos.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  className="inline-flex min-h-12 items-center justify-center rounded-lg bg-blue-600 px-6 py-3 font-bold text-white shadow-xl shadow-blue-950/40 hover:bg-blue-500 focus-visible:ring-2 focus-visible:ring-blue-400"
                  href="#auditoria"
                >
                  Solicitar auditoría gratuita
                </a>
                <a
                  className="inline-flex min-h-12 items-center justify-center rounded-lg border border-slate-700 px-6 py-3 font-bold text-slate-100 hover:bg-slate-900 focus-visible:ring-2 focus-visible:ring-blue-400"
                  href="#que-hacemos"
                >
                  Ver servicios
                </a>
              </div>
            </div>

            <aside
              className="seo-audit-panel rounded-lg bg-slate-900 p-6 shadow-2xl shadow-blue-950/30 ring-1 ring-slate-800"
              aria-label="Resumen de la agencia"
            >
              <div className="seo-audit-panel-head mb-7 pb-5">
                <p className="text-sm font-black uppercase tracking-normal text-blue-400">Crecimiento sin complicaciones</p>
                <strong className="mt-2 block text-2xl font-black text-white">Sistema comercial claro</strong>
              </div>
              <div className="grid gap-4">
                {[
                  ["Captación", "SEO, Ads, landing pages, redes y contenidos con intención comercial."],
                  ["Conversión", "Diseño web, copy, formularios y CTAs orientados a contacto."],
                  ["Medición", "Leads, calidad de oportunidades y próximos pasos accionables."],
                  ["Automatización", "IA y procesos conectados para reducir trabajo manual."],
                ].map(([title, text]) => (
                  <article className="seo-audit-step rounded-lg bg-slate-950 p-5 ring-1 ring-slate-800" key={title}>
                    <h2 className="m-0 text-lg font-black text-white">{title}</h2>
                    <p className="mt-2 text-sm leading-[1.6] text-slate-300">{text}</p>
                  </article>
                ))}
              </div>
            </aside>
          </section>

          <section
            id="que-hacemos"
            className="border-y border-slate-800 bg-slate-900 px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
            aria-labelledby="services-title"
          >
            <div className="mx-auto max-w-7xl">
              <div className="max-w-3xl">
                <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Qué hacemos</p>
                <h2 id="services-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                  Servicios reales, conectados por una misma hoja de ruta
                </h2>
                <p className="mt-4 text-lg leading-8 text-slate-300">
                  La web funciona como un mapa comercial: cada servicio tiene una URL propia, un objetivo de captación y
                  una relación clara con el resto del sistema.
                </p>
              </div>

              <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {serviceLinks.map((service) => (
                  <Link
                    className="group flex min-h-28 flex-col justify-between rounded-lg bg-white/5 p-6 ring-1 ring-white/10 hover:bg-slate-950"
                    href={service.href}
                    key={service.href}
                  >
                    <span className="text-xl font-black text-slate-900">{service.label}</span>
                    <span className="mt-5 text-sm font-black text-blue-300 group-hover:text-blue-400">Ver servicio</span>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section
            id="donde-trabajamos"
            className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.86fr_1.14fr] lg:px-8 lg:py-24"
            aria-labelledby="markets-title"
          >
            <div>
              <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Alcance nacional</p>
              <h2 id="markets-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                Trabajamos con empresas de toda España
              </h2>
            </div>
            <div className="grid gap-6 text-lg leading-8 text-slate-300">
              <p>
                No necesitas estar en una ciudad concreta para que podamos ayudarte. Revisamos tu web, tu captación
                y tus prioridades de negocio de forma remota, con una hoja de ruta clara para decidir qué mejorar
                primero.
              </p>
              <p>
                Cuando tu negocio depende de una zona concreta, aterrizamos la estrategia en búsquedas locales,
                páginas por ciudad y señales de confianza para mercados como Madrid, Barcelona, Valencia, Sevilla,
                Alicante o Málaga.
              </p>
              <div className="grid gap-4 md:grid-cols-3">
                {[
                  [
                    "Empresas nacionales",
                    "SEO, diseño web, Ads, analítica y automatización con visión de negocio.",
                  ],
                  [
                    "Negocios locales",
                    "Captación por ciudad, páginas locales y mejora de visibilidad en búsquedas cercanas.",
                  ],
                  [
                    "Pymes en crecimiento",
                    "Prioridades claras antes de invertir en acciones sueltas o canales nuevos.",
                  ],
                ].map(([title, text]) => (
                  <article className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-slate-200" key={title}>
                    <h3 className="text-base font-black text-slate-900">{title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <LeadForm
            sourcePage="Sobre nosotros"
            interestedService="Auditoría gratuita"
            title="Auditoría gratuita"
            description="Cuéntanos tu situación y revisamos qué parte de tu captación, web, SEO, anuncios o procesos merece prioridad."
            points={["Contexto del negocio", "Bloqueos principales", "Siguiente paso razonable"]}
            buttonLabel="Solicitar auditoría gratuita"
          />
        </main>
      </div>
    </>
  );
}
