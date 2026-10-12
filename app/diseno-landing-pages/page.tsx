import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  FileText,
  LineChart,
  MessageSquareText,
  MousePointerClick,
  Send,
} from "lucide-react";

import { LandingServicesMenu } from "../components/LandingServicesMenu";
import { LeadForm } from "../components/LeadForm";
import { Logo } from "../components/Logo";
import { SITE_URL } from "../lib/site";
import { LandingTile } from "./LandingTile";
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

const frictionPoints = [
  { icon: MessageSquareText, title: "La oferta no se entiende", text: "El visitante llega, pero no reconoce por qué esa propuesta es para él." },
  { icon: MousePointerClick, title: "La acción llega demasiado pronto", text: "Un formulario pide datos antes de resolver las dudas importantes." },
  { icon: LineChart, title: "No sabes qué cambiar", text: "Sin medición, las mejoras se deciden por intuición." },
];

const audience = [
  { title: "Campañas en marcha", text: "Empresas que invierten en campañas y quieren convertir mejor el tráfico que ya reciben." },
  { title: "Servicios complejos", text: "Negocios B2B que necesitan explicar una propuesta con precisión y sin saturar la página." },
  { title: "Ventas consultivas", text: "Equipos comerciales que necesitan leads con más contexto y mejor intención." },
  { title: "Nuevos lanzamientos", text: "Marcas con una oferta nueva que necesitan una página enfocada en respuesta." },
];

const includes = [
  {
    title: "Guion de página",
    text: "Orden de titulares, argumentos, objeciones y llamadas a la acción.",
    icon: FileText,
    image: null,
    imageAlt: "",
  },
  {
    title: "Diseño y desarrollo",
    text: "Página adaptable a escritorio y móvil, con lectura y carga cuidadas.",
    icon: MousePointerClick,
    image: "/images/google-ads-national-audience.webp",
    imageAlt: "Dos profesionales revisan una propuesta en un portátil",
  },
  {
    title: "Captación configurada",
    text: "Campos, validación y confirmación del envío preparados para recibir consultas.",
    icon: Send,
    image: null,
    imageAlt: "",
  },
  {
    title: "Mapa de medición",
    text: "Eventos y fuentes definidos para leer el rendimiento comercial de la página.",
    icon: LineChart,
    image: "/images/google-ads-national-analysis.webp",
    imageAlt: "Profesional revisando información de rendimiento en un monitor",
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
            <p>Cuando todo compite por atención, la decisión de contactar se pierde.</p>
          </div>
          <div className={styles.landingAnatomy}>
            <figure className={styles.anatomyFigure}>
              <Image
                src="/images/landing-page-comparison-editorial.webp"
                alt="Dos propuestas de página vistas desde arriba: una dispersa y otra con una dirección visual clara"
                width={1536}
                height={1024}
                sizes="(max-width: 900px) 100vw, 58vw"
              />
            </figure>
            <ol className={styles.anatomyNotes}>
              {frictionPoints.map((point) => {
                const Icon = point.icon;
                return (
                  <li key={point.title}>
                    <span className={styles.frictionIcon}><Icon size={25} strokeWidth={1.7} aria-hidden="true" /></span>
                    <div><h3>{point.title}</h3><p>{point.text}</p></div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      <section className={styles.solutionSection} id="solucion" aria-labelledby="landing-solution-title">
        <div className={styles.sectionInner}>
          <div className={styles.solutionIntro}>
            <p className={styles.eyebrow}>La solución</p>
            <h2 id="landing-solution-title">Una dirección clara para cada visita</h2>
            <p>Una oferta comprensible, un siguiente paso natural y señales para mejorar con criterio.</p>
          </div>
          <div className={styles.solutionBento}>
            <LandingTile className={`${styles.solutionTile} ${styles.solutionFeature}`}>
              <Image
                src="/images/home-service-landing.webp"
                alt="Profesional revisando una página de destino en una pantalla"
                fill
                sizes="(max-width: 900px) 100vw, 58vw"
                className={styles.solutionImage}
              />
              <div className={styles.solutionFeatureCopy}>
                <span>01 / Mensaje</span>
                <h3>Que la oferta se entienda de un vistazo</h3>
                <p>Ordenamos la propuesta alrededor de lo que el cliente necesita decidir.</p>
              </div>
            </LandingTile>
            <LandingTile className={`${styles.solutionTile} ${styles.solutionAction}`}>
              <MousePointerClick aria-hidden="true" size={30} strokeWidth={1.6} />
              <div>
                <span>02 / Acción</span>
                <h3>Un siguiente paso sin fricción</h3>
                <p>CTA y formulario aparecen donde aportan claridad, no por inercia.</p>
              </div>
              <a href="#auditoria-landing-pages-form" className={styles.solutionActionLink}>
                Solicitar auditoría <ChevronRight size={19} aria-hidden="true" />
              </a>
            </LandingTile>
            <LandingTile className={`${styles.solutionTile} ${styles.solutionMeasure}`}>
              <LineChart aria-hidden="true" size={30} strokeWidth={1.6} />
              <div>
                <span>03 / Aprendizaje</span>
                <h3>Saber qué funciona</h3>
                <p>Conectamos origen, eventos y contactos para orientar la siguiente mejora.</p>
              </div>
            </LandingTile>
          </div>
        </div>
      </section>

      <section className={styles.audienceSection} id="para-quien">
        <div className={styles.audienceVisual}>
          <Image
            src="/images/landing-page-review-editorial.webp"
            alt="Equipo revisando una landing page en un monitor durante una sesión de trabajo"
            fill
            sizes="100vw"
          />
          <div className={styles.audienceVisualCopy}>
            <h2>Para convertir interés en conversaciones</h2>
          </div>
        </div>
        <div className={styles.audienceGrid}>
          <ul className={styles.audienceList}>
            {audience.map((item, index) => (
              <li key={item.title}>
                <span aria-hidden="true">0{index + 1}</span>
                <div><h3>{item.title}</h3><p>{item.text}</p></div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.includesSection} id="incluye">
        <div className={styles.includesGrid}>
          <div className={styles.includesIntro}>
            <p className={styles.eyebrow}>Qué trabajamos</p>
            <h2>Entregables para ponerla en marcha</h2>
          </div>
          <div className={styles.deliverablesGrid}>
            {includes.map((item) => {
              const Icon = item.icon;
              return (
                <LandingTile key={item.title} className={styles.deliverableCard}>
                  {item.image ? (
                    <div className={styles.deliverableVisual}>
                      <Image src={item.image} alt={item.imageAlt} fill sizes="(max-width: 767px) 100vw, (max-width: 1100px) 50vw, 25vw" />
                    </div>
                  ) : (
                    <span className={styles.deliverableIcon}><Icon size={36} strokeWidth={1.5} aria-hidden="true" /></span>
                  )}
                  <div className={styles.deliverableCopy}>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </LandingTile>
              );
            })}
          </div>
        </div>
      </section>

      <section className={styles.processSection} id="proceso">
        <div className={styles.sectionInner}>
          <div className={styles.processIntro}>
            <p className={styles.eyebrow}>Proceso</p>
            <h2>Cómo creamos tu landing page</h2>
          </div>
          <ol className={styles.processTrack}>
            {process.map((step) => (
              <li key={step.step}>
                <span className={styles.processIndex}>{step.step}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.relatedSection} id="relacionados">
        <div className={styles.relatedInner}>
          <div className={styles.relatedGrid}>
            <div>
              <p className={styles.eyebrow}>Servicios relacionados</p>
              <h2>
                Conecta la landing con el resto del sistema
              </h2>
              <p>
                La página de destino es una parte del recorrido. Estos servicios completan la captación.
              </p>
            </div>
            <div className={styles.relatedLinks}>
              {relatedLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={styles.relatedLink}
                >
                  <span><strong>{link.title}</strong><small>{link.text}</small></span>
                  <ChevronRight aria-hidden="true" size={20} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.faqSection} id="faq">
        <div className={styles.faqInner}>
          <p className={styles.eyebrow}>FAQ</p>
          <h2>
            Preguntas frecuentes sobre diseño de landing pages
          </h2>
          <div className={styles.faqList}>
            {faqs.map((faq) => (
              <details key={faq.question}>
                <summary>
                  {faq.question}
                  <ChevronRight aria-hidden="true" size={20} />
                </summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white" id="auditoria-landing-pages">
        <div className={styles.auditSectionInner}>
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
