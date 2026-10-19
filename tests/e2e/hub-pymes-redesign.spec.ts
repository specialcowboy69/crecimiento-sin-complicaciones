import { expect, test, type Page } from "@playwright/test";
import { mkdir } from "node:fs/promises";

test.setTimeout(60_000);

test.beforeEach(async ({ context, baseURL }, testInfo) => {
  if (testInfo.title.includes("local form")) return;
  await context.addCookies([{ name: "cookie_consent", value: "v2:analytics=denied&advertising=denied", url: baseURL! }]);
});

const pages = [
  { route: "/agencia-marketing-digital", source: "Agencia de marketing digital", service: "Marketing digital", audit: "#auditoria-marketing-digital", image: "home-growth-collaboration.webp", capture: "marketing-digital" },
  { route: "/seo-para-pymes", source: "SEO para pymes", service: "SEO para pymes", audit: "#auditoria-pymes", image: "home-service-seo.webp", capture: "seo-pymes" },
];

async function dismissConsent(page: Page) {
  const reject = page.getByRole("button", { name: "Rechazar", exact: true });
  if (await reject.isVisible()) await reject.click();
}

for (const item of pages) {
  test(`${item.route}: responsive composition, loaded images and reachable audit`, async ({ page }) => {
    test.setTimeout(60_000);
    await page.emulateMedia({ reducedMotion: "reduce" });
    for (const width of [320, 390, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(item.route, { waitUntil: "domcontentloaded" });
      await dismissConsent(page);
      await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
      const hero = page.locator("main > section").first();
      const image = hero.locator(`img[src*="${item.image}"]`);
      await expect.poll(() => image.evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(0);
      await page.evaluate(() => document.fonts.ready);
      expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth), `${width}px`).toBeLessThanOrEqual(0);
      const overflow = await page.locator("main article").evaluateAll(cards => cards.flatMap(card => {
        const bounds = card.getBoundingClientRect();
        return Array.from(card.querySelectorAll("h3,h4,p")).filter(text => {
          const box = text.getBoundingClientRect();
          return box.left < bounds.left - 1 || box.right > bounds.right + 1 || box.bottom > bounds.bottom + 1;
        }).map(text => text.textContent);
      }));
      expect(overflow).toEqual([]);
      if (width === 1440 || width === 390) {
        await mkdir("output/playwright/review", { recursive: true });
        await page.screenshot({ path: `output/playwright/review/${item.capture}-${width === 1440 ? "desktop" : "mobile"}.png` });
      }
      await hero.locator(`a[href="${item.audit}"]`).click();
      const heading = page.locator(item.audit).getByRole("heading").first();
      await expect(heading).toBeInViewport();
      expect(await heading.evaluate(el => el.getBoundingClientRect().top)).toBeGreaterThanOrEqual(
        await page.locator("header").evaluate(el => el.getBoundingClientRect().bottom + 4),
      );
      if (width < 768) {
        await page.locator('header a[href="#audit-request"]').click();
        await expect(page.locator("#audit-request input").first()).toBeInViewport();
        expect(await page.locator("#audit-request").evaluate(el => el.getBoundingClientRect().top)).toBeGreaterThanOrEqual(
          await page.locator("header").evaluate(el => el.getBoundingClientRect().bottom),
        );
        await expect(page.locator('header .landing-services-menu summary')).toBeVisible();
      }
    }
  });

  test(`${item.route}: canonical, title, visible FAQ and implemented internal links`, async ({ page }) => {
    await page.goto(item.route);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `https://www.crecimientosincomplicaciones.com${item.route}`);
    expect((await page.title()).match(/Crecimiento sin complicaciones/g)).toHaveLength(1);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /index, follow/);
    const schema = await page.locator('script[type="application/ld+json"]').evaluateAll(elements =>
      elements.flatMap(el => JSON.parse(el.textContent ?? "[]")),
    );
    const faqSchema = schema.find((item: { "@type": string }) => item["@type"] === "FAQPage");
    const details = page.locator("#faq details");
    expect(faqSchema.mainEntity).toHaveLength(await details.count());
    for (let i = 0; i < await details.count(); i++) {
      await details.nth(i).locator("summary").click();
      await expect(details.nth(i).locator("p")).toBeVisible();
      expect(faqSchema.mainEntity[i].name).toBe(await details.nth(i).locator("summary").innerText());
      expect(faqSchema.mainEntity[i].acceptedAnswer.text).toBe(await details.nth(i).locator("p").innerText());
    }
    const paths = await page.locator('main a[href^="/"]').evaluateAll(links => [...new Set(links.map(link => link.getAttribute("href")!))]);
    for (const path of paths) expect((await page.request.get(path)).status(), path).toBe(200);
    if (item.route === "/agencia-marketing-digital") {
      const services = page.locator('#servicios-digitales a[href^="/"]');
      await expect(services).toHaveCount(7);
      const catalog = schema.find((item: { "@type": string }) => item["@type"] === "Service").hasOfferCatalog;
      expect(catalog.itemListElement).toHaveLength(7);
    }
  });

  test(`${item.route}: local form preserves source attribution and optional email`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    const payloads: Record<string, unknown>[] = [];
    await page.route("**/api/leads", async route => {
      payloads.push(route.request().postDataJSON());
      await route.fulfill({ status: 200, contentType: "application/json", body: "{}" });
    });
    await page.goto(item.route, { waitUntil: "domcontentloaded" });
    const consentDialog = page.getByRole("button", { name: "Rechazar", exact: true });
    await expect(consentDialog).toBeVisible();
    await consentDialog.click();
    const form = page.locator("#audit-request form");
    await form.locator('input[name="name"]').fill("Prueba local");
    await form.getByLabel("Móvil*", { exact: true }).fill("604990651");
    await expect(form.getByLabel("Email (opcional)", { exact: true })).toHaveValue("");
    if (item.route === "/agencia-marketing-digital") await form.getByLabel("Sitio web o nombre de la empresa*", { exact: true }).fill("https://example.com");
    else {
      await expect(form.locator("#seo-goal")).toHaveCount(0);
      await form.locator("#seo-website").fill("https://example.com");
    }
    await form.locator('button[type="submit"]').click();
    await expect(page.getByRole("status").filter({ hasText: "Solicitud enviada" })).toBeVisible();
    expect(payloads).toHaveLength(1);
    if (item.route === "/agencia-marketing-digital") expect(payloads[0].company).toBe("https://example.com");
    expect(payloads[0]).toMatchObject({ sourcePage: item.source, sourcePath: item.route, formType: "Auditoría gratuita", interestedService: item.service, email: "" });
    await expect(page.locator("#audit-request form")).toHaveCount(0);
  });
}
