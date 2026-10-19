import { ORGANIZATION_ID, freeAuditJsonLd } from "../../lib/structuredData";
import type { Metadata } from "next";
import { BriefcaseBusiness, Building2, ChartNoAxesCombined, HeartPulse, LayoutTemplate, MapPin, MousePointer2, Search, Star, Wrench } from "lucide-react";
import { SeoCityLanding, type SeoCityContent } from "../_components/SeoCityLanding";

const faqs = [
  {
    question: "¿Trabajáis solo con empresas que están físicamente en Madrid?",
    answer:
      "No. Podemos trabajar con empresas ubicadas en Madrid y también con negocios que venden servicios a clientes de Madrid. Lo importante es definir bien la intención local y no prometer presencia física si no existe.",
  },
  {
    question: "¿Cuánto tarda el SEO en Madrid en dar resultados?",
    answer:
      "Depende del estado de la web, la competencia y el tipo de keywords. Normalmente las mejoras técnicas y de contenido empiezan a dar señales en semanas, pero una estrategia SEO seria suele medirse en ciclos de 3 a 6 meses.",
  },
  {
    question: "¿Qué incluye una auditoría SEO para una empresa de Madrid?",
    answer:
      "Revisamos indexación, arquitectura, velocidad, páginas actuales, keywords, contenido, enlazado interno, conversión y oportunidades locales. La idea es salir con una hoja de ruta clara, no con una lista interminable de tareas.",
  },
  {
    question: "¿Es mejor hacer SEO local o SEO nacional?",
    answer:
      "Depende del negocio. Si vendes principalmente en Madrid, el SEO local puede ser prioritario. Si puedes captar clientes en toda España, conviene combinar una página nacional como /seo/ con páginas locales como /seo/madrid/.",
  },
  {
    question: "¿Necesito crear muchas páginas por barrios de Madrid?",
    answer:
      "No al principio. Antes de crear páginas por zonas como Chamberí, Salamanca, Chamartín o Alcobendas, conviene validar que existe demanda suficiente y que cada página tendrá contenido propio. Si no, es mejor concentrar la autoridad en una página fuerte de Madrid.",
  },
  {
    question: "¿El SEO sustituye a Google Ads?",
    answer:
      "No necesariamente. El SEO construye captación orgánica a medio plazo; Google Ads puede generar demanda inmediata. Para muchas pymes, lo mejor es combinar ambos: Ads para aprender rápido y SEO para reducir dependencia a largo plazo.",
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
        name: "SEO Madrid",
        item: "https://www.crecimientosincomplicaciones.com/seo/madrid",
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://www.crecimientosincomplicaciones.com/seo/madrid#service",
    url: "https://www.crecimientosincomplicaciones.com/seo/madrid",
    name: "Agencia SEO para empresas de Madrid",
    serviceType: ["SEO local", "Consultoría SEO", "SEO técnico", "Posicionamiento web"],
    provider: { "@id": ORGANIZATION_ID },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Madrid",
    },
    description:
      "Servicios SEO para empresas de Madrid con auditoría SEO gratuita, estrategia de contenidos, SEO técnico y posicionamiento local orientado a leads.",
  },
  freeAuditJsonLd("Auditoría SEO gratuita para empresas de Madrid", "/seo/madrid"),
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
  title: "Agencia SEO para empresas de Madrid",
  description:
    "Servicios SEO para empresas de Madrid. Auditoría SEO gratuita, estrategia de contenidos, SEO técnico y posicionamiento local para captar más clientes desde Google.",
  keywords: [
    "agencia seo madrid",
    "agencia seo para empresas de madrid",
    "servicios seo madrid",
    "seo local madrid",
    "posicionamiento web madrid",
    "consultoría seo madrid",
  ],
  alternates: {
    canonical: "/seo/madrid",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Agencia SEO para empresas de Madrid",
    description:
      "Auditoría SEO, estrategia de contenidos, SEO técnico y posicionamiento local para captar más clientes desde Google.",
    url: "/seo/madrid",
    siteName: "Crecimiento sin complicaciones",
    locale: "es_ES",
    type: "website",
  },
};

const cityContent: SeoCityContent = {
  city: "Madrid",
  slug: "madrid",
  sourcePage: "SEO Madrid",
  heroAlt: "Palacio Real y Catedral de la Almudena vistos desde el mirador de Príncipe Pío, Madrid",
  description: "Conectamos búsquedas locales, páginas de servicio y medición para que tu negocio reciba contactos desde Google.",
  diagnosisTitle: "Que te encuentren cuando buscan lo que haces",
  diagnosisText: "No basta con aparecer. Revisamos si tu negocio llega a las búsquedas adecuadas y facilita la decisión de contactar.",
  problems: [
    { icon: Search, title: "Tu especialidad no aparece", text: "Ofreces un servicio concreto, pero tus páginas compiten por términos demasiado amplios o no explican bien qué resuelves." },
    { icon: MousePointer2, title: "Te visitan, pero no preguntan", text: "La web recibe interés sin resolver las dudas sobre tu servicio, tu experiencia o el siguiente paso." },
    { icon: ChartNoAxesCombined, title: "No sabes qué está funcionando", text: "Los informes muestran posiciones y visitas, pero no qué páginas generan consultas útiles para tu negocio." },
  ],
  strategyTitle: "Una estrategia local con cada pieza en su sitio",
  strategyText: "Trabajamos la visibilidad de tu negocio en Madrid y el recorrido hasta el contacto: búsqueda, confianza, página y medición.",
  strategy: [
    { icon: Search, title: "Búsquedas por servicio y especialidad", text: "Analizamos cómo se busca tu solución en Madrid. Separamos consultas informativas, comparaciones de proveedores y búsquedas de presupuesto para priorizar páginas." },
    { icon: MapPin, title: "Tu Perfil de Empresa", text: "Revisamos categorías, servicios e información del negocio para que el perfil represente lo que ofreces y dónde atiendes." },
    { icon: Star, title: "Confianza antes del contacto", text: "Ordenamos reseñas auténticas y referencias del negocio para responder a las dudas de quien compara profesionales." },
    { icon: LayoutTemplate, title: "Páginas que explican tu servicio", text: "Definimos páginas por especialidad, con alcance, argumentos y una llamada a la acción clara. Las zonas se trabajan cuando tienen sentido para el negocio." },
    { icon: Wrench, title: "Una base técnica que permite avanzar", text: "Corregimos bloqueos de rastreo, indexación y arquitectura. Revisamos velocidad y enlazado para que las páginas importantes sean accesibles." },
    { icon: ChartNoAxesCombined, title: "Medición del interés comercial", text: "Conectamos búsquedas y páginas con formularios y acciones de contacto para decidir qué mantener, corregir o reforzar." },
  ],
  sectorsTitle: "Cuando elegir un proveedor requiere confianza",
  sectorsText: "La estrategia se adapta a cómo se contrata tu servicio. Un despacho, una clínica y una consultora no necesitan las mismas páginas ni responden a las mismas dudas.",
  sectors: [
    { icon: BriefcaseBusiness, title: "Despachos y servicios profesionales", text: "Páginas por especialidad que expliquen el alcance del servicio, a quién ayudan y cómo solicitar una primera valoración.", example: "Por ejemplo: asesoría para empresas en Madrid." },
    { icon: HeartPulse, title: "Clínicas, formación y bienestar", text: "Servicios y programas bien diferenciados, información del centro y un recorrido claro hacia la consulta o la inscripción.", example: "Por ejemplo: fisioterapia deportiva en Madrid." },
    { icon: Building2, title: "Consultoría, tecnología y B2B", text: "Contenido que permita entender una solución, valorar su encaje y pedir una conversación con contexto.", example: "Por ejemplo: consultoría de procesos para pymes." },
  ],
  stages: [
    { title: "Mirar dónde estás", text: "Revisamos tu sitio público, la oferta y las búsquedas que quieres captar en Madrid. Identificamos bloqueos técnicos y páginas que necesitan atención.", deliverable: "Diagnóstico inicial y próximos pasos" },
    { title: "Elegir dónde competir", text: "Ordenamos servicios, especialidades y consultas locales para seleccionar las oportunidades que encajan con tu negocio.", deliverable: "Mapa de búsquedas y páginas prioritarias" },
    { title: "Preparar la base", text: "Trabajamos indexación, arquitectura, enlazado y señales del negocio para que las páginas clave tengan una función clara.", deliverable: "Correcciones técnicas priorizadas" },
    { title: "Construir páginas de decisión", text: "Mejoramos contenidos de servicio, argumentos y acciones de contacto. Cada página responde a una necesidad concreta.", deliverable: "Páginas y contenidos listos para captar" },
    { title: "Revisar y ajustar", text: "Leemos visibilidad, tráfico y contactos con los datos disponibles. Reordenamos el trabajo según lo aprendido.", deliverable: "Revisión y siguientes prioridades" },
  ],
  related: [
    { href: "/seo-para-pymes", title: "SEO para pymes", text: "Prioriza las acciones que necesita tu empresa antes de ampliar el proyecto." },
    { href: "/seo", title: "Estrategia SEO nacional", text: "Amplía la captación cuando tus servicios pueden llegar a clientes fuera de Madrid." },
    { href: "/agencia-marketing-digital/google-ads", title: "Google Ads para empresas", text: "Valora las campañas de búsqueda como complemento de tu captación orgánica." },
    { href: "/diseno-pagina-web-profesional", title: "Diseño web profesional", text: "Mejora la base de tu web cuando la estructura o el mensaje limitan el contacto." },
  ],
};

export default function SeoMadridPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <SeoCityLanding content={cityContent} faqs={faqs} />
    </>
  );
}
