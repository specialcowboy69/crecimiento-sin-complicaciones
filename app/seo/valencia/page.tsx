import type { Metadata } from "next";
import { Building2, ChartNoAxesCombined, HeartPulse, LayoutTemplate, MapPin, Megaphone, MousePointer2, Search, Star, Store, Wrench } from "lucide-react";
import { SeoCityLanding, type SeoCityContent } from "../_components/SeoCityLanding";

const faqs = [
  {
    question: "¿Trabajáis con empresas de Valencia aunque no tengáis oficina física allí?",
    answer:
      "Sí. Podemos trabajar con empresas ubicadas en Valencia y también con negocios que venden a clientes de Valencia. En ese caso, cuidamos el enfoque para hablar de servicios para empresas de Valencia sin afirmar presencia física si no existe.",
  },
  {
    question: "¿Qué diferencia hay entre SEO local y SEO nacional?",
    answer:
      "El SEO nacional busca posicionar por servicios o temas sin una ubicación concreta. El SEO local añade intención geográfica: búsquedas con ciudad, páginas adaptadas al mercado local, sectores de la zona y señales que ayudan a Google a entender dónde quieres captar clientes.",
  },
  {
    question: "¿Cuánto tarda el SEO para una empresa en Valencia?",
    answer:
      "Depende de la competencia, el estado técnico de la web y las keywords objetivo. Algunas mejoras pueden notarse en pocas semanas, pero una estrategia SEO realista suele medirse en ciclos de 3 a 6 meses.",
  },
  {
    question: "¿Tiene sentido hacer SEO si ya invierto en Google Ads?",
    answer:
      "Sí. Google Ads puede darte visibilidad inmediata, pero el SEO construye captación orgánica a medio plazo. Además, lo aprendido en Ads puede ayudar a priorizar keywords, mensajes y páginas SEO con más intención comercial.",
  },
  {
    question: "¿Qué páginas necesita una pyme valenciana para posicionar mejor?",
    answer:
      "Normalmente necesita una home clara, páginas de servicio, una estructura bien enlazada, contenido que responda dudas reales y, si vende en una zona concreta, páginas locales bien trabajadas. No se trata de crear muchas URLs, sino de crear las páginas correctas.",
  },
  {
    question: "¿Podéis trabajar sobre mi web actual o hay que hacer una nueva?",
    answer:
      "Podemos empezar revisando la web actual. Si la base técnica, el mensaje y la estructura permiten mejorar, trabajamos sobre ella. Si la web limita la captación, planteamos una mejora o rediseño orientado a SEO y conversión.",
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
        name: "SEO Valencia",
        item: "https://www.crecimientosincomplicaciones.com/seo/valencia",
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Agencia SEO para empresas de Valencia",
    serviceType: ["SEO Valencia", "Consultoría SEO Valencia", "SEO local Valencia", "Posicionamiento web Valencia"],
    provider: {
      "@type": "Organization",
      name: "Crecimiento sin complicaciones",
      url: "https://www.crecimientosincomplicaciones.com",
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Valencia",
    },
    description:
      "Servicios SEO para empresas de Valencia con auditoría SEO gratuita, SEO técnico, contenidos, arquitectura web y SEO local orientado a captar clientes.",
    makesOffer: {
      "@type": "Offer",
      name: "Auditoría SEO gratuita para empresas de Valencia",
      availability: "https://schema.org/InStock",
      url: "https://www.crecimientosincomplicaciones.com/seo/valencia",
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
  title: "Agencia SEO para empresas de Valencia | Crecimiento sin complicaciones",
  description:
    "Servicios SEO para empresas de Valencia. Auditoría SEO gratuita, SEO técnico, contenidos, arquitectura web y SEO local para captar más clientes desde Google.",
  keywords: [
    "agencia seo valencia",
    "seo valencia",
    "servicios seo valencia",
    "consultoría seo valencia",
    "seo para empresas en valencia",
    "seo local valencia",
    "posicionamiento web valencia",
  ],
  alternates: {
    canonical: "/seo/valencia",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Agencia SEO para empresas de Valencia",
    description:
      "Auditoría SEO, SEO técnico, contenidos, arquitectura web y SEO local para captar más clientes desde Google.",
    url: "/seo/valencia",
    siteName: "Crecimiento sin complicaciones",
    locale: "es_ES",
    type: "website",
  },
};

const cityContent: SeoCityContent = {
  city: "Valencia",
  slug: "valencia",
  sourcePage: "SEO Valencia",
  heroAlt: "Museo de las Ciencias, puente de l'Assut de l'Or y Ágora en Valencia",
  description: "Trabajamos tu presencia local y tu web para conectar las búsquedas de tus clientes con llamadas y consultas.",
  diagnosisTitle: "Tu negocio tiene que ser fácil de encontrar y de elegir",
  diagnosisText: "Revisamos qué descubre una persona cuando busca tu servicio en Valencia y qué necesita para dar el siguiente paso.",
  problems: [
    { icon: MapPin, title: "Tu presencia local está dispersa", text: "El perfil, la web y las referencias del negocio no muestran con claridad tus servicios ni dónde atiendes." },
    { icon: MousePointer2, title: "La web no resuelve la decisión", text: "El visitante encuentra información general, pero no lo que necesita para elegir tu negocio y consultar." },
    { icon: ChartNoAxesCombined, title: "Dependes de seguir pagando clics", text: "Inviertes en anuncios sin saber qué servicios podrían construir también una base de captación orgánica." },
  ],
  strategyTitle: "Del descubrimiento local a una consulta real",
  strategyText: "Conectamos perfil, web y referencias del negocio para que quien busca en Valencia encuentre una oferta clara y sepa cómo contactar.",
  strategy: [
    { icon: MapPin, title: "Un perfil que represente tu negocio", text: "Revisamos la información, las categorías y los servicios de tu Perfil de Empresa. Lo alineamos con lo que haces, tu ubicación real y tu forma de atender." },
    { icon: Search, title: "Búsquedas de tus clientes", text: "Analizamos servicios y consultas con intención local para priorizar páginas útiles en Valencia y tu zona real de atención." },
    { icon: Star, title: "Reseñas y referencias auténticas", text: "Trabajamos un recorrido para pedir opiniones reales y mantener la información del negocio coherente y accesible." },
    { icon: LayoutTemplate, title: "La web continúa la conversación", text: "Creamos o mejoramos páginas de servicio que resuelvan dudas sobre la oferta, la atención y el contacto, sin hacer perder tiempo al visitante." },
    { icon: Wrench, title: "Técnica y estructura sin bloqueos", text: "Revisamos indexación, carga y enlaces. Organizamos servicios y contenido para que las páginas importantes no queden escondidas." },
    { icon: ChartNoAxesCombined, title: "Datos para decidir el siguiente paso", text: "Leemos búsquedas, páginas y acciones de contacto con los datos disponibles. La siguiente prioridad sale de lo aprendido, no de añadir tareas." },
  ],
  sectorsTitle: "Una misma ciudad, distintas formas de conseguir clientes",
  sectorsText: "Adaptamos páginas y mensajes al tipo de decisión: una cita, una solicitud de presupuesto, una reserva o una conversación comercial.",
  sectors: [
    { icon: Store, title: "Comercio y negocios de proximidad", text: "Información de atención, servicios y ubicación coherente entre perfil y web para facilitar la elección del negocio.", example: "Por ejemplo: tienda especializada en Valencia." },
    { icon: HeartPulse, title: "Clínicas, academias y profesionales", text: "Páginas por servicio o programa que expliquen qué ofreces, para quién y cómo solicitar información.", example: "Por ejemplo: academia de idiomas en Valencia." },
    { icon: Building2, title: "Reformas, inmobiliaria y servicios B2B", text: "Proyectos y servicios bien explicados para que la consulta llegue con una necesidad y un alcance más claros.", example: "Por ejemplo: reformas integrales en Valencia." },
  ],
  stages: [
    { title: "Revisar el punto de partida", text: "Analizamos tu web pública, tus servicios y las búsquedas que quieres captar en Valencia. Detectamos qué dificulta que te encuentren o contacten.", deliverable: "Revisión inicial y próximos pasos" },
    { title: "Ordenar servicios y demanda", text: "Definimos qué consultas y páginas tienen sentido para tu oferta y tu zona de atención, antes de ampliar contenidos.", deliverable: "Mapa local de servicios y prioridades" },
    { title: "Conectar perfil y web", text: "Revisamos las señales del negocio y los bloqueos técnicos. Alineamos la información con tu forma real de atender.", deliverable: "Base local y técnica coherente" },
    { title: "Mejorar las páginas clave", text: "Trabajamos el contenido y las acciones de contacto de tus servicios prioritarios para facilitar citas, consultas o presupuestos.", deliverable: "Páginas de servicio y contacto" },
    { title: "Aprender de los contactos", text: "Revisamos visibilidad y consultas con el seguimiento disponible para ajustar el plan y valorar el apoyo de otros canales.", deliverable: "Aprendizajes y próximas acciones" },
  ],
  comparison: [
    { icon: Megaphone, title: "Ads para captar demanda ahora", text: "Las campañas permiten probar servicios y mensajes. Revisamos su función junto a las páginas donde llega el visitante." },
    { icon: Search, title: "SEO para trabajar la base orgánica", text: "El perfil y las páginas de servicio se desarrollan para aparecer en búsquedas relevantes y facilitar el contacto." },
    { icon: MousePointer2, title: "La web conecta ambos caminos", text: "Un mensaje claro y un contacto sencillo ayudan tanto a quien llega desde un anuncio como desde una búsqueda orgánica." },
  ],
  related: [
    { href: "/seo", title: "Estrategia SEO nacional", text: "Amplía el enfoque si tu negocio también atiende clientes fuera de Valencia." },
    { href: "/seo-para-pymes", title: "SEO para pymes", text: "Ordena las prioridades de tu empresa con un alcance ajustado a lo que necesita." },
    { href: "/seo/madrid", title: "SEO para empresas de Madrid", text: "Revisa el enfoque para servicios y empresas que quieren captar en Madrid." },
    { href: "/seo/barcelona", title: "SEO para empresas de Barcelona", text: "Consulta el servicio orientado a empresas que atienden ese mercado." },
  ],
};

export default function SeoValenciaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <SeoCityLanding content={cityContent} faqs={faqs} />
    </>
  );
}
