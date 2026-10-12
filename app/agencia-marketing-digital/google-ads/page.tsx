import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  LineChart,
  MousePointerClick,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { LandingServicesMenu } from "../../components/LandingServicesMenu";
import { LeadForm } from "../../components/LeadForm";
import { Logo } from "../../components/Logo";
import { SITE_URL } from "../../lib/site";
import styles from "./google-ads.module.css";

const pagePath = "/agencia-marketing-digital/google-ads";
const baseUrl = SITE_URL;

const processSteps = [
  {
    step: "01",
    title: "Auditoría inicial",
    text: "Revisamos cuenta, inversión, campañas, tracking, landing pages y oportunidades rápidas.",
  },
  {
    step: "02",
    title: "Plan de campaña",
    text: "Definimos servicios prioritarios, keywords, estructura, presupuesto y objetivos de conversión.",
  },
  {
    step: "03",
    title: "Lanzamiento o reestructuración",
    text: "Creamos o ajustamos campañas, anuncios, extensiones, audiencias y medición.",
  },
  {
    step: "04",
    title: "Optimización continua",
    text: "Analizamos términos de búsqueda, coste por lead, calidad del tráfico y rendimiento de cada campaña.",
  },
  {
    step: "05",
    title: "Informe accionable",
    text: "Explicamos qué se ha aprendido, qué se cambia y qué conviene probar después.",
  },
];

const audienceProfiles = [
  {
    number: "01",
    title: "Ya inviertes, pero no tienes claridad",
    text: "Necesitas saber qué campañas generan oportunidades y cuáles solo consumen presupuesto.",
  },
  {
    number: "02",
    title: "Quieres empezar con una estructura sólida",
    text: "Buscas lanzar Google Ads con prioridades, medición y una oferta clara desde el principio.",
  },
  {
    number: "03",
    title: "Necesitas dirección especializada externa",
    text: "Tu equipo necesita criterio estratégico y ejecución sin incorporar otro perfil interno.",
  },
  {
    number: "04",
    title: "Recibes tráfico, pero pocos contactos",
    text: "La campaña atrae visitas, aunque la landing o el seguimiento no convierten ese interés en leads.",
  },
];

const relatedLinks = [
  {
    href: "/seo",
    title: "Agencia SEO",
    text: "Para construir captación orgánica mientras Ads acelera aprendizaje.",
  },
  {
    href: "/diseno-pagina-web-profesional",
    title: "Diseño web profesional",
    text: "Cuando la campaña necesita una web más clara para convertir visitas en contactos.",
  },
  {
    href: "/diseno-landing-pages",
    title: "Diseño de landing pages",
    text: "Para mejorar mensajes, CTAs y formularios antes de subir inversión.",
  },
  {
    href: "/agencia-marketing-digital",
    title: "Marketing digital",
    text: "La visión completa: web, SEO, Ads, redes, CRO, analítica e IA conectadas.",
  },
];

const faqs = [
  {
    question: "¿Es lo mismo una agencia SEM que una agencia Google Ads?",
    answer:
      "En la práctica, muchas empresas usan ambos términos para buscar el mismo servicio. SEM describe la captación de pago en buscadores; Google Ads es la plataforma con la que prestamos este servicio. Meta Ads pertenece a publicidad social y se analiza como un canal distinto.",
  },
  {
    question: "¿Cuánto cobra una agencia Google Ads?",
    answer:
      "Depende del tamaño de la cuenta, número de campañas, inversión mensual y nivel de seguimiento necesario. Lo correcto es valorar primero si necesitas una campaña sencilla, una reestructuración o una gestión mensual completa.",
  },
  {
    question: "¿Qué presupuesto mínimo necesito para Google Ads?",
    answer:
      "Depende del sector y del coste por clic. Para servicios competitivos, conviene empezar con un presupuesto que permita recoger datos suficientes sin dispersarse en demasiadas campañas.",
  },
  {
    question: "¿Google Ads funciona mejor que SEO?",
    answer:
      "No compiten exactamente. Google Ads puede generar visibilidad más rápido, mientras que el SEO construye captación orgánica a medio plazo. La combinación suele ser más fuerte cuando cada canal tiene un papel claro.",
  },
  {
    question: "¿Podéis revisar una cuenta que ya está funcionando?",
    answer:
      "Sí. Podemos auditar campañas existentes, revisar estructura, términos de búsqueda, conversiones, anuncios, presupuesto y páginas de destino.",
  },
  {
    question: "¿Trabajáis solo campañas de búsqueda?",
    answer:
      "La prioridad suele ser búsqueda cuando hay intención comercial clara, pero también podemos valorar remarketing, Performance Max u otras campañas si tienen sentido para el negocio.",
  },
  {
    question: "¿También revisáis la landing page?",
    answer:
      "Sí. Una campaña puede estar bien configurada y aun así perder leads por una página poco clara, lenta o sin una propuesta convincente.",
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Inicio",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Agencia de marketing digital",
        item: `${baseUrl}/agencia-marketing-digital`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Agencia Google Ads y SEM",
        item: `${baseUrl}${pagePath}`,
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Agencia Google Ads y SEM para empresas",
    serviceType: [
      "Agencia Google Ads",
      "Gestión Google Ads",
      "Campañas Google Ads",
      "Publicidad en Google",
      "Agencia SEM",
    ],
    provider: {
      "@type": "Organization",
      name: "Crecimiento sin complicaciones",
      url: baseUrl,
    },
    areaServed: "ES",
    url: `${baseUrl}${pagePath}`,
    description:
      "Agencia Google Ads y SEM para empresas que quieren captar leads, medir conversiones y controlar mejor el presupuesto.",
    makesOffer: {
      "@type": "Offer",
      name: "Auditoría gratuita de Google Ads",
      availability: "https://schema.org/InStock",
      url: `${baseUrl}${pagePath}`,
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
  title: "Agencia Google Ads y SEM para empresas",
  description:
    "Agencia Google Ads y SEM para empresas. Creamos, auditamos y optimizamos campañas para captar leads, medir conversiones y controlar mejor el presupuesto.",
  keywords: [
    "agencia google ads",
    "agencia sem",
    "gestión google ads",
    "campañas google ads",
    "publicidad en google",
    "google ads para empresas",
  ],
  alternates: {
    canonical: pagePath,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Agencia Google Ads y SEM para empresas",
    description:
      "Campañas de Google Ads conectadas con búsquedas, landing pages y medición para captar oportunidades comerciales con más control.",
    url: pagePath,
    siteName: "Crecimiento sin complicaciones",
    locale: "es_ES",
    type: "website",
  },
};

export default function GoogleAdsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <div className="google-ads-page landing-light min-h-screen bg-slate-950 text-slate-50">
        <header className="sticky top-0 z-20 border-b border-slate-800 bg-slate-950/95 backdrop-blur">
          <nav
            className="mx-auto flex min-h-[72px] max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8"
            aria-label="Navegación principal"
          >
            <Link className="logo-link text-slate-50" href="/" aria-label="Crecimiento sin complicaciones, inicio">
              <Logo variant="light" />
            </Link>

            <div className="hidden items-center gap-2 text-sm font-semibold text-slate-300 lg:flex">
              <a className="rounded-md px-3 py-2 hover:bg-slate-900 hover:text-white" href="#solucion">
                Solución
              </a>
              <a className="rounded-md px-3 py-2 hover:bg-slate-900 hover:text-white" href="#proceso">
                Método
              </a>
              <a className="rounded-md px-3 py-2 hover:bg-slate-900 hover:text-white" href="#para-quien">
                Para quién
              </a>
              <a className="rounded-md px-3 py-2 hover:bg-slate-900 hover:text-white" href="#faq">
                FAQ
              </a>
            </div>

            <div className="mobile-header-links" aria-label="Enlaces rápidos">
              <a href="#solucion">Solución</a>
              <a href="#proceso">Método</a>
            </div>

            <div className="flex items-center gap-3">
              <LandingServicesMenu currentPath={pagePath} mobileAuditHref="#audit-request" />
              <a
                className="landing-top-cta inline-flex min-h-11 shrink-0 items-center justify-center rounded-lg bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-blue-950/30 hover:bg-blue-500 focus-visible:ring-2 focus-visible:ring-blue-400"
                href="#auditoria-google-ads"
              >
                Solicitar auditoría gratuita
              </a>
            </div>
          </nav>
        </header>

        <main>
          <section
            className={styles.hero}
            aria-labelledby="google-ads-hero-title"
          >
            <Image
              src="/images/google-ads-hero-editorial.webp"
              alt=""
              fill
              sizes="100vw"
              fetchPriority="high"
              className={styles.heroImage}
            />
            <div className={styles.heroContent}>
              <nav className={styles.heroBreadcrumbs} aria-label="Migas de pan">
                <Link href="/">
                  Inicio
                </Link>
                <span aria-hidden="true">/</span>
                <Link href="/agencia-marketing-digital">
                  Marketing digital
                </Link>
                <span aria-hidden="true">/</span>
                <span>Google Ads</span>
              </nav>

              <p className={styles.heroEyebrow}>
                Agencia Google Ads y SEM
              </p>
              <h1
                id="google-ads-hero-title"
                className={styles.heroTitle}
              >
                Agencia Google Ads para convertir búsquedas en oportunidades
              </h1>
              <p className={styles.heroDescription}>
                Conectamos búsqueda, anuncios, landing pages y medición para que cada campaña tenga una función comercial
                clara y puedas decidir con más criterio dónde invertir.
              </p>

              <div className={styles.heroActions}>
                <a
                  className={styles.heroPrimary}
                  href="#auditoria-google-ads"
                >
                  Solicitar auditoría gratuita
                </a>
                <Link
                  className={styles.heroSecondary}
                  href="/agencia-marketing-digital"
                >
                  Ver todos los servicios
                </Link>
              </div>
            </div>
          </section>

          <section id="problema" className={styles.problemSection} aria-labelledby="problem-title">
            <div className={styles.problemGrid}>
              <div className={styles.problemCopy}>
                <p className={styles.sectionEyebrow}>El problema</p>
                <h2 id="problem-title">Invertir en Google sin una estructura clara sale caro</h2>
                <p>
                  El presupuesto se pierde cuando búsqueda, medición y landing no cuentan la misma historia. Localizamos
                  el punto de fuga antes de ampliar la inversión.
                </p>
              </div>

              <ul className={styles.problemSignals}>
                <li className={styles.problemCard}>
                  <Search className={styles.problemCardIcon} size={30} strokeWidth={1.7} aria-hidden="true" />
                  <div>
                    <h3>Búsquedas demasiado amplias</h3>
                    <p>
                      Tu anuncio aparece ante personas que buscan información o un servicio distinto. Sin revisar los
                      términos de búsqueda y excluir consultas irrelevantes, pagas por clics con poca intención de contratar.
                    </p>
                  </div>
                </li>
                <li className={styles.problemCard}>
                  <LineChart className={styles.problemCardIcon} size={30} strokeWidth={1.7} aria-hidden="true" />
                  <div>
                    <h3>Medición incompleta</h3>
                    <p>
                      Ves clics, pero no sabes qué campañas generan llamadas o formularios. Sin conversiones comprobadas,
                      falta información para decidir dónde invertir.
                    </p>
                  </div>
                </li>
                <li className={styles.problemCard}>
                  <MousePointerClick className={styles.problemCardIcon} size={30} strokeWidth={1.7} aria-hidden="true" />
                  <div>
                    <h3>Landing desconectada</h3>
                    <p>
                      El anuncio promete una solución y la página muestra una oferta genérica. Si el mensaje y el siguiente
                      paso no están claros, la visita se pierde antes de contactar.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </section>

          <section
            id="solucion"
            className={styles.solutionSection}
            aria-labelledby="solution-title"
          >
            <div className={styles.solutionContainer}>
              <div className={styles.solutionIntro}>
                <p className={styles.sectionEyebrow}>Solución</p>
                <h2 id="solution-title">La campaña se decide antes y después del clic</h2>
                <p>
                  Conectamos intención, anuncio, página de destino y conversiones para saber qué merece presupuesto y qué
                  conviene ajustar primero.
                </p>
              </div>

              <div className={styles.solutionLayout}>
                <figure className={styles.solutionVisual}>
                  <Image
                    src="/images/google-ads-national-analysis.webp"
                    alt="Una persona revisa gráficos en un monitor"
                    fill
                    sizes="(min-width: 768px) 48vw, 100vw"
                  />
                </figure>

                <div className={styles.solutionDecisions}>
                  <article>
                    <Search size={28} strokeWidth={1.7} aria-hidden="true" />
                    <div>
                      <h3>Elegir dónde competir</h3>
                      <p>
                        Keywords comerciales y campañas por servicio para dirigir el presupuesto a búsquedas relevantes.
                      </p>
                    </div>
                  </article>
                  <article>
                    <MousePointerClick size={28} strokeWidth={1.7} aria-hidden="true" />
                    <div>
                      <h3>Dar continuidad al clic</h3>
                      <p>
                        Anuncio, landing y formulario trabajan sobre la misma oferta y el mismo siguiente paso.
                      </p>
                    </div>
                  </article>
                  <article>
                    <SlidersHorizontal size={36} strokeWidth={1.5} aria-hidden="true" />
                    <div>
                      <h3>Mover inversión con criterio</h3>
                      <p>
                        Conversiones comprobadas, términos de búsqueda y calidad del lead para decidir qué ajustar.
                      </p>
                    </div>
                  </article>
                </div>
              </div>
            </div>
          </section>

          <section
            id="proceso"
            className={styles.processSection}
            aria-labelledby="process-title"
          >
            <div className={styles.processContainer}>
              <div className={styles.processIntro}>
                <p className={styles.sectionEyebrow}>Método</p>
                <h2 id="process-title">
                  Cómo trabajamos tus campañas de Google Ads
                </h2>
              </div>

              <ol className={styles.processSteps}>
                {processSteps.map((step) => (
                  <li className={styles.processStep} key={step.step}>
                    <span className={styles.processStepNumber} aria-hidden="true">{step.step}</span>
                    <div className={styles.processStepContent}>
                      <h3>{step.title}</h3>
                      <p>{step.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <section
            id="para-quien"
            className={styles.audienceSection}
            aria-labelledby="audience-title"
          >
            <div className={styles.audienceGrid}>
              <div className={styles.audiencePhoto}>
                <Image
                  src="/images/google-ads-national-audience.webp"
                  alt="Dos profesionales conversan frente a un portátil y toman notas"
                  width={1536}
                  height={1024}
                  sizes="(min-width: 1024px) 46vw, 100vw"
                />
              </div>

              <div className={styles.audienceContent}>
                <p className={styles.sectionEyebrow}>Para quién es</p>
                <h2 id="audience-title">Para empresas que quieren leads, no solo clics</h2>
                <p className={styles.audienceIntro}>
                  Encaja en empresas de servicios, pymes, negocios locales, startups y equipos B2B que necesitan
                  convertir búsquedas con intención en conversaciones comerciales.
                </p>

                <ol className={styles.audienceList}>
                  {audienceProfiles.map((profile) => (
                    <li key={profile.number}>
                      <span>{profile.number}</span>
                      <div>
                        <h3>{profile.title}</h3>
                        <p>{profile.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </section>

          <section
            className="border-y border-slate-800 bg-slate-900 px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
            aria-labelledby="alicante-title"
          >
            <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
              <div>
                <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Google Ads local</p>
                <h2 id="alicante-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                  Campañas orientadas a mercados concretos
                </h2>
              </div>
              <Link
                className="group rounded-lg bg-slate-950 p-6 ring-1 ring-slate-800 hover:bg-white/5"
                href="/agencia-marketing-digital/google-ads/alicante"
              >
                <h3 className="text-xl font-black text-slate-900">Agencia SEM para empresas de Alicante</h3>
                <p className="mt-3 leading-7 text-slate-300">
                  Estrategia y gestión de Google Ads adaptadas a búsquedas por servicio, ciudad y provincia.
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-blue-300">
                  Ver Google Ads en Alicante
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Link>
            </div>
          </section>

          <section
            className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
            aria-labelledby="difference-title"
          >
            <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.86fr_1.14fr]">
              <div>
                <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">Diferenciación</p>
                <h2 id="difference-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                  Google Ads funciona mejor cuando no trabaja solo
                </h2>
                <p className="mt-5 text-lg leading-8 text-slate-300">
                  La diferencia está en conectar las campañas con el resto del sistema: SEO, diseño web, landing pages,
                  formularios, analítica y automatizaciones. Si la landing no explica bien la oferta o no se mide
                  correctamente, la campaña pierde fuerza. Por eso no miramos solo el panel de Google Ads: revisamos el
                  recorrido completo hasta el lead.
                </p>
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                {relatedLinks.map((item) => (
                  <Link
                    className="group rounded-lg bg-slate-950 p-6 ring-1 ring-slate-800 hover:bg-white/5"
                    href={item.href}
                    key={item.href}
                  >
                    <LineChart className="h-7 w-7 text-blue-300" aria-hidden="true" strokeWidth={1.8} />
                    <h3 className="!mt-7 text-xl font-black text-slate-900">{item.title}</h3>
                    <p className="mt-3 text-sm leading-[1.65] text-slate-300">{item.text}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-blue-300">
                      Ver página
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section
            className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
            aria-labelledby="middle-cta-title"
          >
            <div className="rounded-lg bg-blue-600 p-8 text-white shadow-2xl shadow-blue-950/30 lg:grid lg:grid-cols-[1fr_auto] lg:items-center lg:gap-8">
              <div>
                <h2 id="middle-cta-title" className="text-3xl font-black text-white sm:text-4xl">
                  ¿Quieres saber si tus campañas pueden rendir mejor?
                </h2>
                <p className="mt-4 max-w-3xl text-lg leading-8 text-blue-50">
                  Podemos revisar tu situación actual y decirte qué ajustaríamos primero: campañas, tracking, anuncios,
                  landing page o presupuesto.
                </p>
              </div>
              <a
                className="mt-6 inline-flex min-h-12 items-center justify-center rounded-lg bg-white px-6 py-3 font-black text-blue-700 hover:bg-blue-50 lg:mt-0"
                href="#auditoria-google-ads"
              >
                Solicitar auditoría gratuita
              </a>
            </div>
          </section>

          <section
            id="faq"
            className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
            aria-labelledby="faq-title"
          >
            <div className="max-w-3xl">
              <p className="mb-3 text-sm font-black uppercase tracking-normal text-blue-400">FAQ</p>
              <h2 id="faq-title" className="text-3xl font-black text-slate-900 sm:text-4xl">
                Preguntas frecuentes sobre Google Ads
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

          <LeadForm
            id="auditoria-google-ads"
            sourcePage="Agencia Google Ads"
            interestedService="Google Ads"
            title="Revisemos tus campañas antes de invertir más"
            description="Analizamos estructura, keywords, anuncios, conversiones y landing page para detectar dónde se está perdiendo presupuesto y qué conviene ajustar primero."
            points={["Cuenta y tracking", "Calidad de leads", "Plan de optimización"]}
            buttonLabel="Solicitar auditoría gratuita"
          />
        </main>

        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-800 bg-slate-950/95 p-3 backdrop-blur md:hidden">
          <a
            className="mx-auto flex min-h-12 max-w-md items-center justify-center rounded-lg bg-blue-600 px-5 py-3 font-black text-white shadow-lg shadow-blue-950/40"
            href="tel:+34604990651"
            aria-label="Llamar al 604 990 651"
          >
            Llamar
          </a>
        </div>
      </div>
    </>
  );
}
