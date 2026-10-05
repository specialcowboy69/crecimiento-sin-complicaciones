import { expect, test } from "@playwright/test";

test("Alicante Google Ads form sends the approved lead attribution", async ({ page }) => {
  let payload: Record<string, unknown> | undefined;
  await page.route("**/api/leads", async (route) => {
    payload = route.request().postDataJSON();
    await route.fulfill({ status: 200, contentType: "application/json", body: '{"ok":true}' });
  });

  await page.goto("/agencia-marketing-digital/google-ads/alicante");
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
