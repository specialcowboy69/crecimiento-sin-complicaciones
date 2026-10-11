import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  ClipboardCheck,
  FileText,
  LineChart,
  MousePointerClick,
  Route,
  Sparkles,
  Target,
} from "lucide-react";

import { LandingServicesMenu } from "../components/LandingServicesMenu";
import { LeadForm } from "../components/LeadForm";
import { Logo } from "../components/Logo";
import { SITE_URL } from "../lib/site";
import styles from "./landing-pages.module.css";

const pagePath = "/diseno-landing-pages";
const pageUrl = `${SITE_URL}${pagePath}`;
const primaryCtaClass =
  "inline-flex min-h-14 items-center justify-center rounded-lg bg-blue-600 px-6 py-4 text-base font-black text-white shadow-lg shadow-blue-950/20 transition hover:bg-blue-500 focus-visible:ring-2 focus-visible:ring-blue-400";
export const metadata: Metadata = {
  title: "Diseño de landing pages para captar leads",
  description:
    "Diseñamos landing pages para campañas, servicios y negocios que necesitan convertir visitas en leads. Mensaje claro, diseño, medición y formularios listos.",
  alternates: {
    canonical: pagePath,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Diseño de landing pages para captar leads",
    description:
      "Landing pages profesionales para convertir tráfico de campañas y servicios en oportunidades comerciales medibles.",
    url: pagePath,
    siteName: "Crecimiento sin complicaciones",
    locale: "es_ES",
    type: "website",
  },
};

const anatomyPoints = [
  { number: "01", title: "Oferta difusa", text: "El mensaje no deja claro qué problema resuelve la oferta." },
  { number: "02", title: "Valor sin contexto", text: "La página recibe tráfico, pero no explica por qué actuar ahora." },
  { number: "03", title: "Contacto con fricción", text: "Los formularios piden demasiado pronto o no filtran bien." },
  { number: "04", title: "Resultado invisible", text: "No hay medición fiable para saber qué campaña, sección o CTA genera leads." },
];

const solutionMoments = [
  {
    number: "01",
    label: "Mensaje",
    title: "Que la oferta se entienda",
    text: "Ordenamos propuesta, beneficios y objeciones en una secuencia clara para campañas de Google Ads, servicios y lanzamientos.",
    detail: "Copy y estructura de conversión",
  },
  {
    number: "02",
    label: "Acción",
    title: "Que contactar sea el paso natural",
    text: "Diseñamos CTAs, formularios y microcopy con foco en claridad, experiencia móvil y calidad del contacto.",
    detail: "Diseño, formulario y rendimiento",
  },
  {
    number: "03",
    label: "Aprendizaje",
    title: "Que cada campaña enseñe algo",
    text: "Conectamos eventos, origen del tráfico y leads para revisar qué funciona y priorizar mejoras con datos reales.",
    detail: "Analítica e iteración",
  },
];

const audience = [
  "Empresas que invierten en campañas y quieren convertir más sin subir presupuesto.",
  "Negocios B2B que necesitan explicar servicios complejos de forma sencilla.",
  "Equipos comerciales que quieren recibir leads con más contexto y mejor intención.",
  "Marcas que lanzan una oferta nueva y necesitan una página enfocada en respuesta.",
];

const includes = [
  {
    title: "Guion de página",
    text: "Orden de titulares, argumentos, objeciones y llamadas a la acción.",
  },
  {
    title: "Diseño y desarrollo",
    text: "Página adaptable a escritorio y móvil, con lectura y carga cuidadas.",
  },
  {
    title: "Captación configurada",
    text: "Campos, validación y confirmación del envío preparados para recibir consultas.",
  },
  {
    title: "Mapa de medición",
    text: "Eventos y fuentes definidos para leer el rendimiento comercial de la página.",
  },
];

const process = [
  {
    step: "01",
    title: "Diagnóstico",
    text: "Revisamos oferta, tráfico, competencia, embudo actual y objetivo comercial.",
  },
  {
    step: "02",
    title: "Arquitectura",
    text: "Definimos la estructura de la landing, mensajes clave y puntos de decisión.",
  },
  {
    step: "03",
    title: "Diseño y desarrollo",
    text: "Construimos la página con copy, diseño, formulario y experiencia móvil.",
  },
  {
    step: "04",
    title: "Medición y mejora",
    text: "Conectamos eventos, revisamos datos iniciales y proponemos iteraciones.",
  },
];

const relatedLinks = [
  {
    href: "/agencia-marketing-digital",
    title: "Agencia de marketing digital",
    text: "Estrategia global para unir tráfico, conversión, medición y ventas.",
  },
  {
    href: "/agencia-marketing-digital/google-ads",
    title: "Agencia Google Ads",
    text: "Campañas de búsqueda, captación y optimización conectadas con landing pages.",
  },
  {
    href: "/seo",
    title: "Agencia SEO",
    text: "Tráfico orgánico cualificado para páginas de servicio y captación.",
  },
  {
    href: "/diseno-pagina-web-profesional",
    title: "Diseño web profesional",
    text: "Webs completas para empresas que necesitan presencia, claridad y leads.",
  },
];

const faqs = [
  {
    question: "¿Qué es una landing page?",
    answer:
      "Es una página enfocada en una acción concreta, como pedir información, reservar una llamada, descargar un recurso o solicitar presupuesto.",
  },
  {
    question: "¿En qué se diferencia de una página web normal?",
    answer:
      "Una web suele explicar la empresa completa. Una landing page elimina caminos secundarios y organiza el contenido para que una oferta concreta convierta mejor.",
  },
  {
    question: "¿Sirve para campañas de Google Ads?",
    answer:
      "Sí. De hecho, una landing bien diseñada ayuda a que el tráfico de pago tenga una experiencia más coherente con el anuncio y sea más fácil medir resultados.",
  },
  {
    question: "¿Podéis mejorar una landing que ya tengo?",
    answer:
      "Sí. Podemos auditar la página actual, detectar fricciones y plantear mejoras de mensaje, estructura, diseño, formulario y medición.",
  },
  {
    question: "¿Incluye textos o solo diseño?",
    answer:
      "Incluye estructura y textos orientados a conversión. El diseño se trabaja a partir de ese mensaje para que la página no sea solo estética.",
  },
  {
    question: "¿Cuánto cuesta diseñar una landing page?",
    answer:
      "Depende del alcance, la cantidad de secciones, el nivel de copy, integraciones y medición. La auditoría inicial nos ayuda a acotar el trabajo con sentido.",
  },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Diseño de landing pages",
  serviceType: "Diseño de landing pages para captar leads",
  provider: {
    "@type": "Organization",
    name: "Crecimiento Sin Complicaciones",
    url: SITE_URL,
  },
  areaServed: {
    "@type": "Country",
    name: "España",
  },
  url: pageUrl,
  description:
    "Diseño de landing pages profesionales para campañas, servicios y captación de leads con copy, diseño, formularios y medición.",
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/InStock",
    url: pageUrl,
  },
};

const faqSchema = {
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
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Inicio",
      item: SITE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Agencia de marketing digital",
      item: `${SITE_URL}/agencia-marketing-digital`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Diseño de landing pages",
      item: pageUrl,
    },
  ],
};

export default function DisenoLandingPagesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="landing-light min-h-screen bg-slate-950 text-slate-50">
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
              <a className="rounded-md px-3 py-2 hover:bg-slate-900 hover:text-white" href="#incluye">
                Incluye
              </a>
              <a className="rounded-md px-3 py-2 hover:bg-slate-900 hover:text-white" href="#proceso">
                Proceso
              </a>
              <a className="rounded-md px-3 py-2 hover:bg-slate-900 hover:text-white" href="#faq">
                FAQ
              </a>
            </div>

            <div className="mobile-header-links" aria-label="Enlaces rápidos">
              <a href="#solucion">Solución</a>
              <a href="#incluye">Incluye</a>
            </div>

            <div className="flex items-center gap-3">
              <LandingServicesMenu currentPath={pagePath} mobileAuditHref="#audit-request" />
              <a
                className="landing-top-cta inline-flex min-h-11 shrink-0 items-center justify-center rounded-lg bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-blue-950/30 hover:bg-blue-500 focus-visible:ring-2 focus-visible:ring-blue-400"
                href="#auditoria-landing-pages-form"
              >
                Solicitar auditoría gratuita
              </a>
            </div>
          </nav>
        </header>

        <main>
      <section className={styles.hero} aria-labelledby="landing-hero-title">
        <Image
          src="/images/landing-pages-hero-editorial.webp"
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
            <Link href="/agencia-marketing-digital">Marketing digital</Link>
            <span aria-hidden="true">/</span>
            <span>Landing pages</span>
          </nav>
          <p className={styles.heroEyebrow}>Diseño de landing pages</p>
          <h1 id="landing-hero-title" className={styles.heroTitle}>
            Diseño de landing pages para convertir visitas en leads
          </h1>
          <p className={styles.heroDescription}>
            Creamos páginas para campañas, servicios y lanzamientos que explican la oferta con claridad,
            reducen fricción y convierten el tráfico en oportunidades medibles.
          </p>
          <div className={styles.heroActions}>
            <a className={styles.heroPrimary} href="#auditoria-landing-pages-form">
              Solicitar auditoría gratuita
            </a>
            <Link className={styles.heroSecondary} href="/agencia-marketing-digital">
              Ver servicios de marketing digital
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.anatomySection} id="problema" aria-labelledby="landing-problem-title">
        <div className={styles.sectionInner}>
          <div className={styles.anatomyIntro}>
            <p className={styles.eyebrow}>El problema</p>
            <h2 id="landing-problem-title">Una landing bonita no siempre convierte</h2>
            <p>Una página puede verse correcta y perder la decisión en cuatro puntos: oferta, valor, contacto y medición.</p>
          </div>
          <div className={styles.landingAnatomy}>
            <figure className={styles.anatomyFigure}>
              <div className={styles.anatomyBrowser} aria-hidden="true"><span /><span /><span /></div>
              <div className={styles.anatomyPage}>
                <div><span>01 / Oferta</span><strong>Entender la propuesta</strong></div>
                <div><span>02 / Valor</span><strong>Encontrar una razón para elegir</strong></div>
                <div><span>03 / Acción</span><strong>Dar el siguiente paso</strong></div>
                <div><span>04 / Medición</span><strong>Saber qué ocurrió después</strong></div>
              </div>
              <figcaption>Cuatro decisiones que una landing debe facilitar antes de pedir el contacto.</figcaption>
            </figure>
            <ol className={styles.anatomyNotes}>
              {anatomyPoints.map((point) => (
                <li key={point.number}>
                  <span>{point.number}</span>
                  <div><h3>{point.title}</h3><p>{point.text}</p></div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className={styles.solutionSection} id="solucion" aria-labelledby="landing-solution-title">
        <div className={styles.sectionInner}>
          <div className={styles.solutionIntro}>
            <p className={styles.eyebrow}>La solución</p>
            <h2 id="landing-solution-title">Una página que conecta mensaje, acción y aprendizaje</h2>
            <p>Trabajamos la landing como parte del sistema comercial, desde la primera frase hasta lo que aprendemos de cada contacto.</p>
          </div>
          <ol className={styles.solutionMoments}>
            {solutionMoments.map((moment) => (
              <li key={moment.number}>
                <span className={styles.momentNumber}>{moment.number}</span>
                <div>
                  <span className={styles.momentLabel}>{moment.label}</span>
                  <h3>{moment.title}</h3>
                  <p>{moment.text}</p>
                </div>
                <span className={styles.momentDetail}>{moment.detail}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-band border-y border-slate-200 bg-slate-100" id="para-quien">
        <div className="mx-auto grid max-w-[1520px] gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[0.9fr_1fr] lg:px-8 lg:py-24">
          <div>
            <p className="section-eyebrow mb-6">PARA QUIÉN</p>
            <h2 className="marketing-section-title text-slate-900">
              Para empresas que necesitan que el tráfico haga algo
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-700">
              Una landing page tiene sentido cuando quieres concentrar la
              atención en una oferta concreta y medir si el tráfico se convierte
              en oportunidades reales.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {audience.map((item) => (
              <div key={item} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <Target className="mb-4 h-6 w-6 text-teal-700" aria-hidden="true" />
                <p className="text-lg font-bold leading-7 text-slate-800">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white" id="incluye">
        <div className="mx-auto grid max-w-[1520px] gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[0.72fr_1fr] lg:px-8 lg:py-24">
          <div>
            <p className="section-eyebrow mb-6">QUÉ TRABAJAMOS</p>
            <h2 className="marketing-section-title text-slate-900">Entregables para ponerla en marcha</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {includes.map((item) => (
              <article key={item.title} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <ClipboardCheck className="mb-5 h-7 w-7 text-teal-700" aria-hidden="true" />
                <h3 className="text-2xl font-black text-slate-900">{item.title}</h3>
                <p className="mt-3 text-base leading-7 text-slate-700">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-band border-y border-slate-200 bg-slate-100" id="proceso">
        <div className="mx-auto max-w-[1520px] px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          <div className="max-w-5xl">
            <p className="section-eyebrow mb-6">PROCESO</p>
            <h2 className="marketing-section-title text-slate-900">
              Cómo creamos tu landing page
            </h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {process.map((step) => (
              <article key={step.step} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600 text-lg font-black text-white">
                  {step.step}
                </div>
                <h3 className="text-2xl font-black text-slate-900">{step.title}</h3>
                <p className="mt-3 text-base leading-7 text-slate-700">{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white" id="relacionados">
        <div className="mx-auto max-w-[1520px] px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[0.78fr_1fr]">
            <div>
              <p className="section-eyebrow mb-6">SERVICIOS RELACIONADOS</p>
              <h2 className="marketing-section-title text-slate-900">
                Conecta la landing con el resto del sistema
              </h2>
              <p className="mt-6 text-lg leading-8 text-slate-700">
                Una landing page funciona mejor cuando está alineada con la
                campaña, el SEO, la web principal y la medición comercial.
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {relatedLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
                >
                  <Route className="mb-5 h-7 w-7 text-teal-700" aria-hidden="true" />
                  <h3 className="text-2xl font-black text-slate-900">{link.title}</h3>
                  <p className="mt-3 text-base leading-7 text-slate-700">{link.text}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-black uppercase text-blue-700">
                    Ver servicio
                    <ChevronRight
                      className="h-4 w-4 transition group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-band border-y border-slate-200 bg-slate-100" id="faq">
        <div className="mx-auto max-w-[1200px] px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          <p className="section-eyebrow mb-6">FAQ</p>
          <h2 className="marketing-section-title text-slate-900">
            Preguntas frecuentes sobre diseño de landing pages
          </h2>
          <div className="mt-10 space-y-4">
            {faqs.map((faq) => (
              <details key={faq.question} className="group rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-xl font-black text-slate-900">
                  {faq.question}
                  <ChevronRight
                    className="h-5 w-5 shrink-0 transition group-open:rotate-90"
                    aria-hidden="true"
                  />
                </summary>
                <p className="mt-4 text-base leading-7 text-slate-700">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white" id="auditoria-landing-pages">
        <div className="mx-auto grid max-w-[1520px] gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[0.8fr_1fr] lg:px-8 lg:py-24">
          <div>
            <p className="section-eyebrow mb-6">AUDITORÍA GRATUITA</p>
            <h2 className="marketing-section-title text-slate-900">
              ¿Quieres saber si tu landing puede convertir mejor?
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-700">
              Revisamos tu oferta, página actual o campaña prevista y te damos
              una lectura clara de qué mejorar para captar leads con menos
              fricción.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                { icon: FileText, text: "Diagnóstico de mensaje y estructura" },
                { icon: MousePointerClick, text: "Revisión de CTA y formulario" },
                { icon: LineChart, text: "Lectura de medición y oportunidades" },
                { icon: Sparkles, text: "Plan de mejoras priorizado" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.text}
                    className="flex items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4"
                  >
                    <Icon className="mt-1 h-5 w-5 shrink-0 text-teal-700" aria-hidden="true" />
                    <p className="font-bold text-slate-800">{item.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <LeadForm
            id="auditoria-landing-pages-form"
            title="Revisemos tu landing antes de invertir más tráfico"
            description="Cuéntanos qué estás promocionando y te diremos qué mejorar para captar leads con más claridad."
            sourcePage="Diseño de landing pages"
            interestedService="Landing pages"
          />
        </div>
      </section>

        </main>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 p-3 shadow-2xl backdrop-blur lg:hidden">
        <a className={`${primaryCtaClass} w-full justify-center`} href="tel:+34604990651" aria-label="Llamar al 604 990 651">
          Llamar
        </a>
      </div>
      </div>
    </>
  );
}
