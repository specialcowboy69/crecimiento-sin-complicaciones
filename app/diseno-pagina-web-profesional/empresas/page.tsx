import type { Metadata } from "next";
import Link from "next/link";
import {
  BarChart3,
  CheckCircle2,
  FormInput,
  GitBranch,
  LayoutTemplate,
  LineChart,
  MonitorSmartphone,
  MousePointerClick,
  Search,
  Target,
} from "lucide-react";
import { LandingServicesMenu } from "../../components/LandingServicesMenu";
import { Logo } from "../../components/Logo";
import { WebProjectForm } from "../../components/WebProjectForm";

const solutionPoints = [
  {
    icon: GitBranch,
    title: "Arquitectura clara de servicios",
    text: "Ordenamos qué páginas necesita la empresa y qué debe explicar cada una para no mezclar ofertas distintas.",
  },
  {
    icon: Target,
    title: "Copy orientado a cliente",
    text: "El mensaje responde a problemas, objeciones y motivos de contacto, no solo a lo que la empresa quiere contar.",
  },
  {
    icon: Search,
    title: "SEO técnico inicial",
    text: "Preparamos headings, metadatos, estructura e indexación para que Google pueda entender la web desde el inicio.",
  },
  {
    icon: MousePointerClick,
    title: "CTAs visibles y medibles",
    text: "Formularios, botones y rutas de contacto pensados para convertir visitas en conversaciones comerciales.",
  },
  {
    icon: MonitorSmartphone,
    title: "Diseño adaptable a móvil",
    text: "Priorizamos lectura, velocidad y contacto fácil en móvil, donde muchas decisiones empiezan o se rematan.",
  },
];

const includes = [
  {
    icon: LayoutTemplate,
    title: "Estructura de páginas",
    text: "Home, servicios, páginas comerciales y contacto organizados según lo que el cliente necesita entender.",
  },
  {
    icon: MonitorSmartphone,
    title: "Diseño responsive",
    text: "Una web profesional para empresa que funciona bien en móvil, tablet y escritorio sin perder claridad.",
  },
  {
    icon: Target,
    title: "Textos orientados a conversión",
    text: "Copy claro para explicar la oferta, resolver dudas y facilitar que el usuario dé el siguiente paso.",
  },
  {
    icon: Search,
    title: "SEO básico on-page",
    text: "Títulos, descripciones, estructura semántica y base técnica para empezar con una web entendible.",
  },
  {
    icon: FormInput,
    title: "Formularios de contacto",
    text: "Campos simples, CTAs visibles y rutas de contacto preparadas para generar leads sin fricción.",
  },
  {
    icon: BarChart3,
    title: "Medición y analítica",
    text: "Eventos, formularios y tráfico conectados para saber qué páginas ayudan realmente a captar clientes.",
  },
];

const process = [
  {
    step: "01",
    title: "Auditoría inicial",
    text: "Revisamos tu web actual, tu oferta, tus servicios y el objetivo comercial: formularios, llamadas, reservas o presupuestos.",
  },
  {
    step: "02",
    title: "Estructura y mensajes",
    text: "Definimos qué páginas hacen falta, qué debe explicar cada bloque y cómo guiar al usuario hacia el contacto.",
  },
  {
    step: "03",
    title: "Diseño y desarrollo",
    text: "Diseñamos y construimos una página web para empresas clara, rápida, responsive y preparada para SEO inicial.",
  },
  {
    step: "04",
    title: "Medición y mejora",
    text: "Comprobamos formularios, eventos y rendimiento para convertir la web en un canal que pueda mejorar con datos.",
  },
];

const companyTypes = [
  "Pymes que necesitan captar clientes desde su web.",
  "Servicios profesionales que dependen de confianza antes del contacto.",
  "Clínicas, centros de estética y negocios locales.",
  "Empresas B2B con ciclos de decisión más largos.",
  "Startups que necesitan explicar mejor su propuesta.",
  "Marcas que dependen de formularios, llamadas o presupuestos.",
];

const faqs = [
  {
    question: "¿Qué diferencia hay entre diseño web para empresas y una web básica?",
    answer:
      "Una web básica suele limitarse a presentar información. El diseño web para empresas debe ordenar servicios, explicar la propuesta de valor, facilitar el contacto, preparar una base SEO y medir qué visitas se convierten en oportunidades.",
  },
  {
    question: "¿Una web de empresa debe incluir SEO?",
    answer:
      "Sí. Como mínimo debe incluir SEO inicial: estructura de encabezados, metadatos, URLs claras, rendimiento, indexación y una arquitectura que permita crecer después con páginas de servicio o contenido.",
  },
  {
    question: "¿Cuántas páginas necesita una empresa?",
    answer:
      "Depende de sus servicios y del tipo de cliente. Muchas empresas empiezan con home, servicios, una o varias páginas comerciales, sobre nosotros y contacto. Si hay varias líneas de negocio, conviene separarlas para que cada página tenga una intención clara.",
  },
  {
    question: "¿Podéis rediseñar una web existente?",
    answer:
      "Sí. Podemos revisar la web actual y decidir si conviene mejorar estructura, mensajes, diseño, velocidad, formularios o SEO. Si la base no limita la captación, no hace falta empezar de cero.",
  },
  {
    question: "¿La web estará preparada para captar leads?",
    answer:
      "Ese es el objetivo. Trabajamos arquitectura, copy, CTAs, formularios, analítica y una base SEO para que la web pueda convertir visitas en contactos comerciales, no solo verse bien.",
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
        name: "Diseño web para empresas",
        item: "https://www.crecimientosincomplicaciones.com/diseno-pagina-web-profesional/empresas",
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Diseño web para empresas",
    serviceType: ["Diseño web empresas", "Diseño web para empresas", "Página web para empresas", "Web profesional para empresa"],
    provider: {
      "@type": "Organization",
      name: "Crecimiento sin complicaciones",
      url: "https://www.crecimientosincomplicaciones.com",
    },
    areaServed: "ES",
    description:
      "Diseño web para empresas que necesitan una web clara, rápida y orientada a captar clientes con estrategia, estructura, SEO inicial y conversión.",
    makesOffer: {
      "@type": "Offer",
      name: "Auditoría gratuita de diseño web para empresas",
      availability: "https://schema.org/InStock",
      url: "https://www.crecimientosincomplicaciones.com/diseno-pagina-web-profesional/empresas",
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
  title: "Diseño web para empresas | Webs pensadas para captar clientes",
  description:
    "Diseño web para empresas que necesitan una web clara, rápida y orientada a captar clientes. Estrategia, estructura, SEO inicial y conversión desde el primer día.",
  keywords: [
    "diseño web empresas",
    "diseño web para empresas",
    "página web para empresas",
    "empresa de diseño web",
    "web profesional para empresa",
  ],
  alternates: {
    canonical: "/diseno-pagina-web-profesional/empresas",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Diseño web para empresas",
    description:
      "Webs claras, rápidas y orientadas a captar clientes con estrategia, estructura, SEO inicial y conversión.",
    url: "/diseno-pagina-web-profesional/empresas",
    siteName: "Crecimiento sin complicaciones",
    locale: "es_ES",
    type: "website",
  },
};

function CheckIcon() {
  return <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-blue-400" aria-hidden="true" strokeWidth={2} />;
}

export default function WebDesignForCompaniesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <div className="web-design-companies-page landing-light min-h-screen bg-slate-950 text-slate-50">
        <header className="sticky top-0 z-20 border-b border-slate-800 bg-slate-950/95 backdrop-blur">
          <nav className="mx-auto flex min-h-[72px] max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8" aria-label="Navegación principal">
            <Link className="logo-link text-slate-50" href="/" aria-label="Crecimiento sin complicaciones, inicio">
              <Logo variant="light" />
            </Link>
            <div className="hidden items-center gap-2 text-sm font-semibold text-slate-300 md:flex">
              <a className="rounded-md px-3 py-2 hover:bg-slate-900 hover:text-white" href="#incluye">Incluye</a>
              <a className="rounded-md px-3 py-2 hover:bg-slate-900 hover:text-white" href="#proceso">Proceso</a>
              <a className="rounded-md px-3 py-2 hover:bg-slate-900 hover:text-white" href="#siguiente-paso">Siguiente paso</a>
              <a className="rounded-md px-3 py-2 hover:bg-slate-900 hover:text-white" href="#faq">FAQ</a>
            </div>
            <div className="mobile-header-links" aria-label="Enlaces rápidos">
              <a href="#incluye">Incluye</a>
              <a href="#proceso">Proceso</a>
            </div>
            <div className="flex items-center gap-3">
              <LandingServicesMenu currentPath="/diseno-pagina-web-profesional/empresas" />
              <a className="landing-top-cta inline-flex min-h-11 shrink-0 items-center justify-center rounded-lg bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-blue-950/30 hover:bg-blue-500 focus-visible:ring-2 focus-visible:ring-blue-400" href="#auditoria-web-empresas">
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
                <span>Empresas</span>
              </nav>
              <p className="mb-4 text-sm font-black uppercase tracking-normal text-blue-400">
                DISEÑO WEB EMPRESAS
              </p>
              <h1 id="hero-title" className="mb-6 max-w-4xl text-4xl font-black leading-[1.02] text-slate-900 sm:text-5xl lg:text-6xl">
                Diseño web para empresas que necesitan algo más que una web bonita
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-200">
                Una página web para empresas debe transmitir confianza, explicar bien la oferta y convertir visitas en
                contactos. Diseñamos webs claras, rápidas y preparadas para captar clientes desde el primer día.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a className="inline-flex min-h-12 items-center justify-center rounded-lg bg-blue-600 px-6 py-3 font-bold text-white shadow-xl shadow-blue-950/40 hover:bg-blue-500 focus-visible:ring-2 focus-visible:ring-blue-400" href="#auditoria-web-empresas">
                  Solicitar auditoría gratuita
                </a>
                <Link className="inline-flex min-h-12 items-center justify-center rounded-lg border border-slate-700 px-6 py-3 font-bold text-slate-100 hover:bg-slate-900 focus-visible:ring-2 focus-visible:ring-blue-400" href="/diseno-pagina-web-profesional">
                  Ver diseño web profesional
                </Link>
              </div>
              <dl className="mt-10 grid gap-3 sm:grid-cols-3">
                {[
                  ["Objetivo", "Captar clientes"],
                  ["Base", "SEO inicial y conversión"],
                  ["Uso", "Pymes, B2B y servicios"],
                ].map(([label, value]) => (
                  <div className="rounded-lg bg-white/5 p-5 ring-1 ring-white/10" key={label}>
                    <dt className="text-sm font-black uppercase text-blue-300">{label}</dt>
                    <dd className="mt-2 text-base font-bold leading-6 text-slate-100">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="seo-audit-panel rounded-lg bg-slate-900 p-6 shadow-2xl shadow-blue-950/30 ring-1 ring-slate-800" aria-label="Sistema de captación web para empresas">
              <div className="seo-audit-panel-head mb-7 flex items-center justify-between gap-4 pb-5">
                <div className="seo-audit-panel-title">
                  <p className="text-sm font-black uppercase tracking-normal text-blue-400">Sistema web</p>
                  <strong className="mt-2 block text-2xl font-black text-white">De visita a contacto</strong>
                </div>
                <LineChart className="seo-audit-panel-badge h-8 w-8 text-blue-300" aria-hidden="true" strokeWidth={1.8} />
              </div>
              <div className="seo-audit-step-grid grid gap-4">
                {[
                  ["Oferta clara", "Servicios, beneficios y objeciones ordenadas."],
                  ["SEO inicial", "Estructura preparada para que Google entienda la web."],
                  ["Conversión", "Botones, formularios y llamadas visibles."],
                  ["Medición", "Eventos y formularios listos para mejorar con datos."],
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
              <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Problema</p>
              <h2 id="problem-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                Muchas webs de empresa existen, pero no venden
              </h2>
              <p className="mx-auto mt-6 max-w-4xl text-lg leading-8 text-slate-300">
                El problema no suele ser solo el diseño. Muchas webs tienen mensajes confusos, servicios mal explicados,
                formularios escondidos, una estructura SEO débil o una apariencia bonita que no ayuda al usuario a
                entender por qué debería contactar.
              </p>
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="solution-title">
            <div className="max-w-3xl">
              <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Solución</p>
              <h2 id="solution-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                Una web empresarial debe ordenar tu oferta y facilitar el contacto
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-300">
                La web tiene que ayudar a vender mejor: explicar, guiar, resolver dudas y dejar claro qué hacer después.
              </p>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
              {solutionPoints.map((item) => (
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

          <section id="incluye" className="bg-slate-900 px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="includes-title">
            <div className="mx-auto max-w-7xl">
              <div className="max-w-3xl">
                <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Qué debe incluir</p>
                <h2 id="includes-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                  Qué incluimos en una web para empresas
                </h2>
              </div>
              <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {includes.map((item) => (
                  <article className="rounded-lg bg-slate-950 p-6 ring-1 ring-slate-800" key={item.title}>
                    <item.icon className="h-7 w-7 text-blue-300" aria-hidden="true" strokeWidth={1.8} />
                    <h3 className="!mt-7 text-xl font-black text-slate-900">{item.title}</h3>
                    <p className="mt-3 text-sm leading-[1.65] text-slate-300">{item.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="system-title">
            <div className="grid gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-center">
              <div>
                <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Diferenciación</p>
                <h2 id="system-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                  No diseñamos páginas aisladas, diseñamos sistemas de captación
                </h2>
                <p className="mt-5 text-lg leading-8 text-slate-300">
                  Una empresa no necesita solo una home bonita. Necesita una web conectada con SEO, CRO, analítica,
                  automatización y una ruta clara hacia la conversación comercial.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  ["Web", "Estructura, diseño responsive y mensajes comerciales."],
                  ["SEO", "Base técnica, arquitectura y páginas preparadas para crecer."],
                  ["CRO", "CTAs, formularios y rutas de contacto sin fricción."],
                  ["Analítica", "Eventos y datos para saber qué mejora la captación."],
                ].map(([title, text]) => (
                  <article className="rounded-lg bg-white/5 p-6 ring-1 ring-white/10" key={title}>
                    <h3 className="text-xl font-black text-slate-900">{title}</h3>
                    <p className="mt-3 text-sm leading-[1.65] text-slate-300">{text}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section id="proceso" className="bg-slate-900 px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="process-title">
            <div className="mx-auto max-w-7xl">
              <div className="max-w-3xl">
                <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Proceso</p>
                <h2 id="process-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                  Cómo trabajamos una web de empresa
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
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="types-title">
            <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
              <div>
                <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Para quién es</p>
                <h2 id="types-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                  Para qué tipo de empresas tiene sentido
                </h2>
                <p className="mt-5 text-lg leading-8 text-slate-300">
                  Encaja especialmente bien cuando la web tiene que explicar servicios, generar confianza y convertir
                  visitas en formularios, llamadas o solicitudes de presupuesto.
                  Para un enfoque local, también puedes revisar nuestra página de{" "}
                  <Link className="font-black text-blue-600 hover:text-blue-700" href="/diseno-pagina-web-profesional/valencia">
                    diseño web en Valencia
                  </Link>
                  .
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

          <section id="siguiente-paso" className="bg-slate-900 px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="next-step-title">
            <div className="mx-auto rounded-lg bg-blue-600 p-8 text-white shadow-2xl shadow-blue-950/30 lg:grid lg:max-w-7xl lg:grid-cols-[1fr_auto] lg:items-center lg:gap-8">
              <div>
                <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-100">Siguiente paso</p>
                <h2 id="next-step-title" className="text-3xl font-black text-white sm:text-4xl">
                  Revisa el servicio completo de diseño web profesional
                </h2>
                <p className="mt-4 max-w-3xl text-lg leading-8 text-blue-50">
                  Si quieres ver el servicio completo, la página de diseño web profesional explica el alcance, los
                  planes y cómo convertir tu web en un canal real de captación.
                </p>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:mt-0 lg:min-w-[420px]">
                <Link className="inline-flex min-h-12 items-center justify-center rounded-lg bg-white px-6 py-3 font-black text-blue-700 hover:bg-blue-50" href="/diseno-pagina-web-profesional">
                  Ver diseño web profesional
                </Link>
                <a className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/40 bg-white/10 px-6 py-3 font-black text-white hover:bg-white/15" href="#auditoria-web-empresas">
                  Solicitar auditoría gratuita
                </a>
              </div>
            </div>
          </section>

          <section id="faq" className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="faq-title">
            <div className="max-w-3xl">
              <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">FAQ</p>
              <h2 id="faq-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                Preguntas frecuentes sobre diseño web para empresas
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

          <section id="auditoria-web-empresas" className="border-t border-slate-800 bg-slate-900 px-4 py-16 pb-28 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="final-cta-title">
            <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
              <div>
                <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Auditoría gratuita</p>
                <h2 id="final-cta-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                  Convierte tu web en una herramienta comercial
                </h2>
                <p className="mt-5 text-lg leading-8 text-slate-300">
                  Revisamos tu web, tu oferta y tus oportunidades de captación para decirte qué estructura, mensajes y
                  mejoras tienen más sentido ahora.
                </p>
                <div className="mt-8 grid gap-3">
                  {["Claridad de oferta y páginas necesarias", "SEO inicial y estructura de contenidos", "Formularios, CTAs y medición de leads"].map((item) => (
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
          <a className="mx-auto flex min-h-12 max-w-md items-center justify-center rounded-lg bg-blue-600 px-5 py-3 font-black text-white shadow-lg shadow-blue-950/40" href="#auditoria-web-empresas">
            Solicitar auditoría gratuita
          </a>
        </div>
      </div>
    </>
  );
}
