import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Gauge,
  LineChart,
  Megaphone,
  MousePointerClick,
  Search,
  Target,
  Wrench,
} from "lucide-react";
import { LandingServicesMenu } from "../../components/LandingServicesMenu";
import { LeadForm } from "../../components/LeadForm";
import { Logo } from "../../components/Logo";
import { PageLinksNav } from "../../components/PageLinksNav";
import { SITE_URL } from "../../lib/site";

const pagePath = "/agencia-marketing-digital/google-ads";
const baseUrl = SITE_URL;

const heroBullets = [
  "Campañas de búsqueda, remarketing y conversión",
  "Revisión de cuenta, tracking y landing pages",
  "Informes claros orientados a leads y coste por oportunidad",
];

const solutionBlocks = [
  {
    icon: Search,
    title: "Intención y keywords comerciales",
    text: "Separamos búsquedas informativas de consultas donde ya existe intención de contacto o presupuesto.",
  },
  {
    icon: Target,
    title: "Estructura por servicio",
    text: "Ordenamos campañas por servicio, ciudad o tipo de cliente para que el presupuesto no se diluya.",
  },
  {
    icon: Megaphone,
    title: "Anuncios orientados a conversión",
    text: "Redactamos mensajes que conectan búsqueda, problema, propuesta y siguiente paso.",
  },
  {
    icon: Wrench,
    title: "Conversiones bien configuradas",
    text: "Revisamos formularios, llamadas, eventos y objetivos para decidir con datos fiables.",
  },
  {
    icon: Gauge,
    title: "Optimización de presupuesto",
    text: "Ajustamos pujas, términos de búsqueda y distribución de inversión según calidad del lead.",
  },
  {
    icon: MousePointerClick,
    title: "Landing pages y formularios",
    text: "Detectamos si la campaña pierde oportunidades por una página lenta, confusa o poco convincente.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Auditoría inicial",
    text: "Revisamos cuenta, inversión, campañas, tracking, landing pages y oportunidades rápidas.",
  },
  {
    step: "02",
    title: "Plan de campaña",
    text: "Definimos servicios prioritarios, keywords, estructura, presupuesto y objetivos de conversión.",
  },
  {
    step: "03",
    title: "Lanzamiento o reestructuración",
    text: "Creamos o ajustamos campañas, anuncios, extensiones, audiencias y medición.",
  },
  {
    step: "04",
    title: "Optimización continua",
    text: "Analizamos términos de búsqueda, coste por lead, calidad del tráfico y rendimiento de cada campaña.",
  },
  {
    step: "05",
    title: "Informe accionable",
    text: "Explicamos qué se ha aprendido, qué se cambia y qué conviene probar después.",
  },
];

const audiences = [
  "Empresas que ya invierten en Ads y no tienen claridad.",
  "Negocios que quieren empezar con Google Ads sin improvisar.",
  "Equipos que necesitan apoyo externo sin contratar un especialista interno.",
  "Webs que reciben tráfico pero convierten poco.",
];

const relatedLinks = [
  {
    href: "/seo",
    title: "Agencia SEO",
    text: "Para construir captación orgánica mientras Ads acelera aprendizaje.",
  },
  {
    href: "/diseno-pagina-web-profesional",
    title: "Diseño web profesional",
    text: "Cuando la campaña necesita una web más clara para convertir visitas en contactos.",
  },
  {
    href: "/diseno-landing-pages",
    title: "Diseño de landing pages",
    text: "Para mejorar mensajes, CTAs y formularios antes de subir inversión.",
  },
  {
    href: "/agencia-marketing-digital",
    title: "Marketing digital",
    text: "La visión completa: web, SEO, Ads, redes, CRO, analítica e IA conectadas.",
  },
];

const faqs = [
  {
    question: "¿Cuánto cobra una agencia Google Ads?",
    answer:
      "Depende del tamaño de la cuenta, número de campañas, inversión mensual y nivel de seguimiento necesario. Lo correcto es valorar primero si necesitas una campaña sencilla, una reestructuración o una gestión mensual completa.",
  },
  {
    question: "¿Qué presupuesto mínimo necesito para Google Ads?",
    answer:
      "Depende del sector y del coste por clic. Para servicios competitivos, conviene empezar con un presupuesto que permita recoger datos suficientes sin dispersarse en demasiadas campañas.",
  },
  {
    question: "¿Google Ads funciona mejor que SEO?",
    answer:
      "No compiten exactamente. Google Ads puede generar visibilidad más rápido, mientras que el SEO construye captación orgánica a medio plazo. La combinación suele ser más fuerte cuando cada canal tiene un papel claro.",
  },
  {
    question: "¿Podéis revisar una cuenta que ya está funcionando?",
    answer:
      "Sí. Podemos auditar campañas existentes, revisar estructura, términos de búsqueda, conversiones, anuncios, presupuesto y páginas de destino.",
  },
  {
    question: "¿Trabajáis solo campañas de búsqueda?",
    answer:
      "La prioridad suele ser búsqueda cuando hay intención comercial clara, pero también podemos valorar remarketing, Performance Max u otras campañas si tienen sentido para el negocio.",
  },
  {
    question: "¿También revisáis la landing page?",
    answer:
      "Sí. Una campaña puede estar bien configurada y aun así perder leads por una página poco clara, lenta o sin una propuesta convincente.",
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
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Agencia de marketing digital",
        item: `${baseUrl}/agencia-marketing-digital`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Agencia Google Ads",
        item: `${baseUrl}${pagePath}`,
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Agencia Google Ads para empresas",
    serviceType: [
      "Agencia Google Ads",
      "Gestión Google Ads",
      "Campañas Google Ads",
      "Publicidad en Google",
      "Agencia SEM",
    ],
    provider: {
      "@type": "Organization",
      name: "Crecimiento sin complicaciones",
      url: baseUrl,
    },
    areaServed: "ES",
    url: `${baseUrl}${pagePath}`,
    description:
      "Gestión de campañas de Google Ads para empresas que quieren captar leads cualificados, medir mejor sus resultados y reducir inversión desperdiciada.",
    makesOffer: {
      "@type": "Offer",
      name: "Auditoría gratuita de Google Ads",
      availability: "https://schema.org/InStock",
      url: `${baseUrl}${pagePath}`,
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
  title: "Agencia Google Ads para empresas",
  description:
    "Gestionamos campañas de Google Ads para empresas que quieren captar leads cualificados, medir mejor sus resultados y reducir inversión desperdiciada. Solicita una auditoría gratuita.",
  keywords: [
    "agencia google ads",
    "agencia sem",
    "gestión google ads",
    "campañas google ads",
    "publicidad en google",
    "google ads para empresas",
  ],
  alternates: {
    canonical: pagePath,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Agencia Google Ads para empresas",
    description:
      "Campañas de Google Ads conectadas con estrategia, medición y conversión para captar mejores leads.",
    url: pagePath,
    siteName: "Crecimiento sin complicaciones",
    locale: "es_ES",
    type: "website",
  },
};

function CheckIcon() {
  return <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-blue-400" aria-hidden="true" strokeWidth={2} />;
}

export default function GoogleAdsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <div className="google-ads-page landing-light min-h-screen bg-slate-950 text-slate-50">
        <header className="sticky top-0 z-20 border-b border-slate-800 bg-slate-950/95 backdrop-blur">
          <nav
            className="mx-auto flex min-h-[72px] max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8"
            aria-label="Navegación principal"
          >
            <Link className="logo-link text-slate-50" href="/" aria-label="Crecimiento sin complicaciones, inicio">
              <Logo variant="light" />
            </Link>

            <div className="hidden items-center gap-2 text-sm font-semibold text-slate-300 lg:flex">
              <a className="rounded-md px-3 py-2 hover:bg-slate-900 hover:text-white" href="#solucion">
                Solución
              </a>
              <a className="rounded-md px-3 py-2 hover:bg-slate-900 hover:text-white" href="#proceso">
                Método
              </a>
              <a className="rounded-md px-3 py-2 hover:bg-slate-900 hover:text-white" href="#para-quien">
                Para quién
              </a>
              <a className="rounded-md px-3 py-2 hover:bg-slate-900 hover:text-white" href="#faq">
                FAQ
              </a>
            </div>

            <div className="mobile-header-links" aria-label="Enlaces rápidos">
              <a href="#solucion">Solución</a>
              <a href="#proceso">Método</a>
            </div>

            <div className="flex items-center gap-3">
              <LandingServicesMenu currentPath={pagePath} />
              <a
                className="landing-top-cta inline-flex min-h-11 shrink-0 items-center justify-center rounded-lg bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-blue-950/30 hover:bg-blue-500 focus-visible:ring-2 focus-visible:ring-blue-400"
                href="#auditoria-google-ads"
              >
                Solicitar auditoría gratuita
              </a>
            </div>
          </nav>
        </header>

        <PageLinksNav currentPath={pagePath} />

        <main>
          <section
            className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_0.95fr] lg:px-8 lg:py-24"
            aria-labelledby="google-ads-hero-title"
          >
            <div>
              <nav className="mb-5 flex items-center gap-2 text-sm font-bold text-slate-400" aria-label="Migas de pan">
                <Link className="hover:text-blue-300" href="/">
                  Inicio
                </Link>
                <span aria-hidden="true">/</span>
                <Link className="hover:text-blue-300" href="/agencia-marketing-digital">
                  Marketing digital
                </Link>
                <span aria-hidden="true">/</span>
                <span>Google Ads</span>
              </nav>

              <p className="mb-4 text-sm font-black uppercase tracking-normal text-blue-400">Agencia Google Ads</p>
              <h1
                id="google-ads-hero-title"
                className="marketing-hero-title mb-6 max-w-4xl font-black text-slate-900"
              >
                Agencia Google Ads para captar leads sin desperdiciar presupuesto
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-200">
                Creamos, revisamos y optimizamos campañas de Google Ads para empresas que quieren generar oportunidades
                comerciales con control, medición y una estrategia clara. No se trata solo de activar anuncios: se trata
                de saber qué búsquedas atraen clientes, qué mensajes convierten y dónde merece la pena invertir.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  className="inline-flex min-h-12 items-center justify-center rounded-lg bg-blue-600 px-6 py-3 font-bold text-white shadow-xl shadow-blue-950/40 hover:bg-blue-500 focus-visible:ring-2 focus-visible:ring-blue-400"
                  href="#auditoria-google-ads"
                >
                  Solicitar auditoría gratuita
                </a>
                <Link
                  className="inline-flex min-h-12 items-center justify-center rounded-lg border border-slate-700 px-6 py-3 font-bold text-slate-100 hover:bg-slate-900 focus-visible:ring-2 focus-visible:ring-blue-400"
                  href="/agencia-marketing-digital"
                >
                  Ver servicios de marketing digital
                </Link>
              </div>

              <div className="mt-8 grid gap-3">
                {heroBullets.map((bullet) => (
                  <p className="flex gap-3 text-slate-200" key={bullet}>
                    <CheckIcon />
                    <span>{bullet}</span>
                  </p>
                ))}
              </div>
            </div>

            <div
              className="seo-audit-panel rounded-lg bg-slate-900 p-6 shadow-2xl shadow-blue-950/30 ring-1 ring-slate-800"
              aria-label="Sistema de gestión de Google Ads"
            >
              <div className="seo-audit-panel-head mb-7 flex items-center justify-between gap-4 pb-5">
                <div className="seo-audit-panel-title">
                  <p className="text-sm font-black uppercase tracking-normal text-blue-400">Sistema Ads</p>
                  <strong className="mt-2 block text-2xl font-black text-white">De clics a oportunidades</strong>
                </div>
                <span className="seo-audit-panel-badge rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-black uppercase text-emerald-300 ring-1 ring-emerald-300/20">
                  Medible
                </span>
              </div>

              <div className="grid gap-4">
                {[
                  ["Búsquedas", "Palabras clave con intención comercial y negativos bien controlados."],
                  ["Anuncios", "Mensajes conectados con oferta, objeciones y llamada a la acción."],
                  ["Landing", "Página de destino preparada para convertir sin fricción innecesaria."],
                  ["Medición", "Conversiones, coste por lead y calidad comercial en el mismo cuadro."],
                ].map(([title, text]) => (
                  <article className="seo-audit-step rounded-lg bg-slate-950 p-5 ring-1 ring-slate-800" key={title}>
                    <h3 className="m-0 text-lg font-black text-white">{title}</h3>
                    <p className="mt-2 text-sm leading-[1.6] text-slate-300">{text}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section
            className="border-y border-slate-800 bg-slate-900 px-4 py-16 sm:px-6 lg:px-8"
            aria-labelledby="problem-title"
          >
            <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:items-center">
              <div>
                <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">El problema</p>
                <h2 id="problem-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                  Invertir en Google sin una estructura clara sale caro
                </h2>
              </div>
              <p className="text-lg leading-8 text-slate-300">
                Muchas empresas llegan a Google Ads después de probar campañas que consumen presupuesto pero no explican
                qué está pasando. Palabras clave demasiado amplias, anuncios genéricos, conversiones mal configuradas o
                landing pages que no convierten pueden hacer que una campaña parezca poco rentable cuando el problema
                real está en el sistema.
              </p>
            </div>
          </section>

          <section
            id="solucion"
            className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
            aria-labelledby="solution-title"
          >
            <div className="max-w-3xl">
              <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Solución</p>
              <h2 id="solution-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                Gestión de Google Ads conectada con estrategia, datos y conversión
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-300">
                Trabajamos Google Ads como parte del sistema comercial: intención de búsqueda, propuesta de valor,
                anuncios, página de destino, medición y seguimiento. Así cada decisión tiene una razón: captar mejores
                clics, mejorar la conversión y reducir inversión desperdiciada.
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {solutionBlocks.map((item) => (
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

          <section
            id="proceso"
            className="bg-slate-900 px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
            aria-labelledby="process-title"
          >
            <div className="mx-auto max-w-7xl">
              <div className="max-w-3xl">
                <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Método</p>
                <h2 id="process-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                  Cómo trabajamos tus campañas de Google Ads
                </h2>
              </div>

              <div className="mt-10 grid gap-4">
                {processSteps.map((step) => (
                  <article
                    className="grid gap-4 rounded-lg bg-white/5 p-6 ring-1 ring-white/10 sm:grid-cols-[4rem_1fr]"
                    key={step.step}
                  >
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

          <section
            id="para-quien"
            className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
            aria-labelledby="audience-title"
          >
            <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
              <div>
                <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Para quién es</p>
                <h2 id="audience-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                  Para empresas que quieren leads, no solo clics
                </h2>
                <p className="mt-5 text-lg leading-8 text-slate-300">
                  Este servicio encaja especialmente si vendes servicios profesionales, tienes una pyme, una empresa
                  local, una startup o un negocio B2B que necesita convertir búsquedas con intención en contactos
                  comerciales.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {audiences.map((item) => (
                  <p
                    className="flex gap-3 rounded-lg bg-slate-950 p-5 text-base font-semibold leading-7 text-slate-300 ring-1 ring-slate-800"
                    key={item}
                  >
                    <CheckIcon />
                    <span>{item}</span>
                  </p>
                ))}
              </div>
            </div>
          </section>

          <section
            className="border-y border-slate-800 bg-slate-900 px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
            aria-labelledby="difference-title"
          >
            <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.86fr_1.14fr]">
              <div>
                <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Diferenciación</p>
                <h2 id="difference-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                  Google Ads funciona mejor cuando no trabaja solo
                </h2>
                <p className="mt-5 text-lg leading-8 text-slate-300">
                  La diferencia está en conectar las campañas con el resto del sistema: SEO, diseño web, landing pages,
                  formularios, analítica y automatizaciones. Si la landing no explica bien la oferta o no se mide
                  correctamente, la campaña pierde fuerza. Por eso no miramos solo el panel de Google Ads: revisamos el
                  recorrido completo hasta el lead.
                </p>
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                {relatedLinks.map((item) => (
                  <Link
                    className="group rounded-lg bg-slate-950 p-6 ring-1 ring-slate-800 hover:bg-white/5"
                    href={item.href}
                    key={item.href}
                  >
                    <LineChart className="h-7 w-7 text-blue-300" aria-hidden="true" strokeWidth={1.8} />
                    <h3 className="!mt-7 text-xl font-black text-slate-900">{item.title}</h3>
                    <p className="mt-3 text-sm leading-[1.65] text-slate-300">{item.text}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-blue-300">
                      Ver página
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section
            className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
            aria-labelledby="middle-cta-title"
          >
            <div className="rounded-lg bg-blue-600 p-8 text-white shadow-2xl shadow-blue-950/30 lg:grid lg:grid-cols-[1fr_auto] lg:items-center lg:gap-8">
              <div>
                <h2 id="middle-cta-title" className="text-3xl font-black text-white sm:text-4xl">
                  ¿Quieres saber si tus campañas pueden rendir mejor?
                </h2>
                <p className="mt-4 max-w-3xl text-lg leading-8 text-blue-50">
                  Podemos revisar tu situación actual y decirte qué ajustaríamos primero: campañas, tracking, anuncios,
                  landing page o presupuesto.
                </p>
              </div>
              <a
                className="mt-6 inline-flex min-h-12 items-center justify-center rounded-lg bg-white px-6 py-3 font-black text-blue-700 hover:bg-blue-50 lg:mt-0"
                href="#auditoria-google-ads"
              >
                Solicitar auditoría gratuita
              </a>
            </div>
          </section>

          <section
            id="faq"
            className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
            aria-labelledby="faq-title"
          >
            <div className="max-w-3xl">
              <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">FAQ</p>
              <h2 id="faq-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                Preguntas frecuentes sobre Google Ads
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

          <LeadForm
            id="auditoria-google-ads"
            sourcePage="Agencia Google Ads"
            interestedService="Google Ads"
            title="Revisemos tus campañas antes de invertir más"
            description="Analizamos estructura, keywords, anuncios, conversiones y landing page para detectar dónde se está perdiendo presupuesto y qué conviene ajustar primero."
            points={["Cuenta y tracking", "Calidad de leads", "Plan de optimización"]}
            buttonLabel="Solicitar auditoría gratuita"
          />
        </main>

        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-800 bg-slate-950/95 p-3 backdrop-blur md:hidden">
          <a
            className="mx-auto flex min-h-12 max-w-md items-center justify-center rounded-lg bg-blue-600 px-5 py-3 font-black text-white shadow-lg shadow-blue-950/40"
            href="#auditoria-google-ads"
          >
            Solicitar auditoría gratuita
          </a>
        </div>
      </div>
    </>
  );
}
