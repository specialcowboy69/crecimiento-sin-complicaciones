import { CaseCarousel } from "./components/CaseCarousel";
import { LeadForm } from "./components/LeadForm";
import { Logo } from "./components/Logo";
import { PricingToggle } from "./components/PricingToggle";
import { ClipboardList, Palette, Rocket, Zap } from "lucide-react";
import Link from "next/link";

const services = [
  {
    title: "SEO tecnico y contenido",
    text: "Arquitectura por entidades, silos transaccionales y clusters editoriales para captar demanda con intencion real.",
  },
  {
    title: "SEM y paid growth",
    text: "Campanas con hipotesis claras, medicion limpia y ciclos de aprendizaje pensados para bajar coste por lead.",
  },
  {
    title: "CRO y landing systems",
    text: "Mensajes, pruebas y componentes orientados a que cada visita entienda el valor y avance sin friccion.",
  },
  {
    title: "Analitica ejecutiva",
    text: "Dashboards accionables para CEOs y CMOs: pipeline, atribucion, conversion y prioridades semanales.",
  },
];

const diagnosticSteps = [
  {
    number: "01",
    title: "Reserva y toma de datos",
    text: "Completas el formulario inicial y alineamos objetivos, mercado y canales activos.",
    deliverable: "Formulario inicial + objetivos del negocio",
    time: "Dia 1",
    icon: ClipboardList,
  },
  {
    number: "02",
    title: "Analisis de web, SEO y campanas",
    text: "Revisamos puntos criticos de captacion, posicionamiento, mensajes y conversion.",
    deliverable: "Revision priorizada en 24-48h",
    time: "24-48h",
    icon: Palette,
  },
  {
    number: "03",
    title: "Oportunidades de mejora e IA",
    text: "Detectamos automatizaciones y ajustes que pueden liberar tiempo o aumentar respuesta comercial.",
    deliverable: "Prioridades de captacion, conversion y automatizacion",
    time: "48-72h",
    icon: Zap,
  },
  {
    number: "04",
    title: "Plan de accion recomendado",
    text: "Te entregamos una hoja de ruta sencilla, ordenada por impacto, esfuerzo y siguiente paso.",
    deliverable: "Hoja de ruta clara con proximos pasos",
    time: "Cierre",
    icon: Rocket,
  },
];


const faqs = [
  {
    question: "Cuanto tarda en verse traccion?",
    answer:
      "En paid media solemos ver aprendizajes utiles durante las primeras 2 semanas. En SEO, los primeros indicadores llegan entre 6 y 10 semanas segun autoridad, competencia y estado tecnico.",
  },
  {
    question: "Trabajais con equipos internos de marketing?",
    answer:
      "Si. Podemos actuar como extension especialista para SEO tecnico, Ads, contenido o CRO, con entregables pensados para integrarse con tu calendario y tus herramientas.",
  },
  {
    question: "La auditoria gratuita tiene compromiso?",
    answer:
      "No. La usamos para entender si podemos generar impacto real. Si vemos una oportunidad clara, te proponemos una hoja de ruta priorizada.",
  },
];

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Crecimiento sin complicaciones",
  url: "https://crecimientosincomplicaciones.com",
  description:
    "Agencia de crecimiento especializada en SEO, SEM, CRO, storytelling y analitica para startups y equipos de marketing.",
  areaServed: "ES",
  serviceType: ["SEO tecnico", "SEM", "CRO", "Marketing de contenidos", "Analitica digital"],
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
      <header className="site-header">
        <nav className="nav" aria-label="Navegacion principal">
          <a className="logo-link" href="#inicio" aria-label="Crecimiento sin complicaciones, inicio">
            <Logo variant="light" />
          </a>
          <div className="nav-links">
            <a href="#servicios">Servicios</a>
            <a href="#casos">Casos</a>
            <a href="#precios">Precios</a>
            <a href="#diagnostico">Diagnostico</a>
          </div>
          <div className="nav-actions">
            <Link className="button secondary nav-ai-cta" href="/diseno-pagina-web-profesional">
              Diseno web
            </Link>
            <Link className="button secondary nav-ai-cta" href="/gestion-redes-sociales-empresas">
              Gestion de redes sociales
            </Link>
            <Link className="button secondary nav-ai-cta" href="/soluciones-inteligencia-artificial-empresas">
              IA empresas
            </Link>
          </div>
        </nav>
      </header>

      <main id="inicio">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">Friccion cero + alta conversion + storytelling</p>
            <h1 id="hero-title">Crecimiento sin complicaciones para startups y equipos de marketing</h1>
            <p>
              Construimos funnels SEO y paid media que atraen trafico cualificado, explican tu valor con claridad y convierten visitas en conversaciones comerciales.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#auditoria">Solicitar auditoria gratuita</a>
              <a className="button secondary" href="#casos">Ver resultados</a>
            </div>
            <dl className="proof-strip" aria-label="Indicadores de confianza">
              <div><dt>3-5%</dt><dd>objetivo de conversion</dd></div>
              <div><dt>90 dias</dt><dd>primer sprint medible</dd></div>
              <div><dt>Core Web Vitals</dt><dd>como requisito</dd></div>
            </dl>
          </div>

          <div className="hero-visual" aria-label="Panel de crecimiento con metricas de marketing">
            <div className="visual-toolbar"><span></span><span></span><span></span></div>
            <div className="score-card">
              <p>Pipeline estimado</p>
              <strong>+42.000 EUR</strong>
              <span>proximos 90 dias</span>
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
              <div><b>CRO</b><span>+31% conversion</span></div>
            </div>
          </div>
        </section>

        <section className="section problem-section" aria-labelledby="problem-title">
          <div className="section-heading compact">
            <p className="eyebrow">El problema real</p>
            <h2 id="problem-title">No falta trafico. Falta un sistema que convierta aprendizaje en crecimiento.</h2>
          </div>
          <div className="split-copy">
            <p>
              Muchos equipos invierten en SEO, Ads y contenido como piezas sueltas. El resultado es ruido: rankings que no venden, campanas que aprenden lento y landings que obligan al usuario a pensar demasiado.
            </p>
            <p>
              Nuestra promesa es simple: una arquitectura de adquisicion donde cada pagina, anuncio, historia y dato tiene una funcion clara en el funnel.
            </p>
          </div>
        </section>

        <section className="section" id="servicios" aria-labelledby="services-title">
          <div className="section-heading">
            <p className="eyebrow">Servicios</p>
            <h2 id="services-title">Especialistas conectados por un mismo objetivo: leads cualificados</h2>
            <p>Trabajamos cada canal como parte de un sistema completo de descubrimiento, confianza y conversion.</p>
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
            <p className="eyebrow">Casos de exito</p>
            <h2 id="cases-title">Historias que se sostienen con datos</h2>
            <p>El storytelling funciona mejor cuando la metrica confirma que el usuario entendio el valor.</p>
          </div>
          <CaseCarousel />

        </section>

        <PricingToggle />

        <section className="section diagnostic-section" id="diagnostico" aria-labelledby="diagnostic-title">
          <div className="section-heading">
            <p className="eyebrow">Diagnostico gratuito</p>
            <h2 id="diagnostic-title">Diagnostico gratuito en 4 pasos</h2>
            <p>
              Analizamos tu situacion actual y te damos una hoja de ruta clara para mejorar captacion, conversion y automatizacion.
            </p>
            <a className="button primary" href="#auditoria">Solicitar diagnostico gratis</a>
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
        <p>© 2026 Crecimiento sin complicaciones. Agencia SEO, SEM y CRO.</p>
        <a href="#inicio">Volver arriba</a>
      </footer>
    </>
  );
}
