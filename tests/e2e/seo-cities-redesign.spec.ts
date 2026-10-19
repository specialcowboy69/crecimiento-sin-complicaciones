import { expect, test, type Locator, type Page } from "@playwright/test";

const canonicalOrigin = "https://www.crecimientosincomplicaciones.com";
const internalHosts = ["www.crecimientosincomplicaciones.com", "crecimientosincomplicaciones.com"];
const cities = [
  { slug: "madrid", name: "Madrid", path: "/seo/madrid", source: "SEO Madrid" },
  { slug: "valencia", name: "Valencia", path: "/seo/valencia", source: "SEO Valencia" },
  { slug: "barcelona", name: "Barcelona", path: "/seo/barcelona", source: "SEO Barcelona", marketId: "mercado" },
  { slug: "sevilla", name: "Sevilla", path: "/seo/sevilla", source: "SEO Sevilla", adsHref: "/agencia-marketing-digital/google-ads" },
  { slug: "malaga", name: "Málaga", path: "/seo/malaga", source: "SEO Málaga", marketId: "costa-del-sol", adsHref: "/agencia-marketing-digital/google-ads" },
  { slug: "alicante", name: "Alicante", path: "/seo/alicante", source: "SEO Alicante", marketId: "provincia", adsHref: "/agencia-marketing-digital/google-ads/alicante" },
] as const;
const heroViewports = [{ width: 1440, height: 900 }, { width: 1280, height: 720 }, { width: 390, height: 844 }];
const widths = [320, 390, 768, 1024, 1440];
const sectionIds = ["estrategia", "sectores", "metodo", "faq"];
type City = (typeof cities)[number];

test.use({ serviceWorkers: "block" });

test.beforeEach(async ({ context, baseURL }) => {
  expect(baseURL, "set PLAYWRIGHT_BASE_URL to the parent's running local server").toBeTruthy();
  const local = new URL(baseURL!);
  expect(["localhost", "127.0.0.1", "[::1]"], "this suite only targets a local server").toContain(local.hostname);
  await context.addCookies([{
    name: "cookie_consent",
    value: "v2:analytics=denied&advertising=denied",
    url: local.origin,
    sameSite: "Lax",
  }]);
  // Page-level form mocks override this guard; no real lead or external request is allowed.
  await context.route("**/*", async (route) => {
    const url = new URL(route.request().url());
    if (url.origin !== local.origin || url.pathname === "/api/leads") {
      await route.abort();
      return;
    }
    if (url.pathname.startsWith("/_vercel/insights/")) {
      await route.fulfill({ contentType: "application/javascript", body: "/* local analytics stub */" });
      return;
    }
    await route.continue();
  });
});

async function visitCity(page: Page, city: City) {
  const response = await page.goto(city.path, { waitUntil: "domcontentloaded" });
  expect(response?.status(), city.path).toBe(200);
  await expect(page.locator(`[data-seo-city="${city.slug}"]`)).toHaveCount(1);
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(`Agencia SEO para empresas de ${city.name}`);
  await page.evaluate(() => document.fonts.ready);
}

async function loadedHero(page: Page, city: City) {
  const hero = page.locator("main > section").first();
  const image = hero.locator(`img[src*="seo-${city.slug}-city.webp"]`);
  await expect(image).toHaveCount(1);
  await expect(image).toBeVisible();
  await expect.poll(() => image.evaluate((element: HTMLImageElement) =>
    element.complete && element.naturalWidth > 0 && element.naturalHeight > 0,
  )).toBe(true);
  return { hero, image };
}

async function noHorizontalOverflow(page: Page) {
  expect(await page.evaluate(() => Math.max(
    document.documentElement.scrollWidth,
    document.body.scrollWidth,
  ) - window.innerWidth), "page has no horizontal overflow").toBeLessThanOrEqual(0);
}

async function fillAudit(form: Locator) {
  await form.getByLabel("Nombre y apellidos", { exact: true }).fill("Persona de prueba");
  await form.getByLabel("Móvil*", { exact: true }).fill("604990651");
  await form.getByLabel("Email (opcional)", { exact: true }).fill("seo-city@example.com");
  await form.getByLabel("Empresa", { exact: true }).fill("Empresa de prueba");
  await form.getByLabel("Web a auditar", { exact: true }).fill("https://example.com");
  await form.getByLabel("Contexto o problema principal", { exact: true }).fill("Prueba local de la auditoría por ciudad.");
  await expect(form.locator("#seo-goal")).toHaveCount(0);
}

function localDestination(href: string, from: string, localOrigin: string) {
  const url = new URL(href, from);
  expect(url.protocol, `HTTP link: ${href}`).toMatch(/^https?:$/);
  expect(url.origin === localOrigin || internalHosts.includes(url.hostname), `internal destination: ${href}`).toBe(true);
  return new URL(`${url.pathname}${url.search}${url.hash}`, localOrigin);
}

async function expectLocalPage(page: Page, href: string, localOrigin: string) {
  let target = localDestination(href, page.url(), localOrigin);
  // APIRequestContext bypasses browser routing, so follow redirects explicitly on localhost.
  for (let hop = 0; hop < 6; hop++) {
    const response = await page.request.get(target.href, { maxRedirects: 0 });
    const status = response.status();
    const location = response.headers().location;
    await response.dispose();
    expect(status, `${href} -> ${target.pathname}`).not.toBe(404);
    if (status >= 300 && status < 400) {
      expect(location, `redirect for ${href}`).toBeTruthy();
      target = localDestination(location!, target.href, localOrigin);
      continue;
    }
    expect(status, `${href} resolves locally`).toBe(200);
    return;
  }
  throw new Error(`Too many local redirects for ${href}`);
}

for (const city of cities) {
  test.describe(city.path, () => {
    for (const width of widths) {
      test(`loaded full-width hero and readable cards without overflow at ${width}px`, async ({ page }) => {
        await page.setViewportSize({ width, height: width < 500 ? 844 : 900 });
        await visitCity(page, city);
        const { hero, image } = await loadedHero(page, city);
        const heroBox = await hero.boundingBox();
        const imageBox = await image.boundingBox();
        expect(heroBox).not.toBeNull();
        expect(imageBox).not.toBeNull();
        expect(Math.abs(heroBox!.x)).toBeLessThanOrEqual(1);
        expect(heroBox!.width).toBeGreaterThanOrEqual(width - 1);
        expect(Math.abs(imageBox!.x)).toBeLessThanOrEqual(1);
        expect(imageBox!.width).toBeGreaterThanOrEqual(width - 1);
        expect(imageBox!.y).toBeLessThanOrEqual(heroBox!.y + 1);
        expect(imageBox!.y + imageBox!.height).toBeGreaterThanOrEqual(heroBox!.y + heroBox!.height - 1);

        for (const id of sectionIds) {
          const section = page.locator(`main #${id}`);
          await expect(section).toHaveCount(1);
          await expect(section.getByRole("heading", { level: 2 }).first()).toBeVisible();
        }
        const strategy = page.locator("#estrategia article");
        const process = page.locator("#metodo article");
        expect(await strategy.count(), "strategy keeps six purposeful cards").toBe(6);
        expect(await process.count(), "process keeps five numbered cards").toBe(5);
        await expect(page.locator("#sectores article")).toHaveCount(3);
        for (const [index, card] of (await process.all()).entries()) {
          await expect(card).toContainText(new RegExp(`^\\s*0?${index + 1}(?:\\s|[.)])`), { useInnerText: true });
        }
        const paragraphs = page.locator("#estrategia article p, #sectores article p, #sectores article > span, #metodo article p, #metodo article > div > span");
        expect(await paragraphs.count(), "card descriptions exist").toBeGreaterThan(0);
        const sizes = await paragraphs.evaluateAll((elements) => elements.map((element) => ({
          text: element.textContent,
          size: parseFloat(getComputedStyle(element).fontSize),
        })));
        for (const paragraph of sizes) {
          expect(paragraph.size, paragraph.text ?? "card paragraph").toBeGreaterThanOrEqual(18);
        }
        const clipped = await page.locator("#estrategia article, #sectores article, #metodo article").evaluateAll((cards) =>
          cards.flatMap((card) => {
            const bounds = card.getBoundingClientRect();
            return Array.from(card.querySelectorAll("h3, p")).filter((text) => {
              const box = text.getBoundingClientRect();
              return text.scrollWidth > text.clientWidth + 1 || box.left < bounds.left - 1 ||
                box.right > bounds.right + 1 || box.top < bounds.top - 1 || box.bottom > bounds.bottom + 1;
            }).map((text) => text.textContent);
          }),
        );
        expect(clipped, `card copy fits at ${width}px`).toEqual([]);
        if (width === 1440) {
          const boxes = await strategy.evaluateAll((cards) => cards.map((card) => {
            const box = card.getBoundingClientRect();
            return { x: Math.round(box.x), width: Math.round(box.width) };
          }));
          expect(new Set(boxes.map((box) => box.x)).size, "bento uses multiple columns").toBeGreaterThan(1);
          expect(new Set(boxes.map((box) => box.width)).size, "bento varies card widths").toBeGreaterThan(1);
        }
        await noHorizontalOverflow(page);
      });
    }

    for (const viewport of heroViewports) {
      test(`hero CTA is visible and reaches the audit below the header at ${viewport.width}px`, async ({ page }) => {
        await page.setViewportSize(viewport);
        await page.emulateMedia({ reducedMotion: "reduce" });
        await visitCity(page, city);
        const { hero } = await loadedHero(page, city);
        const cta = hero.getByRole("link", { name: "Solicitar auditoría gratuita", exact: true });
        const target = `#auditoria-${city.slug}`;
        await expect(cta).toHaveAttribute("href", target);
        await expect(cta).toBeInViewport({ ratio: 1 });
        await expect(page.locator("#problem-title")).toBeInViewport({ ratio: 0.2 });
        const ctaBox = await cta.boundingBox();
        const header = page.locator("header").first();
        const headerBottom = await header.evaluate((element) => element.getBoundingClientRect().bottom);
        expect(ctaBox).not.toBeNull();
        expect(ctaBox!.y).toBeGreaterThanOrEqual(headerBottom);
        expect(ctaBox!.y + ctaBox!.height).toBeLessThanOrEqual(viewport.height);
        expect(await cta.evaluate((element) => {
          const box = element.getBoundingClientRect();
          const hit = document.elementFromPoint(box.x + box.width / 2, box.y + box.height / 2);
          return hit !== null && element.contains(hit);
        }), "CTA is not covered by a fixed mobile action").toBe(true);

        await cta.click();
        await expect(page).toHaveURL(new RegExp(`${target}$`));
        const audit = page.locator(target);
        const heading = audit.getByRole("heading", { level: 2 }).first();
        await expect(heading).toBeInViewport();
        await expect.poll(async () => {
          const top = await heading.evaluate((element) => element.getBoundingClientRect().top);
          const bottom = await header.evaluate((element) => element.getBoundingClientRect().bottom);
          return top - bottom;
        }, { message: "audit heading clears the sticky header" }).toBeGreaterThanOrEqual(4);
        await expect(audit.locator("#audit-request form")).toBeVisible();
        await expect(audit.locator(".contact-options")).not.toHaveClass(/contact-options-dark/);
        await expect(audit.getByRole("link", { name: "604 990 651", exact: true })).toHaveAttribute("href", "tel:+34604990651");
        await expect(audit.getByRole("link", { name: "info@crecimientosincomplicaciones.com", exact: true })).toHaveAttribute(
          "href", "mailto:info@crecimientosincomplicaciones.com",
        );
        await noHorizontalOverflow(page);
      });

      test(`services dropdown supports keyboard navigation and Escape at ${viewport.width}px`, async ({ page }) => {
        await page.setViewportSize(viewport);
        await visitCity(page, city);
        const menu = page.locator("header details").filter({ has: page.locator("summary", { hasText: /Servicios|Más servicios/ }) });
        await expect(menu).toHaveCount(1);
        const summary = menu.locator("summary");
        await summary.focus();
        await page.keyboard.press("Enter");
        await expect(menu).toHaveAttribute("open", "");
        const firstLink = menu.getByRole("link").first();
        await expect(firstLink).toBeVisible();
        await page.keyboard.press("Tab");
        await expect(firstLink).toBeFocused();
        await page.keyboard.press("Escape");
        await expect(menu).not.toHaveAttribute("open", "");
        await expect(summary).toBeFocused();
        await expect(firstLink).toBeHidden();
      });

      test(`mocked audit success preserves city attribution and contact at ${viewport.width}px`, async ({ page }) => {
        await page.setViewportSize(viewport);
        const payloads: Record<string, unknown>[] = [];
        await page.route("**/api/leads", async (route) => {
          expect(route.request().method()).toBe("POST");
          payloads.push(route.request().postDataJSON());
          await route.fulfill({ status: 200, contentType: "application/json", body: '{"ok":true}' });
        });
        await visitCity(page, city);
        const audit = page.locator(`#auditoria-${city.slug}`);
        const form = audit.locator("form");
        await fillAudit(form);
        await expect(form.getByRole("link", { name: /política de privacidad/i })).toHaveAttribute("href", "/politica-de-privacidad");
        await form.getByRole("button", { name: "Solicitar auditoría SEO gratuita", exact: true }).click();

        const confirmation = audit.getByRole("status");
        await expect(confirmation).toContainText("Solicitud enviada");
        await expect(confirmation).toContainText("Hemos recibido tu solicitud. Te responderemos con los siguientes pasos.");
        await expect(confirmation).toBeVisible();
        await expect(confirmation).toBeFocused();
        await expect(confirmation).toHaveAttribute("aria-live", "polite");
        await expect(form).toHaveCount(0);
        expect(payloads).toHaveLength(1);
        expect(payloads[0]).toEqual({
          sourcePage: city.source,
          sourcePath: city.path,
          formType: "Auditoría gratuita",
          interestedService: city.source,
          name: "Persona de prueba",
          phone: "604990651",
          email: "seo-city@example.com",
          company: "Empresa de prueba",
          message: "Web a auditar: https://example.com\nContexto: Prueba local de la auditoría por ciudad.",
        });
        await expect(audit.locator("#audit-request")).toHaveCount(1);
        await expect(audit.locator(".contact-options")).not.toHaveClass(/contact-options-dark/);
        await expect(audit.getByRole("link", { name: "604 990 651", exact: true })).toBeVisible();
        await expect(audit.getByRole("link", { name: "info@crecimientosincomplicaciones.com", exact: true })).toBeVisible();
        await noHorizontalOverflow(page);
      });

      test(`reduced motion leaves section and card content visible at ${viewport.width}px`, async ({ page }) => {
        await page.setViewportSize(viewport);
        await page.emulateMedia({ reducedMotion: "reduce" });
        await visitCity(page, city);
        expect(await page.evaluate(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches)).toBe(true);
        const content = page.locator("#estrategia h2, #sectores h2, #metodo h2, #faq h2, #estrategia article, #sectores article, #metodo article");
        expect(await content.count()).toBeGreaterThan(4);
        for (const element of await content.all()) {
          await element.scrollIntoViewIfNeeded();
          await expect(element).toBeVisible();
          await expect(element).toBeInViewport();
          await expect.poll(() => element.evaluate((node) => {
            for (let current: Element | null = node; current; current = current.parentElement) {
              if (parseFloat(getComputedStyle(current).opacity) === 0) return false;
            }
            return true;
          }), { message: "reduced motion never leaves content transparent" }).toBe(true);
        }
        await noHorizontalOverflow(page);
      });
    }

    test("breadcrumbs and canonical retain the city hierarchy and www URLs", async ({ page }) => {
      await visitCity(page, city);
      await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `${canonicalOrigin}${city.path}`);
      const breadcrumb = page.getByRole("navigation", { name: "Migas de pan", exact: true });
      await expect(breadcrumb).toBeVisible();
      await expect(breadcrumb.getByRole("link", { name: "Inicio", exact: true })).toHaveAttribute("href", "/");
      await expect(breadcrumb.getByRole("link", { name: "SEO", exact: true })).toHaveAttribute("href", "/seo");
      await expect(breadcrumb).toContainText(city.name);
      const schemas: unknown[] = await page.locator('script[type="application/ld+json"]').evaluateAll((scripts) =>
        scripts.map((script) => JSON.parse(script.textContent ?? "")),
      );
      const breadcrumbs: Record<string, unknown>[] = [];
      function visit(value: unknown) {
        if (Array.isArray(value)) value.forEach(visit);
        else if (value && typeof value === "object") {
          const node = value as Record<string, unknown>;
          if (node["@type"] === "BreadcrumbList") breadcrumbs.push(node);
          Object.values(node).forEach(visit);
        }
      }
      schemas.forEach(visit);
      expect(breadcrumbs).toHaveLength(1);
      expect(breadcrumbs[0].itemListElement).toEqual([
        expect.objectContaining({ position: 1, name: "Inicio", item: canonicalOrigin }),
        expect.objectContaining({ position: 2, name: "Agencia SEO", item: `${canonicalOrigin}/seo` }),
        expect.objectContaining({ position: 3, name: city.source, item: `${canonicalOrigin}${city.path}` }),
      ]);
    });

    test("city-specific territory and Ads decisions remain available", async ({ page }) => {
      await visitCity(page, city);
      if ("marketId" in city) {
        const market = page.locator(`#${city.marketId}`);
        await expect(market).toHaveCount(1);
        await expect(market.getByRole("heading", { level: 2 })).toBeVisible();
        await expect(market.locator("article")).toHaveCount(3);
        await expect(page.locator(`header a[href="#${city.marketId}"]`)).toHaveCount(1);
      } else {
        await expect(page.locator("#mercado, #costa-del-sol, #provincia")).toHaveCount(0);
      }
      if ("adsHref" in city) {
        await expect(page.locator(`#ads a[href="${city.adsHref}"]`)).toHaveCount(1);
      }
      const credit = page.locator("[data-city-photo-credit]");
      await expect(credit).toContainText(city.name);
      await expect(credit.locator("a").first()).toHaveAttribute("href", /^https:\/\//);
    });

    test("internal links and anchors resolve using only the local server", async ({ page, baseURL }) => {
      test.setTimeout(90_000);
      await visitCity(page, city);
      const localOrigin = new URL(baseURL!).origin;
      const hrefs = await page.locator("a[href]").evaluateAll((anchors) =>
        [...new Set(anchors.map((anchor) => anchor.getAttribute("href")!))],
      );
      const paths = new Set<string>();
      for (const href of hrefs) {
        const url = new URL(href, page.url());
        if (!/^https?:$/.test(url.protocol) || (url.origin !== localOrigin && !internalHosts.includes(url.hostname))) continue;
        const target = localDestination(href, page.url(), localOrigin);
        if (target.pathname === city.path && target.hash) {
          const id = decodeURIComponent(target.hash.slice(1));
          expect(await page.evaluate((anchorId) => document.getElementById(anchorId) !== null, id), href).toBe(true);
        }
        paths.add(`${target.pathname}${target.search}`);
      }
      expect(paths.has("/seo"), "link to the national SEO page remains").toBe(true);
      for (const path of paths) await expectLocalPage(page, path, localOrigin);
    });

    test("invalid audit exposes accessible errors without submitting a lead", async ({ page }) => {
      const requests: string[] = [];
      await page.route("**/api/leads", async (route) => {
        requests.push(route.request().method());
        await route.abort();
      });
      await visitCity(page, city);
      const audit = page.locator(`#auditoria-${city.slug}`);
      const form = audit.locator("form");
      const fields = [
        ["Nombre y apellidos", "seo-name", "seo-name-error", "Indica tu nombre para saber con quién hablamos."],
        ["Móvil*", "seo-phone", "seo-phone-error", "Introduce un móvil válido, con prefijo internacional si es de otro país."],
        ["Web a auditar", "seo-website", "seo-website-error", "Indica la web que quieres que revisemos."],
      ];
      for (const [label, fieldId] of fields) {
        await expect(form.getByLabel(label, { exact: true })).toHaveAttribute("id", fieldId);
      }
      await form.getByRole("button", { name: "Solicitar auditoría SEO gratuita", exact: true }).click();
      for (const [, fieldId, errorId, message] of fields) {
        await expect(form.locator(`#${fieldId}`)).toHaveAttribute("aria-invalid", "true");
        await expect(form.locator(`#${fieldId}`)).toHaveAttribute("aria-describedby", errorId);
        await expect(form.locator(`#${errorId}`)).toHaveText(message);
        await expect(form.locator(`#${errorId}`)).toBeVisible();
      }
      await expect(form).toBeVisible();
      await expect(audit.getByRole("heading", { name: "Solicitud enviada", exact: true })).toHaveCount(0);
      expect(requests, "invalid submissions do not reach the lead endpoint").toEqual([]);
    });

    test("mocked API failure keeps form values and re-enables submission", async ({ page }) => {
      let requests = 0;
      await page.route("**/api/leads", async (route) => {
        requests++;
        await route.fulfill({ status: 503, contentType: "application/json", body: '{"ok":false}' });
      });
      await visitCity(page, city);
      const audit = page.locator(`#auditoria-${city.slug}`);
      const form = audit.locator("form");
      await fillAudit(form);
      const submit = form.getByRole("button", { name: "Solicitar auditoría SEO gratuita", exact: true });
      await submit.click();
      await expect(form.getByRole("status")).toHaveText("No se pudo enviar. Inténtalo de nuevo en unos segundos.");
      await expect(form.getByRole("status")).toHaveAttribute("aria-live", "polite");
      await expect(form.getByLabel("Nombre y apellidos", { exact: true })).toHaveValue("Persona de prueba");
      await expect(form.getByLabel("Email (opcional)", { exact: true })).toHaveValue("seo-city@example.com");
      await expect(form.getByLabel("Web a auditar", { exact: true })).toHaveValue("https://example.com");
      await expect(submit).toBeEnabled();
      await expect(audit.getByRole("heading", { name: "Solicitud enviada", exact: true })).toHaveCount(0);
      expect(requests).toBe(1);
    });
  });
}
