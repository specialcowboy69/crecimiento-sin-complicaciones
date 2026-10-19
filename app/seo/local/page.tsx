import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  BarChart3,
  CheckCircle2,
  FileText,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import { LandingServicesMenu } from "../../components/LandingServicesMenu";
import { LocalReviewsCarousel } from "../../components/LocalReviewsCarousel";
import { LocalSeoAuditForm } from "../../components/LocalSeoAuditForm";
import { Logo } from "../../components/Logo";
import { SITE_URL, absoluteUrl } from "../../lib/site";
import collaborationImage from "../../../public/images/seo-local-collaboration-v2.webp";
import factorsImage from "../../../public/images/seo-local-factors-v2.webp";
import heroImage from "../../../public/images/seo-local-hero-v2.webp";
import localPresenceImage from "../../../public/images/seo-local-presence-v3.webp";
import styles from "./page.module.css";

const pagePath = "/seo/local";
const pageUrl = absoluteUrl(pagePath);

const buyingSituations = [
  {
    title: "Tus competidores aparecen y tu negocio no.",
    text: "Buscan uno de tus servicios en tu zona y otras empresas aparecen antes que tú en Maps o Google.",
    icon: MapPin,
  },
  {
    title: "Tu visibilidad cambia mucho según la zona.",
    text: "Necesitas saber dónde pierdes presencia y qué factores sí puedes mejorar.",
    icon: BarChart3,
  },
  {
    title: "Google no entiende bien qué ofreces ni dónde atiendes.",
    text: "El perfil y la web no explican con suficiente claridad tus servicios, ubicaciones reales y páginas relevantes.",
    icon: FileText,
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
    title: "Diagnóstico de búsquedas y competencia local",
    text: "Detectamos qué buscan, en qué zonas y qué negocios ocupan hoy los resultados locales.",
  },
  {
    title: "Perfil de Empresa de Google",
    text: "Ordenamos categorías, servicios, información, área de servicio, fotografías y posibles duplicados.",
  },
  {
    title: "SEO local del sitio web",
    text: "Revisamos estructura, indexación, páginas prioritarias, enlaces internos y contacto desde el móvil.",
  },
  {
    title: "Gestión de reseñas y respuestas",
    text: "Diseñamos un proceso para solicitar, responder y aprovechar opiniones reales de clientes.",
  },
  {
    title: "Notoriedad y referencias del negocio",
    text: "Unificamos la información y revisamos menciones o enlaces legítimos en webs relevantes.",
  },
  {
    title: "Medición y prioridades",
    text: "Medimos si tu negocio aparece mejor en Google y si recibe más consultas para decidir qué mejorar después.",
  },
];

const planRows = [
  {
    work: "Búsquedas y zona",
    action: "Identificar cómo buscan los servicios prioritarios y desde qué localidades interesa captar clientes.",
    value: "Definir la demanda y el área real de trabajo.",
  },
  {
    work: "Competencia local",
    action: "Comparar qué empresas aparecen, qué servicios destacan y cómo presentan su perfil y su web.",
    value: "Detectar diferencias y oportunidades prioritarias.",
  },
  {
    work: "Perfil de Google",
    action: "Revisar categorías, servicios, área de servicio, información, fotografías y contenido del negocio.",
    value: "Mejorar la correspondencia entre el negocio y las búsquedas relevantes.",
  },
  {
    work: "Página web y páginas clave",
    action: "Trabajar estructura, indexación y enlaces internos. Revisar el conjunto de la web y analizar en detalle sus páginas clave; mejorar los servicios prioritarios y relacionarlos con las zonas atendidas.",
    value: "Responder mejor a la búsqueda y facilitar una solicitud.",
  },
  {
    work: "Reseñas y referencias",
    action: "Incorporar un proceso de solicitud de opiniones después del servicio y revisar menciones relevantes del negocio.",
    value: "Reforzar confianza y notoriedad con señales reales.",
  },
  {
    work: "Medición",
    action: "Seguir visibilidad para las búsquedas y zonas analizadas, además de las solicitudes recibidas.",
    value: "Comprobar la evolución y decidir la siguiente prioridad.",
  },
];

const methodSteps = [
  {
    step: "01",
    title: "Analizar",
    text: "Revisamos las búsquedas, tu Perfil de Empresa y, si tienes web, el conjunto de la web y sus páginas clave.",
  },
  {
    step: "02",
    title: "Priorizar",
    text: "Ordenamos las oportunidades por impacto, esfuerzo y relación con los servicios que quieres impulsar.",
  },
  {
    step: "03",
    title: "Ejecutar",
    text: "Después de aceptar la propuesta, aplicamos el alcance acordado en el perfil, la web, la reputación y las referencias.",
  },
  {
    step: "04",
    title: "Medir",
    text: "Con los accesos y el seguimiento disponibles, medimos si tu negocio aparece mejor en Google y recibe más consultas para decidir qué mejorar después.",
  },
];

const budgetItems = [
  {
    label: "01",
    title: "Auditoría inicial",
    text: "La revisión inicial es gratuita y termina con prioridades claras y próximos pasos recomendados.",
  },
  {
    label: "02",
    title: "Puesta en marcha",
    text: "La propuesta separa las tareas iniciales, sus entregables y los accesos necesarios para empezar.",
  },
  {
    label: "03",
    title: "Gestión continua",
    text: "Seguimos trabajando en tu posicionamiento y ajustamos las acciones según evolucione tu negocio.",
  },
];

const trustItems = [
  {
    title: "Cada cambio tiene una explicación",
    text: "Recibes un resumen del trabajo realizado y de las decisiones pendientes.",
  },
  {
    title: "Las prioridades se acuerdan contigo",
    text: "Cualquier tarea adicional se aprueba y presupuesta antes de ejecutarse.",
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
      "Preparamos una invitación para clientes que hayan recibido el servicio y una forma sencilla de enviarla o acceder a ella. También definimos cómo responder y dar seguimiento para que las opiniones formen parte de la gestión habitual.",
  },
  {
    question: "¿Trabajar la web mejora también mi perfil de Maps?",
    answer:
      "La web y el Perfil de Empresa cumplen funciones distintas dentro de la estrategia local. Trabajamos cada uno según su función y medimos su evolución por separado dentro del alcance acordado.",
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
      "Revisamos tu Perfil de Empresa de Google. Si tienes web, revisamos el conjunto de la web y analizamos en detalle sus páginas clave. También valoramos tus servicios, la zona, la competencia y las señales locales visibles. Te comunicamos cuáles son las prioridades de tu proyecto y los próximos pasos recomendados. No incluye acceso a datos privados ni la ejecución del plan.",
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
        "Diagnóstico de búsquedas y competencia local, Perfil de Empresa, SEO del sitio web, gestión de reseñas, notoriedad y medición.",
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
    "SEO local para Google Maps y las búsquedas de tu zona. Auditoría gratuita del Perfil de Empresa y de las páginas clave de tu sitio público.",
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
      "Trabajamos tu Perfil de Empresa y el SEO de tu web según tus servicios, tu competencia y la zona donde atiendes.",
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
              <LandingServicesMenu currentPath={pagePath} mobileAuditHref="#audit-request" />
              <a className="landing-top-cta inline-flex min-h-11 shrink-0 items-center justify-center rounded-lg bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-blue-950/30 hover:bg-blue-500 focus-visible:ring-2 focus-visible:ring-blue-400" href="#auditoria-seo-local">
                Auditoría gratuita
              </a>
            </div>
          </nav>
        </header>

        <main>
          <section className={`relative isolate overflow-hidden ${styles.hero}`} aria-labelledby="local-seo-hero-title">
            <Image
              className={styles.heroImage}
              src={heroImage}
              alt="Profesional de un negocio local revisando su presencia digital desde el móvil"
              fill
              priority
              placeholder="blur"
              sizes="100vw"
            />
            <div className={styles.heroScrim} aria-hidden="true" />
            <div className="relative z-10 mx-auto flex min-h-[32rem] max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
              <nav className={`flex items-center gap-2 text-sm font-bold ${styles.heroBreadcrumb}`} aria-label="Migas de pan">
                <Link href="/">Inicio</Link>
                <span aria-hidden="true">/</span>
                <Link href="/seo">Agencia SEO</Link>
                <span aria-hidden="true">/</span>
                <span>SEO local</span>
              </nav>

              <div className="my-auto max-w-3xl py-6">
                <h1 id="local-seo-hero-title" className={`max-w-3xl text-4xl font-black leading-[1.04] sm:text-5xl lg:text-[3.45rem] ${styles.heroTitle}`}>
                  Agencia de SEO local para negocios
                </h1>
                <p className={`mt-6 max-w-2xl text-lg font-semibold leading-8 sm:text-xl ${styles.heroIntro}`}>
                  Analizamos cómo buscan tus clientes y trabajamos tu Perfil de Empresa de Google y el SEO de tu web para mejorar tu visibilidad en Google Maps y en las búsquedas de tu zona.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a className="inline-flex min-h-12 items-center justify-center rounded-lg bg-blue-600 px-6 py-3 font-bold text-white shadow-xl shadow-blue-950/30 transition hover:bg-blue-500 focus-visible:ring-2 focus-visible:ring-blue-300" href="#auditoria-seo-local">
                    Solicitar auditoría gratuita
                  </a>
                  <a className={`inline-flex min-h-12 items-center justify-center rounded-lg px-6 py-3 font-bold transition focus-visible:ring-2 focus-visible:ring-white ${styles.heroSecondaryButton}`} href="#incluye">
                    Ver qué incluye
                  </a>
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

          <section className="border-y border-[#dbe3ef] bg-white px-4 py-16 sm:px-6 lg:px-8" aria-labelledby="situations-title">
            <div className="mx-auto max-w-7xl">
              <div className="max-w-2xl">
                <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Situaciones de compra</p>
                <h2 id="situations-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                  ¿Qué está frenando tu visibilidad local?
                </h2>
              </div>
              <div className={styles.situationGrid}>
                {buyingSituations.map((item, index) => (
                  <article className={styles.situationCard} key={item.title}>
                    <div className={styles.situationCardTop}>
                      <span className={styles.situationNumber}>0{index + 1}</span>
                      <span className={styles.situationIcon}>
                        <item.icon className="h-6 w-6" aria-hidden="true" strokeWidth={1.8} />
                      </span>
                    </div>
                    <div className={styles.situationCopy}>
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section id="incluye" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="includes-title">
            <div className="max-w-4xl">
              <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Qué incluye</p>
              <h2 id="includes-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                Un sistema coordinado para que te encuentren y te elijan
              </h2>
              <p className={`mt-4 text-lg leading-8 text-slate-300 ${styles.intro}`}>
                Perfil, web, reputación y datos trabajan juntos. La prioridad depende de dónde esté hoy el principal bloqueo de tu negocio.
              </p>
            </div>
            <div className="mt-12 grid overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_24px_64px_rgba(15,23,42,0.09)] lg:grid-cols-[0.8fr_1.2fr]">
              <figure className={styles.presenceFigure}>
                <Image
                  className={styles.presenceImage}
                  src={localPresenceImage}
                  alt="Profesional revisando la visibilidad de un negocio en mapas y búsquedas locales"
                  fill
                  placeholder="blur"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                />
              </figure>

              <div className={styles.serviceCards}>
                {workItems.map((item, index) => (
                  <article className={styles.serviceCard} key={item.title}>
                    <span className="font-mono text-sm font-black tabular-nums text-blue-600">0{index + 1}</span>
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-black leading-tight text-slate-900">{item.title}</h3>
                      </div>
                      <p className={`mt-3 text-slate-600 ${styles.body}`}>{item.text}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section id="resenas" className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24" aria-labelledby="local-reviews-title">
            <div className="max-w-3xl">
              <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Reseñas</p>
              <h2 id="local-reviews-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                Qué suelen destacar los clientes
              </h2>
              <p className={`mt-4 text-lg leading-8 text-slate-300 ${styles.intro}`}>
                Estas opiniones muestran cómo trabajamos: con claridad, implicación y un acompañamiento cercano durante todo el proyecto.
              </p>
            </div>
            <LocalReviewsCarousel items={localReviewHighlights} />
          </section>

          <section className="bg-[#eef6ff] px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="maps-web-title">
            <div className="mx-auto max-w-7xl">
              <div className="max-w-3xl">
                <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Cómo funciona el posicionamiento local</p>
                <h2 id="maps-web-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                  Tres factores que condicionan los resultados locales
                </h2>
              </div>

              <div className="mt-12 grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
                <figure className={`relative aspect-[8/5] overflow-hidden rounded-lg shadow-[0_24px_64px_rgba(15,23,42,0.14)] ${styles.editorialFigure}`}>
                  <Image
                    className="object-cover"
                    src={factorsImage}
                    alt="Análisis de zonas de servicio y presencia local en distintos dispositivos"
                    fill
                    placeholder="blur"
                    sizes="(min-width: 1024px) 56vw, 100vw"
                  />
                </figure>

                <div className={styles.factorCards}>
                  <article className={styles.factorCard}>
                    <span className="font-mono text-sm font-black tabular-nums text-blue-600">01</span>
                    <div>
                      <h3 className="text-2xl font-black text-slate-900">Relevancia</h3>
                      <p className={`mt-3 text-slate-600 ${styles.body}`}>Información, categorías y páginas que explican con claridad qué ofreces.</p>
                    </div>
                  </article>
                  <article className={styles.factorCard}>
                    <span className="font-mono text-sm font-black tabular-nums text-blue-600">02</span>
                    <div>
                      <h3 className="text-2xl font-black text-slate-900">Distancia</h3>
                      <p className={`mt-3 text-slate-600 ${styles.body}`}>Lectura de cómo cambia la visibilidad según dónde busca el usuario.</p>
                    </div>
                  </article>
                  <article className={styles.factorCard}>
                    <span className="font-mono text-sm font-black tabular-nums text-blue-600">03</span>
                    <div>
                      <h3 className="text-2xl font-black text-slate-900">Prominencia</h3>
                      <p className={`mt-3 text-slate-600 ${styles.body}`}>Reseñas, reputación y referencias que respaldan la confianza en el negocio.</p>
                    </div>
                  </article>
                </div>
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="plan-title">
            <div className="max-w-3xl">
              <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Ejemplo ilustrativo</p>
              <h2 id="plan-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                Cómo organizaríamos el SEO local de un negocio con varias zonas de servicio
              </h2>
              <p className={`mt-4 text-lg leading-8 text-slate-300 ${styles.intro}`}>
                Este ejemplo muestra cómo conectamos las piezas después de revisar la situación real del negocio.
              </p>
            </div>
            <div className={`mt-10 ${styles.planTable}`}>
              <div className={styles.planTableTitle}>
                <h3 className="text-2xl font-black text-slate-900">Plan de trabajo ilustrativo</h3>
              </div>
              <div className={styles.planColumnLabels} role="row">
                <span role="columnheader">Paso</span>
                <span role="columnheader">Área de trabajo</span>
                <span role="columnheader">Qué revisamos</span>
                <span role="columnheader">Para qué sirve</span>
              </div>
              <ol className={styles.planRows}>
                {planRows.map((row, index) => (
                  <li className={styles.planRow} key={row.work}>
                    <span className={styles.planStep}>0{index + 1}</span>
                    <h3 className={styles.planWork}>{row.work}</h3>
                    <div className={styles.planCell}>
                      <span className={styles.planCellLabel}>Qué revisamos</span>
                      <p className={`text-slate-600 ${styles.body}`}>{row.action}</p>
                    </div>
                    <div className={`${styles.planCell} ${styles.planValue}`}>
                      <span className={styles.planCellLabel}>Para qué sirve</span>
                      <p className={`font-bold text-slate-800 ${styles.emphasis}`}>{row.value}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div className="mt-8">
              <a className="inline-flex min-h-12 items-center justify-center rounded-lg bg-blue-600 px-6 py-3 font-bold text-white shadow-xl shadow-blue-950/30 hover:bg-blue-500 focus-visible:ring-2 focus-visible:ring-blue-400" href="#auditoria-seo-local">
                Solicitar auditoría gratuita
              </a>
            </div>
          </section>

          <section id="proceso" className={`px-4 py-16 sm:px-6 lg:px-8 lg:py-24 ${styles.methodSection}`} aria-labelledby="process-title">
            <div className="mx-auto max-w-7xl">
              <div className="max-w-3xl">
                <h2 id="process-title" className={`text-3xl font-black sm:text-4xl ${styles.methodTitle}`}>
                  Nuestro método
                </h2>
              </div>
              <ol className={styles.methodRail}>
                {methodSteps.map((step) => (
                  <li key={step.step}>
                    <span className={styles.methodNumber}>{step.step}</span>
                    <div className={styles.methodCopy}>
                      <h3>{step.title}</h3>
                      <p>{step.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="budget-title">
            <div className="grid overflow-hidden rounded-lg border border-[#dbe3ef] bg-white shadow-[0_24px_64px_rgba(15,23,42,0.1)] lg:grid-cols-[1.05fr_0.95fr]">
              <figure className={`relative min-h-[26rem] lg:min-h-full ${styles.scopeFigure}`}>
                <Image
                  className="object-cover"
                  src={collaborationImage}
                  alt="Dos profesionales revisando juntos el alcance de un proyecto"
                  fill
                  placeholder="blur"
                  sizes="(min-width: 1024px) 52vw, 100vw"
                />
                <figcaption className={styles.scopeImageCaption}>
                  <span>Auditoría inicial</span>
                  <strong>Gratuita</strong>
                </figcaption>
              </figure>

              <div className="px-6 py-8 sm:px-9 sm:py-10 lg:px-10 lg:py-12">
                <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Alcance y presupuesto</p>
                <h2 id="budget-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                  Un alcance claro antes de empezar
                </h2>
                <p className={`mt-5 text-lg leading-8 text-slate-300 ${styles.intro}`}>
                  La auditoría inicial es gratuita. La implementación y la gestión son servicios de pago.
                </p>
                <div className="mt-8 border-y border-[#dbe3ef]">
                  {budgetItems.map((item) => (
                    <article className="grid grid-cols-[2.75rem_1fr] gap-4 border-b border-[#dbe3ef] py-5 last:border-b-0" key={item.title}>
                      <span className="font-mono text-sm font-black tabular-nums text-blue-600">{item.label}</span>
                      <div>
                        <h3 className="text-xl font-black text-slate-900">{item.title}</h3>
                        <p className={`mt-2 text-slate-600 ${styles.body}`}>{item.text}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.workingAgreement} aria-labelledby="trust-title">
              <div>
                <p>Cómo trabajamos contigo</p>
                <h2 id="trust-title">Sabrás qué hacemos y qué queda por decidir</h2>
              </div>
              <div className={styles.agreementItems}>
                {trustItems.map((item) => (
                  <article key={item.title}>
                    <ShieldCheck className="h-6 w-6" aria-hidden="true" strokeWidth={1.8} />
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
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
              <div className={styles.relatedLinks}>
                <Link href="/seo">
                  <div><h3>Agencia SEO</h3><p>Para ampliar la captación orgánica a búsquedas de todo el país.</p></div>
                  <span aria-hidden="true">↗</span>
                </Link>
                <Link href="/diseno-pagina-web-profesional">
                  <div><h3>Diseño web profesional</h3><p>Si necesitas una web que explique tus servicios y las zonas donde trabajas.</p></div>
                  <span aria-hidden="true">↗</span>
                </Link>
                <Link href="/diseno-landing-pages">
                  <div><h3>Landing pages</h3><p>Para dar a cada campaña una página con una oferta clara y un contacto sencillo.</p></div>
                  <span aria-hidden="true">↗</span>
                </Link>
                <Link href="/agencia-marketing-digital/google-ads">
                  <div><h3>Google Ads</h3><p>Para anunciar tus servicios en las zonas que atiendes y complementar la captación orgánica.</p></div>
                  <span aria-hidden="true">↗</span>
                </Link>
                <Link href="/soluciones-inteligencia-artificial-empresas">
                  <div><h3>Automatizaciones con IA</h3><p>Para organizar las consultas que recibes y facilitar su seguimiento comercial.</p></div>
                  <span aria-hidden="true">↗</span>
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
                  <p className={`mt-4 text-slate-300 ${styles.body}`}>{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>

          <section id="auditoria-seo-local" className="border-t border-slate-800 bg-slate-900 px-4 py-16 pb-28 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="audit-title">
            <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.86fr_1.14fr]">
              <div>
                <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Auditoría gratuita</p>
                <h2 id="audit-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                  Descubre qué debe mejorar primero en tu SEO local
                </h2>
                <div className="mt-8 grid gap-3">
                  {[
                    "Revisión inicial del Perfil de Empresa y, si existe web, del conjunto de la web, con análisis detallado de sus páginas clave.",
                    "Análisis de servicios, búsquedas, zona, competencia y señales locales visibles.",
                    "Prioridades del proyecto y próximos pasos recomendados.",
                  ].map((item) => (
                    <p className={`flex gap-3 text-slate-200 ${styles.body}`} key={item}>
                      <CheckIcon />
                      <span>{item}</span>
                    </p>
                  ))}
                </div>
              </div>
              <LocalSeoAuditForm />
            </div>
          </section>
        </main>

        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-800 bg-slate-950/95 p-3 backdrop-blur md:hidden">
          <a className="mx-auto flex min-h-12 max-w-md items-center justify-center rounded-lg bg-blue-600 px-5 py-3 font-black text-white shadow-lg shadow-blue-950/40" href="tel:+34604990651" aria-label="Llamar al 604 990 651">
            Llamar
          </a>
        </div>
      </div>
    </>
  );
}
