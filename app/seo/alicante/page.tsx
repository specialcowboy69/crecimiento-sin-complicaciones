import type { Metadata } from "next";
import Link from "next/link";
import {
  BarChart3,
  Building2,
  CheckCircle2,
  ClipboardList,
  Home,
  Hotel,
  MapPinned,
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
    text: "Indexación, velocidad, estructura, errores y rastreo para detectar qué está frenando el posicionamiento web Alicante.",
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
    text: "Textos claros para atraer demanda cualificada, explicar el servicio y ayudar antes de pedir presupuesto.",
  },
  {
    icon: MapPin,
    title: "SEO local",
    text: "Señales geográficas y páginas orientadas a captación para aparecer en búsquedas con intención Alicante.",
  },
  {
    icon: BarChart3,
    title: "Conversión",
    text: "CTAs, formularios, mensajes y medición de leads para conectar tráfico cualificado con oportunidades reales.",
  },
];

const sectors = [
  "Inmobiliarias",
  "Clínicas y salud",
  "Despachos profesionales",
  "Academias y formación",
  "Hoteles",
  "Restaurantes",
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
    text: "Estudiamos qué busca el cliente en Alicante y qué oportunidades existen por servicio, ciudad y provincia.",
  },
  {
    step: "03",
    title: "Priorizamos keywords con intención de contacto",
    text: "Elegimos búsquedas donde el usuario está comparando opciones, pidiendo presupuesto o buscando proveedor.",
  },
  {
    step: "04",
    title: "Mejoramos páginas, contenido, estructura y enlazado interno",
    text: "Ajustamos mensajes, headings, enlaces y CTAs para que Google y el usuario entiendan mejor la oferta.",
  },
  {
    step: "05",
    title: "Medimos tráfico cualificado, rankings y formularios",
    text: "Convertimos los datos en prioridades para decidir qué páginas crear, reforzar o corregir en cada ciclo.",
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
    href: "/agencia-marketing-digital/google-ads",
    title: "Google Ads",
    text: "Campañas para captar demanda inmediata mientras el SEO construye base orgánica.",
  },
  {
    href: "/diseno-pagina-web-profesional",
    title: "Diseño web",
    text: "Cuando el bloqueo no está solo en aparecer, sino en convertir mejor las visitas.",
  },
];

const comparison = [
  {
    icon: Megaphone,
    title: "Ads acelera",
    text: "Puede generar visibilidad inmediata y aprender rápido qué servicios, zonas y mensajes responden mejor.",
  },
  {
    icon: Home,
    title: "SEO local reduce dependencia",
    text: "Construye páginas que pueden seguir captando demanda sin pagar siempre por cada clic.",
  },
  {
    icon: Hotel,
    title: "Turismo e inmobiliaria necesitan intención",
    text: "La captación mejora cuando servicio, ubicación, temporada y confianza están bien conectados.",
  },
];

const faqs = [
  {
    question: "¿Trabajáis con empresas de Alicante aunque no tengáis oficina física allí?",
    answer:
      "Sí. Podemos trabajar con empresas ubicadas en Alicante y también con negocios que venden a clientes de Alicante o su provincia. Si no hay sede física, cuidamos el mensaje para hablar de servicios para empresas de Alicante sin afirmar presencia local falsa.",
  },
  {
    question: "¿Tiene sentido hacer SEO local en Alicante?",
    answer:
      "Sí, especialmente para negocios que dependen de búsquedas con intención local: inmobiliarias, clínicas, reformas, formación, hostelería, servicios profesionales y empresas B2B que quieren captar clientes en la zona.",
  },
  {
    question: "¿Puedo posicionar también en otros municipios de Alicante?",
    answer:
      "Sí, pero no conviene crear páginas por municipio sin validar demanda. Primero revisamos si hay búsquedas reales y si cada página puede tener contenido propio. En muchos casos es mejor empezar con una página fuerte para Alicante y después ampliar a zonas concretas.",
  },
  {
    question: "¿Cuánto tarda el SEO para una empresa en Alicante?",
    answer:
      "Depende del estado de la web y de la competencia. Algunas mejoras técnicas pueden notarse antes, pero una estrategia SEO consistente suele necesitar entre 3 y 6 meses para consolidar visibilidad y captar oportunidades.",
  },
  {
    question: "¿Es mejor SEO o Google Ads para captar clientes en Alicante?",
    answer:
      "Depende del objetivo. Google Ads puede generar visibilidad inmediata. El SEO construye captación orgánica a medio plazo. Lo más sólido suele ser combinar ambos: Ads para aprender rápido y SEO para reducir dependencia del pago por clic.",
  },
  {
    question: "¿Podéis trabajar sobre mi web actual?",
    answer:
      "Sí. Primero revisamos si tu web actual puede posicionar y convertir. Si la base es válida, la mejoramos. Si la estructura, el contenido o la parte técnica limitan mucho la captación, proponemos cambios más profundos.",
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
        name: "SEO Alicante",
        item: "https://www.crecimientosincomplicaciones.com/seo/alicante",
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Agencia SEO para empresas de Alicante",
    serviceType: ["SEO Alicante", "Consultoría SEO Alicante", "SEO local Alicante", "Posicionamiento web Alicante"],
    provider: {
      "@type": "Organization",
      name: "Crecimiento sin complicaciones",
      url: "https://www.crecimientosincomplicaciones.com",
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Alicante",
    },
    description:
      "Servicios SEO para empresas de Alicante con auditoría SEO gratuita, SEO técnico, contenidos, arquitectura web y SEO local orientado a captar clientes.",
    makesOffer: {
      "@type": "Offer",
      name: "Auditoría SEO gratuita para empresas de Alicante",
      availability: "https://schema.org/InStock",
      url: "https://www.crecimientosincomplicaciones.com/seo/alicante",
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
  title: "Agencia SEO para empresas de Alicante | Crecimiento sin complicaciones",
  description:
    "Servicios SEO para empresas de Alicante. Auditoría SEO gratuita, SEO técnico, contenidos, arquitectura web y SEO local para captar clientes desde Google.",
  keywords: [
    "agencia seo alicante",
    "seo alicante",
    "servicios seo alicante",
    "consultoría seo alicante",
    "seo local alicante",
    "posicionamiento web alicante",
    "seo para empresas en alicante",
  ],
  alternates: {
    canonical: "/seo/alicante",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Agencia SEO para empresas de Alicante",
    description:
      "Auditoría SEO, SEO técnico, contenidos, arquitectura web y SEO local para captar clientes desde Google.",
    url: "/seo/alicante",
    siteName: "Crecimiento sin complicaciones",
    locale: "es_ES",
    type: "website",
  },
};

function CheckIcon() {
  return <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-blue-400" aria-hidden="true" strokeWidth={2} />;
}

export default function SeoAlicantePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <div className="seo-alicante-page landing-light min-h-screen bg-slate-950 text-slate-50">
        <header className="sticky top-0 z-20 border-b border-slate-800 bg-slate-950/95 backdrop-blur">
          <nav className="mx-auto flex min-h-[72px] max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8" aria-label="Navegación principal">
            <Link className="logo-link text-slate-50" href="/" aria-label="Crecimiento sin complicaciones, inicio">
              <Logo variant="light" />
            </Link>
            <div className="hidden items-center gap-2 text-sm font-semibold text-slate-300 md:flex">
              <a className="rounded-md px-3 py-2 hover:bg-slate-900 hover:text-white" href="#estrategia">Estrategia</a>
              <a className="rounded-md px-3 py-2 hover:bg-slate-900 hover:text-white" href="#sectores">Sectores</a>
              <a className="rounded-md px-3 py-2 hover:bg-slate-900 hover:text-white" href="#provincia">Provincia</a>
              <a className="rounded-md px-3 py-2 hover:bg-slate-900 hover:text-white" href="#faq">FAQ</a>
            </div>
            <div className="mobile-header-links" aria-label="Enlaces rápidos">
              <a href="#estrategia">Estrategia</a>
              <a href="#provincia">Provincia</a>
            </div>
            <div className="flex items-center gap-3">
              <LandingServicesMenu currentPath="/seo/alicante" />
              <a className="landing-top-cta inline-flex min-h-11 shrink-0 items-center justify-center rounded-lg bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-blue-950/30 hover:bg-blue-500 focus-visible:ring-2 focus-visible:ring-blue-400" href="#auditoria-alicante">
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
                <span>Alicante</span>
              </nav>
              <p className="mb-4 text-sm font-black uppercase tracking-normal text-blue-400">
                AGENCIA SEO ALICANTE
              </p>
              <h1 id="hero-title" className="mb-6 max-w-4xl text-4xl font-black leading-[1.02] text-slate-900 sm:text-5xl lg:text-6xl">
                Agencia SEO para empresas de Alicante que quieren captar más clientes desde Google
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-200">
                Ayudamos a pymes, negocios locales y empresas de servicios en Alicante a mejorar su posicionamiento con
                una estrategia SEO clara: auditoría técnica, keywords comerciales, contenido útil y páginas preparadas
                para generar contactos reales.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a className="inline-flex min-h-12 items-center justify-center rounded-lg bg-blue-600 px-6 py-3 font-bold text-white shadow-xl shadow-blue-950/40 hover:bg-blue-500 focus-visible:ring-2 focus-visible:ring-blue-400" href="#auditoria-alicante">
                  Solicitar auditoría SEO gratuita
                </a>
                <Link className="inline-flex min-h-12 items-center justify-center rounded-lg border border-slate-700 px-6 py-3 font-bold text-slate-100 hover:bg-slate-900 focus-visible:ring-2 focus-visible:ring-blue-400" href="/seo">
                  Ver servicios SEO
                </Link>
              </div>
              <dl className="mt-10 grid gap-3 sm:grid-cols-3">
                {[
                  ["Mercado", "Local, turismo e inmobiliaria"],
                  ["Foco", "Demanda con decisión rápida"],
                  ["Base", "Alicante y provincia"],
                ].map(([label, value]) => (
                  <div className="rounded-lg bg-white/5 p-5 ring-1 ring-white/10" key={label}>
                    <dt className="text-sm font-black uppercase text-blue-300">{label}</dt>
                    <dd className="mt-2 text-base font-bold leading-6 text-slate-100">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="seo-audit-panel rounded-lg bg-slate-900 p-6 shadow-2xl shadow-blue-950/30 ring-1 ring-slate-800" aria-label="Panel de estrategia SEO para Alicante">
              <div className="seo-audit-panel-head mb-7 flex items-center justify-between gap-4 pb-5">
                <div className="seo-audit-panel-title">
                  <p className="text-sm font-black uppercase tracking-normal text-blue-400">Prioridad Alicante</p>
                  <strong className="mt-2 block text-2xl font-black text-white">Captación local con recorrido</strong>
                </div>
                <MapPinned className="seo-audit-panel-badge h-8 w-8 text-blue-300" aria-hidden="true" strokeWidth={1.8} />
              </div>
              <div className="seo-audit-step-grid grid gap-4">
                {[
                  ["Servicios concretos", "Páginas para lo que el cliente ya está buscando."],
                  ["Ciudad y provincia", "Alicante primero; municipios solo si hay demanda real."],
                  ["Turismo e inmobiliaria", "Intención local, confianza y decisión bien conectadas."],
                  ["Menos dependencia", "SEO y Ads trabajando con datos, no como canales sueltos."],
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
                En Alicante, muchas búsquedas tienen intención local y decisión rápida
              </h2>
              <p className="mx-auto mt-6 max-w-4xl text-lg leading-8 text-slate-300">
                Alicante combina negocio local, turismo, inmobiliaria, salud, formación, hostelería, reformas y
                servicios profesionales. Muchas decisiones empiezan en Google: alguien compara opciones, revisa webs,
                busca confianza y contacta con quien entiende mejor su problema.
              </p>
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="local-difference-title">
            <div className="mx-auto max-w-5xl text-center">
              <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Diferenciación</p>
              <h2 id="local-difference-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                SEO local para competir sin depender solo de anuncios
              </h2>
              <p className="mx-auto mt-6 max-w-4xl text-lg leading-8 text-slate-300">
                El objetivo no es aparecer para cualquier búsqueda, sino construir páginas que respondan a lo que tus
                clientes ya están buscando: servicios concretos, búsquedas con ciudad, dudas antes de pedir presupuesto
                y comparativas entre proveedores.
              </p>
            </div>
          </section>

          <section id="estrategia" className="bg-slate-900 px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="strategy-title">
            <div className="mx-auto max-w-7xl">
              <div className="max-w-3xl">
                <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Qué trabajamos</p>
                <h2 id="strategy-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                  Qué trabajamos en una estrategia SEO para Alicante
                </h2>
                <p className="mt-4 text-lg leading-8 text-slate-300">
                  Combinamos servicios SEO Alicante, consultoría SEO Alicante y SEO técnico para priorizar páginas que
                  puedan captar clientes desde búsquedas locales y provinciales.
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
                  SEO para negocios locales, turismo e inmobiliaria en Alicante
                </h2>
                <p className="mt-5 text-lg leading-8 text-slate-300">
                  Esta estrategia encaja especialmente bien en inmobiliarias, clínicas, despachos, academias, hoteles,
                  restaurantes, empresas de reformas, estética, servicios B2B y negocios que necesitan captar clientes
                  en Alicante o en la provincia.
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
                  Cómo trabajamos tu posicionamiento SEO en Alicante
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

          <section id="provincia" className="border-y border-slate-800 bg-slate-900 px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="province-title">
            <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
              <div>
                <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Alicante y provincia</p>
                <h2 id="province-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                  Una estrategia sin páginas vacías por municipio
                </h2>
                <p className="mt-5 text-lg leading-8 text-slate-300">
                  Si tu empresa trabaja también en zonas como Elche, Benidorm, Torrevieja, San Vicente del Raspeig u
                  Orihuela, no conviene crear páginas por municipio sin criterio. Primero identificamos dónde hay
                  demanda real y si cada página puede tener contenido propio.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  ["Elche", "Demanda local por servicios, comercio y empresas."],
                  ["Benidorm", "Turismo, hostelería, inmobiliaria y negocios estacionales."],
                  ["Torrevieja", "Búsquedas locales, residencial e intención internacional."],
                  ["Orihuela", "Captación provincial solo si existe contenido propio."],
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
                SEO local en Alicante frente a publicidad de pago
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-300">
                Google Ads puede darte visibilidad inmediata. El SEO construye captación orgánica a medio plazo. Lo más
                sólido suele ser combinar ambos: Ads para aprender rápido y SEO para reducir dependencia del pago por
                clic.
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
                  Encaja Alicante dentro de una estrategia SEO completa
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
                  ¿Quieres saber qué oportunidades SEO tiene tu empresa en Alicante?
                </h2>
                <p className="mt-4 max-w-3xl text-lg leading-8 text-blue-50">
                  Analizamos tu web, tus servicios y tus búsquedas prioritarias para detectar qué mejoras técnicas,
                  páginas y acciones pueden ayudarte a captar más clientes desde Google.
                </p>
              </div>
              <a className="mt-6 inline-flex min-h-12 items-center justify-center rounded-lg bg-white px-6 py-3 font-black text-blue-700 hover:bg-blue-50 lg:mt-0" href="#auditoria-alicante">
                Solicitar auditoría SEO gratuita
              </a>
            </div>
          </section>

          <section id="faq" className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="faq-title">
            <div className="max-w-3xl">
              <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">FAQ</p>
              <h2 id="faq-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                Preguntas frecuentes sobre SEO en Alicante
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

          <section id="auditoria-alicante" className="border-t border-slate-800 bg-slate-900 px-4 py-16 pb-28 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="final-cta-title">
            <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
              <div>
                <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Auditoría gratuita</p>
                <h2 id="final-cta-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                  Empieza con una auditoría SEO clara
                </h2>
                <p className="mt-5 text-lg leading-8 text-slate-300">
                  Revisamos tu web, tus servicios y tus oportunidades en Alicante para decirte qué acciones tienen más
                  sentido ahora.
                </p>
                <div className="mt-8 grid gap-3">
                  {["Bloqueos técnicos y de indexación", "Keywords locales y provinciales con intención", "Páginas prioritarias para captar contactos"].map((item) => (
                    <p className="flex gap-3 text-slate-200" key={item}>
                      <CheckIcon />
                      <span>{item}</span>
                    </p>
                  ))}
                </div>
              </div>
              <SeoAuditForm sourcePage="SEO Alicante" defaultService="SEO Alicante" />
            </div>
          </section>
        </main>

        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-800 bg-slate-950/95 p-3 backdrop-blur md:hidden">
          <a className="mx-auto flex min-h-12 max-w-md items-center justify-center rounded-lg bg-blue-600 px-5 py-3 font-black text-white shadow-lg shadow-blue-950/40" href="#auditoria-alicante">
            Quiero mi auditoría gratuita
          </a>
        </div>
      </div>
    </>
  );
}
