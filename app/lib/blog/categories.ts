import type { BlogCategory, BlogCategorySlug } from "./types";

export const MINIMUM_BLOG_POSTS = 3;
export const MINIMUM_CATEGORY_POSTS = 1;
export const POSTS_PER_PAGE = 12;

export const BLOG_CATEGORY_SLUGS = [
  "seo",
  "google-ads",
  "web-y-conversion",
  "contenidos-y-redes",
  "ia-y-automatizacion",
] as const satisfies readonly BlogCategorySlug[];

export const BLOG_CATEGORIES: Record<BlogCategorySlug, BlogCategory> = {
  seo: {
    slug: "seo",
    name: "SEO",
    description: "Estrategia, arquitectura y crecimiento orgánico sostenible.",
    relatedService: "/seo",
  },
  "google-ads": {
    slug: "google-ads",
    name: "Google Ads",
    description: "Captación de demanda, medición y optimización de campañas.",
    relatedService: "/agencia-marketing-digital/google-ads",
  },
  "web-y-conversion": {
    slug: "web-y-conversion",
    name: "Web y conversión",
    description: "Diseño web, experiencia de usuario y conversión comercial.",
    relatedService: "/diseno-pagina-web-profesional",
  },
  "contenidos-y-redes": {
    slug: "contenidos-y-redes",
    name: "Contenidos y redes",
    description: "Contenido útil, distribución y presencia de marca.",
    relatedService: "/gestion-redes-sociales-empresas",
  },
  "ia-y-automatizacion": {
    slug: "ia-y-automatizacion",
    name: "IA y automatización",
    description: "Sistemas inteligentes para operaciones y crecimiento.",
    relatedService: "/soluciones-inteligencia-artificial-empresas",
  },
};

export const APPROVED_RELATED_SERVICES = [
  "/seo",
  "/agencia-marketing-digital/google-ads",
  "/diseno-pagina-web-profesional",
  "/gestion-redes-sociales-empresas",
  "/soluciones-inteligencia-artificial-empresas",
] as const;
