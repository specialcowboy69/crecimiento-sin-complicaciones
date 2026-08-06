import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "../../components/Logo";
import { PageLinksNav } from "../../components/PageLinksNav";

const logos = ["Python", "Google Cloud", "BigQuery", "Looker Studio", "Meta CAPI"];

const methodology = [
  {
    step: "01",
    title: "Hipotesis",
    text: "Definimos angulos de venta, oferta y audiencia antes de gastar un euro.",
  },
  {
    step: "02",
    title: "Experimento",
    text: "Lanzamos pruebas controladas con creatividades, copies y landings medibles.",
  },
  {
    step: "03",
    title: "Medicion",
    text: "Limpiamos tracking, atribuimos conversiones y leemos senales sin ruido.",
    emphasis: true,
  },
  {
    step: "04",
    title: "Escala",
    text: "Subimos presupuesto solo cuando el CPL y la calidad del lead lo justifican.",
  },
];

const services = [
  {
    title: "Google Ads (Search & Shopping)",
    text: "Captamos la intencion de busqueda real cuando el usuario esta listo para comprar.",
    icon: "search",
  },
  {
    title: "Meta Ads & Social Growth",
    text: "Creamos interrupcion positiva con piezas que parecen contenido organico pero venden como respuesta directa.",
    icon: "spark",
  },
  {
    title: "Creatividades de Alto Impacto",
    text: "Videos e imagenes disenados para retener atencion y mejorar la tasa de respuesta.",
    icon: "play",
  },
  {
    title: "Automatizacion e IA en Ads",
    text: "Detectamos anomalias, fatiga creativa y oportunidades de escala con scripts y bidding inteligente.",
    icon: "pulse",
  },
];

const plans = [
  {
    name: "Esencial",
    price: "900",
    cadence: "/mes",
    description:
      "Para equipos que necesitan ordenar tracking, activar campanas y aprender rapido sin desperdiciar presupuesto.",
    features: [
      "Google Ads o Meta Ads monoplataforma",
      "Tracking base y nomenclatura limpia",
      "1 ciclo semanal de optimizacion",
      "Dashboard ejecutivo de CPL y leads",
    ],
    button: "Empezar con Esencial",
  },
  {
    name: "Crecimiento",
    price: "1.800",
    cadence: "/mes",
    description:
      "Para negocios que ya invierten y quieren bajar CPL con metodologia, testing y mejor lectura de senales.",
    features: [
      "Google Ads + Meta Ads",
      "Server-side tracking y CAPI",
      "Testing creativo y de oferta",
      "Ciclos de aprendizaje con roadmap quincenal",
      "Forecast basico de escala",
    ],
    button: "Elegir Crecimiento",
    featured: true,
    badge: "RECOMENDADO",
  },
  {
    name: "Vanguardia",
    price: "3.200",
    cadence: "/mes",
    description:
      "Para marcas que quieren una operacion paid growth de alta frecuencia con analitica y automatizacion avanzada.",
    features: [
      "Operacion multicanal completa",
      "BigQuery + atribucion avanzada",
      "Alertas de anomalias 24/7",
      "Forecasting y escenarios de presupuesto",
      "Sincronizacion con CRM y calidad de lead",
    ],
    button: "Hablar de Vanguardia",
  },
];

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "SEM y Paid Growth",
  serviceType: ["Pay-per-click", "Digital Marketing", "Conversion Rate Optimization"],
  provider: {
    "@type": "Organization",
    name: "Crecimiento sin complicaciones",
    url: "https://crecimientosincomplicaciones.com",
  },
  areaServed: "ES",
  description:
    "Agencia Paid Growth especializada en gestion Google Ads por resultados, reduccion de CPL y escalado mediante ciclos de aprendizaje basados en datos.",
  about: [
    {
      "@type": "Thing",
      name: "Pay-per-click",
      sameAs: "https://en.wikipedia.org/wiki/Pay-per-click",
    },
    {
      "@type": "Thing",
      name: "Digital marketing",
      sameAs: "https://en.wikipedia.org/wiki/Digital_marketing",
    },
    {
      "@type": "Thing",
      name: "Conversion rate optimization",
      sameAs: "https://en.wikipedia.org/wiki/Conversion_marketing",
    },
  ],
  makesOffer: {
    "@type": "Offer",
    name: "Diagnostico de Paid Growth",
    category: "Agencia Paid Growth",
    availability: "https://schema.org/InStock",
    url: "https://crecimientosincomplicaciones.com/servicios/sem-paid-growth",
  },
};

export const metadata: Metadata = {
  title: "SEM y Paid Growth",
  description:
    "Paid Growth para escalar ROI con medicion limpia, ciclos de aprendizaje y gestion Google Ads por resultados.",
  keywords: [
    "Agencia Paid Growth",
    "Gestion Google Ads por resultados",
    "Especialista en reduccion de CPL",
  ],
  alternates: {
    canonical: "/servicios/sem-paid-growth",
  },
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: "Paid Growth: Ciclos de Aprendizaje para Escalar tu ROI",
    description:
      "Escala tu negocio con un sistema de hipotesis, experimentacion, medicion y optimizacion matematica del CPL.",
    url: "/servicios/sem-paid-growth",
    siteName: "Crecimiento sin complicaciones",
    locale: "es_ES",
    type: "website",
  },
};

function ServiceIcon({ icon }: { icon: string }) {
  if (icon === "search") {
    return (
      <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current stroke-[1.7]">
        <circle cx="11" cy="11" r="6.5" />
        <path d="M16 16l4 4" />
      </svg>
    );
  }

  if (icon === "spark") {
    return (
      <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current stroke-[1.7]">
        <path d="M12 3v4" />
        <path d="M12 17v4" />
        <path d="M3 12h4" />
        <path d="M17 12h4" />
        <path d="M6.5 6.5l3 3" />
        <path d="M14.5 14.5l3 3" />
        <path d="M17.5 6.5l-3 3" />
        <path d="M9.5 14.5l-3 3" />
      </svg>
    );
  }

  if (icon === "play") {
    return (
      <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current stroke-[1.7]">
        <rect x="4" y="5" width="16" height="14" rx="2.5" />
        <path d="M10 9l5 3-5 3z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current stroke-[1.7]">
      <path d="M4 14c1.5 0 1.5-3.5 3-3.5S8.5 18 10 18s1.5-10 3-10 1.5 7 3 7 1.5-2.5 3-2.5" />
    </svg>
  );
}

export default function PaidGrowthPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <div className="min-h-screen !bg-slate-950 !text-slate-50">
        <header className="sticky top-0 z-20 border-b !border-slate-800 !bg-slate-950/95 backdrop-blur">
          <nav className="mx-auto flex min-h-[72px] max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
            <Link className="logo-link !text-slate-50" href="/" aria-label="Crecimiento sin complicaciones, inicio">
              <Logo variant="dark" />
            </Link>

            <div className="hidden items-center gap-8 text-sm font-semibold !text-slate-200 md:flex">
              <a href="#metodologia" className="transition hover:!text-slate-50">
                Metodologia
              </a>
              <a href="#pricing" className="transition hover:!text-slate-50">
                Planes
              </a>
            </div>

            <a
              className="inline-flex min-h-11 items-center justify-center rounded-md !bg-blue-600 px-4 py-3 text-sm font-bold !text-white transition hover:!bg-blue-500"
              href="#pricing"
            >
              Calcular escala
            </a>
          </nav>
        </header>

        <PageLinksNav currentPath="/servicios/sem-paid-growth" />

        <main>
          <section className="relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(148,163,184,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.08) 1px, transparent 1px)",
                backgroundSize: "44px 44px",
              }}
            />
            <div className="absolute left-1/2 top-32 h-[420px] w-[420px] -translate-x-1/2 rounded-full !bg-blue-600/25 blur-3xl" />

            <div className="relative mx-auto flex max-w-7xl flex-col gap-12 px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
              <div className="mx-auto max-w-5xl text-center">
                <p className="mb-4 text-xs font-black uppercase tracking-[0.22em] !text-slate-200">
                  Paid media con disciplina de capital
                </p>
                <h1 className="mx-auto max-w-5xl text-balance text-5xl font-black tracking-[-0.05em] !text-slate-50 sm:text-6xl lg:text-8xl">
                  Paid Growth: Ciclos de Aprendizaje para Escalar tu ROI.
                </h1>
                <p className="mx-auto mt-6 max-w-3xl text-pretty text-lg leading-8 !text-slate-200 sm:text-xl">
                  Dejamos de adivinar. Creamos campanas con hipotesis claras y medicion limpia para reducir tu Coste
                  por Lead (CPL) mediante optimizacion matematica.
                </p>
                <div className="mt-10 flex justify-center">
                  <a
                    className="inline-flex min-h-12 items-center justify-center rounded-lg !bg-blue-600 px-6 py-3 text-sm font-bold !text-white shadow-[0_18px_40px_rgba(37,99,235,0.28)] transition hover:!bg-blue-500"
                    href="#pricing"
                  >
                    Calcular mi Potencial de Escala
                  </a>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <article className="rounded-2xl border !border-slate-800 !bg-slate-900 p-5 shadow-[0_6px_20px_rgba(0,0,0,0.18)]">
                  <span className="mb-2 block font-mono text-xs font-bold uppercase tracking-[0.2em] !text-slate-200">
                    CPL
                  </span>
                  <strong className="font-mono text-3xl font-black !text-slate-50">-40%</strong>
                  <p className="mt-2 text-sm !text-slate-200">Reduccion sobre la base inicial en ventanas de 90 dias.</p>
                </article>
                <article className="rounded-2xl border !border-slate-800 !bg-slate-900 p-5 shadow-[0_6px_20px_rgba(0,0,0,0.18)]">
                  <span className="mb-2 block font-mono text-xs font-bold uppercase tracking-[0.2em] !text-slate-200">
                    Signal
                  </span>
                  <strong className="font-mono text-3xl font-black !text-slate-50">Server-Side</strong>
                  <p className="mt-2 text-sm !text-slate-200">Tracking limpio para decidir con menos ruido y mas confianza.</p>
                </article>
                <article className="rounded-2xl border !border-slate-800 !bg-slate-900 p-5 shadow-[0_6px_20px_rgba(0,0,0,0.18)]">
                  <span className="mb-2 block font-mono text-xs font-bold uppercase tracking-[0.2em] !text-slate-200">
                    ROI Window
                  </span>
                  <strong className="font-mono text-3xl font-black !text-slate-50">+215%</strong>
                  <p className="mt-2 text-sm !text-slate-200">Aumento de volumen cualificado antes de pensar en escalar mas.</p>
                </article>
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="rounded-2xl border !border-slate-800 !bg-slate-900 px-4 py-5 sm:px-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                {logos.map((logo) => (
                  <span
                    key={logo}
                    className="font-mono text-sm font-bold uppercase tracking-[0.18em] !text-slate-200 opacity-70 grayscale transition hover:opacity-100"
                  >
                    {logo}
                  </span>
                ))}
              </div>
            </div>
          </section>

          <section id="metodologia" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="mb-4 text-xs font-black uppercase tracking-[0.22em] !text-slate-200">Metodologia</p>
              <h2 className="text-3xl font-extrabold tracking-[-0.03em] !text-slate-50 sm:text-4xl">
                Un sistema de aprendizaje, no una operativa de anuncios.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 !text-slate-200">
                Todo el servicio gira alrededor de una pregunta sencilla: que necesita pasar para bajar el CPL sin
                sacrificar calidad. La respuesta sale de este flujo.
              </p>
            </div>

            <div className="mt-10 grid gap-4 lg:grid-cols-[minmax(0,1fr)_40px_minmax(0,1fr)_40px_minmax(0,1fr)_40px_minmax(0,1fr)] lg:items-center">
              {methodology.map((item, index) => (
                <div key={item.title} className="contents">
                  <article
                    className={`rounded-2xl border p-6 shadow-[0_10px_30px_rgba(0,0,0,0.18)] ${
                      item.emphasis ? "!border-blue-400/50 !bg-slate-800/90" : "!border-slate-800 !bg-slate-900"
                    }`}
                  >
                    <span className="mb-4 block font-mono text-xs font-black uppercase tracking-[0.22em] !text-slate-200">
                      {item.step}
                    </span>
                    <h3 className="text-xl font-bold !text-slate-50">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 !text-slate-200">{item.text}</p>
                  </article>

                  {index < methodology.length - 1 ? (
                    <div className="hidden items-center justify-center lg:flex">
                      <div className="relative h-[2px] w-full bg-slate-800">
                        <span className="absolute right-0 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rotate-45 border-r-2 border-t-2 border-slate-700" />
                      </div>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {services.map((service) => (
                <article
                  key={service.title}
                  className="rounded-2xl border !border-slate-800 !bg-slate-900 p-8 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)]"
                >
                  <div className="mb-6 !text-blue-400">
                    <ServiceIcon icon={service.icon} />
                  </div>
                  <h3 className="text-lg font-semibold !text-slate-50">{service.title}</h3>
                  <p className="mt-3 text-sm leading-7 !text-slate-200">{service.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="rounded-3xl border !border-slate-800 !bg-slate-900 p-8 sm:p-12">
              <p className="mb-4 text-xs font-black uppercase tracking-[0.22em] !text-slate-200">Caso de exito</p>
              <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end">
                <div>
                  <h2 className="max-w-xl text-3xl font-extrabold tracking-[-0.03em] !text-slate-50 sm:text-4xl">
                    Cuando el tracking se aclara y la decision deja de ser emocional, el CPL cae.
                  </h2>
                  <p className="mt-4 max-w-lg text-base leading-7 !text-slate-200">
                    Reestructuramos audiencias, creatividades, medicion y reglas de optimizacion para convertir una
                    cuenta erratica en un sistema de crecimiento con criterio financiero.
                  </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                  <article className="rounded-2xl border !border-slate-800 !bg-slate-800/50 p-8">
                    <strong className="block text-5xl font-black tracking-[-0.04em] !text-blue-400 sm:text-6xl">
                      -40% CPL
                    </strong>
                    <span className="mt-3 block text-sm font-semibold uppercase tracking-[0.18em] !text-slate-200">
                      En 90 dias
                    </span>
                  </article>

                  <article className="rounded-2xl border !border-slate-800 !bg-slate-800/50 p-8">
                    <strong className="block text-5xl font-black tracking-[-0.04em] !text-blue-400 sm:text-6xl">
                      +215% Leads
                    </strong>
                    <span className="mt-3 block text-sm font-semibold uppercase tracking-[0.18em] !text-slate-200">
                      Volumen de cualificados
                    </span>
                  </article>
                </div>
              </div>
            </div>
          </section>

          <section id="pricing" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="mb-4 text-xs font-black uppercase tracking-[0.22em] !text-slate-200">Planes</p>
              <h2 className="text-3xl font-extrabold tracking-[-0.03em] !text-slate-50 sm:text-4xl">
                Tres formas de operar Paid Growth sin perder claridad ni control.
              </h2>
              <p className="mt-4 text-base leading-7 !text-slate-200">
                Cada tarjeta mantiene la misma estructura para que la comparacion sea limpia y la decision no dependa
                del ruido visual.
              </p>
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {plans.map((plan) => (
                <article
                  key={plan.name}
                  className={`h-full rounded-3xl border p-8 shadow-[0_12px_30px_rgba(0,0,0,0.18)] ${
                    plan.featured ? "scale-100 !border-blue-400/50 !bg-slate-900 md:scale-105" : "!border-slate-800 !bg-slate-900"
                  }`}
                >
                  <div className="flex h-full flex-col">
                    {plan.badge ? (
                      <span className="mb-5 inline-flex self-start rounded-full border border-blue-400/30 bg-blue-400/10 px-3 py-1 text-[0.68rem] font-black uppercase tracking-[0.22em] !text-blue-400">
                        {plan.badge}
                      </span>
                    ) : null}

                    <div>
                      <h3 className="text-2xl font-bold !text-slate-50">{plan.name}</h3>
                      <p className="mt-3 text-sm leading-7 !text-slate-200">{plan.description}</p>
                    </div>

                    <div className="mt-8">
                      <div className="flex items-end gap-2">
                        <small className="pb-2 text-sm font-bold !text-blue-400">EUR</small>
                        <strong className="text-5xl font-black tracking-[-0.04em] !text-blue-400">{plan.price}</strong>
                        <small className="pb-2 text-sm font-bold !text-slate-200">{plan.cadence}</small>
                      </div>
                    </div>

                    <ul className="mt-8 grid gap-4">
                      {plan.features.map((feature) => (
                        <li key={feature} className="grid grid-cols-[18px_minmax(0,1fr)] items-start gap-3 text-sm !text-slate-200">
                          <span className="pt-0.5 !text-blue-400">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      className={`mt-auto inline-flex min-h-12 items-center justify-center rounded-lg px-4 py-3 text-sm font-bold transition ${
                        plan.featured
                          ? "!bg-blue-600 !text-white hover:!bg-blue-500"
                          : "border !border-slate-700 !bg-slate-800 !text-slate-50 hover:!border-slate-500 hover:!bg-slate-700"
                      }`}
                      href="/#auditoria"
                    >
                      {plan.button}
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
