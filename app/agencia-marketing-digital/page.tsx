import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Bot,
  ClipboardList,
  Gauge,
  Globe2,
  LineChart,
  MapPin,
  Megaphone,
  MousePointerClick,
  Network,
  Search,
  Share2,
  Sparkles,
  Target,
} from "lucide-react";
import { LandingServicesMenu } from "../components/LandingServicesMenu";
import { LeadForm } from "../components/LeadForm";
import { Logo } from "../components/Logo";
import { SITE_URL } from "../lib/site";

const baseUrl = SITE_URL;

const services = [
  {
    title: "SEO",
    text: "Auditoría, arquitectura, contenido e intención de búsqueda para captar clientes desde Google.",
    href: "/seo",
    cta: "Ver agencia SEO",
    icon: Search,
  },
  {
    title: "SEO local y Google Maps",
    text: "Perfil de Empresa, reseñas, web local y contenido coordinado para negocios que atienden en una zona concreta.",
    href: "/seo/local",
    cta: "Ver SEO local",
    icon: MapPin,
  },
  {
    title: "Diseño web profesional",
    text: "Webs claras, rápidas y orientadas a convertir visitas en formularios, llamadas y presupuestos.",
    href: "/diseno-pagina-web-profesional",
    cta: "Ver diseño web",
    icon: Globe2,
  },
  {
    title: "Google Ads",
    text: "Campañas conectadas con estrategia, medición y conversión para captar leads sin desperdiciar presupuesto.",
    href: "/agencia-marketing-digital/google-ads",
    cta: "Ver Google Ads",
    icon: Megaphone,
  },
  {
    title: "Redes sociales",
    text: "Calendario, piezas visuales y vídeo corto para mantener presencia sin improvisar cada semana.",
    href: "/gestion-redes-sociales-empresas",
    cta: "Ver redes sociales",
    icon: Share2,
  },
  {
    title: "IA para empresas",
    text: "Automatizaciones, agentes y flujos internos para reducir tareas manuales y ganar velocidad.",
    href: "/soluciones-inteligencia-artificial-empresas",
    cta: "Ver IA",
    icon: Bot,
  },
  {
    title: "Diseño de landing pages",
    text: "Landing pages profesionales para campañas, servicios y captación de leads con medición clara.",
    href: "/diseno-landing-pages",
    cta: "Ver landing pages",
    icon: MousePointerClick,
  },
];

const systemPieces = [
  { title: "Atracción", text: "SEO, SEM, redes y contenidos con intención.", icon: Target },
  { title: "Conversión", text: "Web, landing pages, copy y CTAs claros.", icon: MousePointerClick },
  { title: "Medición", text: "Leads, CPL, oportunidades y calidad comercial.", icon: BarChart3 },
  { title: "Automatización", text: "IA, CRM y procesos para avanzar con menos fricción.", icon: Sparkles },
];

const process = [
  {
    step: "01",
    title: "Auditoría inicial",
    text: "Revisamos web, captación, anuncios, SEO, medición y procesos para detectar qué está frenando el crecimiento.",
  },
  {
    step: "02",
    title: "Mapa de prioridades",
    text: "Ordenamos oportunidades por impacto, esfuerzo, urgencia y relación con ventas, no por moda del canal.",
  },
  {
    step: "03",
    title: "Ejecución conectada",
    text: "Activamos web, SEO, campañas, contenido, CRO e IA con un criterio común: generar oportunidades reales.",
  },
  {
    step: "04",
    title: "Medición y mejora",
    text: "Convertimos datos de tráfico, leads y calidad comercial en siguientes acciones claras.",
  },
];

const audiences = [
  "Pymes locales que quieren captar clientes desde Google, redes o campañas sin perder claridad.",
  "Startups que necesitan validar canales, oferta y mensajes antes de escalar inversión.",
  "Servicios profesionales que dependen de formularios, llamadas, reuniones o presupuestos.",
  "Equipos de marketing que necesitan apoyo técnico, creativo y analítico sin ampliar plantilla.",
  "Negocios que ya invierten en Ads, pero quieren reducir dependencia y mejorar conversión.",
  "Empresas con procesos manuales que pueden ganar velocidad con automatización e IA.",
];

const entryLinks = [
  { href: "/seo", label: "Necesito posicionar en Google", icon: Search },
  { href: "/diseno-pagina-web-profesional", label: "Necesito mejorar mi web", icon: Globe2 },
  { href: "/agencia-marketing-digital/google-ads", label: "Necesito captar con Google Ads", icon: Megaphone },
  { href: "/gestion-redes-sociales-empresas", label: "Necesito ordenar redes sociales", icon: Share2 },
  { href: "/soluciones-inteligencia-artificial-empresas", label: "Necesito automatizar con IA", icon: Bot },
];

const faqs = [
  {
    question: "¿Qué hace una agencia de marketing digital?",
    answer:
      "Ayuda a ordenar la captación online combinando estrategia, canales, medición y ejecución. En nuestro caso conectamos web, SEO, Google Ads, redes sociales, CRO, analítica e IA para que cada acción apoye el mismo objetivo comercial.",
  },
  {
    question: "¿Es mejor empezar por SEO, Google Ads o diseño web?",
    answer:
      "Depende de tu punto de partida. Si necesitas demanda inmediata, Ads puede acelerar aprendizaje. Si la web no convierte, conviene arreglarla antes de invertir más. Si buscas visibilidad estable, SEO suele ser una base importante.",
  },
  {
    question: "¿Trabajáis con pymes y empresas pequeñas?",
    answer:
      "Sí. La página está pensada para marketing digital para empresas que necesitan prioridades claras, especialmente pymes, negocios locales, servicios profesionales y equipos pequeños que no quieren perderse en informes.",
  },
  {
    question: "¿Puedo contratar solo un servicio concreto?",
    answer:
      "Sí. Puedes empezar por SEO, diseño web, SEM, redes sociales, CRO o IA. Si vemos que otro bloqueo impide resultados, lo señalamos en la auditoría para que puedas decidir con contexto.",
  },
  {
    question: "¿Qué incluye la auditoría gratuita?",
    answer:
      "Una revisión inicial de tu web, captación, mensajes, medición y oportunidades. El objetivo es darte una hoja de ruta clara antes de plantear una propuesta.",
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Inicio",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Agencia de marketing digital",
        item: `${baseUrl}/agencia-marketing-digital`,
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Agencia de marketing digital para empresas",
    serviceType: [
      "Marketing digital",
      "Search Engine Optimization",
      "Diseño web",
      "Google Ads",
      "Social media marketing",
      "Conversion Rate Optimization",
      "Automatización con IA",
    ],
    provider: {
      "@type": "Organization",
      name: "Crecimiento sin complicaciones",
      url: baseUrl,
    },
    areaServed: "ES",
    description:
      "Agencia de marketing digital para empresas con web, SEO, Google Ads, redes sociales, CRO, analítica e IA conectadas para captar más leads.",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Servicios de marketing digital",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          url: `${baseUrl}${service.href}`,
        },
      })),
    },
    makesOffer: {
      "@type": "Offer",
      name: "Auditoría gratuita de marketing digital",
      availability: "https://schema.org/InStock",
      url: `${baseUrl}/agencia-marketing-digital`,
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  },
];

export const metadata: Metadata = {
  title: "Agencia de marketing digital para empresas | Crecimiento sin complicaciones",
  description:
    "Agencia de marketing digital para empresas que necesitan captar más leads con web, SEO, Google Ads, redes sociales, CRO, analítica e IA.",
  keywords: [
    "agencia de marketing digital",
    "agencia marketing digital",
    "servicios de marketing digital",
    "agencia de crecimiento",
    "marketing digital para empresas",
    "agencia digital para pymes",
  ],
  alternates: {
    canonical: "/agencia-marketing-digital",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Agencia de marketing digital para empresas",
    description:
      "Web, SEO, Google Ads, redes sociales, CRO, analítica e IA conectadas para captar más leads con claridad.",
    url: "/agencia-marketing-digital",
    siteName: "Crecimiento sin complicaciones",
    locale: "es_ES",
    type: "website",
  },
};

export default function DigitalMarketingAgencyPage() {
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
              <a className="rounded-md px-3 py-2 hover:bg-slate-900 hover:text-white" href="#servicios-digitales">
                Servicios
              </a>
              <a className="rounded-md px-3 py-2 hover:bg-slate-900 hover:text-white" href="#metodo">
                Método
              </a>
              <a className="rounded-md px-3 py-2 hover:bg-slate-900 hover:text-white" href="#para-quien">
                Para quién
              </a>
              <a className="rounded-md px-3 py-2 hover:bg-slate-900 hover:text-white" href="#faq">
                FAQ
              </a>
            </div>

            <div className="mobile-header-links" aria-label="Enlaces rápidos">
              <a href="#servicios-digitales">Servicios</a>
              <a href="#metodo">Método</a>
            </div>

            <div className="flex items-center gap-3">
              <LandingServicesMenu currentPath="/agencia-marketing-digital" />
              <a
                className="landing-top-cta inline-flex min-h-11 shrink-0 items-center justify-center rounded-lg bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-blue-950/30 hover:bg-blue-500 focus-visible:ring-2 focus-visible:ring-blue-400"
                href="#auditoria-marketing-digital"
              >
                Auditoría gratuita
              </a>
            </div>
          </nav>
        </header>

        <main>
          <section
            className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_0.95fr] lg:px-8 lg:py-24"
            aria-labelledby="marketing-hero-title"
          >
            <div>
              <nav className="mb-5 flex items-center gap-2 text-sm font-bold text-slate-400" aria-label="Migas de pan">
                <Link className="hover:text-blue-300" href="/">
                  Inicio
                </Link>
                <span aria-hidden="true">/</span>
                <span>Marketing digital</span>
              </nav>
              <p className="mb-4 text-sm font-black uppercase tracking-normal text-blue-400">
                Agencia de marketing digital
              </p>
              <h1
                id="marketing-hero-title"
                className="marketing-hero-title mb-6 max-w-4xl font-black text-slate-900"
              >
                Agencia de marketing digital para empresas que quieren crecer con más claridad
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-200">
                Ayudamos a startups, pymes y negocios locales a ordenar su captación digital con una estrategia
                conectada: web, SEO, Google Ads, redes sociales, CRO, analítica y automatización con IA trabajando hacia
                el mismo objetivo.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  className="inline-flex min-h-12 items-center justify-center rounded-lg bg-blue-600 px-6 py-3 font-bold text-white shadow-xl shadow-blue-950/40 hover:bg-blue-500 focus-visible:ring-2 focus-visible:ring-blue-400"
                  href="#auditoria-marketing-digital"
                >
                  Solicitar auditoría gratuita
                </a>
                <a
                  className="inline-flex min-h-12 items-center justify-center rounded-lg border border-slate-700 px-6 py-3 font-bold text-slate-100 hover:bg-slate-900 focus-visible:ring-2 focus-visible:ring-blue-400"
                  href="#servicios-digitales"
                >
                  Ver servicios
                </a>
              </div>
            </div>

            <div
              className="seo-audit-panel rounded-lg bg-slate-900 p-6 shadow-2xl shadow-blue-950/30 ring-1 ring-slate-800"
              aria-label="Sistema de crecimiento digital"
            >
              <div className="seo-audit-panel-head mb-7 flex items-center justify-between gap-4 pb-5">
                <div className="seo-audit-panel-title">
                  <p className="text-sm font-black uppercase tracking-normal text-blue-400">Sistema de crecimiento</p>
                  <strong className="mt-2 block text-2xl font-black text-white">Canales conectados</strong>
                </div>
                <span className="seo-audit-panel-badge rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-black uppercase text-emerald-300 ring-1 ring-emerald-300/20">
                  360°
                </span>
              </div>
              <div className="grid gap-4">
                {systemPieces.map((piece) => (
                  <article
                    className="seo-audit-step grid gap-4 rounded-lg bg-slate-950 p-5 ring-1 ring-slate-800 sm:grid-cols-[3rem_1fr]"
                    key={piece.title}
                  >
                    <span className="grid h-12 w-12 place-items-center rounded-lg bg-blue-500/10 text-blue-300 ring-1 ring-blue-400/20">
                      <piece.icon className="h-6 w-6" aria-hidden="true" strokeWidth={1.8} />
                    </span>
                    <div>
                      <h3 className="m-0 text-lg font-black text-white">{piece.title}</h3>
                      <p className="mt-2 text-sm leading-[1.6] text-slate-300">{piece.text}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section
            className="border-y border-slate-800 bg-slate-900 px-4 py-16 sm:px-6 lg:px-8"
            aria-labelledby="problem-title"
          >
            <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.86fr_1.14fr]">
              <div>
                <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">El problema</p>
                <h2 id="problem-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                  El problema no suele ser hacer más marketing, sino hacerlo desconectado
                </h2>
              </div>
              <div className="grid gap-4 text-lg leading-8 text-slate-300 lg:pt-10">
                <p>
                  Muchas empresas tienen una web, campañas activas, redes sociales, contenidos o herramientas de
                  analítica, pero cada pieza va por su lado. El resultado suele ser inversión dispersa, mensajes
                  inconsistentes y decisiones tomadas con datos incompletos.
                </p>
                <p>
                  Una agencia de crecimiento debe ayudarte a ordenar el sistema completo: qué atrae demanda, qué
                  convierte, qué mide ventas y qué puede automatizarse para crecer sin añadir complejidad.
                </p>
              </div>
            </div>
          </section>

          <section
            id="servicios-digitales"
            className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
            aria-labelledby="services-title"
          >
            <div className="max-w-3xl">
              <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Servicios</p>
              <h2 id="services-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                Servicios de marketing digital conectados entre sí
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-300">
                Puedes entrar por un servicio concreto, pero el criterio siempre es el mismo: captar más oportunidades
                reales con menos ruido operativo.
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <Link
                  className="group flex h-full flex-col rounded-lg bg-white/5 p-6 ring-1 ring-white/10 hover:bg-slate-900"
                  href={service.href}
                  key={service.href}
                >
                  <span className="grid h-12 w-12 place-items-center rounded-lg bg-blue-500/10 text-blue-300 ring-1 ring-blue-400/20">
                    <service.icon className="h-6 w-6" aria-hidden="true" strokeWidth={1.8} />
                  </span>
                  <h3 className="!mt-7 text-xl font-black text-slate-900">{service.title}</h3>
                  <p className="mt-3 text-sm leading-[1.65] text-slate-300">{service.text}</p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-black text-blue-300">
                    {service.cta}
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </Link>
              ))}
            </div>
          </section>

          <section
            id="metodo"
            className="bg-slate-900 px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
            aria-labelledby="method-title"
          >
            <div className="mx-auto max-w-7xl">
              <div className="max-w-3xl">
                <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Método</p>
                <h2 id="method-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                  Cómo trabajamos una estrategia digital sin complicarla
                </h2>
              </div>

              <div className="mt-10 grid gap-4">
                {process.map((step) => (
                  <article
                    className="grid gap-4 rounded-lg bg-white/5 p-6 ring-1 ring-white/10 sm:grid-cols-[4rem_1fr]"
                    key={step.step}
                  >
                    <span className="text-3xl font-black text-blue-400">{step.step}</span>
                    <div>
                      <h3 className="text-xl font-black text-slate-900">{step.title}</h3>
                      <p className="mt-2 leading-7 text-slate-300">{step.text}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section
            id="para-quien"
            className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
            aria-labelledby="audience-title"
          >
            <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
              <div>
                <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Para quién es</p>
                <h2 id="audience-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                  Marketing digital para empresas que necesitan leads, no más piezas sueltas
                </h2>
                <p className="mt-5 text-lg leading-8 text-slate-300">
                  Tiene sentido si ya estás comparando proveedores y quieres una propuesta que conecte canal, mensaje,
                  medición y ventas desde el principio.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {audiences.map((item) => (
                  <article className="rounded-lg bg-slate-950 p-6 ring-1 ring-slate-800" key={item}>
                    <ClipboardList className="mb-5 h-6 w-6 text-blue-300" aria-hidden="true" strokeWidth={1.8} />
                    <p className="text-base font-bold leading-7 text-slate-200">{item}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section
            className="border-y border-slate-800 bg-slate-900 px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
            aria-labelledby="difference-title"
          >
            <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.86fr_1.14fr]">
              <div>
                <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Diferenciación</p>
                <h2 id="difference-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                  No vendemos acciones sueltas, construimos un sistema de captación
                </h2>
                <p className="mt-5 text-lg leading-8 text-slate-300">
                  Una web bonita, una campaña aislada o un informe SEO no resuelven el crecimiento por sí solos. Lo que
                  funciona es ordenar la oferta, captar demanda, convertirla, medirla y mejorar cada mes con datos.
                </p>
              </div>
              <div className="grid gap-5 md:grid-cols-3">
                {[
                  {
                    icon: Network,
                    label: "Canales conectados",
                    text: "Cada servicio sabe qué papel cumple dentro de la captación.",
                  },
                  {
                    icon: Gauge,
                    label: "Prioridades claras",
                    text: "Impacto, esfuerzo y urgencia antes que listas interminables de tareas.",
                  },
                  {
                    icon: LineChart,
                    label: "Negocio medido",
                    text: "Miramos leads, CPL, calidad comercial y siguientes acciones.",
                  },
                ].map((item) => (
                  <article className="rounded-lg bg-slate-950 p-6 ring-1 ring-slate-800" key={item.label}>
                    <item.icon className="h-7 w-7 text-blue-300" aria-hidden="true" strokeWidth={1.8} />
                    <h3 className="!mt-7 text-xl font-black text-slate-900">{item.label}</h3>
                    <p className="mt-3 text-sm leading-[1.65] text-slate-300">{item.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section
            className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
            aria-labelledby="entry-title"
          >
            <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
              <div>
                <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Punto de entrada</p>
                <h2 id="entry-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                  Elige el punto de entrada que mejor encaja ahora
                </h2>
                <p className="mt-5 text-lg leading-8 text-slate-300">
                  Si no tienes claro por dónde empezar, la auditoría ordena el diagnóstico antes de convertirlo en
                  propuesta.
                </p>
              </div>
              <div className="grid content-start gap-4">
                {entryLinks.map((entry) => (
                  <Link
                    className="group flex min-h-20 items-center justify-between gap-4 rounded-lg bg-white/5 p-5 font-black text-slate-100 ring-1 ring-white/10 hover:bg-slate-900"
                    href={entry.href}
                    key={entry.href}
                  >
                    <span className="flex min-w-0 items-center gap-4">
                      <entry.icon className="h-5 w-5 flex-none text-blue-300" aria-hidden="true" strokeWidth={1.8} />
                      <span>{entry.label}</span>
                    </span>
                    <ArrowRight className="h-5 w-5 flex-none text-blue-300 transition group-hover:translate-x-1" />
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section id="faq" className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="faq-title">
            <div className="max-w-3xl">
              <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">FAQ</p>
              <h2 id="faq-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                Preguntas frecuentes sobre agencia de marketing digital
              </h2>
            </div>
            <div className="mt-10 grid gap-4">
              {faqs.map((faq) => (
                <details className="rounded-lg bg-white/5 p-6 ring-1 ring-white/10" key={faq.question}>
                  <summary className="cursor-pointer text-lg font-black text-slate-900">{faq.question}</summary>
                  <p className="mt-4 leading-7 text-slate-300">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>

          <LeadForm
            id="auditoria-marketing-digital"
            sourcePage="Agencia de marketing digital"
            interestedService="Marketing digital"
            title="Ordena tu marketing antes de invertir más"
            description="Revisamos tu web, canales, mensajes y medición para detectar oportunidades reales y preparar una hoja de ruta de crecimiento clara."
            points={["Sistema de captación", "Canales prioritarios", "Hoja de ruta"]}
            buttonLabel="Solicitar auditoría gratuita"
          />
        </main>

        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-800 bg-slate-950/95 p-3 backdrop-blur md:hidden">
          <a
            className="mx-auto flex min-h-12 max-w-md items-center justify-center rounded-lg bg-blue-600 px-5 py-3 font-black text-white shadow-lg shadow-blue-950/40"
            href="#auditoria-marketing-digital"
          >
            Solicitar auditoría gratuita
          </a>
        </div>
      </div>
    </>
  );
}
