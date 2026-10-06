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
  await page.getByLabel("Email corporativo*").fill("equipo@example.com");
  await page.getByLabel("Empresa*").fill("Proyecto Alicante");
  await page.getByRole("button", { name: "Solicitar auditoría gratuita" }).last().click();

  await expect(page.getByRole("status")).toContainText("Enviado con éxito");
  expect(payload).toMatchObject({
    sourcePage: "Google Ads Alicante",
    sourcePath: "/agencia-marketing-digital/google-ads/alicante",
    formType: "Auditoría gratuita",
    interestedService: "Google Ads",
  });
  await expect(
    page.locator("#auditoria-google-ads-alicante").getByRole("link", { name: /política de privacidad/i }),
  ).toBeVisible();
});
