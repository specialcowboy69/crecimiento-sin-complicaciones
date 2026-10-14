import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Check } from "lucide-react";
import styles from "./seo-pymes.module.css";
import { LandingServicesMenu } from "../components/LandingServicesMenu";
import { Logo } from "../components/Logo";
import { SeoAuditForm } from "../components/SeoAuditForm";

const situations = [
  { title: "Tu web apenas aparece", text: "Revisamos si Google puede encontrar tus páginas y si responden a lo que buscan tus posibles clientes." },
  { title: "Te encuentran por tu nombre", text: "Trabajamos para que también puedan descubrirte quienes buscan tu servicio y todavía no conocen tu empresa." },
  { title: "Llegan visitas, pero pocas consultas", text: "Comprobamos si estás llegando a las personas adecuadas y si tu página les ayuda a decidir." },
];

const examples = [
  { number: "01", title: "Hacer visible cada servicio", text: "Si una misma página mezcla todo lo que haces, ayudamos a que cada servicio tenga una explicación propia y fácil de encontrar.", example: "Por ejemplo: una asesoría puede explicar por separado su servicio para autónomos y su servicio para empresas." },
  { number: "02", title: "Resolver las dudas antes del contacto", text: "Aclaramos qué incluye tu trabajo y cómo puede contratarte alguien que llega por primera vez.", example: "Por ejemplo: una empresa de reformas puede explicar qué necesita para preparar un presupuesto." },
  { number: "03", title: "Corregir lo que impide aparecer", text: "Detectamos páginas que Google no puede leer o encontrar y planteamos los cambios necesarios.", example: "Por ejemplo: recuperar una página de servicio que ha quedado sin enlaces desde el resto de la web." },
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
  { question: "¿Tiene sentido hacer SEO con un presupuesto pequeño?", answer: "Puede tenerlo si existe demanda para tus servicios y podemos concentrar el trabajo en unas prioridades claras. Revisamos tu punto de partida para proponer un alcance que puedas valorar antes de contratar." },
  { question: "¿Cuánto tarda el SEO para una pyme?", answer: "El SEO necesita tiempo. La evolución depende de tu web, la competencia y los cambios que podamos llevar a cabo. Tras revisar el proyecto podremos hablar de expectativas razonables; no hay un plazo único válido para todos los negocios." },
  { question: "¿Tengo que cambiar toda mi web?", answer: "No necesariamente. Primero revisamos la web actual. Si podemos mejorar las páginas que ya tienes, partimos de ellas. Si encontramos una limitación que requiere más trabajo, te explicamos las opciones antes de plantear un cambio." },
  { question: "¿Necesito publicar artículos todas las semanas?", answer: "No. La frecuencia depende de lo que necesite tu web. Puede ser más útil mejorar una página de servicio que publicar nuevos artículos. Proponemos contenido cuando ayuda a responder una búsqueda o una duda de tus posibles clientes." },
  { question: "¿Qué necesitaréis de mí?", answer: "Conocer tus servicios, a qué clientes atiendes y qué zonas cubres. Si aceptas la propuesta, acordamos los accesos y la información necesarios para ejecutar el trabajo. Tu conocimiento del negocio ayuda a que el contenido sea preciso." },
  { question: "¿Cómo sabré si el trabajo está avanzando?", answer: "Revisamos qué páginas ganan visibilidad y qué búsquedas traen visitas. Cuando el seguimiento está disponible, también comprobamos las consultas recibidas. Compartimos los cambios realizados y las siguientes prioridades." },
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
        name: "SEO para pymes",
        item: "https://www.crecimientosincomplicaciones.com/seo-para-pymes",
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "SEO para pymes",
    serviceType: ["SEO para pymes", "Consultoría SEO para pymes", "SEO local para pymes"],
    provider: {
      "@type": "Organization",
      name: "Crecimiento sin complicaciones",
      url: "https://www.crecimientosincomplicaciones.com",
    },
    areaServed: "ES",
    description:
      "Servicios SEO para pymes con auditoría SEO gratuita, SEO técnico, estrategia de keywords, contenido y posicionamiento local orientado a captar clientes.",
    makesOffer: {
      "@type": "Offer",
      name: "Auditoría SEO gratuita para pymes",
      availability: "https://schema.org/InStock",
      url: "https://www.crecimientosincomplicaciones.com/seo-para-pymes",
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
  title: "SEO para pymes | Agencia SEO para empresas pequeñas",
  description:
    "SEO para pymes que quieren recibir consultas desde Google. Revisamos tu web y te ayudamos a elegir las primeras mejoras. Auditoría gratuita.",
  keywords: [
    "seo para pymes",
    "agencia seo para pymes",
    "servicios seo para pymes",
    "posicionamiento web para pymes",
    "consultoría seo para pymes",
    "seo local para pymes",
  ],
  alternates: {
    canonical: "/seo-para-pymes",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "SEO para pymes que necesitan más clientes",
    description:
      "Un plan de SEO adaptado a lo que necesita tu pequeña empresa. Empieza por saber qué mejorar en tu web con una auditoría gratuita.",
    url: "/seo-para-pymes",
    siteName: "Crecimiento sin complicaciones",
    locale: "es_ES",
    type: "website",
  },
};

export default function SeoForPymesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <div className={`seo-pymes-page landing-light ${styles.page}`}>
        <header className="sticky top-0 z-20 border-b border-slate-800 bg-slate-950/95 backdrop-blur">
          <nav className="mx-auto flex min-h-[72px] max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8" aria-label="Navegación principal">
            <Link className="logo-link text-slate-50" href="/" aria-label="Crecimiento sin complicaciones, inicio">
              <Logo variant="light" />
            </Link>
            <div className="hidden items-center gap-2 text-sm font-semibold text-slate-300 lg:flex">
              <a className="rounded-md px-3 py-2 hover:bg-slate-900 hover:text-white" href="#incluye">Incluye</a>
              <a className="rounded-md px-3 py-2 hover:bg-slate-900 hover:text-white" href="#metodo">Método</a>
              <a className="rounded-md px-3 py-2 hover:bg-slate-900 hover:text-white" href="#seo-local">SEO local</a>
              <a className="rounded-md px-3 py-2 hover:bg-slate-900 hover:text-white" href="#faq">FAQ</a>
            </div>
            <div className="mobile-header-links" aria-label="Enlaces rápidos">
              <a href="#incluye">Incluye</a>
              <a href="#metodo">Método</a>
            </div>
            <div className="flex items-center gap-3">
              <LandingServicesMenu currentPath="/seo-para-pymes" mobileAuditHref="#audit-request" />
              <a className="landing-top-cta inline-flex min-h-11 shrink-0 items-center justify-center rounded-lg bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-blue-950/30 hover:bg-blue-500 focus-visible:ring-2 focus-visible:ring-blue-400" href="#auditoria-pymes">
                <span className="hidden sm:inline">Auditoría gratuita</span>
                <span className="sm:hidden">Auditoría</span>
              </a>
            </div>
          </nav>
        </header>

        <main>
          <section className={styles.hero} aria-labelledby="hero-title"><div className={styles.heroInner}>
            <div className={styles.heroCopy}>
              <nav className={styles.breadcrumb} aria-label="Migas de pan"><Link href="/">Inicio</Link><span aria-hidden="true">/</span><Link href="/seo">SEO</Link><span aria-hidden="true">/</span><span>Pymes</span></nav>
              <p className={styles.eyebrow}>Para pequeñas empresas</p><h1 id="hero-title">SEO para pymes.<br /><span>Haz que encuentren lo que haces.</span></h1>
              <p className={styles.lead}>Tu próximo cliente puede estar buscando en Google. Te ayudamos a preparar tu web para que descubra tu negocio y pueda contactar.</p>
              <a className={styles.primary} href="#auditoria-pymes">Solicitar auditoría SEO gratuita</a>
              <p className={styles.heroFoot}>Empezamos por revisar tu web y explicarte qué conviene mejorar.</p>
            </div>
            <div className={styles.heroVisual}><Image src="/images/home-service-seo.webp" alt="Revisión de búsquedas y estructura de páginas sobre una mesa de trabajo" fill sizes="(max-width: 767px) 100vw, 50vw" preload /><div className={styles.visualNote}><Check aria-hidden="true" size={20} /><span>Un plan que tenga sentido para tu negocio.</span></div></div>
          </div></section>

          <section className={styles.situations} aria-labelledby="situations-title"><div className={styles.container}>
            <div className={styles.centerHeading}><p className={styles.eyebrow}>¿Te resulta familiar?</p><h2 id="situations-title">Tienes una web.<br />Quieres que también traiga oportunidades.</h2></div>
            <div className={styles.situationGrid}>{situations.map((item, index) => <article key={item.title}><span className={styles.index}>0{index + 1}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
          </div></section>

          <section id="incluye" className={styles.includes} aria-labelledby="includes-title"><div className={styles.container}>
            <div className={styles.sectionHead}><div><p className={styles.eyebrow}>Qué hacemos en tu web</p><h2 id="includes-title">Mejoras que puedes entender.</h2></div><p>El trabajo se concreta según lo que encontremos. Estos ejemplos muestran cómo abordamos necesidades habituales de una pyme.</p></div>
            <div className={styles.exampleGrid}>
              <div className={styles.examplePhoto}><Image src="/images/home-growth-collaboration.webp" alt="Dos personas consultan un portátil y un cuaderno" fill sizes="(max-width: 767px) 100vw, 45vw" /><div><span>El negocio guía el trabajo</span><p>¿Qué necesita saber alguien antes de contratarte?</p></div></div>
              {examples.map(item => <article className={styles.example} key={item.number}><span className={styles.index}>{item.number}</span><h3>{item.title}</h3><p>{item.text}</p><p className={styles.exampleNote}>{item.example}</p></article>)}
            </div>
          </div></section>

          <section id="metodo" className={styles.method} aria-labelledby="method-title"><div className={styles.container}>
            <div className={styles.methodIntro}><p className={styles.eyebrow}>Cómo empezamos</p><h2 id="method-title">Decide con una propuesta sobre la mesa.</h2><p>Antes de contratar, necesitas saber qué vamos a hacer y por qué. La auditoría gratuita es el primer paso.</p><Link className={styles.textLink} href="/seo">Conoce nuestro servicio de agencia SEO <ArrowUpRight aria-hidden="true" size={19} /></Link></div>
            <ol className={styles.steps}><li><span>01</span><div><h3>Revisamos tu punto de partida</h3><p>Nos cuentas qué hace tu empresa y revisamos tu web para detectar las primeras oportunidades.</p><small>Recibes una revisión inicial gratuita.</small></div></li><li><span>02</span><div><h3>Acordamos qué abordar primero</h3><p>Te proponemos un alcance concreto según las necesidades de tu web y los recursos del proyecto.</p><small>Decides si la propuesta encaja contigo.</small></div></li><li><span>03</span><div><h3>Trabajamos y revisamos la evolución</h3><p>Tras aceptar la propuesta, aplicamos las mejoras acordadas y ajustamos las prioridades a lo que observamos.</p><small>Sabes qué se ha hecho y qué viene después.</small></div></li></ol>
          </div></section>

          <section id="seo-local" className={styles.local} aria-labelledby="local-title"><div className={styles.container}>
            <div><p className={styles.eyebrow}>El lugar también importa</p><h2 id="local-title">Si tus clientes están cerca, el SEO debe tenerlo en cuenta.</h2><p>Una empresa que atiende en una zona concreta necesita explicar dónde trabaja. El <Link href="/seo/local">SEO local</Link> conecta tu web con las búsquedas de esa zona y con tu Perfil de Empresa de Google.</p></div>
            <div className={styles.cityPanel}><h3>El trabajo, según tu mercado</h3><p>Consulta el enfoque de SEO para empresas que atienden en estas ciudades:</p><div className={styles.cityLinks}>{cityLinks.map(city => <Link href={city.href} key={city.href}>{city.label}<ArrowUpRight aria-hidden="true" size={17} /></Link>)}</div></div>
          </div></section>

          <section className={styles.decisions} aria-labelledby="decisions-title"><div className={styles.container}>
            <div><p className={styles.eyebrow}>Elegir bien el momento</p><h2 id="decisions-title">¿El SEO es tu siguiente paso?</h2><p>Si necesitas empezar a anunciarte, puedes valorar <Link href="/agencia-marketing-digital/google-ads">Google Ads</Link>. Si tu web no permite explicar bien el servicio, puede convenir una mejora de <Link href="/diseno-pagina-web-profesional">diseño web</Link>. La revisión inicial nos ayuda a recomendarte por dónde empezar.</p></div>
            <a className={styles.primary} href="#auditoria-pymes">Quiero mi auditoría gratuita <ArrowUpRight aria-hidden="true" size={20} /></a>
          </div></section>

          <section id="faq" className={styles.faq} aria-labelledby="faq-title"><div className={styles.container}>
            <div className={styles.centerHeading}><p className={styles.eyebrow}>Tus dudas, antes de decidir</p><h2 id="faq-title">Preguntas frecuentes sobre SEO para pymes</h2></div>
            <div className={styles.questions}>{faqs.map(faq => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div>
          </div></section>

          <section id="auditoria-pymes" className={styles.audit} aria-labelledby="final-cta-title"><div className={styles.container}>
            <div className={styles.auditIntro}><p className={styles.eyebrow}>Auditoría gratuita</p><h2 id="final-cta-title">Veamos qué puede mejorar en tu web.</h2><p>Comparte la web de tu empresa. La revisamos y te explicamos qué oportunidades encontramos para que puedas decidir el siguiente paso.</p><div className={styles.auditNote}><Check aria-hidden="true" size={22} /><p>La revisión inicial es gratuita. El trabajo posterior se define en una propuesta que tú decides si aceptar.</p></div></div>
            <SeoAuditForm sourcePage="SEO para pymes" defaultService="SEO para pymes" contactDark={false} />
          </div></section>
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
