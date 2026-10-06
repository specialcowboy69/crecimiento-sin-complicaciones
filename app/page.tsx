import { CaseCarousel } from "./components/CaseCarousel";
import { LandingServicesMenu } from "./components/LandingServicesMenu";
import { LeadForm } from "./components/LeadForm";
import { Logo } from "./components/Logo";
import { PricingToggle } from "./components/PricingToggle";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import homeGrowthImage from "../public/images/home-growth-collaboration.webp";
import homeServiceAiImage from "../public/images/home-service-ai-automation.webp";
import homeServiceLandingImage from "../public/images/home-service-landing.webp";
import homeServicePaidImage from "../public/images/home-service-paid.webp";
import homeServiceSeoImage from "../public/images/home-service-seo.webp";
import homeStageCaptureImage from "../public/images/home-stage-capture.webp";
import homeStageConvertImage from "../public/images/home-stage-convert.webp";
import homeStageExplainImage from "../public/images/home-stage-explain.webp";
import homeStageLearnImage from "../public/images/home-stage-learn.webp";
import styles from "./home.module.css";

const homeMainServiceHrefs = [
  "/agencia-marketing-digital",
  "/agencia-marketing-digital/google-ads",
  "/diseno-landing-pages",
  "/seo",
  "/seo-para-pymes",
  "/diseno-pagina-web-profesional",
  "/gestion-redes-sociales-empresas",
  "/soluciones-inteligencia-artificial-empresas",
] as const;

const services = [
  {
    title: "SEO técnico y contenido",
    text: "Arquitectura por entidades, silos transaccionales y clusters editoriales para captar demanda con intención real.",
    image: homeServiceSeoImage,
    href: "/seo",
  },
  {
    title: "Google Ads",
    text: "Campañas con hipótesis claras, medición limpia y ciclos de aprendizaje pensados para bajar coste por lead.",
    image: homeServicePaidImage,
    href: "/agencia-marketing-digital/google-ads",
  },
  {
    title: "Landing pages",
    text: "Páginas de campaña con mensaje, diseño, formularios y medición para convertir visitas en leads.",
    image: homeServiceLandingImage,
    href: "/diseno-landing-pages",
  },
  {
    title: "Automatización con IA",
    text: "Agentes de IA y automatizaciones que cualifican oportunidades, reducen tareas manuales y conectan tus herramientas.",
    image: homeServiceAiImage,
    href: "/soluciones-inteligencia-artificial-empresas",
  },
];

const acquisitionStages = [
  {
    number: "01",
    title: "Captar",
    text: "SEO y campañas atraen demanda con una intención reconocible.",
    image: homeStageCaptureImage,
  },
  {
    number: "02",
    title: "Explicar",
    text: "La página ordena el mensaje y deja claro por qué elegirte.",
    image: homeStageExplainImage,
  },
  {
    number: "03",
    title: "Convertir",
    text: "La experiencia elimina fricción y conduce hacia una conversación.",
    image: homeStageConvertImage,
  },
  {
    number: "04",
    title: "Aprender",
    text: "La medición muestra qué funciona y qué conviene priorizar después.",
    image: homeStageLearnImage,
  },
];

const faqs = [
  {
    question: "¿Cuánto tarda en verse tracción?",
    answer:
      "En paid media solemos ver aprendizajes útiles durante las primeras 2 semanas. En SEO, los primeros indicadores llegan entre 6 y 10 semanas según autoridad, competencia y estado técnico.",
  },
  {
    question: "¿Trabajáis con equipos internos de marketing?",
    answer:
      "Sí. Podemos actuar como extensión especialista para SEO técnico, Ads, contenido o CRO, con entregables pensados para integrarse con tu calendario y tus herramientas.",
  },
  {
    question: "¿La auditoría gratuita tiene compromiso?",
    answer:
      "No. La usamos para entender si podemos generar impacto real. Si vemos una oportunidad clara, te proponemos una hoja de ruta priorizada.",
  },
];

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Crecimiento sin complicaciones",
  url: "https://www.crecimientosincomplicaciones.com",
  description:
    "Agencia de crecimiento especializada en SEO, SEM, CRO, storytelling y analítica para startups y equipos de marketing.",
  areaServed: "ES",
  serviceType: ["SEO técnico", "SEM", "CRO", "Marketing de contenidos", "Analítica digital"],
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

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([organizationSchema, faqSchema]) }}
      />
      <header className="site-header home-header">
        <nav className="nav" aria-label="Navegación principal">
          <a className="logo-link" href="#inicio" aria-label="Crecimiento sin complicaciones, inicio">
            <Logo variant="light" />
          </a>
          <div className="nav-links">
            <a href="#servicios">Servicios</a>
            <a href="#casos">Casos</a>
            <a href="#precios">Precios</a>
            <a href="#diagnostico">Diagnóstico</a>
          </div>
          <div className="nav-actions">
            <LandingServicesMenu
              currentPath="/"
              allowedHrefs={homeMainServiceHrefs}
              label="Nuestros servicios"
            />
          </div>
        </nav>
      </header>

      <main id="inicio">
        <section className={styles.hero} aria-labelledby="hero-title">
          <Image
            className={styles.heroImage}
            src={homeGrowthImage}
            alt="Dos especialistas revisando una estrategia de crecimiento digital"
            fill
            preload
            placeholder="blur"
            sizes="100vw"
          />
          <div className={styles.heroInner}>
            <div className={styles.heroCopy}>
              <p className={`eyebrow ${styles.heroEyebrow}`}>Agencia de crecimiento y marketing digital</p>
              <h1 className={styles.heroTitle} id="hero-title">Crecimiento sin complicaciones para startups, pymes y negocios</h1>
              <p className={styles.heroLead}>
                <strong>Convertimos tráfico en oportunidades comerciales.</strong>
                Conectamos SEO, paid media, páginas y medición para atraer demanda cualificada y llevar cada visita hacia una conversación real.
              </p>
              <div className="hero-actions">
                <a className="button primary" href="#auditoria">Solicitar auditoría gratuita</a>
                <a className={`button secondary ${styles.heroSecondary}`} href="#casos">Ver casos de éxito</a>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.problemSection} aria-labelledby="problem-title">
          <div className={styles.problemInner}>
            <div className={styles.problemHeading}>
              <p className="eyebrow">El problema real</p>
              <h2 id="problem-title">No falta tráfico. Falta un sistema que convierta aprendizaje en crecimiento.</h2>
            </div>
            <div className={styles.systemPanel}>
              <div className={styles.systemFlow} aria-label="Sistema de adquisición conectado">
                {acquisitionStages.map((stage) => (
                  <article className={styles.systemStage} key={stage.number}>
                    <Image
                      className={styles.stageImage}
                      src={stage.image}
                      alt=""
                      aria-hidden="true"
                      fill
                      placeholder="blur"
                      sizes="(max-width: 680px) 100vw, (max-width: 980px) 50vw, 25vw"
                    />
                    <div className={styles.stageContent}>
                      <span>{stage.number}</span>
                      <h3>{stage.title}</h3>
                      <p>{stage.text}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="servicios" aria-labelledby="services-title">
          <div className="section-heading">
            <p className="eyebrow">Servicios</p>
            <h2 id="services-title">Especialistas conectados por un mismo objetivo: leads cualificados</h2>
            <p>Trabajamos cada canal como parte de un sistema completo de descubrimiento, confianza y conversión.</p>
          </div>
          <div className={styles.serviceGrid}>
            {services.map((service) => (
              <Link className={styles.servicePanel} href={service.href} key={service.title}>
                <Image
                  className={styles.serviceImage}
                  src={service.image}
                  alt=""
                  fill
                  placeholder="blur"
                  sizes="(max-width: 680px) 100vw, (max-width: 980px) 50vw, 66vw"
                />
                <div className={styles.serviceContent}>
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                  <span className={styles.serviceLinkCue}>
                    Ver servicio
                    <ArrowUpRight aria-hidden="true" size={18} strokeWidth={2.2} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="section case-section" id="casos" aria-labelledby="cases-title">
          <div className="section-heading">
            <p className="eyebrow">Casos de éxito</p>
            <h2 id="cases-title">Historias que se sostienen con datos</h2>
            <p>El reto, la solución aplicada y las métricas del proyecto, en una sola lectura.</p>
          </div>
          <CaseCarousel />

        </section>

        <PricingToggle />

        <section className={`section ${styles.diagnosticSection}`} id="diagnostico" aria-labelledby="diagnostic-title">
          <div className={styles.diagnosticBand}>
            <div className={styles.diagnosticCopy}>
              <p className={`eyebrow ${styles.diagnosticEyebrow}`}>Auditoría gratuita</p>
              <h2 id="diagnostic-title">Revisamos tu web y te enviamos una propuesta clara</h2>
              <p>
                Cuéntanos qué quieres mejorar en el formulario. Revisamos tu web y preparamos una propuesta con el alcance, las prioridades y los siguientes pasos.
              </p>
            </div>
            <a className="button primary" href="#auditoria">Solicitar auditoría gratuita</a>
          </div>
        </section>

        <section className="section faq-section" aria-labelledby="faq-title">
          <div className="section-heading compact">
            <p className="eyebrow">FAQ</p>
            <h2 id="faq-title">Preguntas frecuentes</h2>
          </div>
          <div className="faq-list">
            {faqs.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <LeadForm />
      </main>

    </>
  );
}
