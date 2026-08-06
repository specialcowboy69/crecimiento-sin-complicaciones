import type { Metadata } from "next";
import Link from "next/link";
import {
  BarChart3,
  CalendarDays,
  CheckCircle2,
  Clapperboard,
  ClipboardList,
  Layers,
  MessageCircle,
  Palette,
  PenLine,
  PlaySquare,
  Send,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Logo } from "../components/Logo";
import { PageLinksNav } from "../components/PageLinksNav";
import { SocialMediaForm } from "../components/SocialMediaForm";

const includes = [
  {
    icon: CalendarDays,
    title: "Estrategia y calendario editorial",
    text: "Definimos pilares de contenido, tono de voz, frecuencia y calendario mensual adaptado a tu sector.",
  },
  {
    icon: Clapperboard,
    title: "Creacion y edicion de video",
    text: "Editamos Reels, TikToks y Shorts con estructura clara, ritmo visual y llamadas a la accion.",
  },
  {
    icon: Palette,
    title: "Diseno grafico y carruseles",
    text: "Creamos portadas, piezas educativas y creatividades coherentes con la imagen de tu marca.",
  },
  {
    icon: PenLine,
    title: "Copywriting para redes",
    text: "Redactamos textos, hooks y llamadas a la accion para que cada pieza tenga un objetivo.",
  },
  {
    icon: MessageCircle,
    title: "Community management",
    text: "Monitorizamos comentarios y mensajes directos para cuidar la conversacion con clientes potenciales.",
  },
  {
    icon: BarChart3,
    title: "Informe mensual",
    text: "Preparamos un reporte sencillo con crecimiento, interacciones, clics y aprendizajes del mes.",
  },
];

const contentFormats = [
  {
    title: "Reels educativos",
    text: "Piezas cortas para explicar servicios, resolver dudas frecuentes y generar confianza.",
    icon: PlaySquare,
  },
  {
    title: "Videos de producto o servicio",
    text: "Contenido vertical para mostrar lo que vendes con claridad, ritmo y enfoque comercial.",
    icon: Clapperboard,
  },
  {
    title: "Carruseles para Instagram y LinkedIn",
    text: "Contenido visual escaneable para posicionarte como opcion profesional en tu sector.",
    icon: Layers,
  },
  {
    title: "Stories y piezas de apoyo",
    text: "Recordatorios, promociones, preguntas y contenido ligero para mantener actividad constante.",
    icon: MessageCircle,
  },
];

const plans = [
  {
    name: "Plan Presencia",
    subtitle: "Perfil activo y cuidado",
    description: "Para pymes que necesitan publicar con constancia y mantener una imagen profesional.",
    price: "190€",
    cadence: "/mes",
    features: [
      "5 publicaciones por semana",
      "Imagen estatica y carruseles",
      "Copywriting y hashtags",
      "Redaccion y programacion",
      "Informe trimestral",
    ],
  },
  {
    name: "Plan Crecimiento",
    subtitle: "Mas popular",
    description: "Para empresas que quieren sumar video, comunidad y medicion mensual.",
    price: "400€",
    cadence: "/mes",
    features: [
      "3-4 publicaciones por semana",
      "2-4 Reels o videos cortos al mes",
      "Planificacion de Stories semanales",
      "Community management: DMs y comentarios",
      "Informe mensual de rendimiento",
    ],
    recommended: true,
  },
  {
    name: "Plan A Medida",
    subtitle: "Produccion y estrategia avanzada",
    description: "Para marcas que necesitan produccion audiovisual, varios canales o campanas de pago.",
    price: "Personalizado / a consultar",
    features: [
      "Contenido diario multi-canal",
      "Produccion de video presencial",
      "Estrategia en Instagram, TikTok y LinkedIn",
      "Gestion avanzada de Meta Ads",
      "Consultoria estrategica semanal",
    ],
  },
];

const process = [
  {
    step: "01",
    title: "Estrategia y toma de datos",
    text: "Analizamos tu marca, cliente ideal, servicios y objetivos comerciales del mes.",
    icon: ClipboardList,
  },
  {
    step: "02",
    title: "Creacion y edicion",
    text: "Disenamos piezas visuales, redactamos textos y editamos los videos necesarios.",
    icon: Sparkles,
  },
  {
    step: "03",
    title: "Revision y aprobacion",
    text: "Te enviamos el calendario mensual para aprobar contenidos antes de publicar.",
    icon: ShieldCheck,
  },
  {
    step: "04",
    title: "Publicacion y seguimiento",
    text: "Programamos contenidos, atendemos la comunidad y revisamos que esta funcionando.",
    icon: Send,
  },
];

const faqs = [
  {
    question: "Tengo que proporcionar yo las fotos y videos?",
    answer:
      "Podemos trabajar con material que ya tengas, crear piezas a partir de recursos profesionales o coordinar sesiones de grabacion segun el plan seleccionado.",
  },
  {
    question: "En que redes sociales podeis trabajar?",
    answer:
      "Trabajamos principalmente con Instagram, TikTok, Facebook, LinkedIn y YouTube Shorts, eligiendo las plataformas donde realmente esta tu cliente potencial.",
  },
  {
    question: "Hay compromiso de permanencia?",
    answer:
      "Recomendamos un minimo de 3 meses para consolidar estrategia y medir aprendizajes, pero evitamos permanencias abusivas.",
  },
  {
    question: "Como os doy acceso a mis cuentas de forma segura?",
    answer:
      "Te guiaremos para darnos acceso como administradores o gestores mediante Meta Business Suite u otras herramientas seguras, sin compartir contrasenas personales.",
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Gestion de redes sociales para empresas",
    serviceType: ["SocialMediaManagement", "Creacion de contenido", "Edicion de video"],
    provider: {
      "@type": "Organization",
      name: "Crecimiento sin complicaciones",
      url: "https://crecimientosincomplicaciones.com",
    },
    areaServed: "ES",
    description:
      "Servicio de gestion de redes sociales, creacion de contenido y edicion de video para empresas.",
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
  title: "Gestion de Redes Sociales",
  description:
    "Gestionamos tus redes sociales y creamos contenido en video para Instagram, TikTok, LinkedIn y YouTube Shorts. Solicita una propuesta gratuita.",
  keywords: [
    "gestion redes sociales empresas",
    "agencia redes sociales",
    "edicion de video para redes",
    "creacion de reels para empresas",
  ],
  alternates: {
    canonical: "/gestion-redes-sociales-empresas",
  },
  openGraph: {
    title: "Gestion de Redes Sociales y Video para Empresas",
    description:
      "Estrategia mensual, calendario de contenidos, Reels, carruseles, community management e informes claros.",
    url: "/gestion-redes-sociales-empresas",
    siteName: "Crecimiento sin complicaciones",
    locale: "es_ES",
    type: "website",
  },
};

function CheckIcon() {
  return <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-blue-400" aria-hidden="true" strokeWidth={2} />;
}

export default function SocialMediaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <div className="social-page min-h-screen bg-slate-950 text-slate-50">
        <header className="sticky top-0 z-20 border-b border-slate-800 bg-slate-950/95 backdrop-blur">
          <nav className="mx-auto flex min-h-[72px] max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8" aria-label="Navegacion principal">
            <Link className="logo-link text-slate-50" href="/" aria-label="Crecimiento sin complicaciones, inicio">
              <Logo variant="dark" />
            </Link>
            <div className="hidden items-center gap-2 text-sm font-semibold text-slate-300 md:flex">
              <a className="rounded-md px-3 py-2 hover:bg-slate-900 hover:text-white" href="#incluye">Incluye</a>
              <a className="rounded-md px-3 py-2 hover:bg-slate-900 hover:text-white" href="#formatos">Formatos</a>
              <a className="rounded-md px-3 py-2 hover:bg-slate-900 hover:text-white" href="#planes">Planes</a>
              <a className="rounded-md px-3 py-2 hover:bg-slate-900 hover:text-white" href="#faq">FAQ</a>
            </div>
            <a className="inline-flex min-h-11 items-center justify-center rounded-lg bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-blue-950/30 hover:bg-blue-500 focus-visible:ring-2 focus-visible:ring-blue-400" href="#propuesta-redes">
              Propuesta gratis
            </a>
          </nav>
        </header>

        <PageLinksNav currentPath="/gestion-redes-sociales-empresas" />

        <main>
          <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_0.95fr] lg:px-8 lg:py-24">
            <div>
              <p className="mb-4 text-sm font-black uppercase tracking-normal text-blue-400">
                REDES SOCIALES + VIDEO VERTICAL
              </p>
              <h1 className="mb-6 max-w-4xl text-4xl font-black leading-[1.02] !text-white sm:text-5xl lg:text-6xl">
                Gestionamos tus redes sociales y creamos contenido en video para atraer clientes
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-200">
                Disenamos la estrategia mensual, editamos Reels y piezas visuales, publicamos con calendario y cuidamos
                la conversacion con tu comunidad para que no tengas que improvisar cada semana.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a className="inline-flex min-h-12 items-center justify-center rounded-lg bg-blue-600 px-6 py-3 font-bold text-white shadow-xl shadow-blue-950/40 hover:bg-blue-500 focus-visible:ring-2 focus-visible:ring-blue-400" href="#propuesta-redes">
                  Solicitar propuesta gratuita
                </a>
                <a className="inline-flex min-h-12 items-center justify-center rounded-lg border border-slate-700 px-6 py-3 font-bold text-slate-100 hover:bg-slate-900 focus-visible:ring-2 focus-visible:ring-blue-400" href="#formatos">
                  Ver formatos de contenido {"->"}
                </a>
              </div>
              <dl className="mt-10 grid gap-3 sm:grid-cols-3">
                {["Calendario mensual", "Reels y carruseles", "Aprobacion antes de publicar"].map((item) => (
                  <div className="rounded-lg bg-white/5 p-5 ring-1 ring-white/10" key={item}>
                    <dt className="text-sm font-black uppercase text-blue-300">Incluido</dt>
                    <dd className="mt-2 text-base font-bold leading-6 text-slate-100">{item}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="rounded-lg bg-slate-900 p-5 shadow-2xl shadow-blue-950/30 ring-1 ring-slate-800">
              <div className="mx-auto max-w-sm rounded-[2rem] border border-slate-700 bg-slate-950 p-4 shadow-2xl">
                <div className="rounded-[1.5rem] bg-slate-900 p-4">
                  <div className="mb-5 flex items-center justify-between">
                    <span className="text-sm font-black text-white">@tu_marca</span>
                    <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-black text-blue-300 ring-1 ring-blue-400/20">
                      Listo para revisar
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      "Reel",
                      "Carrusel",
                      "Story",
                      "Short",
                      "Post",
                      "LinkedIn",
                    ].map((item, index) => (
                      <div className={`grid aspect-[3/4] place-items-center rounded-lg p-3 text-center text-xs font-black ${index === 0 ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-200"}`} key={item}>
                        {item}
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 rounded-xl bg-slate-950 p-4 ring-1 ring-slate-800">
                    <div className="flex items-center gap-3">
                      <PlaySquare className="h-9 w-9 text-blue-400" aria-hidden="true" strokeWidth={1.8} />
                      <div>
                        <p className="text-sm font-black text-white">Video editado</p>
                        <p className="text-xs font-semibold text-slate-400">Hook, subtitulos y CTA revisados</p>
                      </div>
                    </div>
                    <div className="mt-4 h-2 rounded-full bg-slate-800">
                      <div className="h-2 w-3/4 rounded-full bg-blue-500" />
                    </div>
                  </div>
                  <div className="mt-4 grid gap-2">
                    {["Calendario aprobado", "Copies preparados", "Publicacion programada"].map((item) => (
                      <div className="flex items-center justify-between rounded-lg bg-slate-950 px-4 py-3 ring-1 ring-slate-800" key={item}>
                        <span className="text-sm font-bold text-slate-200">{item}</span>
                        <CheckCircle2 className="h-5 w-5 text-emerald-300" aria-hidden="true" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="border-y border-slate-800 bg-slate-900 px-4 py-16 sm:px-6 lg:px-8" aria-labelledby="problem-title">
            <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
              <div>
                <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Antes vs despues</p>
                <h2 id="problem-title" className="text-3xl font-black !text-white sm:text-4xl">
                  Publicar por publicar no hace crecer una marca
                </h2>
                <p className="mt-5 text-lg leading-8 text-slate-300">
                  La diferencia esta en tener estrategia, constancia, contenido bien editado y seguimiento.
                </p>
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                <article className="rounded-lg bg-slate-950 p-6 ring-1 ring-slate-800">
                  <h3 className="text-xl font-black !text-white">Gestion a ratos</h3>
                  <ul className="mt-5 grid gap-3 text-sm leading-6 text-slate-300">
                    {[
                      "Publicaciones improvisadas sin calendario.",
                      "Disenos o videos que no transmiten confianza.",
                      "Mensajes y comentarios sin responder durante dias.",
                      "No sabes si el esfuerzo esta generando oportunidades.",
                    ].map((item) => (
                      <li className="flex gap-3" key={item}>
                        <span className="mt-2 h-2 w-2 flex-none rounded-full bg-red-300" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
                <article className="rounded-lg bg-white/5 p-6 ring-1 ring-blue-500/30">
                  <h3 className="text-xl font-black !text-white">Gestion profesional</h3>
                  <ul className="mt-5 grid gap-3 text-sm leading-6 text-slate-200">
                    {[
                      "Plan mensual aprobado con antelacion.",
                      "Videos y graficos adaptados a tu marca.",
                      "Atencion activa a dudas de clientes potenciales.",
                      "Informes claros para saber que mejorar.",
                    ].map((item) => (
                      <li className="flex gap-3" key={item}>
                        <CheckIcon />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </div>
            </div>
          </section>

          <section id="incluye" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="include-title">
            <div className="max-w-3xl">
              <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Servicio integral</p>
              <h2 id="include-title" className="text-3xl font-black !text-white sm:text-4xl">
                Todo lo que incluye la gestion de redes sociales
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-300">
                Nos ocupamos de la parte estrategica, visual y operativa para que tus redes mantengan una presencia profesional.
              </p>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {includes.map((item) => (
                <article className="rounded-lg bg-white/5 p-6 ring-1 ring-white/10" key={item.title}>
                  <span className="grid h-12 w-12 place-items-center rounded-lg bg-blue-500/10 text-blue-300 ring-1 ring-blue-400/20">
                    <item.icon className="h-6 w-6" aria-hidden="true" strokeWidth={1.8} />
                  </span>
                  <h3 className="!mt-7 text-xl font-black !text-white">{item.title}</h3>
                  <p className="mt-3 leading-7 text-slate-300">{item.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="formatos" className="bg-slate-900 px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="formats-title">
            <div className="mx-auto max-w-7xl">
              <div className="max-w-3xl">
                <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Contenido que podemos crear</p>
                <h2 id="formats-title" className="text-3xl font-black !text-white sm:text-4xl">
                  Formatos pensados para explicar, vender y mantener actividad
                </h2>
                <p className="mt-4 text-lg leading-8 text-slate-300">
                  Hasta tener casos documentados con datos reales, preferimos ensenar el tipo de piezas que podemos producir para tu marca.
                </p>
              </div>
              <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                {contentFormats.map((format) => {
                  const Icon = format.icon;

                  return (
                    <article className="flex h-full flex-col rounded-lg bg-slate-950 p-6 ring-1 ring-slate-800" key={format.title}>
                      <span className="mb-5 grid h-12 w-12 place-items-center rounded-lg bg-blue-500/10 text-blue-300 ring-1 ring-blue-400/20">
                        <Icon className="h-6 w-6" aria-hidden="true" strokeWidth={1.8} />
                      </span>
                      <h3 className="text-lg font-black !text-white">{format.title}</h3>
                      <p className="mt-3 text-sm leading-[1.65] text-slate-300">{format.text}</p>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>

          <section id="planes" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="plans-title">
            <div className="max-w-3xl">
              <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Planes</p>
              <h2 id="plans-title" className="text-3xl font-black !text-white sm:text-4xl">
                Planes de gestion de redes sociales adaptados a tu empresa
              </h2>
            </div>
            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {plans.map((plan) => (
                <article className={`flex h-full flex-col rounded-lg p-6 ring-1 ${plan.recommended ? "scale-[1.02] bg-blue-600 text-white shadow-2xl shadow-blue-950/40 ring-blue-300/40" : "bg-white/5 ring-white/10"}`} key={plan.name}>
                  {plan.recommended ? <p className="mb-4 w-fit rounded-full bg-white px-3 py-1 text-xs font-black uppercase text-blue-700">MAS POPULAR</p> : null}
                  <h3 className="text-2xl font-black !text-white">{plan.name}</h3>
                  <p className={`mt-2 font-bold ${plan.recommended ? "text-blue-100" : "text-blue-300"}`}>{plan.subtitle}</p>
                  <div className="mt-5">
                    {plan.cadence ? (
                      <p className="flex items-baseline gap-2">
                        <span className={`text-4xl font-black ${plan.recommended ? "text-white" : "text-slate-50"}`}>{plan.price}</span>
                        <span className={`text-sm font-black ${plan.recommended ? "text-blue-100" : "text-slate-400"}`}>{plan.cadence}</span>
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
                    <a className={`inline-flex min-h-12 w-full items-center justify-center rounded-lg px-5 py-3 font-black ${plan.recommended ? "featured-plan-button bg-white text-blue-700 hover:bg-blue-50" : "bg-blue-600 text-white hover:bg-blue-500"}`} href="#propuesta-redes">
                      {plan.recommended ? "Elegir Plan Crecimiento" : plan.name === "Plan A Medida" ? "Solicitar presupuesto" : "Elegir Plan Presencia"}
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="bg-slate-900 px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="process-title">
            <div className="mx-auto max-w-7xl">
              <div className="max-w-3xl">
                <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Metodologia</p>
                <h2 id="process-title" className="text-3xl font-black !text-white sm:text-4xl">
                  Asi trabajamos contigo mes a mes
                </h2>
              </div>
              <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                {process.map((step) => (
                  <article className="relative flex h-full flex-col rounded-lg bg-slate-950 p-6 ring-1 ring-slate-800" key={step.step}>
                    <div className="flex items-center justify-between gap-4">
                      <span className="grid h-12 w-12 place-items-center rounded-lg bg-blue-500/10 text-blue-300 ring-1 ring-blue-400/20">
                        <step.icon className="h-6 w-6" aria-hidden="true" strokeWidth={1.8} />
                      </span>
                      <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-black text-slate-200">{step.step}</span>
                    </div>
                    <h3 className="!mt-8 text-xl font-black !text-white">{step.title}</h3>
                    <p className="mt-3 text-sm leading-[1.65] text-slate-300">{step.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section id="faq" className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="faq-title">
            <div className="max-w-3xl">
              <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">FAQ</p>
              <h2 id="faq-title" className="text-3xl font-black !text-white sm:text-4xl">
                Preguntas frecuentes sobre gestion de redes sociales
              </h2>
            </div>
            <div className="mt-10 grid gap-4">
              {faqs.map((faq) => (
                <details className="rounded-lg bg-white/5 p-6 ring-1 ring-white/10" key={faq.question}>
                  <summary className="cursor-pointer text-lg font-black !text-white">{faq.question}</summary>
                  <p className="mt-4 leading-7 text-slate-300">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>

          <section id="propuesta-redes" className="border-t border-slate-800 bg-slate-900 px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="proposal-title">
            <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
              <div>
                <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Propuesta gratuita</p>
                <h2 id="proposal-title" className="text-3xl font-black !text-white sm:text-4xl">
                  Empezamos a impulsar tus redes sociales?
                </h2>
                <p className="mt-5 text-lg leading-8 text-slate-300">
                  Solicita una propuesta sin compromiso. Revisaremos tus perfiles actuales y te diremos como podemos ayudarte a publicar con mas claridad, constancia y criterio.
                </p>
                <div className="mt-8 grid gap-3">
                  {["Revision inicial de tus perfiles", "Recomendacion de canales prioritarios", "Propuesta de calendario y formatos"].map((item) => (
                    <p className="flex gap-3 text-slate-200" key={item}>
                      <CheckIcon />
                      <span>{item}</span>
                    </p>
                  ))}
                </div>
              </div>
              <SocialMediaForm />
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
