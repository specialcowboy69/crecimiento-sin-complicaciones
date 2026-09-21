import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AiDiagnosticForm } from "../components/AiDiagnosticForm";
import { LandingServicesMenu } from "../components/LandingServicesMenu";
import { Logo } from "../components/Logo";
import { breadcrumbJsonLd } from "../lib/structuredData";

const platforms = [
  "OpenAI",
  "Anthropic",
  "Google Gemini",
  "n8n",
  "Make",
  "WhatsApp API",
  "Microsoft Azure",
  "Salesforce",
  "HubSpot",
];

const bottlenecks = [
  "Ventas pierde horas filtrando leads fríos de forma manual.",
  "Las respuestas tardías en WhatsApp o email hacen perder oportunidades.",
  "Facturas, documentos y tareas administrativas dependen de procesos repetitivos.",
  "Los datos están dispersos y las decisiones llegan tarde.",
];

const outcomes = [
  "Agentes de IA que cualifican leads y agendan citas en el CRM.",
  "Respuestas instantáneas 24/7 con lenguaje natural y contexto del negocio.",
  "Procesamiento automatizado de documentos sin intervención manual constante.",
  "Cuadros de mando con datos operativos y señales accionables.",
];

const departments = [
  {
    area: "Ventas y marketing",
    items: [
      "Agentes de captación y cualificación automática de leads.",
      "Nutrición personalizada por WhatsApp API y email.",
      "Copys, creatividades y pruebas A/B asistidas por IA.",
    ],
  },
  {
    area: "Atencion al cliente",
    items: [
      "Chatbots avanzados entrenados con el conocimiento interno de la empresa.",
      "Asistentes conversacionales con RAG para respuestas con contexto.",
      "Integración con soporte, tickets y call centers 24/7.",
    ],
  },
  {
    area: "Operaciones y finanzas",
    items: [
      "Lectura y clasificación automatizada de facturas y presupuestos.",
      "Control inteligente de inventarios y predicción de demanda.",
      "Flujos RPA con IA para reducir errores y tareas manuales.",
    ],
  },
  {
    area: "Recursos humanos",
    items: [
      "Filtrado inicial de CVs en procesos de selección.",
      "Onboarding automatizado para nuevos empleados.",
      "Asistentes internos para dudas frecuentes y documentación.",
    ],
  },
];

const phases = [
  {
    step: "01",
    title: "Audit y hoja de ruta",
    text: "Analizamos tus flujos actuales, detectamos cuellos de botella y priorizamos los procesos con mayor impacto.",
  },
  {
    step: "02",
    title: "Desarrollo e integración",
    text: "Configuramos modelos, pipelines y conectores API con tus sistemas: CRM, ERP, WhatsApp, email o bases de datos.",
  },
  {
    step: "03",
    title: "Entrenamiento y despliegue",
    text: "Entrenamos la IA con el contexto de tu negocio, definimos limites de seguridad y validamos una prueba de concepto.",
  },
  {
    step: "04",
    title: "Medición y mejora continua",
    text: "Medimos KPIs, ajustamos el comportamiento del sistema y acompañamos a tu equipo durante la adopción.",
  },
];

const differentiators = [
  {
    title: "Agentes a medida",
    text: "No vendemos bots genéricos. Creamos sistemas entrenados con la información, tono y procesos de tu negocio.",
  },
  {
    title: "KPIs claros",
    text: "Definimos éxito antes de construir: tiempo ahorrado, conversión, calidad del lead o reducción de errores.",
  },
  {
    title: "Pruebas de concepto",
    text: "Validamos la solucion en un entorno controlado antes de escalarla a toda la organizacion.",
  },
  {
    title: "Seguridad y privacidad",
    text: "Trabajamos con criterios RGPD, control de accesos y flujos pensados para proteger datos sensibles.",
  },
];

const faqs = [
  {
    question: "¿Es necesario cambiar el CRM o ERP que ya utiliza mi empresa?",
    answer:
      "No. Las soluciones se conectan a la infraestructura tecnológica actual mediante APIs, conectores o automatizaciones seguras.",
  },
  {
    question: "¿Cuánto tiempo se tarda en ver resultados?",
    answer:
      "Las primeras automatizaciones y pruebas de concepto suelen estar operativas en semanas. Los primeros resultados medibles suelen aparecer entre 30 y 90 días.",
  },
  {
    question: "¿Mis datos empresariales estarán seguros?",
    answer:
      "Sí. Definimos permisos, acuerdos de confidencialidad, criterios RGPD y modelos empresariales que no usan tus datos privados para entrenar modelos públicos.",
  },
  {
    question: "¿Qué ocurre si mi equipo no sabe usar herramientas de IA?",
    answer:
      "Incluimos formación, documentación y acompañamiento para que el equipo adopte los nuevos procesos sin fricción.",
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Agencia de Inteligencia Artificial y Automatización para Empresas",
    serviceType: ["Inteligencia Artificial", "Automatización de procesos", "Agentes IA"],
    provider: {
      "@type": "Organization",
      name: "Crecimiento sin complicaciones",
      url: "https://www.crecimientosincomplicaciones.com",
    },
    areaServed: "ES",
    description:
      "Soluciones de inteligencia artificial y automatización para empresas: agentes IA, chatbots, integraciones CRM/ERP y automatización de procesos.",
    makesOffer: {
      "@type": "Offer",
      name: "Auditoría gratuita",
      category: "Automatización empresarial con IA",
      availability: "https://schema.org/InStock",
      url: "https://www.crecimientosincomplicaciones.com/soluciones-inteligencia-artificial-empresas",
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
  {
    ...breadcrumbJsonLd([
      { name: "Inicio", path: "/" },
      {
        name: "Soluciones de inteligencia artificial para empresas",
        path: "/soluciones-inteligencia-artificial-empresas",
      },
    ]),
    "@type": "BreadcrumbList",
  },
];

export const metadata: Metadata = {
  title: "IA para Empresas",
  description:
    "Optimiza las operaciones de tu empresa con agentes de IA, chatbots, automatización de procesos e integraciones CRM/ERP. Solicita tu auditoría gratuita.",
  keywords: [
    "agencia inteligencia artificial empresas",
    "automatizacion IA empresas",
    "agentes IA para empresas",
    "automatizacion de procesos empresariales",
  ],
  alternates: {
    canonical: "/soluciones-inteligencia-artificial-empresas",
  },
  openGraph: {
    title: "Inteligencia Artificial y Automatización para Empresas",
    description:
      "Agentes IA, automatizaciones e integraciones para reducir tareas repetitivas y escalar operaciones con datos.",
    url: "/soluciones-inteligencia-artificial-empresas",
    siteName: "Crecimiento sin complicaciones",
    locale: "es_ES",
    type: "website",
  },
};

export default function AiSolutionsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <div className="ai-page landing-light min-h-screen bg-slate-950 text-slate-50">
        <header className="sticky top-0 z-20 border-b border-slate-800 bg-slate-950/95 backdrop-blur">
          <nav className="mx-auto flex min-h-[72px] max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
            <Link className="logo-link text-slate-50" href="/" aria-label="Crecimiento sin complicaciones, inicio">
              <Logo variant="light" />
            </Link>
            <div className="hidden items-center gap-2 text-sm font-semibold text-slate-300 lg:flex">
              <a className="rounded-md px-3 py-2 hover:bg-slate-900 hover:text-white" href="#soluciones">
                Soluciones
              </a>
              <a className="rounded-md px-3 py-2 hover:bg-slate-900 hover:text-white" href="#metodologia">
                Metodología
              </a>
              <a className="rounded-md px-3 py-2 hover:bg-slate-900 hover:text-white" href="#faq">
                FAQ
              </a>
            </div>
            <div className="mobile-header-links" aria-label="Enlaces rápidos">
              <a href="#soluciones">Soluciones</a>
              <a href="#metodologia">Método</a>
            </div>
            <div className="flex items-center gap-3">
              <LandingServicesMenu currentPath="/soluciones-inteligencia-artificial-empresas" />
              <a
                className="landing-top-cta inline-flex min-h-11 shrink-0 items-center justify-center rounded-lg bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-blue-950/30 hover:bg-blue-500 focus-visible:ring-2 focus-visible:ring-blue-400"
                href="#diagnostico-ia"
              >
                <span className="hidden sm:inline">Auditoría gratuita</span>
                <span className="sm:hidden">Auditoría</span>
              </a>
            </div>
          </nav>
        </header>

        <main>
          <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.04fr_0.96fr] lg:px-8 lg:py-24">
            <div>
              <p className="mb-4 text-sm font-black uppercase tracking-normal text-blue-400">
                Inteligencia artificial aplicada a operaciones reales
              </p>
              <h1 className="ai-hero-title mb-6 max-w-4xl font-black text-white">
                Transforma tus procesos empresariales con Inteligencia Artificial y automa&shy;tización
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-200">
                Diseñamos e implementamos agentes de IA y flujos automatizados que cualifican prospectos, liberan a tu
                equipo de tareas repetitivas y escalan tus operaciones sin multiplicar tus costes.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  className="inline-flex min-h-12 items-center justify-center rounded-lg bg-blue-600 px-6 py-3 font-bold text-white shadow-xl shadow-blue-950/40 hover:bg-blue-500 focus-visible:ring-2 focus-visible:ring-blue-400"
                  href="#diagnostico-ia"
                >
                  Solicitar auditoría gratuita
                </a>
                <a
                  className="inline-flex min-h-12 items-center justify-center rounded-lg border border-slate-700 px-6 py-3 font-bold text-slate-100 hover:bg-slate-900 focus-visible:ring-2 focus-visible:ring-blue-400"
                  href="#soluciones"
                >
                  Ver soluciones
                </a>
              </div>
              <p className="mt-4 text-sm font-semibold text-slate-300">
                Sin permanencia obligatoria. Respuesta en menos de 24h.
              </p>
              <dl className="mt-10 grid gap-3 sm:grid-cols-3">
                <div className="rounded-lg bg-white/5 p-5 shadow-sm ring-1 ring-white/10">
                  <dt className="text-3xl font-black text-white">70%</dt>
                  <dd className="mt-2 text-sm leading-6 text-slate-300">menos tiempo en tareas repetitivas</dd>
                </div>
                <div className="rounded-lg bg-white/5 p-5 shadow-sm ring-1 ring-white/10">
                  <dt className="text-3xl font-black text-white">24/7</dt>
                  <dd className="mt-2 text-sm leading-6 text-slate-300">atención y cualificación automática</dd>
                </div>
                <div className="rounded-lg bg-white/5 p-5 shadow-sm ring-1 ring-white/10">
                  <dt className="text-3xl font-black text-white">90 días</dt>
                  <dd className="mt-2 text-sm leading-6 text-slate-300">para medir los primeros resultados</dd>
                </div>
              </dl>
            </div>

            <div className="relative mx-auto aspect-[0.82] w-full max-w-[680px] overflow-hidden rounded-lg shadow-2xl shadow-blue-950/30 ring-1 ring-slate-800 lg:max-w-none">
              <Image
                src="/images/ai-automation-hero.png"
                alt="Panel visual de automatización IA con flujo de lead, cualificación, CRM, cita y métricas de ahorro"
                fill
                preload
                unoptimized
                sizes="(min-width: 1280px) 44vw, (min-width: 1024px) 46vw, 100vw"
                className="object-cover"
              />
            </div>
          </section>

          <section className="border-y border-slate-800 bg-slate-900/60 px-4 py-12 sm:px-6 lg:px-8" aria-labelledby="tech-title">
            <div className="mx-auto max-w-7xl">
              <h2 id="tech-title" className="max-w-3xl text-2xl font-black text-white">
                Nos integramos con tecnologías de IA y automatización líderes del mercado
              </h2>
              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-9">
                {platforms.map((platform) => (
                  <div
                    className="grid min-h-20 place-items-center rounded-lg bg-slate-950 px-3 text-center text-sm font-black text-slate-200 ring-1 ring-slate-800"
                    key={platform}
                  >
                    {platform}
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="diagnostico-title">
            <div className="max-w-3xl">
              <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Auditoría</p>
              <h2 id="diagnostico-title" className="text-3xl font-black text-white sm:text-4xl">
                Tu empresa sufre alguno de estos cuellos de botella?
              </h2>
            </div>
            <div className="mt-10 grid gap-5 lg:grid-cols-2">
              <article className="rounded-lg border border-rose-200 bg-rose-50/90 p-6 shadow-sm shadow-rose-100/70">
                <h3 className="text-xl font-black text-slate-950">Sin automatización e IA</h3>
                <ul className="mt-6 grid gap-4">
                  {bottlenecks.map((item) => (
                    <li className="grid grid-cols-[1.75rem_1fr] gap-3 text-base font-semibold leading-7 text-slate-800" key={item}>
                      <span className="grid h-7 w-7 place-items-center rounded-full bg-rose-100 text-sm font-black text-rose-700 ring-1 ring-rose-200">
                        x
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
              <article className="rounded-lg border border-emerald-200 bg-emerald-50/90 p-6 shadow-sm shadow-emerald-100/70">
                <h3 className="text-xl font-black text-slate-950">Con soluciones de IA a medida</h3>
                <ul className="mt-6 grid gap-4">
                  {outcomes.map((item) => (
                    <li className="grid grid-cols-[1.75rem_1fr] gap-3 text-base font-semibold leading-7 text-slate-800" key={item}>
                      <span className="grid h-7 w-7 place-items-center rounded-full bg-emerald-100 text-sm font-black text-emerald-700 ring-1 ring-emerald-200">
                        ✓
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          </section>

          <section id="soluciones" className="bg-slate-900 px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="solutions-title">
            <div className="mx-auto max-w-7xl">
              <div className="max-w-3xl">
              <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Soluciones por área</p>
                <h2 id="solutions-title" className="text-3xl font-black text-white sm:text-4xl">
                  Soluciones de Inteligencia Artificial adaptadas a cada área empresarial
                </h2>
                <p className="mt-4 text-lg leading-8 text-slate-300">
                  Priorizamos los procesos donde la IA puede ahorrar tiempo, mejorar respuesta comercial o reducir errores operativos.
                </p>
              </div>
              <div className="mt-10 grid gap-5 md:grid-cols-2">
                {departments.map((department) => (
                  <article className="rounded-lg bg-slate-950 p-6 ring-1 ring-slate-800" key={department.area}>
                    <h3 className="text-xl font-black text-white">{department.area}</h3>
                    <ul className="mt-5 grid gap-3">
                      {department.items.map((item) => (
                        <li className="grid grid-cols-[1.5rem_1fr] gap-3 text-slate-300" key={item}>
                          <span className="mt-1 h-2.5 w-2.5 rounded-full bg-blue-400" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section id="metodologia" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="method-title">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Implementación</p>
                <h2 id="method-title" className="text-3xl font-black text-white sm:text-4xl">
                  Nuestra metodología para implementar IA con éxito en tu empresa
                </h2>
              </div>
              <div className="grid gap-4">
                {phases.map((phase) => (
                  <article className="grid gap-4 rounded-lg bg-white/5 p-6 ring-1 ring-white/10 sm:grid-cols-[4rem_1fr]" key={phase.step}>
                    <span className="text-3xl font-black text-blue-400">{phase.step}</span>
                    <div>
                      <h3 className="text-xl font-black text-white">{phase.title}</h3>
                      <p className="mt-2 leading-7 text-slate-300">{phase.text}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="bg-slate-900 px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="why-title">
            <div className="mx-auto max-w-7xl">
              <div className="max-w-3xl">
                <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Confianza B2B</p>
                <h2 id="why-title" className="text-3xl font-black text-white sm:text-4xl">
                  Por qué elegirnos como socio estratégico en IA
                </h2>
              </div>
              <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {differentiators.map((item) => (
                  <article className="rounded-lg bg-slate-950 p-6 ring-1 ring-slate-800" key={item.title}>
                    <h3 className="text-lg font-black text-white">{item.title}</h3>
                    <p className="mt-3 leading-7 text-slate-300">{item.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section id="faq" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="faq-title">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">FAQ</p>
                <h2 id="faq-title" className="text-3xl font-black text-white sm:text-4xl">
                  Preguntas frecuentes sobre la implementación de IA para empresas
                </h2>
              </div>
              <div className="grid gap-4">
                {faqs.map((faq) => (
                  <details className="rounded-lg bg-white/5 p-5 ring-1 ring-white/10" key={faq.question}>
                    <summary className="cursor-pointer text-lg font-black text-white">{faq.question}</summary>
                    <p className="mt-4 leading-7 text-slate-300">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          <section id="diagnostico-ia" className="border-t border-slate-800 bg-slate-900 px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="cta-title">
            <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
              <div>
                <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Auditoría gratuita</p>
                <h2 id="cta-title" className="text-3xl font-black text-white sm:text-4xl">
                  ¿Listo para automatizar las operaciones de tu negocio?
                </h2>
                <p className="mt-5 text-lg leading-8 text-slate-300">
                  Reserva una auditoría gratuita y descubre qué procesos puedes automatizar este mes con IA.
                </p>
              </div>
              <AiDiagnosticForm />
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
