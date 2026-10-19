import { expect, test } from "@playwright/test";

test.use({ hasTouch: true });

test("a successful home lead replaces the form with a visible confirmation", async ({ page }) => {
  await page.route("**/api/leads", (route) => route.fulfill({ status: 200, body: "{}" }));
  await page.goto("/", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Rechazar", exact: true }).click();

  const contact = page.locator("#auditoria");
  await contact.getByLabel("Nombre*").fill("Ana Pérez");
  await contact.getByLabel("Móvil*").fill("604990651");
  await contact.getByLabel("Email (opcional)").fill("ana@example.com");
  await contact.getByLabel("Sitio web o nombre de la empresa*").fill("Empresa de prueba");
  await contact.getByRole("button", { name: "Quiero mi auditoría" }).click();

  await expect(contact.locator("form")).toHaveCount(0);
  await expect(contact.getByRole("status")).toContainText("Solicitud enviada");
  await expect(contact.getByRole("status")).toBeFocused();
});

test("the mobile confirmation remains in view after the tall form disappears", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.route("**/api/leads", (route) => route.fulfill({ status: 200, body: "{}" }));
  await page.goto("/", { waitUntil: "networkidle" });
  const reject = page.getByRole("button", { name: "Rechazar", exact: true });
  if (await reject.isVisible()) await reject.click();

  const contact = page.locator("#auditoria");
  await contact.getByLabel("Nombre*").fill("Ana Pérez");
  await contact.getByLabel("Móvil*").fill("604990651");
  await contact.getByLabel("Email (opcional)").fill("ana@example.com");
  await contact.getByLabel("Sitio web o nombre de la empresa*").fill("Empresa de prueba");
  await contact.getByRole("button", { name: "Quiero mi auditoría" }).click();

  const confirmation = contact.getByRole("status").filter({ hasText: "Solicitud enviada" });
  await expect(confirmation).toBeFocused();
  const box = await confirmation.boundingBox();
  expect(box).not.toBeNull();
  expect(box!.y).toBeGreaterThanOrEqual(0);
  expect(box!.y).toBeLessThan(812);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(375);
});

test("a failed home lead keeps the entered values and shows an error", async ({ page }) => {
  await page.route("**/api/leads", (route) => route.fulfill({ status: 503, body: "{}" }));
  await page.goto("/", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Rechazar", exact: true }).click();

  const contact = page.locator("#auditoria");
  await contact.getByLabel("Nombre*").fill("Ana Pérez");
  await contact.getByLabel("Móvil*").fill("604990651");
  await contact.getByLabel("Email (opcional)").fill("ana@example.com");
  await contact.getByLabel("Sitio web o nombre de la empresa*").fill("Empresa de prueba");
  await contact.getByRole("button", { name: "Quiero mi auditoría" }).click();

  await expect(contact.locator("form")).toBeVisible();
  await expect(contact.getByLabel("Email (opcional)")).toHaveValue("ana@example.com");
  await expect(contact.getByRole("status")).toContainText("No se pudo enviar");
});

test("the audit section offers direct phone and email contact", async ({ page }) => {
  await page.goto("/");
  const contact = page.locator("#auditoria");
  await expect(contact.getByRole("link", { name: /604 990 651/ })).toHaveAttribute("href", "tel:+34604990651");
  await expect(contact.getByRole("link", { name: /info@crecimientosincomplicaciones.com/ })).toHaveAttribute(
    "href",
    "mailto:info@crecimientosincomplicaciones.com",
  );
});

const auditForms = [
  {
    path: "/seo",
    firstField: "seo-name",
    fields: { "seo-name": "Ana Pérez", "seo-phone": "604990651", "seo-email": "ana@example.com", "seo-website": "https://example.com" },
  },
  {
    path: "/seo/local",
    firstField: "local-seo-name",
    fields: { "local-seo-name": "Ana Pérez", "local-seo-email": "ana@example.com", "local-seo-business": "Empresa de prueba", "local-seo-phone": "604990651" },
  },
  {
    path: "/diseno-pagina-web-profesional",
    firstField: "web-name",
    fields: { "web-name": "Ana Pérez", "web-phone": "604990651", "web-email": "ana@example.com" },
    select: { id: "web-type", value: "corporativa" },
  },
  {
    path: "/gestion-redes-sociales-empresas",
    firstField: "social-name",
    fields: { "social-name": "Ana Pérez", "social-phone": "604990651", "social-email": "ana@example.com" },
    select: { id: "social-network", value: "instagram" },
  },
  {
    path: "/soluciones-inteligencia-artificial-empresas",
    firstField: "ai-name",
    fields: { "ai-name": "Ana Pérez", "ai-email": "ana@example.com", "ai-phone": "604990651", "ai-company": "Empresa de prueba" },
  },
];

for (const audit of auditForms) {
  test(`${audit.path} replaces the form after a successful lead`, async ({ page }) => {
    await page.route("**/api/leads", (route) => route.fulfill({ status: 200, body: "{}" }));
    await page.goto(audit.path, { waitUntil: "networkidle" });

    const form = page.locator(`form:has(#${audit.firstField})`);
    for (const [id, value] of Object.entries(audit.fields)) {
      await form.locator(`#${id}`).fill(value);
    }
    if (audit.select) await form.locator(`#${audit.select.id}`).selectOption(audit.select.value);
    await form.locator('button[type="submit"]').click();

    await expect(form).toHaveCount(0);
    const confirmation = page.getByRole("status").filter({ hasText: "Solicitud enviada" });
    await expect(confirmation).toBeVisible();
    await expect(confirmation).toBeFocused();
  });
}

test("the existing mobile floating audit actions call directly", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  for (const path of [
    "/agencia-marketing-digital",
    "/agencia-marketing-digital/google-ads",
    "/agencia-marketing-digital/google-ads/alicante",
    "/diseno-landing-pages",
    "/diseno-pagina-web-profesional",
    "/diseno-pagina-web-profesional/empresas",
    "/diseno-pagina-web-profesional/valencia",
    "/seo",
    "/seo/local",
    "/seo/madrid",
    "/seo/barcelona",
    "/seo/valencia",
    "/seo/sevilla",
    "/seo/alicante",
    "/seo/malaga",
    "/seo-para-pymes",
  ]) {
    await page.goto(path);
    await expect(page.locator('div.fixed a[href="tel:+34604990651"]'), path).toBeVisible();
  }
});

test("the blog service menu closes on outside click and Escape", async ({ page }) => {
  await page.goto("/blog");
  const navigation = page.getByRole("navigation", { name: "Navegación del blog" });
  const menu = navigation.locator("details");
  await menu.locator("summary").click();
  await expect(menu).toHaveAttribute("open", "");
  await page.getByRole("heading", { level: 1 }).click();
  await expect(menu).not.toHaveAttribute("open", "");

  await menu.locator("summary").click();
  await page.keyboard.press("Escape");
  await expect(menu).not.toHaveAttribute("open", "");
});

test("the blog service menu is available by touch on an article and category", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  for (const path of [
    "/blog/como-lanzar-una-web-nueva-sin-comprometer-seo",
    "/blog/categoria/seo",
  ]) {
    await page.goto(path);
    const navigation = page.getByRole("navigation", { name: "Navegación del blog" });
    const menu = navigation.locator("details");
    await expect(menu.locator("summary")).toBeVisible();
    await menu.locator("summary").tap();
    await expect(menu).toHaveAttribute("open", "");
    await page.touchscreen.tap(4, 700);
    await expect(menu).not.toHaveAttribute("open", "");
  }
});

test("the service panel stays inside narrow and wide viewports", async ({ page }) => {
  for (const width of [320, 375, 768, 1280]) {
    await page.setViewportSize({ width, height: 812 });
    await page.goto("/blog");
    const menu = page.getByRole("navigation", { name: "Navegación del blog" }).locator("details");
    await menu.locator("summary").click();
    const panel = await menu.locator(".landing-services-dropdown").boundingBox();
    expect(panel, `panel at ${width}px`).not.toBeNull();
    expect(panel!.x, `left edge at ${width}px`).toBeGreaterThanOrEqual(0);
    expect(panel!.x + panel!.width, `right edge at ${width}px`).toBeLessThanOrEqual(width + 1);
    await expect(menu.locator('a[href="/seo"]')).toBeVisible();
  }
});

const pagesWithAuditForm = [
  "/",
  "/sobre-nosotros",
  "/agencia-marketing-digital",
  "/agencia-marketing-digital/google-ads",
  "/agencia-marketing-digital/google-ads/alicante",
  "/diseno-landing-pages",
  "/seo",
  "/seo/local",
  "/seo/madrid",
  "/seo/barcelona",
  "/seo/valencia",
  "/seo/sevilla",
  "/seo/alicante",
  "/seo/malaga",
  "/seo-para-pymes",
  "/diseno-pagina-web-profesional",
  "/diseno-pagina-web-profesional/empresas",
  "/diseno-pagina-web-profesional/valencia",
  "/gestion-redes-sociales-empresas",
  "/soluciones-inteligencia-artificial-empresas",
];

test("mobile headers on audit pages keep the service menu and local form link", async ({ page }) => {
  test.setTimeout(120_000);
  await page.setViewportSize({ width: 375, height: 812 });
  for (const path of pagesWithAuditForm) {
    await page.goto(path);
    const header = page.locator("header").first();
    await expect(header.locator(".mobile-audit-cta"), path).toBeVisible();
    await expect(header.locator(".mobile-audit-cta")).toHaveAttribute("href", "#audit-request");
    await expect(header.locator(".landing-services-menu"), path).toBeVisible();
    await expect(page.locator("#audit-request form"), path).toBeVisible();
  }
});

test("mobile blog and pages without forms retain the services menu", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  for (const path of ["/blog", "/agencia-marketing-digital/seo-tecnico-arquitectura-entidades"]) {
    await page.goto(path);
    const header = page.locator("header").first();
    await expect(header.locator(".landing-services-menu"), path).toBeVisible();
    await expect(header.locator(".mobile-audit-cta"), path).toHaveCount(0);
  }
});

test("mobile audit header fits and scrolls to the form", async ({ page }) => {
  for (const width of [320, 375, 768]) {
    await page.setViewportSize({ width, height: 812 });
    await page.goto("/seo/local", { waitUntil: "networkidle" });
    const reject = page.getByRole("button", { name: "Rechazar", exact: true });
    if (await reject.isVisible()) await reject.click();
    const header = page.locator("header").first();
    const cta = header.locator(".mobile-audit-cta");
    const menu = header.locator(".landing-services-menu");
    if (width < 768) {
      await expect(menu).toBeVisible();
      await menu.locator("summary").click();
      await expect(menu).toHaveAttribute("open", "");
      const panel = await menu.locator(".landing-services-dropdown").boundingBox();
      expect(panel).not.toBeNull();
      expect(panel!.x).toBeGreaterThanOrEqual(0);
      expect(panel!.x + panel!.width).toBeLessThanOrEqual(width + 1);
      await expect(menu.locator('a[href="/seo"]')).toBeVisible();
      await page.keyboard.press("Escape");
      await expect(cta).toBeVisible();
      await cta.click();
      await expect(page).toHaveURL(/#audit-request$/);
      const box = await page.locator("#audit-request").boundingBox();
      expect(box).not.toBeNull();
      expect(box!.y, `form top at ${width}px`).toBeGreaterThanOrEqual(0);
      expect(box!.y, `form top at ${width}px`).toBeLessThan(200);
    } else {
      await expect(cta).toBeHidden();
    }
    if (width < 768) {
      expect(await page.evaluate(() => document.documentElement.scrollWidth), `${width}px`).toBeLessThanOrEqual(width);
    }
  }
});
// Behavior coverage for the shared contact contract; all requests are intercepted.
for (const audit of auditForms) {
  test(`${audit.path} requires a valid mobile, accepts optional email and preserves failed values`, async ({ page }) => {
    const payloads: Record<string, unknown>[] = [];
    await page.route("**/api/leads", async (route) => {
      payloads.push(route.request().postDataJSON());
      await route.fulfill({ status: 503, body: "{}" });
    });
    await page.goto(audit.path);
    const form = page.locator(`form:has(#${audit.firstField})`);
    for (const [id, value] of Object.entries(audit.fields)) await form.locator(`#${id}`).fill(value);
    if (audit.select) await form.locator(`#${audit.select.id}`).selectOption(audit.select.value);
    const mobile = form.locator('input[name="phone"]');
    const email = form.locator('input[name="email"]');
    await expect(mobile).toHaveAttribute("type", "tel");
    await expect(mobile).toHaveAttribute("autocomplete", "tel");
    await email.fill("");
    for (const value of ["", "60499", "letters604990651"]) {
      await mobile.fill(value);
      await form.locator('button[type="submit"]').click();
      await expect(mobile).toHaveAttribute("aria-invalid", "true");
      expect(payloads).toHaveLength(0);
    }
    await mobile.fill("604 990 651");
    await email.fill("invalid");
    await form.locator('button[type="submit"]').click();
    await expect(email).toHaveAttribute("aria-invalid", "true");
    expect(payloads).toHaveLength(0);
    for (const value of ["", "ana@example.com"]) {
      await email.fill(value);
      await form.locator('button[type="submit"]').click();
      await expect(form.getByRole("status")).toContainText(/No (?:se pudo|hemos podido) enviar/);
      await expect(mobile).toHaveValue("604 990 651");
      await expect(email).toHaveValue(value);
      await expect(form).toBeVisible();
    }
    expect(payloads).toHaveLength(2);
    for (const payload of payloads) {
      expect(payload.sourcePath).toBe(audit.path);
      expect(payload.formType).toBe("Auditoría gratuita");
      expect(payload.sourcePage).toBeTruthy();
      expect(payload.phone).toBe("604 990 651");
      expect(payload).not.toHaveProperty("contact");
    }
  });
}
