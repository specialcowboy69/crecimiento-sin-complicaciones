import type { Metadata } from "next";
import Link from "next/link";
import { AiDiagnosticForm } from "../components/AiDiagnosticForm";
import { Logo } from "../components/Logo";
import { PageLinksNav } from "../components/PageLinksNav";

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
  "Ventas pierde horas filtrando leads frios de forma manual.",
  "Las respuestas tardias en WhatsApp o email hacen perder oportunidades.",
  "Facturas, documentos y tareas administrativas dependen de procesos repetitivos.",
  "Los datos estan dispersos y las decisiones llegan tarde.",
];

const outcomes = [
  "Agentes de IA que cualifican leads y agendan citas en el CRM.",
  "Respuestas instantaneas 24/7 con lenguaje natural y contexto del negocio.",
  "Procesamiento automatizado de documentos sin intervencion manual constante.",
  "Cuadros de mando con datos operativos y senales accionables.",
];

const departments = [
  {
    area: "Ventas y marketing",
    items: [
      "Agentes de captacion y cualificacion automatica de leads.",
      "Nutricion personalizada por WhatsApp API y email.",
      "Copys, creatividades y pruebas A/B asistidas por IA.",
    ],
  },
  {
    area: "Atencion al cliente",
    items: [
      "Chatbots avanzados entrenados con el conocimiento interno de la empresa.",
      "Asistentes conversacionales con RAG para respuestas con contexto.",
      "Integracion con soporte, tickets y call centers 24/7.",
    ],
  },
  {
    area: "Operaciones y finanzas",
    items: [
      "Lectura y clasificacion automatizada de facturas y presupuestos.",
      "Control inteligente de inventarios y prediccion de demanda.",
      "Flujos RPA con IA para reducir errores y tareas manuales.",
    ],
  },
  {
    area: "Recursos humanos",
    items: [
      "Filtrado inicial de CVs en procesos de seleccion.",
      "Onboarding automatizado para nuevos empleados.",
      "Asistentes internos para dudas frecuentes y documentacion.",
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
    title: "Desarrollo e integracion",
    text: "Configuramos modelos, pipelines y conectores API con tus sistemas: CRM, ERP, WhatsApp, email o bases de datos.",
  },
  {
    step: "03",
    title: "Entrenamiento y despliegue",
    text: "Entrenamos la IA con el contexto de tu negocio, definimos limites de seguridad y validamos una prueba de concepto.",
  },
  {
    step: "04",
    title: "Medicion y mejora continua",
    text: "Medimos KPIs, ajustamos el comportamiento del sistema y acompanamos a tu equipo durante la adopcion.",
  },
];

const differentiators = [
  {
    title: "Agentes a medida",
    text: "No vendemos bots genericos. Creamos sistemas entrenados con la informacion, tono y procesos de tu negocio.",
  },
  {
    title: "KPIs claros",
    text: "Definimos exito antes de construir: tiempo ahorrado, conversion, calidad del lead o reduccion de errores.",
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
    question: "Es necesario cambiar el CRM o ERP que ya utiliza mi empresa?",
    answer:
      "No. Las soluciones se conectan a la infraestructura tecnologica actual mediante APIs, conectores o automatizaciones seguras.",
  },
  {
    question: "Cuanto tiempo se tarda en ver resultados?",
    answer:
      "Las primeras automatizaciones y pruebas de concepto suelen estar operativas en semanas. Los primeros resultados medibles suelen aparecer entre 30 y 90 dias.",
  },
  {
    question: "Mis datos empresariales estaran seguros?",
    answer:
      "Si. Definimos permisos, acuerdos de confidencialidad, criterios RGPD y modelos empresariales que no usan tus datos privados para entrenar modelos publicos.",
  },
  {
    question: "Que ocurre si mi equipo no sabe usar herramientas de IA?",
    answer:
      "Incluimos formacion, documentacion y acompanamiento para que el equipo adopte los nuevos procesos sin friccion.",
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Agencia de Inteligencia Artificial y Automatizacion para Empresas",
    serviceType: ["Inteligencia Artificial", "Automatizacion de procesos", "Agentes IA"],
    provider: {
      "@type": "Organization",
      name: "Crecimiento sin complicaciones",
      url: "https://crecimientosincomplicaciones.com",
    },
    areaServed: "ES",
    description:
      "Soluciones de inteligencia artificial y automatizacion para empresas: agentes IA, chatbots, integraciones CRM/ERP y automatizacion de procesos.",
    makesOffer: {
      "@type": "Offer",
      name: "Diagnostico estrategico de IA",
      category: "Automatizacion empresarial con IA",
      availability: "https://schema.org/InStock",
      url: "https://crecimientosincomplicaciones.com/soluciones-inteligencia-artificial-empresas",
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
  title: "IA para Empresas",
  description:
    "Optimiza las operaciones de tu empresa con agentes de IA, chatbots, automatizacion de procesos e integraciones CRM/ERP. Solicita tu diagnostico gratis.",
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
    title: "Inteligencia Artificial y Automatizacion para Empresas",
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

      <div className="ai-page min-h-screen bg-slate-950 text-slate-50">
        <header className="sticky top-0 z-20 border-b border-slate-800 bg-slate-950/95 backdrop-blur">
          <nav className="mx-auto flex min-h-[72px] max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
            <Link className="logo-link text-slate-50" href="/" aria-label="Crecimiento sin complicaciones, inicio">
              <Logo variant="dark" />
            </Link>
            <div className="hidden items-center gap-2 text-sm font-semibold text-slate-300 md:flex">
              <a className="rounded-md px-3 py-2 hover:bg-slate-900 hover:text-white" href="#soluciones">
                Soluciones
              </a>
              <a className="rounded-md px-3 py-2 hover:bg-slate-900 hover:text-white" href="#metodologia">
                Metodologia
              </a>
              <a className="rounded-md px-3 py-2 hover:bg-slate-900 hover:text-white" href="#faq">
                FAQ
              </a>
            </div>
            <a
              className="inline-flex min-h-11 items-center justify-center rounded-lg bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-blue-950/30 hover:bg-blue-500 focus-visible:ring-2 focus-visible:ring-blue-400"
              href="#diagnostico-ia"
            >
              Diagnostico gratis
            </a>
          </nav>
        </header>

        <PageLinksNav currentPath="/soluciones-inteligencia-artificial-empresas" />

        <main>
          <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.04fr_0.96fr] lg:px-8 lg:py-24">
            <div>
              <p className="mb-4 text-sm font-black uppercase tracking-normal text-blue-400">
                Inteligencia artificial aplicada a operaciones reales
              </p>
              <h1 className="mb-6 max-w-4xl text-4xl font-black leading-[1.02] text-white sm:text-5xl lg:text-6xl">
                Transforma tus procesos empresariales con Inteligencia Artificial y automatizacion
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-200">
                Disenamos e implementamos agentes de IA y flujos automatizados que cualifican prospectos, liberan a tu
                equipo de tareas repetitivas y escalan tus operaciones sin multiplicar tus costes.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  className="inline-flex min-h-12 items-center justify-center rounded-lg bg-blue-600 px-6 py-3 font-bold text-white shadow-xl shadow-blue-950/40 hover:bg-blue-500 focus-visible:ring-2 focus-visible:ring-blue-400"
                  href="#diagnostico-ia"
                >
                  Solicitar diagnostico gratis
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
                  <dd className="mt-2 text-sm leading-6 text-slate-300">atencion y cualificacion automatica</dd>
                </div>
                <div className="rounded-lg bg-white/5 p-5 shadow-sm ring-1 ring-white/10">
                  <dt className="text-3xl font-black text-white">90 dias</dt>
                  <dd className="mt-2 text-sm leading-6 text-slate-300">para medir los primeros resultados</dd>
                </div>
              </dl>
            </div>

            <div className="relative min-h-[520px] overflow-hidden rounded-lg bg-slate-900 p-5 shadow-2xl shadow-blue-950/30 ring-1 ring-slate-800">
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(148,163,184,.08)_1px,transparent_1px),linear-gradient(0deg,rgba(148,163,184,.08)_1px,transparent_1px)] bg-[size:42px_42px]" />
              <div className="relative rounded-lg bg-slate-950/80 p-5 ring-1 ring-slate-800">
                <div className="mb-5 flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-200">Centro de automatizacion IA</span>
                  <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-black text-emerald-300">
                    Online
                  </span>
                </div>
                <div className="grid gap-3">
                  {["Lead recibido", "Agente cualifica", "CRM actualizado", "Cita agendada"].map((item, index) => (
                    <div className="grid grid-cols-[2.5rem_1fr_auto] items-center gap-3 rounded-lg bg-white/5 p-4" key={item}>
                      <span className="grid h-10 w-10 place-items-center rounded-md bg-blue-500/15 text-sm font-black text-blue-300">
                        {index + 1}
                      </span>
                      <span className="font-bold text-slate-100">{item}</span>
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative mt-5 grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg bg-white/5 p-5 ring-1 ring-white/10">
                  <p className="text-sm font-bold text-slate-300">Ahorro estimado</p>
                  <strong className="mt-3 block text-4xl font-black text-white">15h</strong>
                  <span className="text-sm text-slate-300">por semana y equipo</span>
                </div>
                <div className="rounded-lg bg-white/5 p-5 ring-1 ring-white/10">
                  <p className="text-sm font-bold text-slate-300">Respuesta media</p>
                  <strong className="mt-3 block text-4xl font-black text-white">30s</strong>
                  <span className="text-sm text-slate-300">en canales conectados</span>
                </div>
              </div>
              <div className="relative mt-5 rounded-lg bg-blue-600 p-5 text-white">
                <p className="text-sm font-bold">Siguiente accion recomendada</p>
                <p className="mt-2 text-lg font-black">Enviar resumen al equipo comercial y crear tarea de seguimiento.</p>
              </div>
            </div>
          </section>

          <section className="border-y border-slate-800 bg-slate-900/60 px-4 py-12 sm:px-6 lg:px-8" aria-labelledby="tech-title">
            <div className="mx-auto max-w-7xl">
              <h2 id="tech-title" className="max-w-3xl text-2xl font-black text-white">
                Nos integramos con tecnologias de IA y automatizacion lideres del mercado
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
              <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Diagnostico</p>
              <h2 id="diagnostico-title" className="text-3xl font-black text-white sm:text-4xl">
                Tu empresa sufre alguno de estos cuellos de botella?
              </h2>
            </div>
            <div className="mt-10 grid gap-5 lg:grid-cols-2">
              <article className="rounded-lg bg-red-950/20 p-6 ring-1 ring-red-400/20">
                <h3 className="text-xl font-black text-white">Sin automatizacion e IA</h3>
                <ul className="mt-6 grid gap-4">
                  {bottlenecks.map((item) => (
                    <li className="grid grid-cols-[1.75rem_1fr] gap-3 text-slate-200" key={item}>
                      <span className="grid h-7 w-7 place-items-center rounded-full bg-red-500/15 text-sm font-black text-red-300">
                        x
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
              <article className="rounded-lg bg-emerald-950/20 p-6 ring-1 ring-emerald-300/20">
                <h3 className="text-xl font-black text-white">Con soluciones de IA a medida</h3>
                <ul className="mt-6 grid gap-4">
                  {outcomes.map((item) => (
                    <li className="grid grid-cols-[1.75rem_1fr] gap-3 text-slate-200" key={item}>
                      <span className="grid h-7 w-7 place-items-center rounded-full bg-emerald-400/15 text-sm font-black text-emerald-300">
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
                <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Soluciones por area</p>
                <h2 id="solutions-title" className="text-3xl font-black text-white sm:text-4xl">
                  Soluciones de Inteligencia Artificial adaptadas a cada area empresarial
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
                <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Implementacion</p>
                <h2 id="method-title" className="text-3xl font-black text-white sm:text-4xl">
                  Nuestra metodologia para implementar IA con exito en tu empresa
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
                  Por que elegirnos como socio estrategico en IA
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
                  Preguntas frecuentes sobre la implementacion de IA para empresas
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
                <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Diagnostico gratuito</p>
                <h2 id="cta-title" className="text-3xl font-black text-white sm:text-4xl">
                  Listo para automatizar las operaciones de tu negocio?
                </h2>
                <p className="mt-5 text-lg leading-8 text-slate-300">
                  Reserva una sesion estrategica gratuita y descubre que procesos puedes automatizar este mes con IA.
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
