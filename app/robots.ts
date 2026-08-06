import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://crecimientosincomplicaciones.com/sitemap.xml",
    host: "https://crecimientosincomplicaciones.com",
  };
}
