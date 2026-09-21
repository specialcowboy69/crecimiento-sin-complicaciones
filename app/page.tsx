import { CaseCarousel } from "./components/CaseCarousel";
import { LandingServicesMenu } from "./components/LandingServicesMenu";
import { LeadForm } from "./components/LeadForm";
import { Logo } from "./components/Logo";
import { PricingToggle } from "./components/PricingToggle";
import { ClipboardList, Palette, Rocket, Zap } from "lucide-react";

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
  },
  {
    title: "SEM y paid growth",
    text: "Campañas con hipótesis claras, medición limpia y ciclos de aprendizaje pensados para bajar coste por lead.",
  },
  {
    title: "Landing pages",
    text: "Páginas de campaña con mensaje, diseño, formularios y medición para convertir visitas en leads.",
  },
  {
    title: "Analítica ejecutiva",
    text: "Dashboards accionables para CEOs y CMOs: pipeline, atribución, conversión y prioridades semanales.",
  },
];

const diagnosticSteps = [
  {
    number: "01",
    title: "Reserva y toma de datos",
    text: "Completas el formulario inicial y alineamos objetivos, mercado y canales activos.",
    deliverable: "Formulario inicial + objetivos del negocio",
    time: "Día 1",
    icon: ClipboardList,
  },
  {
    number: "02",
    title: "Análisis de web, SEO y campañas",
    text: "Revisamos puntos críticos de captación, posicionamiento, mensajes y conversión.",
    deliverable: "Revisión priorizada en 24-48h",
    time: "24-48h",
    icon: Palette,
  },
  {
    number: "03",
    title: "Oportunidades de mejora e IA",
    text: "Detectamos automatizaciones y ajustes que pueden liberar tiempo o aumentar respuesta comercial.",
    deliverable: "Prioridades de captación, conversión y automatización",
    time: "48-72h",
    icon: Zap,
  },
  {
    number: "04",
    title: "Plan de acción recomendado",
    text: "Te entregamos una hoja de ruta sencilla, ordenada por impacto, esfuerzo y siguiente paso.",
    deliverable: "Hoja de ruta clara con próximos pasos",
    time: "Cierre",
    icon: Rocket,
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
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">Fricción cero + alta conversión + storytelling</p>
            <h1 id="hero-title">Crecimiento sin complicaciones para startups, pymes y negocios</h1>
            <p>
              Construimos funnels SEO y paid media que atraen tráfico cualificado, explican tu valor con claridad y convierten visitas en conversaciones comerciales.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#auditoria">Solicitar auditoría gratuita</a>
              <a className="button secondary" href="#casos">Ver resultados</a>
            </div>
            <dl className="proof-strip" aria-label="Indicadores de confianza">
              <div><dt>3-5%</dt><dd>objetivo de conversión</dd></div>
              <div><dt>90 días</dt><dd>primer sprint medible</dd></div>
              <div><dt>Core Web Vitals</dt><dd>como requisito</dd></div>
            </dl>
          </div>

          <div className="hero-visual" aria-label="Panel de crecimiento con métricas de marketing">
            <div className="visual-toolbar"><span></span><span></span><span></span></div>
            <div className="score-card">
              <p>Pipeline estimado</p>
              <strong>+42.000 EUR</strong>
              <span>próximos 90 días</span>
            </div>
            <div className="chart" aria-hidden="true">
              <span style={{ height: "38%" }}></span>
              <span style={{ height: "54%" }}></span>
              <span style={{ height: "48%" }}></span>
              <span style={{ height: "72%" }}></span>
              <span style={{ height: "86%" }}></span>
            </div>
            <div className="signal-grid">
              <div><b>SEO</b><span>+68% impresiones</span></div>
              <div><b>Ads</b><span>-24% CPL</span></div>
              <div><b>CRO</b><span>+31% conversión</span></div>
            </div>
          </div>
        </section>

        <section className="section problem-section" aria-labelledby="problem-title">
          <div className="section-heading compact">
            <p className="eyebrow">El problema real</p>
            <h2 id="problem-title">No falta tráfico. Falta un sistema que convierta aprendizaje en crecimiento.</h2>
          </div>
          <div className="split-copy">
            <p>
              Muchos equipos invierten en SEO, Ads y contenido como piezas sueltas. El resultado es ruido: rankings que no venden, campañas que aprenden lento y landings que obligan al usuario a pensar demasiado.
            </p>
            <p>
              Nuestra promesa es simple: una arquitectura de adquisición donde cada página, anuncio, historia y dato tiene una función clara en el funnel.
            </p>
          </div>
        </section>

        <section className="section" id="servicios" aria-labelledby="services-title">
          <div className="section-heading">
            <p className="eyebrow">Servicios</p>
            <h2 id="services-title">Especialistas conectados por un mismo objetivo: leads cualificados</h2>
            <p>Trabajamos cada canal como parte de un sistema completo de descubrimiento, confianza y conversión.</p>
          </div>
          <div className="service-grid">
            {services.map((service) => (
              <article className="service-card" key={service.title}>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section case-section" id="casos" aria-labelledby="cases-title">
          <div className="section-heading">
            <p className="eyebrow">Casos de éxito</p>
            <h2 id="cases-title">Historias que se sostienen con datos</h2>
            <p>El storytelling funciona mejor cuando la métrica confirma que el usuario entendió el valor.</p>
          </div>
          <CaseCarousel />

        </section>

        <PricingToggle />

        <section className="section diagnostic-section" id="diagnostico" aria-labelledby="diagnostic-title">
          <div className="section-heading">
            <p className="eyebrow">Diagnóstico gratuito</p>
            <h2 id="diagnostic-title">Diagnóstico gratuito en 4 pasos</h2>
            <p>
              Analizamos tu situación actual y te damos una hoja de ruta clara para mejorar captación, conversión y automatización.
            </p>
            <a className="button primary" href="#auditoria">Solicitar diagnóstico gratis</a>
          </div>
          <div className="diagnostic-process">
            {diagnosticSteps.map((step) => {
              const Icon = step.icon;

              return (
                <article className="diagnostic-step" key={step.number}>
                  <div className="diagnostic-step-top">
                    <span className="diagnostic-icon" aria-hidden="true">
                      <Icon size={22} strokeWidth={2} />
                    </span>
                    <span className="diagnostic-number">{step.number}</span>
                  </div>
                  <p className="diagnostic-time">{step.time}</p>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                  <div className="diagnostic-deliverable">
                    <span>Entregable</span>
                    <strong>{step.deliverable}</strong>
                  </div>
                </article>
              );
            })}
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

      <footer className="footer">
        <p>© 2026 Crecimiento sin complicaciones. Agencia SEO, Google Ads, diseño web y automatizaciones.</p>
        <div className="flex flex-wrap gap-4">
          <a href="/sobre-nosotros">Sobre nosotros</a>
          <a href="#inicio">Volver arriba</a>
        </div>
      </footer>
    </>
  );
}
