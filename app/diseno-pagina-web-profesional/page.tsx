import type { Metadata } from "next";
import Link from "next/link";
import { BarChart3, Search, TrendingUp, Zap } from "lucide-react";
import { Logo } from "../components/Logo";
import { PageLinksNav } from "../components/PageLinksNav";
import { WebProjectForm } from "../components/WebProjectForm";

const plans = [
  {
    name: "Plan Basico",
    subtitle: "Para empezar con buen pie",
    description: "La base para presentar tu negocio con una web clara, rapida y preparada para captar contactos.",
    price: "190€",
    cadence: "",
    features: [
      "Hasta 3 paginas: Inicio, Servicios y Contacto",
      "100% adaptado a moviles y ordenadores",
      "Formulario de contacto directo + boton flotante de WhatsApp",
      "Certificado de seguridad SSL + textos legales RGPD basicos",
      "Dominio + hosting de alta velocidad, primer ano incluido",
      "SEO inicial y configuracion de Google Business Profile",
    ],
  },
  {
    name: "Plan Avanzado",
    subtitle: "Mas popular",
    description: "Incluye todo lo del Plan Basico y suma mas paginas, medicion avanzada y soporte post-lanzamiento.",
    price: "390€",
    cadence: "",
    features: [
      "Hasta 7 paginas: Inicio, Quienes Somos, hasta 3 Servicios, Blog o Noticias y Contacto",
      "SEO avanzado con optimizacion SEO On-Page",
      "Sincronizacion y optimizacion de Google Maps / Google Business",
      "Configuracion de Google Analytics 4 para medicion y analiticas",
      "Formulario de presupuesto interactivo o con seleccion de servicios",
      "30 dias de soporte post-lanzamiento e imprevistos incluidos",
    ],
    recommended: true,
  },
  {
    name: "Plan A Medida",
    subtitle: "Personalizado / a consultar",
    description: "Ideal para tiendas online, catalogos extensos o webs con funcionalidades avanzadas.",
    price: "Personalizado / a consultar",
    features: [
      "Pasarela de pago segura: Bizum, TPV Virtual o Stripe",
      "Catalogo autogestionable de productos y gestion de stock",
      "Reservas online, area de clientes o integraciones API/CRM",
      "Auditoria SEO de competencia y estrategia de contenidos",
      "Mantenimiento prioritario y asesoramiento continuo",
    ],
  },
];

const includes = [
  {
    title: "Diseno responsive",
    text: "Visualizacion cuidada en moviles, tablets y ordenadores para no perder contactos por friccion.",
  },
  {
    title: "Dominio, hosting y correo",
    text: "Alojamiento rapido y cuentas profesionales como contacto@tunegocio.com, gestionadas sin complicaciones.",
  },
  {
    title: "SEO On-Page inicial",
    text: "Estructura de encabezados, metaetiquetas, sitemap y base tecnica para que Google pueda indexar la web.",
  },
  {
    title: "Seguridad y normativa",
    text: "Certificado SSL, aviso de cookies y textos legales preparados para una presencia digital seria.",
  },
  {
    title: "Google Maps y perfil local",
    text: "Conexion con tu ficha de empresa para facilitar llamadas, rutas y busquedas locales.",
  },
  {
    title: "Soporte continuo",
    text: "Mantenimiento, mejoras y soporte humano para que la web siga funcionando despues del lanzamiento.",
  },
];

const impactCards = [
  {
    title: "Carga rapida en movil",
    text: "Reducimos esperas y friccion para que el usuario pueda entender tu oferta sin abandonar la pagina.",
  },
  {
    title: "Acciones visibles",
    text: "Botones de llamada, WhatsApp y presupuesto colocados donde el visitante los necesita, no escondidos al final.",
  },
  {
    title: "Mensaje claro",
    text: "Ordenamos servicios, beneficios y pruebas de confianza para que el usuario sepa por que elegirte.",
  },
  {
    title: "Base SEO local",
    text: "Preparamos estructura, metadatos y conexion con tu perfil local para ayudarte a aparecer en busquedas relevantes.",
  },
];

const webCases = [
  {
    company: "Finova App",
    category: "SaaS B2B",
    metric: "3x",
    metricLabel: "solicitudes de demo",
    timeframe: "durante el primer mes",
    summary: "Rediseno UX, nueva jerarquia de mensajes y formularios orientados a conversion.",
    quote: "La web empezo a explicar el producto antes de que ventas entrara en la conversacion.",
    author: "Laura M., Marketing Lead",
  },
  {
    company: "Clinica Norte",
    category: "Salud local",
    metric: "+48%",
    metricLabel: "en solicitudes de cita",
    timeframe: "en los primeros 90 dias",
    summary: "Landing de servicios, CTA fijo en movil, SEO local y conexion con Google Business Profile.",
    quote: "Pasamos de llamadas dispersas a citas mejor cualificadas desde la propia web.",
    author: "Marta R., Direccion",
  },
  {
    company: "Lumina Interiors",
    category: "B2B retail",
    metric: "+42%",
    metricLabel: "en leads cualificados",
    timeframe: "en 3 meses",
    summary: "Web corporativa con arquitectura por categorias, pruebas de confianza y formularios segmentados.",
    quote: "La web filtra mejor las oportunidades y el equipo pierde menos tiempo en consultas genericas.",
    author: "Javier S., CMO",
  },
];

const process = [
  {
    step: "01",
    title: "Briefing",
    text: "Entendemos tu negocio, tus clientes y el objetivo real de la pagina: llamadas, formularios, reservas o ventas.",
  },
  {
    step: "02",
    title: "Diseno y contenidos",
    text: "Creamos la estructura visual, jerarquia de mensajes y textos orientados a que el usuario entienda y actue.",
  },
  {
    step: "03",
    title: "Desarrollo y SEO",
    text: "Programamos la web, optimizamos velocidad, configuramos etiquetas y preparamos la base tecnica para Google.",
  },
  {
    step: "04",
    title: "Lanzamiento",
    text: "Publicamos la web, verificamos formularios y te damos una guia sencilla para gestionar lo importante.",
  },
];

const continuousCare = [
  {
    icon: BarChart3,
    label: "Analitica y comportamiento",
    text: "Medimos de donde vienen tus visitas y en que puntos hacen clic.",
  },
  {
    icon: Zap,
    label: "Rendimiento y velocidad",
    text: "Auditorias periodicas para mantener una carga rapida y estable.",
  },
  {
    icon: Search,
    label: "SEO y posicionamiento",
    text: "Seguimiento de palabras clave para detectar oportunidades en Google.",
  },
  {
    icon: TrendingUp,
    label: "Evolucion continua",
    text: "Ajustes de diseno y textos basados en datos reales, no en intuicion.",
  },
];

const reportBadges = ["Google Analytics 4", "Search Console", "Backups verificados"];

const faqs = [
  {
    question: "Cuanto tiempo se tarda en tener lista mi pagina web?",
    answer:
      "El plazo habitual esta entre 2 y 4 semanas, segun la complejidad del proyecto y la rapidez con la que recibamos materiales, textos o imagenes.",
  },
  {
    question: "La pagina web aparecera en los primeros puestos de Google?",
    answer:
      "Entregamos la web con SEO tecnico inicial para que Google pueda indexarla correctamente. El posicionamiento depende de competencia, autoridad y estrategia de contenidos posterior.",
  },
  {
    question: "Podre modificar los contenidos de la web yo mismo?",
    answer:
      "Si. Podemos trabajar con gestores sencillos o paneles personalizados, y te explicamos como actualizar textos, imagenes o paginas clave.",
  },
  {
    question: "El dominio, hosting y correo corporativo estan incluidos?",
    answer:
      "Nos encargamos de la gestion tecnica. Segun el plan, dejamos configurado dominio, hosting, correo profesional y certificados de seguridad.",
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Crecimiento sin complicaciones",
    url: "https://crecimientosincomplicaciones.com",
    areaServed: "ES",
    description:
      "Diseno de paginas web profesionales, rapidas y optimizadas para Google, orientadas a conseguir llamadas, mensajes y presupuestos.",
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Diseno de paginas web profesionales",
    serviceType: ["Diseno web", "Desarrollo web", "SEO On-Page"],
    provider: {
      "@type": "Organization",
      name: "Crecimiento sin complicaciones",
      url: "https://crecimientosincomplicaciones.com",
    },
    areaServed: "ES",
    makesOffer: plans.map((plan) => ({
      "@type": "Offer",
      name: plan.name,
      category: plan.subtitle,
      availability: "https://schema.org/InStock",
    })),
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
  title: "Diseno Web para Empresas",
  description:
    "Disenamos paginas web profesionales, rapidas y optimizadas para Google. Atrae clientes en moviles y ordenadores. Pide tu presupuesto gratuito.",
  keywords: [
    "diseno pagina web profesional",
    "paginas web para empresas",
    "diseno web SEO",
    "crear pagina web empresa",
  ],
  alternates: {
    canonical: "/diseno-pagina-web-profesional",
  },
  openGraph: {
    title: "Diseno Web Profesional Orientado a Conseguir Clientes",
    description:
      "Paginas web rapidas, adaptadas a moviles y optimizadas para convertir visitantes en llamadas, mensajes y presupuestos.",
    url: "/diseno-pagina-web-profesional",
    siteName: "Crecimiento sin complicaciones",
    locale: "es_ES",
    type: "website",
  },
};

function CheckIcon() {
  return (
    <svg className="mt-1 h-5 w-5 flex-none text-blue-400" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12.5l4.2 4.2L19 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function WebDesignPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <div className="web-design-page min-h-screen bg-slate-950 text-slate-50">
        <header className="sticky top-0 z-20 border-b border-slate-800 bg-slate-950/95 backdrop-blur">
          <nav className="mx-auto flex min-h-[72px] max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
            <Link className="logo-link text-slate-50" href="/" aria-label="Crecimiento sin complicaciones, inicio">
              <Logo variant="dark" />
            </Link>
            <div className="hidden items-center gap-2 text-sm font-semibold text-slate-300 md:flex">
              <a className="rounded-md px-3 py-2 hover:bg-slate-900 hover:text-white" href="#planes">Planes</a>
              <a className="rounded-md px-3 py-2 hover:bg-slate-900 hover:text-white" href="#casos-web">Casos</a>
              <a className="rounded-md px-3 py-2 hover:bg-slate-900 hover:text-white" href="#incluye">Incluye</a>
              <a className="rounded-md px-3 py-2 hover:bg-slate-900 hover:text-white" href="#faq">FAQ</a>
            </div>
            <a className="inline-flex min-h-11 items-center justify-center rounded-lg bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-blue-950/30 hover:bg-blue-500 focus-visible:ring-2 focus-visible:ring-blue-400" href="#presupuesto-web">
              Presupuesto gratis
            </a>
          </nav>
        </header>

        <PageLinksNav currentPath="/diseno-pagina-web-profesional" />

        <main>
          <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_0.95fr] lg:px-8 lg:py-24">
            <div>
              <p className="mb-4 text-sm font-black uppercase tracking-normal text-blue-400">
                DISENO WEB ORIENTADO A VENTAS
              </p>
              <h1 className="mb-6 max-w-4xl text-4xl font-black leading-[1.02] !text-white sm:text-5xl lg:text-6xl">
                Transforma las visitas de tu web en nuevos clientes
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-200">
                Creamos paginas web rapidas, modernas y optimizadas para Google que proyectan la mejor imagen de tu
                negocio y convierten el trafico en llamadas, mensajes y solicitudes de presupuesto.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a className="inline-flex min-h-12 items-center justify-center rounded-lg bg-blue-600 px-6 py-3 font-bold text-white shadow-xl shadow-blue-950/40 hover:bg-blue-500 focus-visible:ring-2 focus-visible:ring-blue-400" href="#presupuesto-web">
                  Solicitar presupuesto gratis
                </a>
                <a className="inline-flex min-h-12 items-center justify-center rounded-lg border border-slate-700 px-6 py-3 font-bold text-slate-100 hover:bg-slate-900 focus-visible:ring-2 focus-visible:ring-blue-400" href="#casos-web">
                  Ver casos de exito {"->"}
                </a>
              </div>
              <dl className="mt-10 grid gap-3 sm:grid-cols-3">
                {["100% adaptada a moviles", "SEO inicial incluido", "Dominio y hosting gestionados"].map((item) => (
                  <div className="rounded-lg bg-white/5 p-5 ring-1 ring-white/10" key={item}>
                    <dt className="text-sm font-black uppercase text-blue-300">Incluido</dt>
                    <dd className="mt-2 text-base font-bold leading-6 text-slate-100">{item}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="rounded-lg bg-slate-900 p-5 shadow-2xl shadow-blue-950/30 ring-1 ring-slate-800">
              <div className="rounded-lg bg-slate-950 ring-1 ring-slate-800">
                <div className="flex items-center gap-2 border-b border-slate-800 px-5 py-4">
                  <span className="h-3 w-3 rounded-full bg-red-400" />
                  <span className="h-3 w-3 rounded-full bg-amber-300" />
                  <span className="h-3 w-3 rounded-full bg-emerald-300" />
                  <span className="ml-auto text-xs font-bold text-slate-400">tunegocio.com</span>
                </div>
                <div className="p-5">
                  <div className="min-h-[500px] rounded-lg bg-blue-600 p-8">
                    <p className="text-sm font-black uppercase text-blue-100">Todo incluido</p>
                    <strong className="mt-4 block text-4xl font-black leading-tight text-white">
                      Tu proyecto web listo para vender
                    </strong>
                    <p className="mt-5 text-lg font-semibold leading-8 text-blue-50">
                      Una web completa, preparada para generar confianza y facilitar que tus clientes contacten desde
                      el primer dia.
                    </p>
                    <ul className="mt-8 grid gap-5">
                      {[
                        "Diseno moderno 100% adaptado a moviles",
                        "Optimizacion para aparecer en Google",
                        "Boton directo a WhatsApp y llamadas",
                        "Dominio, hosting y correos gestionados",
                      ].map((item) => (
                        <li className="flex gap-4 text-base font-black leading-7 text-blue-50" key={item}>
                          <span className="mt-0.5 grid h-7 w-7 flex-none place-items-center rounded-full bg-emerald-300 text-sm font-black text-slate-950">
                            ✓
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div style={{ marginTop: "80px" }}>
                      <div className="mb-6 h-px bg-white/20" />
                      <p className="rounded-lg border border-white/15 bg-white/15 px-6 py-5 text-base font-black leading-7 text-white">
                        Primer lanzamiento en 15-20 dias segun alcance
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="auditoria-web" className="border-y border-slate-800 bg-slate-900 px-4 py-16 sm:px-6 lg:px-8" aria-labelledby="value-title">
            <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Primer impacto</p>
                <h2 id="value-title" className="text-3xl font-black !text-white sm:text-4xl">
                  Tu web suele ser la primera impresion de tu negocio
                </h2>
                <p className="mt-5 text-lg leading-8 text-slate-300">
                  Si carga lento, no se entiende o no se adapta al movil, pierdes contactos antes de hablar con ellos.
                </p>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                {impactCards.map((card) => (
                  <article
                    className="web-impact-card rounded-xl border-t-[3px] border-t-transparent bg-white p-6 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] transition duration-200 hover:-translate-y-1 hover:border-t-[#2563EB] hover:shadow-[0_18px_34px_-18px_rgba(15,23,42,0.45)]"
                    key={card.title}
                  >
                    <h3 className="m-0 text-lg font-bold leading-[1.35] !text-[#0F172A]">{card.title}</h3>
                    <p className="mt-3 text-sm leading-[1.6] !text-[#475569]">{card.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section id="casos-web" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="web-cases-title">
            <div className="max-w-3xl">
              <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Casos de exito</p>
              <h2 id="web-cases-title" className="text-3xl font-black !text-white sm:text-4xl">
                Webs que convierten mejor porque explican mejor
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-300">
                Estos proyectos muestran el tipo de mejoras que buscamos: mas contactos, menos friccion y una propuesta
                mas facil de entender.
              </p>
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {webCases.map((item) => (
                <article
                  className="web-case-card flex h-full flex-col rounded-lg border border-slate-700 bg-slate-800 p-6 transition duration-200 hover:-translate-y-1 hover:border-blue-500/70 hover:shadow-2xl hover:shadow-blue-950/30"
                  key={item.company}
                >
                  <span className="w-fit rounded-full bg-blue-500/10 px-3 py-1 text-xs font-black uppercase text-blue-300 ring-1 ring-blue-400/20">
                    {item.category}
                  </span>
                  <h3 className="mt-5 text-xl font-black !text-slate-50">{item.company}</h3>
                  <div className="mt-5 rounded-lg border border-slate-700 bg-slate-900 p-4">
                    <p className="text-xs font-black uppercase tracking-normal text-blue-300">Objetivo del proyecto</p>
                    <p className="mt-2 text-sm font-semibold leading-[1.6] !text-slate-300">{item.summary}</p>
                  </div>

                  <dl className="mt-6">
                    <dt className="text-5xl font-black leading-none text-blue-400">{item.metric}</dt>
                    <dd className="mt-3 text-base font-black !text-slate-50">{item.metricLabel}</dd>
                    <dd className="mt-1 text-sm font-semibold !text-slate-400">{item.timeframe}</dd>
                  </dl>

                  <figure className="mt-auto pt-6">
                    <blockquote className="border-l-4 border-blue-500 pl-4 text-sm italic leading-[1.6] !text-slate-300">
                      &quot;{item.quote}&quot;
                    </blockquote>
                    <figcaption className="mt-3 pl-4 text-xs font-black uppercase tracking-normal text-slate-500">
                      {item.author}
                    </figcaption>
                  </figure>
                </article>
              ))}
            </div>
          </section>

          <section id="planes" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="plans-title">
            <div className="max-w-3xl">
              <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Planes web</p>
              <h2 id="plans-title" className="text-3xl font-black !text-white sm:text-4xl">
                Planes de diseno web adaptados a la etapa de tu negocio
              </h2>
            </div>
            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {plans.map((plan) => (
                <article className={`flex h-full flex-col rounded-lg p-6 ring-1 ${plan.recommended ? "scale-[1.02] bg-blue-600 text-white shadow-2xl shadow-blue-950/40 ring-blue-300/40" : "bg-white/5 ring-white/10"}`} key={plan.name}>
                  {plan.recommended ? <p className="mb-4 w-fit rounded-full bg-white px-3 py-1 text-xs font-black uppercase text-blue-700">MAS POPULAR</p> : null}
                  <h3 className="text-2xl font-black !text-white">{plan.name}</h3>
                  <p className={`mt-2 font-bold ${plan.recommended ? "text-blue-100" : "text-blue-300"}`}>{plan.subtitle}</p>
                  <div className="mt-5">
                    {plan.cadence !== undefined ? (
                      <p className="flex items-baseline gap-2">
                        <span className={`text-4xl font-black ${plan.recommended ? "text-white" : "text-slate-50"}`}>{plan.price}</span>
                        {plan.cadence ? <span className={`text-sm font-black ${plan.recommended ? "text-blue-100" : "text-slate-400"}`}>{plan.cadence}</span> : null}
                      </p>
                    ) : (
                      <p className={`max-w-xs text-2xl font-black leading-tight ${plan.recommended ? "text-white" : "text-slate-50"}`}>
                        {plan.price}
                      </p>
                    )}
                  </div>
                  <p className={`mt-5 leading-7 ${plan.recommended ? "text-blue-50" : "text-slate-300"}`}>{plan.description}</p>
                  <ul className="mt-6 grid gap-3">
                    {plan.features.map((feature) => (
                      <li className={`flex gap-3 ${plan.recommended ? "text-white" : "text-slate-300"}`} key={feature}>
                        <CheckIcon />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-8">
                    <a className={`inline-flex min-h-12 w-full items-center justify-center rounded-lg px-5 py-3 font-black ${plan.recommended ? "featured-plan-button bg-white hover:bg-blue-50" : "bg-blue-600 text-white hover:bg-blue-500"}`} href="#presupuesto-web">
                      <span style={{ color: plan.recommended ? "#1d4ed8" : "#ffffff" }}>
                        Contactar
                      </span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section id="incluye" className="bg-slate-900 px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="include-title">
            <div className="mx-auto max-w-7xl">
              <div className="max-w-3xl">
                <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Servicio completo</p>
                <h2 id="include-title" className="text-3xl font-black !text-white sm:text-4xl">
                  Todo lo que necesitas para que tu pagina web funcione desde el primer dia
                </h2>
              </div>
              <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {includes.map((item) => (
                  <article className="rounded-lg bg-slate-950 p-6 ring-1 ring-slate-800" key={item.title}>
                    <h3 className="text-xl font-black !text-white">{item.title}</h3>
                    <p className="mt-3 leading-7 text-slate-300">{item.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="process-title">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Proceso</p>
                <h2 id="process-title" className="text-3xl font-black !text-white sm:text-4xl">
                  Como creamos tu pagina web paso a paso
                </h2>
              </div>
              <div className="grid gap-4">
                {process.map((step) => (
                  <article className="grid gap-4 rounded-lg bg-white/5 p-6 ring-1 ring-white/10 sm:grid-cols-[4rem_1fr]" key={step.step}>
                    <span className="text-3xl font-black text-blue-400">{step.step}</span>
                    <div>
                      <h3 className="text-xl font-black !text-white">{step.title}</h3>
                      <p className="mt-2 leading-7 text-slate-300">{step.text}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="bg-slate-900 px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="proof-title">
            <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Cuidado continuo</p>
                <h2 id="proof-title" className="text-3xl font-black !text-white sm:text-4xl">
                  Tu web siempre a punto: acompanamiento y mejora continua
                </h2>
                <p className="mt-5 text-lg leading-8 text-slate-300">
                  Una web recien lanzada es solo el principio. Monitorizamos el rendimiento y el comportamiento de tus
                  usuarios para asegurar que siga creciendo.
                </p>

                <div className="mt-8 grid gap-4">
                  {continuousCare.map((item) => (
                    <article className="grid grid-cols-[2.5rem_1fr] gap-4 rounded-lg bg-slate-950 p-5 ring-1 ring-slate-800" key={item.label}>
                      <span className="grid h-10 w-10 place-items-center rounded-lg bg-blue-500/10 text-sm font-black text-blue-300 ring-1 ring-blue-400/20">
                        <item.icon className="h-5 w-5" aria-hidden="true" strokeWidth={1.8} />
                      </span>
                      <div>
                        <h3 className="text-lg font-black !text-white">{item.label}</h3>
                        <p className="mt-2 text-sm leading-[1.6] text-slate-300">{item.text}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              <aside className="rounded-lg border border-slate-700 bg-slate-950 p-6 shadow-2xl shadow-blue-950/30" aria-label="Ficha de salud web">
                <div className="flex flex-col gap-4 border-b border-slate-800 pb-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-black uppercase tracking-normal text-blue-400">Informe mensual</p>
                    <h3 className="mt-2 text-2xl font-black !text-white">Ficha de salud web</h3>
                  </div>
                  <span className="w-fit rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-black uppercase text-emerald-300 ring-1 ring-emerald-300/20">
                    Estado optimo
                  </span>
                </div>

                <div className="mt-6 grid gap-5 sm:grid-cols-[0.8fr_1.2fr]">
                  <div className="rounded-lg bg-slate-900 p-5 ring-1 ring-slate-800">
                    <p className="text-sm font-bold text-slate-300">Puntuacion PageSpeed</p>
                    <div className="mt-4 grid aspect-square place-items-center rounded-full border-[10px] border-emerald-300 bg-emerald-300/10">
                      <strong className="text-4xl font-black text-white">98</strong>
                      <span className="-mt-8 text-sm font-black text-emerald-300">/100</span>
                    </div>
                  </div>

                  <div className="rounded-lg bg-slate-900 p-5 ring-1 ring-slate-800">
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-sm font-bold text-slate-300">Trafico organico</p>
                      <strong className="text-lg font-black text-emerald-300">+34%</strong>
                    </div>
                    <svg className="mt-5 h-36 w-full" viewBox="0 0 320 140" role="img" aria-label="Grafica ascendente de trafico organico">
                      <path d="M10 118 H310" stroke="#334155" strokeWidth="2" />
                      <path d="M10 118 C62 106 78 88 118 92 C166 96 176 58 218 62 C258 66 274 34 310 24" fill="none" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" />
                      <path d="M10 118 C62 106 78 88 118 92 C166 96 176 58 218 62 C258 66 274 34 310 24 L310 128 L10 128 Z" fill="rgba(34,197,94,0.12)" />
                    </svg>
                  </div>
                </div>

                <div className="mt-5 grid gap-5 lg:grid-cols-2">
                  <div className="rounded-lg bg-slate-900 p-5 ring-1 ring-slate-800">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-black uppercase tracking-normal text-blue-400">Google Analytics</p>
                        <h4 className="mt-1 text-lg font-black text-white">Comportamiento del usuario</h4>
                      </div>
                      <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-black text-emerald-300">
                        Activo
                      </span>
                    </div>

                    <dl className="mt-5 grid gap-3">
                      <div className="flex items-center justify-between rounded-lg bg-slate-950 px-4 py-3">
                        <dt className="text-sm font-semibold text-slate-300">Usuarios activos</dt>
                        <dd className="text-lg font-black text-white">1.842</dd>
                      </div>
                      <div className="flex items-center justify-between rounded-lg bg-slate-950 px-4 py-3">
                        <dt className="text-sm font-semibold text-slate-300">Eventos clave</dt>
                        <dd className="text-lg font-black text-emerald-300">+27%</dd>
                      </div>
                      <div className="flex items-center justify-between rounded-lg bg-slate-950 px-4 py-3">
                        <dt className="text-sm font-semibold text-slate-300">Clics en WhatsApp</dt>
                        <dd className="text-lg font-black text-blue-300">138</dd>
                      </div>
                    </dl>
                  </div>

                  <div className="rounded-lg bg-slate-900 p-5 ring-1 ring-slate-800">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-black uppercase tracking-normal text-blue-400">Search Console</p>
                        <h4 className="mt-1 text-lg font-black text-white">Visibilidad en Google</h4>
                      </div>
                      <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-black text-blue-300">
                        SEO
                      </span>
                    </div>

                    <dl className="mt-5 grid gap-3">
                      <div className="flex items-center justify-between rounded-lg bg-slate-950 px-4 py-3">
                        <dt className="text-sm font-semibold text-slate-300">Impresiones</dt>
                        <dd className="text-lg font-black text-white">24.6k</dd>
                      </div>
                      <div className="flex items-center justify-between rounded-lg bg-slate-950 px-4 py-3">
                        <dt className="text-sm font-semibold text-slate-300">Clics organicos</dt>
                        <dd className="text-lg font-black text-emerald-300">+34%</dd>
                      </div>
                      <div className="flex items-center justify-between rounded-lg bg-slate-950 px-4 py-3">
                        <dt className="text-sm font-semibold text-slate-300">Keywords seguidas</dt>
                        <dd className="text-lg font-black text-blue-300">42</dd>
                      </div>
                    </dl>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  {reportBadges.map((badge) => (
                    <span className="rounded-full bg-blue-500/10 px-3 py-2 text-xs font-black text-blue-300 ring-1 ring-blue-400/20" key={badge}>
                      {badge}
                    </span>
                  ))}
                </div>
              </aside>
            </div>
          </section>

          <section id="faq" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="faq-title">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">FAQ</p>
                <h2 id="faq-title" className="text-3xl font-black !text-white sm:text-4xl">
                  Preguntas frecuentes sobre nuestro servicio de diseno web
                </h2>
              </div>
              <div className="grid gap-4">
                {faqs.map((faq) => (
                  <details className="rounded-lg bg-white/5 p-5 ring-1 ring-white/10" key={faq.question}>
                    <summary className="cursor-pointer text-lg font-black !text-white">{faq.question}</summary>
                    <p className="mt-4 leading-7 text-slate-300">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          <section id="presupuesto-web" className="border-t border-slate-800 bg-slate-900 px-4 py-16 pb-28 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="cta-title">
            <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
              <div>
                <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Presupuesto gratuito</p>
                <h2 id="cta-title" className="text-3xl font-black !text-white sm:text-4xl">
                  Hablamos de tu nuevo proyecto web?
                </h2>
                <p className="mt-5 text-lg leading-8 text-slate-300">
                  Cuentanos tu idea o solicita un analisis gratuito de tu presencia digital. Te responderemos en menos
                  de 24 horas.
                </p>
              </div>
              <WebProjectForm />
            </div>
          </section>
        </main>

        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-800 bg-slate-950/95 p-3 backdrop-blur md:hidden">
          <a className="mx-auto flex min-h-12 max-w-md items-center justify-center rounded-lg bg-blue-600 px-5 py-3 font-black text-white shadow-lg shadow-blue-950/40" href="#presupuesto-web">
            Solicitar presupuesto gratuito
          </a>
        </div>
      </div>
    </>
  );
}
