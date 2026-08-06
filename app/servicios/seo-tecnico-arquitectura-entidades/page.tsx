import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "../../components/Logo";
import { PageLinksNav } from "../../components/PageLinksNav";

const faqs = [
  {
    question: "¿Qué diferencia hay entre un silo transaccional y un blog normal?",
    answer:
      "Un blog normal suele organizar artículos por calendario o temas amplios. Un silo transaccional conecta contenido informativo con páginas de venta, para que la autoridad interna fluya hacia las URLs que captan demanda con intención de compra.",
  },
  {
    question: "¿Cuánto tiempo tarda en dar resultados una arquitectura por entidades?",
    answer:
      "Los primeros indicadores técnicos pueden aparecer en semanas, pero el impacto orgánico suele consolidarse entre 3 y 6 meses, según autoridad del dominio, competencia, estado de indexación y velocidad de implementación.",
  },
  {
    question: "¿Necesito rediseñar toda mi web para aplicar esto?",
    answer:
      "No siempre. Muchas veces podemos reordenar enlazado interno, arquitectura de URLs, contenidos y marcado Schema sin rediseñar toda la web. Si la base técnica bloquea el rastreo o la conversión, priorizamos cambios estructurales.",
  },
];

const methodology = [
  {
    icon: "{}",
    title: "Auditoría Técnica y Semántica",
    text: 'Analizamos Core Web Vitals, errores de indexación y el "Entity Gap": qué entidades faltan para que tu contenido sea considerado experto.',
  },
  {
    icon: "◎",
    title: "Mapeo de Intención de Búsqueda",
    text: "Separamos tráfico informativo del tráfico transaccional para evitar canibalización y ordenar cada URL por función comercial.",
  },
  {
    icon: "⌬",
    title: "Construcción de Silos",
    text: "Rediseñamos el enlazado interno para que la autoridad fluya estratégicamente hacia las páginas que generan dinero.",
  },
  {
    icon: "✎",
    title: "Generación de Clústeres",
    text: "Creamos el ecosistema editorial periférico que sostiene a tu centro de autoridad y responde preguntas reales de tu audiencia.",
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "SEO Técnico y Arquitectura de Contenidos por Entidades",
    serviceType: "Search Engine Optimization",
    provider: {
      "@type": "Organization",
      name: "Crecimiento sin complicaciones",
      url: "https://crecimientosincomplicaciones.com",
    },
    areaServed: "ES",
    description:
      "Servicio de SEO técnico, arquitectura por entidades, silos transaccionales y clústeres editoriales para captar demanda orgánica con intención de compra.",
    about: {
      "@type": "Thing",
      name: "Search Engine Optimization",
      sameAs: "https://en.wikipedia.org/wiki/Search_engine_optimization",
    },
    sameAs: "https://en.wikipedia.org/wiki/Search_engine_optimization",
    makesOffer: {
      "@type": "Offer",
      name: "Auditoría de Arquitectura SEO",
      category: "SEO técnico",
      availability: "https://schema.org/InStock",
      url: "https://crecimientosincomplicaciones.com/servicios/seo-tecnico-arquitectura-entidades",
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
  title: "SEO Tecnico y Arquitectura",
  description:
    "Construimos arquitecturas por entidades, silos transaccionales y clústeres editoriales para atraer clientes con intención real de compra.",
  alternates: {
    canonical: "/servicios/seo-tecnico-arquitectura-entidades",
  },
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: "SEO Técnico y Arquitectura de Contenidos",
    description:
      "Atrae clientes, no solo visitas, con arquitectura por entidades, SEO técnico y clústeres editoriales.",
    url: "/servicios/seo-tecnico-arquitectura-entidades",
    siteName: "Crecimiento sin complicaciones",
    locale: "es_ES",
    type: "website",
  },
};

export default function SeoArchitecturePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <header className="site-header service-page-header">
        <nav className="nav" aria-label="Navegación principal">
          <Link className="logo-link" href="/" aria-label="Crecimiento sin complicaciones, inicio">
            <Logo variant="light" />
          </Link>
          <div className="nav-links">
            <Link href="/#servicios">Servicios</Link>
            <a href="#metodologia">Metodología</a>
            <a href="#faq">FAQ</a>
          </div>
          <a className="button primary nav-cta" href="#auditoria-arquitectura">
            Auditoría SEO
          </a>
        </nav>
      </header>

      <PageLinksNav currentPath="/servicios/seo-tecnico-arquitectura-entidades" variant="light" />

      <main className="service-page">
        <section className="service-hero" aria-labelledby="service-hero-title">
          <div className="service-hero-copy">
            <p className="eyebrow">SEO técnico + arquitectura semántica</p>
            <h1 id="service-hero-title">
              SEO Técnico y Arquitectura de Contenidos: Atrae Clientes, No Solo Visitas.
            </h1>
            <h2>
              Dejamos atrás las palabras clave sueltas. Construimos arquitecturas por entidades, silos
              transaccionales y clústeres editoriales para dominar tu sector y captar demanda con intención real de
              compra.
            </h2>
            <div className="hero-actions">
              <a className="button primary" href="#auditoria-arquitectura">
                Solicitar Auditoría de Arquitectura
              </a>
            </div>
          </div>

          <div className="knowledge-graph" aria-label="Diagrama abstracto de entidades conectadas">
            <div className="graph-core">Hub</div>
            <span className="graph-node node-one">Entidad</span>
            <span className="graph-node node-two">Schema</span>
            <span className="graph-node node-three">Cluster</span>
            <span className="graph-node node-four">Intent</span>
            <span className="graph-node node-five">CWV</span>
            <i className="graph-line line-one" />
            <i className="graph-line line-two" />
            <i className="graph-line line-three" />
            <i className="graph-line line-four" />
            <i className="graph-line line-five" />
          </div>
        </section>

        <section className="service-problem" aria-labelledby="problem-seo-title">
          <p className="eyebrow">Cambio de paradigma</p>
          <h2 id="problem-seo-title">¿Por qué el SEO tradicional ya no funciona?</h2>
          <p>
            Escribir artículos al azar y repetir palabras clave es una táctica del pasado. Hoy, Google no lee palabras
            (Strings); entiende conceptos (Things/Entidades). Si tu web es un laberinto sin estructura, estás perdiendo
            tráfico cualificado frente a tus competidores.
          </p>
        </section>

        <section className="entity-section" aria-labelledby="entity-title">
          <div>
            <p className="eyebrow">Arquitectura por entidades</p>
            <h2 id="entity-title">Una web que Google puede entender y tus clientes pueden recorrer</h2>
            <div className="entity-points">
              <article>
                <h3>El Centro de Autoridad (El Hub)</h3>
                <p>
                  Tu página de servicio principal, o Silo Transaccional. Optimizada para vender y responder a la
                  intención de compra directa.
                </p>
              </article>
              <article>
                <h3>Clústeres Editoriales (Los Radios)</h3>
                <p>
                  Contenido de valor que responde a preguntas reales. Educa y empuja autoridad mediante enlaces internos
                  hacia tu Hub Transaccional.
                </p>
              </article>
              <article>
                <h3>SEO Técnico (Los Cimientos)</h3>
                <p>
                  Rastreo, indexación, Core Web Vitals y marcado de datos estructurados para que los motores entiendan
                  tu web al instante.
                </p>
              </article>
            </div>
          </div>
          <div className="silo-diagram" aria-label="Diagrama de hub transaccional y clústeres editoriales">
            <div className="silo-hub">Silo transaccional</div>
            <span>Guía</span>
            <span>Comparativa</span>
            <span>FAQ</span>
            <span>Caso</span>
            <span>Checklist</span>
            <span>Glosario</span>
          </div>
        </section>

        <section className="method-section" id="metodologia" aria-labelledby="method-title">
          <div className="section-heading">
            <p className="eyebrow">Metodología</p>
            <h2 id="method-title">Del diagnóstico técnico a una arquitectura que vende</h2>
            <p>Cuatro bloques de trabajo claros, auditables y pensados para avanzar sin ambigüedad.</p>
          </div>
          <div className="method-grid">
            {methodology.map((item) => (
              <article className="method-card" key={item.title}>
                <span aria-hidden="true">{item.icon}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="service-case" aria-labelledby="case-title">
          <div>
            <p className="eyebrow">Caso de estudio</p>
            <h2 id="case-title">
              Cómo reestructuramos los silos de una tienda online B2B y aumentamos el tráfico transaccional un +180% en
              4 meses.
            </h2>
            <blockquote>
              “Dejamos de publicar sin rumbo. Ahora cada contenido tiene una función comercial y sabemos qué páginas
              deben recibir autoridad.”
            </blockquote>
            <p className="case-author">Directora de Marketing, e-commerce B2B industrial</p>
          </div>
          <div className="growth-chart" aria-label="Gráfica de crecimiento transaccional del caso de estudio">
            <span style={{ height: "28%" }} />
            <span style={{ height: "36%" }} />
            <span style={{ height: "52%" }} />
            <span style={{ height: "71%" }} />
            <span style={{ height: "88%" }} />
          </div>
        </section>

        <section className="service-faq" id="faq" aria-labelledby="service-faq-title">
          <div className="section-heading compact">
            <p className="eyebrow">FAQ</p>
            <h2 id="service-faq-title">Preguntas frecuentes</h2>
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

        <section className="internal-links" aria-labelledby="internal-links-title">
          <h2 id="internal-links-title">Recursos relacionados</h2>
          <Link href="/">Volver a la página de Inicio</Link>
          <a href="/blog/que-es-core-web-vital">Qué es un Core Web Vital</a>
          <a href="/blog/que-es-topic-cluster">Qué es un Topic Cluster</a>
        </section>

        <section className="service-final-cta" id="auditoria-arquitectura" aria-labelledby="final-cta-title">
          <h2 id="final-cta-title">¿Listo para estructurar tu web para dominar Google?</h2>
          <Link className="button primary" href="/#auditoria">
            Agenda tu Sesión Estratégica
          </Link>
        </section>
      </main>
    </>
  );
}
