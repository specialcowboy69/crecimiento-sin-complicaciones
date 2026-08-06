import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "../../components/Logo";
import { PageLinksNav } from "../../components/PageLinksNav";

export const metadata: Metadata = {
  title: "CRO y Landing Pages",
  description:
    "Landing pages que convierten, tests A/B automatizados y sistemas de personalización con IA. Multiplica tu tasa de conversión sin aumentar el tráfico.",
  keywords: [
    "CRO",
    "Conversion Rate Optimization",
    "landing pages",
    "tests A/B",
    "personalización web",
    "UX data-driven",
    "optimización conversión",
  ],
  openGraph: {
    title: "CRO y Landing Pages que Convierten",
    description:
      "Landing pages que convierten, tests A/B automatizados y sistemas de personalización con IA. Multiplica tu tasa de conversión sin aumentar el tráfico.",
    url: "/servicios/cro-landing-systems",
    siteName: "Crecimiento sin complicaciones",
    locale: "es_ES",
    type: "website",
  },
  alternates: {
    canonical: "/servicios/cro-landing-systems",
  },
  robots: {
    index: false,
    follow: true,
  },
};

const timelineSteps = [
  {
    step: "01",
    title: "Auditoría de conversión",
    description:
      "Analizamos cada pantalla con mapas de calor, grabaciones de sesión y funnel analytics para detectar exactamente dónde pierdes leads.",
  },
  {
    step: "02",
    title: "Hipótesis + Diseño",
    description:
      "Formulamos hipótesis basadas en datos reales (no en opiniones) y diseñamos variantes de alta fidelidad listas para testear.",
  },
  {
    step: "03",
    title: "Tests A/B inteligentes",
    description:
      "Lanzamos experimentos con significancia estadística real. Nada de «parece que funciona». Solo decisiones con p < 0.05.",
  },
  {
    step: "04",
    title: "Personalización con IA",
    description:
      "Implementamos sistemas que adaptan headlines, CTAs y pruebas sociales según la fuente de tráfico, dispositivo y comportamiento previo del usuario.",
  },
  {
    step: "05",
    title: "Escalado y mantenimiento",
    description:
      "Lo que funciona se convierte en el nuevo control. Iteramos continuamente para que tu tasa de conversión nunca deje de crecer.",
  },
];

const metrics = [
  { value: "+38%", label: "CR Promedio", sub: "Incremento en tasa de conversión" },
  { value: "−41%", label: "CPA", sub: "Reducción del costo por adquisición" },
  { value: "+2.7×", label: "ROAS", sub: "Retorno sobre inversión publicitaria" },
  { value: "+64%", label: "Retención", sub: "Usuarios que vuelven en 30 días" },
];

const services = [
  {
    title: "Landing Pages que venden",
    description:
      "Diseño y desarrollo de landings ultrarrápidas (Lighthouse 95+), con copywriting persuasivo, social proof estratégica y CTAs de alto contraste.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
        <polyline points="6 10 10 14 14 10 18 14" />
      </svg>
    ),
  },
  {
    title: "Tests A/B automatizados",
    description:
      "Infraestructura de experimentación con Google Optimize 360, VWO o soluciones server-side. Segmentación avanzada y dashboards en tiempo real.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
        <line x1="2" y1="20" x2="22" y2="20" />
      </svg>
    ),
  },
  {
    title: "Personalización dinámica",
    description:
      "Mostramos el mensaje correcto a la persona correcta. Headlines, imágenes y ofertas que cambian según UTM, geolocalización, dispositivo o etapa del funnel.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
        <path d="M17 5h4v4" />
      </svg>
    ),
  },
  {
    title: "UX Copywriting & Psicología",
    description:
      "Aplicamos sesgos cognitivos, microcopy y jerarquía visual para reducir la fricción y guiar al usuario hacia la conversión sin que sienta presión.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
];

const faqs = [
  {
    question: "¿Cuánto tiempo tarda en verse una mejora real en conversión?",
    answer:
      "Depende del tráfico. Con más de 10.000 visitas/mes, un test A/B puede alcanzar significancia estadística en 2-3 semanas. Con menos tráfico, trabajamos con experimentos de menor varianza y optimizaciones cualitativas que generan impacto desde la primera semana.",
  },
  {
    question: "¿Hacen solo la estrategia o también implementan?",
    answer:
      "Todo. Diseñamos, escribimos el copy, desarrollamos las landings, configuramos las herramientas de testing y medimos. No entregamos un PDF de recomendaciones; entregamos páginas funcionando y datos reales de mejora.",
  },
  {
    question: "¿Qué diferencia hay entre su CRO y el de una agencia tradicional?",
    answer:
      "Nosotros no hacemos «mejores prácticas genéricas». Cada decisión de diseño o copy sale de un dato cuantitativo (heatmaps, funnel analytics, encuestas post-compra) validado con experimentos controlados. Además, integramos IA para personalización que las agencias tradicionales ni siquiera mencionan.",
  },
  {
    question: "¿Necesito mucho tráfico para que el CRO tenga sentido?",
    answer:
      "No. Con tráfico bajo hacemos CRO cualitativo: test de usabilidad, grabaciones de sesión, encuestas y optimización de fricciones evidentes. A partir de 5.000 visitas/mes ya podemos correr tests A/B con segmentación inteligente.",
  },
  {
    question: "¿Cómo miden el éxito de un proyecto de CRO?",
    answer:
      "La métrica principal es tasa de conversión (CR) y revenue por sesión (RPS). Pero también medimos métricas secundarias como tasa de rebote, tiempo hasta conversión, profundidad de scroll y NPS post-compra. Todo en dashboards vivos que ves en tiempo real.",
  },
  {
    question: "¿Trabajan con nuestra herramienta actual o imponen la suya?",
    answer:
      "Nos adaptamos a tu stack. Si ya usas Google Optimize, VWO, Hotjar, Amplitude o Microsoft Clarity, trabajamos sobre eso. Si no tienes nada, montamos el stack completo que necesites sin coste adicional de licencias en el primer trimestre.",
  },
];

const plans = [
  {
    name: "Growth",
    badge: null,
    description:
      "Para empresas que empiezan a tomarse la conversión en serio y necesitan victorias rápidas con bajo riesgo.",
    price: "1.500",
    cadence: "/mes",
    features: [
      "Auditoría CRO inicial completa",
      "2 landings optimizadas al mes",
      "Tests A/B con Google Optimize o VWO",
      "Reporte mensual de conversión",
      "Mapas de calor y grabaciones",
      "Slack compartido",
    ],
    button: "Empieza a convertir",
    featured: false,
  },
  {
    name: "Scale",
    badge: "Más popular",
    description:
      "Para scale-ups y eCommerce que necesitan un sistema de experimentación continuo con personalización real.",
    price: "3.200",
    cadence: "/mes",
    features: [
      "Todo lo de Growth",
      "4 landings + tests ilimitados",
      "Personalización dinámica por fuente",
      "UX Copywriting con psicología cognitiva",
      "Dashboard en tiempo real",
      "Optimización de funnel completo",
      "Soporte prioritario 24h",
    ],
    button: "Escala tu CR",
    featured: true,
  },
  {
    name: "Enterprise",
    badge: null,
    description:
      "Para equipos de producto y marketing que necesitan CRO integrado en su stack con IA y server-side testing.",
    price: "A medida",
    cadence: "",
    features: [
      "Todo lo de Scale",
      "Server-side testing avanzado",
      "Personalización con ML predictivo",
      "Integración con CRM y CDP",
      "Equipo dedicado de 3 personas",
      "Roadmap trimestral de experimentos",
      "Formación interna del equipo",
    ],
    button: "Hablemos",
    featured: false,
  },
];

export default function CROLandingSystemsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "CRO & Landing Systems",
    provider: {
      "@type": "Organization",
      name: "Crecimiento sin complicaciones",
    },
    description:
      "Servicio integral de Conversion Rate Optimization: landing pages que convierten, tests A/B automatizados y personalización con IA.",
    serviceType: "CRO, Landing Pages, A/B Testing, Personalización Web",
    areaServed: {
      "@type": "Country",
      name: "ES",
    },
  };

  const faqLd = {
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

      <div className="min-h-screen !bg-slate-950">
        {/* ───── Sticky nav ───── */}
        <header className="sticky top-0 z-50 border-b !border-slate-800 !bg-slate-950/95 backdrop-blur supports-[backdrop-filter]:!bg-slate-950/80">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
            <Link
              href="/"
              className="logo-link !text-slate-50"
              aria-label="Crecimiento sin complicaciones, inicio"
            >
              <Logo variant="dark" />
            </Link>
            <nav className="hidden items-center gap-6 md:flex">
              <Link
                href="/servicios/sem-paid-growth"
                className="text-sm font-medium !text-slate-300 hover:!text-slate-50 transition-colors"
              >
                SEM
              </Link>
              <Link
                href="/servicios/seo-tecnico-arquitectura-entidades"
                className="text-sm font-medium !text-slate-300 hover:!text-slate-50 transition-colors"
              >
                SEO
              </Link>
              <Link
                href="/servicios/cro-landing-systems"
                className="text-sm font-bold !text-blue-400"
              >
                CRO
              </Link>
            </nav>
            <Link
              href="/#auditoria"
              className="inline-flex min-h-11 items-center rounded-lg !bg-blue-600 px-5 text-sm font-bold !text-white hover:!bg-blue-500 transition-colors"
            >
              Auditoría gratis
            </Link>
          </div>
        </header>

        <PageLinksNav currentPath="/servicios/cro-landing-systems" />

        <main>
          {/* ═══════ HERO ═══════ */}
          <section className="relative overflow-hidden px-4 pb-20 pt-16 sm:px-6 sm:pb-28 sm:pt-24 lg:px-8">
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle,rgba(56,189,248,0.12)_1px,transparent_1px)] bg-[length:28px_28px]" />
            <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-[120px]" />

            <div className="mx-auto max-w-7xl">
              <div className="max-w-3xl">
                <p className="mb-5 text-xs font-black uppercase tracking-[0.22em] !text-blue-400">
                  CRO &amp; Landing Systems
                </p>
                <h1 className="text-4xl font-extrabold tracking-[-0.04em] !text-slate-50 sm:text-5xl lg:text-6xl">
                  Convierte más sin gastar un euro más en tráfico.
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-relaxed !text-slate-200">
                  Diseñamos landing pages que venden, ejecutamos tests A/B con rigor
                  estadístico y desplegamos sistemas de personalización con IA para que
                  cada visita rinda al máximo.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href="/#auditoria"
                    className="inline-flex min-h-12 items-center rounded-lg !bg-blue-600 px-6 text-sm font-bold !text-white hover:!bg-blue-500 transition-colors shadow-lg shadow-blue-600/25"
                  >
                    Quiero una auditoría CRO
                  </Link>
                  <Link
                    href="#metodologia"
                    className="inline-flex min-h-12 items-center rounded-lg border !border-slate-700 !bg-slate-800 px-6 text-sm font-bold !text-slate-50 hover:!border-slate-500 hover:!bg-slate-700 transition-colors"
                  >
                    Ver metodología
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* ═══════ TIMELINE ═══════ */}
          <section id="metodologia" className="px-4 py-20 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <div className="max-w-3xl">
                <p className="mb-4 text-xs font-black uppercase tracking-[0.22em] !text-blue-400">
                  Cómo lo hacemos
                </p>
                <h2 className="text-3xl font-extrabold tracking-[-0.03em] !text-slate-50 sm:text-4xl">
                  Del diagnóstico a la conversión: un sistema, no un milagro.
                </h2>
                <p className="mt-4 text-base leading-7 !text-slate-200">
                  El CRO no es cambiar el color de un botón y rezar. Es un proceso
                  científico iterativo que mide, hipotetiza, testea y escala. Así
                  funciona nuestro sistema en 5 fases.
                </p>
              </div>

              <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
                {timelineSteps.map((step, i) => (
                  <article
                    key={step.step}
                    className="group relative rounded-2xl !bg-slate-800/40 p-6 sm:p-8"
                  >
                    <span className="text-4xl font-black tracking-[-0.04em] !text-blue-400/30">
                      {step.step}
                    </span>
                    <h3 className="mt-4 text-lg font-bold !text-slate-50">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 !text-slate-300">
                      {step.description}
                    </p>
                    {/* Arrow connector between cards (hidden on mobile & last item) */}
                    {i < timelineSteps.length - 1 && (
                      <div className="absolute -right-4 top-1/2 z-10 hidden -translate-y-1/2 lg:block">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="!text-slate-600"
                        >
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </div>
                    )}
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* ═══════ METHODOLOGY 3-COL ═══════ */}
          <section className="px-4 py-20 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <div className="max-w-3xl">
                <p className="mb-4 text-xs font-black uppercase tracking-[0.22em] !text-blue-400">
                  Metodología
                </p>
                <h2 className="text-3xl font-extrabold tracking-[-0.03em] !text-slate-50 sm:text-4xl">
                  CRO científico, no opinología.
                </h2>
              </div>

              <div className="mt-14 grid gap-8 md:grid-cols-3">
                {/* Card 1 */}
                <div className="rounded-2xl !bg-slate-800/40 p-8">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl !bg-blue-600/10">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="!text-blue-400"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                      <line x1="8" y1="11" x2="14" y2="11" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold !text-slate-50">
                    Investigación cuantitativa
                  </h3>
                  <p className="mt-3 text-sm leading-6 !text-slate-300">
                    Heatmaps, scroll maps, grabaciones de sesión, funnel analytics y
                    encuestas on-site. Detectamos cada punto de fricción con datos, no
                    con corazonadas.
                  </p>
                </div>

                {/* Card 2 */}
                <div className="rounded-2xl !bg-slate-800/40 p-8">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl !bg-blue-600/10">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="!text-blue-400"
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold !text-slate-50">
                    Hipótesis documentadas
                  </h3>
                  <p className="mt-3 text-sm leading-6 !text-slate-300">
                    Cada test nace de una hipótesis escrita con formato: «Si hacemos X,
                    esperamos Y porque Z». Nada de disparar a ciegas. Todo trazable.
                  </p>
                </div>

                {/* Card 3 */}
                <div className="rounded-2xl !bg-slate-800/40 p-8">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl !bg-blue-600/10">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="!text-blue-400"
                    >
                      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold !text-slate-50">
                    Iteración perpetua
                  </h3>
                  <p className="mt-3 text-sm leading-6 !text-slate-300">
                    El ganador de un test se convierte en el nuevo control. Nunca
                    dejamos de iterar. La tasa de conversión no tiene techo: siempre hay
                    un siguiente nivel.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ═══════ METRICS ═══════ */}
          <section className="px-4 py-20 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <div className="overflow-hidden rounded-3xl !bg-slate-800/30 px-6 py-14 sm:px-10 sm:py-20 lg:px-16">
                <div className="max-w-3xl">
                  <p className="mb-4 text-xs font-black uppercase tracking-[0.22em] !text-blue-400">
                    Resultados reales
                  </p>
                  <h2 className="text-3xl font-extrabold tracking-[-0.03em] !text-slate-50 sm:text-4xl">
                    Lo que ganan nuestros clientes cuando optimizan su conversión.
                  </h2>
                </div>

                <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                  {metrics.map((metric) => (
                    <div key={metric.label} className="text-center sm:text-left">
                      <p className="text-5xl font-black tracking-[-0.04em] !text-blue-400 sm:text-6xl">
                        {metric.value}
                      </p>
                      <p className="mt-3 text-base font-bold !text-slate-50">
                        {metric.label}
                      </p>
                      <p className="mt-1 text-sm !text-slate-400">{metric.sub}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ═══════ SERVICES 2×2 ═══════ */}
          <section className="px-4 py-20 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <div className="max-w-3xl">
                <p className="mb-4 text-xs font-black uppercase tracking-[0.22em] !text-blue-400">
                  Servicios CRO
                </p>
                <h2 className="text-3xl font-extrabold tracking-[-0.03em] !text-slate-50 sm:text-4xl">
                  Todo lo que necesitas para convertir más.
                </h2>
              </div>

              <div className="mt-14 grid gap-6 sm:grid-cols-2">
                {services.map((service) => (
                  <article
                    key={service.title}
                    className="group rounded-2xl !bg-slate-800/40 p-8 transition-colors hover:!bg-slate-800/70"
                  >
                    <div className="mb-5 !text-blue-400">{service.icon}</div>
                    <h3 className="text-lg font-bold !text-slate-50">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 !text-slate-300">
                      {service.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* ═══════ FAQ ═══════ */}
          <section
            aria-labelledby="faq-title"
            className="px-4 py-20 sm:px-6 lg:px-8"
          >
            <div className="mx-auto max-w-3xl">
              <p className="mb-4 text-xs font-black uppercase tracking-[0.22em] !text-blue-400">
                FAQ
              </p>
              <h2
                id="faq-title"
                className="text-3xl font-extrabold tracking-[-0.03em] !text-slate-50 sm:text-4xl"
              >
                Preguntas frecuentes sobre CRO.
              </h2>

              <div className="mt-10 space-y-3">
                {faqs.map((faq) => (
                  <details
                    key={faq.question}
                    className="group rounded-xl !bg-slate-800/40"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between px-6 py-5 text-sm font-bold !text-slate-50 [&::-webkit-details-marker]:hidden">
                      {faq.question}
                      <span className="text-sm !text-slate-500">{
                        faq.answer
                      }</span>
                    </summary>
                    <div className="px-6 pb-5 text-sm leading-6 !text-slate-300">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </section>

          {/* ═══════ PRICING ═══════ */}
          <section className="px-4 py-20 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <div className="max-w-3xl">
                <p className="mb-4 text-xs font-black uppercase tracking-[0.22em] !text-blue-400">
                  Inversión
                </p>
                <h2 className="text-3xl font-extrabold tracking-[-0.03em] !text-slate-50 sm:text-4xl">
                  Planes de CRO según tu volumen de tráfico y ambición.
                </h2>
              </div>

              <div className="mt-14 grid gap-8 lg:grid-cols-3">
                {plans.map((plan) => (
                  <article
                    key={plan.name}
                    className={`flex flex-col h-full rounded-2xl p-8 transition-transform ${
                      plan.featured
                        ? "scale-100 md:scale-105 !bg-slate-800 border !border-blue-400/50 shadow-xl shadow-blue-600/10 relative z-10"
                        : "!bg-slate-800/40 border !border-slate-800"
                    }`}
                  >
                    {plan.badge && (
                      <span className="mb-4 inline-flex self-start rounded-full !bg-blue-600/15 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] !text-blue-400">
                        {plan.badge}
                      </span>
                    )}
                    <h3 className="text-xl font-bold !text-slate-50">{plan.name}</h3>
                    <p className="mt-2 text-sm leading-6 !text-slate-300">
                      {plan.description}
                    </p>

                    <div className="mt-6">
                      <span className="text-4xl font-black tracking-[-0.04em] !text-slate-50">
                        {plan.price}
                      </span>
                      {plan.cadence && (
                        <span className="ml-1 text-sm !text-slate-400">
                          {plan.cadence}
                        </span>
                      )}
                    </div>

                    <ul className="mt-8 space-y-3 flex-1">
                      {plan.features.map((feat) => (
                        <li
                          key={feat}
                          className="grid grid-cols-[18px_minmax(0,1fr)] gap-3 text-sm !text-slate-200"
                        >
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="!text-blue-400 mt-0.5 shrink-0"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          {feat}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto pt-8">
                      <Link
                        href="/#auditoria"
                        className={`inline-flex w-full min-h-12 items-center justify-center rounded-lg text-sm font-bold transition-colors ${
                          plan.featured
                            ? "!bg-blue-600 !text-white hover:!bg-blue-500 shadow-lg shadow-blue-600/25"
                            : "border !border-slate-700 !bg-slate-800 !text-slate-50 hover:!border-slate-500 hover:!bg-slate-700"
                        }`}
                      >
                        {plan.button}
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* ═══════ FOOTER CTA ═══════ */}
          <section className="px-4 pb-24 pt-10 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <div className="rounded-3xl !bg-slate-800/30 px-8 py-14 sm:px-14 sm:py-20">
                <p className="text-xs font-black uppercase tracking-[0.22em] !text-blue-400">
                  Empieza hoy
                </p>
                <h2 className="mt-4 text-3xl font-extrabold tracking-[-0.03em] !text-slate-50 sm:text-4xl">
                  ¿Cuánto estás perdiendo por no optimizar?
                </h2>
                <p className="mt-4 text-base leading-7 !text-slate-200">
                  Solicita una auditoría CRO gratuita de tu landing o funnel principal.
                  Te entregamos un informe con los 3 puntos de fricción que más
                  conversión te están costando y un plan para resolverlos.
                </p>
                <Link
                  href="/#auditoria"
                  className="mt-8 inline-flex min-h-12 items-center rounded-lg !bg-blue-600 px-8 text-sm font-bold !text-white hover:!bg-blue-500 transition-colors shadow-lg shadow-blue-600/25"
                >
                  Solicitar auditoría CRO gratuita
                </Link>
              </div>
            </div>
          </section>
        </main>

        {/* ───── Site Footer ───── */}
        <footer className="border-t !border-slate-800 px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl text-center text-sm !text-slate-500">
            &copy; {new Date().getFullYear()} CSComplicaciones. Todos los derechos
            reservados.
          </div>
        </footer>
      </div>
    </>
  );
}
