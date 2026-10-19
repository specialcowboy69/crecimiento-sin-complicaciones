import { expect, test } from "@playwright/test";

const origin = "https://www.crecimientosincomplicaciones.com";
const organizationId = origin + "/#organization";
const technical = "/agencia-marketing-digital/seo-tecnico-arquitectura-entidades";
const cities = ["madrid", "barcelona", "valencia", "sevilla", "alicante", "malaga"];
const freeRoutes = [...cities.map(city => "/seo/" + city), "/diseno-pagina-web-profesional/empresas", "/diseno-pagina-web-profesional/valencia", "/soluciones-inteligencia-artificial-empresas"];
const paidRoutes = ["/diseno-pagina-web-profesional", "/gestion-redes-sociales-empresas"];
const articleRoutes = ["/blog/como-ampliar-tematica-web-sin-perder-foco-seo", "/blog/como-lanzar-una-web-nueva-sin-comprometer-seo", "/blog/domain-rating-como-evaluar-backlinks"];
const noindexRoutes = [technical, "/politica-de-cookies", "/politica-de-privacidad"];
const routes = ["/", "/sobre-nosotros", ...cities.map(city => "/seo/" + city), ...paidRoutes, "/diseno-pagina-web-profesional/empresas", "/diseno-pagina-web-profesional/valencia", "/soluciones-inteligencia-artificial-empresas", "/blog", "/blog/categoria/seo", ...articleRoutes, ...noindexRoutes];
const faqCounts: Record<string, number> = {
  "/": 3, ...Object.fromEntries(cities.map(city => ["/seo/" + city, 6])),
  "/diseno-pagina-web-profesional": 4, "/diseno-pagina-web-profesional/empresas": 5,
  "/diseno-pagina-web-profesional/valencia": 5, "/gestion-redes-sociales-empresas": 4,
  "/soluciones-inteligencia-artificial-empresas": 4, [technical]: 3,
};
type Node = Record<string, unknown>;
function nodesIn(value: unknown): Node[] {
  if (Array.isArray(value)) return value.flatMap(nodesIn);
  if (!value || typeof value !== "object") return [];
  const node = value as Node;
  return [node, ...Object.values(node).flatMap(nodesIn)];
}
const normalize = (value: unknown) => String(value).replace(/\s+/g, " ").trim();
const definitionsAcrossSite = new Set<unknown>();

test.beforeAll(async ({ request }) => {
  for (const route of routes) {
    const response = await request.get(route);
    expect(response.status(), route).toBe(200);
    const html = await response.text();
    const scripts = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)];
    for (const source of scripts) {
      for (const node of nodesIn(JSON.parse(source[1]))) {
        if (node["@type"] && node["@id"]) definitionsAcrossSite.add(node["@id"]);
      }
    }
  }
});

for (const route of routes) {
  test("remaining public page schema: " + route, async ({ page, request }, testInfo) => {
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    const canonical = origin + (route === "/" ? "" : route);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", canonical);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", noindexRoutes.includes(route) ? "noindex, follow" : "index, follow");
    const sources = await page.locator('script[type="application/ld+json"]').allTextContents();
    const schemas = sources.map(source => JSON.parse(source));
    const nodes = nodesIn(schemas);
    const definitions = nodes.filter(node => node["@type"]);
    for (const reference of nodes.filter(node => node["@id"] && !node["@type"])) {
      expect(definitionsAcrossSite.has(reference["@id"]), "Unresolved reference: " + reference["@id"]).toBe(true);
    }
    const organizations = definitions.filter(node => node["@type"] === "Organization");
    expect(organizations).toHaveLength(1);
    expect(organizations[0]["@id"]).toBe(organizationId);
    expect(organizations[0]).not.toHaveProperty("serviceType");
    for (const node of definitions) {
      expect(["ProfessionalService", "LocalBusiness", "AggregateRating", "Review"]).not.toContain(node["@type"]);
      if (node["@type"] === "Service") {
        expect(node).not.toHaveProperty("makesOffer");
        expect(node).not.toHaveProperty("about");
        expect(node).not.toHaveProperty("sameAs");
      }
    }
    const isService = [...freeRoutes, ...paidRoutes, technical].includes(route);
    if (isService) {
      const service = definitions.find(node => node["@id"] === canonical + "#service");
      expect(service).toMatchObject({ "@type": "Service", url: canonical, provider: { "@id": organizationId } });
      if (paidRoutes.includes(route)) {
        const offers = service?.offers as Node[];
        expect(offers).toHaveLength(3);
        for (const offer of offers) {
          expect(offer).toMatchObject({ "@type": "Offer", seller: { "@id": organizationId }, itemOffered: { "@id": canonical + "#service" }, url: canonical });
          expect(offer).not.toHaveProperty("price");
          await expect(page.getByRole("heading", { name: String(offer.name), exact: true })).toHaveCount(1);
        }
      } else {
        expect(service).not.toHaveProperty("offers");
      }
    }
    const audit = definitions.find(node => node["@id"] === canonical + "#audit");
    const free = freeRoutes.includes(route);
    if (free || route === technical) {
      expect(audit).toMatchObject({ "@type": "Service", provider: { "@id": organizationId } });
      const offer = audit?.offers as Node;
      expect(offer).toMatchObject({ "@type": "Offer", seller: { "@id": organizationId }, itemOffered: { "@id": canonical + "#audit" } });
      const anchor = free ? "#audit-request" : "#auditoria-arquitectura";
      expect(audit?.url).toBe(canonical + anchor);
      expect(offer.url).toBe(canonical + anchor);
      await expect(page.locator(anchor)).toHaveCount(1);
      if (free) {
        expect(offer).toMatchObject({ price: 0, priceCurrency: "EUR" });
        await expect(page.locator(anchor)).toContainText(/auditoría.*gratuita/i);
      } else {
        expect(offer).not.toHaveProperty("price");
        expect(offer).not.toHaveProperty("priceCurrency");
        await expect(page.locator('a[href="#auditoria-arquitectura"]').first()).toContainText(/auditoría/i);
      }
    } else {
      expect(audit).toBeUndefined();
    }
    expect(definitions.filter(node => node["@type"] === "Offer" && node.price === 0)).toHaveLength(free ? 1 : 0);
    const faq = definitions.filter(node => node["@type"] === "FAQPage");
    const faqCount = faqCounts[route] ?? 0;
    expect(faq).toHaveLength(faqCount ? 1 : 0);
    const questions = (faq[0]?.mainEntity ?? []) as Node[];
    expect(questions).toHaveLength(faqCount);
    for (const question of questions) {
      const summary = page.locator("details summary").filter({ hasText: String(question.name) });
      await expect(summary).toHaveCount(1);
      expect(normalize(await summary.locator("..").textContent())).toContain(normalize((question.acceptedAnswer as Node).text));
    }
    const breadcrumbs = definitions.filter(node => node["@type"] === "BreadcrumbList");
    expect(breadcrumbs).toHaveLength(route === "/" || route.startsWith("/politica-de-") ? 0 : 1);
    for (const breadcrumb of breadcrumbs) {
      const items = breadcrumb.itemListElement as Node[];
      expect(items.map(item => item.position)).toEqual(items.map((_, index) => index + 1));
      expect(items.at(-1)?.item).toBe(canonical);
      for (const item of items) {
        expect(String(item.item).startsWith(origin)).toBe(true);
        expect(String(item.item).endsWith("/")).toBe(false);
      }
    }
    if (articleRoutes.includes(route)) {
      const article = definitions.find(node => node["@type"] === "BlogPosting")!;
      expect(article["@id"]).toBe(canonical + "#article");
      expect(article.author).toEqual({ "@id": organizationId });
      expect(article.publisher).toEqual({ "@id": organizationId });
      await expect(page.locator("h1")).toHaveText(String(article.headline));
      // Only the real calendar day is recorded. Do not fabricate a publication time.
      expect(article.datePublished).toBe("2026-10-08");
      expect(article).not.toHaveProperty("dateModified");
      await expect(page.locator("main > article > header time")).toHaveAttribute("datetime", String(article.datePublished));
      const imageResponse = await request.get(new URL(String(article.image)).pathname);
      expect(imageResponse.status()).toBe(200);
      expect(imageResponse.headers()["content-type"]).toContain("image/webp");
    }
    await testInfo.attach("rendered-schema.json", { body: JSON.stringify(schemas, null, 2), contentType: "application/json" });
  });
}
