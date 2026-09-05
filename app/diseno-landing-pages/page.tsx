import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  BarChart3,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  FileText,
  FormInput,
  Gauge,
  LayoutTemplate,
  LineChart,
  MessageSquareText,
  MousePointerClick,
  Route,
  Sparkles,
  Target,
  TestTube2,
} from "lucide-react";

import { LandingServicesMenu } from "../components/LandingServicesMenu";
import { LeadForm } from "../components/LeadForm";
import { Logo } from "../components/Logo";
import { PageLinksNav } from "../components/PageLinksNav";
import { SITE_URL } from "../lib/site";

const pagePath = "/diseno-landing-pages";
const pageUrl = `${SITE_URL}${pagePath}`;
const primaryCtaClass =
  "inline-flex min-h-14 items-center justify-center rounded-lg bg-blue-600 px-6 py-4 text-base font-black text-white shadow-lg shadow-blue-950/20 transition hover:bg-blue-500 focus-visible:ring-2 focus-visible:ring-blue-400";
const secondaryCtaClass =
  "inline-flex min-h-14 items-center justify-center rounded-lg border border-slate-200 bg-white px-6 py-4 text-base font-black text-slate-900 shadow-sm transition hover:border-blue-200 hover:text-blue-700 focus-visible:ring-2 focus-visible:ring-blue-400";

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

const landingChecks = [
  "Landing pages para campañas de Google Ads, servicios y lanzamientos",
  "Copy, diseño, formularios y analítica conectados",
  "Estructura clara para explicar la oferta y reducir fricción",
];

const problemPoints = [
  "El mensaje no deja claro qué problema resuelve la oferta.",
  "Los formularios piden demasiado pronto o no filtran bien.",
  "La página recibe tráfico, pero no explica por qué actuar ahora.",
  "No hay medición fiable para saber qué campaña, sección o CTA genera leads.",
];

const solutionBlocks = [
  {
    icon: MessageSquareText,
    title: "Mensaje de oferta",
    text: "Ordenamos la propuesta, objeciones y beneficios para que el usuario entienda rápido si la solución encaja.",
  },
  {
    icon: LayoutTemplate,
    title: "Estructura de conversión",
    text: "Diseñamos una secuencia clara: contexto, valor, prueba, detalle, formulario y siguiente paso.",
  },
  {
    icon: FormInput,
    title: "Captación de leads",
    text: "Planteamos formularios, CTAs y microcopys pensados para reducir dudas sin bajar la calidad del contacto.",
  },
  {
    icon: BarChart3,
    title: "Analítica conectada",
    text: "Preparamos eventos y medición para leer leads, coste, intención y rendimiento por fuente de tráfico.",
  },
  {
    icon: TestTube2,
    title: "Optimización continua",
    text: "Priorizamos mejoras con datos reales: titulares, bloques, formularios, CTAs y señales de confianza.",
  },
  {
    icon: Gauge,
    title: "Rendimiento técnico",
    text: "Cuidamos velocidad, claridad visual y experiencia móvil para no perder conversiones por fricción básica.",
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
    title: "Copy y jerarquía",
    text: "Titulares, argumentos, objeciones, prueba social y llamadas a la acción.",
  },
  {
    title: "Diseño responsive",
    text: "Diseño limpio en desktop y móvil, con foco en lectura, confianza y acción.",
  },
  {
    title: "Formulario y seguimiento",
    text: "Campos, validación, mensaje de gracias y trazabilidad del lead desde origen.",
  },
  {
    title: "Medición básica",
    text: "Eventos clave preparados para campañas, analítica y lectura comercial.",
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
              <LandingServicesMenu currentPath={pagePath} />
              <a
                className="landing-top-cta inline-flex min-h-11 shrink-0 items-center justify-center rounded-lg bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-blue-950/30 hover:bg-blue-500 focus-visible:ring-2 focus-visible:ring-blue-400"
                href="#auditoria-landing-pages-form"
              >
                Solicitar auditoría gratuita
              </a>
            </div>
          </nav>
        </header>

        <PageLinksNav currentPath={pagePath} />

        <main>
      <section className="hero-section relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(37,99,235,0.15),transparent_34%)]" />
        <div className="hero-container relative mx-auto grid max-w-[1520px] items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(430px,0.8fr)] lg:px-8 lg:py-20">
          <div>
            <nav
              className="mb-8 flex flex-wrap items-center gap-2 text-sm font-extrabold text-slate-500 sm:text-base"
              aria-label="Migas de pan"
            >
              <Link className="inline-flex min-h-10 items-center text-teal-700 transition hover:text-teal-600" href="/">
                Inicio
              </Link>
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
              <Link
                className="inline-flex min-h-10 items-center text-teal-700 transition hover:text-teal-600"
                href="/agencia-marketing-digital"
              >
                Marketing digital
              </Link>
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
              <span className="inline-flex min-h-10 items-center">Landing pages</span>
            </nav>

            <p className="section-eyebrow mb-6">DISEÑO DE LANDING PAGES</p>
            <h1 className="marketing-hero-title max-w-[960px] text-slate-900">
              Diseño de landing pages para convertir visitas en leads
            </h1>
            <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-700 sm:text-xl sm:leading-9">
              Creamos landing pages profesionales para campañas, servicios y
              lanzamientos que necesitan explicar bien la oferta, reducir
              fricción y convertir tráfico en oportunidades medibles.
            </p>

            <div className="mt-8 grid gap-3 text-base font-bold text-slate-800 sm:grid-cols-3">
              {landingChecks.map((check) => (
                <div
                  key={check}
                  className="flex min-h-[92px] items-start gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-teal-600" aria-hidden="true" />
                  <span>{check}</span>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a className={primaryCtaClass} href="#auditoria-landing-pages-form">
                Solicitar auditoría gratuita
              </a>
              <Link className={secondaryCtaClass} href="/agencia-marketing-digital">
                Ver servicios de marketing digital
              </Link>
            </div>
            <p className="mt-3 text-base font-bold text-slate-700">
              Sin permanencia obligatoria. Respuesta en menos de 24h.
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-[700px] lg:mx-0">
            <div className="hero-visual-frame relative aspect-[5/4] overflow-hidden rounded-lg border border-slate-200 bg-white shadow-2xl">
              <Image
                src="/images/landing-pages-conversion-hero.png"
                alt="Esquema visual de una landing page conectada con leads y medición"
                fill
                priority
                sizes="(min-width: 1024px) 44vw, 92vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section-band border-y border-slate-200 bg-slate-100" id="problema">
        <div className="mx-auto grid max-w-[1520px] items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[0.82fr_1fr] lg:px-8 lg:py-24">
          <div>
            <p className="section-eyebrow mb-6">EL PROBLEMA</p>
            <h2 className="marketing-section-title text-slate-900">
              Una landing bonita no siempre convierte
            </h2>
          </div>
          <div className="space-y-6 text-lg leading-8 text-slate-700">
            <p>
              Muchas páginas se diseñan como si fueran una pieza visual aislada:
              se ven correctas, pero no explican la oferta con precisión, no
              eliminan dudas y no ayudan al usuario a tomar una decisión.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {problemPoints.map((point) => (
                <div key={point} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                  <p className="font-bold text-slate-800">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white" id="solucion">
        <div className="mx-auto max-w-[1520px] px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          <div className="max-w-5xl">
            <p className="section-eyebrow mb-6">LA SOLUCIÓN</p>
            <h2 className="marketing-section-title text-slate-900">
              Landing pages diseñadas para campañas, leads y medición
            </h2>
            <p className="mt-6 max-w-4xl text-lg leading-8 text-slate-700">
              Trabajamos la página como una pieza del sistema comercial:
              mensaje, diseño, formularios, seguimiento y aprendizaje posterior.
              El objetivo es que cada visita entienda la oferta y tenga un
              camino claro para actuar.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {solutionBlocks.map((block) => {
              const Icon = block.icon;
              return (
                <article
                  key={block.title}
                  className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
                >
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg border border-blue-100 bg-blue-50 text-teal-700">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="text-2xl font-black tracking-normal text-slate-900">{block.title}</h3>
                  <p className="mt-3 text-base leading-7 text-slate-700">{block.text}</p>
                </article>
              );
            })}
          </div>
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
            <h2 className="marketing-section-title text-slate-900">
              Qué trabajamos en una landing page
            </h2>
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
        <a className={`${primaryCtaClass} w-full justify-center`} href="#auditoria-landing-pages-form">
          Solicitar auditoría gratuita
        </a>
      </div>
      </div>
    </>
  );
}
