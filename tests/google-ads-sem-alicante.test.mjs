import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { test } from "node:test";

const repoRoot = process.cwd();

async function read(relativePath) {
  return readFile(path.join(repoRoot, relativePath), "utf8");
}

test("national Google Ads page visibly owns Google Ads and SEM intent", async () => {
  const page = await read("app/agencia-marketing-digital/google-ads/page.tsx");
  const hub = await read("app/agencia-marketing-digital/page.tsx");
  const sitemap = await read("app/sitemap.ts");
  const redirects = await read("next.config.ts");

  assert.match(page, /const pagePath = "\/agencia-marketing-digital\/google-ads"/);
  assert.match(page, /title: "Agencia Google Ads y SEM para empresas"/);
  assert.match(page, /canonical: pagePath/);
  assert.match(page, /Agencia Google Ads y SEM/);
  assert.match(page, /Somos una agencia SEM especializada en Google Ads/);
  assert.match(page, /Agencia SEM y Google Ads: una intención de búsqueda, una plataforma concreta/);
  assert.match(page, /¿Es lo mismo una agencia SEM que una agencia Google Ads\?/);
  assert.match(hub, /Google Ads y SEM/);
  assert.equal(existsSync(path.join(repoRoot, "app", "agencia-marketing-digital", "sem", "page.tsx")), false);
  assert.doesNotMatch(sitemap, /path: "\/agencia-marketing-digital\/sem"/);
  for (const legacy of [
    "/sem-paid-growth",
    "/agencia-marketing-digital/sem-paid-growth",
    "/servicios/sem-paid-growth",
  ]) {
    assert.equal(redirects.includes(legacy), true, `expected legacy redirect for ${legacy}`);
  }
});

test("Alicante is a distinct indexable Google Ads and SEM service page", async () => {
  const file = "app/agencia-marketing-digital/google-ads/alicante/page.tsx";
  assert.equal(existsSync(path.join(repoRoot, file)), true);
  const page = await read(file);
  const sitemap = await read("app/sitemap.ts");

  assert.match(page, /const pagePath = "\/agencia-marketing-digital\/google-ads\/alicante"/);
  assert.match(page, /title: "Agencia SEM Alicante para empresas"/);
  assert.match(page, /canonical: pagePath/);
  assert.match(page, /index: true/);
  assert.match(page, /follow: true/);
  assert.match(page, /Agencia SEM para empresas de Alicante que quieren captar demanda con Google Ads/);
  assert.match(page, /Una campaña local necesita separar servicio, zona e intención/);
  assert.match(page, /Segmentación geográfica sin prometer cobertura donde no existe/);
  assert.match(page, /Trabajamos de forma remota con empresas de toda España/);
  assert.match(page, /"@type": "Service"/);
  assert.match(page, /breadcrumbJsonLd/);
  assert.match(page, /ORGANIZATION_ID/);
  assert.match(page, /"@type": "FAQPage"/);
  assert.doesNotMatch(page, /"@type": "LocalBusiness"|"@type": "PostalAddress"|aggregateRating|"@type": "Review"/);
  assert.doesNotMatch(page, /nuestra oficina en Alicante|sede en Alicante|equipo local en Alicante|somos una agencia en Alicante/i);
  assert.match(page, /sourcePage="Google Ads Alicante"/);
  assert.match(page, /interestedService="Google Ads"/);
  assert.match(page, /id="auditoria-google-ads-alicante"/);
  assert.match(page, /href="\/agencia-marketing-digital\/google-ads"/);
  assert.match(page, /href="\/seo\/alicante"/);
  assert.match(page, /href="\/diseno-landing-pages"/);

  const matches = sitemap.match(/path: "\/agencia-marketing-digital\/google-ads\/alicante"/g) || [];
  assert.equal(matches.length, 1);
  assert.match(sitemap, /path: "\/agencia-marketing-digital\/google-ads\/alicante", priority: 0\.8/);
});

test("Alicante page avoids unsupported proof, prices, and demo components", async () => {
  const file = "app/agencia-marketing-digital/google-ads/alicante/page.tsx";
  assert.equal(existsSync(path.join(repoRoot, file)), true);
  const page = await read(file);

  assert.doesNotMatch(page, /5\.2x|\bROAS\b|\bCPL\b|12\.000|199 €|399 €|CaseCarousel|PricingToggle|PaidGrowthCalculatorForm/);
});
