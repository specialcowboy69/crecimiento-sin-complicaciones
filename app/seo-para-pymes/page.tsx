import type { Metadata } from "next";
import Link from "next/link";
import {
  BarChart3,
  CheckCircle2,
  ClipboardList,
  FileSearch,
  Gauge,
  GitBranch,
  MapPin,
  Megaphone,
  Search,
  Target,
  Wrench,
} from "lucide-react";
import { LandingServicesMenu } from "../components/LandingServicesMenu";
import { Logo } from "../components/Logo";
import { SeoAuditForm } from "../components/SeoAuditForm";

const includes = [
  {
    icon: FileSearch,
    title: "Auditoría SEO inicial",
    text: "Revisamos tu punto de partida y separamos problemas críticos de mejoras secundarias.",
  },
  {
    icon: Wrench,
    title: "Revisión técnica",
    text: "Indexación, velocidad, estructura, errores y bloqueos que pueden frenar el posicionamiento web para pymes.",
  },
  {
    icon: Target,
    title: "Keyword research de negocio",
    text: "Elegimos búsquedas con intención comercial, no términos que solo llenan informes de tráfico.",
  },
  {
    icon: Search,
    title: "Optimización de páginas clave",
    text: "Mejoramos servicios, categorías y landings para responder a búsquedas que pueden traer contactos.",
  },
  {
    icon: ClipboardList,
    title: "Contenido para demanda real",
    text: "Creamos páginas y respuestas útiles para clientes que ya están comparando opciones.",
  },
  {
    icon: GitBranch,
    title: "Enlazado interno",
    text: "Conectamos servicios, ciudades y preguntas para reforzar las páginas con mayor potencial comercial.",
  },
  {
    icon: BarChart3,
    title: "Medición de leads",
    text: "Seguimos formularios, llamadas y solicitudes, no solo posiciones aisladas.",
  },
];

const audiences = [
  "Tienes web, pero no llegan contactos.",
  "Dependías de recomendaciones y quieres captar desde Google.",
  "Inviertes en Ads, pero quieres reducir dependencia.",
  "Tu web habla de servicios, pero no posiciona por búsquedas comerciales.",
  "Quieres SEO local en tu ciudad o provincia.",
];

const method = [
  {
    step: "01",
    title: "Revisamos tu web y detectamos bloqueos",
    text: "Analizamos técnica, contenidos, arquitectura, conversión y señales básicas de confianza.",
  },
  {
    step: "02",
    title: "Creamos un mapa de keywords por intención",
    text: "Ordenamos búsquedas informativas, locales y comerciales para saber qué URL debe responder a cada demanda.",
  },
  {
    step: "03",
    title: "Priorizamos páginas con potencial de captación",
    text: "Nos centramos primero en servicios, ciudades y problemas que pueden convertirse en contactos reales.",
  },
  {
    step: "04",
    title: "Mejoramos contenido, estructura y enlazado interno",
    text: "Ajustamos títulos, copy, secciones, enlaces y señales técnicas para que cada página tenga una función clara.",
  },
  {
    step: "05",
    title: "Medimos tráfico, leads y siguientes acciones",
    text: "Convertimos datos de Search Console, analítica y formularios en una lista de prioridades accionables.",
  },
];

const comparisonRows = [
  {
    label: "Objetivo",
    generic: "Tráfico amplio y rankings generales.",
    pyme: "Contactos, llamadas y solicitudes de presupuesto.",
  },
  {
    label: "Prioridad",
    generic: "Muchas tareas sueltas a la vez.",
    pyme: "Acciones claras según impacto, esfuerzo y urgencia.",
  },
  {
    label: "Páginas",
    generic: "Blog y contenidos informativos sin ruta comercial.",
    pyme: "Páginas de servicios, zonas, problemas y decisión.",
  },
  {
    label: "Medición",
    generic: "Informes largos de posiciones y sesiones.",
    pyme: "Leads, conversiones, visibilidad local y oportunidades.",
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
    question: "¿Cuánto tarda el SEO para una pyme?",
    answer:
      "Depende de la competencia, autoridad del dominio, estado técnico y velocidad de implementación. Normalmente las primeras señales aparecen en 6-10 semanas y el impacto se consolida entre 3 y 6 meses.",
  },
  {
    question: "¿Qué incluye una auditoría SEO?",
    answer:
      "Incluye revisión técnica, indexación, velocidad, arquitectura, contenidos, intención de búsqueda, oportunidades comerciales y una hoja de ruta priorizada.",
  },
  {
    question: "¿Es mejor SEO o Google Ads para una pyme?",
    answer:
      "Google Ads puede acelerar captación y aprendizaje a corto plazo. El SEO construye visibilidad orgánica más estable. En muchas pymes conviene combinar ambos según presupuesto, urgencia y margen comercial.",
  },
  {
    question: "¿Tiene sentido hacer SEO local?",
    answer:
      "Sí, especialmente si vendes en una ciudad, provincia o zona concreta. El SEO local para pymes ayuda a conectar servicios, ubicación e intención de compra.",
  },
  {
    question: "¿Necesito publicar artículos todas las semanas?",
    answer:
      "No necesariamente. Antes de publicar por volumen, conviene asegurar que las páginas comerciales, la estructura y el enlazado interno están bien planteados.",
  },
  {
    question: "¿Podéis trabajar sobre mi web actual?",
    answer:
      "Sí. Muchas veces podemos mejorar SEO técnico, contenidos y arquitectura sobre la web actual. Si la web bloquea conversión o rendimiento, proponemos mejoras más estructurales.",
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
        name: "SEO para pymes",
        item: "https://www.crecimientosincomplicaciones.com/seo-para-pymes",
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "SEO para pymes",
    serviceType: ["SEO para pymes", "Consultoría SEO para pymes", "SEO local para pymes"],
    provider: {
      "@type": "Organization",
      name: "Crecimiento sin complicaciones",
      url: "https://www.crecimientosincomplicaciones.com",
    },
    areaServed: "ES",
    description:
      "Servicios SEO para pymes con auditoría SEO gratuita, SEO técnico, estrategia de keywords, contenido y posicionamiento local orientado a captar clientes.",
    makesOffer: {
      "@type": "Offer",
      name: "Auditoría SEO gratuita para pymes",
      availability: "https://schema.org/InStock",
      url: "https://www.crecimientosincomplicaciones.com/seo-para-pymes",
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
  title: "SEO para pymes | Agencia SEO para empresas pequeñas",
  description:
    "SEO para pymes orientado a captar clientes. Auditoría SEO gratuita, estrategia de keywords, SEO técnico, contenido y posicionamiento local para empresas.",
  keywords: [
    "seo para pymes",
    "agencia seo para pymes",
    "servicios seo para pymes",
    "posicionamiento web para pymes",
    "consultoría seo para pymes",
    "seo local para pymes",
  ],
  alternates: {
    canonical: "/seo-para-pymes",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "SEO para pymes que necesitan más clientes",
    description:
      "Auditoría SEO, keywords comerciales, SEO técnico y posicionamiento local para convertir Google en un canal de captación.",
    url: "/seo-para-pymes",
    siteName: "Crecimiento sin complicaciones",
    locale: "es_ES",
    type: "website",
  },
};

function CheckIcon() {
  return <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-blue-400" aria-hidden="true" strokeWidth={2} />;
}

export default function SeoForPymesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <div className="seo-pymes-page landing-light min-h-screen bg-slate-950 text-slate-50">
        <header className="sticky top-0 z-20 border-b border-slate-800 bg-slate-950/95 backdrop-blur">
          <nav className="mx-auto flex min-h-[72px] max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8" aria-label="Navegación principal">
            <Link className="logo-link text-slate-50" href="/" aria-label="Crecimiento sin complicaciones, inicio">
              <Logo variant="light" />
            </Link>
            <div className="hidden items-center gap-2 text-sm font-semibold text-slate-300 lg:flex">
              <a className="rounded-md px-3 py-2 hover:bg-slate-900 hover:text-white" href="#incluye">Incluye</a>
              <a className="rounded-md px-3 py-2 hover:bg-slate-900 hover:text-white" href="#metodo">Método</a>
              <a className="rounded-md px-3 py-2 hover:bg-slate-900 hover:text-white" href="#comparativa">Comparativa</a>
              <a className="rounded-md px-3 py-2 hover:bg-slate-900 hover:text-white" href="#faq">FAQ</a>
            </div>
            <div className="mobile-header-links" aria-label="Enlaces rápidos">
              <a href="#incluye">Incluye</a>
              <a href="#metodo">Método</a>
            </div>
            <div className="flex items-center gap-3">
              <LandingServicesMenu currentPath="/seo-para-pymes" />
              <a className="landing-top-cta inline-flex min-h-11 shrink-0 items-center justify-center rounded-lg bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-blue-950/30 hover:bg-blue-500 focus-visible:ring-2 focus-visible:ring-blue-400" href="#auditoria-pymes">
                <span className="hidden sm:inline">Auditoría gratuita</span>
                <span className="sm:hidden">Auditoría</span>
              </a>
            </div>
          </nav>
        </header>

        <main>
          <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_0.95fr] lg:px-8 lg:py-24" aria-labelledby="hero-title">
            <div>
              <nav className="mb-5 flex items-center gap-2 text-sm font-bold text-slate-400" aria-label="Migas de pan">
                <Link className="hover:text-blue-300" href="/">Inicio</Link>
                <span aria-hidden="true">/</span>
                <Link className="hover:text-blue-300" href="/seo">SEO</Link>
                <span aria-hidden="true">/</span>
                <span>Pymes</span>
              </nav>
              <p className="mb-4 text-sm font-black uppercase tracking-normal text-blue-400">
                SEO PARA PYMES
              </p>
              <h1 id="hero-title" className="mb-6 max-w-4xl text-4xl font-black leading-[1.02] text-slate-900 sm:text-5xl lg:text-6xl">
                SEO para pymes que necesitan más clientes, no más informes
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-200">
                Te ayudamos a convertir tu web en un canal de captación: revisamos la parte técnica, ordenamos tus
                páginas, elegimos keywords con intención comercial y priorizamos acciones que puedan traer contactos reales.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a className="inline-flex min-h-12 items-center justify-center rounded-lg bg-blue-600 px-6 py-3 font-bold text-white shadow-xl shadow-blue-950/40 hover:bg-blue-500 focus-visible:ring-2 focus-visible:ring-blue-400" href="#auditoria-pymes">
                  Solicitar auditoría SEO gratuita
                </a>
                <Link className="inline-flex min-h-12 items-center justify-center rounded-lg border border-slate-700 px-6 py-3 font-bold text-slate-100 hover:bg-slate-900 focus-visible:ring-2 focus-visible:ring-blue-400" href="/seo">
                  Ver servicios SEO
                </Link>
              </div>
              <dl className="mt-10 grid gap-3 sm:grid-cols-3">
                {[
                  ["Prioridad", "Qué hacer primero"],
                  ["Foco", "Leads y llamadas"],
                  ["Alcance", "SEO técnico, local y contenido"],
                ].map(([label, value]) => (
                  <div className="rounded-lg bg-white/5 p-5 ring-1 ring-white/10" key={label}>
                    <dt className="text-sm font-black uppercase text-blue-300">{label}</dt>
                    <dd className="mt-2 text-base font-bold leading-6 text-slate-100">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="seo-audit-panel rounded-lg bg-slate-900 p-6 shadow-2xl shadow-blue-950/30 ring-1 ring-slate-800" aria-label="Panel de prioridades SEO para pymes">
              <div className="seo-audit-panel-head mb-7 flex items-center justify-between gap-4 pb-5">
                <div className="seo-audit-panel-title">
                  <p className="text-sm font-black uppercase tracking-normal text-blue-400">Mapa de prioridades</p>
                  <strong className="mt-2 block text-2xl font-black text-white">Próximos 90 días</strong>
                </div>
                <Gauge className="seo-audit-panel-badge h-8 w-8 text-blue-300" aria-hidden="true" strokeWidth={1.8} />
              </div>
              <div className="seo-audit-step-grid grid gap-4">
                {[
                  ["01", "Arreglar bloqueos técnicos", "Indexación, errores, velocidad y estructura básica."],
                  ["02", "Ordenar páginas comerciales", "Servicios, zonas y ofertas con intención de compra."],
                  ["03", "Publicar con criterio", "Contenidos que resuelven dudas antes del contacto."],
                  ["04", "Medir oportunidades", "Tráfico, formularios, llamadas y siguientes acciones."],
                ].map(([step, title, text]) => (
                  <article className="seo-audit-step grid gap-4 rounded-lg bg-slate-950 p-5 ring-1 ring-slate-800 sm:grid-cols-[3rem_1fr]" key={step}>
                    <span className="text-2xl font-black text-blue-300">{step}</span>
                    <div>
                      <h3 className="m-0 text-lg font-black text-white">{title}</h3>
                      <p className="mt-2 text-sm leading-[1.6] text-slate-300">{text}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="border-y border-slate-800 bg-slate-900 px-4 py-16 sm:px-6 lg:px-8" aria-labelledby="pain-title">
            <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.86fr_1.14fr]">
              <div>
                <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">El problema</p>
                <h2 id="pain-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                  El problema no es “hacer SEO”, es saber qué hacer primero
                </h2>
              </div>
              <p className="text-lg leading-8 text-slate-300 lg:pt-10">
                Muchas pymes publican artículos, cambian textos o pagan campañas sin saber si su web está preparada
                para posicionar. A veces falta estructura, otras veces las páginas no responden a búsquedas reales, y
                otras el tráfico llega pero no convierte en formularios, llamadas o presupuestos.
              </p>
            </div>
          </section>

          <section id="incluye" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="includes-title">
            <div className="max-w-3xl">
              <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Qué hacemos</p>
              <h2 id="includes-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                Qué incluye nuestro SEO para pymes
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-300">
                Servicios SEO para pymes, consultoría SEO para pymes y ejecución práctica para avanzar sin ruido.
              </p>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {includes.map((item) => (
                <article className="rounded-lg bg-white/5 p-6 ring-1 ring-white/10" key={item.title}>
                  <span className="grid h-12 w-12 place-items-center rounded-lg bg-blue-500/10 text-blue-300 ring-1 ring-blue-400/20">
                    <item.icon className="h-6 w-6" aria-hidden="true" strokeWidth={1.8} />
                  </span>
                  <h3 className="!mt-7 text-xl font-black text-slate-900">{item.title}</h3>
                  <p className="mt-3 text-sm leading-[1.65] text-slate-300">{item.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="bg-slate-900 px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="audience-title">
            <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.82fr_1.18fr]">
              <div>
                <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Para quién es</p>
                <h2 id="audience-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                  Para pymes que quieren crecer con una base clara
                </h2>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {audiences.map((item) => (
                  <p className="flex gap-3 rounded-lg bg-slate-950 p-5 text-base font-semibold leading-7 text-slate-300 ring-1 ring-slate-800" key={item}>
                    <CheckIcon />
                    <span>{item}</span>
                  </p>
                ))}
              </div>
            </div>
          </section>

          <section id="metodo" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="method-title">
            <div className="max-w-3xl">
              <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Método</p>
              <h2 id="method-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                Cómo trabajamos el posicionamiento SEO para pymes
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-300">
                Este proceso forma parte de nuestro{" "}
                <Link className="font-black text-blue-600 hover:text-blue-700" href="/seo">
                  servicio de agencia SEO
                </Link>
                , adaptado a empresas pequeñas que necesitan priorizar bien recursos y tiempos.
              </p>
            </div>
            <div className="mt-10 grid gap-4">
              {method.map((step) => (
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

          <section id="comparativa" className="border-y border-slate-800 bg-slate-900 px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="comparison-title">
            <div className="mx-auto max-w-7xl">
              <div className="max-w-3xl">
                <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Comparativa</p>
                <h2 id="comparison-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                  SEO para pymes frente a SEO genérico
                </h2>
              </div>
              <div className="mt-10 grid gap-4 md:hidden">
                {comparisonRows.map((row) => (
                  <article className="rounded-lg bg-white p-5 shadow-[0_14px_36px_rgba(15,23,42,0.08)] ring-1 ring-slate-200" key={row.label}>
                    <h3 className="text-lg font-black text-slate-900">{row.label}</h3>
                    <div className="mt-4 grid gap-3">
                      <div>
                        <p className="text-xs font-black uppercase text-slate-500">SEO genérico</p>
                        <p className="mt-1 text-sm leading-6 text-slate-600">{row.generic}</p>
                      </div>
                      <div className="rounded-lg bg-blue-50 p-4">
                        <p className="text-xs font-black uppercase text-blue-700">SEO para pymes</p>
                        <p className="mt-1 text-sm font-bold leading-6 text-slate-700">{row.pyme}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
              <div className="mt-10 hidden overflow-x-auto rounded-lg bg-white shadow-[0_14px_36px_rgba(15,23,42,0.08)] ring-1 ring-slate-200 md:block">
                <table className="w-full min-w-[760px] border-collapse text-left">
                  <caption className="sr-only">Comparativa entre SEO genérico y SEO para pymes</caption>
                  <thead>
                    <tr>
                      <th className="border-b border-slate-200 bg-slate-50 p-5 text-sm font-black text-slate-900">Criterio</th>
                      <th className="border-b border-slate-200 bg-slate-50 p-5 text-sm font-black text-slate-900">SEO genérico</th>
                      <th className="border-b border-slate-200 bg-blue-50 p-5 text-sm font-black text-slate-900">SEO para pymes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonRows.map((row) => (
                      <tr key={row.label}>
                        <th className="border-b border-slate-200 p-5 text-sm font-black text-slate-900">{row.label}</th>
                        <td className="border-b border-slate-200 p-5 text-sm leading-6 text-slate-600">{row.generic}</td>
                        <td className="border-b border-slate-200 bg-blue-50/50 p-5 text-sm font-bold leading-6 text-slate-700">{row.pyme}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section id="seo-local" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="local-title">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">SEO local</p>
                <h2 id="local-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                  SEO local para pymes que venden en una zona concreta
                </h2>
                <p className="mt-5 text-lg leading-8 text-slate-300">
                  Si tus clientes están en una ciudad o provincia concreta, trabajamos una{" "}
                  <Link className="font-black text-blue-600 hover:text-blue-700" href="/seo/local">
                    estrategia de SEO local
                  </Link>{" "}
                  con páginas, búsquedas por servicio, Perfil de Empresa y señales de confianza para que Google entienda dónde y para quién eres relevante.
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

          <section className="bg-slate-900 px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="ads-title">
            <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.86fr_1.14fr]">
              <div>
                <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">SEO o Ads</p>
                <h2 id="ads-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                  ¿SEO, Google Ads o mejorar primero la web?
                </h2>
                <p className="mt-5 text-lg leading-8 text-slate-300">
                  Si necesitas contactos ya, las campañas pueden acelerar aprendizaje. Si tu web no convierte, conviene
                  reforzar mensaje, velocidad y formularios. La auditoría ayuda a elegir la siguiente acción.
                </p>
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                <Link className="rounded-lg bg-slate-950 p-6 ring-1 ring-slate-800 hover:bg-white/5" href="/agencia-marketing-digital/google-ads">
                  <Megaphone className="h-7 w-7 text-blue-300" aria-hidden="true" strokeWidth={1.8} />
                  <h3 className="!mt-7 text-xl font-black text-slate-900">Google Ads para empresas</h3>
                  <p className="mt-3 text-sm leading-[1.65] text-slate-300">Campañas para captar antes y aprender qué mensajes convierten.</p>
                </Link>
                <Link className="rounded-lg bg-slate-950 p-6 ring-1 ring-slate-800 hover:bg-white/5" href="/diseno-pagina-web-profesional">
                  <Gauge className="h-7 w-7 text-blue-300" aria-hidden="true" strokeWidth={1.8} />
                  <h3 className="!mt-7 text-xl font-black text-slate-900">Diseño web profesional</h3>
                  <p className="mt-3 text-sm leading-[1.65] text-slate-300">Webs más claras, rápidas y preparadas para convertir visitas en contactos.</p>
                </Link>
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="middle-cta-title">
            <div className="rounded-lg bg-blue-600 p-8 text-white shadow-2xl shadow-blue-950/30 lg:grid lg:grid-cols-[1fr_auto] lg:items-center lg:gap-8">
              <div>
                <h2 id="middle-cta-title" className="text-3xl font-black text-white sm:text-4xl">
                  ¿Quieres saber qué está frenando tu SEO?
                </h2>
                <p className="mt-4 max-w-3xl text-lg leading-8 text-blue-50">
                  Te preparamos una revisión inicial con oportunidades técnicas, páginas prioritarias y próximos pasos.
                </p>
              </div>
              <a className="mt-6 inline-flex min-h-12 items-center justify-center rounded-lg bg-white px-6 py-3 font-black text-blue-700 hover:bg-blue-50 lg:mt-0" href="#auditoria-pymes">
                Solicitar auditoría SEO gratuita
              </a>
            </div>
          </section>

          <section id="faq" className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="faq-title">
            <div className="max-w-3xl">
              <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">FAQ</p>
              <h2 id="faq-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                Preguntas frecuentes sobre SEO para pymes
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

          <section id="auditoria-pymes" className="border-t border-slate-800 bg-slate-900 px-4 py-16 pb-28 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="final-cta-title">
            <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
              <div>
                <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Auditoría gratuita</p>
                <h2 id="final-cta-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                  Empieza con una hoja de ruta SEO clara
                </h2>
                <p className="mt-5 text-lg leading-8 text-slate-300">
                  Analizamos tu web, tus servicios y tus oportunidades de búsqueda para decirte qué páginas, mejoras y
                  acciones tienen más sentido ahora.
                </p>
                <div className="mt-8 grid gap-3">
                  {["Bloqueos técnicos y de indexación", "Keywords con intención comercial", "Prioridades para captar más contactos"].map((item) => (
                    <p className="flex gap-3 text-slate-200" key={item}>
                      <CheckIcon />
                      <span>{item}</span>
                    </p>
                  ))}
                </div>
              </div>
              <SeoAuditForm sourcePage="SEO para pymes" defaultService="SEO para pymes" />
            </div>
          </section>
        </main>

        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-800 bg-slate-950/95 p-3 backdrop-blur md:hidden">
          <a className="mx-auto flex min-h-12 max-w-md items-center justify-center rounded-lg bg-blue-600 px-5 py-3 font-black text-white shadow-lg shadow-blue-950/40" href="#auditoria-pymes">
            Quiero mi auditoría gratuita
          </a>
        </div>
      </div>
    </>
  );
}
