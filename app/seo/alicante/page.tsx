import { ORGANIZATION_ID, freeAuditJsonLd } from "../../lib/structuredData";
import type { Metadata } from "next";
import { BarChart3, Building2, ClipboardList, HeartPulse, Home, Hotel, MapPin, MapPinned, Megaphone, Search, Target, Wrench } from "lucide-react";
import { SeoCityLanding, type SeoCityContent } from "../_components/SeoCityLanding";

const faqs = [
  {
    question: "¿Trabajáis con empresas de Alicante aunque no tengáis oficina física allí?",
    answer:
      "Sí. Podemos trabajar con empresas ubicadas en Alicante y también con negocios que venden a clientes de Alicante o su provincia. Si no hay sede física, cuidamos el mensaje para hablar de servicios para empresas de Alicante sin afirmar presencia local falsa.",
  },
  {
    question: "¿Tiene sentido hacer SEO local en Alicante?",
    answer:
      "Sí, especialmente para negocios que dependen de búsquedas con intención local: inmobiliarias, clínicas, reformas, formación, hostelería, servicios profesionales y empresas B2B que quieren captar clientes en la zona.",
  },
  {
    question: "¿Puedo posicionar también en otros municipios de Alicante?",
    answer:
      "Sí, pero no conviene crear páginas por municipio sin validar demanda. Primero revisamos si hay búsquedas reales y si cada página puede tener contenido propio. En muchos casos es mejor empezar con una página fuerte para Alicante y después ampliar a zonas concretas.",
  },
  {
    question: "¿Cuánto tarda el SEO para una empresa en Alicante?",
    answer:
      "Depende del estado de la web y de la competencia. Algunas mejoras técnicas pueden notarse antes, pero una estrategia SEO consistente suele necesitar entre 3 y 6 meses para consolidar visibilidad y captar oportunidades.",
  },
  {
    question: "¿Es mejor SEO o Google Ads para captar clientes en Alicante?",
    answer:
      "Depende del objetivo. Google Ads puede generar visibilidad inmediata. El SEO construye captación orgánica a medio plazo. Lo más sólido suele ser combinar ambos: Ads para aprender rápido y SEO para reducir dependencia del pago por clic.",
  },
  {
    question: "¿Podéis trabajar sobre mi web actual?",
    answer:
      "Sí. Primero revisamos si tu web actual puede posicionar y convertir. Si la base es válida, la mejoramos. Si la estructura, el contenido o la parte técnica limitan mucho la captación, proponemos cambios más profundos.",
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
        name: "SEO Alicante",
        item: "https://www.crecimientosincomplicaciones.com/seo/alicante",
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://www.crecimientosincomplicaciones.com/seo/alicante#service",
    url: "https://www.crecimientosincomplicaciones.com/seo/alicante",
    name: "Agencia SEO para empresas de Alicante",
    serviceType: ["SEO Alicante", "Consultoría SEO Alicante", "SEO local Alicante", "Posicionamiento web Alicante"],
    provider: { "@id": ORGANIZATION_ID },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Alicante",
    },
    description:
      "Servicios SEO para empresas de Alicante con auditoría SEO gratuita, SEO técnico, contenidos, arquitectura web y SEO local orientado a captar clientes.",
  },
  freeAuditJsonLd("Auditoría SEO gratuita para empresas de Alicante", "/seo/alicante"),
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
  title: "Agencia SEO para empresas de Alicante | Crecimiento sin complicaciones",
  description:
    "Servicios SEO para empresas de Alicante. Auditoría SEO gratuita, SEO técnico, contenidos, arquitectura web y SEO local para captar clientes desde Google.",
  keywords: [
    "agencia seo alicante",
    "seo alicante",
    "servicios seo alicante",
    "consultoría seo alicante",
    "seo local alicante",
    "posicionamiento web alicante",
    "seo para empresas en alicante",
  ],
  alternates: {
    canonical: "/seo/alicante",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Agencia SEO para empresas de Alicante",
    description:
      "Auditoría SEO, SEO técnico, contenidos, arquitectura web y SEO local para captar clientes desde Google.",
    url: "/seo/alicante",
    siteName: "Crecimiento sin complicaciones",
    locale: "es_ES",
    type: "website",
  },
};

const cityContent: SeoCityContent = {
  city: "Alicante",
  slug: "alicante",
  sourcePage: "SEO Alicante",
  heroAlt: "Puerto de Alicante y Castillo de Santa Bárbara al fondo",
  description: "SEO para ordenar la captación en Alicante y su provincia con cobertura real, páginas diferenciadas y una medición conectada a contactos.",
  diagnosisTitle: "Una provincia amplia no se resuelve copiando la misma página",
  diagnosisText: "Primero definimos qué zonas puedes atender y qué busca el cliente. Después decidimos dónde concentrar autoridad y dónde una página propia aporta valor.",
  problems: [
    { icon: MapPinned, title: "Cobertura difusa", text: "La web habla de toda la provincia sin aclarar qué servicios, zonas o condiciones puede atender realmente." },
    { icon: Search, title: "Municipios sin demanda validada", text: "Se crean páginas por intuición y la autoridad acaba repartida entre URLs que no responden a búsquedas distintas." },
    { icon: Target, title: "Visitas que no llegan a contacto", text: "La ubicación aparece en el texto, pero el recorrido no explica la oferta ni facilita una decisión." },
  ],
  strategyTitle: "Una arquitectura provincial con prioridades, no con plantillas",
  strategyText: "Concentramos la fuerza de la web donde existe demanda y ampliamos solo cuando cada nueva página puede responder con contenido y utilidad propios.",
  strategy: [
    { icon: MapPin, title: "Perfil local y cobertura", text: "Revisamos cómo encajan el perfil de Google, las zonas atendidas y las páginas locales sin inventar presencia física." },
    { icon: Target, title: "Páginas por servicio", text: "Ordenamos páginas principales, servicios, ubicaciones y enlazado para evitar duplicidades y competencia interna." },
    { icon: Search, title: "Demanda geográfica", text: "Separamos servicio, ciudad, provincia y búsquedas de comparación para priorizar contactos potenciales." },
    { icon: ClipboardList, title: "Contenido diferenciado", text: "Cada página explica una necesidad, cobertura o contexto propio en lugar de cambiar solo el topónimo." },
    { icon: Wrench, title: "Auditoría técnica", text: "Revisamos indexación, velocidad, estructura y rastreo antes de añadir más ubicaciones." },
    { icon: BarChart3, title: "Medición de oportunidades", text: "Conectamos visibilidad, formularios y páginas de origen para decidir dónde seguir invirtiendo." },
  ],
  market: {
    id: "provincia",
    title: "Alicante y provincia: tres filtros antes de abrir una URL",
    items: [
      { icon: MapPinned, title: "Zona atendida", text: "Confirmamos que el negocio puede prestar el servicio en esa ubicación y con qué condiciones." },
      { icon: Search, title: "Intención distinta", text: "Comprobamos si el usuario busca algo suficientemente específico para justificar una página propia." },
      { icon: ClipboardList, title: "Contenido propio", text: "Definimos información, ejemplos y argumentos que no sean una repetición de la página principal." },
    ],
  },
  sectorsTitle: "La ubicación pesa de forma distinta según la decisión",
  sectorsText: "Adaptamos la arquitectura y el contenido al recorrido de compra, desde una búsqueda local inmediata hasta una comparación más consultiva.",
  sectors: [
    { icon: HeartPulse, title: "Salud, formación y servicios profesionales", text: "Servicios, especialidad y expectativas deben quedar claros antes de solicitar información.", example: "Ejemplos: clínicas, bienestar, academias, consultoría y B2B" },
    { icon: Hotel, title: "Comercio, hostelería y servicios locales", text: "Cobertura e intención inmediata condicionan qué páginas y campañas merece la pena priorizar.", example: "Ejemplos: tiendas, restauración y negocios de proximidad" },
    { icon: Building2, title: "Inmobiliario y reformas", text: "Zona, tipo de proyecto y confianza se organizan para búsquedas con alto componente de comparación.", example: "Ejemplos: vivienda, rehabilitación y construcción" },
  ],
  stages: [
    { title: "Auditoría de la web", text: "Detectamos bloqueos técnicos, páginas duplicadas y pérdidas de conversión.", deliverable: "Diagnóstico priorizado" },
    { title: "Mapa de demanda provincial", text: "Ordenamos búsquedas por servicio, municipio e intención sin asumir que todas merecen página.", deliverable: "Matriz de zonas y oportunidades" },
    { title: "Arquitectura y prioridades", text: "Definimos dónde concentrar autoridad y qué expansiones tienen contenido suficiente.", deliverable: "Mapa de URLs y backlog" },
    { title: "Contenido y enlazado", text: "Mejoramos páginas, mensajes, navegación interna y CTAs siguiendo el orden acordado.", deliverable: "Optimización implementada" },
    { title: "Medición de contactos", text: "Relacionamos visibilidad y formularios con la página y zona de origen para decidir el siguiente ciclo.", deliverable: "Informe y próximas acciones" },
  ],
  comparison: [
    { icon: Megaphone, title: "Ads valida rápido", text: "Permite probar servicios, zonas y mensajes antes de ampliar la estructura orgánica." },
    { icon: Home, title: "SEO concentra autoridad", text: "Construye páginas duraderas para la demanda que demuestra valor comercial." },
    { icon: MapPin, title: "La cobertura coordina ambos", text: "Campañas y páginas funcionan mejor cuando reflejan las mismas zonas y condiciones reales." },
  ],
  comparisonLink: { href: "/agencia-marketing-digital/google-ads/alicante", label: "Ver Google Ads para empresas de Alicante" },
  related: [
    { href: "/seo", title: "Agencia SEO", text: "La visión nacional del servicio: técnica, contenidos, arquitectura y medición." },
    { href: "/seo-para-pymes", title: "SEO para pymes", text: "Prioridades claras para empresas que necesitan captar sin dispersarse." },
    { href: "/agencia-marketing-digital/google-ads/alicante", title: "Google Ads en Alicante", text: "Campañas locales para aprender y acelerar la demanda inmediata." },
    { href: "/diseno-pagina-web-profesional", title: "Diseño web", text: "Una base más clara cuando la web actual limita la conversión." },
  ],
  relatedCities: [
    { href: "/seo/madrid", title: "Madrid" },
    { href: "/seo/barcelona", title: "Barcelona" },
    { href: "/seo/valencia", title: "Valencia" },
    { href: "/seo/sevilla", title: "Sevilla" },
  ],
  sectionLinks: [
    { label: "Estrategia", href: "#estrategia" },
    { label: "Sectores", href: "#sectores" },
    { label: "Provincia", href: "#provincia" },
    { label: "FAQ", href: "#faq" },
  ],
};

export default function SeoAlicantePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <SeoCityLanding content={cityContent} faqs={faqs} />
    </>
  );
}
