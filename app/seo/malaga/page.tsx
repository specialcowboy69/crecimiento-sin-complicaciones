import type { Metadata } from "next";
import { BarChart3, Building2, CalendarDays, ClipboardList, Globe2, Home, Hotel, MapPin, Megaphone, Search, Target, Wrench } from "lucide-react";
import { SeoCityLanding, type SeoCityContent } from "../_components/SeoCityLanding";

const faqs = [
  {
    question: "¿Trabajáis con empresas de Málaga aunque no tengáis oficina física allí?",
    answer:
      "Sí. Podemos trabajar con empresas ubicadas en Málaga y también con negocios que venden a clientes de Málaga o la Costa del Sol. Si no hay sede física, cuidamos el mensaje para hablar de servicios para empresas de Málaga sin afirmar una presencia local falsa.",
  },
  {
    question: "¿Tiene sentido hacer SEO local en Málaga?",
    answer:
      "Sí, especialmente en sectores como turismo, inmobiliaria, salud, formación, reformas, servicios profesionales, hostelería y negocios premium. Muchas búsquedas tienen intención local y el usuario compara antes de contactar.",
  },
  {
    question: "¿Puedo posicionar también en Marbella, Fuengirola o Torremolinos?",
    answer:
      "Sí, pero primero hay que validar demanda e intención. No conviene crear páginas por municipio si solo cambian el nombre de la localidad. Es mejor empezar con una página fuerte para Málaga y después ampliar a zonas con contenido propio.",
  },
  {
    question: "¿Cuánto tarda el SEO para una empresa en Málaga?",
    answer:
      "Depende del estado de la web, la competencia y la estacionalidad del sector. Algunas mejoras técnicas pueden notarse antes, pero una estrategia SEO consistente suele necesitar entre 3 y 6 meses para mostrar señales claras.",
  },
  {
    question: "¿Es mejor SEO o Google Ads para captar clientes en Málaga?",
    answer:
      "Depende del momento. Google Ads puede aportar visibilidad inmediata y datos rápidos. El SEO construye captación orgánica a medio plazo. En mercados competitivos o estacionales, combinarlos suele ser la vía más inteligente.",
  },
  {
    question: "¿Podéis trabajar sobre mi web actual?",
    answer:
      "Sí. Primero revisamos si tu web actual tiene una base técnica y comercial suficiente. Si se puede mejorar, trabajamos sobre ella. Si limita la captación, planteamos ajustes de estructura, contenido o diseño orientados a SEO y conversión.",
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
        name: "SEO Málaga",
        item: "https://www.crecimientosincomplicaciones.com/seo/malaga",
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Agencia SEO para empresas de Málaga",
    serviceType: ["SEO Málaga", "Consultoría SEO Málaga", "SEO local Málaga", "Posicionamiento web Málaga"],
    provider: {
      "@type": "Organization",
      name: "Crecimiento sin complicaciones",
      url: "https://www.crecimientosincomplicaciones.com",
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Málaga",
    },
    description:
      "Servicios SEO para empresas de Málaga con auditoría SEO gratuita, SEO técnico, contenidos, arquitectura web y SEO local orientado a captar clientes.",
    makesOffer: {
      "@type": "Offer",
      name: "Auditoría SEO gratuita para empresas de Málaga",
      availability: "https://schema.org/InStock",
      url: "https://www.crecimientosincomplicaciones.com/seo/malaga",
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
  title: "Agencia SEO para empresas de Málaga | Crecimiento sin complicaciones",
  description:
    "Servicios SEO para empresas de Málaga. Auditoría SEO gratuita, SEO técnico, contenidos, arquitectura web y SEO local para captar clientes desde Google.",
  keywords: [
    "agencia seo malaga",
    "seo malaga",
    "servicios seo malaga",
    "consultoría seo malaga",
    "seo local malaga",
    "posicionamiento web malaga",
    "seo para empresas en malaga",
  ],
  alternates: {
    canonical: "/seo/malaga",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Agencia SEO para empresas de Málaga",
    description:
      "Auditoría SEO, SEO técnico, contenidos, arquitectura web y SEO local para captar clientes desde Google.",
    url: "/seo/malaga",
    siteName: "Crecimiento sin complicaciones",
    locale: "es_ES",
    type: "website",
  },
};

const cityContent: SeoCityContent = {
  city: "Málaga",
  slug: "malaga",
  sourcePage: "SEO Málaga",
  heroAlt: "Centro, catedral y puerto de Málaga vistos desde Gibralfaro",
  description: "Una estrategia SEO para captar demanda en Málaga y valorar la Costa del Sol con páginas útiles, cobertura real y prioridades comerciales claras.",
  diagnosisTitle: "Prepara tus páginas para la demanda que quieres captar",
  diagnosisText: "No todas las búsquedas necesitan una página nueva ni todos los negocios tienen el mismo calendario. Priorizamos cobertura, intención y momento comercial.",
  problems: [
    { icon: MapPin, title: "Cobertura poco creíble", text: "La web menciona muchas zonas, pero no explica dónde presta servicio ni qué cambia para cada cliente." },
    { icon: CalendarDays, title: "Calendario sin preparación", text: "Cuando existe estacionalidad, el contenido llega tarde si se publica después de que la demanda haya subido." },
    { icon: Target, title: "Intención mezclada", text: "Turismo, residencial y servicios comparten términos, aunque el usuario espera respuestas y recorridos distintos." },
  ],
  strategyTitle: "Un plan local preparado para el momento en que llega la demanda",
  strategyText: "Construimos primero la base que sostiene la captación y ampliamos zonas o contenidos cuando existe una intención que merece una respuesta propia.",
  strategy: [
    { icon: Search, title: "Demanda por intención", text: "Separamos servicio, ciudad, provincia y temporada para priorizar búsquedas con opción real de contacto." },
    { icon: Target, title: "Páginas de decisión", text: "Ordenamos servicios, ubicaciones y páginas intermedias para responder a comparaciones cercanas al contacto." },
    { icon: Wrench, title: "Auditoría técnica", text: "Revisamos indexación, velocidad, arquitectura y rastreo antes de añadir páginas." },
    { icon: ClipboardList, title: "Contenido útil", text: "Creamos páginas que explican oferta, contexto y siguiente paso con suficiente profundidad." },
    { icon: MapPin, title: "SEO local verificable", text: "Representamos la cobertura real del negocio sin inventar sedes ni presencia física." },
    { icon: BarChart3, title: "Conversión y calendario", text: "Medimos formularios y señales de demanda; cuando hay estacionalidad, la incorporamos al siguiente ciclo." },
  ],
  market: {
    id: "costa-del-sol",
    title: "Costa del Sol: ampliar solo cuando hay una oportunidad real",
    items: [
      { icon: MapPin, title: "Cobertura que puedes atender", text: "Definimos las zonas donde el negocio presta servicio de verdad y cómo cambia la propuesta." },
      { icon: Search, title: "Demanda que merece una página", text: "Validamos intención y volumen relativo antes de dividir autoridad entre nuevas ubicaciones." },
      { icon: Globe2, title: "Contenido propio por mercado", text: "Cada expansión necesita argumentos, casos de uso y recorrido relevantes, no solo otro nombre de ciudad." },
    ],
  },
  sectorsTitle: "La intención local no se comporta igual en todos los negocios",
  sectorsText: "Agrupamos sectores por su forma de captar demanda para diseñar páginas, tiempos y llamadas a la acción adecuados.",
  sectors: [
    { icon: Hotel, title: "Turismo y alojamiento", text: "Destino, disponibilidad e idioma deben conducir a páginas capaces de resolver una decisión concreta.", example: "Ejemplos: hoteles, experiencias y restauración" },
    { icon: Building2, title: "Inmobiliario y reformas", text: "Ubicación, tipo de proyecto y confianza se conectan con recorridos de comparación más consultivos.", example: "Ejemplos: vivienda, rehabilitación y construcción" },
    { icon: Home, title: "Salud, formación y servicios profesionales", text: "Priorizamos problemas, especialidad, cobertura y contacto para búsquedas cercanas a una consulta.", example: "Ejemplos: clínicas, academias, consultoría y B2B" },
  ],
  stages: [
    { title: "Auditoría técnica y comercial", text: "Localizamos bloqueos de indexación, estructura, contenido y conversión en la web actual.", deliverable: "Diagnóstico y prioridades" },
    { title: "Mapa de demanda y calendario", text: "Ordenamos búsquedas por servicio, zona e intención; añadimos la temporada cuando afecta al negocio.", deliverable: "Mapa de oportunidades" },
    { title: "Arquitectura de servicios y zonas", text: "Definimos qué páginas deben concentrar autoridad y cuáles necesitan contenido propio.", deliverable: "Mapa de URLs recomendado" },
    { title: "Optimización y publicación", text: "Mejoramos páginas, mensajes, enlazado y CTAs siguiendo el orden acordado.", deliverable: "Cambios implementados" },
    { title: "Medición y siguiente ciclo", text: "Leemos visibilidad, tráfico cualificado y formularios para preparar las siguientes prioridades.", deliverable: "Informe y nuevas prioridades" },
  ],
  comparison: [
    { icon: Megaphone, title: "Ads activa demanda inmediata", text: "Puede dar visibilidad rápida y datos útiles durante periodos comerciales concretos." },
    { icon: Home, title: "SEO construye continuidad", text: "Deja páginas preparadas para captar cuando el usuario vuelve a buscar sin pagar cada clic." },
    { icon: CalendarDays, title: "El calendario coordina ambos", text: "Cuando el negocio es estacional, preparamos contenido con tiempo y activamos campañas cuando conviene acelerar." },
  ],
  related: [
    { href: "/seo", title: "Agencia SEO", text: "La estrategia nacional que conecta técnica, contenido y medición." },
    { href: "/seo-para-pymes", title: "SEO para pymes", text: "Un enfoque para priorizar acciones con impacto y recursos realistas." },
    { href: "/agencia-marketing-digital/google-ads", title: "Google Ads", text: "Campañas para activar demanda mientras el SEO consolida la base orgánica." },
  ],
  relatedCities: [
    { href: "/seo/madrid", title: "Madrid" },
    { href: "/seo/barcelona", title: "Barcelona" },
    { href: "/seo/valencia", title: "Valencia" },
    { href: "/seo/sevilla", title: "Sevilla" },
    { href: "/seo/alicante", title: "Alicante" },
  ],
  sectionLinks: [
    { label: "Estrategia", href: "#estrategia" },
    { label: "Sectores", href: "#sectores" },
    { label: "Costa del Sol", href: "#costa-del-sol" },
    { label: "FAQ", href: "#faq" },
  ],
};

export default function SeoMalagaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <SeoCityLanding content={cityContent} faqs={faqs} />
    </>
  );
}
