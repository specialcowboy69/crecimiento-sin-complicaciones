import { expect, test } from "@playwright/test";

const articles = [
  {
    slug: "como-ampliar-tematica-web-sin-perder-foco-seo",
    title: "Cómo ampliar la temática de una web sin perder el foco SEO",
  },
  {
    slug: "como-lanzar-una-web-nueva-sin-comprometer-seo",
    title: "Cómo lanzar una web nueva sin comprometer su SEO",
  },
  {
    slug: "domain-rating-como-evaluar-backlinks",
    title: "Domain Rating: qué mide y cómo evaluar un backlink de verdad",
  },
];

test("blog and three articles are public, indexable, and display their covers", async ({ page }) => {
  const blog = await page.goto("/blog", { waitUntil: "domcontentloaded" });
  expect(blog?.status()).toBe(200);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://www.crecimientosincomplicaciones.com/blog",
  );
  await expect(page.locator('link[rel="alternate"][type="application/rss+xml"]')).toHaveAttribute(
    "href",
    "https://www.crecimientosincomplicaciones.com/blog/feed.xml",
  );
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /index, follow/i);
  expect(await page.locator('article h2 a[href^="/blog/"]').count()).toBeGreaterThanOrEqual(3);

  for (const article of articles) {
    const response = await page.goto(`/blog/${article.slug}`, { waitUntil: "domcontentloaded" });
    expect(response?.status(), article.slug).toBe(200);
    await expect(page.locator("h1")).toHaveText(article.title);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      `https://www.crecimientosincomplicaciones.com/blog/${article.slug}`,
    );
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /index, follow/i);
    await expect(page.locator("article time").first()).toHaveAttribute("datetime", "2026-10-08");
    const cover = page.locator("article img").first();
    await expect(cover).toBeVisible();
    await expect.poll(() => cover.evaluate((image: HTMLImageElement) => image.naturalWidth)).toBeGreaterThan(0);
  }
});

test("unknown articles stay 404 and noindex", async ({ page }) => {
  for (const route of [
    "/blog/cualquier-articulo",
    "/blog/que-es-core-web-vital",
    "/blog/que-es-topic-cluster",
  ]) {
    const response = await page.goto(route, { waitUntil: "domcontentloaded" });
    expect(response?.status(), route).toBe(404);
    const robots = await page.locator('meta[name="robots"]').evaluateAll((elements) =>
      elements.map((element) => element.getAttribute("content") ?? ""),
    );
    expect(robots.length, route).toBeGreaterThan(0);
    expect(robots.every((content) => /noindex/i.test(content)), route).toBe(true);
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
  }
});

test("SEO category is indexable and empty categories stay unpublished", async ({ page }) => {
  await page.goto("/blog", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("navigation", { name: "Categorías del blog" })
    .getByRole("link", { name: "SEO" })).toBeVisible();
  await expect(page.locator('a[href="/blog/categoria/google-ads"]')).toHaveCount(0);

  const category = await page.goto("/blog/categoria/seo", { waitUntil: "domcontentloaded" });
  expect(category?.status()).toBe(200);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("SEO");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://www.crecimientosincomplicaciones.com/blog/categoria/seo",
  );
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /index, follow/i);
  await expect(page.locator('article h2 a[href^="/blog/"]')).toHaveCount(3);
  await expect(page.getByRole("navigation", { name: "Categorías del blog" })
    .getByRole("link", { name: "Todos" })).toBeVisible();

  await page.goto(`/blog/${articles[0].slug}`, { waitUntil: "domcontentloaded" });
  await expect(page.locator('article header a[href="/blog/categoria/seo"]')).toBeVisible();

  for (const route of ["/blog/categoria/google-ads", "/blog/categoria/desconocida"]) {
    const response = await page.goto(route, { waitUntil: "domcontentloaded" });
    expect(response?.status(), route).toBe(404);
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
    const robots = await page.locator('meta[name="robots"]').evaluateAll((elements) =>
      elements.map((element) => element.getAttribute("content") ?? ""),
    );
    expect(robots.length, route).toBeGreaterThan(0);
    expect(robots.every((content) => /noindex/i.test(content)), route).toBe(true);
  }
});

test("navigation, sitemap and RSS expose only the published blog", async ({ page, request }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.locator('a[href="/blog"]').first()).toBeVisible();

  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  const sitemapXml = await sitemap.text();
  expect(sitemapXml).toContain("https://www.crecimientosincomplicaciones.com/blog</loc>");
  expect(sitemapXml).toContain("https://www.crecimientosincomplicaciones.com/blog/categoria/seo</loc>");
  expect(sitemapXml).not.toContain("/blog/categoria/google-ads</loc>");
  for (const article of articles) {
    expect(sitemapXml).toContain(`https://www.crecimientosincomplicaciones.com/blog/${article.slug}</loc>`);
  }

  const feed = await request.get("/blog/feed.xml");
  expect(feed.status()).toBe(200);
  expect(feed.headers()["content-type"]).toContain("application/rss+xml");
  expect((await feed.text()).match(/<item>/g)?.length ?? 0).toBeGreaterThanOrEqual(3);
});

test("mobile blog header keeps the logo without a cramped audit CTA", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/blog", { waitUntil: "domcontentloaded" });

  await expect(page.locator('header .logo-link')).toBeVisible();
  await expect(page.locator('header a[href="/#auditoria"]')).toBeHidden();

  for (const route of ["/blog", "/blog/categoria/seo", ...articles.map((article) => `/blog/${article.slug}`)]) {
    await page.goto(route, { waitUntil: "domcontentloaded" });
    const widths = await page.evaluate(() => ({
      document: document.documentElement.scrollWidth,
      viewport: window.innerWidth,
    }));
    expect(widths.document, route).toBeLessThanOrEqual(widths.viewport);
  }
});
