import { expect, test } from "@playwright/test";

const workAreas = [
  "Diagnóstico de búsquedas y competencia local",
  "Perfil de Empresa de Google",
  "SEO local del sitio web",
  "Gestión de reseñas y respuestas",
  "Notoriedad y referencias del negocio",
  "Medición y prioridades",
];
const exampleRows = [
  "Búsquedas y zona",
  "Competencia local",
  "Perfil de Google",
  "Sitio público y páginas clave",
  "Reseñas y referencias",
  "Medición",
];
const auditScope = /revisamos el conjunto del sitio público y analizamos en detalle sus páginas clave/i;

for (const viewport of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
  test(`SEO local offer and existing conversion journey at ${viewport.width}x${viewport.height}`, async ({ page, baseURL }) => {
    await page.setViewportSize(viewport);
    const runtimeErrors: string[] = [];
    const leadRequests: string[] = [];
    page.on("pageerror", (error) => runtimeErrors.push(error.message));
    // Guard against any accidental submission; this acceptance test never submits.
    await page.route("**/api/leads", async (route) => {
      leadRequests.push(route.request().method());
      await route.abort();
    });
    await page.context().addCookies([{
      name: "cookie_consent",
      value: "v2:analytics=denied&advertising=denied",
      url: baseURL!,
      sameSite: "Lax",
    }]);
    const response = await page.goto("/seo/local");
    expect(response?.status()).toBe(200);
    await page.evaluate(() => document.fonts.ready);

    await expect(page).toHaveTitle("Agencia SEO local | Crecimiento sin complicaciones");
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://www.crecimientosincomplicaciones.com/seo/local");
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Agencia de SEO local para negocios");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /index,\s*follow/);
    const schemas = await page.locator('script[type="application/ld+json"]').evaluateAll((scripts) =>
      scripts.map((script) => JSON.parse(script.textContent ?? "")));
    expect(schemas.length).toBeGreaterThan(0);
    const schemaTypes: string[] = [];
    const visitSchema = (value: unknown) => {
      if (Array.isArray(value)) value.forEach(visitSchema);
      else if (value && typeof value === "object") {
        const node = value as Record<string, unknown>;
        if (typeof node["@type"] === "string") schemaTypes.push(node["@type"]);
        else if (Array.isArray(node["@type"])) schemaTypes.push(...node["@type"] as string[]);
        Object.values(node).forEach(visitSchema);
      }
    };
    schemas.forEach(visitSchema);
    expect(schemaTypes).toEqual(expect.arrayContaining(["Service", "BreadcrumbList"]));
    expect(schemaTypes).not.toEqual(expect.arrayContaining(["LocalBusiness"]));
    expect(schemaTypes).not.toEqual(expect.arrayContaining(["Review"]));
    expect(JSON.stringify(schemas)).not.toContain('"aggregateRating"');

    const journey = page.locator('[aria-label="Recorrido de captación local"]');
    await expect(journey).toBeVisible();
    await expect(journey).toContainText("De una búsqueda local a una consulta");
    await expect(journey.getByText(/^(Te buscan|Te encuentran|Contactan)$/)).toHaveText(["Te buscan", "Te encuentran", "Contactan"]);

    const includes = page.locator('section[aria-labelledby="includes-title"]');
    await expect(includes.locator("article")).toHaveCount(6);
    await expect(includes.locator("article h3")).toHaveText(workAreas);
    await expect(includes).toContainText("Analizar → priorizar → ejecutar → medir");
    await expect(includes).toContainText("La ejecución empieza después de aceptar la propuesta");
    await expect(includes).toContainText("la medición depende de los accesos y del seguimiento disponibles");
    await expect(includes.getByRole("heading", { name: "Complementos si hacen falta", exact: true })).toBeVisible();
    await expect(includes).toContainText("coordinar contenidos para redes sociales o presupuestar la creación de una web");
    await expect(includes).toContainText("No es necesario contratar todos los servicios");
    const factors = page.locator('section[aria-labelledby="maps-web-title"]');
    await expect(factors.getByRole("heading", { level: 3 })).toHaveText(["Relevancia", "Distancia", "Prominencia"]);
    await expect(page.locator("#proceso").getByRole("heading", { level: 2 })).toHaveText("Analizar → priorizar → ejecutar → medir");

    const example = page.locator('section[aria-labelledby="plan-title"]');
    await expect(example).toContainText("No corresponde a un cliente ni demuestra resultados obtenidos");
    await expect(example.locator("tbody tr")).toHaveCount(6);
    await expect(example.locator("tbody th")).toHaveText(exampleRows);
    await expect(example.locator("article")).toHaveCount(6);
    await expect(example.locator("article h3")).toHaveText(exampleRows);
    if (viewport.width < 768) {
      await expect(example.getByRole("table", { includeHidden: true })).toBeHidden();
      for (const card of await example.locator("article").all()) await expect(card).toBeVisible();
    } else {
      await expect(example.getByRole("table")).toBeVisible();
      for (const card of await example.locator("article").all()) await expect(card).toBeHidden();
    }

    const guarantee = page.getByRole("note");
    await expect(guarantee).toHaveText("Si en 6 meses no empiezas a ver resultados te devolvemos el dinero");
    await expect(guarantee).toBeVisible();
    const carousel = page.locator('[aria-roledescription="carrusel"][aria-label="Carrusel de reseñas verificadas"]');
    await expect(carousel.locator("[data-review-card]")).toHaveCount(7);
    await expect(page.getByLabel("Cinco estrellas. 5.0 de valoración. +50 reseñas verificadas", { exact: true })).toBeVisible();
    const previousReview = page.getByRole("button", { name: "Ver reseñas anteriores", exact: true });
    await expect(previousReview).toBeDisabled();
    const initialScroll = await carousel.evaluate((element) => element.scrollLeft);
    await page.getByRole("button", { name: "Ver más reseñas", exact: true }).click();
    await expect.poll(() => carousel.evaluate((element) => element.scrollLeft)).toBeGreaterThan(initialScroll + 100);
    await expect(previousReview).toBeEnabled();
    await previousReview.click();
    await expect.poll(() => carousel.evaluate((element) => element.scrollLeft)).toBeLessThanOrEqual(initialScroll + 4);

    const audit = page.locator("#auditoria-seo-local");
    await expect(audit).toContainText(auditScope);
    await expect(audit).toContainText("las prioridades de tu proyecto y los próximos pasos recomendados");
    const auditFaq = page.locator("#faq details").filter({ has: page.locator("summary", { hasText: "¿Qué incluye la auditoría gratuita?" }) });
    await auditFaq.locator("summary").click();
    await expect(auditFaq.locator("p")).toBeVisible();
    await expect(auditFaq.locator("p")).toContainText(auditScope);
    await expect(auditFaq).toContainText("No incluye acceso a datos privados ni la ejecución del plan");
    const renderedCopy = await page.locator("main").textContent();
    expect(renderedCopy).not.toMatch(/incentiv|filtros de satisfacción|compramos reseñas|seleccionamos solo|(?:traspaso|transferencia)(?: automática)? de autoridad|una página de tu web|toda tu página web|toda la web pública/i);

    const form = audit.locator("form.seo-audit-form");
    await expect(form).toBeVisible();
    for (const label of ["Nombre*", "Email de contacto*", "Nombre del negocio*", "Localidad donde atiendes*"]) {
      await expect(form.getByLabel(label, { exact: true })).toHaveAttribute("aria-required", "true");
      await expect(form.getByLabel(label, { exact: true })).toHaveValue("");
    }
    await expect(form.getByLabel(/^Web, perfil de Google o red social/)).not.toHaveAttribute("aria-required", "true");
    await expect(form.getByRole("button", { name: "Solicitar auditoría gratuita", exact: true })).toBeEnabled();
    const auditLinks = page.getByRole("link", { name: /auditoría gratuita/i, includeHidden: true });
    await expect(auditLinks).toHaveCount(4);
    for (const link of await auditLinks.all()) await expect(link).toHaveAttribute("href", "#auditoria-seo-local");
    const mobileCta = page.locator("div.fixed").getByRole("link", { name: "Solicitar auditoría gratuita", exact: true });
    if (viewport.width < 768) {
      await expect(mobileCta).toBeVisible();
      expect(await mobileCta.locator("..").evaluate((element) => getComputedStyle(element).position)).toBe("fixed");
      await mobileCta.click();
      await expect(page).toHaveURL(/#auditoria-seo-local$/);
    } else await expect(mobileCta).toBeHidden();

    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    expect(leadRequests, "no lead endpoint request").toEqual([]);
    expect(runtimeErrors, "browser runtime errors").toEqual([]);
  });
}
