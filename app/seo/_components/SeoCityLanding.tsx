import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Check, Phone, type LucideIcon } from "lucide-react";
import { LandingServicesMenu } from "../../components/LandingServicesMenu";
import { Logo } from "../../components/Logo";
import { SeoAuditForm } from "../../components/SeoAuditForm";
import { seoCityImageCredits, type SeoCitySlug } from "./seo-city-image-credits";
import styles from "./seo-city.module.css";

type ContentCard = { title: string; text: string; icon: LucideIcon };
type Sector = ContentCard & { example: string };
type Stage = { title: string; text: string; deliverable: string };
type RelatedLink = { href: string; title: string; text: string };
type SectionLink = { label: string; href: `#${string}` };
type MarketBlock = {
  id: "mercado" | "costa-del-sol" | "provincia";
  title: string;
  items: ContentCard[];
};

export type SeoCityContent = {
  city: string;
  slug: SeoCitySlug;
  sourcePage: string;
  heroAlt: string;
  description: string;
  diagnosisTitle: string;
  diagnosisText: string;
  problems: ContentCard[];
  strategyTitle: string;
  strategyText: string;
  strategy: ContentCard[];
  sectorsTitle: string;
  sectorsText: string;
  sectors: Sector[];
  stages: Stage[];
  related: RelatedLink[];
  comparison?: ContentCard[];
  sectionLinks?: SectionLink[];
  market?: MarketBlock;
  comparisonLink?: { href: string; label: string };
  relatedCities?: { href: string; title: string }[];
};

type Props = { content: SeoCityContent; faqs: { question: string; answer: string }[] };

export function SeoCityLanding({ content: c, faqs }: Props) {
  const auditId = `auditoria-${c.slug}`;
  const imageCredit = seoCityImageCredits[c.slug];
  const sectionLinks = c.sectionLinks ?? [
    { label: "Estrategia", href: "#estrategia" as const },
    { label: "Sectores", href: "#sectores" as const },
    { label: "Método", href: "#metodo" as const },
    { label: "FAQ", href: "#faq" as const },
  ];
  const comparisonLink = c.comparisonLink ?? {
    href: "/agencia-marketing-digital/google-ads",
    label: "Ver gestión de Google Ads",
  };
  return (
    <div className={`${styles.page} seo-${c.slug}-page landing-light`} data-seo-city={c.slug}>
      <header className="sticky top-0 z-20 border-b border-slate-800 bg-slate-950/95 backdrop-blur">
        <nav className="mx-auto flex min-h-[72px] max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8" aria-label="Navegación principal">
          <Link className="logo-link text-slate-50" href="/" aria-label="Crecimiento sin complicaciones, inicio"><Logo variant="light" /></Link>
          <div className="hidden items-center gap-2 text-sm font-semibold text-slate-300 lg:flex">
            {sectionLinks.map((link) => <a className="rounded-md px-3 py-2 hover:bg-slate-900" href={link.href} key={link.href}>{link.label}</a>)}
          </div>
          <div className="flex items-center gap-3">
            <LandingServicesMenu currentPath={`/seo/${c.slug}`} mobileAuditHref="#audit-request" />
            <a className="landing-top-cta inline-flex min-h-11 shrink-0 items-center justify-center rounded-lg bg-blue-600 px-4 py-3 text-sm font-bold text-white hover:bg-blue-500 focus-visible:ring-2 focus-visible:ring-blue-400" href={`#${auditId}`}>Auditoría gratuita</a>
          </div>
        </nav>
      </header>
      <main>
        <section className={styles.hero} aria-labelledby="hero-title">
          <Image src={`/images/seo-${c.slug}-city.webp`} alt={c.heroAlt} fill sizes="100vw" fetchPriority="high" className={styles.heroImage} />
          <div className={styles.heroContent}>
            <nav className={styles.breadcrumbs} aria-label="Migas de pan"><Link href="/">Inicio</Link><span aria-hidden="true">/</span><Link href="/seo">SEO</Link><span aria-hidden="true">/</span><span>{c.city}</span></nav>
            <h1 id="hero-title" className={styles.heroTitle}>Agencia SEO para empresas de {c.city}</h1>
            <p className={styles.heroDescription}>{c.description}</p>
            <div className={styles.heroActions}>
              <a className={styles.primary} href={`#${auditId}`}>Solicitar auditoría gratuita <ArrowUpRight aria-hidden="true" size={20} /></a>
              <a className={styles.heroSecondary} href="#estrategia">Ver la estrategia <ArrowDown aria-hidden="true" size={18} /></a>
            </div>
          </div>
        </section>
        <section className={styles.diagnosis} aria-labelledby="problem-title">
          <div className={styles.inner}>
            <div className={styles.centeredIntro}><h2 id="problem-title">{c.diagnosisTitle}</h2><p>{c.diagnosisText}</p></div>
            <div className={styles.problemGrid}>{c.problems.map((item, index) => (
              <article className={styles.problemCard} key={item.title}>
                <div className={styles.cardTop}><item.icon size={30} strokeWidth={1.8} aria-hidden="true" /><span>0{index + 1}</span></div>
                <h3>{item.title}</h3><p>{item.text}</p>
              </article>
            ))}</div>
          </div>
        </section>
        <section id="estrategia" className={styles.strategySection} aria-labelledby="strategy-title">
          <div className={styles.inner}>
            <div className={styles.intro}><p className={styles.eyebrow}>El servicio local</p><h2 id="strategy-title">{c.strategyTitle}</h2><p>{c.strategyText}</p></div>
            <div className={styles.strategyGrid}>{c.strategy.map((item, index) => (
              <article className={`${styles.strategyCard} ${index === 0 ? styles.strategyFeature : ""}`} key={item.title}>
                {index === 0 && <div className={styles.strategyImage}><Image src="/images/google-ads-national-analysis.webp" alt="Un profesional revisa información de búsqueda y rendimiento en su ordenador" fill sizes="(min-width: 1024px) 600px, 100vw" /></div>}
                <div className={styles.strategyCopy}><item.icon size={30} strokeWidth={1.8} aria-hidden="true" /><h3>{item.title}</h3><p>{item.text}</p></div>
              </article>
            ))}</div>
          </div>
        </section>
        {c.market && <section id={c.market.id} className={styles.marketSection} aria-labelledby={`${c.market.id}-title`}>
          <div className={styles.inner}>
            <div className={styles.marketLead}>
              <p className={styles.eyebrow}>Decisiones de mercado</p>
              <h2 id={`${c.market.id}-title`}>{c.market.title}</h2>
            </div>
            <div className={styles.marketGrid}>{c.market.items.map((item, index) => (
              <article key={item.title}>
                <div className={styles.marketIndex}><span>0{index + 1}</span><item.icon size={27} strokeWidth={1.8} aria-hidden="true" /></div>
                <h3>{item.title}</h3><p>{item.text}</p>
              </article>
            ))}</div>
          </div>
        </section>}
        <section id="sectores" className={styles.sectorsSection} aria-labelledby="sectors-title">
          <div className={styles.inner}>
            <div className={styles.sectorsLead}>
              <div className={styles.sectorsImage}><Image src="/images/seo-local-collaboration-v2.webp" alt="Dos profesionales revisan información de un negocio en una tablet" fill sizes="(min-width: 1024px) 550px, 100vw" /></div>
              <div className={styles.sectorsIntro}><h2 id="sectors-title">{c.sectorsTitle}</h2><p>{c.sectorsText}</p></div>
            </div>
            <div className={styles.sectorsGrid}>{c.sectors.map((item) => (
              <article className={styles.sectorCard} key={item.title}><item.icon size={28} strokeWidth={1.8} aria-hidden="true" /><h3>{item.title}</h3><p>{item.text}</p><span className={styles.sectorExample}>{item.example}</span></article>
            ))}</div>
          </div>
        </section>
        <section id="metodo" className={styles.processSection} aria-labelledby="method-title">
          <div className={styles.inner}>
            <div className={styles.processIntro}><h2 id="method-title">De la primera revisión a un plan en marcha</h2><p>Ordenamos el trabajo por prioridades. Cada etapa deja una decisión clara y un resultado que puedes revisar.</p></div>
            <div className={styles.processGrid}>{c.stages.map((item, index) => (
              <article className={styles.processCard} key={item.title}><span className={styles.stepNumber}>0{index + 1}</span><h3>{item.title}</h3><p>{item.text}</p><div className={styles.deliverable}><Check size={18} aria-hidden="true" /><span>{item.deliverable}</span></div></article>
            ))}</div>
            <p className={styles.processNote}>Empezamos con la auditoría gratuita. La ejecución se acuerda después, según las prioridades y el alcance de tu proyecto.</p>
          </div>
        </section>
        {c.comparison && <section id="ads" className={styles.comparisonSection} aria-labelledby="ads-title">
          <div className={styles.inner}>
            <div className={styles.intro}><h2 id="ads-title">SEO y Ads: dos ritmos, una misma captación</h2><p>La decisión no tiene por qué ser elegir un único canal. Revisamos qué necesitas ahora y qué conviene construir para después.</p></div>
            <div className={styles.comparisonGrid}>{c.comparison.map((item) => <article key={item.title}><item.icon size={28} strokeWidth={1.8} aria-hidden="true" /><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
            <Link className={styles.textLink} href={comparisonLink.href}>{comparisonLink.label} <ArrowUpRight aria-hidden="true" size={20} /></Link>
          </div>
        </section>}
        <section className={styles.relatedSection} aria-labelledby="links-title">
          <div className={styles.inner}>
            <div className={styles.relatedIntro}><h2 id="links-title">El apoyo que necesita tu siguiente paso</h2><p>El SEO local puede apoyarse en una mejor web, una estrategia más amplia o campañas de captación.</p></div>
            <div className={styles.relatedGrid}>{c.related.map((item) => <Link className={styles.relatedLink} href={item.href} key={item.href}><div><h3>{item.title}</h3><p>{item.text}</p></div><ArrowUpRight aria-hidden="true" size={24} /></Link>)}</div>
            {c.relatedCities && c.relatedCities.length > 0 && <nav className={styles.relatedCities} aria-label="SEO en otras ciudades">
              <span>SEO en otras ciudades</span>
              <div>{c.relatedCities.map((item) => <Link href={item.href} key={item.href}>{item.title}<ArrowUpRight aria-hidden="true" size={17} /></Link>)}</div>
            </nav>}
          </div>
        </section>
        <section id="faq" className={styles.faqSection} aria-labelledby="faq-title">
          <div className={`${styles.inner} ${styles.faqLayout}`}>
            <div className={styles.intro}><h2 id="faq-title">Antes de empezar, resolvemos tus dudas</h2><p>Preguntas sobre el servicio SEO para empresas de {c.city}, su alcance y cómo trabajamos contigo.</p></div>
            <div className={styles.faqList}>{faqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div>
          </div>
        </section>
        <section id={auditId} className={styles.auditSection} aria-labelledby="final-cta-title">
          <div className={`${styles.inner} ${styles.auditLayout}`}>
            <div className={styles.auditIntro}>
              <p className={styles.eyebrow}>Auditoría gratuita</p><h2 id="final-cta-title">¿Por dónde empezar con tu SEO en {c.city}?</h2>
              <p>Revisamos tu web pública, tus servicios y las búsquedas que quieres captar. Recibirás prioridades concretas para decidir el siguiente paso.</p>
              <ul>{["Bloqueos técnicos y páginas que necesitan atención", "Búsquedas locales con intención de contacto", "Próximas acciones recomendadas para tu negocio"].map((text) => <li key={text}><Check size={20} aria-hidden="true" /><span>{text}</span></li>)}</ul>
              <p className={styles.remoteNote}>Trabajamos contigo de forma remota, estés en {c.city} o atiendas clientes en la ciudad.</p>
            </div>
            <SeoAuditForm sourcePage={c.sourcePage} defaultService={c.sourcePage} contactDark={false} />
          </div>
        </section>
      </main>
      <div className={styles.photoCredit} data-city-photo-credit>
        <span>
          Foto de {imageCredit.city}: <a href={imageCredit.authorHref}>{imageCredit.author}</a> / <a href={imageCredit.sourceHref}>{imageCredit.source}</a>
          {imageCredit.license && <>, <a href={imageCredit.license.href}>{imageCredit.license.label}</a></>}
          .{imageCredit.modifications && ` ${imageCredit.modifications}`}
        </span>
      </div>
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-800 bg-slate-950/95 p-3 backdrop-blur md:hidden"><a className="mx-auto flex min-h-12 max-w-md items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 font-black text-white" href="tel:+34604990651" aria-label="Llamar al 604 990 651"><Phone size={18} aria-hidden="true" />Llamar</a></div>
    </div>
  );
}
