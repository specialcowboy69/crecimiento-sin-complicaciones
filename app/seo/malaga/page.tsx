import type { Metadata } from "next";
import Link from "next/link";
import {
  BarChart3,
  Building2,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Home,
  Hotel,
  MapPin,
  Megaphone,
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
    text: "Indexación, velocidad, errores, arquitectura y rastreo para detectar qué está frenando el posicionamiento web Málaga.",
  },
  {
    icon: Search,
    title: "Keyword research local",
    text: "Búsquedas por servicio, ciudad, provincia e intención para priorizar términos con opción real de contacto.",
  },
  {
    icon: Target,
    title: "Arquitectura web",
    text: "Páginas principales, locales e intermedias bien conectadas para ordenar servicios, zonas y autoridad.",
  },
  {
    icon: ClipboardList,
    title: "Contenido SEO",
    text: "Textos claros para atraer demanda cualificada, resolver dudas y ayudar antes de pedir presupuesto.",
  },
  {
    icon: MapPin,
    title: "SEO local",
    text: "Señales geográficas y páginas orientadas a captación para competir en Málaga y la Costa del Sol.",
  },
  {
    icon: BarChart3,
    title: "Conversión",
    text: "CTAs, formularios, mensajes y medición de leads para conectar tráfico cualificado con oportunidades reales.",
  },
];

const sectors = [
  "Inmobiliarias",
  "Hoteles y alojamientos",
  "Restaurantes",
  "Clínicas y salud",
  "Despachos profesionales",
  "Academias y formación",
  "Reformas y construcción",
  "Estética y bienestar",
  "Servicios B2B",
];

const method = [
  {
    step: "01",
    title: "Revisamos tu web y detectamos bloqueos técnicos",
    text: "Analizamos indexación, velocidad, arquitectura, contenido existente y puntos donde se pierde conversión.",
  },
  {
    step: "02",
    title: "Analizamos servicios, competidores y búsquedas locales",
    text: "Estudiamos qué busca el cliente en Málaga, qué cambia por temporada y dónde existe intención comercial.",
  },
  {
    step: "03",
    title: "Priorizamos keywords con intención de contacto",
    text: "Elegimos búsquedas donde el usuario compara opciones, pide presupuesto o busca proveedor local.",
  },
  {
    step: "04",
    title: "Mejoramos páginas, contenido, estructura y enlazado interno",
    text: "Ajustamos mensajes, headings, enlaces y CTAs para que Google y el usuario entiendan mejor la oferta.",
  },
  {
    step: "05",
    title: "Medimos tráfico cualificado, rankings y formularios",
    text: "Convertimos datos de visibilidad y leads en prioridades para decidir qué reforzar en cada ciclo.",
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
    text: "Una guía comercial para empresas pequeñas que necesitan priorizar acciones con impacto.",
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
  {
    href: "/seo/valencia",
    title: "SEO en Valencia",
    text: "Página local para pymes, servicios profesionales y captación sostenible.",
  },
  {
    href: "/seo/sevilla",
    title: "SEO en Sevilla",
    text: "Página local enfocada en confianza antes del contacto y servicios profesionales.",
  },
  {
    href: "/seo/alicante",
    title: "SEO en Alicante",
    text: "Página local para turismo, inmobiliaria, negocios locales y captación provincial.",
  },
  {
    href: "/agencia-marketing-digital/google-ads",
    title: "Google Ads",
    text: "Campañas para captar demanda inmediata mientras el SEO construye base orgánica.",
  },
];

const comparison = [
  {
    icon: Megaphone,
    title: "Ads acelera campañas",
    text: "Puede aportar visibilidad inmediata y datos rápidos en momentos de alta demanda o temporada fuerte.",
  },
  {
    icon: Home,
    title: "SEO local construye base",
    text: "Crea páginas que pueden captar búsquedas relevantes sin depender siempre del coste por clic.",
  },
  {
    icon: CalendarDays,
    title: "La estacionalidad exige planificación",
    text: "En turismo, inmobiliaria y servicios premium conviene llegar preparado antes de que suba la demanda.",
  },
];

const faqs = [
  {
    question: "¿Trabajáis con empresas de Málaga aunque no tengáis oficina física allí?",
    answer:
      "Sí. Podemos trabajar con empresas ubicadas en Málaga y también con negocios que venden a clientes de Málaga o la Costa del Sol. Si no hay sede física, cuidamos el mensaje para hablar de servicios para empresas de Málaga sin afirmar una presencia local falsa.",
  },
  {
    question: "¿Tiene sentido hacer SEO local en Málaga?",
    answer:
      "Sí, especialmente en sectores como turismo, inmobiliaria, salud, formación, reformas, servicios profesionales, hostelería y negocios premium. Muchas búsquedas tienen intención local y el usuario compara antes de contactar.",
  },
  {
    question: "¿Puedo posicionar también en Marbella, Fuengirola o Torremolinos?",
    answer:
      "Sí, pero primero hay que validar demanda e intención. No conviene crear páginas por municipio si solo cambian el nombre de la localidad. Es mejor empezar con una página fuerte para Málaga y después ampliar a zonas con contenido propio.",
  },
  {
    question: "¿Cuánto tarda el SEO para una empresa en Málaga?",
    answer:
      "Depende del estado de la web, la competencia y la estacionalidad del sector. Algunas mejoras técnicas pueden notarse antes, pero una estrategia SEO consistente suele necesitar entre 3 y 6 meses para mostrar señales claras.",
  },
  {
    question: "¿Es mejor SEO o Google Ads para captar clientes en Málaga?",
    answer:
      "Depende del momento. Google Ads puede aportar visibilidad inmediata y datos rápidos. El SEO construye captación orgánica a medio plazo. En mercados competitivos o estacionales, combinarlos suele ser la vía más inteligente.",
  },
  {
    question: "¿Podéis trabajar sobre mi web actual?",
    answer:
      "Sí. Primero revisamos si tu web actual tiene una base técnica y comercial suficiente. Si se puede mejorar, trabajamos sobre ella. Si limita la captación, planteamos ajustes de estructura, contenido o diseño orientados a SEO y conversión.",
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
        name: "SEO Málaga",
        item: "https://www.crecimientosincomplicaciones.com/seo/malaga",
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Agencia SEO para empresas de Málaga",
    serviceType: ["SEO Málaga", "Consultoría SEO Málaga", "SEO local Málaga", "Posicionamiento web Málaga"],
    provider: {
      "@type": "Organization",
      name: "Crecimiento sin complicaciones",
      url: "https://www.crecimientosincomplicaciones.com",
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Málaga",
    },
    description:
      "Servicios SEO para empresas de Málaga con auditoría SEO gratuita, SEO técnico, contenidos, arquitectura web y SEO local orientado a captar clientes.",
    makesOffer: {
      "@type": "Offer",
      name: "Auditoría SEO gratuita para empresas de Málaga",
      availability: "https://schema.org/InStock",
      url: "https://www.crecimientosincomplicaciones.com/seo/malaga",
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
  title: "Agencia SEO para empresas de Málaga | Crecimiento sin complicaciones",
  description:
    "Servicios SEO para empresas de Málaga. Auditoría SEO gratuita, SEO técnico, contenidos, arquitectura web y SEO local para captar clientes desde Google.",
  keywords: [
    "agencia seo malaga",
    "seo malaga",
    "servicios seo malaga",
    "consultoría seo malaga",
    "seo local malaga",
    "posicionamiento web malaga",
    "seo para empresas en malaga",
  ],
  alternates: {
    canonical: "/seo/malaga",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Agencia SEO para empresas de Málaga",
    description:
      "Auditoría SEO, SEO técnico, contenidos, arquitectura web y SEO local para captar clientes desde Google.",
    url: "/seo/malaga",
    siteName: "Crecimiento sin complicaciones",
    locale: "es_ES",
    type: "website",
  },
};

function CheckIcon() {
  return <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-blue-400" aria-hidden="true" strokeWidth={2} />;
}

export default function SeoMalagaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <div className="seo-malaga-page landing-light min-h-screen bg-slate-950 text-slate-50">
        <header className="sticky top-0 z-20 border-b border-slate-800 bg-slate-950/95 backdrop-blur">
          <nav className="mx-auto flex min-h-[72px] max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8" aria-label="Navegación principal">
            <Link className="logo-link text-slate-50" href="/" aria-label="Crecimiento sin complicaciones, inicio">
              <Logo variant="light" />
            </Link>
            <div className="hidden items-center gap-2 text-sm font-semibold text-slate-300 md:flex">
              <a className="rounded-md px-3 py-2 hover:bg-slate-900 hover:text-white" href="#estrategia">Estrategia</a>
              <a className="rounded-md px-3 py-2 hover:bg-slate-900 hover:text-white" href="#sectores">Sectores</a>
              <a className="rounded-md px-3 py-2 hover:bg-slate-900 hover:text-white" href="#costa-del-sol">Costa del Sol</a>
              <a className="rounded-md px-3 py-2 hover:bg-slate-900 hover:text-white" href="#faq">FAQ</a>
            </div>
            <div className="mobile-header-links" aria-label="Enlaces rápidos">
              <a href="#estrategia">Estrategia</a>
              <a href="#costa-del-sol">Costa</a>
            </div>
            <div className="flex items-center gap-3">
              <LandingServicesMenu currentPath="/seo/malaga" />
              <a className="landing-top-cta inline-flex min-h-11 shrink-0 items-center justify-center rounded-lg bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-blue-950/30 hover:bg-blue-500 focus-visible:ring-2 focus-visible:ring-blue-400" href="#auditoria-malaga">
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
                <span>Málaga</span>
              </nav>
              <p className="mb-4 text-sm font-black uppercase tracking-normal text-blue-400">
                AGENCIA SEO MÁLAGA
              </p>
              <h1 id="hero-title" className="mb-6 max-w-4xl text-4xl font-black leading-[1.02] text-slate-900 sm:text-5xl lg:text-6xl">
                Agencia SEO para empresas de Málaga que quieren captar más clientes desde Google
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-200">
                Ayudamos a pymes, negocios locales y empresas de servicios en Málaga a mejorar su posicionamiento con
                una estrategia SEO clara: auditoría técnica, keywords comerciales, contenido útil y páginas preparadas
                para convertir búsquedas en contactos reales.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a className="inline-flex min-h-12 items-center justify-center rounded-lg bg-blue-600 px-6 py-3 font-bold text-white shadow-xl shadow-blue-950/40 hover:bg-blue-500 focus-visible:ring-2 focus-visible:ring-blue-400" href="#auditoria-malaga">
                  Solicitar auditoría SEO gratuita
                </a>
                <Link className="inline-flex min-h-12 items-center justify-center rounded-lg border border-slate-700 px-6 py-3 font-bold text-slate-100 hover:bg-slate-900 focus-visible:ring-2 focus-visible:ring-blue-400" href="/seo">
                  Ver servicios SEO
                </Link>
              </div>
              <dl className="mt-10 grid gap-3 sm:grid-cols-3">
                {[
                  ["Mercado", "Turismo e inmobiliaria"],
                  ["Reto", "Demanda estacional"],
                  ["Base", "Málaga y Costa del Sol"],
                ].map(([label, value]) => (
                  <div className="rounded-lg bg-white/5 p-5 ring-1 ring-white/10" key={label}>
                    <dt className="text-sm font-black uppercase text-blue-300">{label}</dt>
                    <dd className="mt-2 text-base font-bold leading-6 text-slate-100">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="seo-audit-panel rounded-lg bg-slate-900 p-6 shadow-2xl shadow-blue-950/30 ring-1 ring-slate-800" aria-label="Panel de estrategia SEO para Málaga">
              <div className="seo-audit-panel-head mb-7 flex items-center justify-between gap-4 pb-5">
                <div className="seo-audit-panel-title">
                  <p className="text-sm font-black uppercase tracking-normal text-blue-400">Prioridad Málaga</p>
                  <strong className="mt-2 block text-2xl font-black text-white">Demanda local y temporada</strong>
                </div>
                <Hotel className="seo-audit-panel-badge h-8 w-8 text-blue-300" aria-hidden="true" strokeWidth={1.8} />
              </div>
              <div className="seo-audit-step-grid grid gap-4">
                {[
                  ["Turismo y servicios", "Páginas preparadas para búsquedas con intención real."],
                  ["Inmobiliaria y premium", "Confianza, ubicación y propuesta clara antes del contacto."],
                  ["Costa del Sol", "Municipios solo cuando haya demanda y contenido propio."],
                  ["Planificación", "SEO y Ads coordinados antes de la temporada fuerte."],
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
                En Málaga, la visibilidad digital cambia mucho según el sector y la temporada
              </h2>
              <p className="mx-auto mt-6 max-w-4xl text-lg leading-8 text-slate-300">
                Málaga concentra turismo, inmobiliaria, servicios profesionales, salud, formación, hostelería, reformas
                y negocios premium. En muchos sectores, la demanda sube y baja según temporada, ubicación o intención
                de búsqueda. Si tu web no está preparada para captar esas búsquedas, puedes depender demasiado de
                anuncios, portales o recomendaciones.
              </p>
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="local-difference-title">
            <div className="mx-auto max-w-5xl text-center">
              <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Diferenciación</p>
              <h2 id="local-difference-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                SEO local para negocios que necesitan captar demanda real
              </h2>
              <p className="mx-auto mt-6 max-w-4xl text-lg leading-8 text-slate-300">
                No se trata de posicionar por cualquier keyword. Se trata de detectar qué búsquedas pueden acabar en una
                llamada, formulario o presupuesto: servicios concretos, búsquedas con ciudad, dudas antes de contratar y
                páginas que transmitan confianza.
              </p>
            </div>
          </section>

          <section id="estrategia" className="bg-slate-900 px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="strategy-title">
            <div className="mx-auto max-w-7xl">
              <div className="max-w-3xl">
                <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Qué trabajamos</p>
                <h2 id="strategy-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                  Qué trabajamos en una estrategia SEO para Málaga
                </h2>
                <p className="mt-4 text-lg leading-8 text-slate-300">
                  Combinamos servicios SEO Málaga, consultoría SEO Málaga y SEO técnico para priorizar páginas que
                  puedan captar clientes en mercados locales, turísticos y estacionales.
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

          <section id="sectores" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="sectors-title">
            <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
              <div>
                <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Sectores</p>
                <h2 id="sectors-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                  SEO para turismo, inmobiliaria, servicios y negocios locales en Málaga
                </h2>
                <p className="mt-5 text-lg leading-8 text-slate-300">
                  Esta estrategia encaja especialmente bien en inmobiliarias, hoteles, alojamientos turísticos,
                  clínicas, despachos, academias, restaurantes, empresas de reformas, estética, consultorías, servicios
                  B2B y negocios que quieren captar clientes en Málaga o la Costa del Sol.
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

          <section id="metodo" className="bg-slate-900 px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="method-title">
            <div className="mx-auto max-w-7xl">
              <div className="max-w-3xl">
                <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Método</p>
                <h2 id="method-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                  Cómo trabajamos tu posicionamiento SEO en Málaga
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
            </div>
          </section>

          <section id="costa-del-sol" className="border-y border-slate-800 bg-slate-900 px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="coast-title">
            <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
              <div>
                <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Málaga y Costa del Sol</p>
                <h2 id="coast-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                  Crecer sin crear páginas vacías por municipio
                </h2>
                <p className="mt-5 text-lg leading-8 text-slate-300">
                  Si tu empresa también trabaja zonas como Marbella, Torremolinos, Fuengirola, Benalmádena, Estepona o
                  Vélez-Málaga, conviene validar primero dónde hay demanda real. No creamos páginas por municipio solo
                  por tener más URLs: cada página debe tener intención, contenido propio y una oportunidad clara de
                  captación.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  ["Marbella", "Servicios premium, inmobiliaria y demanda con alta comparación."],
                  ["Torremolinos", "Turismo, hostelería y búsquedas locales con intención rápida."],
                  ["Fuengirola", "Negocio local, residencial y captación por servicio concreto."],
                  ["Estepona", "Expansión solo si hay demanda y contenido propio suficiente."],
                ].map(([title, text]) => (
                  <article className="rounded-lg bg-slate-950 p-5 ring-1 ring-slate-800" key={title}>
                    <h3 className="text-lg font-black text-slate-900">{title}</h3>
                    <p className="mt-2 text-sm leading-[1.65] text-slate-300">{text}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section id="ads" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="ads-title">
            <div className="max-w-3xl">
              <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">SEO local o Ads</p>
              <h2 id="ads-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                SEO local en Málaga frente a publicidad de pago
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-300">
                Google Ads puede aportar visibilidad inmediata y datos rápidos. El SEO construye captación orgánica a
                medio plazo. En mercados competitivos o estacionales, combinarlos suele ser la vía más inteligente para
                captar sin depender siempre del pago por clic.
              </p>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {comparison.map((item) => (
                <article className="rounded-lg bg-white/5 p-6 ring-1 ring-white/10" key={item.title}>
                  <item.icon className="h-7 w-7 text-blue-300" aria-hidden="true" strokeWidth={1.8} />
                  <h3 className="!mt-7 text-xl font-black text-slate-900">{item.title}</h3>
                  <p className="mt-3 text-sm leading-[1.65] text-slate-300">{item.text}</p>
                </article>
              ))}
            </div>
            <Link className="mt-8 inline-flex min-h-12 items-center justify-center rounded-lg border border-slate-700 px-6 py-3 font-bold text-slate-100 hover:bg-slate-900 focus-visible:ring-2 focus-visible:ring-blue-400" href="/agencia-marketing-digital/google-ads">
              Ver gestión de Google Ads
            </Link>
          </section>

          <section className="bg-slate-900 px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="links-title">
            <div className="mx-auto max-w-7xl">
              <div className="max-w-3xl">
                <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Enlazado interno</p>
                <h2 id="links-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                  Encaja Málaga dentro de una estrategia SEO completa
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
            </div>
          </section>

          <section className="bg-slate-900 px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="middle-cta-title">
            <div className="mx-auto rounded-lg bg-blue-600 p-8 text-white shadow-2xl shadow-blue-950/30 lg:grid lg:max-w-7xl lg:grid-cols-[1fr_auto] lg:items-center lg:gap-8">
              <div>
                <h2 id="middle-cta-title" className="text-3xl font-black text-white sm:text-4xl">
                  ¿Quieres saber qué oportunidades SEO tiene tu empresa en Málaga?
                </h2>
                <p className="mt-4 max-w-3xl text-lg leading-8 text-blue-50">
                  Analizamos tu web, tus servicios y tus búsquedas prioritarias para detectar qué mejoras técnicas,
                  páginas y acciones pueden ayudarte a captar más clientes desde Google.
                </p>
              </div>
              <a className="mt-6 inline-flex min-h-12 items-center justify-center rounded-lg bg-white px-6 py-3 font-black text-blue-700 hover:bg-blue-50 lg:mt-0" href="#auditoria-malaga">
                Solicitar auditoría SEO gratuita
              </a>
            </div>
          </section>

          <section id="faq" className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="faq-title">
            <div className="max-w-3xl">
              <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">FAQ</p>
              <h2 id="faq-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                Preguntas frecuentes sobre SEO en Málaga
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

          <section id="auditoria-malaga" className="border-t border-slate-800 bg-slate-900 px-4 py-16 pb-28 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="final-cta-title">
            <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
              <div>
                <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Auditoría gratuita</p>
                <h2 id="final-cta-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                  Empieza con una auditoría SEO clara
                </h2>
                <p className="mt-5 text-lg leading-8 text-slate-300">
                  Revisamos tu web, tus servicios y tus oportunidades en Málaga para decirte qué acciones tienen más
                  sentido ahora.
                </p>
                <div className="mt-8 grid gap-3">
                  {["Bloqueos técnicos y de indexación", "Keywords locales, estacionales y de servicio", "Páginas prioritarias para captar contactos"].map((item) => (
                    <p className="flex gap-3 text-slate-200" key={item}>
                      <CheckIcon />
                      <span>{item}</span>
                    </p>
                  ))}
                </div>
              </div>
              <SeoAuditForm sourcePage="SEO Málaga" defaultService="SEO Málaga" />
            </div>
          </section>
        </main>

        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-800 bg-slate-950/95 p-3 backdrop-blur md:hidden">
          <a className="mx-auto flex min-h-12 max-w-md items-center justify-center rounded-lg bg-blue-600 px-5 py-3 font-black text-white shadow-lg shadow-blue-950/40" href="#auditoria-malaga">
            Quiero mi auditoría gratuita
          </a>
        </div>
      </div>
    </>
  );
}
