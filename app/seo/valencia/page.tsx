import type { Metadata } from "next";
import Link from "next/link";
import {
  BarChart3,
  Building2,
  CheckCircle2,
  ClipboardList,
  Gauge,
  Home,
  MapPin,
  Megaphone,
  Search,
  Store,
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
    text: "Indexación, errores, velocidad, estructura y rastreo para detectar qué está frenando la visibilidad.",
  },
  {
    icon: Search,
    title: "Keyword research local",
    text: "Búsquedas por servicio, ciudad, provincia e intención para priorizar términos que puedan traer contactos.",
  },
  {
    icon: Target,
    title: "Arquitectura web",
    text: "Páginas principales, páginas locales y enlazado interno para ordenar servicios, zonas y autoridad.",
  },
  {
    icon: ClipboardList,
    title: "Contenido SEO",
    text: "Textos orientados a captar demanda real, resolver dudas comerciales y ayudar a pedir presupuesto.",
  },
  {
    icon: MapPin,
    title: "SEO local",
    text: "Señales geográficas, búsquedas con ciudad y páginas de servicio cuando existe intención local.",
  },
  {
    icon: BarChart3,
    title: "Conversión",
    text: "Formularios, CTAs, mensajes y medición de leads para conectar posicionamiento web Valencia con negocio.",
  },
];

const sectors = [
  "Clínicas y salud",
  "Despachos profesionales",
  "Consultoras",
  "Inmobiliarias",
  "Academias y formación",
  "Reformas y construcción",
  "Comercio especializado",
  "Hoteles y restaurantes",
  "Servicios B2B",
];

const method = [
  {
    step: "01",
    title: "Revisamos tu web y detectamos bloqueos",
    text: "Analizamos la base técnica, la estructura, las páginas existentes, el mensaje y los puntos donde se pierde conversión.",
  },
  {
    step: "02",
    title: "Analizamos tus servicios, competidores y búsquedas locales",
    text: "Estudiamos términos de servicio, ciudad, provincia y demanda comercial para saber dónde merece la pena competir.",
  },
  {
    step: "03",
    title: "Priorizamos keywords que puedan traer contactos",
    text: "Elegimos búsquedas con intención de llamada, formulario o presupuesto, no solo términos que suben el tráfico.",
  },
  {
    step: "04",
    title: "Mejoramos páginas, contenidos, estructura y enlazado interno",
    text: "Ajustamos copy, headings, URLs, enlaces y CTAs para que Google y los clientes entiendan mejor la oferta.",
  },
  {
    step: "05",
    title: "Medimos tráfico, rankings, formularios y oportunidades",
    text: "Convertimos los datos en prioridades mensuales para decidir qué páginas crear, corregir o reforzar.",
  },
];

const relatedLinks = [
  {
    href: "/seo",
    title: "Agencia SEO",
    text: "La visión completa del servicio nacional: SEO técnico, contenidos, arquitectura y medición.",
  },
  {
    href: "/seo-para-pymes",
    title: "SEO para pymes",
    text: "Un enfoque específico para empresas pequeñas que necesitan priorizar acciones con impacto.",
  },
  {
    href: "/seo/madrid",
    title: "SEO en Madrid",
    text: "Página local orientada a competencia B2B intensa, servicios profesionales y presión comercial.",
  },
  {
    href: "/seo/barcelona",
    title: "SEO en Barcelona",
    text: "Página local enfocada en ecommerce, turismo, marca e intención internacional.",
  },
];

const comparison = [
  {
    icon: Megaphone,
    title: "Google Ads acelera",
    text: "Puede darte visibilidad inmediata y aprendizaje rápido sobre mensajes, servicios y búsquedas rentables.",
  },
  {
    icon: Home,
    title: "SEO local construye base",
    text: "Crea páginas que pueden seguir captando demanda relevante sin depender siempre del coste por clic.",
  },
  {
    icon: Gauge,
    title: "La web decide la conversión",
    text: "Si el mensaje, la velocidad o los formularios fallan, ni SEO ni Ads convierten todo lo que podrían.",
  },
];

const faqs = [
  {
    question: "¿Trabajáis con empresas de Valencia aunque no tengáis oficina física allí?",
    answer:
      "Sí. Podemos trabajar con empresas ubicadas en Valencia y también con negocios que venden a clientes de Valencia. En ese caso, cuidamos el enfoque para hablar de servicios para empresas de Valencia sin afirmar presencia física si no existe.",
  },
  {
    question: "¿Qué diferencia hay entre SEO local y SEO nacional?",
    answer:
      "El SEO nacional busca posicionar por servicios o temas sin una ubicación concreta. El SEO local añade intención geográfica: búsquedas con ciudad, páginas adaptadas al mercado local, sectores de la zona y señales que ayudan a Google a entender dónde quieres captar clientes.",
  },
  {
    question: "¿Cuánto tarda el SEO para una empresa en Valencia?",
    answer:
      "Depende de la competencia, el estado técnico de la web y las keywords objetivo. Algunas mejoras pueden notarse en pocas semanas, pero una estrategia SEO realista suele medirse en ciclos de 3 a 6 meses.",
  },
  {
    question: "¿Tiene sentido hacer SEO si ya invierto en Google Ads?",
    answer:
      "Sí. Google Ads puede darte visibilidad inmediata, pero el SEO construye captación orgánica a medio plazo. Además, lo aprendido en Ads puede ayudar a priorizar keywords, mensajes y páginas SEO con más intención comercial.",
  },
  {
    question: "¿Qué páginas necesita una pyme valenciana para posicionar mejor?",
    answer:
      "Normalmente necesita una home clara, páginas de servicio, una estructura bien enlazada, contenido que responda dudas reales y, si vende en una zona concreta, páginas locales bien trabajadas. No se trata de crear muchas URLs, sino de crear las páginas correctas.",
  },
  {
    question: "¿Podéis trabajar sobre mi web actual o hay que hacer una nueva?",
    answer:
      "Podemos empezar revisando la web actual. Si la base técnica, el mensaje y la estructura permiten mejorar, trabajamos sobre ella. Si la web limita la captación, planteamos una mejora o rediseño orientado a SEO y conversión.",
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
        name: "SEO Valencia",
        item: "https://www.crecimientosincomplicaciones.com/seo/valencia",
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Agencia SEO para empresas de Valencia",
    serviceType: ["SEO Valencia", "Consultoría SEO Valencia", "SEO local Valencia", "Posicionamiento web Valencia"],
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
      "Servicios SEO para empresas de Valencia con auditoría SEO gratuita, SEO técnico, contenidos, arquitectura web y SEO local orientado a captar clientes.",
    makesOffer: {
      "@type": "Offer",
      name: "Auditoría SEO gratuita para empresas de Valencia",
      availability: "https://schema.org/InStock",
      url: "https://www.crecimientosincomplicaciones.com/seo/valencia",
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
  title: "Agencia SEO para empresas de Valencia | Crecimiento sin complicaciones",
  description:
    "Servicios SEO para empresas de Valencia. Auditoría SEO gratuita, SEO técnico, contenidos, arquitectura web y SEO local para captar más clientes desde Google.",
  keywords: [
    "agencia seo valencia",
    "seo valencia",
    "servicios seo valencia",
    "consultoría seo valencia",
    "seo para empresas en valencia",
    "seo local valencia",
    "posicionamiento web valencia",
  ],
  alternates: {
    canonical: "/seo/valencia",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Agencia SEO para empresas de Valencia",
    description:
      "Auditoría SEO, SEO técnico, contenidos, arquitectura web y SEO local para captar más clientes desde Google.",
    url: "/seo/valencia",
    siteName: "Crecimiento sin complicaciones",
    locale: "es_ES",
    type: "website",
  },
};

function CheckIcon() {
  return <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-blue-400" aria-hidden="true" strokeWidth={2} />;
}

export default function SeoValenciaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <div className="seo-valencia-page landing-light min-h-screen bg-slate-950 text-slate-50">
        <header className="sticky top-0 z-20 border-b border-slate-800 bg-slate-950/95 backdrop-blur">
          <nav className="mx-auto flex min-h-[72px] max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8" aria-label="Navegación principal">
            <Link className="logo-link text-slate-50" href="/" aria-label="Crecimiento sin complicaciones, inicio">
              <Logo variant="light" />
            </Link>
            <div className="hidden items-center gap-2 text-sm font-semibold text-slate-300 md:flex">
              <a className="rounded-md px-3 py-2 hover:bg-slate-900 hover:text-white" href="#estrategia">Estrategia</a>
              <a className="rounded-md px-3 py-2 hover:bg-slate-900 hover:text-white" href="#sectores">Sectores</a>
              <a className="rounded-md px-3 py-2 hover:bg-slate-900 hover:text-white" href="#ads">SEO o Ads</a>
              <a className="rounded-md px-3 py-2 hover:bg-slate-900 hover:text-white" href="#faq">FAQ</a>
            </div>
            <div className="mobile-header-links" aria-label="Enlaces rápidos">
              <a href="#estrategia">Estrategia</a>
              <a href="#ads">SEO o Ads</a>
            </div>
            <div className="flex items-center gap-3">
              <LandingServicesMenu currentPath="/seo/valencia" />
              <a className="landing-top-cta inline-flex min-h-11 shrink-0 items-center justify-center rounded-lg bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-blue-950/30 hover:bg-blue-500 focus-visible:ring-2 focus-visible:ring-blue-400" href="#auditoria-valencia">
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
                <span>Valencia</span>
              </nav>
              <p className="mb-4 text-sm font-black uppercase tracking-normal text-blue-400">
                AGENCIA SEO VALENCIA
              </p>
              <h1 id="hero-title" className="mb-6 max-w-4xl text-4xl font-black leading-[1.02] text-slate-900 sm:text-5xl lg:text-6xl">
                Agencia SEO para empresas de Valencia que quieren captar más clientes desde Google
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-200">
                Ayudamos a pymes, negocios locales y empresas de servicios en Valencia a ordenar su SEO: revisamos la
                parte técnica, elegimos keywords con intención comercial y construimos páginas pensadas para generar
                contactos reales.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a className="inline-flex min-h-12 items-center justify-center rounded-lg bg-blue-600 px-6 py-3 font-bold text-white shadow-xl shadow-blue-950/40 hover:bg-blue-500 focus-visible:ring-2 focus-visible:ring-blue-400" href="#auditoria-valencia">
                  Solicitar auditoría SEO gratuita
                </a>
                <Link className="inline-flex min-h-12 items-center justify-center rounded-lg border border-slate-700 px-6 py-3 font-bold text-slate-100 hover:bg-slate-900 focus-visible:ring-2 focus-visible:ring-blue-400" href="/seo">
                  Ver servicios SEO
                </Link>
              </div>
              <dl className="mt-10 grid gap-3 sm:grid-cols-3">
                {[
                  ["Mercado", "Pyme y servicio local"],
                  ["Foco", "Captación sostenible"],
                  ["Riesgo", "Depender solo de Ads"],
                ].map(([label, value]) => (
                  <div className="rounded-lg bg-white/5 p-5 ring-1 ring-white/10" key={label}>
                    <dt className="text-sm font-black uppercase text-blue-300">{label}</dt>
                    <dd className="mt-2 text-base font-bold leading-6 text-slate-100">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="seo-audit-panel rounded-lg bg-slate-900 p-6 shadow-2xl shadow-blue-950/30 ring-1 ring-slate-800" aria-label="Panel de estrategia SEO para Valencia">
              <div className="seo-audit-panel-head mb-7 flex items-center justify-between gap-4 pb-5">
                <div className="seo-audit-panel-title">
                  <p className="text-sm font-black uppercase tracking-normal text-blue-400">Prioridad Valencia</p>
                  <strong className="mt-2 block text-2xl font-black text-white">Base local para captar</strong>
                </div>
                <Store className="seo-audit-panel-badge h-8 w-8 text-blue-300" aria-hidden="true" strokeWidth={1.8} />
              </div>
              <div className="seo-audit-step-grid grid gap-4">
                {[
                  ["Páginas de servicio", "Servicios claros, intención comercial y confianza antes del formulario."],
                  ["Búsquedas locales", "Ciudad, provincia y consultas cercanas a pedir presupuesto."],
                  ["Menos dependencia", "Combinar SEO local con Ads sin pagar siempre por cada visita."],
                  ["Medición de leads", "Rankings, llamadas, formularios y oportunidades reales."],
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
                En Valencia, aparecer en Google ya no va solo de tener una web
              </h2>
              <p className="mx-auto mt-6 max-w-4xl text-lg leading-8 text-slate-300">
                Muchas empresas valencianas tienen página web, redes sociales e incluso campañas de anuncios, pero
                siguen sin recibir contactos constantes desde Google. El problema suele estar en la base: páginas que no
                atacan búsquedas reales, contenido demasiado genérico, errores técnicos o falta de una estrategia local
                clara.
              </p>
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="local-difference-title">
            <div className="mx-auto max-w-5xl text-center">
              <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Diferencia Valencia</p>
              <h2 id="local-difference-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                SEO para un mercado local con mucha pyme y mucho servicio
              </h2>
              <p className="mx-auto mt-6 max-w-4xl text-lg leading-8 text-slate-300">
                Valencia tiene un tejido fuerte de pymes, servicios profesionales, clínicas, formación, inmobiliarias,
                turismo, hostelería, comercio local y empresas B2B. Eso obliga a trabajar el SEO con una mezcla de
                intención local, páginas de servicio, confianza y conversión.
              </p>
            </div>
          </section>

          <section id="estrategia" className="bg-slate-900 px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="strategy-title">
            <div className="mx-auto max-w-7xl">
              <div className="max-w-3xl">
                <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Qué trabajamos</p>
                <h2 id="strategy-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                  Qué incluye nuestro servicio SEO para empresas de Valencia
                </h2>
                <p className="mt-4 text-lg leading-8 text-slate-300">
                  Combinamos servicios SEO Valencia, consultoría SEO Valencia y ejecución práctica para que el
                  posicionamiento se conecte con captación.
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
            </div>
          </section>

          <section id="metodo" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="method-title">
            <div className="max-w-3xl">
              <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Método</p>
              <h2 id="method-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                Cómo trabajamos tu posicionamiento SEO en Valencia
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

          <section id="sectores" className="bg-slate-900 px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="sectors-title">
            <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.82fr_1.18fr]">
              <div>
                <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Sectores</p>
                <h2 id="sectors-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                  SEO para negocios que dependen de la confianza local
                </h2>
                <p className="mt-5 text-lg leading-8 text-slate-300">
                  Esta estrategia encaja especialmente bien en clínicas, despachos, consultoras, inmobiliarias,
                  academias, empresas de reformas, comercios especializados, servicios B2B, hoteles, restaurantes y
                  negocios que necesitan aparecer cuando alguien compara opciones antes de pedir presupuesto.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {sectors.map((sector) => (
                  <p className="flex gap-3 rounded-lg bg-slate-950 p-4 text-sm font-bold leading-6 text-slate-300 ring-1 ring-slate-800" key={sector}>
                    <Building2 className="mt-0.5 h-5 w-5 flex-none text-blue-300" aria-hidden="true" strokeWidth={1.8} />
                    <span>{sector}</span>
                  </p>
                ))}
              </div>
            </div>
          </section>

          <section id="ads" className="border-y border-slate-800 bg-slate-900 px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="ads-title">
            <div className="mx-auto max-w-7xl">
              <div className="max-w-3xl">
                <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">SEO local o Ads</p>
                <h2 id="ads-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                  SEO local en Valencia frente a publicidad de pago
                </h2>
                <p className="mt-5 text-lg leading-8 text-slate-300">
                  Google Ads puede ayudarte a conseguir visibilidad inmediata, pero si toda la captación depende de
                  pagar por clic, el coste comercial puede volverse difícil de sostener. El SEO local permite construir
                  páginas que sigan atrayendo búsquedas relevantes a medio plazo, especialmente cuando se combinan con
                  una web clara y bien orientada a conversión.
                </p>
              </div>
              <div className="mt-10 grid gap-5 md:grid-cols-3">
                {comparison.map((item) => (
                  <article className="rounded-lg bg-slate-950 p-6 ring-1 ring-slate-800" key={item.title}>
                    <item.icon className="h-7 w-7 text-blue-300" aria-hidden="true" strokeWidth={1.8} />
                    <h3 className="!mt-7 text-xl font-black text-slate-900">{item.title}</h3>
                    <p className="mt-3 text-sm leading-[1.65] text-slate-300">{item.text}</p>
                  </article>
                ))}
              </div>
              <Link className="mt-8 inline-flex min-h-12 items-center justify-center rounded-lg border border-slate-700 px-6 py-3 font-bold text-slate-100 hover:bg-slate-900 focus-visible:ring-2 focus-visible:ring-blue-400" href="/agencia-marketing-digital/google-ads">
                Ver gestión de Google Ads
              </Link>
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="links-title">
            <div className="max-w-3xl">
              <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Enlazado interno</p>
              <h2 id="links-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                Encaja Valencia dentro de una estrategia SEO completa
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-300">
                Si quieres ver la visión completa del servicio, puedes visitar nuestra página de{" "}
                <Link className="font-black text-blue-600 hover:text-blue-700" href="/seo">
                  agencia SEO
                </Link>
                . Si tienes una pyme y quieres saber por dónde empezar, revisa también nuestra guía de{" "}
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
                  ¿Quieres saber qué oportunidades SEO tiene tu empresa en Valencia?
                </h2>
                <p className="mt-4 max-w-3xl text-lg leading-8 text-blue-50">
                  Analizamos tu web, tus servicios y tus búsquedas prioritarias para detectar qué páginas, mejoras
                  técnicas y acciones pueden ayudarte a captar más clientes desde Google.
                </p>
              </div>
              <a className="mt-6 inline-flex min-h-12 items-center justify-center rounded-lg bg-white px-6 py-3 font-black text-blue-700 hover:bg-blue-50 lg:mt-0" href="#auditoria-valencia">
                Solicitar auditoría SEO gratuita
              </a>
            </div>
          </section>

          <section id="faq" className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="faq-title">
            <div className="max-w-3xl">
              <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">FAQ</p>
              <h2 id="faq-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                Preguntas frecuentes sobre SEO en Valencia
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

          <section id="auditoria-valencia" className="border-t border-slate-800 bg-slate-900 px-4 py-16 pb-28 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="final-cta-title">
            <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
              <div>
                <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Auditoría gratuita</p>
                <h2 id="final-cta-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                  Empieza con una auditoría SEO clara
                </h2>
                <p className="mt-5 text-lg leading-8 text-slate-300">
                  Revisamos tu web, tus servicios y tus oportunidades en Valencia para decirte qué acciones tienen más
                  sentido ahora.
                </p>
                <div className="mt-8 grid gap-3">
                  {["Bloqueos técnicos y de indexación", "Keywords locales con intención comercial", "Páginas prioritarias para captar contactos"].map((item) => (
                    <p className="flex gap-3 text-slate-200" key={item}>
                      <CheckIcon />
                      <span>{item}</span>
                    </p>
                  ))}
                </div>
              </div>
              <SeoAuditForm sourcePage="SEO Valencia" defaultService="SEO Valencia" />
            </div>
          </section>
        </main>

        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-800 bg-slate-950/95 p-3 backdrop-blur md:hidden">
          <a className="mx-auto flex min-h-12 max-w-md items-center justify-center rounded-lg bg-blue-600 px-5 py-3 font-black text-white shadow-lg shadow-blue-950/40" href="#auditoria-valencia">
            Quiero mi auditoría gratuita
          </a>
        </div>
      </div>
    </>
  );
}
