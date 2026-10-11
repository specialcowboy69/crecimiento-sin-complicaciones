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
    await expect(page.locator("#para-quien li")).toHaveCount(4);
    await expect(page.locator("#incluye article")).toHaveCount(4);
    await expect(page.locator("#proceso li")).toHaveCount(4);
    expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(0);
  }
});

test("commercial hero CTAs reach their audit heading below the sticky header", async ({ page }) => {
  const routes = [
    ["/agencia-marketing-digital/google-ads", "#auditoria-google-ads"],
    ["/seo", "#auditoria-seo"],
    ["/diseno-landing-pages", "#auditoria-landing-pages-form"],
  ] as const;

  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: width === 390 ? 844 : 900 });
    for (const [route, targetId] of routes) {
      await page.goto(route, { waitUntil: "domcontentloaded" });
      const reject = page.getByRole("button", { name: "Rechazar" });
      if (await reject.isVisible()) await reject.click();

      await page.locator("main > section").first().locator(`a[href="${targetId}"]`).click();
      await expect(page).toHaveURL(new RegExp(`${targetId}$`));
      const heading = page.locator(targetId).getByRole("heading").first();
      await expect(heading).toBeInViewport();
      const headingTop = await heading.evaluate((element) => element.getBoundingClientRect().top);
      const headerBottom = await page.locator("header").evaluate((element) => element.getBoundingClientRect().bottom);
      expect(headingTop, `${route} at ${width}px`).toBeGreaterThanOrEqual(headerBottom + 4);
      await expect(page.locator(".contact-options a[href='tel:+34604990651']")).toBeVisible();
      await expect(page.locator(".contact-options a[href='mailto:info@crecimientosincomplicaciones.com']")).toBeVisible();
      expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe("auto");
    }
  }
});

test("SEO contact links have readable contrast and the services menu supports keyboard escape", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/seo", { waitUntil: "domcontentloaded" });
  const contrast = await page.locator("#audit-request .contact-options a").first().evaluate((element) => {
    const channels = (value: string) => value.match(/\d+(?:\.\d+)?/g)?.slice(0, 3).map(Number) ?? [];
    const luminance = (rgb: number[]) => rgb.slice(0, 3).map((channel) => {
      const value = channel / 255;
      return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
    }).reduce((sum, value, index) => sum + value * [0.2126, 0.7152, 0.0722][index], 0);
    const foreground = channels(getComputedStyle(element).color);
    let background: number[] = [255, 255, 255];
    for (let node: Element | null = element; node; node = node.parentElement) {
      const color = getComputedStyle(node).backgroundColor;
      if (color !== "rgba(0, 0, 0, 0)" && color !== "transparent") {
        background = channels(color);
        break;
      }
    }
    const values = [luminance(foreground), luminance(background)].sort((a, b) => b - a);
    return (values[0] + 0.05) / (values[1] + 0.05);
  });
  expect(contrast).toBeGreaterThanOrEqual(4.5);

  const menu = page.locator(".landing-services-menu");
  await menu.locator("summary").focus();
  await page.keyboard.press("Enter");
  await expect(menu).toHaveAttribute("open", "");
  await page.keyboard.press("Escape");
  await expect(menu).not.toHaveAttribute("open", "");
  await expect(menu.locator("summary")).toBeFocused();
});

test("all three commercial hero images load without horizontal overflow", async ({ page }) => {
  const routes = [
    ["/agencia-marketing-digital/google-ads", "google-ads-hero-editorial.webp"],
    ["/seo", "seo-hero-editorial.webp"],
    ["/diseno-landing-pages", "landing-pages-hero-editorial.webp"],
  ] as const;

  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: width < 500 ? 844 : 900 });
    for (const [route, assetName] of routes) {
      await page.goto(route, { waitUntil: "domcontentloaded" });
      const image = page.locator("main > section").first().locator(`img[src*="${assetName}"]`);
      await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.naturalWidth)).toBeGreaterThan(0);
      expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth), `${route} at ${width}px`).toBeLessThanOrEqual(0);
      const title = page.getByRole("heading", { level: 1 });
      await expect(title).toBeVisible();
      expect((await title.boundingBox())?.width).toBeLessThanOrEqual(width);
    }
  }
});

test("each commercial hero keeps its CTA and the next section in the first viewport", async ({ page }) => {
  const routes = [
    ["/agencia-marketing-digital/google-ads", "#auditoria-google-ads"],
    ["/seo", "#auditoria-seo"],
    ["/diseno-landing-pages", "#auditoria-landing-pages-form"],
  ] as const;

  for (const [width, height] of [[390, 844], [1440, 900]]) {
    await page.setViewportSize({ width, height });
    for (const [route, target] of routes) {
      await page.goto(route, { waitUntil: "domcontentloaded" });
      const reject = page.getByRole("button", { name: "Rechazar" });
      if (await reject.isVisible()) await reject.click();

      const hero = page.locator("main > section").first();
      const cta = hero.locator(`a[href="${target}"]`);
      const next = page.locator("main > section").nth(1);
      const ctaBox = await cta.boundingBox();
      const nextBox = await next.boundingBox();
      const bottomBar = width < 500 ? 80 : 0;
      expect(ctaBox, `${route} CTA at ${width}px`).not.toBeNull();
      expect(nextBox, `${route} next section at ${width}px`).not.toBeNull();
      expect(ctaBox!.y + ctaBox!.height, `${route} CTA at ${width}px`).toBeLessThanOrEqual(height - bottomBar);
      expect(nextBox!.y, `${route} next section at ${width}px`).toBeLessThanOrEqual(height - bottomBar - 12);
    }
  }
});
