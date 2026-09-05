import type { Metadata } from "next";
import Link from "next/link";
import {
  BarChart3,
  Building2,
  CheckCircle2,
  ClipboardList,
  Globe2,
  Languages,
  MapPin,
  Search,
  ShoppingCart,
  Target,
  Wrench,
} from "lucide-react";
import { LandingServicesMenu } from "../../components/LandingServicesMenu";
import { Logo } from "../../components/Logo";
import { SeoAuditForm } from "../../components/SeoAuditForm";

const strategyBlocks = [
  {
    icon: Wrench,
    title: "Auditoría SEO técnica",
    text: "Indexación, rendimiento, estructura, errores y rastreo para detectar bloqueos antes de crear más contenido.",
  },
  {
    icon: Search,
    title: "Investigación de keywords",
    text: "Búsquedas locales, nacionales, internacionales y de servicio para separar tráfico amplio de intención real.",
  },
  {
    icon: Target,
    title: "Arquitectura web",
    text: "Páginas principales, clusters, páginas locales y enlazado interno para ordenar demanda y autoridad.",
  },
  {
    icon: ClipboardList,
    title: "Contenido SEO",
    text: "Textos pensados para intención comercial, comparativas, problemas concretos y decisión de compra.",
  },
  {
    icon: MapPin,
    title: "SEO local",
    text: "Señales geográficas, páginas por servicio y búsquedas con ciudad cuando el mercado lo justifica.",
  },
  {
    icon: BarChart3,
    title: "Medición",
    text: "Rankings, tráfico cualificado, formularios y oportunidades para priorizar el siguiente ciclo.",
  },
];

const sectors = [
  "Ecommerce",
  "Turismo y experiencias",
  "Servicios profesionales",
  "Formación y escuelas",
  "Salud y estética",
  "Legal e inmobiliaria",
  "Tecnología y SaaS",
  "Consultoría B2B",
  "Marcas con proyección internacional",
];

const method = [
  {
    step: "01",
    title: "Revisamos tu web y detectamos bloqueos técnicos",
    text: "Analizamos indexación, velocidad, estructura, canibalizaciones, contenido existente y puntos donde se pierde conversión.",
  },
  {
    step: "02",
    title: "Analizamos búsquedas locales, comerciales y sectoriales",
    text: "Separamos intención Barcelona, términos nacionales, búsquedas de servicio y oportunidades por sector o idioma.",
  },
  {
    step: "03",
    title: "Priorizamos páginas con potencial de captar leads",
    text: "Damos prioridad a servicios, categorías, comparativas y landings que pueden generar formularios, llamadas o solicitudes.",
  },
  {
    step: "04",
    title: "Mejoramos contenido, arquitectura y enlazado interno",
    text: "Ajustamos mensajes, headings, enlaces, estructura de URLs y CTAs para que Google y el usuario entiendan la oferta.",
  },
  {
    step: "05",
    title: "Medimos qué acciones generan tráfico útil y contactos",
    text: "Cruzamos Search Console, analítica y leads para decidir qué mantener, ampliar o corregir en el siguiente mes.",
  },
];

const relatedLinks = [
  {
    href: "/seo",
    title: "Agencia SEO",
    text: "La visión completa del servicio: técnica, contenidos, arquitectura y medición para captar desde Google.",
  },
  {
    href: "/seo-para-pymes",
    title: "SEO para pymes",
    text: "Un enfoque específico para empresas pequeñas que necesitan priorizar acciones con impacto comercial.",
  },
  {
    href: "/seo/madrid",
    title: "SEO en Madrid",
    text: "La página local orientada a mercado B2B saturado, competencia corporativa y servicios profesionales.",
  },
  {
    href: "/agencia-marketing-digital/google-ads",
    title: "Google Ads para empresas",
    text: "Campañas para validar demanda y mensajes mientras el SEO construye captación orgánica.",
  },
];

const faqs = [
  {
    question: "¿Trabajáis con empresas que venden en Barcelona aunque no tengan oficina allí?",
    answer:
      "Sí. Podemos trabajar con empresas ubicadas en Barcelona y también con negocios que venden a clientes de Barcelona. En ese caso, cuidamos el enfoque para no prometer presencia física si no existe y centramos la página en servicio, mercado e intención local.",
  },
  {
    question: "¿Qué diferencia hay entre SEO en Barcelona y SEO nacional?",
    answer:
      "El SEO nacional busca posicionar servicios o temas sin una ubicación concreta. El SEO en Barcelona añade intención local: búsquedas con ciudad, competidores locales, sectores específicos y páginas pensadas para captar demanda en ese mercado.",
  },
  {
    question: "¿Cuánto tarda en funcionar una estrategia SEO en Barcelona?",
    answer:
      "Depende del estado de la web, la competencia y las keywords. Una auditoría puede detectar mejoras rápidas, pero una estrategia SEO sólida suele necesitar entre 3 y 6 meses para mostrar señales consistentes.",
  },
  {
    question: "¿Tiene sentido hacer SEO local si mi negocio es B2B?",
    answer:
      "Sí, especialmente si tus clientes buscan proveedores cercanos o con conocimiento del mercado. Muchas empresas B2B comparan agencias, consultores o proveedores usando búsquedas locales antes de pedir presupuesto.",
  },
  {
    question: "¿Necesito contenido en catalán para posicionar en Barcelona?",
    answer:
      "No siempre. Depende de tu audiencia y de las búsquedas objetivo. Si tus clientes buscan principalmente en castellano, podemos empezar en castellano. Si hay demanda o una razón comercial clara, se puede valorar una versión o contenido específico en catalán más adelante.",
  },
  {
    question: "¿Es mejor SEO o Google Ads para captar clientes en Barcelona?",
    answer:
      "No son excluyentes. Google Ads puede darte visibilidad inmediata y aprendizaje rápido. El SEO construye captación orgánica a medio plazo. Para muchas empresas, lo más eficiente es usar Ads para validar mensajes y SEO para consolidar demanda.",
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
      {
        "@type": "ListItem",
        position: 3,
        name: "SEO Barcelona",
        item: "https://www.crecimientosincomplicaciones.com/seo/barcelona",
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Agencia SEO para empresas de Barcelona",
    serviceType: ["SEO Barcelona", "Consultoría SEO Barcelona", "SEO técnico", "Posicionamiento web Barcelona"],
    provider: {
      "@type": "Organization",
      name: "Crecimiento sin complicaciones",
      url: "https://www.crecimientosincomplicaciones.com",
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Barcelona",
    },
    description:
      "Servicios SEO para empresas de Barcelona con auditoría SEO gratuita, SEO técnico, contenidos, arquitectura web y posicionamiento local orientado a leads.",
    makesOffer: {
      "@type": "Offer",
      name: "Auditoría SEO gratuita para empresas de Barcelona",
      availability: "https://schema.org/InStock",
      url: "https://www.crecimientosincomplicaciones.com/seo/barcelona",
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
  title: "Agencia SEO para empresas de Barcelona | Crecimiento sin complicaciones",
  description:
    "Servicios SEO para empresas de Barcelona. Auditoría SEO gratuita, SEO técnico, contenidos, arquitectura web y posicionamiento local para captar clientes desde Google.",
  keywords: [
    "agencia seo barcelona",
    "seo barcelona",
    "servicios seo barcelona",
    "consultoría seo barcelona",
    "seo para empresas en barcelona",
    "posicionamiento web barcelona",
  ],
  alternates: {
    canonical: "/seo/barcelona",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Agencia SEO para empresas de Barcelona",
    description:
      "Auditoría SEO, SEO técnico, contenidos, arquitectura web y posicionamiento local para captar clientes desde Google.",
    url: "/seo/barcelona",
    siteName: "Crecimiento sin complicaciones",
    locale: "es_ES",
    type: "website",
  },
};

function CheckIcon() {
  return <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-blue-400" aria-hidden="true" strokeWidth={2} />;
}

export default function SeoBarcelonaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <div className="seo-barcelona-page landing-light min-h-screen bg-slate-950 text-slate-50">
        <header className="sticky top-0 z-20 border-b border-slate-800 bg-slate-950/95 backdrop-blur">
          <nav className="mx-auto flex min-h-[72px] max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8" aria-label="Navegación principal">
            <Link className="logo-link text-slate-50" href="/" aria-label="Crecimiento sin complicaciones, inicio">
              <Logo variant="light" />
            </Link>
            <div className="hidden items-center gap-2 text-sm font-semibold text-slate-300 md:flex">
              <a className="rounded-md px-3 py-2 hover:bg-slate-900 hover:text-white" href="#estrategia">Estrategia</a>
              <a className="rounded-md px-3 py-2 hover:bg-slate-900 hover:text-white" href="#sectores">Sectores</a>
              <a className="rounded-md px-3 py-2 hover:bg-slate-900 hover:text-white" href="#metodo">Método</a>
              <a className="rounded-md px-3 py-2 hover:bg-slate-900 hover:text-white" href="#faq">FAQ</a>
            </div>
            <div className="mobile-header-links" aria-label="Enlaces rápidos">
              <a href="#estrategia">Estrategia</a>
              <a href="#sectores">Sectores</a>
            </div>
            <div className="flex items-center gap-3">
              <LandingServicesMenu currentPath="/seo/barcelona" />
              <a className="landing-top-cta inline-flex min-h-11 shrink-0 items-center justify-center rounded-lg bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-blue-950/30 hover:bg-blue-500 focus-visible:ring-2 focus-visible:ring-blue-400" href="#auditoria-barcelona">
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
                <span>Barcelona</span>
              </nav>
              <p className="mb-4 text-sm font-black uppercase tracking-normal text-blue-400">
                AGENCIA SEO BARCELONA
              </p>
              <h1 id="hero-title" className="mb-6 max-w-4xl text-4xl font-black leading-[1.02] text-slate-900 sm:text-5xl lg:text-6xl">
                Agencia SEO para empresas de Barcelona que quieren captar clientes desde Google
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-200">
                Ayudamos a empresas de Barcelona a ordenar su SEO con una estrategia clara: auditoría técnica, keyword
                research, contenidos, arquitectura web y medición de leads para convertir búsquedas en oportunidades
                comerciales.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a className="inline-flex min-h-12 items-center justify-center rounded-lg bg-blue-600 px-6 py-3 font-bold text-white shadow-xl shadow-blue-950/40 hover:bg-blue-500 focus-visible:ring-2 focus-visible:ring-blue-400" href="#auditoria-barcelona">
                  Solicitar auditoría SEO gratuita
                </a>
                <Link className="inline-flex min-h-12 items-center justify-center rounded-lg border border-slate-700 px-6 py-3 font-bold text-slate-100 hover:bg-slate-900 focus-visible:ring-2 focus-visible:ring-blue-400" href="/seo">
                  Ver servicios SEO
                </Link>
              </div>
              <dl className="mt-10 grid gap-3 sm:grid-cols-3">
                {[
                  ["Mercado", "Barcelona multicanal"],
                  ["Foco", "Demanda local y marca"],
                  ["Base", "Técnica, contenido y leads"],
                ].map(([label, value]) => (
                  <div className="rounded-lg bg-white/5 p-5 ring-1 ring-white/10" key={label}>
                    <dt className="text-sm font-black uppercase text-blue-300">{label}</dt>
                    <dd className="mt-2 text-base font-bold leading-6 text-slate-100">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="seo-audit-panel rounded-lg bg-slate-900 p-6 shadow-2xl shadow-blue-950/30 ring-1 ring-slate-800" aria-label="Panel de estrategia SEO para Barcelona">
              <div className="seo-audit-panel-head mb-7 flex items-center justify-between gap-4 pb-5">
                <div className="seo-audit-panel-title">
                  <p className="text-sm font-black uppercase tracking-normal text-blue-400">Prioridad Barcelona</p>
                  <strong className="mt-2 block text-2xl font-black text-white">Intención local + marca</strong>
                </div>
                <Globe2 className="seo-audit-panel-badge h-8 w-8 text-blue-300" aria-hidden="true" strokeWidth={1.8} />
              </div>
              <div className="seo-audit-step-grid grid gap-4">
                {[
                  ["Ecommerce", "Categorías, intención transaccional y búsquedas de marca."],
                  ["Turismo", "Demanda local, estacionalidad y consultas de alta comparación."],
                  ["Bilingüismo", "Castellano primero o catalán si la demanda lo justifica."],
                  ["Internacional", "Arquitectura preparada si vendes fuera de España."],
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
                Barcelona no necesita SEO genérico: necesita una estrategia con intención
              </h2>
              <p className="mx-auto mt-6 max-w-4xl text-lg leading-8 text-slate-300">
                En Barcelona conviven ecommerce, turismo, startups, servicios profesionales, formación, negocios locales
                y marcas con proyección nacional o internacional. Eso hace que competir en Google no dependa solo de
                publicar contenido, sino de saber qué búsquedas tienen valor, qué páginas necesita tu web y cómo
                convertir tráfico en contactos reales.
              </p>
            </div>
          </section>

          <section id="estrategia" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="strategy-title">
            <div className="max-w-3xl">
              <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Qué trabajamos</p>
              <h2 id="strategy-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                Qué incluye nuestro SEO para empresas de Barcelona
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-300">
                Combinamos servicios SEO Barcelona, consultoría SEO Barcelona y ejecución técnica para convertir la web
                en un canal de captación medible.
              </p>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {strategyBlocks.map((item) => (
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

          <section id="sectores" className="bg-slate-900 px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="sectors-title">
            <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.82fr_1.18fr]">
              <div>
                <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Sectores</p>
                <h2 id="sectors-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                  SEO para negocios con competencia real en Barcelona
                </h2>
                <p className="mt-5 text-lg leading-8 text-slate-300">
                  Esta estrategia encaja especialmente bien en empresas de servicios, ecommerce, turismo, formación,
                  salud, estética, legal, inmobiliaria, tecnología, consultoría y negocios B2B que necesitan que su web
                  trabaje como canal de captación.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {sectors.map((sector) => (
                  <p className="flex gap-3 rounded-lg bg-slate-950 p-4 text-sm font-bold leading-6 text-slate-300 ring-1 ring-slate-800" key={sector}>
                    {sector === "Ecommerce" ? (
                      <ShoppingCart className="mt-0.5 h-5 w-5 flex-none text-blue-300" aria-hidden="true" strokeWidth={1.8} />
                    ) : sector === "Marcas con proyección internacional" ? (
                      <Languages className="mt-0.5 h-5 w-5 flex-none text-blue-300" aria-hidden="true" strokeWidth={1.8} />
                    ) : (
                      <Building2 className="mt-0.5 h-5 w-5 flex-none text-blue-300" aria-hidden="true" strokeWidth={1.8} />
                    )}
                    <span>{sector}</span>
                  </p>
                ))}
              </div>
            </div>
          </section>

          <section id="metodo" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="method-title">
            <div className="max-w-3xl">
              <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Método</p>
              <h2 id="method-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                Cómo trabajamos el posicionamiento SEO en Barcelona
              </h2>
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

          <section className="border-y border-slate-800 bg-slate-900 px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="difference-title">
            <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.86fr_1.14fr]">
              <div>
                <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Diferenciación</p>
                <h2 id="difference-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                  Más visibilidad, pero con sentido comercial
                </h2>
                <p className="mt-5 text-lg leading-8 text-slate-300">
                  No buscamos aparecer para cualquier búsqueda. Buscamos posicionar páginas que puedan atraer clientes:
                  servicios, problemas concretos, búsquedas locales, comparativas y consultas cercanas a una decisión de
                  compra.
                </p>
              </div>
              <div className="grid gap-5 md:grid-cols-3">
                {[
                  ["Demanda local", "Captamos búsquedas donde Barcelona cambia la intención del usuario."],
                  ["Marca y ecommerce", "Ordenamos categorías, servicios y contenido para búsquedas comparativas."],
                  ["Crecimiento medido", "Miramos leads, formularios y oportunidades, no solo sesiones."],
                ].map(([title, text]) => (
                  <article className="rounded-lg bg-slate-950 p-6 ring-1 ring-slate-800" key={title}>
                    <Globe2 className="h-7 w-7 text-blue-300" aria-hidden="true" strokeWidth={1.8} />
                    <h3 className="!mt-7 text-xl font-black text-slate-900">{title}</h3>
                    <p className="mt-3 text-sm leading-[1.65] text-slate-300">{text}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="links-title">
            <div className="max-w-3xl">
              <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Enlazado interno</p>
              <h2 id="links-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                Sitúa Barcelona dentro de una estrategia SEO completa
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-300">
                Si quieres una visión completa del servicio, puedes ver nuestra página de{" "}
                <Link className="font-black text-blue-600 hover:text-blue-700" href="/seo">
                  agencia SEO
                </Link>
                . Si tu empresa es una pyme y quieres entender por dónde empezar, revisa también nuestra guía de{" "}
                <Link className="font-black text-blue-600 hover:text-blue-700" href="/seo-para-pymes">
                  SEO para pymes
                </Link>
                .
              </p>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {relatedLinks.map((item) => (
                <Link className="rounded-lg bg-white/5 p-6 ring-1 ring-white/10 hover:bg-slate-900" href={item.href} key={item.href}>
                  <h3 className="text-xl font-black text-slate-900">{item.title}</h3>
                  <p className="mt-3 text-sm leading-[1.65] text-slate-300">{item.text}</p>
                </Link>
              ))}
            </div>
          </section>

          <section className="bg-slate-900 px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="middle-cta-title">
            <div className="mx-auto rounded-lg bg-blue-600 p-8 text-white shadow-2xl shadow-blue-950/30 lg:grid lg:max-w-7xl lg:grid-cols-[1fr_auto] lg:items-center lg:gap-8">
              <div>
                <h2 id="middle-cta-title" className="text-3xl font-black text-white sm:text-4xl">
                  ¿Quieres saber qué oportunidades SEO tiene tu empresa en Barcelona?
                </h2>
                <p className="mt-4 max-w-3xl text-lg leading-8 text-blue-50">
                  Analizamos tu web, tus servicios y tus búsquedas prioritarias para darte una hoja de ruta clara: qué
                  corregir, qué páginas crear y qué oportunidades atacar primero.
                </p>
              </div>
              <a className="mt-6 inline-flex min-h-12 items-center justify-center rounded-lg bg-white px-6 py-3 font-black text-blue-700 hover:bg-blue-50 lg:mt-0" href="#auditoria-barcelona">
                Solicitar auditoría SEO gratuita
              </a>
            </div>
          </section>

          <section id="faq" className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="faq-title">
            <div className="max-w-3xl">
              <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">FAQ</p>
              <h2 id="faq-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                Preguntas frecuentes sobre SEO en Barcelona
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

          <section id="auditoria-barcelona" className="border-t border-slate-800 bg-slate-900 px-4 py-16 pb-28 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="final-cta-title">
            <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
              <div>
                <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Auditoría gratuita</p>
                <h2 id="final-cta-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                  Empieza con una auditoría SEO clara
                </h2>
                <p className="mt-5 text-lg leading-8 text-slate-300">
                  Revisamos tu web, tus servicios y tus oportunidades en Barcelona para decirte qué acciones pueden
                  ayudarte a captar más clientes desde Google.
                </p>
                <div className="mt-8 grid gap-3">
                  {["SEO técnico y arquitectura web", "Keywords locales, sectoriales y comerciales", "Prioridades para captar contactos cualificados"].map((item) => (
                    <p className="flex gap-3 text-slate-200" key={item}>
                      <CheckIcon />
                      <span>{item}</span>
                    </p>
                  ))}
                </div>
              </div>
              <SeoAuditForm sourcePage="SEO Barcelona" defaultService="SEO Barcelona" />
            </div>
          </section>
        </main>

        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-800 bg-slate-950/95 p-3 backdrop-blur md:hidden">
          <a className="mx-auto flex min-h-12 max-w-md items-center justify-center rounded-lg bg-blue-600 px-5 py-3 font-black text-white shadow-lg shadow-blue-950/40" href="#auditoria-barcelona">
            Quiero mi auditoría gratuita
          </a>
        </div>
      </div>
    </>
  );
}
