import type { Metadata } from "next";
import { BarChart3, Building2, ClipboardList, GraduationCap, HeartPulse, Home, MapPin, Megaphone, Search, ShieldCheck, Target, Wrench } from "lucide-react";
import { SeoCityLanding, type SeoCityContent } from "../_components/SeoCityLanding";

const faqs = [
  {
    question: "¿Trabajáis con empresas de Sevilla aunque no tengáis oficina física allí?",
    answer:
      "Sí. Podemos trabajar con empresas ubicadas en Sevilla y también con negocios que venden a clientes de Sevilla. Si no hay presencia física, cuidamos el mensaje para hablar de servicios para empresas de Sevilla sin afirmar una sede local.",
  },
  {
    question: "¿Qué diferencia hay entre SEO local y SEO nacional?",
    answer:
      "El SEO nacional busca posicionar servicios sin depender de una ciudad concreta. El SEO local añade intención geográfica: búsquedas con ciudad, páginas adaptadas al mercado local y señales que ayudan a Google a entender dónde quieres captar clientes.",
  },
  {
    question: "¿Cuánto tarda el SEO para una empresa en Sevilla?",
    answer:
      "Depende del estado de la web, la competencia y las keywords. Las mejoras técnicas pueden notarse antes, pero una estrategia SEO seria suele necesitar entre 3 y 6 meses para mostrar señales consistentes.",
  },
  {
    question: "¿Necesito crear páginas por barrios o zonas de Sevilla?",
    answer:
      "No al principio. Antes de crear páginas por barrios o municipios cercanos, conviene validar demanda y asegurarse de que cada URL tendrá contenido propio. Primero es mejor construir una página fuerte para Sevilla.",
  },
  {
    question: "¿Tiene sentido hacer SEO si ya tengo campañas de Google Ads?",
    answer:
      "Sí. Google Ads puede generar visibilidad inmediata, pero el SEO construye captación orgánica a medio plazo. Además, los datos de Ads pueden ayudar a decidir qué keywords y mensajes merece la pena trabajar en SEO.",
  },
  {
    question: "¿Podéis mejorar mi web actual o hay que hacer una nueva?",
    answer:
      "Podemos empezar revisando la web actual. Si tiene buena base, trabajamos sobre ella. Si la estructura, el mensaje o la parte técnica limitan el crecimiento, planteamos mejoras o un rediseño orientado a SEO y conversión.",
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
        name: "SEO Sevilla",
        item: "https://www.crecimientosincomplicaciones.com/seo/sevilla",
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Agencia SEO para empresas de Sevilla",
    serviceType: ["SEO Sevilla", "Consultoría SEO Sevilla", "SEO local Sevilla", "Posicionamiento web Sevilla"],
    provider: {
      "@type": "Organization",
      name: "Crecimiento sin complicaciones",
      url: "https://www.crecimientosincomplicaciones.com",
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Sevilla",
    },
    description:
      "Servicios SEO para empresas de Sevilla con auditoría SEO gratuita, SEO técnico, contenidos, arquitectura web y SEO local orientado a captar clientes.",
    makesOffer: {
      "@type": "Offer",
      name: "Auditoría SEO gratuita para empresas de Sevilla",
      availability: "https://schema.org/InStock",
      url: "https://www.crecimientosincomplicaciones.com/seo/sevilla",
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
  title: "Agencia SEO para empresas de Sevilla | Crecimiento sin complicaciones",
  description:
    "Servicios SEO para empresas de Sevilla. Auditoría SEO gratuita, SEO técnico, contenidos, arquitectura web y SEO local para captar más clientes desde Google.",
  keywords: [
    "agencia seo sevilla",
    "seo sevilla",
    "servicios seo sevilla",
    "consultoría seo sevilla",
    "seo local sevilla",
    "posicionamiento web sevilla",
    "seo para empresas en sevilla",
  ],
  alternates: {
    canonical: "/seo/sevilla",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Agencia SEO para empresas de Sevilla",
    description:
      "Auditoría SEO, SEO técnico, contenidos, arquitectura web y SEO local para captar más clientes desde Google.",
    url: "/seo/sevilla",
    siteName: "Crecimiento sin complicaciones",
    locale: "es_ES",
    type: "website",
  },
};

const cityContent: SeoCityContent = {
  city: "Sevilla",
  slug: "sevilla",
  sourcePage: "SEO Sevilla",
  heroAlt: "Plaza de España de Sevilla con su puente, canal y torre",
  description: "SEO para transformar búsquedas locales en confianza, comparaciones útiles y conversaciones con empresas que necesitan tus servicios.",
  diagnosisTitle: "Aparecer en Sevilla no basta si la página no genera confianza",
  diagnosisText: "El cliente necesita entender qué ofreces, comprobar que encaja con su necesidad y encontrar motivos concretos para contactar.",
  problems: [
    { icon: Search, title: "Visibilidad poco cualificada", text: "La web recibe impresiones, pero no para las búsquedas de servicio que preceden a una llamada o presupuesto." },
    { icon: ShieldCheck, title: "Confianza insuficiente", text: "La página enumera servicios sin resolver objeciones, contexto ni criterios que ayuden a elegir." },
    { icon: Target, title: "Contacto sin recorrido", text: "El formulario aparece, pero el contenido anterior no prepara la decisión ni explica el siguiente paso." },
  ],
  strategyTitle: "Una presencia local que explica, demuestra y convierte",
  strategyText: "Ordenamos la base técnica y el recorrido comercial para que la visibilidad llegue a páginas capaces de sostener una decisión real.",
  strategy: [
    { icon: Target, title: "Páginas por servicio", text: "Conectamos servicios, problemas y páginas intermedias para que cada visita tenga un recorrido comprensible." },
    { icon: MapPin, title: "Perfil local y cobertura", text: "Revisamos cómo encajan el perfil de Google, la zona atendida y las páginas locales sin inventar presencia física." },
    { icon: Search, title: "Demanda local", text: "Separamos búsquedas por servicio, ciudad e intención para priorizar oportunidades cercanas al contacto." },
    { icon: ClipboardList, title: "Contenido que da confianza", text: "Respondemos dudas, comparativas y objeciones antes de pedir datos o presupuesto." },
    { icon: Wrench, title: "Auditoría técnica", text: "Detectamos problemas de indexación, velocidad, estructura y rastreo que frenan el crecimiento." },
    { icon: BarChart3, title: "Leads y aprendizaje", text: "Medimos qué páginas y búsquedas acaban en formularios o llamadas para ajustar prioridades." },
  ],
  sectorsTitle: "La confianza se construye de forma distinta en cada sector",
  sectorsText: "Agrupamos la estrategia por tipo de decisión. Así la web muestra la información y las pruebas que cada cliente necesita antes de contactar.",
  sectors: [
    { icon: HeartPulse, title: "Salud, formación y estética", text: "Servicios, programas y expectativas se ordenan para reducir dudas antes de solicitar información.", example: "Ejemplos: clínicas, academias y centros de bienestar" },
    { icon: GraduationCap, title: "Legal, consultoría y B2B", text: "Páginas orientadas a problemas concretos, experiencia relevante y siguientes pasos verificables.", example: "Ejemplos: despachos y venta consultiva" },
    { icon: Building2, title: "Reformas, inmobiliaria y servicios locales", text: "Cobertura, tipo de proyecto y confianza se explican antes del presupuesto o la reserva.", example: "Ejemplos: construcción, hostelería y negocios de proximidad" },
  ],
  stages: [
    { title: "Auditoría de la web actual", text: "Revisamos técnica, contenido, formularios y señales de confianza para saber qué impide avanzar.", deliverable: "Diagnóstico priorizado" },
    { title: "Mapa de búsquedas locales", text: "Analizamos servicios, competidores e intención para separar tráfico curioso de demanda comercial.", deliverable: "Mapa de keywords e intención" },
    { title: "Páginas con función comercial", text: "Priorizamos servicios, problemas y comparativas antes de producir contenido genérico.", deliverable: "Plan de páginas por impacto" },
    { title: "Mejora de contenido y estructura", text: "Ajustamos mensajes, headings, enlaces y CTAs para que la oferta resulte más clara.", deliverable: "Optimización implementada" },
    { title: "Medición de contactos reales", text: "Cruzamos visibilidad, tráfico y leads para decidir el siguiente ciclo de trabajo.", deliverable: "Aprendizajes y próximas acciones" },
  ],
  comparison: [
    { icon: Megaphone, title: "Ads da velocidad", text: "Ayuda a aparecer rápido y aprender qué servicios, mensajes y búsquedas generan respuesta comercial." },
    { icon: Home, title: "SEO local crea base", text: "Construye páginas que pueden captar demanda relevante sin depender siempre del coste por clic." },
    { icon: ShieldCheck, title: "La confianza convierte", text: "Contenido, prueba y claridad pesan especialmente cuando la decisión no se toma en una sola visita." },
  ],
  related: [
    { href: "/seo", title: "Agencia SEO", text: "La visión nacional del servicio: técnica, contenidos, arquitectura y medición." },
    { href: "/seo-para-pymes", title: "SEO para pymes", text: "Prioridades claras para empresas que no necesitan una lista infinita de tareas." },
    { href: "/agencia-marketing-digital/google-ads", title: "Google Ads", text: "Demanda inmediata para aprender mientras se construye la base orgánica." },
    { href: "/diseno-pagina-web-profesional", title: "Diseño web", text: "Cuando el bloqueo también está en explicar y convertir mejor la oferta." },
  ],
  relatedCities: [
    { href: "/seo/madrid", title: "Madrid" },
    { href: "/seo/barcelona", title: "Barcelona" },
    { href: "/seo/valencia", title: "Valencia" },
  ],
};

export default function SeoSevillaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <SeoCityLanding content={cityContent} faqs={faqs} />
    </>
  );
}
