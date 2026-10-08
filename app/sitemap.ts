import type { MetadataRoute } from "next";
import { hasPublishedBlog } from "./lib/blog/gates";
import { getProductionPublishedPosts } from "./lib/blog/production";
import { absoluteUrl } from "./lib/site";

const routes = [
  { path: "/", priority: 1 },
  { path: "/agencia-marketing-digital", priority: 0.9 },
  { path: "/sobre-nosotros", priority: 0.75 },
  { path: "/agencia-marketing-digital/google-ads", priority: 0.85 },
  { path: "/agencia-marketing-digital/google-ads/alicante", priority: 0.8 },
  { path: "/diseno-landing-pages", priority: 0.85 },
  { path: "/seo", priority: 0.9 },
  { path: "/seo/local", priority: 0.85 },
  { path: "/seo/madrid", priority: 0.85 },
  { path: "/seo/barcelona", priority: 0.85 },
  { path: "/seo/valencia", priority: 0.85 },
  { path: "/seo/sevilla", priority: 0.85 },
  { path: "/seo/alicante", priority: 0.85 },
  { path: "/seo/malaga", priority: 0.85 },
  { path: "/seo-para-pymes", priority: 0.85 },
  { path: "/diseno-pagina-web-profesional", priority: 0.9 },
  { path: "/diseno-pagina-web-profesional/empresas", priority: 0.85 },
  { path: "/diseno-pagina-web-profesional/valencia", priority: 0.85 },
  { path: "/gestion-redes-sociales-empresas", priority: 0.9 },
  { path: "/soluciones-inteligencia-artificial-empresas", priority: 0.9 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = routes.map((route) => ({
    url: absoluteUrl(route.path),
    changeFrequency: "monthly" as const,
    priority: route.priority,
  }));
  const posts = getProductionPublishedPosts();

  if (!hasPublishedBlog(posts)) {
    return staticEntries;
  }

  return [
    ...staticEntries,
    { url: absoluteUrl("/blog"), changeFrequency: "weekly", priority: 0.7 },
    ...posts.map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.65,
    })),
  ];
}
