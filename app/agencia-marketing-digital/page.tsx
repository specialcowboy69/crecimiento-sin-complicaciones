import { ORGANIZATION_ID, freeAuditJsonLd } from "../lib/structuredData";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import styles from "./marketing-hub.module.css";
import { LandingServicesMenu } from "../components/LandingServicesMenu";
import { LeadForm } from "../components/LeadForm";
import { Logo } from "../components/Logo";
import { SITE_URL } from "../lib/site";

const baseUrl = SITE_URL;

const services = [
  { title: "SEO", text: "Trabajamos tu web para que te encuentren al buscar los servicios que ofreces.", href: "/seo" },
  { title: "SEO local y Google Maps", text: "Mejoramos tu presencia en las búsquedas de quienes necesitan un negocio en tu zona.", href: "/seo/local" },
  { title: "Google Ads y SEM", text: "Mostramos tus anuncios a posibles clientes y revisamos qué consultas generan.", href: "/agencia-marketing-digital/google-ads" },
  { title: "Diseño web profesional", text: "Creamos una web que explique tu negocio y facilite pedir información.", href: "/diseno-pagina-web-profesional" },
  { title: "Diseño de landing pages", text: "Damos a cada campaña una página centrada en la oferta que anuncia.", href: "/diseno-landing-pages" },
  { title: "Redes sociales", text: "Preparamos contenido que muestre lo que haces y mantenga tu negocio presente.", href: "/gestion-redes-sociales-empresas" },
  { title: "IA para empresas", text: "Automatizamos tareas repetitivas para que puedas dedicar más tiempo a tus clientes.", href: "/soluciones-inteligencia-artificial-empresas" },
];

const serviceGroups = [
  { number: "01", title: "Que te encuentren", intro: "Para llegar a personas que ya buscan lo que vendes.", image: "home-service-seo.webp", alt: "Dos personas organizan páginas y búsquedas sobre una mesa de trabajo", services: services.slice(0, 3) },
  { number: "02", title: "Que entiendan tu oferta", intro: "Para que visitar tu web sea el primer paso hacia una consulta.", image: "home-stage-explain.webp", alt: "Ilustración de la estructura de una página web con un bloque destacado", services: services.slice(3, 5) },
  { number: "03", title: "Que el trabajo avance", intro: "Para cuidar tu presencia y reducir tareas que te quitan tiempo.", image: "home-service-ai-automation.webp", alt: "Ilustración de un flujo de contacto y seguimiento junto a un portátil", services: services.slice(5) },
];

const faqs = [
  { question: "¿Qué hace una agencia de marketing digital?", answer: "Te ayuda a dar a conocer tu negocio y a convertir el interés en consultas. Revisamos cómo llegan tus posibles clientes, qué encuentran en tu web y qué necesitan para contactar. A partir de ahí proponemos el trabajo adecuado." },
  { question: "¿Puedo contratar un solo servicio?", answer: "Sí. Podemos trabajar en un servicio concreto. Si detectamos que otra parte de tu web o de tu captación necesita atención, te explicamos por qué para que puedas decidir." },
  { question: "¿Por dónde conviene empezar?", answer: "Depende de lo que quieras conseguir y del estado de tu negocio en internet. Una web que no explica bien el servicio necesita un trabajo distinto al de una empresa que quiere llegar a más personas. La auditoría gratuita ayuda a elegir la prioridad." },
  { question: "¿Trabajáis con empresas pequeñas?", answer: "Sí. Adaptamos el alcance a las necesidades y recursos de cada proyecto. Antes de empezar acordamos qué vamos a hacer y qué información necesitamos de tu negocio." },
  { question: "¿Qué recibiré con la auditoría gratuita?", answer: "Una revisión inicial de tu presencia digital, con los problemas y oportunidades que detectemos. Te explicamos qué recomendamos abordar primero y los siguientes pasos de una posible colaboración." },
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
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${baseUrl}/agencia-marketing-digital#service`,
    url: `${baseUrl}/agencia-marketing-digital`,
    name: "Agencia de marketing digital para empresas",
    serviceType: [
      "Marketing digital",
      "Search Engine Optimization",
      "Diseño web",
      "Google Ads",
      "Social media marketing",
      "Conversion Rate Optimization",
      "Automatización con IA",
    ],
    provider: { "@id": ORGANIZATION_ID },
    areaServed: "ES",
    description:
      "Servicios de marketing digital para ayudar a las empresas a llegar a posibles clientes y facilitar el contacto.",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Servicios de marketing digital",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          url: `${baseUrl}${service.href}`,
        },
      })),
    },
  },
  freeAuditJsonLd("Auditoría gratuita de marketing digital", "/agencia-marketing-digital"),
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
  title: "Agencia de marketing digital para empresas",
  description:
    "Agencia de marketing digital para empresas. Encuentra el servicio que necesita tu negocio y empieza con una auditoría gratuita.",
  keywords: [
    "agencia de marketing digital",
    "agencia marketing digital",
    "servicios de marketing digital",
    "agencia de crecimiento",
    "marketing digital para empresas",
    "agencia digital para pymes",
  ],
  alternates: {
    canonical: "/agencia-marketing-digital",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Agencia de marketing digital para empresas",
    description:
      "Te ayudamos a elegir qué mejorar para llegar a posibles clientes y recibir consultas. Empieza con una auditoría gratuita.",
    url: "/agencia-marketing-digital",
    siteName: "Crecimiento sin complicaciones",
    locale: "es_ES",
    type: "website",
  },
};

export default function DigitalMarketingAgencyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <div className={`landing-light ${styles.page}`}>
        <header className="sticky top-0 z-20 border-b border-slate-800 bg-slate-950/95 backdrop-blur">
          <nav
            className="mx-auto flex min-h-[72px] max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8"
            aria-label="Navegación principal"
          >
            <Link className="logo-link text-slate-50" href="/" aria-label="Crecimiento sin complicaciones, inicio">
              <Logo variant="light" />
            </Link>

            <div className="hidden items-center gap-2 text-sm font-semibold text-slate-300 lg:flex">
              <a className="rounded-md px-3 py-2 hover:bg-slate-900 hover:text-white" href="#servicios-digitales">
                Servicios
              </a>
              <a className="rounded-md px-3 py-2 hover:bg-slate-900 hover:text-white" href="#metodo">
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
              <a href="#servicios-digitales">Servicios</a>
              <a href="#metodo">Método</a>
            </div>

            <div className="flex items-center gap-3">
              <LandingServicesMenu currentPath="/agencia-marketing-digital" mobileAuditHref="#audit-request" />
              <a
                className="landing-top-cta inline-flex min-h-11 shrink-0 items-center justify-center rounded-lg bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-blue-950/30 hover:bg-blue-500 focus-visible:ring-2 focus-visible:ring-blue-400"
                href="#auditoria-marketing-digital"
              >
                Auditoría gratuita
              </a>
            </div>
          </nav>
        </header>

        <main>
          <section className={styles.hero} aria-labelledby="marketing-hero-title">
            <div className={styles.heroCopy}>
              <nav className={styles.breadcrumb} aria-label="Migas de pan"><Link href="/">Inicio</Link><span aria-hidden="true">/</span><span>Marketing digital</span></nav>
              <p className={styles.eyebrow}>Crecimiento sin complicaciones</p>
              <h1 id="marketing-hero-title">Agencia de marketing digital <span>para tu empresa.</span></h1>
              <p className={styles.lead}>Ayudamos a que más personas encuentren tu negocio, entiendan lo que ofreces y den el paso de contactar.</p>
              <div className={styles.actions}><a className={styles.primary} href="#auditoria-marketing-digital">Solicitar auditoría gratuita</a><a className={styles.secondary} href="#servicios-digitales">Explorar los servicios <ArrowUpRight aria-hidden="true" size={18} /></a></div>
            </div>
            <Image className={styles.heroImage} src="/images/home-growth-collaboration.webp" alt="" fill sizes="100vw" preload />
          </section>

          <section id="para-quien" className={styles.needs} aria-labelledby="needs-title">
            <div className={styles.container}>
              <div className={styles.sectionHead}><p className={styles.eyebrow}>Tu punto de partida</p><h2 id="needs-title">¿Qué quieres mejorar?</h2><p>La prioridad cambia según el momento de tu empresa. Empezamos por entender el tuyo.</p></div>
              <div className={styles.needGrid}>
                <a href="#servicios-digitales"><span>Necesito darme a conocer</span><h3>«Quiero que me encuentren más clientes.»</h3><p>Elegimos cómo llegar a las personas que pueden necesitar tu servicio.</p><ArrowUpRight aria-hidden="true" /></a>
                <a href="#oferta"><span>Ya tengo visitas</span><h3>«Mi web recibe visitas, pero pocas consultas.»</h3><p>Revisamos qué entiende el visitante y qué le falta para dar el siguiente paso.</p><ArrowUpRight aria-hidden="true" /></a>
                <a href="#trabajo"><span>Me falta tiempo</span><h3>«No llego a todo lo que necesita el negocio.»</h3><p>Te ayudamos a mantener la comunicación y a simplificar tareas repetitivas.</p><ArrowUpRight aria-hidden="true" /></a>
              </div>
            </div>
          </section>

          <section id="servicios-digitales" className={styles.services} aria-labelledby="services-title">
            <div className={styles.container}>
              <div className={styles.sectionHead}><p className={styles.eyebrow}>Servicios de marketing digital</p><h2 id="services-title">El servicio adecuado para el siguiente paso.</h2><p>Puedes contratar una especialidad o combinar varias según lo que necesite tu empresa.</p></div>
              <div className={styles.serviceGroups}>{serviceGroups.map((group, index) => <article className={styles.serviceGroup} id={index === 1 ? "oferta" : index === 2 ? "trabajo" : undefined} key={group.number}>
                <div className={styles.serviceImage}><Image src={`/images/${group.image}`} alt={group.alt} fill sizes="(max-width: 767px) 100vw, 30vw" /></div>
                <div className={styles.groupIntro}><span className={styles.number}>{group.number}</span><h3>{group.title}</h3><p>{group.intro}</p></div>
                <div className={styles.serviceLinks}>{group.services.map(service => <Link href={service.href} key={service.href}><div><h4>{service.title}</h4><p>{service.text}</p></div><ArrowUpRight aria-hidden="true" size={22} /></Link>)}</div>
              </article>)}</div>
            </div>
          </section>

          <section id="metodo" className={styles.method} aria-labelledby="method-title"><div className={styles.container}>
            <div className={styles.methodIntro}><p className={styles.eyebrow}>Cómo empezamos</p><h2 id="method-title">Primero, entender.<br />Después, ponerlo en marcha.</h2><p>Cuéntanos qué vendes y qué te gustaría mejorar. Con esa información revisamos tu presencia digital y te proponemos por dónde empezar.</p><a className={styles.lightButton} href="#auditoria-marketing-digital">Pedir mi auditoría gratuita <ArrowUpRight aria-hidden="true" size={20} /></a></div>
            <ol className={styles.steps}><li><span>01</span><div><h3>Revisamos tu situación</h3><p>La auditoría gratuita nos permite detectar qué puede estar dificultando que recibas consultas.</p></div></li><li><span>02</span><div><h3>Te proponemos un trabajo concreto</h3><p>Explicamos las prioridades y el alcance para que puedas valorar la propuesta.</p></div></li><li><span>03</span><div><h3>Empezamos cuando tú decidas</h3><p>Tras aceptar la propuesta, ejecutamos el trabajo acordado y revisamos su evolución contigo.</p></div></li></ol>
          </div></section>

          <section id="faq" className={styles.faq} aria-labelledby="faq-title"><div className={styles.container}><div><p className={styles.eyebrow}>Antes de empezar</p><h2 id="faq-title">Hablemos claro.</h2><p>Estas son algunas de las dudas que puedes tener al elegir una agencia.</p></div><div className={styles.questions}>{faqs.map(faq => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div></div></section>
          <div className={styles.audit}>
            <LeadForm id="auditoria-marketing-digital" sourcePage="Agencia de marketing digital" interestedService="Marketing digital" title="¿Por dónde debería empezar tu empresa?" description="Cuéntanos qué quieres mejorar. Revisamos tu presencia digital y te explicamos qué trabajo recomendamos para dar el siguiente paso." points={["Revisión inicial de tu negocio", "Prioridades explicadas con claridad", "Propuesta para que puedas decidir"]} buttonLabel="Solicitar auditoría gratuita" />
          </div>
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
