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
    await expect(page.getByRole("heading", { level: 2, name: "Una dirección clara para cada visita" })).toBeVisible();
    const comparisonImage = page.locator('#problema img[alt*="Dos propuestas"]');
    const audienceImage = page.locator('#para-quien img[alt*="Equipo revisando"]');
    await expect(comparisonImage).toBeVisible();
    await expect(audienceImage).toBeVisible();
    await comparisonImage.scrollIntoViewIfNeeded();
    await expect.poll(() => comparisonImage.evaluate((image: HTMLImageElement) => image.naturalWidth)).toBeGreaterThan(0);
    await audienceImage.scrollIntoViewIfNeeded();
    await expect.poll(() => audienceImage.evaluate((image: HTMLImageElement) => image.naturalWidth)).toBeGreaterThan(0);
    await expect(page.locator("#solucion article")).toHaveCount(3);
    await expect(page.locator("#para-quien li")).toHaveCount(4);
    await expect(page.locator("#incluye article")).toHaveCount(4);
    await expect(page.locator("#proceso li")).toHaveCount(4);
    const form = page.locator("#auditoria-landing-pages-form form");
    await expect(form).toBeVisible();
    const formWidth = await form.evaluate((element) => element.getBoundingClientRect().width);
    expect(formWidth).toBeGreaterThanOrEqual(width < 768 ? width - 80 : 420);
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

test("annotated section introductions are centered and the SEO description follows its title", async ({ page }) => {
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/seo");
    const title = page.locator("#problem-title");
    const description = title.locator("..").locator("p").last();
    expect(await title.evaluate((element) => getComputedStyle(element).textAlign)).toBe("center");
    expect(await description.evaluate((element) => getComputedStyle(element).textAlign)).toBe("center");
    const titleBox = await title.boundingBox();
    const descriptionBox = await description.boundingBox();
    expect(descriptionBox!.y).toBeGreaterThanOrEqual(titleBox!.y + titleBox!.height);

    await page.goto("/diseno-landing-pages");
    const audienceTitle = page.locator("#para-quien h2");
    expect(await audienceTitle.evaluate((element) => getComputedStyle(element).textAlign)).toBe("center");
    await expect(page.locator("#para-quien").getByText("Para quién", { exact: true })).toHaveCount(0);
    await expect(page.getByText("Más elementos no hacen más clara una oferta.", { exact: true })).toHaveCount(0);
  }
});

test("Google Ads process explanations have a stronger reading weight and size", async ({ page }) => {
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/agencia-marketing-digital/google-ads");
    const descriptions = page.locator("#proceso li h3 + p");
    await expect(descriptions).toHaveCount(5);
    const styles = await descriptions.evaluateAll((elements) => elements.map((element) => {
      const style = getComputedStyle(element);
      return { size: parseFloat(style.fontSize), weight: parseInt(style.fontWeight, 10) };
    }));
    for (const style of styles) {
      expect(style.size).toBeGreaterThanOrEqual(19);
      expect(style.weight).toBeGreaterThanOrEqual(500);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(0);
  }
});

test("redesigned problem, deliverable and process descriptions keep readable type and contrast", async ({ page }) => {
  const checks = [
    { route: "/diseno-landing-pages", selector: "#problema li p, #incluye article p", count: 7 },
    { route: "/agencia-marketing-digital/google-ads", selector: "#problema li p, #proceso li h3 + p", count: 8 },
    {
      route: "/seo",
      selector: "section[aria-labelledby='includes-title'] li h3 + p, #proceso li h3 + p, section[aria-labelledby='audience-title'] article h3 + p, section[aria-labelledby='related-seo-title'] a h3 + p",
      count: 18,
    },
  ];

  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const check of checks) {
      await page.goto(check.route);
      const descriptions = page.locator(check.selector);
      await expect(descriptions).toHaveCount(check.count);
      const values = await descriptions.evaluateAll((elements) => {
        const luminance = (rgb: number[]) => rgb.map((channel) => {
          const value = channel / 255;
          return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
        }).reduce((sum, value, index) => sum + value * [0.2126, 0.7152, 0.0722][index], 0);
        const channels = (color: string) => color.match(/\d+(?:\.\d+)?/g)!.slice(0, 3).map(Number);
        return elements.map((element) => {
          const style = getComputedStyle(element);
          let background = [255, 255, 255];
          for (let node: Element | null = element; node; node = node.parentElement) {
            const color = getComputedStyle(node).backgroundColor;
            if (color !== "rgba(0, 0, 0, 0)" && color !== "transparent") {
              background = channels(color);
              break;
            }
          }
          const brightness = [luminance(channels(style.color)), luminance(background)].sort((a, b) => b - a);
          return {
            text: element.textContent,
            fontSize: parseFloat(style.fontSize),
            lineHeight: parseFloat(style.lineHeight),
            contrast: (brightness[0] + 0.05) / (brightness[1] + 0.05),
          };
        });
      });
      for (const value of values) {
        expect(value.fontSize, `${check.route}: ${value.text}`).toBeGreaterThanOrEqual(17);
        expect(value.lineHeight, `${check.route}: ${value.text}`).toBeGreaterThanOrEqual(24);
        expect(value.contrast, `${check.route}: ${value.text}`).toBeGreaterThanOrEqual(4.5);
      }
    }
  }
});

test("SEO stage deliverables and audience copy stay inside their cards", async ({ page }) => {
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/seo");
    const cards = page.locator("#proceso li, section[aria-labelledby='audience-title'] article");
    await expect(cards).toHaveCount(9);
    const overflow = await cards.evaluateAll((elements) => elements.flatMap((card) => {
      const bounds = card.getBoundingClientRect();
      return Array.from(card.querySelectorAll("h3, p")).filter((text) => {
        const box = text.getBoundingClientRect();
        return box.bottom > bounds.bottom + 1 || box.right > bounds.right + 1 || box.left < bounds.left - 1;
      }).map((text) => text.textContent);
    }));
    expect(overflow, `clipped card text at ${width}px`).toEqual([]);
  }
});
