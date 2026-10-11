import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  BarChart3,
  CheckCircle2,
  GitBranch,
  MapPin,
  Settings2,
  Target,
} from "lucide-react";
import { LandingServicesMenu } from "../components/LandingServicesMenu";
import { Logo } from "../components/Logo";
import { SeoAuditForm } from "../components/SeoAuditForm";
import styles from "./seo.module.css";

const systemStages = [
  {
    icon: Settings2,
    number: "01",
    title: "SEO técnico",
    text: "Indexación, velocidad, estructura, rastreo y señales que ayudan a Google a entender bien tu web.",
  },
  {
    icon: GitBranch,
    number: "02",
    title: "Arquitectura SEO",
    text: "Páginas money, clusters de contenido y enlazado interno para ordenar la autoridad hacia las URLs que venden.",
  },
  {
    icon: Target,
    number: "03",
    title: "Contenido con intención",
    text: "Keywords que atraen clientes potenciales, no solo visitas: servicios, problemas, comparativas y búsquedas locales.",
  },
  {
    icon: BarChart3,
    number: "04",
    title: "Medición",
    text: "Rankings, leads, conversiones y prioridades mensuales para decidir qué hacer después con criterio.",
  },
];

const serviceItems = [
  "Auditoría SEO inicial con prioridades por impacto y esfuerzo.",
  "Keyword research y mapa de intención de búsqueda.",
  "Optimización de páginas clave para servicios SEO y captación.",
  "Creación de clusters de contenido conectados con páginas de decisión.",
  "SEO local si tu empresa vende en una zona concreta.",
  "Tracking, informes y prioridades mensuales para pymes y equipos internos.",
];

const process = [
  {
    step: "01",
    title: "Auditoría inicial",
    text: "Revisamos indexación, arquitectura, contenidos, velocidad, intención de búsqueda y oportunidades comerciales.",
    output: "Diagnóstico priorizado",
  },
  {
    step: "02",
    title: "Mapa de oportunidades",
    text: "Separamos quick wins, páginas money, clusters y mejoras técnicas para que sepas qué mueve la aguja.",
    output: "Plan de acción",
  },
  {
    step: "03",
    title: "Correcciones técnicas y arquitectura",
    text: "Priorizamos rastreo, enlazado interno, estructura de URLs, canibalizaciones y señales de confianza.",
    output: "Base rastreable",
  },
  {
    step: "04",
    title: "Contenido y enlazado interno",
    text: "Creamos o mejoramos páginas pensadas para captar demanda real y llevarla hacia contacto comercial.",
    output: "Páginas con intención",
  },
  {
    step: "05",
    title: "Medición y mejora continua",
    text: "Convertimos datos de Google Search Console, analítica y leads en nuevas prioridades de trabajo.",
    output: "Siguientes prioridades",
  },
];

const audiences = [
  { label: "Sin tracción", text: "Una web que no aparece para las búsquedas que importan al negocio." },
  { label: "Tráfico sin contactos", text: "Visitas orgánicas que no se convierten en solicitudes de presupuesto." },
  { label: "Dependencia de Ads", text: "Una pyme que quiere construir un canal de captación orgánica estable." },
  { label: "Equipo con poco margen", text: "Marketing interno que necesita apoyo técnico, contenidos y medición." },
];

const relatedSeoLinks = [
  {
    href: "/seo/local",
    title: "SEO local para negocios",
    text: "Coordinamos tu perfil de Google, el contenido, las reseñas y el SEO de tu web para facilitar que te encuentren y contacten en tu zona.",
  },
  {
    href: "/seo-para-pymes",
    title: "SEO para pymes",
    text: "Una página específica para empresas pequeñas que necesitan priorizar captación, SEO local y acciones claras.",
  },
  {
    href: "/agencia-marketing-digital/seo-tecnico-arquitectura-entidades",
    title: "SEO técnico y arquitectura",
    text: "El enfoque técnico para ordenar rastreo, entidades, silos y estructura de contenidos.",
  },
];

const cityLinks = [
  { href: "/seo/madrid", label: "SEO en Madrid" },
  { href: "/seo/barcelona", label: "SEO en Barcelona" },
  { href: "/seo/valencia", label: "SEO en Valencia" },
  { href: "/seo/sevilla", label: "SEO en Sevilla" },
  { href: "/seo/alicante", label: "SEO en Alicante" },
  { href: "/seo/malaga", label: "SEO en Málaga" },
];

const faqs = [
  {
    question: "¿Cuánto tarda el SEO en dar resultados?",
    answer:
      "Depende de la autoridad del dominio, competencia, estado técnico y velocidad de implementación. Lo habitual es ver señales iniciales en 6-10 semanas y consolidar resultados entre 3 y 6 meses.",
  },
  {
    question: "¿Qué incluye una auditoría SEO?",
    answer:
      "Incluye revisión técnica, indexación, arquitectura, contenidos, intención de búsqueda, oportunidades de keywords, medición y una hoja de ruta priorizada para mejorar captación.",
  },
  {
    question: "¿Trabajáis SEO local?",
    answer:
      "Sí. Cuando el negocio vende por zona, trabajamos páginas locales, búsquedas por ciudad, enlazado interno y señales de confianza sin afirmar presencia física donde no exista.",
  },
  {
    question: "¿Es mejor SEO o Google Ads?",
    answer:
      "No siempre compiten. Google Ads puede acelerar aprendizaje y captación inmediata; el SEO construye visibilidad orgánica más estable. La auditoría ayuda a decidir qué canal priorizar según tu situación.",
  },
  {
    question: "¿Puedo contratar solo una auditoría?",
    answer:
      "Sí. Podemos entregar una auditoría SEO independiente con diagnóstico, prioridades y hoja de ruta aunque luego la implementación la haga tu equipo.",
  },
  {
    question: "¿Qué diferencia hay entre SEO técnico y contenido SEO?",
    answer:
      "El SEO técnico facilita que Google rastree, entienda e indexe la web. El contenido SEO responde a búsquedas reales y convierte esa visibilidad en visitas cualificadas y oportunidades comerciales.",
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
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Agencia SEO para empresas",
    serviceType: ["Search Engine Optimization", "Consultoría SEO", "SEO técnico", "SEO local"],
    provider: {
      "@type": "Organization",
      name: "Crecimiento sin complicaciones",
      url: "https://www.crecimientosincomplicaciones.com",
    },
    areaServed: "ES",
    description:
      "Agencia SEO para pymes y empresas con auditoría SEO, consultoría SEO, SEO técnico, arquitectura de contenidos y posicionamiento web orientado a leads.",
    makesOffer: {
      "@type": "Offer",
      name: "Auditoría SEO gratuita",
      availability: "https://schema.org/InStock",
      url: "https://www.crecimientosincomplicaciones.com/seo",
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
  title: "Agencia SEO para empresas",
  description:
    "Agencia SEO para pymes y empresas. Auditoría SEO, estrategia SEO, SEO técnico y posicionamiento web para captar más clientes desde Google.",
  keywords: [
    "agencia seo",
    "agencia seo para empresas",
    "seo para pymes",
    "servicios seo",
    "consultoría seo",
    "seo técnico",
    "posicionamiento web para empresas",
  ],
  alternates: {
    canonical: "/seo",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Agencia SEO para empresas",
    description:
      "Auditoría SEO, arquitectura web, contenidos y medición para captar tráfico cualificado desde Google.",
    url: "/seo",
    siteName: "Crecimiento sin complicaciones",
    locale: "es_ES",
    type: "website",
  },
};

function CheckIcon() {
  return <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-blue-400" aria-hidden="true" strokeWidth={2} />;
}

export default function SeoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <div className="seo-page landing-light min-h-screen bg-slate-950 text-slate-50">
        <header className="sticky top-0 z-20 border-b border-slate-800 bg-slate-950/95 backdrop-blur">
          <nav className="mx-auto flex min-h-[72px] max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8" aria-label="Navegación principal">
            <Link className="logo-link text-slate-50" href="/" aria-label="Crecimiento sin complicaciones, inicio">
              <Logo variant="light" />
            </Link>
            <div className="hidden items-center gap-2 text-sm font-semibold text-slate-300 lg:flex">
              <a className="rounded-md px-3 py-2 hover:bg-slate-900 hover:text-white" href="#servicio">Servicio</a>
              <a className="rounded-md px-3 py-2 hover:bg-slate-900 hover:text-white" href="#proceso">Proceso</a>
              <a className="rounded-md px-3 py-2 hover:bg-slate-900 hover:text-white" href="#seo-local">SEO local</a>
              <a className="rounded-md px-3 py-2 hover:bg-slate-900 hover:text-white" href="#faq">FAQ</a>
            </div>
            <div className="mobile-header-links" aria-label="Enlaces rápidos">
              <a href="#servicio">Servicio</a>
              <a href="#proceso">Proceso</a>
            </div>
            <div className="flex items-center gap-3">
              <LandingServicesMenu currentPath="/seo" mobileAuditHref="#audit-request" />
              <a className="landing-top-cta inline-flex min-h-11 shrink-0 items-center justify-center rounded-lg bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-blue-950/30 hover:bg-blue-500 focus-visible:ring-2 focus-visible:ring-blue-400" href="#auditoria-seo">
                <span className="hidden sm:inline">Auditoría gratuita</span>
                <span className="sm:hidden">Auditoría</span>
              </a>
            </div>
          </nav>
        </header>

        <main>
          <section className={styles.hero} aria-labelledby="seo-hero-title">
            <Image
              src="/images/seo-hero-editorial.webp"
              alt=""
              fill
              sizes="100vw"
              fetchPriority="high"
              className={styles.heroImage}
            />
            <div className={styles.heroContent}>
              <nav className={styles.heroBreadcrumbs} aria-label="Migas de pan">
                <Link href="/">Inicio</Link>
                <span aria-hidden="true">/</span>
                <span>SEO</span>
              </nav>
              <p className={styles.heroEyebrow}>Agencia SEO para empresas</p>
              <h1 id="seo-hero-title" className={styles.heroTitle}>
                Agencia SEO para empresas que quieren captar más clientes desde Google
              </h1>
              <p className={styles.heroDescription}>
                Auditamos tu web, detectamos qué está frenando tu posicionamiento y construimos una hoja de ruta SEO
                clara: técnica, contenidos, arquitectura e intención de búsqueda conectadas con negocio.
              </p>
              <div className={styles.heroActions}>
                <a className={styles.heroPrimary} href="#auditoria-seo">
                  Solicitar auditoría SEO gratuita
                </a>
                <a className={styles.heroSecondary} href="#proceso">
                  Ver cómo trabajamos el SEO
                </a>
              </div>
            </div>
          </section>

          <section className={styles.diagnosis} aria-labelledby="problem-title">
            <div className={styles.sectionInner}>
              <div className={styles.diagnosisIntro}>
                <div>
                  <p className={styles.eyebrow}>El diagnóstico</p>
                  <h2 id="problem-title">Tener tráfico no significa tener oportunidades</h2>
                </div>
                <p>
                  Publicar más contenidos, cambiar títulos o comprar enlaces no corrige una estrategia dispersa.
                  El problema suele estar en algún punto del recorrido entre lo que se busca y la decisión de contactar.
                </p>
              </div>
              <ol className={styles.diagnosisFlow} aria-label="Puntos donde se pierde la oportunidad comercial">
                <li>
                  <span>01 / Demanda</span>
                  <h3>¿Te encuentran las personas adecuadas?</h3>
                  <p>Separamos búsquedas informativas de consultas con intención de contratar.</p>
                </li>
                <li>
                  <span>02 / Recorrido</span>
                  <h3>¿La web les ayuda a decidir?</h3>
                  <p>Ordenamos páginas, enlaces y mensajes para evitar canibalizaciones y callejones sin salida.</p>
                </li>
                <li>
                  <span>03 / Resultado</span>
                  <h3>¿Sabes qué acaba en contacto?</h3>
                  <p>Conectamos visibilidad y posiciones con formularios, llamadas y oportunidades reales.</p>
                </li>
              </ol>
              <p className={styles.diagnosisConclusion}>
                No buscamos tráfico sin más. Cada prioridad SEO debe explicar qué mejora, para quién y cómo acerca una conversación comercial.
              </p>
            </div>
          </section>

          <section id="servicio" className={styles.systemSection} aria-labelledby="solution-title">
            <div className={styles.sectionInner}>
              <div className={styles.systemIntro}>
                <p className={styles.eyebrow}>El sistema</p>
                <h2 id="solution-title">Cuatro piezas que trabajan juntas</h2>
                <p>El posicionamiento mejora cuando técnica, estructura, contenido y medición responden a la misma intención comercial.</p>
              </div>
              <ol className={styles.systemFlow}>
                {systemStages.map((stage) => (
                  <li key={stage.title}>
                    <div className={styles.systemMarker}>
                      <span>{stage.number}</span>
                      <stage.icon size={25} strokeWidth={1.8} aria-hidden="true" />
                    </div>
                    <h3>{stage.title}</h3>
                    <p>{stage.text}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <section className="bg-slate-900 px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="includes-title">
            <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.82fr_1.18fr]">
              <div>
                <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Qué incluye</p>
                <h2 id="includes-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                  Qué hacemos como agencia SEO
                </h2>
                <p className="mt-5 text-lg leading-8 text-slate-300">
                  Combinamos servicios SEO, consultoría SEO y ejecución técnica para que el plan avance sin convertirse
                  en un informe que nadie implementa.
                </p>
                <Link className="mt-6 inline-flex min-h-12 items-center justify-center rounded-lg border border-slate-700 px-6 py-3 font-bold text-slate-100 hover:bg-slate-900 focus-visible:ring-2 focus-visible:ring-blue-400" href="/agencia-marketing-digital/seo-tecnico-arquitectura-entidades">
                  Ver SEO técnico y arquitectura
                </Link>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {serviceItems.map((item) => (
                  <p className="flex gap-3 rounded-lg bg-slate-950 p-5 text-base font-semibold leading-7 text-slate-300 ring-1 ring-slate-800" key={item}>
                    <CheckIcon />
                    <span>{item}</span>
                  </p>
                ))}
              </div>
            </div>
          </section>

          <section id="proceso" className={styles.processSection} aria-labelledby="process-title">
            <div className={styles.sectionInner}>
              <div className={styles.processIntro}>
                <p className={styles.eyebrow}>Proceso</p>
                <h2 id="process-title">Del diagnóstico a la siguiente decisión</h2>
                <p>Cada etapa deja un resultado que permite avanzar con criterio, no solo una lista de tareas completadas.</p>
              </div>
              <ol className={styles.processTimeline}>
                {process.map((step) => (
                  <li key={step.step}>
                    <span className={styles.processNumber}>{step.step}</span>
                    <div>
                      <h3>{step.title}</h3>
                      <p>{step.text}</p>
                    </div>
                    <span className={styles.processOutput}>{step.output}</span>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <section className={styles.audienceSection} aria-labelledby="audience-title">
            <div className={styles.sectionInner}>
              <div className={styles.audienceIntro}>
                <p className={styles.eyebrow}>Para quién es</p>
                <h2 id="audience-title">Distintos puntos de partida. Un mismo criterio comercial.</h2>
              </div>
              <div className={styles.audienceRoutes}>
                {audiences.map((item, index) => (
                  <article key={item.label}>
                    <span aria-hidden="true">0{index + 1}</span>
                    <div>
                      <h3>{item.label}</h3>
                      <p>{item.text}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="related-seo-title">
            <div className="max-w-3xl">
              <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Recursos SEO</p>
              <h2 id="related-seo-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                Enfoques SEO según el punto de partida de tu empresa
              </h2>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {relatedSeoLinks.map((item) => (
                <Link className="rounded-lg bg-white/5 p-6 ring-1 ring-white/10 hover:bg-slate-900" href={item.href} key={item.href}>
                  <h3 className="text-xl font-black text-slate-900">{item.title}</h3>
                  <p className="mt-3 text-sm leading-[1.65] text-slate-300">{item.text}</p>
                </Link>
              ))}
            </div>
          </section>

          <section id="seo-local" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="local-title">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">SEO local</p>
                <h2 id="local-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                  También trabajamos SEO local por ciudad
                </h2>
                <p className="mt-5 text-lg leading-8 text-slate-300">
                  Si tu negocio vende en una zona concreta, podemos trabajar páginas locales, búsquedas por ciudad y
                  señales de confianza para captar clientes en mercados como Madrid, Barcelona, Valencia, Sevilla,
                  Alicante o Málaga.
                </p>
              </div>
              <div className="grid content-start gap-4 sm:grid-cols-2">
                {cityLinks.map((city) => (
                  <Link className="flex min-h-20 items-center gap-4 rounded-lg bg-white/5 p-5 font-black text-slate-100 ring-1 ring-white/10 hover:bg-slate-900" href={city.href} key={city.href}>
                    <MapPin className="h-5 w-5 flex-none text-blue-300" aria-hidden="true" strokeWidth={1.8} />
                    <span>{city.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section id="faq" className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="faq-title">
            <div className="max-w-3xl">
              <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">FAQ</p>
              <h2 id="faq-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                Preguntas frecuentes sobre SEO para empresas
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

          <section id="auditoria-seo" className={`${styles.auditSection} border-t border-slate-800 bg-slate-900 px-4 py-16 pb-28 sm:px-6 lg:px-8 lg:py-24`} aria-labelledby="cta-title">
            <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
              <div>
                <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Auditoría gratuita</p>
                <h2 id="cta-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                  Empieza con una auditoría SEO clara
                </h2>
                <p className="mt-5 text-lg leading-8 text-slate-300">
                  Revisamos tu web, detectamos oportunidades reales y te damos una hoja de ruta priorizada para mejorar
                  visibilidad, captación y conversión.
                </p>
                <div className="mt-8 grid gap-3">
                  {["Revisión de indexación y SEO técnico", "Mapa de keywords con intención comercial", "Prioridades para los próximos 90 días"].map((item) => (
                    <p className="flex gap-3 text-slate-200" key={item}>
                      <CheckIcon />
                      <span>{item}</span>
                    </p>
                  ))}
                </div>
              </div>
              <SeoAuditForm contactDark={false} />
            </div>
          </section>
        </main>

        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-800 bg-slate-950/95 p-3 backdrop-blur md:hidden">
          <a className="mx-auto flex min-h-12 max-w-md items-center justify-center rounded-lg bg-blue-600 px-5 py-3 font-black text-white shadow-lg shadow-blue-950/40" href="tel:+34604990651" aria-label="Llamar al 604 990 651">
            Llamar
          </a>
        </div>
      </div>
    </>
  );
}
