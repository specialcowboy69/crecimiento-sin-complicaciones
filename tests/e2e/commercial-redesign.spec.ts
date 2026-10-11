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
  expect(await image.evaluate((element: HTMLImageElement) => element.naturalWidth)).toBeGreaterThan(0);
  const box = await image.boundingBox();
  expect(box?.width).toBeGreaterThanOrEqual(1439);
});
