import { expect, test } from "@playwright/test";

const origin = "https://www.crecimientosincomplicaciones.com";
const organizationId = `${origin}/#organization`;
const pages = [
  { route: "/agencia-marketing-digital", faqs: 5, audit: true },
  { route: "/seo-para-pymes", faqs: 6, audit: true },
  { route: "/agencia-marketing-digital/google-ads", faqs: 7, audit: true },
  { route: "/agencia-marketing-digital/google-ads/alicante", faqs: 8, audit: false },
  { route: "/diseno-landing-pages", faqs: 6, audit: false },
  { route: "/seo", faqs: 6, audit: true },
  { route: "/seo/local", faqs: 0, audit: false },
];

type Node = Record<string, unknown>;
function nodesIn(value: unknown): Node[] {
  if (Array.isArray(value)) return value.flatMap(nodesIn);
  if (!value || typeof value !== "object") return [];
  const node = value as Node;
  return [node, ...Object.values(node).flatMap(nodesIn)];
}
function text(value: unknown): string {
  return String(value).replace(/\s+/g, " ").trim();
}

for (const { route, faqs, audit } of pages) {
  test(`published service graph and visible content agree: ${route}`, async ({ page, request }, testInfo) => {
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    const canonical = `${origin}${route}`;
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", canonical);
    const sources = await page.locator('script[type="application/ld+json"]').allTextContents();
    expect(sources.length).toBeGreaterThan(0);
    // Parsing the actual rendered scripts also catches invalid JSON and unsafe serialization.
    const schemas: unknown[] = sources.map((source) => JSON.parse(source));
    const nodes = nodesIn(schemas);
    const definitions = nodes.filter((node) => node["@type"]);
    const ids = new Set(definitions.map((node) => node["@id"]).filter(Boolean));
    const references = nodes.filter((node) => node["@id"] && !node["@type"]);
    for (const reference of references) expect(ids.has(reference["@id"]), `Unresolved ${reference["@id"]}`).toBe(true);

    const service = definitions.find((node) => node["@id"] === `${canonical}#service`)!;
    expect(service).toBeDefined();
    expect(service["@type"]).toBe("Service");
    expect(service.url).toBe(canonical);
    expect(service.provider).toEqual({ "@id": organizationId });
    for (const candidate of definitions.filter((node) => node["@type"] === "Service")) {
      expect(candidate).not.toHaveProperty("makesOffer");
    }
    expect(service.offers ?? {}).not.toHaveProperty("price", 0);

    const organization = definitions.find((node) => node["@id"] === organizationId && node.logo)!;
    expect(organization).toBeDefined();
    expect(organization.url).toBe(origin);
    await expect(page.locator(`a[href="tel:${organization.telephone}"]`).first()).toHaveCount(1);
    await expect(page.locator(`a[href="mailto:${organization.email}"]`).first()).toHaveCount(1);
    const logo = organization.logo as Node;
    expect(logo["@type"]).toBe("ImageObject");
    expect(Number(logo.width)).toBeGreaterThanOrEqual(112);
    expect(Number(logo.height)).toBeGreaterThanOrEqual(112);
    const logoResponse = await request.get(new URL(String(logo.url)).pathname);
    expect(logoResponse.status()).toBe(200);
    expect(logoResponse.headers()["content-type"]).toContain("image/svg+xml");
    expect(await logoResponse.text()).toContain('width="256" height="256"');

    const auditService = definitions.find((node) => node["@id"] === `${canonical}#audit`);
    if (audit) {
      expect(auditService).toBeDefined();
      expect(auditService?.["@type"]).toBe("Service");
      expect(auditService?.provider).toEqual({ "@id": organizationId });
      const offer = auditService?.offers as Node;
      expect(offer).toMatchObject({ "@type": "Offer", price: 0, priceCurrency: "EUR", seller: { "@id": organizationId }, itemOffered: { "@id": `${canonical}#audit` } });
      expect(offer.url).toBe(`${canonical}#audit-request`);
      await expect(page.locator("#audit-request")).toHaveCount(1);
      await expect(page.locator("#audit-request")).toContainText(/auditoría.*gratuita/i);
    } else {
      expect(auditService).toBeUndefined();
    }
    const freeOffers = definitions.filter((node) => node["@type"] === "Offer" && node.price === 0);
    expect(freeOffers).toHaveLength(audit ? 1 : 0);

    const breadcrumb = definitions.filter((node) => node["@type"] === "BreadcrumbList");
    expect(breadcrumb).toHaveLength(1);
    const crumbs = breadcrumb[0].itemListElement as Node[];
    expect(crumbs.map((crumb) => crumb.position)).toEqual(crumbs.map((_, index) => index + 1));
    expect(crumbs.at(-1)?.item).toBe(canonical);
    for (const crumb of crumbs) {
      const url = new URL(String(crumb.item));
      expect(url.origin).toBe(origin);
      expect(url.pathname === "/" || !url.pathname.endsWith("/")).toBe(true);
    }

    const faqPages = definitions.filter((node) => node["@type"] === "FAQPage");
    expect(faqPages).toHaveLength(faqs ? 1 : 0);
    const questions = (faqPages[0]?.mainEntity ?? []) as Node[];
    expect(questions).toHaveLength(faqs);
    for (const question of questions) {
      const summary = page.locator("details summary").filter({ hasText: String(question.name) });
      await expect(summary).toHaveCount(1);
      const answer = question.acceptedAnswer as Node;
      expect(text(await summary.locator("..").textContent())).toContain(text(answer.text));
    }
    for (const forbidden of ["LocalBusiness", "Review", "AggregateRating"]) {
      expect(definitions.some((node) => node["@type"] === forbidden)).toBe(false);
    }
    await testInfo.attach("rendered-schema.json", { body: JSON.stringify(schemas, null, 2), contentType: "application/json" });
  });
}
