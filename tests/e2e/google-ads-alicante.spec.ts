import { expect, test } from "@playwright/test";

test("Alicante coverage copy keeps readable contrast", async ({ page }) => {
  await page.goto("/agencia-marketing-digital/google-ads/alicante", { waitUntil: "domcontentloaded" });

  const coverageCopy = page.locator("#zona p").last();
  await expect(coverageCopy).toBeVisible();
  await expect(coverageCopy).toHaveCSS("color", "rgb(255, 255, 255)");
});

test("Alicante Google Ads form sends the approved lead attribution", async ({ page }) => {
  let payload: Record<string, unknown> | undefined;
  await page.route("**/api/leads", async (route) => {
    payload = route.request().postDataJSON();
    await route.fulfill({ status: 200, contentType: "application/json", body: '{"ok":true}' });
  });

  await page.goto("/agencia-marketing-digital/google-ads/alicante", { waitUntil: "domcontentloaded" });
  await page.getByRole("dialog", { name: "Tu privacidad" }).waitFor();
  await page.getByRole("button", { name: "Rechazar" }).click();
  await page.getByLabel("Nombre*").fill("Empresa de prueba");
  await page.getByLabel("Móvil*").fill("604990651");
  await page.getByLabel("Email (opcional)").fill("equipo@example.com");
  await page.getByLabel("Sitio web o nombre de la empresa*").fill("Proyecto Alicante");
  await expect(
    page.locator("#auditoria-google-ads-alicante").getByRole("link", { name: /política de privacidad/i }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Solicitar auditoría gratuita" }).last().click();

  await expect(page.getByRole("status")).toContainText("Solicitud enviada");
  expect(payload).toMatchObject({
    sourcePage: "Google Ads Alicante",
    sourcePath: "/agencia-marketing-digital/google-ads/alicante",
    formType: "Auditoría gratuita",
    interestedService: "Google Ads",
  });
  await expect(page.locator("#auditoria-google-ads-alicante form")).toHaveCount(0);
});


test("Alicante demand image decodes on mobile and desktop", async ({ page }) => {
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/agencia-marketing-digital/google-ads/alicante");
    const image = page.getByRole("img", { name: "Equipo de un negocio de Alicante revisando su captación digital" });
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
    const currentSrc = await image.evaluate((img: HTMLImageElement) => img.currentSrc);
    const response = await page.request.get(currentSrc);
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toMatch(/^image\//);
  }
});
