import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { test } from "node:test";

const repoRoot = process.cwd();

async function read(relativePath) {
  return readFile(path.join(repoRoot, relativePath), "utf8");
}

const pagesThatNeedBreadcrumbs = [
  {
    file: "app/diseno-pagina-web-profesional/page.tsx",
    route: "/diseno-pagina-web-profesional",
  },
  {
    file: "app/gestion-redes-sociales-empresas/page.tsx",
    route: "/gestion-redes-sociales-empresas",
  },
  {
    file: "app/soluciones-inteligencia-artificial-empresas/page.tsx",
    route: "/soluciones-inteligencia-artificial-empresas",
  },
  {
    file: "app/agencia-marketing-digital/seo-tecnico-arquitectura-entidades/page.tsx",
    route: "/agencia-marketing-digital/seo-tecnico-arquitectura-entidades",
  },
];

test("sobre nosotros page exists and exposes supported entity facts", async () => {
  const pagePath = path.join(repoRoot, "app", "sobre-nosotros", "page.tsx");
  assert.equal(existsSync(pagePath), true, "expected app/sobre-nosotros/page.tsx to exist");

  const page = await read("app/sobre-nosotros/page.tsx");
  assert.match(page, /const pagePath = "\/sobre-nosotros"/);
  assert.match(page, /title: "Sobre Crecimiento sin complicaciones"/);
  assert.match(page, /canonical: pagePath/);
  assert.match(page, /index: true/);
  assert.match(page, /follow: true/);
  assert.match(page, /Crecimiento sin complicaciones/);
  assert.match(page, /Agencia de marketing digital/);
  assert.match(page, /España/);
  assert.match(page, /Madrid, Barcelona, Valencia, Sevilla,\s+Alicante o Málaga/);
  assert.match(page, /Auditoría gratuita/);
  assert.match(page, /Dónde trabajamos/);
  assert.match(page, /Trabajamos con empresas de toda España/);
  assert.match(page, /Empresas nacionales/);
  assert.match(page, /Negocios locales/);
  assert.match(page, /Pymes en crecimiento/);
  assert.match(page, /"@type": "AboutPage"/);
  assert.match(page, /"@type": "BreadcrumbList"/);
  assert.doesNotMatch(page, /"@type": "LocalBusiness"/);
  assert.doesNotMatch(page, /"@type": "PostalAddress"/);
  assert.doesNotMatch(page, /"@type": "Review"/);
  assert.doesNotMatch(page, /aggregateRating/);
  assert.doesNotMatch(page, /No usamos datos estructurados/);
  assert.doesNotMatch(page, /aparentar sedes físicas/);
  assert.doesNotMatch(page, /tel:/);
  assert.doesNotMatch(page, /mailto:/);
});

test("sobre nosotros is discoverable from public navigation and sitemap", async () => {
  const home = await read("app/page.tsx");
  const pageLinksNav = await read("app/components/PageLinksNav.tsx");
  const sitemap = await read("app/sitemap.ts");
  const siteArchitecture = await read("docs/site-architecture.md");

  assert.equal(home.includes("/sobre-nosotros"), true, "home should link to /sobre-nosotros");
  assert.equal(pageLinksNav.includes("/sobre-nosotros"), true, "PageLinksNav should include /sobre-nosotros");
  assert.match(sitemap, /path:\s*"\/sobre-nosotros"/);
  assert.match(siteArchitecture, /\/sobre-nosotros/);
});

test("sitemap does not use dynamic build dates", async () => {
  const sitemap = await read("app/sitemap.ts");

  assert.doesNotMatch(sitemap, /lastModified:\s*new Date\(\)/);
  assert.doesNotMatch(sitemap, /lastModified/);
});

test("shared structured data helpers define stable organization and breadcrumb ids", async () => {
  const helper = await read("app/lib/structuredData.ts");
  const layout = await read("app/layout.tsx");

  assert.match(helper, /export const ORGANIZATION_ID/);
  assert.match(helper, /export const WEBSITE_ID/);
  assert.match(helper, /export function organizationJsonLd/);
  assert.match(helper, /export function webSiteJsonLd/);
  assert.match(helper, /export function breadcrumbJsonLd/);
  assert.match(helper, /"@id": ORGANIZATION_ID/);
  assert.match(helper, /"@id": WEBSITE_ID/);
  assert.match(helper, /"@context": SCHEMA_CONTEXT/);
  assert.match(helper, /https:\/\/schema\.org/);
  assert.match(helper, /Crecimiento sin complicaciones/);
  assert.match(helper, /areaServed/);
  assert.match(layout, /organizationJsonLd/);
  assert.match(layout, /webSiteJsonLd/);
  assert.match(layout, /application\/ld\+json/);
});

test("selected service pages include BreadcrumbList schema", async () => {
  for (const pageInfo of pagesThatNeedBreadcrumbs) {
    const page = await read(pageInfo.file);

    assert.match(page, /"@type": "BreadcrumbList"/, `${pageInfo.file} should include BreadcrumbList schema`);
    assert.match(page, new RegExp(pageInfo.route.replaceAll("/", "\\/")), `${pageInfo.file} should include its canonical route in breadcrumb schema`);
  }
});
