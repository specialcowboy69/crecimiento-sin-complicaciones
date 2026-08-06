"use client";

import { UIEvent, useRef, useState } from "react";

function CaseLogo({ company }: { company: string }) {
  if (company === "EcoBite") {
    return (
      <svg className="case-logo ecobite-logo" width="112" height="48" viewBox="0 0 112 48" role="img" aria-label="Logo de EcoBite">
        <rect width="112" height="48" rx="12" fill="#f8fafc" stroke="#e2e8f0" />
        <path d="M25 31c10 0 17-7 17-21-14 0-22 8-22 18 0 2 2 3 5 3Z" fill="#bbf7d0" />
        <path d="M24 30c5-7 10-11 17-15" fill="none" stroke="#047857" strokeLinecap="round" strokeWidth="3" />
        <text x="52" y="29" fill="#064e3b">EcoBite</text>
      </svg>
    );
  }

  if (company === "Finova App") {
    return (
      <svg className="case-logo finova-logo" width="128" height="48" viewBox="0 0 128 48" role="img" aria-label="Logo de Finova App">
        <rect width="128" height="48" rx="12" fill="#f8fafc" stroke="#e2e8f0" />
        <circle cx="25" cy="24" r="13" fill="#dbeafe" />
        <path d="M18 27l5-6 5 4 6-8" fill="none" stroke="#2563eb" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
        <text x="48" y="29" fill="#1e3a8a">Finova</text>
      </svg>
    );
  }

  return (
    <svg className="case-logo lumina-logo" width="148" height="48" viewBox="0 0 148 48" role="img" aria-label="Logo de Lumina Interiors">
      <rect width="148" height="48" rx="12" fill="#f8fafc" stroke="#e2e8f0" />
      <path d="M18 28h24l-5-14H23l-5 14Z" fill="#fef3c7" stroke="#b45309" strokeLinejoin="round" strokeWidth="2" />
      <path d="M30 28v8" fill="none" stroke="#b45309" strokeLinecap="round" strokeWidth="2" />
      <path d="M22 36h16" fill="none" stroke="#b45309" strokeLinecap="round" strokeWidth="2" />
      <text x="54" y="29" fill="#78350f">Lumina</text>
    </svg>
  );
}

const cases = [
  {
    company: "EcoBite",
    sector: "E-commerce de comida saludable",
    challengeTitle: "Dejar de depender al 100% de Facebook Ads",
    challenge:
      "EcoBite tenia un CAC demasiado alto y necesitaba una fuente de trafico sostenible a largo plazo.",
    solution: "Auditoria tecnica + estrategia SEO de contenidos",
    metrics: [
      { value: "+320%", label: "Crecimiento en trafico organico" },
      { value: "-45%", label: "Reduccion del coste de adquisicion" },
      { value: "Top 3", label: "Posicion en Google para su palabra clave principal" },
    ],
    quote:
      "Pasamos de comprar cada visita a construir un canal que ahora trabaja para nosotros cada semana.",
    author: "CEO de EcoBite",
  },
  {
    company: "Finova App",
    sector: "Startup fintech",
    challengeTitle: "Explicar mejor un producto complejo",
    challenge:
      "Recibian muchas visitas, pero los usuarios no entendian la propuesta y casi nadie agendaba una demo.",
    solution: "Rediseno UI/UX y optimizacion del funnel de conversion",
    metrics: [
      { value: "3x", label: "Multiplicacion de demos agendadas" },
      { value: "+115%", label: "Aumento en la tasa de conversion" },
      { value: "-60%", label: "Disminucion de la tasa de rebote" },
    ],
    quote:
      "La web dejo de ser una explicacion dificil y se convirtio en una conversacion comercial clara.",
    author: "Directora de Marketing de Finova App",
  },
  {
    company: "Lumina Interiors",
    sector: "Tienda B2B de mobiliario",
    challengeTitle: "Escalar Black Friday sin quemar presupuesto",
    challenge:
      "Querian crecer en Google Ads, pero necesitaban asegurar retorno antes de subir la inversion.",
    solution: "Reestructuracion de campanas en Google Ads + retargeting dinamico",
    metrics: [
      { value: "5.2x", label: "ROAS - retorno de inversion publicitaria" },
      { value: "+85%", label: "Aumento de ingresos interanual" },
      { value: "12.000 EUR", label: "Ahorro en presupuesto mal optimizado" },
    ],
    quote:
      "Por primera vez escalamos una campana grande con control real sobre el retorno.",
    author: "CMO de Lumina Interiors",
  },
];

export function CaseCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  function scrollToCase(index: number) {
    const track = trackRef.current;
    if (!track) return;

    const boundedIndex = Math.max(0, Math.min(index, cases.length - 1));
    const slide = track.children.item(boundedIndex) as HTMLElement | null;
    if (!slide) return;

    track.scrollTo({ left: slide.offsetLeft, behavior: "smooth" });
    setActiveIndex(boundedIndex);
  }

  function onScroll(event: UIEvent<HTMLDivElement>) {
    const track = event.currentTarget;
    const firstSlide = track.children.item(0) as HTMLElement | null;
    if (!firstSlide) return;

    const slideWidth = firstSlide.offsetWidth + 18;
    const index = Math.round(track.scrollLeft / slideWidth);
    setActiveIndex(Math.max(0, Math.min(index, cases.length - 1)));
  }

  return (
    <div className="case-carousel" aria-roledescription="carrusel" aria-label="Casos de exito destacados">
      <div className="case-track" ref={trackRef} onScroll={onScroll} tabIndex={0}>
        {cases.map((item, index) => (
          <article className="case-slide" key={item.company} aria-label={`${index + 1} de ${cases.length}: ${item.company}`}>
            <header className="case-company">
              <CaseLogo company={item.company} />
              <div>
                <strong>{item.company}</strong>
                <p>{item.sector}</p>
              </div>
            </header>

            <div className="case-story">
              <p className="case-kicker">El reto</p>
              <h3>{item.challengeTitle}</h3>
              <p>{item.challenge}</p>
              <p className="case-solution"><b>Solucion:</b> {item.solution}</p>
            </div>

            <dl className="case-metrics" aria-label={`Metricas principales de ${item.company}`}>
              {item.metrics.map((metric) => (
                <div key={metric.label}>
                  <dt>{metric.value}</dt>
                  <dd>{metric.label}</dd>
                </div>
              ))}
            </dl>

            <figure className="case-quote">
              <blockquote>{item.quote}</blockquote>
              <figcaption>{item.author}</figcaption>
            </figure>
          </article>
        ))}
      </div>

      <div className="case-controls" aria-label="Controles del carrusel">
        <button className="button secondary" type="button" onClick={() => scrollToCase(activeIndex - 1)} disabled={activeIndex === 0}>
          Anterior
        </button>
        <div className="case-dots" role="tablist" aria-label="Seleccionar caso de exito">
          {cases.map((item, index) => (
            <button
              key={item.company}
              type="button"
              role="tab"
              aria-selected={activeIndex === index}
              aria-label={`Ver caso ${index + 1}: ${item.company}`}
              onClick={() => scrollToCase(index)}
            />
          ))}
        </div>
        <button className="button primary" type="button" onClick={() => scrollToCase(activeIndex + 1)} disabled={activeIndex === cases.length - 1}>
          Siguiente
        </button>
      </div>
    </div>
  );
}



