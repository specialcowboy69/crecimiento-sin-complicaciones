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
  assert.match(page, /¿Es lo mismo una agencia SEM que una agencia Google Ads\?/);
  assert.doesNotMatch(page, /id="agencia-sem"/);
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

test("national Google Ads page uses varied visual storytelling instead of repeated card grids", async () => {
  const page = await read("app/agencia-marketing-digital/google-ads/page.tsx");
  const styles = await read("app/agencia-marketing-digital/google-ads/google-ads.module.css");

  assert.match(page, /import Image from "next\/image"/);
  assert.match(page, /import styles from "\.\/google-ads\.module\.css"/);
  assert.match(page, /De la búsqueda a una oportunidad comercial/);
  assert.match(page, /Búsquedas demasiado amplias/);
  assert.match(page, /Medición incompleta/);
  assert.match(page, /Landing desconectada/);
  assert.match(page, /Ya inviertes, pero no tienes claridad/);
  assert.match(page, /Quieres empezar con una estructura sólida/);
  assert.match(page, /Necesitas dirección especializada externa/);
  assert.match(page, /Recibes tráfico, pero pocos contactos/);
  assert.doesNotMatch(page, /audiences\.map/);

  const imageSources = page.match(/src="\/images\/google-ads-national-[^"]+\.webp"/g) || [];
  assert.ok(imageSources.length >= 2, "expected at least two national Google Ads visual assets");
  for (const source of imageSources) {
    const relativePath = source.slice(5, -1).replace(/^\//, "public/");
    assert.equal(existsSync(path.join(repoRoot, relativePath)), true, `missing ${relativePath}`);
  }

  assert.match(styles, /\.journeyPanel/);
  assert.match(styles, /\.problemVisual/);
  assert.match(styles, /\.audienceList/);
  assert.doesNotMatch(styles, /\.semSection|\.semVisual/);
  assert.match(styles, /@media \(max-width: 767px\)/);
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
  assert.match(page, /Segmentación enfocada en las zonas donde realmente trabajas/);
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
  assert.match(page, /href="\/agencia-marketing-digital"/);
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

test("Alicante page uses direct copy and varied visual storytelling", async () => {
  const file = "app/agencia-marketing-digital/google-ads/alicante/page.tsx";
  const page = await read(file);
  const nextConfig = await read("next.config.ts");

  assert.match(page, /Segmentación enfocada en las zonas donde realmente trabajas/);
  assert.match(page, /Qué problemas puede detectar la auditoría gratuita en tu cuenta/);
  assert.match(page, /Inversión en keywords equivocadas/);
  assert.match(page, /Búsqueda[\s\S]*Anuncio[\s\S]*Landing[\s\S]*Contacto[\s\S]*Aprendizaje/);

  for (const removedCopy of [
    /sin encaje/,
    /lista de municipios añadida por inercia/,
    /sin prometer cobertura donde no existe/,
    /El servicio se presta de forma remota/,
    /No es una promesa de rentabilidad/,
    /Siguiente prueba recomendada/,
  ]) {
    assert.doesNotMatch(page, removedCopy);
  }

  const imageSources = page.match(/src="\/images\/google-ads-alicante-[^"]+\.webp"/g) || [];
  assert.ok(imageSources.length >= 3, "expected at least three Alicante visual assets");
  assert.match(
    page,
    /src="\/images\/google-ads-alicante-coverage\.webp"[\s\S]*?quality=\{92\}/,
    "expected the detailed Alicante panorama to use high-quality image delivery",
  );
  assert.match(page, /sizes="\(min-width: 1024px\) 85vw, 100vw"/);
  assert.match(nextConfig, /qualities:\s*\[75, 92\]/);
  for (const source of imageSources) {
    const relativePath = source.slice(5, -1).replace(/^\//, "public/");
    assert.equal(existsSync(path.join(repoRoot, relativePath)), true, `missing ${relativePath}`);
  }
});

test("internal links expose Alicante locally without promoting it as a global service", async () => {
  const national = await read("app/agencia-marketing-digital/google-ads/page.tsx");
  const seoAlicante = await read("app/seo/alicante/page.tsx");
  const menu = await read("app/components/LandingServicesMenu.tsx");
  const pageLinks = await read("app/components/PageLinksNav.tsx");
  const architecture = await read("docs/site-architecture.md");
  const forms = await read("docs/forms-and-leads.md");
  const llms = await read("public/llms.txt");
  const route = "/agencia-marketing-digital/google-ads/alicante";

  assert.equal(national.includes(route), true);
  assert.equal(seoAlicante.includes(route), true);
  assert.match(seoAlicante, /Ver Google Ads para empresas de Alicante/);
  assert.equal(menu.includes(route), false);
  assert.equal(pageLinks.includes(route), false);
  assert.equal(architecture.includes(route), true);
  assert.match(forms, /Google Ads Alicante/);
  assert.equal(llms.includes(route), true);
});
