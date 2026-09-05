import type { Metadata } from "next";
import Link from "next/link";
import {
  BarChart3,
  CheckCircle2,
  FileText,
  FormInput,
  GitBranch,
  LineChart,
  MonitorSmartphone,
  MousePointerClick,
  Search,
} from "lucide-react";
import { LandingServicesMenu } from "../../components/LandingServicesMenu";
import { Logo } from "../../components/Logo";
import { WebProjectForm } from "../../components/WebProjectForm";

const focusCards = [
  {
    icon: GitBranch,
    title: "Claridad comercial",
    text: "Estructura de páginas, mensajes y servicios para que el usuario entienda rápido por qué elegirte.",
  },
  {
    icon: MousePointerClick,
    title: "Captación",
    text: "CTAs, formularios y llamadas a la acción colocados donde tienen sentido dentro del recorrido.",
  },
  {
    icon: Search,
    title: "SEO inicial",
    text: "Títulos, estructura, velocidad, indexación y base técnica para empezar a posicionar.",
  },
  {
    icon: BarChart3,
    title: "Medición",
    text: "Eventos, formularios y analítica para saber qué páginas generan contactos reales.",
  },
];

const companyTypes = [
  "Empresas de servicios profesionales que dependen de llamadas o formularios.",
  "Clínicas, centros de formación, asesorías, despachos y negocios locales.",
  "Empresas B2B que necesitan explicar servicios complejos de forma simple.",
  "Negocios que ya invierten en Ads y necesitan mejorar la conversión de la web.",
  "Marcas que quieren renovar una web antigua sin perder enfoque SEO.",
];

const includes = [
  {
    icon: GitBranch,
    title: "Arquitectura",
    text: "Definimos páginas, jerarquía y recorrido del usuario para que cada sección tenga una función clara.",
  },
  {
    icon: FileText,
    title: "Copy",
    text: "Redactamos mensajes claros orientados a captar clientes, resolver dudas y explicar la oferta.",
  },
  {
    icon: MonitorSmartphone,
    title: "Diseño responsive",
    text: "Experiencia cuidada en móvil, tablet y escritorio para evitar fricción antes del contacto.",
  },
  {
    icon: Search,
    title: "SEO on-page",
    text: "Estructura de headings, metadata, enlazado interno, rendimiento y preparación para indexación.",
  },
  {
    icon: FormInput,
    title: "Conversión",
    text: "CTAs, formularios y secciones de confianza colocadas donde ayudan a avanzar.",
  },
  {
    icon: BarChart3,
    title: "Analítica",
    text: "Medición básica para entender qué páginas, formularios y eventos generan oportunidades.",
  },
];

const process = [
  {
    step: "01",
    title: "Auditoría inicial",
    text: "Revisamos tu web actual, tu oferta, tus competidores y los puntos que frenan la conversión.",
  },
  {
    step: "02",
    title: "Estructura y mensajes",
    text: "Ordenamos servicios, secciones, CTAs y contenido antes de diseñar.",
  },
  {
    step: "03",
    title: "Diseño y desarrollo",
    text: "Creamos una web clara, rápida y coherente con tu marca.",
  },
  {
    step: "04",
    title: "SEO y medición",
    text: "Dejamos la base técnica preparada para indexar, medir contactos y mejorar.",
  },
];

const faqs = [
  {
    question: "¿Trabajáis solo con empresas de Valencia?",
    answer:
      "No. Podemos trabajar con empresas de Valencia y de otras ciudades. En esta página nos centramos en negocios que venden o quieren captar clientes en Valencia, pero el proceso puede hacerse de forma remota.",
  },
  {
    question: "¿Puedo rediseñar mi web actual sin empezar de cero?",
    answer:
      "Sí. Primero revisamos si la web actual puede aprovecharse: estructura, contenidos, SEO, velocidad y tecnología. Si tiene una buena base, se puede rediseñar y mejorar sin rehacerlo todo.",
  },
  {
    question: "¿La web incluye SEO?",
    answer:
      "Incluye una base SEO inicial: estructura de headings, metadata, arquitectura, velocidad, enlazado interno y preparación para indexación. Si quieres competir fuerte en Google, después conviene trabajar una estrategia SEO continua.",
  },
  {
    question: "¿Qué diferencia hay entre una web bonita y una web orientada a captar clientes?",
    answer:
      "Una web bonita cuida la estética. Una web orientada a captación también cuida el mensaje, la estructura, los formularios, los CTAs, la confianza y la medición. El objetivo no es solo gustar, sino generar conversaciones comerciales.",
  },
  {
    question: "¿Cuánto tarda una web para empresa?",
    answer:
      "Depende del tamaño, contenidos y funcionalidades. Una web corporativa sencilla puede avanzar rápido si la oferta está clara. Si hay varias áreas de servicio, SEO local o integraciones, conviene planificarlo por fases.",
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
        name: "Diseño web profesional",
        item: "https://www.crecimientosincomplicaciones.com/diseno-pagina-web-profesional",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Diseño web Valencia",
        item: "https://www.crecimientosincomplicaciones.com/diseno-pagina-web-profesional/valencia",
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Diseño web en Valencia para empresas",
    serviceType: ["Diseño web Valencia", "Diseño web para empresas en Valencia", "Páginas web Valencia"],
    provider: {
      "@type": "Organization",
      name: "Crecimiento sin complicaciones",
      url: "https://www.crecimientosincomplicaciones.com",
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Valencia",
    },
    description:
      "Diseño web para empresas de Valencia que necesitan una página clara, rápida y preparada para captar clientes con estrategia, SEO inicial, formularios y conversión.",
    makesOffer: {
      "@type": "Offer",
      name: "Auditoría gratuita de diseño web para empresas de Valencia",
      availability: "https://schema.org/InStock",
      url: "https://www.crecimientosincomplicaciones.com/diseno-pagina-web-profesional/valencia",
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
  title: "Diseño web en Valencia para empresas | Crecimiento sin complicaciones",
  description:
    "Diseño web para empresas de Valencia que necesitan una página clara, rápida y preparada para captar clientes. Estrategia, SEO inicial, formularios y conversión.",
  keywords: [
    "diseño web valencia",
    "diseño web en Valencia",
    "diseño web para empresas en Valencia",
    "páginas web Valencia",
    "diseño web profesional Valencia",
  ],
  alternates: {
    canonical: "/diseno-pagina-web-profesional/valencia",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Diseño web en Valencia para empresas",
    description:
      "Páginas web claras, rápidas y orientadas a conversión para empresas de Valencia que quieren captar clientes.",
    url: "/diseno-pagina-web-profesional/valencia",
    siteName: "Crecimiento sin complicaciones",
    locale: "es_ES",
    type: "website",
  },
};

function CheckIcon() {
  return <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-blue-400" aria-hidden="true" strokeWidth={2} />;
}

export default function WebDesignValenciaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <div className="web-design-valencia-page landing-light min-h-screen bg-slate-950 text-slate-50">
        <header className="sticky top-0 z-20 border-b border-slate-800 bg-slate-950/95 backdrop-blur">
          <nav className="mx-auto flex min-h-[72px] max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8" aria-label="Navegación principal">
            <Link className="logo-link text-slate-50" href="/" aria-label="Crecimiento sin complicaciones, inicio">
              <Logo variant="light" />
            </Link>
            <div className="hidden items-center gap-2 text-sm font-semibold text-slate-300 md:flex">
              <a className="rounded-md px-3 py-2 hover:bg-slate-900 hover:text-white" href="#enfoque">Enfoque</a>
              <a className="rounded-md px-3 py-2 hover:bg-slate-900 hover:text-white" href="#incluye">Incluye</a>
              <a className="rounded-md px-3 py-2 hover:bg-slate-900 hover:text-white" href="#proceso">Proceso</a>
              <a className="rounded-md px-3 py-2 hover:bg-slate-900 hover:text-white" href="#faq">FAQ</a>
            </div>
            <div className="mobile-header-links" aria-label="Enlaces rápidos">
              <a href="#incluye">Incluye</a>
              <a href="#proceso">Proceso</a>
            </div>
            <div className="flex items-center gap-3">
              <LandingServicesMenu currentPath="/diseno-pagina-web-profesional/valencia" />
              <a className="landing-top-cta inline-flex min-h-11 shrink-0 items-center justify-center rounded-lg bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-blue-950/30 hover:bg-blue-500 focus-visible:ring-2 focus-visible:ring-blue-400" href="#auditoria-web-valencia">
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
                <Link className="hover:text-blue-300" href="/diseno-pagina-web-profesional">Diseño web</Link>
                <span aria-hidden="true">/</span>
                <span>Valencia</span>
              </nav>
              <p className="mb-4 text-sm font-black uppercase tracking-normal text-blue-400">
                DISEÑO WEB VALENCIA
              </p>
              <h1 id="hero-title" className="mb-6 max-w-4xl text-4xl font-black leading-[1.02] text-slate-900 sm:text-5xl lg:text-6xl">
                Diseño web para empresas de Valencia que quieren captar más clientes
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-200">
                Diseñamos páginas web claras, rápidas y orientadas a conversión para empresas de Valencia que necesitan
                explicar mejor su oferta, generar confianza y convertir visitas en contactos comerciales.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a className="inline-flex min-h-12 items-center justify-center rounded-lg bg-blue-600 px-6 py-3 font-bold text-white shadow-xl shadow-blue-950/40 hover:bg-blue-500 focus-visible:ring-2 focus-visible:ring-blue-400" href="#auditoria-web-valencia">
                  Solicitar auditoría gratuita
                </a>
                <Link className="inline-flex min-h-12 items-center justify-center rounded-lg border border-slate-700 px-6 py-3 font-bold text-slate-100 hover:bg-slate-900 focus-visible:ring-2 focus-visible:ring-blue-400" href="/diseno-pagina-web-profesional">
                  Ver diseño web profesional
                </Link>
              </div>
              <dl className="mt-10 grid gap-3 sm:grid-cols-3">
                {[
                  ["Mercado", "Pymes y servicios"],
                  ["Foco", "Confianza y conversión"],
                  ["Base", "SEO inicial y medición"],
                ].map(([label, value]) => (
                  <div className="rounded-lg bg-white/5 p-5 ring-1 ring-white/10" key={label}>
                    <dt className="text-sm font-black uppercase text-blue-300">{label}</dt>
                    <dd className="mt-2 text-base font-bold leading-6 text-slate-100">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="seo-audit-panel rounded-lg bg-slate-900 p-6 shadow-2xl shadow-blue-950/30 ring-1 ring-slate-800" aria-label="Sistema web para empresas de Valencia">
              <div className="seo-audit-panel-head mb-7 flex items-center justify-between gap-4 pb-5">
                <div className="seo-audit-panel-title">
                  <p className="text-sm font-black uppercase tracking-normal text-blue-400">Sistema web</p>
                  <strong className="mt-2 block text-2xl font-black text-white">Preparada para captar</strong>
                </div>
                <LineChart className="seo-audit-panel-badge h-8 w-8 text-blue-300" aria-hidden="true" strokeWidth={1.8} />
              </div>
              <div className="seo-audit-step-grid grid gap-4">
                {[
                  ["Mensaje claro", "Oferta, servicios y motivos para contactar."],
                  ["SEO inicial", "Estructura para que Google entienda la web."],
                  ["Formularios visibles", "Contacto sencillo en los puntos de decisión."],
                  ["Medición de leads", "Eventos y formularios conectados a negocio."],
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
            <div className="mx-auto max-w-5xl text-center">
              <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Problema local</p>
              <h2 id="problem-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                En Valencia no basta con tener una web correcta
              </h2>
              <div className="mx-auto mt-6 grid max-w-4xl gap-5 text-lg leading-8 text-slate-300">
                <p>
                  Muchas empresas de Valencia tienen una web que se ve bien, pero no ayuda lo suficiente a vender. El
                  usuario entra, no entiende rápido qué ofrece la empresa, no encuentra una razón clara para contactar o
                  termina comparando con otros proveedores antes de pedir presupuesto.
                </p>
                <p>
                  Una web profesional debe hacer tres cosas desde el primer minuto: explicar tu servicio, generar
                  confianza y facilitar el siguiente paso. Si falla una de esas piezas, el diseño se queda en escaparate.
                </p>
              </div>
            </div>
          </section>

          <section id="enfoque" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="focus-title">
            <div className="max-w-3xl">
              <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Enfoque</p>
              <h2 id="focus-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                Diseñamos webs pensadas para negocio, no solo para enseñar servicios
              </h2>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {focusCards.map((item) => (
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

          <section className="bg-slate-900 px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="types-title">
            <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.82fr_1.18fr]">
              <div>
                <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Para quién es</p>
                <h2 id="types-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                  Para qué empresas de Valencia tiene sentido
                </h2>
                <p className="mt-5 text-lg leading-8 text-slate-300">
                  Funciona especialmente bien cuando la web tiene que explicar servicios, generar confianza y convertir
                  visitas en formularios, llamadas o solicitudes de presupuesto.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {companyTypes.map((item) => (
                  <p className="flex gap-3 rounded-lg bg-slate-950 p-4 text-sm font-bold leading-6 text-slate-300 ring-1 ring-slate-800" key={item}>
                    <CheckIcon />
                    <span>{item}</span>
                  </p>
                ))}
              </div>
            </div>
          </section>

          <section id="incluye" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="includes-title">
            <div className="max-w-3xl">
              <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Qué incluye</p>
              <h2 id="includes-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                Qué trabajamos en una página web para empresas
              </h2>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {includes.map((item) => (
                <article className="rounded-lg bg-white/5 p-6 ring-1 ring-white/10" key={item.title}>
                  <item.icon className="h-7 w-7 text-blue-300" aria-hidden="true" strokeWidth={1.8} />
                  <h3 className="!mt-7 text-xl font-black text-slate-900">{item.title}</h3>
                  <p className="mt-3 text-sm leading-[1.65] text-slate-300">{item.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="border-y border-slate-800 bg-slate-900 px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="valencia-title">
            <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-center">
              <div>
                <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Diferenciación Valencia</p>
                <h2 id="valencia-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                  Una web adaptada al tipo de cliente que compite en Valencia
                </h2>
                <div className="mt-5 grid gap-5 text-lg leading-8 text-slate-300">
                  <p>
                    Valencia tiene un tejido fuerte de pymes, negocios locales, servicios profesionales y empresas que
                    compiten tanto por búsquedas locales como por clientes de otras zonas. Por eso no planteamos todas
                    las webs igual.
                  </p>
                  <p>
                    Una empresa local necesita visibilidad y confianza. Una empresa B2B necesita explicar bien su
                    propuesta. Un negocio que depende de campañas necesita páginas que conviertan. La web debe ajustarse
                    a cómo llegan tus clientes y a qué necesitan ver antes de contactar.
                  </p>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  ["Negocio local", "Confianza, ubicación, servicios y contacto claro."],
                  ["B2B", "Propuesta, autoridad y explicación sencilla de servicios complejos."],
                  ["Ads", "Landing y formularios que aprovechan mejor el tráfico pagado."],
                  ["SEO", "Arquitectura preparada para crecer con páginas de servicio y ciudad."],
                ].map(([title, text]) => (
                  <article className="rounded-lg bg-slate-950 p-5 ring-1 ring-slate-800" key={title}>
                    <h3 className="text-lg font-black text-slate-900">{title}</h3>
                    <p className="mt-2 text-sm leading-[1.65] text-slate-300">{text}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section id="proceso" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="process-title">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Proceso</p>
                <h2 id="process-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                  Cómo trabajamos el diseño web
                </h2>
              </div>
              <div className="grid gap-4">
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
            </div>
          </section>

          <section className="bg-slate-900 px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="compare-title">
            <div className="mx-auto rounded-lg bg-blue-600 p-8 text-white shadow-2xl shadow-blue-950/30 lg:grid lg:max-w-7xl lg:grid-cols-[1fr_auto] lg:items-center lg:gap-8">
              <div>
                <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-100">Si estás comparando opciones</p>
                <h2 id="compare-title" className="text-3xl font-black text-white sm:text-4xl">
                  Elige el siguiente paso según lo clara que tengas la web
                </h2>
                <p className="mt-4 max-w-3xl text-lg leading-8 text-blue-50">
                  Si todavía estás definiendo qué necesita tu empresa, puedes revisar nuestra guía de diseño web para
                  empresas. Si ya tienes claro que quieres renovar o crear una web profesional, ve directamente al
                  servicio completo.
                </p>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:mt-0 lg:min-w-[440px]">
                <Link className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/40 bg-white/10 px-6 py-3 font-black text-white hover:bg-white/15" href="/diseno-pagina-web-profesional/empresas">
                  Ver diseño web para empresas
                </Link>
                <Link className="inline-flex min-h-12 items-center justify-center rounded-lg bg-white px-6 py-3 font-black text-blue-700 hover:bg-blue-50" href="/diseno-pagina-web-profesional">
                  Ver diseño web profesional
                </Link>
              </div>
            </div>
          </section>

          <section id="faq" className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="faq-title">
            <div className="max-w-3xl">
              <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">FAQ</p>
              <h2 id="faq-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                Preguntas frecuentes sobre diseño web en Valencia
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

          <section id="auditoria-web-valencia" className="border-t border-slate-800 bg-slate-900 px-4 py-16 pb-28 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="final-cta-title">
            <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
              <div>
                <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Auditoría gratuita</p>
                <h2 id="final-cta-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                  ¿Tu web está ayudando a vender o solo está publicada?
                </h2>
                <p className="mt-5 text-lg leading-8 text-slate-300">
                  Podemos revisar tu web actual, detectar qué frena la captación y proponerte una hoja de ruta clara
                  para mejorar diseño, mensaje, SEO y conversión.
                </p>
                <div className="mt-8 grid gap-3">
                  {["Claridad de oferta y estructura de servicios", "SEO inicial, rendimiento y arquitectura", "Formularios, CTAs y medición de contactos"].map((item) => (
                    <p className="flex gap-3 text-slate-200" key={item}>
                      <CheckIcon />
                      <span>{item}</span>
                    </p>
                  ))}
                </div>
              </div>
              <WebProjectForm />
            </div>
          </section>
        </main>

        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-800 bg-slate-950/95 p-3 backdrop-blur md:hidden">
          <a className="mx-auto flex min-h-12 max-w-md items-center justify-center rounded-lg bg-blue-600 px-5 py-3 font-black text-white shadow-lg shadow-blue-950/40" href="#auditoria-web-valencia">
            Solicitar auditoría gratuita
          </a>
        </div>
      </div>
    </>
  );
}
