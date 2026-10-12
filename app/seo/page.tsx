import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  ClipboardList,
  FileText,
  GitBranch,
  MapPin,
  Search,
  Settings2,
  Target,
  Users,
} from "lucide-react";
import { LandingServicesMenu } from "../components/LandingServicesMenu";
import { Logo } from "../components/Logo";
import { SeoAuditForm } from "../components/SeoAuditForm";
import styles from "./seo.module.css";

const systemStages = [
  {
    title: "SEO técnico",
    text: "Revisamos rastreo, indexación, velocidad y estructura para que Google pueda entender tus páginas clave.",
    image: "/images/blog/como-lanzar-una-web-nueva-sin-comprometer-seo/cover.webp",
    alt: "Portátil con una página web abierta y bocetos de su estructura sobre la mesa",
    sizes: "(min-width: 1280px) 720px, (min-width: 768px) 58vw, 100vw",
  },
  {
    title: "Arquitectura SEO",
    text: "Ordenamos servicios, temas y enlaces internos para que cada página ayude a avanzar hacia una decisión.",
    image: "/images/home-service-seo.webp",
    alt: "Dos personas organizan páginas y enlaces en un mapa de sitio",
    sizes: "(min-width: 1280px) 500px, (min-width: 768px) 41vw, 100vw",
  },
  {
    title: "Contenido con intención",
    text: "Priorizamos búsquedas de servicios, problemas y comparativas que muestran una necesidad real.",
    image: "/images/blog/como-ampliar-tematica-web-sin-perder-foco-seo/cover.webp",
    alt: "Mapa visual de temas conectados sobre una mesa de trabajo",
    sizes: "(min-width: 1280px) 500px, (min-width: 768px) 41vw, 100vw",
  },
  {
    title: "Medición",
    text: "Relacionamos visibilidad, formularios y llamadas para decidir qué mejorar a continuación.",
    image: "/images/home-growth-collaboration.webp",
    alt: "Dos profesionales revisan información en un portátil",
    sizes: "(min-width: 1280px) 505px, (min-width: 768px) 40vw, 100vw",
  },
];

const serviceItems = [
  {
    icon: ClipboardList,
    title: "Auditoría y prioridades",
    text: "Un diagnóstico inicial con acciones ordenadas por impacto y esfuerzo.",
  },
  {
    icon: Search,
    title: "Búsquedas con intención",
    text: "Keyword research y un mapa de búsquedas conectado con lo que vende tu empresa.",
  },
  {
    icon: Target,
    title: "Páginas que ayudan a decidir",
    text: "Optimización de tus páginas de servicio para convertir visitas en contactos.",
  },
  {
    icon: GitBranch,
    title: "Contenido conectado",
    text: "Clusters y enlaces internos que llevan del contenido útil a las páginas de decisión.",
  },
  {
    icon: MapPin,
    title: "SEO para tu mercado local",
    text: "Búsquedas y páginas locales cuando tu empresa vende en una zona concreta.",
  },
  {
    icon: BarChart3,
    title: "Seguimiento y mejora",
    text: "Tracking, informes y prioridades mensuales para pymes y equipos internos.",
  },
];

const process = [
  {
    step: "01",
    icon: Search,
    title: "Auditoría inicial",
    text: "Revisamos indexación, arquitectura, contenido y velocidad para localizar qué frena la captación.",
    output: "Diagnóstico de tu web",
  },
  {
    step: "02",
    icon: ClipboardList,
    title: "Mapa de oportunidades",
    text: "Ordenamos mejoras técnicas, páginas comerciales y temas de contenido por impacto y esfuerzo.",
    output: "Hoja de ruta priorizada",
  },
  {
    step: "03",
    icon: Settings2,
    title: "Correcciones técnicas y arquitectura",
    text: "Corregimos obstáculos de rastreo, estructura de URLs, enlazado interno y páginas que compiten entre sí.",
    output: "Una base técnica ordenada",
  },
  {
    step: "04",
    icon: FileText,
    title: "Contenido y enlazado interno",
    text: "Creamos o mejoramos páginas que responden a búsquedas reales y facilitan el contacto comercial.",
    output: "Páginas conectadas con la demanda",
  },
  {
    step: "05",
    icon: BarChart3,
    title: "Medición y mejora continua",
    text: "Revisamos Search Console, analítica y leads para decidir qué mantener, corregir o ampliar.",
    output: "Nuevas prioridades de trabajo",
  },
];

const audiences = [
  {
    icon: Search,
    label: "Tienes páginas sin tracción",
    text: "Tu web no aparece para las búsquedas que importan al negocio. Revisamos cómo la encuentra Google y qué responde cada página.",
    focus: "Indexación, intención y páginas clave",
  },
  {
    icon: Target,
    label: "Tienes tráfico, pero no llegan contactos",
    text: "Las visitas orgánicas no se convierten en solicitudes de presupuesto. Revisamos el recorrido desde la búsqueda hasta el formulario.",
    focus: "Mensaje y conversión",
  },
  {
    icon: GitBranch,
    label: "Dependes demasiado de Ads",
    text: "Quieres desarrollar la captación orgánica junto a tus campañas. Priorizamos las búsquedas y el contenido que encajan con tu oferta.",
    focus: "Demanda y contenido",
  },
  {
    icon: Users,
    label: "Tu equipo necesita apoyo SEO",
    text: "Marketing interno necesita ayuda con técnica, contenidos y medición. Aportamos especialización y prioridades para avanzar juntos.",
    focus: "Consultoría y ejecución",
  },
];

const relatedSeoLinks = [
  {
    href: "/seo/local",
    icon: MapPin,
    category: "Captación en tu zona",
    title: "SEO local para negocios",
    text: "Perfil de Empresa de Google, web y reseñas auténticas coordinados para que te encuentren y contacten en tu zona.",
    action: "Explorar SEO local",
  },
  {
    href: "/seo-para-pymes",
    icon: ClipboardList,
    category: "Prioridades de negocio",
    title: "SEO para pymes",
    text: "Un enfoque adaptado a empresas pequeñas que necesitan decidir dónde invertir su esfuerzo en posicionamiento y captación.",
    action: "Explorar SEO para pymes",
  },
  {
    href: "/agencia-marketing-digital/seo-tecnico-arquitectura-entidades",
    icon: Settings2,
    category: "Base técnica y estructura",
    title: "SEO técnico y arquitectura",
    text: "Rastreo, indexación, entidades y arquitectura de contenidos para ordenar el sitio y facilitar que Google lo entienda.",
    action: "Explorar SEO técnico",
  },
];

const cityLinks = [
  { href: "/seo/madrid", label: "SEO en Madrid" },
  { href: "/seo/barcelona", label: "SEO en Barcelona" },
  { href: "/seo/valencia", label: "SEO en Valencia" },
  { href: "/seo/sevilla", label: "SEO en Sevilla" },
  { href: "/seo/alicante", label: "SEO en Alicante" },
  { href: "/seo/malaga", label: "SEO en Málaga" },
];

const faqs = [
  {
    question: "¿Cuánto tarda el SEO en dar resultados?",
    answer:
      "Depende de la autoridad del dominio, competencia, estado técnico y velocidad de implementación. Lo habitual es ver señales iniciales en 6-10 semanas y consolidar resultados entre 3 y 6 meses.",
  },
  {
    question: "¿Qué incluye una auditoría SEO?",
    answer:
      "Incluye revisión técnica, indexación, arquitectura, contenidos, intención de búsqueda, oportunidades de keywords, medición y una hoja de ruta priorizada para mejorar captación.",
  },
  {
    question: "¿Trabajáis SEO local?",
    answer:
      "Sí. Cuando el negocio vende por zona, trabajamos páginas locales, búsquedas por ciudad, enlazado interno y señales de confianza sin afirmar presencia física donde no exista.",
  },
  {
    question: "¿Es mejor SEO o Google Ads?",
    answer:
      "No siempre compiten. Google Ads puede acelerar aprendizaje y captación inmediata; el SEO construye visibilidad orgánica más estable. La auditoría ayuda a decidir qué canal priorizar según tu situación.",
  },
  {
    question: "¿Puedo contratar solo una auditoría?",
    answer:
      "Sí. Podemos entregar una auditoría SEO independiente con diagnóstico, prioridades y hoja de ruta aunque luego la implementación la haga tu equipo.",
  },
  {
    question: "¿Qué diferencia hay entre SEO técnico y contenido SEO?",
    answer:
      "El SEO técnico facilita que Google rastree, entienda e indexe la web. El contenido SEO responde a búsquedas reales y convierte esa visibilidad en visitas cualificadas y oportunidades comerciales.",
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
        item: "https://www.crecimientosincomplicaciones.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Agencia SEO",
        item: "https://www.crecimientosincomplicaciones.com/seo",
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Agencia SEO para empresas",
    serviceType: ["Search Engine Optimization", "Consultoría SEO", "SEO técnico", "SEO local"],
    provider: {
      "@type": "Organization",
      name: "Crecimiento sin complicaciones",
      url: "https://www.crecimientosincomplicaciones.com",
    },
    areaServed: "ES",
    description:
      "Agencia SEO para pymes y empresas con auditoría SEO, consultoría SEO, SEO técnico, arquitectura de contenidos y posicionamiento web orientado a leads.",
    makesOffer: {
      "@type": "Offer",
      name: "Auditoría SEO gratuita",
      availability: "https://schema.org/InStock",
      url: "https://www.crecimientosincomplicaciones.com/seo",
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
  title: "Agencia SEO para empresas",
  description:
    "Agencia SEO para pymes y empresas. Auditoría SEO, estrategia SEO, SEO técnico y posicionamiento web para captar más clientes desde Google.",
  keywords: [
    "agencia seo",
    "agencia seo para empresas",
    "seo para pymes",
    "servicios seo",
    "consultoría seo",
    "seo técnico",
    "posicionamiento web para empresas",
  ],
  alternates: {
    canonical: "/seo",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Agencia SEO para empresas",
    description:
      "Auditoría SEO, arquitectura web, contenidos y medición para captar tráfico cualificado desde Google.",
    url: "/seo",
    siteName: "Crecimiento sin complicaciones",
    locale: "es_ES",
    type: "website",
  },
};

function CheckIcon() {
  return <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-blue-400" aria-hidden="true" strokeWidth={2} />;
}

export default function SeoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <div className="seo-page landing-light min-h-screen bg-slate-950 text-slate-50">
        <header className="sticky top-0 z-20 border-b border-slate-800 bg-slate-950/95 backdrop-blur">
          <nav className="mx-auto flex min-h-[72px] max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8" aria-label="Navegación principal">
            <Link className="logo-link text-slate-50" href="/" aria-label="Crecimiento sin complicaciones, inicio">
              <Logo variant="light" />
            </Link>
            <div className="hidden items-center gap-2 text-sm font-semibold text-slate-300 lg:flex">
              <a className="rounded-md px-3 py-2 hover:bg-slate-900 hover:text-white" href="#servicio">Servicio</a>
              <a className="rounded-md px-3 py-2 hover:bg-slate-900 hover:text-white" href="#proceso">Proceso</a>
              <a className="rounded-md px-3 py-2 hover:bg-slate-900 hover:text-white" href="#seo-local">SEO local</a>
              <a className="rounded-md px-3 py-2 hover:bg-slate-900 hover:text-white" href="#faq">FAQ</a>
            </div>
            <div className="mobile-header-links" aria-label="Enlaces rápidos">
              <a href="#servicio">Servicio</a>
              <a href="#proceso">Proceso</a>
            </div>
            <div className="flex items-center gap-3">
              <LandingServicesMenu currentPath="/seo" mobileAuditHref="#audit-request" />
              <a className="landing-top-cta inline-flex min-h-11 shrink-0 items-center justify-center rounded-lg bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-blue-950/30 hover:bg-blue-500 focus-visible:ring-2 focus-visible:ring-blue-400" href="#auditoria-seo">
                <span className="hidden sm:inline">Auditoría gratuita</span>
                <span className="sm:hidden">Auditoría</span>
              </a>
            </div>
          </nav>
        </header>

        <main>
          <section className={styles.hero} aria-labelledby="seo-hero-title">
            <Image
              src="/images/seo-hero-editorial.webp"
              alt=""
              fill
              sizes="100vw"
              fetchPriority="high"
              className={styles.heroImage}
            />
            <div className={styles.heroContent}>
              <nav className={styles.heroBreadcrumbs} aria-label="Migas de pan">
                <Link href="/">Inicio</Link>
                <span aria-hidden="true">/</span>
                <span>SEO</span>
              </nav>
              <p className={styles.heroEyebrow}>Agencia SEO para empresas</p>
              <h1 id="seo-hero-title" className={styles.heroTitle}>
                Agencia SEO para empresas que quieren captar más clientes desde Google
              </h1>
              <p className={styles.heroDescription}>
                Auditamos tu web, detectamos qué está frenando tu posicionamiento y construimos una hoja de ruta SEO
                clara: técnica, contenidos, arquitectura e intención de búsqueda conectadas con negocio.
              </p>
              <div className={styles.heroActions}>
                <a className={styles.heroPrimary} href="#auditoria-seo">
                  Solicitar auditoría SEO gratuita
                </a>
                <a className={styles.heroSecondary} href="#proceso">
                  Ver cómo trabajamos el SEO
                </a>
              </div>
            </div>
          </section>

          <section className={styles.diagnosis} aria-labelledby="problem-title">
            <div className={styles.sectionInner}>
              <div className={styles.diagnosisIntro}>
                <p className={styles.eyebrow}>El diagnóstico</p>
                <h2 id="problem-title">Tener tráfico no significa tener oportunidades</h2>
                <p>
                  Revisamos el recorrido desde la búsqueda hasta el contacto para encontrar dónde se pierde una oportunidad.
                </p>
              </div>
              <ol className={styles.diagnosisFlow} aria-label="Puntos donde se pierde la oportunidad comercial">
                <li>
                  <h3>¿Te encuentran las personas adecuadas?</h3>
                  <p>Separamos búsquedas informativas de consultas con intención de contratar.</p>
                </li>
                <li>
                  <h3>¿La web les ayuda a decidir?</h3>
                  <p>Ordenamos páginas, enlaces y mensajes para evitar canibalizaciones y callejones sin salida.</p>
                </li>
                <li>
                  <h3>¿Sabes qué acaba en contacto?</h3>
                  <p>Conectamos visibilidad y posiciones con formularios, llamadas y oportunidades reales.</p>
                </li>
              </ol>
            </div>
          </section>

          <section id="servicio" className={styles.systemSection} aria-labelledby="solution-title">
            <div className={styles.sectionInner}>
              <div className={styles.systemIntro}>
                <p className={styles.eyebrow}>El sistema</p>
                <h2 id="solution-title">Cuatro piezas que trabajan juntas</h2>
                <p>El posicionamiento mejora cuando técnica, estructura, contenido y medición responden a la misma intención comercial.</p>
              </div>
              <div className={styles.systemGrid}>
                {systemStages.map((stage) => (
                  <article className={styles.systemCard} key={stage.title}>
                    <div className={styles.systemVisual}>
                      <Image
                        src={stage.image}
                        alt={stage.alt}
                        fill
                        sizes={stage.sizes}
                      />
                    </div>
                    <div className={styles.systemCopy}>
                      <h3>{stage.title}</h3>
                      <p>{stage.text}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className={styles.includesSection} aria-labelledby="includes-title">
            <div className={`${styles.sectionInner} ${styles.includesLayout}`}>
              <div className={styles.includesIntro}>
                <p className={styles.eyebrow}>Qué incluye</p>
                <h2 id="includes-title">
                  Qué hacemos como agencia SEO
                </h2>
                <p className={styles.includesDescription}>
                  Combinamos servicios SEO, consultoría SEO y ejecución técnica para que el plan avance sin convertirse
                  en un informe que nadie implementa.
                </p>
                <Link className={styles.includesLink} href="/agencia-marketing-digital/seo-tecnico-arquitectura-entidades">
                  <span>Ver SEO técnico y arquitectura</span>
                  <ArrowUpRight aria-hidden="true" strokeWidth={1.8} />
                </Link>
              </div>
              <ul className={styles.includesList}>
                {serviceItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li className={styles.includesCard} key={item.title}>
                      <span className={styles.includesIcon}>
                        <Icon aria-hidden="true" strokeWidth={1.8} />
                      </span>
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>

          <section id="proceso" className={styles.processSection} aria-labelledby="process-title">
            <div className={`${styles.sectionInner} ${styles.processLayout}`}>
              <div className={styles.processIntro}>
                <p className={styles.eyebrow}>Proceso</p>
                <h2 id="process-title">Del diagnóstico a la siguiente decisión</h2>
                <p>Cada etapa deja un resultado que permite avanzar con criterio, no solo una lista de tareas completadas.</p>
              </div>
              <ol className={styles.processGrid}>
                {process.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <li className={styles.processCard} key={step.step}>
                      {index === 0 && (
                        <div className={styles.processVisual}>
                          <Image
                            src="/images/seo-local-collaboration-v2.webp"
                            alt="Dos profesionales revisan una tablet y documentos en una mesa de trabajo"
                            fill
                            sizes="(min-width: 1280px) 340px, (min-width: 1024px) 27vw, (min-width: 768px) 42vw, 100vw"
                          />
                        </div>
                      )}
                      <div className={styles.processCopy}>
                        <div className={styles.processCardTop}>
                          <span className={styles.processNumber} aria-hidden="true">{step.step}</span>
                          <Icon aria-hidden="true" strokeWidth={1.8} />
                        </div>
                        <h3>{step.title}</h3>
                        <p>{step.text}</p>
                        <p className={styles.processOutput}>
                          <CheckCircle2 aria-hidden="true" strokeWidth={1.8} />
                          <span>{step.output}</span>
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          </section>

          <section className={styles.audienceSection} aria-labelledby="audience-title">
            <div className={styles.sectionInner}>
              <div className={styles.audienceIntro}>
                <p className={styles.eyebrow}>Para quién es</p>
                <h2 id="audience-title">Distintos puntos de partida. Un mismo criterio comercial.</h2>
                <p className={styles.audienceDescription}>El plan se adapta a lo que necesita tu empresa ahora: visibilidad, contactos o apoyo para tu equipo.</p>
              </div>
              <div className={styles.audienceRoutes}>
                {audiences.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <article className={styles.audienceCard} key={item.label}>
                      {index === 0 && (
                        <div className={styles.audienceVisual}>
                          <Image
                            src="/images/google-ads-national-audience.webp"
                            alt="Dos profesionales revisan un portátil y toman notas sobre su proyecto"
                            fill
                            sizes="(min-width: 1280px) 530px, (min-width: 768px) 42vw, 100vw"
                          />
                        </div>
                      )}
                      <div className={styles.audienceCopy}>
                        <Icon className={styles.audienceIcon} aria-hidden="true" strokeWidth={1.8} />
                        <h3>{item.label}</h3>
                        <p>{item.text}</p>
                        <p className={styles.audienceFocus}>{item.focus}</p>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>

          <section className={styles.relatedSection} aria-labelledby="related-seo-title">
            <div className={styles.sectionInner}>
              <div className={styles.relatedIntro}>
                <p className={styles.eyebrow}>Recursos SEO</p>
                <h2 id="related-seo-title">Profundiza en el SEO que necesita tu empresa</h2>
                <p className={styles.relatedDescription}>Consulta el alcance de cada especialidad y encuentra el enfoque que encaja con tu mercado y tu web.</p>
              </div>
              <div className={styles.relatedLinks}>
                {relatedSeoLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link className={styles.relatedCard} href={item.href} key={item.href}>
                      <div className={styles.relatedCardTop}>
                        <Icon aria-hidden="true" strokeWidth={1.8} />
                        <span>{item.category}</span>
                      </div>
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                      <span className={styles.relatedAction}>
                        {item.action}
                        <ArrowUpRight aria-hidden="true" strokeWidth={1.8} />
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>

          <section id="seo-local" className={styles.localSection} aria-labelledby="local-title">
            <div className={`${styles.sectionInner} ${styles.localLayout}`}>
              <div>
                <p className={styles.eyebrow}>SEO local</p>
                <h2 id="local-title">
                  También trabajamos SEO local por ciudad
                </h2>
                <p className={styles.localDescription}>
                  Si tu negocio vende en una zona concreta, podemos trabajar páginas locales, búsquedas por ciudad y
                  señales de confianza para captar clientes en mercados como Madrid, Barcelona, Valencia, Sevilla,
                  Alicante o Málaga.
                </p>
              </div>
              <div className={styles.cityLinks}>
                {cityLinks.map((city) => (
                  <Link href={city.href} key={city.href}>
                    <MapPin className={styles.cityIcon} aria-hidden="true" strokeWidth={1.8} />
                    <span>{city.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section id="faq" className={styles.faqSection} aria-labelledby="faq-title">
            <div className={`${styles.sectionInner} ${styles.faqInner}`}>
              <div className={styles.faqIntro}>
                <p className={styles.eyebrow}>FAQ</p>
                <h2 id="faq-title">Preguntas frecuentes sobre SEO para empresas</h2>
              </div>
              <div className={styles.faqList}>
                {faqs.map((faq) => (
                  <details key={faq.question}>
                    <summary>{faq.question}</summary>
                    <p>{faq.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          <section id="auditoria-seo" className={styles.auditSection} aria-labelledby="cta-title">
            <div className={`${styles.sectionInner} ${styles.auditLayout}`}>
              <div>
                <p className={styles.eyebrow}>Auditoría gratuita</p>
                <h2 id="cta-title">
                  Empieza con una auditoría SEO clara
                </h2>
                <p className={styles.auditDescription}>
                  Revisamos tu web, detectamos oportunidades reales y te damos una hoja de ruta priorizada para mejorar
                  visibilidad, captación y conversión.
                </p>
                <div className={styles.auditPoints}>
                  {["Revisión de indexación y SEO técnico", "Mapa de keywords con intención comercial", "Prioridades para la siguiente fase de trabajo"].map((item) => (
                    <p key={item}>
                      <CheckIcon />
                      <span>{item}</span>
                    </p>
                  ))}
                </div>
              </div>
              <SeoAuditForm contactDark={false} />
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
