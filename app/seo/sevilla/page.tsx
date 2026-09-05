import type { Metadata } from "next";
import Link from "next/link";
import {
  BarChart3,
  Building2,
  CheckCircle2,
  ClipboardList,
  Home,
  MapPin,
  Megaphone,
  Search,
  ShieldCheck,
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
    text: "Indexación, velocidad, errores y estructura para detectar qué está frenando el posicionamiento web Sevilla.",
  },
  {
    icon: Search,
    title: "Keyword research local",
    text: "Búsquedas por servicio, ciudad e intención para separar tráfico curioso de demanda lista para comparar.",
  },
  {
    icon: Target,
    title: "Arquitectura web",
    text: "Páginas principales, locales e intermedias que ordenan servicios, zonas y preguntas comerciales.",
  },
  {
    icon: ClipboardList,
    title: "Contenido SEO",
    text: "Textos claros para generar confianza, resolver dudas y ayudar al usuario antes de pedir presupuesto.",
  },
  {
    icon: MapPin,
    title: "SEO local",
    text: "Señales geográficas y páginas orientadas a conversión para captar clientes en Sevilla sin crear URLs vacías.",
  },
  {
    icon: BarChart3,
    title: "Medición",
    text: "Rankings, tráfico útil, llamadas, formularios y leads para saber qué búsquedas generan negocio real.",
  },
];

const sectors = [
  "Clínicas y salud",
  "Despachos legales",
  "Academias y formación",
  "Centros de estética",
  "Reformas y construcción",
  "Inmobiliarias",
  "Turismo y hostelería",
  "Consultorías",
  "Servicios B2B",
];

const method = [
  {
    step: "01",
    title: "Revisamos tu web y detectamos bloqueos",
    text: "Analizamos técnica, estructura, contenido, confianza, formularios y páginas actuales para saber qué impide avanzar.",
  },
  {
    step: "02",
    title: "Analizamos servicios, competidores y búsquedas locales",
    text: "Estudiamos cómo compara el cliente en Sevilla y qué términos tienen intención real de contacto o presupuesto.",
  },
  {
    step: "03",
    title: "Priorizamos páginas con intención comercial",
    text: "Damos prioridad a servicios, problemas, comparativas y búsquedas locales antes que a contenidos genéricos.",
  },
  {
    step: "04",
    title: "Mejoramos contenido, estructura y enlazado interno",
    text: "Ajustamos mensajes, headings, enlaces, arquitectura y CTAs para que Google y el usuario entiendan mejor la oferta.",
  },
  {
    step: "05",
    title: "Medimos qué búsquedas generan contactos reales",
    text: "Cruzamos visibilidad, tráfico y leads para decidir las siguientes mejoras con criterio comercial.",
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
    text: "Un enfoque específico para empresas pequeñas que necesitan priorizar sin perderse en tareas sueltas.",
  },
  {
    href: "/seo/madrid",
    title: "SEO en Madrid",
    text: "Página local para mercados con alta competencia B2B y presión comercial intensa.",
  },
  {
    href: "/seo/barcelona",
    title: "SEO en Barcelona",
    text: "Página local orientada a ecommerce, turismo, marca, servicios e intención internacional.",
  },
  {
    href: "/seo/valencia",
    title: "SEO en Valencia",
    text: "Página local para pymes, servicios profesionales y captación sostenible sin depender solo de Ads.",
  },
  {
    href: "/agencia-marketing-digital/google-ads",
    title: "Google Ads",
    text: "Campañas para captar demanda inmediata mientras el SEO construye base orgánica.",
  },
  {
    href: "/diseno-pagina-web-profesional",
    title: "Diseño web",
    text: "Cuando el bloqueo no está solo en aparecer, sino en convertir mejor las visitas que llegan.",
  },
];

const comparison = [
  {
    icon: Megaphone,
    title: "Ads da velocidad",
    text: "Ayuda a aparecer rápido y aprender qué servicios, mensajes y búsquedas generan respuesta comercial.",
  },
  {
    icon: Home,
    title: "SEO local crea base",
    text: "Construye páginas que pueden captar búsquedas relevantes sin depender siempre del coste por clic.",
  },
  {
    icon: ShieldCheck,
    title: "La confianza convierte",
    text: "En sectores de decisión cuidada, el contenido, las pruebas y los mensajes pesan antes del formulario.",
  },
];

const faqs = [
  {
    question: "¿Trabajáis con empresas de Sevilla aunque no tengáis oficina física allí?",
    answer:
      "Sí. Podemos trabajar con empresas ubicadas en Sevilla y también con negocios que venden a clientes de Sevilla. Si no hay presencia física, cuidamos el mensaje para hablar de servicios para empresas de Sevilla sin afirmar una sede local.",
  },
  {
    question: "¿Qué diferencia hay entre SEO local y SEO nacional?",
    answer:
      "El SEO nacional busca posicionar servicios sin depender de una ciudad concreta. El SEO local añade intención geográfica: búsquedas con ciudad, páginas adaptadas al mercado local y señales que ayudan a Google a entender dónde quieres captar clientes.",
  },
  {
    question: "¿Cuánto tarda el SEO para una empresa en Sevilla?",
    answer:
      "Depende del estado de la web, la competencia y las keywords. Las mejoras técnicas pueden notarse antes, pero una estrategia SEO seria suele necesitar entre 3 y 6 meses para mostrar señales consistentes.",
  },
  {
    question: "¿Necesito crear páginas por barrios o zonas de Sevilla?",
    answer:
      "No al principio. Antes de crear páginas por barrios o municipios cercanos, conviene validar demanda y asegurarse de que cada URL tendrá contenido propio. Primero es mejor construir una página fuerte para Sevilla.",
  },
  {
    question: "¿Tiene sentido hacer SEO si ya tengo campañas de Google Ads?",
    answer:
      "Sí. Google Ads puede generar visibilidad inmediata, pero el SEO construye captación orgánica a medio plazo. Además, los datos de Ads pueden ayudar a decidir qué keywords y mensajes merece la pena trabajar en SEO.",
  },
  {
    question: "¿Podéis mejorar mi web actual o hay que hacer una nueva?",
    answer:
      "Podemos empezar revisando la web actual. Si tiene buena base, trabajamos sobre ella. Si la estructura, el mensaje o la parte técnica limitan el crecimiento, planteamos mejoras o un rediseño orientado a SEO y conversión.",
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
        name: "SEO Sevilla",
        item: "https://www.crecimientosincomplicaciones.com/seo/sevilla",
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Agencia SEO para empresas de Sevilla",
    serviceType: ["SEO Sevilla", "Consultoría SEO Sevilla", "SEO local Sevilla", "Posicionamiento web Sevilla"],
    provider: {
      "@type": "Organization",
      name: "Crecimiento sin complicaciones",
      url: "https://www.crecimientosincomplicaciones.com",
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Sevilla",
    },
    description:
      "Servicios SEO para empresas de Sevilla con auditoría SEO gratuita, SEO técnico, contenidos, arquitectura web y SEO local orientado a captar clientes.",
    makesOffer: {
      "@type": "Offer",
      name: "Auditoría SEO gratuita para empresas de Sevilla",
      availability: "https://schema.org/InStock",
      url: "https://www.crecimientosincomplicaciones.com/seo/sevilla",
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
  title: "Agencia SEO para empresas de Sevilla | Crecimiento sin complicaciones",
  description:
    "Servicios SEO para empresas de Sevilla. Auditoría SEO gratuita, SEO técnico, contenidos, arquitectura web y SEO local para captar más clientes desde Google.",
  keywords: [
    "agencia seo sevilla",
    "seo sevilla",
    "servicios seo sevilla",
    "consultoría seo sevilla",
    "seo local sevilla",
    "posicionamiento web sevilla",
    "seo para empresas en sevilla",
  ],
  alternates: {
    canonical: "/seo/sevilla",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Agencia SEO para empresas de Sevilla",
    description:
      "Auditoría SEO, SEO técnico, contenidos, arquitectura web y SEO local para captar más clientes desde Google.",
    url: "/seo/sevilla",
    siteName: "Crecimiento sin complicaciones",
    locale: "es_ES",
    type: "website",
  },
};

function CheckIcon() {
  return <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-blue-400" aria-hidden="true" strokeWidth={2} />;
}

export default function SeoSevillaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <div className="seo-sevilla-page landing-light min-h-screen bg-slate-950 text-slate-50">
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
              <LandingServicesMenu currentPath="/seo/sevilla" />
              <a className="landing-top-cta inline-flex min-h-11 shrink-0 items-center justify-center rounded-lg bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-blue-950/30 hover:bg-blue-500 focus-visible:ring-2 focus-visible:ring-blue-400" href="#auditoria-sevilla">
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
                <span>Sevilla</span>
              </nav>
              <p className="mb-4 text-sm font-black uppercase tracking-normal text-blue-400">
                AGENCIA SEO SEVILLA
              </p>
              <h1 id="hero-title" className="mb-6 max-w-4xl text-4xl font-black leading-[1.02] text-slate-900 sm:text-5xl lg:text-6xl">
                Agencia SEO para empresas de Sevilla que quieren captar más clientes desde Google
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-200">
                Ayudamos a pymes, negocios locales y empresas de servicios en Sevilla a mejorar su posicionamiento con
                una estrategia clara: auditoría técnica, keywords con intención comercial, contenido útil y páginas
                pensadas para generar contactos reales.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a className="inline-flex min-h-12 items-center justify-center rounded-lg bg-blue-600 px-6 py-3 font-bold text-white shadow-xl shadow-blue-950/40 hover:bg-blue-500 focus-visible:ring-2 focus-visible:ring-blue-400" href="#auditoria-sevilla">
                  Solicitar auditoría SEO gratuita
                </a>
                <Link className="inline-flex min-h-12 items-center justify-center rounded-lg border border-slate-700 px-6 py-3 font-bold text-slate-100 hover:bg-slate-900 focus-visible:ring-2 focus-visible:ring-blue-400" href="/seo">
                  Ver servicios SEO
                </Link>
              </div>
              <dl className="mt-10 grid gap-3 sm:grid-cols-3">
                {[
                  ["Mercado", "Servicios con confianza"],
                  ["Foco", "Comparación a contacto"],
                  ["Base", "Local, técnica y contenido"],
                ].map(([label, value]) => (
                  <div className="rounded-lg bg-white/5 p-5 ring-1 ring-white/10" key={label}>
                    <dt className="text-sm font-black uppercase text-blue-300">{label}</dt>
                    <dd className="mt-2 text-base font-bold leading-6 text-slate-100">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="seo-audit-panel rounded-lg bg-slate-900 p-6 shadow-2xl shadow-blue-950/30 ring-1 ring-slate-800" aria-label="Panel de estrategia SEO para Sevilla">
              <div className="seo-audit-panel-head mb-7 flex items-center justify-between gap-4 pb-5">
                <div className="seo-audit-panel-title">
                  <p className="text-sm font-black uppercase tracking-normal text-blue-400">Prioridad Sevilla</p>
                  <strong className="mt-2 block text-2xl font-black text-white">Confianza antes del contacto</strong>
                </div>
                <ShieldCheck className="seo-audit-panel-badge h-8 w-8 text-blue-300" aria-hidden="true" strokeWidth={1.8} />
              </div>
              <div className="seo-audit-step-grid grid gap-4">
                {[
                  ["Servicio claro", "Qué haces, para quién y por qué pedir presupuesto."],
                  ["Prueba y confianza", "Contenido que ayuda a comparar antes de llamar."],
                  ["Búsqueda local", "Ciudad, servicio e intención comercial bien conectadas."],
                  ["Conversión medible", "Llamadas, formularios y oportunidades reales."],
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
                En Sevilla, el SEO tiene que generar confianza antes del contacto
              </h2>
              <p className="mx-auto mt-6 max-w-4xl text-lg leading-8 text-slate-300">
                Muchos negocios de Sevilla dependen de que el cliente compare antes de llamar: clínicas, despachos,
                academias, reformas, estética, turismo, hostelería, inmobiliarias y servicios profesionales. Si tu web
                no explica bien qué haces, no aparece para búsquedas locales o no transmite confianza, Google puede
                traerte visitas que no terminan en oportunidades.
              </p>
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="local-difference-title">
            <div className="mx-auto max-w-5xl text-center">
              <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Diferenciación</p>
              <h2 id="local-difference-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                SEO local para pymes y servicios profesionales en Sevilla
              </h2>
              <p className="mx-auto mt-6 max-w-4xl text-lg leading-8 text-slate-300">
                No se trata solo de aparecer para “agencia SEO Sevilla”. La oportunidad está en ordenar tus páginas por
                servicio, intención y zona de captación, para que tu web responda a búsquedas reales de clientes que ya
                están comparando opciones.
              </p>
            </div>
          </section>

          <section id="estrategia" className="bg-slate-900 px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="strategy-title">
            <div className="mx-auto max-w-7xl">
              <div className="max-w-3xl">
                <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Qué trabajamos</p>
                <h2 id="strategy-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                  Qué trabajamos en una estrategia SEO para Sevilla
                </h2>
                <p className="mt-4 text-lg leading-8 text-slate-300">
                  Combinamos servicios SEO Sevilla, consultoría SEO Sevilla y SEO técnico para construir una base que
                  ayude a captar clientes locales, no solo visitas.
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
                Cómo trabajamos tu posicionamiento SEO en Sevilla
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
                  SEO para negocios donde la confianza decide la venta
                </h2>
                <p className="mt-5 text-lg leading-8 text-slate-300">
                  Esta estrategia encaja especialmente bien en clínicas, despachos legales, academias, centros de
                  estética, reformas, inmobiliarias, turismo, hostelería, consultorías, servicios B2B y negocios locales
                  que necesitan aparecer cuando el cliente está buscando proveedor.
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
                  SEO local en Sevilla frente a publicidad de pago
                </h2>
                <p className="mt-5 text-lg leading-8 text-slate-300">
                  Google Ads puede darte visibilidad inmediata, pero el SEO construye captación orgánica a medio plazo.
                  Además, los datos de Ads pueden ayudar a decidir qué keywords, servicios y mensajes merece la pena
                  trabajar en SEO local.
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
                Encaja Sevilla dentro de una estrategia SEO completa
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
                  ¿Quieres saber qué oportunidades SEO tiene tu empresa en Sevilla?
                </h2>
                <p className="mt-4 max-w-3xl text-lg leading-8 text-blue-50">
                  Analizamos tu web, tus servicios y tus búsquedas prioritarias para detectar qué páginas, mejoras
                  técnicas y acciones pueden ayudarte a captar más clientes desde Google.
                </p>
              </div>
              <a className="mt-6 inline-flex min-h-12 items-center justify-center rounded-lg bg-white px-6 py-3 font-black text-blue-700 hover:bg-blue-50 lg:mt-0" href="#auditoria-sevilla">
                Solicitar auditoría SEO gratuita
              </a>
            </div>
          </section>

          <section id="faq" className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="faq-title">
            <div className="max-w-3xl">
              <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">FAQ</p>
              <h2 id="faq-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                Preguntas frecuentes sobre SEO en Sevilla
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

          <section id="auditoria-sevilla" className="border-t border-slate-800 bg-slate-900 px-4 py-16 pb-28 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="final-cta-title">
            <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
              <div>
                <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Auditoría gratuita</p>
                <h2 id="final-cta-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                  Empieza con una auditoría SEO clara
                </h2>
                <p className="mt-5 text-lg leading-8 text-slate-300">
                  Revisamos tu web, tus servicios y tus oportunidades en Sevilla para decirte qué acciones tienen más
                  sentido ahora.
                </p>
                <div className="mt-8 grid gap-3">
                  {["Bloqueos técnicos y de estructura", "Búsquedas locales con intención comercial", "Páginas que generen confianza antes del contacto"].map((item) => (
                    <p className="flex gap-3 text-slate-200" key={item}>
                      <CheckIcon />
                      <span>{item}</span>
                    </p>
                  ))}
                </div>
              </div>
              <SeoAuditForm sourcePage="SEO Sevilla" defaultService="SEO Sevilla" />
            </div>
          </section>
        </main>

        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-800 bg-slate-950/95 p-3 backdrop-blur md:hidden">
          <a className="mx-auto flex min-h-12 max-w-md items-center justify-center rounded-lg bg-blue-600 px-5 py-3 font-black text-white shadow-lg shadow-blue-950/40" href="#auditoria-sevilla">
            Quiero mi auditoría gratuita
          </a>
        </div>
      </div>
    </>
  );
}
