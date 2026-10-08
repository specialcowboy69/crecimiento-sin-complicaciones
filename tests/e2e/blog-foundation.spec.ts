import { expect, test } from "@playwright/test";

test("empty blog stays closed to visitors and search engines", async ({ page }) => {
  for (const route of [
    "/blog",
    "/blog/cualquier-articulo",
    "/blog/que-es-core-web-vital",
    "/blog/que-es-topic-cluster",
  ]) {
    const response = await page.goto(route, { waitUntil: "domcontentloaded" });
    expect(response?.status(), route).toBe(404);
    const robots = await page
      .locator('meta[name="robots"]')
      .evaluateAll((elements) => elements.map((element) => element.getAttribute("content") ?? ""));
    expect(robots.length, route).toBeGreaterThan(0);
    expect(robots.every((content) => /noindex/i.test(content)), route).toBe(true);
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
  }
});

test("technical SEO page no longer renders links to unpublished articles", async ({ page }) => {
  const response = await page.goto(
    "/agencia-marketing-digital/seo-tecnico-arquitectura-entidades",
    { waitUntil: "domcontentloaded" },
  );

  expect(response?.status()).toBe(200);
  await expect(page.locator('a[href="/blog/que-es-core-web-vital"]')).toHaveCount(0);
  await expect(page.locator('a[href="/blog/que-es-topic-cluster"]')).toHaveCount(0);
});

test("closed blog stays out of navigation and sitemap", async ({ page, request }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.locator('a[href^="/blog"]')).toHaveCount(0);

  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  expect(await sitemap.text()).not.toContain("/blog");
});
