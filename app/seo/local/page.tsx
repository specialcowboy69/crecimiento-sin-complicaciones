import type { Metadata } from "next";
import Link from "next/link";
import {
  BarChart3,
  Building2,
  CheckCircle2,
  FileText,
  Globe2,
  Link2,
  MapPin,
  MessageCircle,
  Share2,
  ShieldCheck,
} from "lucide-react";
import { LandingServicesMenu } from "../../components/LandingServicesMenu";
import { LocalReviewsCarousel } from "../../components/LocalReviewsCarousel";
import { LocalSeoAuditForm } from "../../components/LocalSeoAuditForm";
import { Logo } from "../../components/Logo";
import { SITE_URL, absoluteUrl } from "../../lib/site";

const pagePath = "/seo/local";
const pageUrl = absoluteUrl(pagePath);

const buyingSituations = [
  {
    title: "Tu perfil apenas muestra lo que haces",
    text: "Realizas trabajos y ofreces servicios que apenas aparecen en tus publicaciones, fotos o páginas. A quien te descubre le faltan motivos para elegirte.",
    icon: MapPin,
  },
  {
    title: "Pedir reseñas depende de acordarte",
    text: "Atiendes a tus clientes, pero no tienes un proceso para invitarles a compartir su experiencia después del servicio.",
    icon: MessageCircle,
  },
  {
    title: "Publicas en varios sitios, sin una dirección común",
    text: "Tu web, Google Maps y tus redes hablan de cosas distintas, o el recorrido se corta antes del contacto. Si no tienes web, también falta un lugar propio donde explicar tu oferta.",
    icon: Share2,
  },
];

const localPresenceChannels = [
  {
    title: "Google Maps",
    icon: MapPin,
  },
  {
    title: "Web local",
    icon: Globe2,
  },
  {
    title: "Reseñas",
    icon: MessageCircle,
  },
  {
    title: "Redes",
    icon: Share2,
  },
];

const heroJourneyItems = [
  {
    title: "Te encuentran",
    text: "Maps",
  },
  {
    title: "Entienden tu oferta",
    text: "Web",
  },
  {
    title: "Contactan",
    text: "Reseñas",
  },
];

const localReviewHighlights = [
  {
    title: "100% recomendados",
    text: "Se implicaron al máximo desde el primer día, fueron profesionales y cumplieron con lo acordado sin complicarlo.",
    company: "Find It Import & Export",
    contactRole: "Dirección comercial",
    sector: "Menaje del hogar",
  },
  {
    title: "Agencia profesional y de calidad",
    text: "Hicieron un trabajo ordenado, con buena comunicación y nos acompañaron en todo momento.",
    company: "ABCe Mobility Store",
    contactRole: "Equipo de marketing",
    sector: "Bicicletas eléctricas",
  },
  {
    title: "Muy buena experiencia",
    text: "Entendieron rápido el proyecto, explicaron cada paso con claridad y el trato fue muy serio desde el principio.",
    company: "Hoteles Eurostars",
    contactRole: "Equipo de marketing",
    sector: "Hoteles",
  },
  {
    title: "Profesionales y cercanos",
    text: "Nos propusieron acciones concretas y fáciles de seguir, sin quedarse en ideas generales ni complicar el proceso.",
    company: "Valcap",
    contactRole: "Gerencia",
    sector: "Aseguradora",
  },
  {
    title: "Cumplen lo que dicen",
    text: "Cumplieron lo acordado, cuidaron los detalles y mantuvieron el proyecto avanzando sin complicaciones.",
    company: "Vin Bouquet",
    contactRole: "Dirección de marca",
    sector: "Utensilios de cava, vino y champán",
  },
  {
    title: "Trabajo claro y bien organizado",
    text: "Trabajaron de forma clara y organizada, con buen seguimiento y prioridades convertidas en tareas reales.",
    company: "Iludec",
    contactRole: "Equipo comercial",
    sector: "Componentes de iluminación",
  },
  {
    title: "Sin duda repetiremos",
    text: "Nos dieron mucha tranquilidad, respondieron rápido y se implicaron de verdad. Sin duda repetiremos.",
    company: "Cosmi",
    contactRole: "Dirección de proyecto",
    sector: "Pantallas gigantes",
  },
];

const workItems = [
  {
    title: "Un perfil de Google activo y bien trabajado",
    text: "Revisamos categorías, servicios e información del perfil y planificamos publicaciones, fotografías y novedades de tu negocio. Cada contenido tiene un propósito: explicar un servicio, mostrar un trabajo real o facilitar una consulta.",
    icon: MapPin,
  },
  {
    title: "Un sistema para solicitar y gestionar reseñas",
    text: "Definimos cuándo pedir una opinión después del servicio, preparamos mensajes para email o WhatsApp y facilitamos un enlace o código QR. Organizamos las solicitudes y las respuestas para que no dependan de la memoria de una persona.",
    note: "Solicitamos opiniones auténticas, sin premios ni filtros que dejen fuera a clientes descontentos.",
    icon: MessageCircle,
  },
  {
    title: "SEO local en tu web, con base técnica y contenido útil",
    text: "Investigamos cómo buscan tus servicios y trabajamos las páginas que responden a esas necesidades. Revisamos indexación, títulos, enlaces internos y datos estructurados del negocio, además del contenido y el contacto desde el móvil.",
    note: "Si no tienes web, la creamos. Diseñamos las páginas de tus servicios, preparamos el contenido y configuramos las vías de contacto y la medición acordada.",
    icon: Globe2,
  },
  {
    title: "Redes sociales conectadas con tus servicios",
    text: "Adaptamos el contenido de tus trabajos, servicios y preguntas frecuentes a los canales donde tenga sentido estar. Coordinamos temas y enlaces para que las publicaciones conduzcan a información útil, una reserva o una consulta.",
    icon: Share2,
  },
  {
    title: "Medición para decidir el siguiente paso",
    text: "Revisamos visibilidad, visitas y solicitudes por separado. Con tu seguimiento comercial, podemos distinguir qué contactos encajan y cuáles terminan en clientes.",
    icon: BarChart3,
  },
];

const planRows = [
  {
    work: "Página de servicio",
    action: "Explicar qué incluye la reforma, proceso, zona atendida y trabajos reales autorizados; revisar indexación, enlaces internos y formulario.",
    value: "Responder a la búsqueda y facilitar una solicitud.",
  },
  {
    work: "Perfil de Google",
    action: "Revisar la categoría y el servicio; publicar fotos y contenido del trabajo con enlace a la página pertinente.",
    value: "Mostrar qué hace la empresa a quien consulta el perfil.",
  },
  {
    work: "Redes sociales",
    action: "Adaptar el mismo proyecto a una pieza visual y responder una duda frecuente sobre el servicio.",
    value: "Dar a conocer el trabajo y conducir hacia más información o contacto.",
  },
  {
    work: "Contactos",
    action: "Registrar solicitudes confirmadas y su procedencia cuando pueda medirse.",
    value: "Separar visitas, oportunidades comerciales y clientes.",
  },
  {
    work: "Reseñas tras el servicio",
    action: "Invitar al cliente a compartir su experiencia mediante un enlace, una vez finalizado el trabajo.",
    value: "Incorporar la solicitud de opiniones auténticas al proceso habitual.",
  },
];

const process = [
  {
    step: "01",
    title: "Nos cuentas qué negocio tienes",
    text: "Indica el nombre y la localidad. Puedes añadir tu web, perfil de Google o red social para que revisemos el negocio correcto. No necesitas tener todos los canales creados.",
  },
  {
    step: "02",
    title: "Revisamos y te proponemos prioridades",
    text: "Te explicamos qué vemos en la revisión inicial y qué servicios interesa impulsar. Si podemos ayudarte, recibirás una propuesta que conecte las tareas de Google, web, reseñas y contenido que necesites.",
  },
  {
    step: "03",
    title: "Decides y ponemos en marcha lo acordado",
    text: "Tras aceptar la propuesta, organizamos accesos y materiales y ejecutamos el trabajo. Si hace falta una web, la desarrollamos. En la gestión continua, planificamos contenidos y revisamos prioridades contigo.",
  },
];

const budgetItems = [
  {
    title: "Una propuesta conectada, con tareas concretas",
    text: "Definimos qué necesita tu perfil, qué contenidos hacen falta, cómo organizar las reseñas y qué conviene trabajar en la web y las redes. No hace falta empezar por todo a la vez.",
  },
  {
    title: "Con tu web actual o con una nueva",
    text: "Si ya tienes web, revisamos qué aprovechar y qué mejorar. Si no tienes, incluimos su creación en la propuesta, con páginas, funcionalidades y condiciones detalladas.",
  },
  {
    title: "Trabajo inicial y gestión continua, claramente definidos",
    text: "El presupuesto distingue las tareas de puesta en marcha de las que requieren continuidad: publicaciones, gestión de reseñas, contenido social y revisión de resultados.",
  },
];

const trustItems = [
  {
    title: "Tu negocio sigue bajo tu control",
    text: "Mantienes la titularidad de tu perfil de Google y tus cuentas. Cuando necesitemos acceso, lo gestionaremos mediante permisos.",
  },
  {
    title: "Cada cambio tiene una explicación",
    text: "Recibirás un resumen del trabajo realizado y de las cuestiones que requieren tu decisión.",
  },
  {
    title: "Las prioridades se acuerdan contigo",
    text: "Las tareas adicionales se presupuestan antes de ejecutarse.",
  },
];

const faqs = [
  {
    question: "¿Trabajáis con negocios de mi ciudad?",
    answer:
      "Trabajamos a distancia con negocios de toda España. La estrategia se adapta a la zona donde atiendes y a los servicios que prestas.",
  },
  {
    question: "¿Me sirve si no tengo una página web?",
    answer:
      "Sí. Podemos crear tu web y conectarla desde el principio con tu estrategia local: páginas de servicios, contenido, contacto y medición. Su alcance y precio se detallan en la misma propuesta.",
  },
  {
    question: "¿Qué vais a publicar en mi perfil de Google?",
    answer:
      "Contenido sobre tus servicios, trabajos reales, novedades y dudas de clientes, acompañado de fotos o vídeos cuando proceda. Acordamos calendario, materiales y aprobaciones.",
  },
  {
    question: "¿Cómo funciona el sistema de reseñas?",
    answer:
      "Preparamos una invitación para clientes que hayan recibido el servicio y una forma sencilla de enviarla o acceder a ella. La opinión es libre: no compramos reseñas ni seleccionamos solo a quienes darían una valoración positiva.",
  },
  {
    question: "¿Trabajar la web mejora también mi perfil de Maps?",
    answer:
      "La web forma parte de la presencia del negocio que trabajamos junto al perfil. No es un traspaso automático de autoridad ni una garantía de posiciones.",
  },
  {
    question: "¿Tengo que contratar también redes sociales?",
    answer:
      "No necesariamente. Podemos gestionarlas dentro de la estrategia, pero primero decidimos dónde merece la pena actuar. Si ya las lleva otra persona, coordinamos mensajes, contenidos y enlaces dentro del alcance acordado.",
  },
  {
    question: "¿Puedo tener una ficha si trabajo a domicilio?",
    answer:
      "Un negocio que visita a sus clientes puede cumplir los requisitos para tener un Perfil de Empresa. Revisaremos tu situación antes de proponer cambios. Esta oferta no está orientada a negocios que operan exclusivamente online.",
  },
  {
    question: "¿Cuánto tarda en notarse el SEO local?",
    answer:
      "Depende del punto de partida, de la competencia y de las búsquedas de tu zona. El plazo de ejecución se acuerda en la propuesta; los cambios de visibilidad necesitan observación posterior.",
  },
  {
    question: "¿Garantizáis aparecer primero o conseguir un número de clientes?",
    answer:
      "No. Nuestro compromiso es ejecutar y explicar las tareas acordadas y revisar su evolución. Las posiciones y los clientes obtenidos no dependen solo del trabajo de la agencia.",
  },
  {
    question: "¿Qué incluye la auditoría gratuita?",
    answer:
      "Revisamos tu perfil público de Google, una página de tu web si existe y el contenido público del canal social que compartas. Te indicamos prioridades y próximos pasos. No incluye una auditoría técnica exhaustiva, acceso a datos privados ni la ejecución del plan.",
  },
  {
    question: "¿Cuánto cuesta contrataros?",
    answer:
      "Depende del punto de partida, de si hay que crear una web y de las páginas, contenidos, perfiles y canales que gestionemos. Después de la revisión recibirás un presupuesto con trabajo inicial, gestión recurrente y posibles costes de herramientas identificados.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Crecimiento sin complicaciones",
      url: SITE_URL,
    },
    {
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: "SEO local para negocios",
      inLanguage: "es-ES",
      mainEntity: { "@id": `${pageUrl}#service` },
      breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
    },
    {
      "@type": "Service",
      "@id": `${pageUrl}#service`,
      name: "SEO local para negocios",
      serviceType: "SEO local y gestión del Perfil de Empresa en Google",
      url: pageUrl,
      description:
        "Perfil de Empresa, contenidos, solicitud de reseñas, SEO de la web y redes sociales coordinados, con creación web cuando haga falta.",
      provider: { "@id": `${SITE_URL}/#organization` },
      areaServed: { "@type": "Country", name: "España" },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Agencia SEO", item: `${SITE_URL}/seo` },
        { "@type": "ListItem", position: 3, name: "SEO local", item: pageUrl },
      ],
    },
  ],
};

export const metadata: Metadata = {
  title: "Agencia SEO local",
  description:
    "Conectamos Google Maps, reseñas, SEO de tu web y redes sociales. Si no tienes web, la creamos. Solicita tu auditoría gratuita.",
  alternates: {
    canonical: pagePath,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Agencia SEO local",
    description:
      "Google Maps, reseñas, SEO de tu web y redes sociales con una misma estrategia de captación.",
    url: pagePath,
    siteName: "Crecimiento sin complicaciones",
    locale: "es_ES",
    type: "website",
  },
};

function CheckIcon() {
  return <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-blue-400" aria-hidden="true" strokeWidth={2} />;
}

export default function LocalSeoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <div className="landing-light min-h-screen bg-slate-950 text-slate-50">
        <header className="sticky top-0 z-20 border-b border-slate-800 bg-slate-950/95 backdrop-blur">
          <nav className="mx-auto flex min-h-[72px] max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8" aria-label="Navegación principal">
            <Link className="logo-link text-slate-50" href="/" aria-label="Crecimiento sin complicaciones, inicio">
              <Logo variant="light" />
            </Link>
            <div className="hidden items-center gap-2 text-sm font-semibold text-slate-300 md:flex">
              <a className="rounded-md px-3 py-2 hover:bg-slate-900 hover:text-white" href="#incluye">Qué incluye</a>
              <a className="rounded-md px-3 py-2 hover:bg-slate-900 hover:text-white" href="#proceso">Proceso</a>
              <a className="rounded-md px-3 py-2 hover:bg-slate-900 hover:text-white" href="#faq">FAQ</a>
            </div>
            <div className="mobile-header-links" aria-label="Enlaces rápidos">
              <a href="#incluye">Incluye</a>
              <a href="#proceso">Proceso</a>
            </div>
            <div className="flex items-center gap-3">
              <LandingServicesMenu currentPath={pagePath} />
              <a className="landing-top-cta inline-flex min-h-11 shrink-0 items-center justify-center rounded-lg bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-blue-950/30 hover:bg-blue-500 focus-visible:ring-2 focus-visible:ring-blue-400" href="#auditoria-seo-local">
                Auditoría gratuita
              </a>
            </div>
          </nav>
        </header>

        <main>
          <section className="relative mx-auto max-w-7xl overflow-hidden px-4 py-12 sm:px-6 lg:px-8 lg:py-16" aria-labelledby="local-seo-hero-title">
            <div className="pointer-events-none absolute -bottom-20 left-0 h-44 w-[42rem] rounded-tr-[12rem] bg-gradient-to-r from-blue-600/12 via-sky-400/10 to-teal-400/10" aria-hidden="true" />
            <nav className="mb-5 flex items-center gap-2 text-sm font-bold text-slate-400" aria-label="Migas de pan">
              <Link className="hover:text-blue-300" href="/">Inicio</Link>
              <span aria-hidden="true">/</span>
              <Link className="hover:text-blue-300" href="/seo">Agencia SEO</Link>
              <span aria-hidden="true">/</span>
              <span>SEO local</span>
            </nav>
            <div className="relative grid gap-10 lg:grid-cols-[0.98fr_1.02fr] lg:items-center">
              <div className="max-w-3xl">
                <div className="mb-4 text-sm font-black uppercase tracking-normal text-teal-700">
                  Servicio para negocios de toda España
                </div>
                <h1 id="local-seo-hero-title" className="mb-5 max-w-3xl text-4xl font-black leading-[1.04] text-slate-900 sm:text-5xl lg:text-[3.05rem] xl:text-[3.45rem]">
                  SEO local para conseguir más consultas
                </h1>
                <div className="max-w-2xl text-lg font-semibold leading-8 text-slate-600 sm:text-xl">
                  Conectamos Google Maps, tu web, reseñas y redes para que tus servicios sean fáciles de encontrar y contactar. Si no tienes web, también la creamos.
                </div>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <a className="inline-flex min-h-12 items-center justify-center rounded-lg bg-blue-600 px-6 py-3 font-bold text-white shadow-xl shadow-blue-950/30 hover:bg-blue-500 focus-visible:ring-2 focus-visible:ring-blue-400" href="#auditoria-seo-local">
                    Solicitar auditoría gratuita
                  </a>
                  <a className="inline-flex min-h-12 items-center justify-center rounded-lg border border-slate-200 bg-white px-6 py-3 font-bold text-slate-900 shadow-sm hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-blue-400" href="#incluye">
                    Ver qué incluye
                  </a>
                </div>

              </div>
              <div className="relative">
                <div className="absolute inset-6 rounded-lg bg-blue-200/45 blur-3xl" aria-hidden="true" />
                <div className="relative rounded-lg border border-blue-100 bg-white/90 p-4 shadow-2xl shadow-blue-950/10 sm:p-5" aria-label="Sistema de presencia local conectada">
                  <div className="relative overflow-hidden rounded-lg bg-[linear-gradient(135deg,#2563eb,#0f766e)] p-5 [color:#fff] sm:p-6">
                    <div className="absolute right-0 top-0 h-full w-28 bg-white/10 [clip-path:polygon(42%_0,100%_0,100%_100%,0_100%)]" aria-hidden="true" />
                    <div className="relative max-w-xl">
                      <div className="text-sm font-black uppercase tracking-normal text-blue-50">Presencia local conectada</div>
                      <div className="mt-3 text-2xl font-black leading-tight sm:text-3xl" style={{ color: "#ffffff" }}>
                        De Google Maps a una consulta real
                      </div>
                      <div className="mt-4 max-w-md text-sm font-bold leading-6 text-blue-50 sm:text-base">
                        Maps, web, reseñas y redes unidos por el contacto.
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 rounded-lg bg-white p-5 ring-1 ring-blue-100">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-3">
                        <span className="grid h-11 w-11 place-items-center rounded-lg bg-blue-50 text-blue-600 ring-1 ring-blue-100">
                          <Link2 className="h-5 w-5" aria-hidden="true" strokeWidth={2} />
                        </span>
                        <div>
                          <div className="text-sm font-black uppercase tracking-normal text-teal-700">Recorrido hasta la consulta</div>
                          <div className="mt-1 text-xl font-black leading-tight text-slate-900">Un camino fácil de entender</div>
                        </div>
                      </div>
                      <div className="flex gap-2" aria-label="Canales trabajados">
                        {localPresenceChannels.map((item) => {
                          const Icon = item.icon;

                          return (
                            <span key={item.title} className="grid h-9 w-9 place-items-center rounded-lg bg-teal-50 text-teal-700 ring-1 ring-teal-100" title={item.title}>
                              <Icon className="h-4 w-4" aria-hidden="true" strokeWidth={2} />
                            </span>
                          );
                        })}
                      </div>
                    </div>
                    <div className="mt-5 grid gap-3 sm:grid-cols-3">
                      {heroJourneyItems.map((item, index) => (
                        <div key={item.title} className="rounded-lg bg-slate-50 p-4 ring-1 ring-slate-100">
                          <span className="grid h-9 w-9 place-items-center rounded-lg bg-blue-600 text-sm font-black text-white">
                            {index + 1}
                          </span>
                          <div className="mt-4">
                            <div className="text-sm font-black leading-tight text-slate-900">{item.title}</div>
                            <div className="mt-1 text-sm font-bold leading-5 text-slate-600">{item.text}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="bg-[linear-gradient(90deg,#2563eb,#0f766e)] px-4 py-6 sm:px-6 lg:px-8">
            <div
              role="note"
              className="local-guarantee-text mx-auto max-w-6xl text-center text-2xl font-black leading-tight tracking-normal sm:text-3xl lg:text-4xl"
              style={{ color: "#ffffff", textShadow: "0 2px 18px rgba(15, 23, 42, 0.28)" }}
            >
              Si en 6 meses no empiezas a ver resultados te devolvemos el dinero
            </div>
          </div>

          <section className="border-y border-slate-800 bg-slate-900 px-4 py-16 sm:px-6 lg:px-8" aria-labelledby="situations-title">
            <div className="mx-auto max-w-7xl">
              <div className="max-w-3xl">
                <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Situaciones de compra</p>
                <h2 id="situations-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                  Tu negocio avanza. ¿Tu presencia online lo refleja?
                </h2>
              </div>
              <div className="mt-10 grid gap-5 md:grid-cols-3">
                {buyingSituations.map((item) => (
                  <article className="rounded-lg bg-slate-950 p-6 ring-1 ring-slate-800" key={item.title}>
                    <item.icon className="h-7 w-7 text-blue-300" aria-hidden="true" strokeWidth={1.8} />
                    <h3 className="!mt-7 text-xl font-black text-slate-900">{item.title}</h3>
                    <p className="mt-3 text-sm leading-[1.7] text-slate-300">{item.text}</p>
                  </article>
                ))}
              </div>
              <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-300">
                Revisamos qué servicios quieres impulsar y qué necesita cada canal para apoyar ese objetivo.
              </p>
            </div>
          </section>

          <section id="incluye" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="includes-title">
            <div className="max-w-3xl">
              <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Qué incluye</p>
              <h2 id="includes-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                Una estrategia local, desde el contenido hasta el contacto
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-300">
                Podemos ocuparnos de todo el proceso o empezar por las prioridades de tu negocio. Tendrás por escrito qué hacemos, en qué canales y con qué frecuencia.
              </p>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {workItems.map((item) => (
                <article className="rounded-lg bg-white/5 p-6 ring-1 ring-white/10" key={item.title}>
                  <span className="grid h-12 w-12 place-items-center rounded-lg bg-blue-500/10 text-blue-300 ring-1 ring-blue-400/20">
                    <item.icon className="h-6 w-6" aria-hidden="true" strokeWidth={1.8} />
                  </span>
                  <h3 className="!mt-7 text-xl font-black text-slate-900">{item.title}</h3>
                  <p className="mt-3 text-sm leading-[1.7] text-slate-300">{item.text}</p>
                  {item.note ? <p className="mt-4 text-sm font-bold leading-7 text-slate-900">{item.note}</p> : null}
                </article>
              ))}
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24" aria-labelledby="local-reviews-title">
            <div className="max-w-3xl">
              <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Reseñas</p>
              <h2 id="local-reviews-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                Qué suelen destacar los clientes
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-300">
                Las reseñas no prometen posiciones. Ayudan a ver si el negocio se entiende mejor, transmite más confianza y facilita el contacto.
              </p>
            </div>
            <LocalReviewsCarousel items={localReviewHighlights} />
          </section>

          <section className="bg-slate-900 px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="maps-web-title">
            <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.88fr_1.12fr]">
              <div>
                <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Web y Google Maps</p>
                <h2 id="maps-web-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                  El SEO local también se trabaja fuera de Google Maps
                </h2>
              </div>
              <div className="grid gap-5 text-lg leading-8 text-slate-300">
                <p>
                  Tu web explica tus servicios y dónde los prestas. Las reseñas aportan experiencias de clientes. Los enlaces desde otras webs pueden contribuir a la notoriedad de tu negocio, uno de los aspectos que Google considera en los resultados locales.
                </p>
                <p>
                  Trabajamos esas piezas con un mismo criterio: información coherente, contenido útil y referencias auténticas. Las redes ayudan a mostrar tu trabajo y a llevar personas interesadas hacia tus servicios.
                </p>
                <p className="font-bold text-slate-900">
                  No se trata de pasar una puntuación de autoridad de la web a Maps, sino de desarrollar la presencia del mismo negocio en los lugares donde lo buscan y lo valoran.
                </p>
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="plan-title">
            <div className="max-w-3xl">
              <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Ejemplo ilustrativo</p>
              <h2 id="plan-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                Así conectamos el trabajo alrededor de un servicio
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-300">
                Imagina una empresa de reformas que quiere recibir consultas sobre reformas de baños. Este sería un ejemplo de trabajo coordinado.
              </p>
            </div>
            <div className="mt-10 overflow-hidden rounded-lg bg-white shadow-[0_14px_36px_rgba(15,23,42,0.08)] ring-1 ring-slate-200">
              <div className="border-b border-slate-200 bg-blue-50 p-5">
                <h3 className="text-xl font-black text-slate-900">Ejemplo ilustrativo de plan de trabajo</h3>
                <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
                  No corresponde a un cliente ni demuestra resultados obtenidos. Las tareas reales se definen después de revisar cada negocio.
                </p>
              </div>
              <div className="hidden overflow-x-auto md:block">
                <table className="w-full min-w-[860px] border-collapse text-left">
                  <caption className="sr-only">Ejemplo ilustrativo de trabajo coordinado de SEO local</caption>
                  <thead>
                    <tr>
                      <th className="border-b border-slate-200 bg-slate-50 p-5 text-sm font-black text-slate-900">Trabajo</th>
                      <th className="border-b border-slate-200 bg-slate-50 p-5 text-sm font-black text-slate-900">Qué hacemos</th>
                      <th className="border-b border-slate-200 bg-slate-50 p-5 text-sm font-black text-slate-900">Para qué sirve</th>
                    </tr>
                  </thead>
                  <tbody>
                    {planRows.map((row) => (
                      <tr key={row.work}>
                        <th className="border-b border-slate-200 p-5 text-sm font-black text-slate-900">{row.work}</th>
                        <td className="border-b border-slate-200 p-5 text-sm leading-6 text-slate-600">{row.action}</td>
                        <td className="border-b border-slate-200 p-5 text-sm font-bold leading-6 text-slate-700">{row.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="grid gap-4 p-5 md:hidden">
                {planRows.map((row) => (
                  <article className="rounded-lg border border-slate-200 p-4" key={row.work}>
                    <h3 className="text-lg font-black text-slate-900">{row.work}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{row.action}</p>
                    <p className="mt-3 text-sm font-bold leading-6 text-slate-700">{row.value}</p>
                  </article>
                ))}
              </div>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a className="inline-flex min-h-12 items-center justify-center rounded-lg bg-blue-600 px-6 py-3 font-bold text-white shadow-xl shadow-blue-950/30 hover:bg-blue-500 focus-visible:ring-2 focus-visible:ring-blue-400" href="#auditoria-seo-local">
                Solicitar auditoría gratuita
              </a>
              <p className="text-base font-semibold text-slate-300">Cada canal cumple una función. La estrategia los une alrededor del servicio que quieres vender.</p>
            </div>
          </section>

          <section id="proceso" className="border-y border-slate-800 bg-slate-900 px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="process-title">
            <div className="mx-auto max-w-7xl">
              <div className="max-w-3xl">
                <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Proceso</p>
                <h2 id="process-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                  Del primer análisis a un trabajo definido
                </h2>
              </div>
              <div className="mt-10 grid gap-4">
                {process.map((step) => (
                  <article className="grid gap-4 rounded-lg bg-slate-950 p-6 ring-1 ring-slate-800 sm:grid-cols-[4rem_1fr]" key={step.step}>
                    <span className="text-3xl font-black text-blue-400">{step.step}</span>
                    <div>
                      <h3 className="text-xl font-black text-slate-900">{step.title}</h3>
                      <p className="mt-2 leading-7 text-slate-300">{step.text}</p>
                    </div>
                  </article>
                ))}
              </div>
              <p className="mt-8 text-lg font-bold text-slate-900">Pedir la auditoría gratuita no supone contratar el servicio.</p>
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="budget-title">
            <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
              <div>
                <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Alcance y presupuesto</p>
                <h2 id="budget-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                  Un presupuesto según lo que necesita tu negocio
                </h2>
                <p className="mt-5 text-lg leading-8 text-slate-300">
                  La auditoría inicial es gratuita. La implementación y la gestión son servicios de pago.
                </p>
              </div>
              <div className="grid gap-4">
                {budgetItems.map((item) => (
                  <article className="rounded-lg bg-white/5 p-6 ring-1 ring-white/10" key={item.title}>
                    <h3 className="text-xl font-black text-slate-900">{item.title}</h3>
                    <p className="mt-3 leading-7 text-slate-300">{item.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="bg-slate-900 px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="trust-title">
            <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.88fr_1.12fr]">
              <div>
                <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Confianza y control</p>
                <h2 id="trust-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                  Sabrás qué hacemos y qué queda por hacer
                </h2>
                <p className="mt-5 text-lg leading-8 text-slate-300">
                  En Crecimiento sin complicaciones podemos coordinar tu perfil de Google, el SEO de tu web, los contenidos, las reseñas y las redes sociales. Tendrás una hoja de ruta común y el alcance por escrito.
                </p>
              </div>
              <div className="grid gap-5 md:grid-cols-3">
                {trustItems.map((item) => (
                  <article className="rounded-lg bg-slate-950 p-6 ring-1 ring-slate-800" key={item.title}>
                    <ShieldCheck className="h-7 w-7 text-blue-300" aria-hidden="true" strokeWidth={1.8} />
                    <h3 className="!mt-7 text-xl font-black text-slate-900">{item.title}</h3>
                    <p className="mt-3 text-sm leading-[1.7] text-slate-300">{item.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="related-title">
            <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
              <div>
                <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Servicios relacionados</p>
                <h2 id="related-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                  La presencia local se apoya en varias piezas
                </h2>
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                <Link className="rounded-lg bg-white/5 p-6 ring-1 ring-white/10 hover:bg-slate-900" href="/seo">
                  <FileText className="h-7 w-7 text-blue-300" aria-hidden="true" strokeWidth={1.8} />
                  <h3 className="!mt-7 text-xl font-black text-slate-900">Agencia SEO</h3>
                  <p className="mt-3 text-sm leading-[1.7] text-slate-300">SEO nacional, técnico, arquitectura y contenidos para captar demanda desde Google.</p>
                </Link>
                <Link className="rounded-lg bg-white/5 p-6 ring-1 ring-white/10 hover:bg-slate-900" href="/diseno-pagina-web-profesional">
                  <Building2 className="h-7 w-7 text-blue-300" aria-hidden="true" strokeWidth={1.8} />
                  <h3 className="!mt-7 text-xl font-black text-slate-900">Diseño web profesional</h3>
                  <p className="mt-3 text-sm leading-[1.7] text-slate-300">Si no tienes web, podemos crear las páginas de tus servicios y conectarlas con tu estrategia local.</p>
                </Link>
              </div>
            </div>
          </section>

          <section id="faq" className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="faq-title">
            <div className="max-w-3xl">
              <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">FAQ</p>
              <h2 id="faq-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                Antes de empezar
              </h2>
            </div>
            <div className="mt-10 grid gap-4">
              {faqs.map((faq) => (
                <details className="rounded-lg bg-white/5 p-6 ring-1 ring-white/10" key={faq.question}>
                  <summary className="cursor-pointer text-lg font-black text-slate-900">{faq.question}</summary>
                  <p className="mt-4 leading-7 text-slate-300">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>

          <section id="auditoria-seo-local" className="border-t border-slate-800 bg-slate-900 px-4 py-16 pb-28 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="audit-title">
            <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.86fr_1.14fr]">
              <div>
                <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Auditoría gratuita</p>
                <h2 id="audit-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                  Veamos qué puede mejorar en tu presencia local
                </h2>
                <p className="mt-5 text-lg leading-8 text-slate-300">
                  Cuéntanos qué negocio tienes. Revisaremos tu presencia local y cómo conectar Google, web y contenido alrededor de tus servicios. Te responderemos con las prioridades que detectemos y el siguiente paso recomendado.
                </p>
                <div className="mt-8 grid gap-3">
                  {[
                    "Perfil de Google, una página de tu web si existe y canal social compartido.",
                    "Prioridades para ordenar Google Maps, web, reseñas y contenido.",
                    "Revisión inicial sin coste; creación web y gestión bajo presupuesto.",
                  ].map((item) => (
                    <p className="flex gap-3 text-slate-200" key={item}>
                      <CheckIcon />
                      <span>{item}</span>
                    </p>
                  ))}
                </div>
                <p className="mt-8 flex gap-3 rounded-lg bg-white/5 p-5 text-sm font-semibold leading-6 text-slate-300 ring-1 ring-white/10">
                  <Link2 className="h-5 w-5 flex-none text-blue-300" aria-hidden="true" strokeWidth={1.8} />
                  Usaremos estos datos para revisar tu negocio y responder a tu solicitud.
                </p>
              </div>
              <LocalSeoAuditForm />
            </div>
          </section>
        </main>

        <footer className="border-t border-slate-800 px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 text-sm font-semibold text-slate-400 md:flex-row md:items-center md:justify-between">
            <p className="font-black text-slate-900">Crecimiento sin complicaciones</p>
            <p>SEO local, web y contenidos conectados para negocios de toda España.</p>
          </div>
        </footer>

        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-800 bg-slate-950/95 p-3 backdrop-blur md:hidden">
          <a className="mx-auto flex min-h-12 max-w-md items-center justify-center rounded-lg bg-blue-600 px-5 py-3 font-black text-white shadow-lg shadow-blue-950/40" href="#auditoria-seo-local">
            Solicitar auditoría gratuita
          </a>
        </div>
      </div>
    </>
  );
}
