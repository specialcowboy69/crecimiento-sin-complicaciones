type PricingService = {
  title: string;
  detail: string;
  muted?: boolean;
};

type PricingPlan = {
  name: string;
  subtitle: string;
  description: string;
  focus: string;
  pricePrefix?: string;
  price: string;
  cadence: string;
  cta: string;
  badge?: string;
  highlighted?: boolean;
  services: PricingService[];
};

const plans: PricingPlan[] = [
  {
    name: "Plan Esencial",
    subtitle: "Fundación Digital",
    description: "Ideal para negocios que necesitan empezar con una base sólida y profesional.",
    focus: "Presencia y visibilidad básica.",
    pricePrefix: "€",
    price: "199",
    cadence: "/mes",
    cta: "Solicitar plan esencial",
    services: [
      {
        title: "Web corporativa",
        detail: "Hasta 5 secciones con Landing Page optimizada.",
      },
      {
        title: "SEO básico",
        detail: "Optimizacion On-Page y configuracion de Google Search y Google Analytics.",
      },
      {
        title: "Gestion de redes",
        detail: "Realizamos un plan de redes sociales personalizado para tu marca.",
      },
      {
        title: "Automatización IA básica",
        detail: "Automatizacion de procesos de la empresa.",
      },
      {
        title: "Campañas SEM",
        detail: "Disponible desde el Plan Crecimiento.",
        muted: true,
      },
      {
        title: "Edición de video",
        detail: "Disponible desde el Plan Crecimiento.",
        muted: true,
      },
    ],
  },
  {
    name: "Plan Crecimiento",
    subtitle: "Tracción y Ventas",
    description:
      "Diseñado para empresas que quieren escalar y dominar su mercado mediante pauta y contenido visual.",
    focus: "ROI rápido y autoridad de marca.",
    pricePrefix: "€",
    price: "399",
    cadence: "/mes",
    cta: "Solicitar plan crecimiento",
    badge: "Recomendado",
    highlighted: true,
    services: [
      {
        title: "Web dinámica con Blog",
        detail: "Arquitectura de silos para SEO.",
      },
      {
        title: "Campañas SEM",
        detail: "Gestión en Google Ads o Meta Ads con presupuesto optimizado.",
      },
      {
        title: "SEO avanzado",
        detail:
          "Analisis y seguimiento de palabras clave, generacion de contenido para el blog, Posicionamiento avanzado para atraer clientes cualificados.",
      },
      {
        title: "Gestion de redes avanzada",
        detail: "Creacion de contenido para redes sociales.",
      },
      {
        title: "Chatbot inteligente",
        detail: "Atención al cliente 24/7.",
      },
      {
        title: "Automatización End-to-End",
        detail: "Disponible en Plan Vanguardia.",
        muted: true,
      },
    ],
  },
  {
    name: "Plan Vanguardia",
    subtitle: "Transformación y Automatización",
    description: "Para empresas que buscan eficiencia máxima y una presencia omnicanal agresiva.",
    focus: "Automatización de procesos y escala masiva.",
    price: "Personalizado",
    cadence: "a medida",
    cta: "Consultar plan vanguardia",
    services: [
      {
        title: "E-commerce o plataforma a medida",
        detail: "Core Web Vitals premium y arquitectura personalizada.",
      },
      {
        title: "SEO/SEM avanzado",
        detail: "Data-Driven SEO con Python y campañas multinivel.",
      },
      {
        title: "Producción audiovisual premium",
        detail: "Video corporativo y edición avanzada con IA.",
      },
      {
        title: "Automatización completa",
        detail: "CRM, facturación, leads y flujos de trabajo End-to-End.",
      },
      {
        title: "Modelos de IA personalizados",
        detail: "Generación de contenido o análisis de datos.",
      },
      {
        title: "Consultoría estratégica",
        detail: "Sesión quincenal y reporte personalizado de métricas.",
      },
    ],
  },
];

const comparison = [
  ["Diseño Web", "Estático", "Dinámico", "A medida"],
  ["Campañas SEM", "-", "Incluido", "Avanzado"],
  ["Optimización SEO", "Básica", "Proactiva", "Data-Driven"],
  ["Edición Video", "-", "4 al mes", "Ilimitada/Premium"],
  ["Automatización IA", "Básica", "Chatbots", "Procesos End-to-End"],
  ["Soporte", "Email", "Prioritario", "Gestor de Cuenta"],
];

export function PricingToggle() {
  return (
    <section className="section" id="precios" aria-labelledby="pricing-title">
      <div className="section-heading">
        <p className="eyebrow">Precios claros</p>
        <h2 id="pricing-title">Planes de crecimiento digital por etapa</h2>
        <p>
          Elige la base operativa que mejor encaja con tu momento: presencia profesional, tracción comercial o
          automatización avanzada.
        </p>
      </div>

      <div className="pricing-grid">
        {plans.map((plan) => (
          <article className={`price-card ${plan.highlighted ? "featured" : ""}`} key={plan.name}>
            <div className="plan-title">
              {plan.badge ? <p className="badge">{plan.badge}</p> : null}
              <h3>{plan.name}</h3>
              <p>{plan.subtitle}</p>
            </div>
            <p>{plan.description}</p>
            <p className="plan-focus">
              <strong>Enfoque:</strong> {plan.focus}
            </p>
            <ul aria-label={`Servicios incluidos en ${plan.name}`}>
              {plan.services.map((service) => (
                <li className={service.muted ? "muted-feature" : ""} key={service.title}>
                  <span className="feature-title">{service.title}</span>
                  <span className="feature-detail">{service.detail}</span>
                </li>
              ))}
            </ul>
            <div className="plan-action">
              <div className="price" aria-label={`Precio sugerido: ${plan.pricePrefix ?? ""}${plan.price} ${plan.cadence}`}>
                {plan.pricePrefix ? <small>{plan.pricePrefix}</small> : null}
                <span>{plan.price}</span>
                <small>{plan.cadence}</small>
              </div>
              <a className={plan.highlighted ? "button primary" : "button secondary"} href="#auditoria">
                {plan.cta}
              </a>
            </div>
          </article>
        ))}
      </div>

      <div className="comparison-wrap" aria-labelledby="comparison-title">
        <h3 id="comparison-title">Matriz de valor</h3>
        <div className="comparison-scroll" tabIndex={0}>
          <table className="comparison-table">
            <caption>Tabla comparativa de características por plan</caption>
            <thead>
              <tr>
                <th scope="col">Característica</th>
                <th scope="col">Esencial</th>
                <th scope="col">Crecimiento</th>
                <th scope="col">Vanguardia</th>
              </tr>
            </thead>
            <tbody>
              {comparison.map(([feature, essential, growth, vanguard]) => (
                <tr key={feature}>
                  <th scope="row">{feature}</th>
                  <td>{essential}</td>
                  <td>{growth}</td>
                  <td>{vanguard}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
