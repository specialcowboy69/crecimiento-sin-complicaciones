import { expect, test } from "@playwright/test";

test("Google Ads uses an image-led hero without secondary page navigation", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/agencia-marketing-digital/google-ads", { waitUntil: "domcontentloaded" });

  const hero = page.locator("main > section").first();
  const image = hero.locator('img[src*="google-ads-hero-editorial.webp"]');

  await expect(page.getByRole("heading", { level: 1, name: /Agencia Google Ads/ })).toBeVisible();
  await expect(hero.getByRole("link", { name: "Solicitar auditoría gratuita" })).toHaveAttribute(
    "href",
    "#auditoria-google-ads",
  );
  await expect(page.getByRole("navigation", { name: "Páginas principales" })).toHaveCount(0);
  await expect(hero).not.toContainText("Sistema Ads");
  await expect(image).toBeVisible();
  await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.naturalWidth)).toBeGreaterThan(0);
  const box = await image.boundingBox();
  expect(box?.width).toBeGreaterThanOrEqual(1439);
});

test("national SEO hero and contact details remain readable", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/seo", { waitUntil: "domcontentloaded" });

  const hero = page.locator("main > section").first();
  const image = hero.locator('img[src*="seo-hero-editorial.webp"]');
  await expect(page.getByRole("heading", { level: 1, name: /Agencia SEO para empresas/ })).toBeVisible();
  await expect(hero.getByRole("link", { name: "Solicitar auditoría SEO gratuita" })).toHaveAttribute(
    "href",
    "#auditoria-seo",
  );
  await expect(image).toBeVisible();
  await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.naturalWidth)).toBeGreaterThan(0);
  await expect(page.locator(".contact-options")).not.toHaveClass(/contact-options-dark/);
  await expect(page.locator('.contact-options a[href="tel:+34604990651"]')).toBeVisible();
  await expect(page.locator('.contact-options a[href="mailto:info@crecimientosincomplicaciones.com"]')).toBeVisible();

  await page.goto("/seo/madrid", { waitUntil: "domcontentloaded" });
  await expect(page.locator(".contact-options")).toHaveClass(/contact-options-dark/);
});

test("SEO editorial flow is responsive and links to the live technical service", async ({ page }) => {
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/seo", { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("heading", { level: 2, name: "Cuatro piezas que trabajan juntas" })).toBeVisible();
    await expect(page.getByRole("heading", { level: 2, name: "Del diagnóstico a la siguiente decisión" })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(0);
  }

  const technical = page.getByRole("link", { name: "Ver SEO técnico y arquitectura" });
  await expect(technical).toHaveAttribute("href", "/agencia-marketing-digital/seo-tecnico-arquitectura-entidades");
  const response = await page.request.get("/agencia-marketing-digital/seo-tecnico-arquitectura-entidades");
  expect(response.status()).toBe(200);
});

test("Landing Pages has a photographic hero and no duplicate navigation", async ({ page }) => {
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: width === 390 ? 844 : 900 });
    await page.goto("/diseno-landing-pages", { waitUntil: "domcontentloaded" });
    const hero = page.locator("main > section").first();
    const image = hero.locator('img[src*="landing-pages-hero-editorial.webp"]');
    await expect(page.getByRole("heading", { level: 1, name: /Diseño de landing pages/ })).toBeVisible();
    await expect(hero.getByRole("link", { name: "Solicitar auditoría gratuita" })).toHaveAttribute(
      "href",
      "#auditoria-landing-pages-form",
    );
    await expect(page.getByRole("navigation", { name: "Páginas principales" })).toHaveCount(0);
    await expect(image).toBeVisible();
    await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.naturalWidth)).toBeGreaterThan(0);
    expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(0);
  }
});

test("Landing Pages anatomy and solution remain legible on narrow and wide screens", async ({ page }) => {
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/diseno-landing-pages", { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("heading", { level: 2, name: "Una landing bonita no siempre convierte" })).toBeVisible();
    await expect(page.getByRole("heading", { level: 2, name: "Una página que conecta mensaje, acción y aprendizaje" })).toBeVisible();
    await expect(page.locator("#problema figure")).toContainText("04 / Medición");
    expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(0);
  }
});
