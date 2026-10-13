import type { Metadata } from "next";
import { BarChart3, Building2, ClipboardList, Globe2, MapPin, Search, ShoppingCart, Target, Wrench } from "lucide-react";
import { SeoCityLanding, type SeoCityContent } from "../_components/SeoCityLanding";

const faqs = [
  {
    question: "¿Trabajáis con empresas que venden en Barcelona aunque no tengan oficina allí?",
    answer:
      "Sí. Podemos trabajar con empresas ubicadas en Barcelona y también con negocios que venden a clientes de Barcelona. En ese caso, cuidamos el enfoque para no prometer presencia física si no existe y centramos la página en servicio, mercado e intención local.",
  },
  {
    question: "¿Qué diferencia hay entre SEO en Barcelona y SEO nacional?",
    answer:
      "El SEO nacional busca posicionar servicios o temas sin una ubicación concreta. El SEO en Barcelona añade intención local: búsquedas con ciudad, competidores locales, sectores específicos y páginas pensadas para captar demanda en ese mercado.",
  },
  {
    question: "¿Cuánto tarda en funcionar una estrategia SEO en Barcelona?",
    answer:
      "Depende del estado de la web, la competencia y las keywords. Una auditoría puede detectar mejoras rápidas, pero una estrategia SEO sólida suele necesitar entre 3 y 6 meses para mostrar señales consistentes.",
  },
  {
    question: "¿Tiene sentido hacer SEO local si mi negocio es B2B?",
    answer:
      "Sí, especialmente si tus clientes buscan proveedores cercanos o con conocimiento del mercado. Muchas empresas B2B comparan agencias, consultores o proveedores usando búsquedas locales antes de pedir presupuesto.",
  },
  {
    question: "¿Necesito contenido en catalán para posicionar en Barcelona?",
    answer:
      "No siempre. Depende de tu audiencia y de las búsquedas objetivo. Si tus clientes buscan principalmente en castellano, podemos empezar en castellano. Si hay demanda o una razón comercial clara, se puede valorar una versión o contenido específico en catalán más adelante.",
  },
  {
    question: "¿Es mejor SEO o Google Ads para captar clientes en Barcelona?",
    answer:
      "No son excluyentes. Google Ads puede darte visibilidad inmediata y aprendizaje rápido. El SEO construye captación orgánica a medio plazo. Para muchas empresas, lo más eficiente es usar Ads para validar mensajes y SEO para consolidar demanda.",
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
      {
        "@type": "ListItem",
        position: 3,
        name: "SEO Barcelona",
        item: "https://www.crecimientosincomplicaciones.com/seo/barcelona",
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Agencia SEO para empresas de Barcelona",
    serviceType: ["SEO Barcelona", "Consultoría SEO Barcelona", "SEO técnico", "Posicionamiento web Barcelona"],
    provider: {
      "@type": "Organization",
      name: "Crecimiento sin complicaciones",
      url: "https://www.crecimientosincomplicaciones.com",
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Barcelona",
    },
    description:
      "Servicios SEO para empresas de Barcelona con auditoría SEO gratuita, SEO técnico, contenidos, arquitectura web y posicionamiento local orientado a leads.",
    makesOffer: {
      "@type": "Offer",
      name: "Auditoría SEO gratuita para empresas de Barcelona",
      availability: "https://schema.org/InStock",
      url: "https://www.crecimientosincomplicaciones.com/seo/barcelona",
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
  title: "Agencia SEO para empresas de Barcelona | Crecimiento sin complicaciones",
  description:
    "Servicios SEO para empresas de Barcelona. Auditoría SEO gratuita, SEO técnico, contenidos, arquitectura web y posicionamiento local para captar clientes desde Google.",
  keywords: [
    "agencia seo barcelona",
    "seo barcelona",
    "servicios seo barcelona",
    "consultoría seo barcelona",
    "seo para empresas en barcelona",
    "posicionamiento web barcelona",
  ],
  alternates: {
    canonical: "/seo/barcelona",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Agencia SEO para empresas de Barcelona",
    description:
      "Auditoría SEO, SEO técnico, contenidos, arquitectura web y posicionamiento local para captar clientes desde Google.",
    url: "/seo/barcelona",
    siteName: "Crecimiento sin complicaciones",
    locale: "es_ES",
    type: "website",
  },
};

const cityContent: SeoCityContent = {
  city: "Barcelona",
  slug: "barcelona",
  sourcePage: "SEO Barcelona",
  heroAlt: "Sagrada Família y tejido urbano de Barcelona vistos desde Parc Güell",
  description: "Una estrategia para ordenar la demanda local, nacional e internacional y convertir visibilidad en oportunidades comerciales medibles.",
  diagnosisTitle: "Para mejorar tu posicionamiento en Barcelona necesitas una dirección clara.",
  diagnosisText: "Analizamos qué servicios buscan tus clientes en Barcelona, ordenamos las páginas por intención y conectamos cada búsqueda con una respuesta y un siguiente paso claros.",
  problems: [
    { icon: Globe2, title: "Prioridades de búsqueda difusas", text: "Se intenta captar demanda local y general sin distinguir servicios, intención ni valor para el negocio." },
    { icon: Search, title: "Servicios que compiten entre sí", text: "Varias páginas apuntan a búsquedas similares y reparten la visibilidad en lugar de reforzar la oferta principal." },
    { icon: Target, title: "Tráfico sin destino", text: "La visibilidad crece, pero las páginas no conducen con claridad hacia un servicio, una comparación o un contacto." },
  ],
  strategyTitle: "Un sistema SEO que conecta mercado, servicio y decisión",
  strategyText: "Primero aclaramos qué buscas captar. Después ordenamos técnica, páginas y contenido para que cada mejora tenga una función comercial.",
  strategy: [
    { icon: Search, title: "Mapa de demanda", text: "Separamos búsquedas locales, nacionales e internacionales por intención y valor para el negocio." },
    { icon: Target, title: "Arquitectura por servicio", text: "Ordenamos páginas principales, clusters, ubicaciones y enlazado interno para distribuir autoridad con criterio." },
    { icon: Wrench, title: "Auditoría SEO técnica", text: "Revisamos indexación, rendimiento, estructura, errores y rastreo antes de ampliar la web." },
    { icon: ClipboardList, title: "Contenido de decisión", text: "Creamos o mejoramos páginas que resuelven comparativas, problemas concretos y dudas previas al contacto." },
    { icon: MapPin, title: "Señales locales honestas", text: "Trabajamos la intención Barcelona sin inventar oficinas, cobertura ni páginas locales que no aportan contenido propio." },
    { icon: BarChart3, title: "Medición comercial", text: "Conectamos visibilidad, formularios y oportunidades para decidir qué reforzar en el siguiente ciclo." },
  ],
  market: {
    id: "mercado",
    title: "Tres decisiones antes de escalar en Barcelona",
    items: [
      { icon: Building2, title: "Definir el mercado real", text: "Aclaramos si captas empresas de Barcelona, operas desde la ciudad o compites también a escala nacional." },
      { icon: Search, title: "Priorizar servicios y búsquedas", text: "Identificamos los servicios con demanda relevante y las consultas que pueden llevar a una conversación comercial." },
      { icon: Globe2, title: "Dar una función a cada página", text: "Cada URL responde a una intención concreta y se conecta con el siguiente paso comercial." },
    ],
  },
  sectorsTitle: "Estrategias distintas para modelos de captación distintos",
  sectorsText: "No trabajamos igual un catálogo amplio, una venta consultiva o un servicio ligado a una ubicación. Cambian la arquitectura, la prueba necesaria y el camino al contacto.",
  sectors: [
    { icon: ShoppingCart, title: "Ecommerce y marcas digitales", text: "Categorías, colecciones y contenido se organizan para evitar solapamientos y acercar la búsqueda al producto adecuado.", example: "Ejemplos: categorías con intención y enlazado útil" },
    { icon: Building2, title: "Servicios profesionales, salud y B2B", text: "Priorizamos servicios, problemas y criterios de elección que ayuden a comparar antes de pedir una propuesta.", example: "Ejemplos: consultoría, clínicas y venta consultiva" },
    { icon: Globe2, title: "Formación, turismo y experiencias", text: "Separamos ubicación, audiencia e idioma cuando cada variable cambia lo que el usuario necesita encontrar.", example: "Ejemplos: escuelas, actividades y oferta internacional" },
  ],
  stages: [
    { title: "Diagnóstico técnico y comercial", text: "Revisamos indexación, estructura, contenido y conversión para localizar los bloqueos de mayor impacto.", deliverable: "Mapa de bloqueos y prioridades" },
    { title: "Investigación de mercados e intención", text: "Ordenamos búsquedas por servicio, ubicación, audiencia e idioma sin mezclar objetivos distintos.", deliverable: "Mapa de demanda priorizada" },
    { title: "Arquitectura y páginas clave", text: "Definimos qué páginas deben existir, qué función cumple cada una y cómo se conectan.", deliverable: "Arquitectura y backlog de páginas" },
    { title: "Optimización y contenido", text: "Mejoramos mensajes, estructura, enlazado y llamadas a la acción en las páginas con más potencial.", deliverable: "Cambios publicados y revisables" },
    { title: "Medición y siguiente ciclo", text: "Cruzamos Search Console, analítica y contactos para decidir qué mantener, ampliar o corregir.", deliverable: "Informe de aprendizaje y próximos pasos" },
  ],
  related: [
    { href: "/seo", title: "Agencia SEO", text: "La visión nacional del servicio: técnica, contenidos, arquitectura y medición." },
    { href: "/seo-para-pymes", title: "SEO para pymes", text: "Un enfoque para priorizar acciones con impacto comercial y recursos realistas." },
    { href: "/seo/madrid", title: "SEO en Madrid", text: "Otra estrategia local para mercados B2B y servicios profesionales." },
    { href: "/agencia-marketing-digital/google-ads", title: "Google Ads", text: "Campañas para validar demanda mientras el SEO construye captación orgánica." },
  ],
  sectionLinks: [
    { label: "Estrategia", href: "#estrategia" },
    { label: "Mercado", href: "#mercado" },
    { label: "Sectores", href: "#sectores" },
    { label: "FAQ", href: "#faq" },
  ],
};

export default function SeoBarcelonaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <SeoCityLanding content={cityContent} faqs={faqs} />
    </>
  );
}
