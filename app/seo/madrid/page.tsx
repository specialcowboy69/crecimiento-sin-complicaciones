import type { Metadata } from "next";
import Link from "next/link";
import {
  BarChart3,
  Building2,
  CheckCircle2,
  ClipboardList,
  Gauge,
  MapPin,
  Search,
  Target,
  Wrench,
} from "lucide-react";
import { LandingServicesMenu } from "../../components/LandingServicesMenu";
import { Logo } from "../../components/Logo";
import { SeoAuditForm } from "../../components/SeoAuditForm";

const strategyBlocks = [
  {
    icon: Wrench,
    title: "Auditoría técnica",
    text: "Indexación, velocidad, errores, arquitectura y rastreo para detectar qué impide avanzar en Google.",
  },
  {
    icon: MapPin,
    title: "Keyword research local",
    text: "Búsquedas por servicio, ciudad, zona e intención para separar demanda real de tráfico genérico.",
  },
  {
    icon: Target,
    title: "Páginas comerciales",
    text: "Servicios, sectores y landings que pueden generar leads en mercados competidos de Madrid.",
  },
  {
    icon: Search,
    title: "SEO local",
    text: "Señales para búsquedas con intención geográfica, sin afirmar presencia física si no existe.",
  },
  {
    icon: ClipboardList,
    title: "Contenido útil",
    text: "Respuestas que conectan dudas reales con servicios y ayudan a comparar antes de pedir presupuesto.",
  },
  {
    icon: BarChart3,
    title: "Medición",
    text: "Tráfico, rankings, formularios y oportunidades comerciales para decidir la siguiente prioridad.",
  },
];

const sectors = [
  "Servicios profesionales",
  "Formación y academias",
  "Salud y clínicas",
  "Inmobiliaria",
  "Tecnología y SaaS",
  "Consultoría B2B",
  "Reformas y construcción",
  "Estética y bienestar",
  "Legal y finanzas",
];

const method = [
  {
    step: "01",
    title: "Revisamos tu web y detectamos bloqueos técnicos",
    text: "Analizamos indexación, velocidad, arquitectura, contenido existente y puntos donde se pierde conversión.",
  },
  {
    step: "02",
    title: "Mapeamos keywords nacionales, locales y de servicio",
    text: "Ordenamos búsquedas como servicios, problemas, comparativas y consultas con intención Madrid.",
  },
  {
    step: "03",
    title: "Priorizamos páginas con intención de contacto",
    text: "Damos prioridad a las URLs que pueden generar llamadas, formularios o solicitudes de presupuesto.",
  },
  {
    step: "04",
    title: "Mejoramos contenidos, enlazado interno y conversión",
    text: "Ajustamos mensajes, estructura, enlaces y CTAs para que Google y el usuario entiendan la oferta.",
  },
  {
    step: "05",
    title: "Medimos qué búsquedas traen oportunidades reales",
    text: "Cruzamos visibilidad, tráfico y leads para decidir qué mejorar en el siguiente ciclo.",
  },
];

const relatedLinks = [
  {
    href: "/seo-para-pymes",
    title: "SEO para pymes",
    text: "Para empresas pequeñas que quieren priorizar bien antes de invertir en más contenido o herramientas.",
  },
  {
    href: "/seo",
    title: "Agencia SEO",
    text: "La visión completa del servicio nacional: técnica, contenidos, arquitectura y medición.",
  },
  {
    href: "/agencia-marketing-digital/google-ads",
    title: "Google Ads para empresas",
    text: "Campañas para captar demanda inmediata mientras el SEO construye base orgánica.",
  },
  {
    href: "/diseno-pagina-web-profesional",
    title: "Diseño web profesional",
    text: "Cuando el bloqueo no es solo posicionar, sino convertir mejor las visitas que ya llegan.",
  },
];

const faqs = [
  {
    question: "¿Trabajáis solo con empresas que están físicamente en Madrid?",
    answer:
      "No. Podemos trabajar con empresas ubicadas en Madrid y también con negocios que venden servicios a clientes de Madrid. Lo importante es definir bien la intención local y no prometer presencia física si no existe.",
  },
  {
    question: "¿Cuánto tarda el SEO en Madrid en dar resultados?",
    answer:
      "Depende del estado de la web, la competencia y el tipo de keywords. Normalmente las mejoras técnicas y de contenido empiezan a dar señales en semanas, pero una estrategia SEO seria suele medirse en ciclos de 3 a 6 meses.",
  },
  {
    question: "¿Qué incluye una auditoría SEO para una empresa de Madrid?",
    answer:
      "Revisamos indexación, arquitectura, velocidad, páginas actuales, keywords, contenido, enlazado interno, conversión y oportunidades locales. La idea es salir con una hoja de ruta clara, no con una lista interminable de tareas.",
  },
  {
    question: "¿Es mejor hacer SEO local o SEO nacional?",
    answer:
      "Depende del negocio. Si vendes principalmente en Madrid, el SEO local puede ser prioritario. Si puedes captar clientes en toda España, conviene combinar una página nacional como /seo/ con páginas locales como /seo/madrid/.",
  },
  {
    question: "¿Necesito crear muchas páginas por barrios de Madrid?",
    answer:
      "No al principio. Antes de crear páginas por zonas como Chamberí, Salamanca, Chamartín o Alcobendas, conviene validar que existe demanda suficiente y que cada página tendrá contenido propio. Si no, es mejor concentrar la autoridad en una página fuerte de Madrid.",
  },
  {
    question: "¿El SEO sustituye a Google Ads?",
    answer:
      "No necesariamente. El SEO construye captación orgánica a medio plazo; Google Ads puede generar demanda inmediata. Para muchas pymes, lo mejor es combinar ambos: Ads para aprender rápido y SEO para reducir dependencia a largo plazo.",
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
        name: "SEO Madrid",
        item: "https://www.crecimientosincomplicaciones.com/seo/madrid",
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Agencia SEO para empresas de Madrid",
    serviceType: ["SEO local", "Consultoría SEO", "SEO técnico", "Posicionamiento web"],
    provider: {
      "@type": "Organization",
      name: "Crecimiento sin complicaciones",
      url: "https://www.crecimientosincomplicaciones.com",
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Madrid",
    },
    description:
      "Servicios SEO para empresas de Madrid con auditoría SEO gratuita, estrategia de contenidos, SEO técnico y posicionamiento local orientado a leads.",
    makesOffer: {
      "@type": "Offer",
      name: "Auditoría SEO gratuita para empresas de Madrid",
      availability: "https://schema.org/InStock",
      url: "https://www.crecimientosincomplicaciones.com/seo/madrid",
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
  title: "Agencia SEO para empresas de Madrid",
  description:
    "Servicios SEO para empresas de Madrid. Auditoría SEO gratuita, estrategia de contenidos, SEO técnico y posicionamiento local para captar más clientes desde Google.",
  keywords: [
    "agencia seo madrid",
    "agencia seo para empresas de madrid",
    "servicios seo madrid",
    "seo local madrid",
    "posicionamiento web madrid",
    "consultoría seo madrid",
  ],
  alternates: {
    canonical: "/seo/madrid",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Agencia SEO para empresas de Madrid",
    description:
      "Auditoría SEO, estrategia de contenidos, SEO técnico y posicionamiento local para captar más clientes desde Google.",
    url: "/seo/madrid",
    siteName: "Crecimiento sin complicaciones",
    locale: "es_ES",
    type: "website",
  },
};

function CheckIcon() {
  return <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-blue-400" aria-hidden="true" strokeWidth={2} />;
}

export default function SeoMadridPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <div className="seo-madrid-page landing-light min-h-screen bg-slate-950 text-slate-50">
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
              <LandingServicesMenu currentPath="/seo/madrid" />
              <a className="landing-top-cta inline-flex min-h-11 shrink-0 items-center justify-center rounded-lg bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-blue-950/30 hover:bg-blue-500 focus-visible:ring-2 focus-visible:ring-blue-400" href="#auditoria-madrid">
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
                <span>Madrid</span>
              </nav>
              <p className="mb-4 text-sm font-black uppercase tracking-normal text-blue-400">
                SEO LOCAL EN MADRID
              </p>
              <h1 id="hero-title" className="mb-6 max-w-4xl text-4xl font-black leading-[1.02] text-slate-900 sm:text-5xl lg:text-6xl">
                Agencia SEO para empresas de Madrid que necesitan más clientes desde Google
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-200">
                Ayudamos a pymes, startups y negocios de servicios en Madrid a ordenar su SEO: revisamos la parte
                técnica, detectamos oportunidades reales de búsqueda y construimos páginas pensadas para captar
                contactos, no solo tráfico.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a className="inline-flex min-h-12 items-center justify-center rounded-lg bg-blue-600 px-6 py-3 font-bold text-white shadow-xl shadow-blue-950/40 hover:bg-blue-500 focus-visible:ring-2 focus-visible:ring-blue-400" href="#auditoria-madrid">
                  Solicitar auditoría SEO gratuita
                </a>
                <Link className="inline-flex min-h-12 items-center justify-center rounded-lg border border-slate-700 px-6 py-3 font-bold text-slate-100 hover:bg-slate-900 focus-visible:ring-2 focus-visible:ring-blue-400" href="/seo">
                  Ver servicios SEO
                </Link>
              </div>
              <dl className="mt-10 grid gap-3 sm:grid-cols-3">
                {[
                  ["Mercado", "Madrid competitivo"],
                  ["Foco", "Leads cualificados"],
                  ["Base", "Técnica, local y contenido"],
                ].map(([label, value]) => (
                  <div className="rounded-lg bg-white/5 p-5 ring-1 ring-white/10" key={label}>
                    <dt className="text-sm font-black uppercase text-blue-300">{label}</dt>
                    <dd className="mt-2 text-base font-bold leading-6 text-slate-100">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="seo-audit-panel rounded-lg bg-slate-900 p-6 shadow-2xl shadow-blue-950/30 ring-1 ring-slate-800" aria-label="Panel de estrategia SEO para Madrid">
              <div className="seo-audit-panel-head mb-7 flex items-center justify-between gap-4 pb-5">
                <div className="seo-audit-panel-title">
                  <p className="text-sm font-black uppercase tracking-normal text-blue-400">Prioridad local</p>
                  <strong className="mt-2 block text-2xl font-black text-white">Madrid con intención</strong>
                </div>
                <MapPin className="seo-audit-panel-badge h-8 w-8 text-blue-300" aria-hidden="true" strokeWidth={1.8} />
              </div>
              <div className="seo-audit-step-grid grid gap-4">
                {[
                  ["Servicios", "Búsquedas transaccionales por solución y presupuesto."],
                  ["Sectores", "Páginas adaptadas a despachos, clínicas, B2B o formación."],
                  ["Zonas", "Solo cuando haya demanda y contenido propio suficiente."],
                  ["Conversión", "CTAs claros, formularios simples y mensajes de confianza."],
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
                Posicionar en Madrid exige algo más que publicar artículos
              </h2>
              <p className="mx-auto mt-6 max-w-4xl text-lg leading-8 text-slate-300">
                Madrid es un mercado muy competido. Despachos, clínicas, inmobiliarias, consultoras, academias, SaaS y
                empresas B2B pelean por búsquedas parecidas. Si tu web no tiene una arquitectura clara, páginas
                orientadas a intención comercial y una base técnica sólida, es fácil acabar con visitas poco
                cualificadas o con páginas que no llegan a despegar.
              </p>
            </div>
          </section>

          <section id="estrategia" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="strategy-title">
            <div className="max-w-3xl">
              <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Qué hacemos</p>
              <h2 id="strategy-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                Qué trabajamos en una estrategia SEO para Madrid
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-300">
                Ordenamos la estrategia para competir por búsquedas locales y comerciales sin depender de repetir “agencia SEO Madrid” en cada bloque.
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
                  SEO para negocios que venden servicios en Madrid
                </h2>
                <p className="mt-5 text-lg leading-8 text-slate-300">
                  Este tipo de estrategia encaja especialmente bien en empresas que necesitan confianza antes de la venta:
                  servicios profesionales, formación, salud, inmobiliaria, tecnología, consultoría, reformas, estética,
                  legal, finanzas y negocios B2B.
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

          <section id="metodo" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="method-title">
            <div className="max-w-3xl">
              <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Método</p>
              <h2 id="method-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                Cómo trabajamos tu posicionamiento SEO en Madrid
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
                  No buscamos tráfico por tráfico
                </h2>
                <p className="mt-5 text-lg leading-8 text-slate-300">
                  Una pyme de Madrid no necesita aparecer para cualquier búsqueda. Necesita aparecer cuando alguien
                  busca una solución, compara proveedores o está cerca de pedir presupuesto. Por eso priorizamos keywords
                  comerciales, páginas de servicio, SEO local y mensajes claros.
                </p>
              </div>
              <div className="grid gap-5 md:grid-cols-3">
                {[
                  ["Demanda saturada", "Elegimos búsquedas donde el usuario ya expresa necesidad."],
                  ["Páginas de decisión", "Servicios, sectores y landings con función comercial clara."],
                  ["Prudencia local", "Zonas y barrios solo si aportan valor propio y demanda real."],
                ].map(([title, text]) => (
                  <article className="rounded-lg bg-slate-950 p-6 ring-1 ring-slate-800" key={title}>
                    <Gauge className="h-7 w-7 text-blue-300" aria-hidden="true" strokeWidth={1.8} />
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
                Antes de invertir más, ordena el siguiente paso
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-300">
                Si todavía estás valorando si el SEO encaja con tu empresa, puedes revisar nuestra guía de{" "}
                <Link className="font-black text-blue-600 hover:text-blue-700" href="/seo-para-pymes">
                  SEO para pymes
                </Link>
                . Si buscas una visión completa del servicio, visita nuestra página de{" "}
                <Link className="font-black text-blue-600 hover:text-blue-700" href="/seo">
                  agencia SEO
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
                  ¿Quieres saber qué oportunidades SEO tiene tu empresa en Madrid?
                </h2>
                <p className="mt-4 max-w-3xl text-lg leading-8 text-blue-50">
                  Preparamos una revisión inicial con problemas técnicos, keywords prioritarias y páginas que podrían
                  ayudarte a captar más contactos desde Google.
                </p>
              </div>
              <a className="mt-6 inline-flex min-h-12 items-center justify-center rounded-lg bg-white px-6 py-3 font-black text-blue-700 hover:bg-blue-50 lg:mt-0" href="#auditoria-madrid">
                Solicitar auditoría SEO gratuita
              </a>
            </div>
          </section>

          <section id="faq" className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="faq-title">
            <div className="max-w-3xl">
              <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">FAQ</p>
              <h2 id="faq-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                Preguntas frecuentes sobre SEO en Madrid
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

          <section id="auditoria-madrid" className="border-t border-slate-800 bg-slate-900 px-4 py-16 pb-28 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="final-cta-title">
            <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
              <div>
                <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Auditoría gratuita</p>
                <h2 id="final-cta-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                  Empieza con una auditoría SEO clara
                </h2>
                <p className="mt-5 text-lg leading-8 text-slate-300">
                  Analizamos tu web, tus servicios y tus oportunidades en Madrid para decirte qué acciones tienen más
                  sentido ahora.
                </p>
                <div className="mt-8 grid gap-3">
                  {["Problemas técnicos y de arquitectura", "Keywords locales y comerciales", "Páginas prioritarias para captar contactos"].map((item) => (
                    <p className="flex gap-3 text-slate-200" key={item}>
                      <CheckIcon />
                      <span>{item}</span>
                    </p>
                  ))}
                </div>
              </div>
              <SeoAuditForm sourcePage="SEO Madrid" defaultService="SEO Madrid" />
            </div>
          </section>
        </main>

        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-800 bg-slate-950/95 p-3 backdrop-blur md:hidden">
          <a className="mx-auto flex min-h-12 max-w-md items-center justify-center rounded-lg bg-blue-600 px-5 py-3 font-black text-white shadow-lg shadow-blue-950/40" href="#auditoria-madrid">
            Quiero mi auditoría gratuita
          </a>
        </div>
      </div>
    </>
  );
}
