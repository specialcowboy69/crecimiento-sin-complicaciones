import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Compass,
  MapPin,
  MousePointerClick,
  Search,
} from "lucide-react";
import { LandingServicesMenu } from "../../../components/LandingServicesMenu";
import { LeadForm } from "../../../components/LeadForm";
import { Logo } from "../../../components/Logo";
import { PageLinksNav } from "../../../components/PageLinksNav";
import { absoluteUrl } from "../../../lib/site";
import { ORGANIZATION_ID, breadcrumbJsonLd } from "../../../lib/structuredData";

const pagePath = "/agencia-marketing-digital/google-ads/alicante";
const pageUrl = absoluteUrl(pagePath);

const demandPrinciples = [
  {
    icon: Search,
    title: "Servicio antes que volumen",
    text: "Priorizamos búsquedas que describen una necesidad concreta, no términos amplios que consumen presupuesto sin contexto comercial.",
  },
  {
    icon: MapPin,
    title: "Zonas que el negocio realmente atiende",
    text: "La segmentación responde a tu cobertura operativa en Alicante y provincia, no a una lista de municipios añadida por inercia.",
  },
  {
    icon: BarChart3,
    title: "Calidad comercial después del formulario",
    text: "La lectura no termina en el envío: revisamos qué contactos encajan, qué preguntan y qué campañas los originan.",
  },
];

const serviceItems = [
  {
    title: "Búsquedas y términos comerciales",
    text: "Separamos consultas informativas de búsquedas donde ya existe intención de contratar, reservar o pedir presupuesto.",
  },
  {
    title: "Estructura por servicio y ubicación",
    text: "Organizamos campañas para comparar servicios, zonas y prioridades sin mezclar señales incompatibles.",
  },
  {
    title: "Anuncios conectados con la oferta",
    text: "Cada anuncio explica qué se ofrece, para quién y cuál es el siguiente paso esperado.",
  },
  {
    title: "Conversiones y calidad del lead",
    text: "Configuramos formularios y acciones útiles para interpretar la captación más allá del volumen de clics.",
  },
  {
    title: "Presupuesto con prioridades claras",
    text: "Concentramos inversión donde hay una hipótesis comercial concreta antes de ampliar campañas o cobertura.",
  },
  {
    title: "Optimización documentada",
    text: "Explicamos qué se cambia, qué evidencia lo motiva y qué necesitamos observar antes de la siguiente decisión.",
  },
];

const sectors = [
  {
    title: "Inmobiliaria y servicios para vivienda",
    text: "Oferta, radio de atención, tipo de inmueble y momento de decisión cambian la estructura de búsqueda.",
  },
  {
    title: "Turismo, hostelería y experiencias",
    text: "La estacionalidad, el origen del visitante y la disponibilidad requieren campañas y mensajes diferenciados.",
  },
  {
    title: "Clínicas y servicios profesionales",
    text: "La confianza, la especialidad y la proximidad pesan tanto como la keyword que activa el anuncio.",
  },
  {
    title: "Reformas y servicios locales",
    text: "Conviene separar urgencia, tipo de trabajo, zona atendida y capacidad real para responder solicitudes.",
  },
  {
    title: "Formación y academias",
    text: "Modalidad, calendario, nivel y ubicación ayudan a distinguir interés general de una matrícula posible.",
  },
  {
    title: "Empresas B2B",
    text: "Un contacto de valor suele exigir mensajes por solución, sector, rol decisor y ciclo comercial.",
  },
];

const journeyItems = [
  {
    title: "Mensaje local honesto",
    text: "La página explica la zona atendida sin fingir una oficina o una presencia física que no existe.",
  },
  {
    title: "Formulario de baja fricción",
    text: "Pedimos solo los datos necesarios para entender el negocio y preparar una primera conversación.",
  },
  {
    title: "Medición útil",
    text: "Relacionamos campaña, búsqueda y contacto para aprender qué demanda merece continuidad.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Auditoría de cuenta y recorrido",
    text: "Revisamos campañas, términos, anuncios, conversiones y el camino desde el clic hasta el contacto.",
  },
  {
    step: "02",
    title: "Mapa de servicios, zonas y conversiones",
    text: "Acordamos qué se quiere vender, dónde puede prestarse y qué acciones indican una oportunidad real.",
  },
  {
    step: "03",
    title: "Lanzamiento o reestructuración",
    text: "Creamos o reorganizamos campañas, anuncios, extensiones, negativas y páginas de destino.",
  },
  {
    step: "04",
    title: "Aprendizaje con datos suficientes",
    text: "Evitamos conclusiones precipitadas y damos tiempo a que búsquedas y conversiones formen una muestra útil.",
  },
  {
    step: "05",
    title: "Prioridades de optimización",
    text: "Ordenamos los siguientes ajustes según impacto probable, evidencia y capacidad comercial.",
  },
];

const auditPoints = [
  "Bloqueos de cuenta y tracking",
  "Búsquedas y zonas que conviene revisar",
  "Desajustes entre anuncio y landing",
  "Siguiente prueba recomendada",
];

const faqs = [
  {
    question: "¿Trabajáis con empresas de Alicante aunque no tengáis oficina allí?",
    answer:
      "Sí. Trabajamos de forma remota con empresas de toda España. Podemos gestionar campañas para negocios ubicados en Alicante o que venden en Alicante y su provincia, con reuniones y seguimiento online.",
  },
  {
    question: "¿Es lo mismo una agencia SEM en Alicante que una agencia Google Ads en Alicante?",
    answer:
      "Muchas búsquedas usan ambos términos para el mismo objetivo: captar demanda de pago en buscadores. En este servicio, la plataforma es Google Ads. Meta Ads es publicidad social y se estudia como un canal distinto.",
  },
  {
    question: "¿Qué campañas de Google Ads podéis gestionar?",
    answer:
      "La búsqueda suele ser el punto de partida cuando existe intención comercial clara. También podemos valorar remarketing, Performance Max u otros tipos de campaña si los objetivos, la medición y los recursos disponibles lo justifican.",
  },
  {
    question: "¿Necesito una landing específica para Alicante?",
    answer:
      "Solo si la intención local, la oferta y el contenido justifican una página propia. No recomendamos duplicar una landing cambiando la ciudad; la página debe explicar qué se vende, a quién, en qué zona y por qué el siguiente paso tiene sentido.",
  },
  {
    question: "¿Qué presupuesto necesito para Google Ads en Alicante?",
    answer:
      "No hay una cifra universal. Depende del sector, coste por clic, cobertura geográfica, número de servicios y volumen de datos necesario. La auditoría debe ayudar a concentrar el presupuesto antes de ampliarlo.",
  },
  {
    question: "¿Podéis revisar una cuenta que ya está activa?",
    answer:
      "Sí. Podemos revisar estructura, términos de búsqueda, anuncios, conversiones, ubicaciones, presupuesto y páginas de destino para identificar qué mantener, corregir o detener.",
  },
  {
    question: "¿Cuándo empezaré a conseguir leads?",
    answer:
      "Google Ads puede generar tráfico desde el lanzamiento, pero eso no garantiza leads rentables. El aprendizaje depende de la demanda, el presupuesto, la medición, la oferta y la landing page. No prometemos un plazo ni un coste por lead sin datos.",
  },
  {
    question: "¿También gestionáis Meta Ads?",
    answer:
      "Puede valorarse como un servicio separado, pero no lo llamamos SEM. Esta landing describe la captación en buscadores mediante Google Ads.",
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${pageUrl}#service`,
    name: "Agencia SEM y Google Ads para empresas de Alicante",
    serviceType: ["Agencia SEM Alicante", "Google Ads Alicante", "Gestión de campañas de búsqueda"],
    provider: {
      "@id": ORGANIZATION_ID,
    },
    areaServed: [
      { "@type": "City", name: "Alicante" },
      { "@type": "AdministrativeArea", name: "Provincia de Alicante" },
    ],
    url: pageUrl,
    description:
      "Gestión remota de Google Ads para empresas que venden en Alicante y su provincia, con campañas, landing pages y medición conectadas.",
  },
  breadcrumbJsonLd([
    { name: "Inicio", path: "/" },
    { name: "Agencia de marketing digital", path: "/agencia-marketing-digital" },
    { name: "Google Ads", path: "/agencia-marketing-digital/google-ads" },
    { name: "Alicante", path: pagePath },
  ]),
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
  title: "Agencia SEM Alicante para empresas",
  description:
    "Agencia SEM para empresas de Alicante. Gestionamos Google Ads con campañas, anuncios, landing pages y medición orientadas a captar oportunidades comerciales.",
  alternates: {
    canonical: pagePath,
  },
  openGraph: {
    title: "Agencia SEM y Google Ads para empresas de Alicante",
    description:
      "Campañas de Google Ads para empresas que venden en Alicante y su provincia, con estrategia, medición y páginas de destino conectadas.",
    url: pagePath,
    siteName: "Crecimiento sin complicaciones",
    locale: "es_ES",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

function CheckIcon() {
  return <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-emerald-500" aria-hidden="true" strokeWidth={2} />;
}

export default function GoogleAdsAlicantePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <div className="google-ads-page landing-light min-h-screen bg-slate-950 text-slate-50">
        <header className="sticky top-0 z-20 border-b border-slate-800 bg-slate-950/95 backdrop-blur">
          <nav
            className="mx-auto flex min-h-[72px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
            aria-label="Navegación principal"
          >
            <Link className="logo-link text-slate-50" href="/" aria-label="Crecimiento sin complicaciones, inicio">
              <Logo variant="light" />
            </Link>

            <div className="hidden items-center gap-2 text-sm font-semibold text-slate-300 lg:flex">
              <a className="rounded-md px-3 py-2 hover:bg-slate-900 hover:text-white" href="#servicio">
                Servicio
              </a>
              <a className="rounded-md px-3 py-2 hover:bg-slate-900 hover:text-white" href="#sectores">
                Sectores
              </a>
              <a className="rounded-md px-3 py-2 hover:bg-slate-900 hover:text-white" href="#metodo">
                Método
              </a>
              <a className="rounded-md px-3 py-2 hover:bg-slate-900 hover:text-white" href="#faq">
                FAQ
              </a>
            </div>

            <div className="mobile-header-links" aria-label="Enlaces rápidos">
              <a href="#servicio">Servicio</a>
              <a href="#metodo">Método</a>
            </div>

            <div className="flex items-center gap-3">
              <LandingServicesMenu currentPath={pagePath} />
              <a
                className="landing-top-cta inline-flex min-h-11 shrink-0 items-center justify-center rounded-lg bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-blue-950/30 hover:bg-blue-500 focus-visible:ring-2 focus-visible:ring-blue-400"
                href="#auditoria-google-ads-alicante"
              >
                Auditoría gratuita
              </a>
            </div>
          </nav>
        </header>

        <PageLinksNav currentPath={pagePath} />

        <main>
          <section
            className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_0.92fr] lg:px-8 lg:py-24"
            aria-labelledby="google-ads-alicante-title"
          >
            <div>
              <nav className="mb-5 flex flex-wrap items-center gap-2 text-sm font-bold text-slate-400" aria-label="Migas de pan">
                <Link className="hover:text-blue-300" href="/">Inicio</Link>
                <span aria-hidden="true">/</span>
                <Link className="hover:text-blue-300" href="/agencia-marketing-digital">Agencia de marketing digital</Link>
                <span aria-hidden="true">/</span>
                <Link className="hover:text-blue-300" href="/agencia-marketing-digital/google-ads">Google Ads</Link>
                <span aria-hidden="true">/</span>
                <span>Alicante</span>
              </nav>

              <p className="mb-4 text-sm font-black uppercase tracking-normal text-emerald-500">
                Google Ads para empresas de Alicante
              </p>
              <h1 id="google-ads-alicante-title" className="marketing-hero-title mb-6 max-w-4xl font-black text-slate-900">
                Agencia SEM para empresas de Alicante que quieren captar demanda con Google Ads
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-200">
                Planificamos y optimizamos campañas de Google Ads para pymes y empresas que venden en Alicante y su
                provincia. Priorizamos búsquedas con intención comercial, conectamos anuncios y landing pages, y medimos
                contactos para saber qué campañas merecen más atención y presupuesto.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  className="inline-flex min-h-12 items-center justify-center rounded-lg bg-blue-600 px-6 py-3 font-bold text-white shadow-xl shadow-blue-950/40 hover:bg-blue-500 focus-visible:ring-2 focus-visible:ring-blue-400"
                  href="#auditoria-google-ads-alicante"
                >
                  Solicitar auditoría gratuita
                </a>
                <Link
                  className="inline-flex min-h-12 items-center justify-center rounded-lg border border-slate-700 px-6 py-3 font-bold text-slate-100 hover:bg-slate-900 focus-visible:ring-2 focus-visible:ring-blue-400"
                  href="/agencia-marketing-digital/google-ads"
                >
                  Ver servicio nacional de Google Ads
                </Link>
              </div>
            </div>

            <aside className="seo-audit-panel rounded-lg bg-slate-900 p-6 shadow-2xl shadow-blue-950/30 ring-1 ring-slate-800" aria-label="Resumen del servicio">
              <div className="seo-audit-panel-head mb-6 flex items-center justify-between gap-4 pb-5">
                <div className="seo-audit-panel-title">
                  <p className="text-sm font-black uppercase tracking-normal text-emerald-400">Campaña local</p>
                  <strong className="mt-2 block text-2xl font-black text-white">Alicante con intención</strong>
                </div>
                <Compass className="h-9 w-9 text-emerald-400" aria-hidden="true" strokeWidth={1.8} />
              </div>
              <dl className="grid gap-4">
                {[
                  ["Área", "Alicante y provincia"],
                  ["Plataforma", "Google Ads"],
                  ["Objetivo", "Oportunidades comerciales"],
                ].map(([term, description]) => (
                  <div className="seo-audit-step rounded-lg bg-slate-950 p-5 ring-1 ring-slate-800" key={term}>
                    <dt className="text-sm font-black uppercase text-emerald-400">{term}</dt>
                    <dd className="mt-2 text-lg font-black text-white">{description}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          </section>

          <section className="border-y border-slate-800 bg-slate-900 px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="demand-title">
            <div className="mx-auto max-w-7xl">
              <div className="max-w-4xl">
                <p className="mb-3 text-sm font-black uppercase tracking-normal text-emerald-500">Demanda en Alicante</p>
                <h2 id="demand-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                  Una campaña local necesita separar servicio, zona e intención
                </h2>
                <p className="mt-5 text-lg leading-8 text-slate-300">
                  Una búsqueda informativa no vale lo mismo que una solicitud de presupuesto. Antes de ampliar tráfico,
                  ordenamos qué servicios tienen prioridad, qué zonas puede atender el negocio y qué señales distinguen
                  un contacto útil de una consulta sin encaje.
                </p>
              </div>
              <div className="mt-10 grid gap-5 md:grid-cols-3">
                {demandPrinciples.map((item) => (
                  <article className="rounded-lg bg-slate-950 p-6 ring-1 ring-slate-800" key={item.title}>
                    <item.icon className="h-7 w-7 text-emerald-400" aria-hidden="true" strokeWidth={1.8} />
                    <h3 className="!mt-6 text-xl font-black text-slate-900">{item.title}</h3>
                    <p className="mt-3 leading-7 text-slate-300">{item.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section id="servicio" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="service-title">
            <div className="max-w-4xl">
              <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Servicio</p>
              <h2 id="service-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                Una estrategia SEM en Alicante centrada en Google Ads
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-300">
                Entendemos SEM como captación pagada en buscadores. En esta página hablamos de Google Ads; Meta Ads es
                publicidad social y se valora como un canal distinto cuando el negocio lo necesita.
              </p>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {serviceItems.map((item, index) => (
                <article className="rounded-lg bg-white/5 p-6 ring-1 ring-white/10" key={item.title}>
                  <span className="text-sm font-black text-blue-400">0{index + 1}</span>
                  <h3 className="!mt-5 text-xl font-black text-slate-900">{item.title}</h3>
                  <p className="mt-3 leading-7 text-slate-300">{item.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="sectores" className="bg-slate-900 px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="sectors-title">
            <div className="mx-auto max-w-7xl">
              <div className="max-w-4xl">
                <p className="mb-3 text-sm font-black uppercase tracking-normal text-emerald-500">Escenarios comerciales</p>
                <h2 id="sectors-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                  Sectores de Alicante donde la intención de búsqueda cambia la campaña
                </h2>
                <p className="mt-5 text-lg leading-8 text-slate-300">
                  Son escenarios de adaptación, no una lista de clientes ni resultados. Cada sector exige revisar cómo
                  se expresa la demanda, qué información necesita el usuario y qué contacto puede atender el negocio.
                </p>
              </div>
              <div className="mt-10 grid gap-x-8 gap-y-7 md:grid-cols-2 lg:grid-cols-3">
                {sectors.map((sector) => (
                  <article className="border-l-2 border-emerald-500 pl-5" key={sector.title}>
                    <h3 className="text-xl font-black text-slate-900">{sector.title}</h3>
                    <p className="mt-3 leading-7 text-slate-300">{sector.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section id="zona" className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.86fr_1.14fr] lg:px-8 lg:py-24" aria-labelledby="area-title">
            <div>
              <p className="mb-3 text-sm font-black uppercase tracking-normal text-emerald-500">Alicante y provincia</p>
              <h2 id="area-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                Segmentación geográfica sin prometer cobertura donde no existe
              </h2>
            </div>
            <div>
              <p className="text-lg leading-8 text-slate-300">
                La campaña puede concentrarse en Alicante ciudad o ampliarse a Elche, Benidorm, Torrevieja, Orihuela,
                San Vicente del Raspeig u otros municipios cuando el negocio realmente los atiende. No abrimos campañas
                ni landings por municipio solo para repetir keywords: primero validamos demanda, capacidad comercial y
                una oferta específica.
              </p>
              <p className="mt-5 flex gap-3 rounded-lg bg-emerald-50 p-5 font-semibold leading-7 text-emerald-950 ring-1 ring-emerald-200">
                <MapPin className="mt-0.5 h-5 w-5 flex-none" aria-hidden="true" />
                El servicio se presta de forma remota; la segmentación describe el mercado atendido, no una sede física.
              </p>
            </div>
          </section>

          <section className="border-y border-slate-800 bg-slate-900 px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="journey-title">
            <div className="mx-auto max-w-7xl">
              <div className="max-w-4xl">
                <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Del clic al contacto</p>
                <h2 id="journey-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                  La campaña no termina en el anuncio
                </h2>
                <p className="mt-5 text-lg leading-8 text-slate-300">
                  Revisamos mensaje, estructura, llamada a la acción, formulario y medición para que la promesa del
                  anuncio continúe en la página y el equipo pueda valorar la calidad del contacto.
                </p>
              </div>
              <div className="mt-10 grid gap-5 md:grid-cols-3">
                {journeyItems.map((item) => (
                  <article className="rounded-lg bg-slate-950 p-6 ring-1 ring-slate-800" key={item.title}>
                    <MousePointerClick className="h-7 w-7 text-blue-400" aria-hidden="true" strokeWidth={1.8} />
                    <h3 className="!mt-6 text-xl font-black text-slate-900">{item.title}</h3>
                    <p className="mt-3 leading-7 text-slate-300">{item.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section id="metodo" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="method-title">
            <div className="max-w-4xl">
              <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Método</p>
              <h2 id="method-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                Cómo trabajamos una campaña de Google Ads para Alicante
              </h2>
            </div>
            <ol className="mt-10 grid gap-4">
              {processSteps.map((item) => (
                <li className="grid gap-4 rounded-lg bg-white/5 p-6 ring-1 ring-white/10 sm:grid-cols-[4rem_1fr]" key={item.step}>
                  <span className="text-3xl font-black text-blue-400">{item.step}</span>
                  <div>
                    <h3 className="text-xl font-black text-slate-900">{item.title}</h3>
                    <p className="mt-2 leading-7 text-slate-300">{item.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section className="bg-blue-600 px-4 py-16 text-white sm:px-6 lg:px-8" aria-labelledby="audit-expectations-title">
            <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
              <div>
                <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-100">Auditoría</p>
                <h2 id="audit-expectations-title" className="text-3xl font-black text-white sm:text-4xl">
                  Qué puedes esperar de la auditoría gratuita
                </h2>
                <p className="mt-5 text-lg leading-8 text-blue-50">
                  Una lectura inicial para decidir si el principal bloqueo está en la cuenta, la medición, la oferta o la
                  landing. No es una promesa de rentabilidad, coste por lead o volumen de contactos.
                </p>
              </div>
              <ul className="grid gap-3">
                {auditPoints.map((point) => (
                  <li className="flex gap-3 rounded-lg bg-white/10 p-4 font-semibold text-white ring-1 ring-white/20" key={point}>
                    <CheckIcon />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="related-title">
            <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
              <div>
                <p className="mb-3 text-sm font-black uppercase tracking-normal text-emerald-500">Servicios relacionados</p>
                <h2 id="related-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                  Conecta campaña, visibilidad y conversión
                </h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Link className="group rounded-lg bg-slate-950 p-5 ring-1 ring-slate-800 hover:bg-slate-900" href="/agencia-marketing-digital/google-ads">
                  <h3 className="text-lg font-black text-slate-900">gestión de Google Ads para empresas</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">Alcance nacional y servicio completo.</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-blue-400">
                    Ver página <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </Link>
                <Link className="group rounded-lg bg-slate-950 p-5 ring-1 ring-slate-800 hover:bg-slate-900" href="/seo/alicante">
                  <h3 className="text-lg font-black text-slate-900">SEO para empresas de Alicante</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">Captación orgánica en el mercado local.</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-blue-400">
                    Ver página <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </Link>
                <Link className="group rounded-lg bg-slate-950 p-5 ring-1 ring-slate-800 hover:bg-slate-900" href="/diseno-landing-pages">
                  <h3 className="text-lg font-black text-slate-900">diseño de landing pages</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">Páginas preparadas para convertir la demanda.</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-blue-400">
                    Ver página <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </Link>
                <Link className="group rounded-lg bg-slate-950 p-5 ring-1 ring-slate-800 hover:bg-slate-900" href="/agencia-marketing-digital">
                  <h3 className="text-lg font-black text-slate-900">agencia de marketing digital</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">Visión conjunta de canales, web y medición.</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-blue-400">
                    Ver página <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </Link>
              </div>
            </div>
          </section>

          <section id="faq" className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="faq-title">
            <div className="max-w-3xl">
              <p className="mb-3 text-sm font-black uppercase tracking-normal text-emerald-500">FAQ</p>
              <h2 id="faq-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                Preguntas frecuentes sobre SEM y Google Ads en Alicante
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
            id="auditoria-google-ads-alicante"
            sourcePage="Google Ads Alicante"
            interestedService="Google Ads"
            title="Revisemos tus campañas para captar demanda en Alicante"
            description="Analizamos la cuenta, las búsquedas, los anuncios, la medición y las landing pages para priorizar los ajustes con más sentido para tu negocio."
            points={["Cuenta y términos de búsqueda", "Conversiones y calidad del lead", "Prioridades de optimización"]}
            buttonLabel="Solicitar auditoría gratuita"
          />
        </main>

        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-800 bg-slate-950/95 p-3 backdrop-blur md:hidden">
          <a
            className="mx-auto flex min-h-12 max-w-md items-center justify-center rounded-lg bg-blue-600 px-5 py-3 font-black text-white shadow-lg shadow-blue-950/40"
            href="#auditoria-google-ads-alicante"
          >
            Solicitar auditoría gratuita
          </a>
        </div>
      </div>
    </>
  );
}
