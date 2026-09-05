import type { Metadata } from "next";
import Link from "next/link";
import {
  BarChart3,
  CheckCircle2,
  ClipboardList,
  FileSearch,
  GitBranch,
  LineChart,
  MapPin,
  Search,
  Settings2,
  Target,
} from "lucide-react";
import { LandingServicesMenu } from "../components/LandingServicesMenu";
import { Logo } from "../components/Logo";
import { SeoAuditForm } from "../components/SeoAuditForm";

const systemBlocks = [
  {
    icon: Settings2,
    title: "SEO técnico",
    text: "Indexación, velocidad, estructura, rastreo y señales que ayudan a Google a entender bien tu web.",
  },
  {
    icon: GitBranch,
    title: "Arquitectura SEO",
    text: "Páginas money, clusters de contenido y enlazado interno para ordenar la autoridad hacia las URLs que venden.",
  },
  {
    icon: Target,
    title: "Contenido con intención",
    text: "Keywords que atraen clientes potenciales, no solo visitas: servicios, problemas, comparativas y búsquedas locales.",
  },
  {
    icon: BarChart3,
    title: "Medición",
    text: "Rankings, leads, conversiones y prioridades mensuales para decidir qué hacer después con criterio.",
  },
];

const serviceItems = [
  "Auditoría SEO inicial con prioridades por impacto y esfuerzo.",
  "Keyword research y mapa de intención de búsqueda.",
  "Optimización de páginas clave para servicios SEO y captación.",
  "Creación de clusters de contenido conectados con páginas de decisión.",
  "SEO local si tu empresa vende en una zona concreta.",
  "Tracking, informes y prioridades mensuales para pymes y equipos internos.",
];

const process = [
  {
    step: "01",
    title: "Auditoría inicial",
    text: "Revisamos indexación, arquitectura, contenidos, velocidad, intención de búsqueda y oportunidades comerciales.",
  },
  {
    step: "02",
    title: "Mapa de oportunidades",
    text: "Separamos quick wins, páginas money, clusters y mejoras técnicas para que sepas qué mueve la aguja.",
  },
  {
    step: "03",
    title: "Correcciones técnicas y arquitectura",
    text: "Priorizamos rastreo, enlazado interno, estructura de URLs, canibalizaciones y señales de confianza.",
  },
  {
    step: "04",
    title: "Contenido y enlazado interno",
    text: "Creamos o mejoramos páginas pensadas para captar demanda real y llevarla hacia contacto comercial.",
  },
  {
    step: "05",
    title: "Medición y mejora continua",
    text: "Convertimos datos de Google Search Console, analítica y leads en nuevas prioridades de trabajo.",
  },
];

const audiences = [
  "Empresas con una web que no recibe tráfico cualificado.",
  "Negocios con tráfico orgánico, pero pocos leads o solicitudes de presupuesto.",
  "Pymes que dependen demasiado de Google Ads y quieren construir captación estable.",
  "Equipos de marketing que necesitan apoyo técnico en SEO, contenidos y medición.",
];

const relatedSeoLinks = [
  {
    href: "/seo-para-pymes",
    title: "SEO para pymes",
    text: "Una página específica para empresas pequeñas que necesitan priorizar captación, SEO local y acciones claras.",
  },
  {
    href: "/agencia-marketing-digital/seo-tecnico-arquitectura-entidades",
    title: "SEO técnico y arquitectura",
    text: "El enfoque técnico para ordenar rastreo, entidades, silos y estructura de contenidos.",
  },
];

const cityLinks = [
  { href: "/seo/madrid", label: "SEO en Madrid" },
  { href: "/seo/barcelona", label: "SEO en Barcelona" },
  { href: "/seo/valencia", label: "SEO en Valencia" },
  { href: "/seo/sevilla", label: "SEO en Sevilla" },
  { href: "/seo/alicante", label: "SEO en Alicante" },
  { href: "/seo/malaga", label: "SEO en Málaga" },
];

const faqs = [
  {
    question: "¿Cuánto tarda el SEO en dar resultados?",
    answer:
      "Depende de la autoridad del dominio, competencia, estado técnico y velocidad de implementación. Lo habitual es ver señales iniciales en 6-10 semanas y consolidar resultados entre 3 y 6 meses.",
  },
  {
    question: "¿Qué incluye una auditoría SEO?",
    answer:
      "Incluye revisión técnica, indexación, arquitectura, contenidos, intención de búsqueda, oportunidades de keywords, medición y una hoja de ruta priorizada para mejorar captación.",
  },
  {
    question: "¿Trabajáis SEO local?",
    answer:
      "Sí. Cuando el negocio vende por zona, trabajamos páginas locales, búsquedas por ciudad, enlazado interno y señales de confianza sin afirmar presencia física donde no exista.",
  },
  {
    question: "¿Es mejor SEO o Google Ads?",
    answer:
      "No siempre compiten. Google Ads puede acelerar aprendizaje y captación inmediata; el SEO construye visibilidad orgánica más estable. La auditoría ayuda a decidir qué canal priorizar según tu situación.",
  },
  {
    question: "¿Puedo contratar solo una auditoría?",
    answer:
      "Sí. Podemos entregar una auditoría SEO independiente con diagnóstico, prioridades y hoja de ruta aunque luego la implementación la haga tu equipo.",
  },
  {
    question: "¿Qué diferencia hay entre SEO técnico y contenido SEO?",
    answer:
      "El SEO técnico facilita que Google rastree, entienda e indexe la web. El contenido SEO responde a búsquedas reales y convierte esa visibilidad en visitas cualificadas y oportunidades comerciales.",
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
        item: "https://www.crecimientosincomplicaciones.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Agencia SEO",
        item: "https://www.crecimientosincomplicaciones.com/seo",
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Agencia SEO para empresas",
    serviceType: ["Search Engine Optimization", "Consultoría SEO", "SEO técnico", "SEO local"],
    provider: {
      "@type": "Organization",
      name: "Crecimiento sin complicaciones",
      url: "https://www.crecimientosincomplicaciones.com",
    },
    areaServed: "ES",
    description:
      "Agencia SEO para pymes y empresas con auditoría SEO, consultoría SEO, SEO técnico, arquitectura de contenidos y posicionamiento web orientado a leads.",
    makesOffer: {
      "@type": "Offer",
      name: "Auditoría SEO gratuita",
      availability: "https://schema.org/InStock",
      url: "https://www.crecimientosincomplicaciones.com/seo",
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
  title: "Agencia SEO para empresas",
  description:
    "Agencia SEO para pymes y empresas. Auditoría SEO, estrategia SEO, SEO técnico y posicionamiento web para captar más clientes desde Google.",
  keywords: [
    "agencia seo",
    "agencia seo para empresas",
    "seo para pymes",
    "servicios seo",
    "consultoría seo",
    "seo técnico",
    "posicionamiento web para empresas",
  ],
  alternates: {
    canonical: "/seo",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Agencia SEO para empresas",
    description:
      "Auditoría SEO, arquitectura web, contenidos y medición para captar tráfico cualificado desde Google.",
    url: "/seo",
    siteName: "Crecimiento sin complicaciones",
    locale: "es_ES",
    type: "website",
  },
};

function CheckIcon() {
  return <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-blue-400" aria-hidden="true" strokeWidth={2} />;
}

export default function SeoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <div className="seo-page landing-light min-h-screen bg-slate-950 text-slate-50">
        <header className="sticky top-0 z-20 border-b border-slate-800 bg-slate-950/95 backdrop-blur">
          <nav className="mx-auto flex min-h-[72px] max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8" aria-label="Navegación principal">
            <Link className="logo-link text-slate-50" href="/" aria-label="Crecimiento sin complicaciones, inicio">
              <Logo variant="light" />
            </Link>
            <div className="hidden items-center gap-2 text-sm font-semibold text-slate-300 md:flex">
              <a className="rounded-md px-3 py-2 hover:bg-slate-900 hover:text-white" href="#servicio">Servicio</a>
              <a className="rounded-md px-3 py-2 hover:bg-slate-900 hover:text-white" href="#proceso">Proceso</a>
              <a className="rounded-md px-3 py-2 hover:bg-slate-900 hover:text-white" href="#seo-local">SEO local</a>
              <a className="rounded-md px-3 py-2 hover:bg-slate-900 hover:text-white" href="#faq">FAQ</a>
            </div>
            <div className="mobile-header-links" aria-label="Enlaces rápidos">
              <a href="#servicio">Servicio</a>
              <a href="#proceso">Proceso</a>
            </div>
            <div className="flex items-center gap-3">
              <LandingServicesMenu currentPath="/seo" />
              <a className="landing-top-cta inline-flex min-h-11 shrink-0 items-center justify-center rounded-lg bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-blue-950/30 hover:bg-blue-500 focus-visible:ring-2 focus-visible:ring-blue-400" href="#auditoria-seo">
                <span className="hidden sm:inline">Auditoría gratuita</span>
                <span className="sm:hidden">Auditoría</span>
              </a>
            </div>
          </nav>
        </header>

        <main>
          <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_0.95fr] lg:px-8 lg:py-24" aria-labelledby="seo-hero-title">
            <div>
              <nav className="mb-5 flex items-center gap-2 text-sm font-bold text-slate-400" aria-label="Migas de pan">
                <Link className="hover:text-blue-300" href="/">Inicio</Link>
                <span aria-hidden="true">/</span>
                <span>SEO</span>
              </nav>
              <p className="mb-4 text-sm font-black uppercase tracking-normal text-blue-400">
                AGENCIA SEO PARA EMPRESAS
              </p>
              <h1 id="seo-hero-title" className="mb-6 max-w-4xl text-4xl font-black leading-[1.02] text-slate-900 sm:text-5xl lg:text-6xl">
                Agencia SEO para empresas que quieren captar más clientes desde Google
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-200">
                Auditamos tu web, detectamos qué está frenando tu posicionamiento y construimos una hoja de ruta SEO
                clara: técnica, contenidos, arquitectura e intención de búsqueda conectadas con negocio.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a className="inline-flex min-h-12 items-center justify-center rounded-lg bg-blue-600 px-6 py-3 font-bold text-white shadow-xl shadow-blue-950/40 hover:bg-blue-500 focus-visible:ring-2 focus-visible:ring-blue-400" href="#auditoria-seo">
                  Solicitar auditoría SEO gratuita
                </a>
                <a className="inline-flex min-h-12 items-center justify-center rounded-lg border border-slate-700 px-6 py-3 font-bold text-slate-100 hover:bg-slate-900 focus-visible:ring-2 focus-visible:ring-blue-400" href="#proceso">
                  Ver cómo trabajamos el SEO
                </a>
              </div>
              <dl className="mt-10 grid gap-3 sm:grid-cols-3">
                {[
                  ["Entrada", "Auditoría SEO gratuita"],
                  ["Foco", "Leads cualificados"],
                  ["Sistema", "Técnica, contenido y conversión"],
                ].map(([label, value]) => (
                  <div className="rounded-lg bg-white/5 p-5 ring-1 ring-white/10" key={label}>
                    <dt className="text-sm font-black uppercase text-blue-300">{label}</dt>
                    <dd className="mt-2 text-base font-bold leading-6 text-slate-100">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="seo-audit-panel rounded-lg bg-slate-900 p-6 shadow-2xl shadow-blue-950/30 ring-1 ring-slate-800" aria-label="Panel de auditoría SEO">
              <div className="seo-audit-panel-head mb-7 flex items-center justify-between gap-4 pb-5">
                <div className="seo-audit-panel-title">
                  <p className="text-sm font-black uppercase tracking-normal text-blue-400">Auditoría inicial</p>
                  <strong className="mt-2 block text-2xl font-black text-white">Hoja de ruta SEO</strong>
                </div>
                <span className="seo-audit-panel-badge rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-black uppercase text-emerald-300 ring-1 ring-emerald-300/20">
                  24-48h
                </span>
              </div>
              <div className="seo-audit-step-grid grid gap-4">
                {[
                  ["Rastreo e indexación", "Detectar URLs bloqueadas, duplicadas o sin prioridad."],
                  ["Keywords de decisión", "Separar búsquedas que informan de búsquedas que generan contacto."],
                  ["Arquitectura interna", "Conectar páginas money, clusters y servicios relacionados."],
                  ["Medición comercial", "Unir rankings, formularios y oportunidades reales."],
                ].map(([title, text]) => (
                  <article className="seo-audit-step rounded-lg bg-slate-950 p-5 ring-1 ring-slate-800" key={title}>
                    <h3 className="m-0 text-lg font-black text-white">{title}</h3>
                    <p className="mt-2 text-sm leading-[1.6] text-slate-300">{text}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="border-y border-slate-800 bg-slate-900 px-4 py-16 sm:px-6 lg:px-8" aria-labelledby="problem-title">
            <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.86fr_1.14fr]">
              <div>
                <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">El problema</p>
                <h2 id="problem-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                  Tu web puede tener tráfico, pero no estar generando oportunidades reales
                </h2>
              </div>
              <div className="grid gap-4 text-lg leading-8 text-slate-300">
                <p>
                  Muchas empresas publican contenidos, cambian títulos o contratan enlaces sin una estrategia clara.
                  El resultado suele ser el mismo: keywords que no convierten, páginas que compiten entre sí y una web
                  que Google no entiende bien.
                </p>
                <p>
                  Como agencia SEO para empresas, priorizamos lo que conecta posicionamiento web con conversaciones
                  comerciales: intención, arquitectura, medición y páginas preparadas para convertir.
                </p>
              </div>
            </div>
          </section>

          <section id="servicio" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="solution-title">
            <div className="max-w-3xl">
              <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">La solución</p>
              <h2 id="solution-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                SEO pensado como sistema, no como lista de tareas
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-300">
                Un buen plan SEO ordena técnica, contenido y conversión para que cada mejora tenga una función en la captación.
              </p>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {systemBlocks.map((block) => (
                <article className="flex h-full flex-col rounded-lg bg-white/5 p-6 ring-1 ring-white/10" key={block.title}>
                  <span className="grid h-12 w-12 place-items-center rounded-lg bg-blue-500/10 text-blue-300 ring-1 ring-blue-400/20">
                    <block.icon className="h-6 w-6" aria-hidden="true" strokeWidth={1.8} />
                  </span>
                  <h3 className="!mt-7 text-xl font-black text-slate-900">{block.title}</h3>
                  <p className="mt-3 text-sm leading-[1.65] text-slate-300">{block.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="bg-slate-900 px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="includes-title">
            <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.82fr_1.18fr]">
              <div>
                <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Qué incluye</p>
                <h2 id="includes-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                  Qué hacemos como agencia SEO
                </h2>
                <p className="mt-5 text-lg leading-8 text-slate-300">
                  Combinamos servicios SEO, consultoría SEO y ejecución técnica para que el plan avance sin convertirse
                  en un informe que nadie implementa.
                </p>
                <Link className="mt-6 inline-flex min-h-12 items-center justify-center rounded-lg border border-slate-700 px-6 py-3 font-bold text-slate-100 hover:bg-slate-900 focus-visible:ring-2 focus-visible:ring-blue-400" href="/agencia-marketing-digital/seo-tecnico-arquitectura-entidades">
                  Ver SEO técnico y arquitectura
                </Link>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {serviceItems.map((item) => (
                  <p className="flex gap-3 rounded-lg bg-slate-950 p-5 text-base font-semibold leading-7 text-slate-300 ring-1 ring-slate-800" key={item}>
                    <CheckIcon />
                    <span>{item}</span>
                  </p>
                ))}
              </div>
            </div>
          </section>

          <section id="proceso" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="process-title">
            <div className="max-w-3xl">
              <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Proceso</p>
              <h2 id="process-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                Cómo trabajamos el SEO
              </h2>
            </div>
            <div className="mt-10 grid gap-4">
              {process.map((step) => (
                <article className="grid gap-4 rounded-lg bg-white/5 p-6 ring-1 ring-white/10 sm:grid-cols-[4rem_1fr]" key={step.step}>
                  <span className="text-3xl font-black text-blue-400">{step.step}</span>
                  <div>
                    <h3 className="text-xl font-black text-slate-900">{step.title}</h3>
                    <p className="mt-2 leading-7 text-slate-300">{step.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="border-y border-slate-800 bg-slate-900 px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="audience-title">
            <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.82fr_1.18fr]">
              <div>
                <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Para quién es</p>
                <h2 id="audience-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                  SEO para pymes, startups y empresas que necesitan leads cualificados
                </h2>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {audiences.map((item) => (
                  <article className="rounded-lg bg-slate-950 p-6 ring-1 ring-slate-800" key={item}>
                    <FileSearch className="mb-5 h-6 w-6 text-blue-300" aria-hidden="true" strokeWidth={1.8} />
                    <p className="text-base font-bold leading-7 text-slate-200">{item}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="related-seo-title">
            <div className="max-w-3xl">
              <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Recursos SEO</p>
              <h2 id="related-seo-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                Enfoques SEO según el punto de partida de tu empresa
              </h2>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {relatedSeoLinks.map((item) => (
                <Link className="rounded-lg bg-white/5 p-6 ring-1 ring-white/10 hover:bg-slate-900" href={item.href} key={item.href}>
                  <h3 className="text-xl font-black text-slate-900">{item.title}</h3>
                  <p className="mt-3 text-sm leading-[1.65] text-slate-300">{item.text}</p>
                </Link>
              ))}
            </div>
          </section>

          <section id="seo-local" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="local-title">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">SEO local</p>
                <h2 id="local-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                  También trabajamos SEO local por ciudad
                </h2>
                <p className="mt-5 text-lg leading-8 text-slate-300">
                  Si tu negocio vende en una zona concreta, podemos trabajar páginas locales, búsquedas por ciudad y
                  señales de confianza para captar clientes en mercados como Madrid, Barcelona, Valencia, Sevilla,
                  Alicante o Málaga.
                </p>
              </div>
              <div className="grid content-start gap-4 sm:grid-cols-2">
                {cityLinks.map((city) => (
                  <Link className="flex min-h-20 items-center gap-4 rounded-lg bg-white/5 p-5 font-black text-slate-100 ring-1 ring-white/10 hover:bg-slate-900" href={city.href} key={city.href}>
                    <MapPin className="h-5 w-5 flex-none text-blue-300" aria-hidden="true" strokeWidth={1.8} />
                    <span>{city.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section className="bg-slate-900 px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="difference-title">
            <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.86fr_1.14fr]">
              <div>
                <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Diferenciación</p>
                <h2 id="difference-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                  No buscamos tráfico sin más
                </h2>
                <p className="mt-5 text-lg leading-8 text-slate-300">
                  Priorizamos las búsquedas que pueden acabar en contacto comercial: servicios, problemas,
                  comparativas, búsquedas locales y páginas de decisión. El SEO tiene que ayudar a vender mejor, no solo
                  llenar informes.
                </p>
              </div>
              <div className="grid gap-5 md:grid-cols-3">
                {[
                  { icon: Search, label: "Demanda real", text: "Keywords conectadas con dudas, servicios y decisiones de compra." },
                  { icon: ClipboardList, label: "Prioridades claras", text: "Cada recomendación sale con impacto, esfuerzo y siguiente paso." },
                  { icon: LineChart, label: "Negocio medido", text: "Rankings y tráfico importan cuando explican leads y oportunidades." },
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

          <section id="faq" className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="faq-title">
            <div className="max-w-3xl">
              <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">FAQ</p>
              <h2 id="faq-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                Preguntas frecuentes sobre SEO para empresas
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

          <section id="auditoria-seo" className="border-t border-slate-800 bg-slate-900 px-4 py-16 pb-28 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="cta-title">
            <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
              <div>
                <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Auditoría gratuita</p>
                <h2 id="cta-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                  Empieza con una auditoría SEO clara
                </h2>
                <p className="mt-5 text-lg leading-8 text-slate-300">
                  Revisamos tu web, detectamos oportunidades reales y te damos una hoja de ruta priorizada para mejorar
                  visibilidad, captación y conversión.
                </p>
                <div className="mt-8 grid gap-3">
                  {["Revisión de indexación y SEO técnico", "Mapa de keywords con intención comercial", "Prioridades para los próximos 90 días"].map((item) => (
                    <p className="flex gap-3 text-slate-200" key={item}>
                      <CheckIcon />
                      <span>{item}</span>
                    </p>
                  ))}
                </div>
              </div>
              <SeoAuditForm />
            </div>
          </section>
        </main>

        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-800 bg-slate-950/95 p-3 backdrop-blur md:hidden">
          <a className="mx-auto flex min-h-12 max-w-md items-center justify-center rounded-lg bg-blue-600 px-5 py-3 font-black text-white shadow-lg shadow-blue-950/40" href="#auditoria-seo">
            Solicitar auditoría SEO gratuita
          </a>
        </div>
      </div>
    </>
  );
}
