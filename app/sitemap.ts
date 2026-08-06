import type { MetadataRoute } from "next";

const baseUrl = "https://crecimientosincomplicaciones.com";

const routes = [
  { path: "/", priority: 1 },
  { path: "/diseno-pagina-web-profesional", priority: 0.9 },
  { path: "/gestion-redes-sociales-empresas", priority: 0.9 },
  { path: "/soluciones-inteligencia-artificial-empresas", priority: 0.9 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${baseUrl}${route.path === "/" ? "" : route.path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route.priority,
  }));
}
