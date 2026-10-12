import assert from "node:assert/strict";
import { readFileSync, statSync } from "node:fs";
import path from "node:path";
import test from "node:test";

const root = process.cwd();
const source = (file) => readFileSync(path.join(root, file), "utf8");
const asset = (file) => statSync(path.join(root, "public", "images", file));

test("Google Ads has a photographic hero and no duplicate navigation", () => {
  const page = source("app/agencia-marketing-digital/google-ads/page.tsx");

  assert.doesNotMatch(page, /PageLinksNav|journeyPanel/);
  assert.match(page, /google-ads-hero-editorial\.webp/);
  assert.match(page, /href: "\/diseno-landing-pages"/);
  assert.match(page, /href="#auditoria-google-ads"/);
  assert.ok(asset("google-ads-hero-editorial.webp").size > 10_000);
});

test("national SEO uses an image hero and a light contact variant", () => {
  const page = source("app/seo/page.tsx");
  const form = source("app/components/SeoAuditForm.tsx");

  assert.doesNotMatch(page, /seo-audit-panel|seo-audit-step-grid|24-48h/);
  assert.match(page, /seo-hero-editorial\.webp/);
  assert.match(page, /<SeoAuditForm contactDark=\{false\}/);
  assert.match(form, /contactDark\?: boolean/);
  assert.match(form, /<ContactOptions dark=\{contactDark\}/);
  assert.ok(asset("seo-hero-editorial.webp").size > 10_000);
});

test("national SEO explains diagnosis, an image-led system, process and audiences", () => {
  const page = source("app/seo/page.tsx");

  assert.doesNotMatch(page, /systemBlocks|difference-title|FileSearch/);
  assert.match(page, /styles\.diagnosis/);
  assert.match(page, /styles\.systemGrid/);
  assert.match(page, /styles\.systemVisual/);
  assert.match(page, /styles\.processGrid/);
  assert.match(page, /styles\.audienceRoutes/);
  assert.match(page, /\/agencia-marketing-digital\/seo-tecnico-arquitectura-entidades/);
  for (const id of ["servicio", "proceso", "seo-local", "faq", "auditoria-seo"]) {
    assert.match(page, new RegExp(`id="${id}"`));
  }
});

test("Landing Pages uses a full-bleed image hero without duplicate navigation or a time promise", () => {
  const page = source("app/diseno-landing-pages/page.tsx");

  assert.doesNotMatch(page, /PageLinksNav|hero-visual-frame|landingChecks|Respuesta en menos de 24h/);
  assert.match(page, /landing-pages-hero-editorial\.webp/);
  assert.match(page, /href="#auditoria-landing-pages-form"/);
  assert.ok(asset("landing-pages-hero-editorial.webp").size > 10_000);
});

test("Landing Pages uses photography and an asymmetric solution instead of a text mockup", () => {
  const page = source("app/diseno-landing-pages/page.tsx");

  assert.doesNotMatch(page, /anatomyBrowser|anatomyPage|solutionMoments|momentDetail/);
  assert.match(page, /styles\.landingAnatomy/);
  assert.match(page, /styles\.solutionBento/);
  assert.match(page, /landing-page-comparison-editorial\.webp/);
  assert.match(page, /landing-page-review-editorial\.webp/);
  assert.match(page, /Mensaje|Acción|Aprendizaje/);
  assert.ok(asset("landing-page-comparison-editorial.webp").size > 10_000);
  assert.ok(asset("landing-page-review-editorial.webp").size > 10_000);
  for (const id of ["problema", "solucion", "para-quien", "incluye"]) {
    assert.match(page, new RegExp(`id="${id}"`));
  }
});

test("Landing Pages audience, deliverables and process have distinct editorial layouts", () => {
  const page = source("app/diseno-landing-pages/page.tsx");
  const redesigned = page.split('id="para-quien"')[1]?.split('id="relacionados"')[0] ?? "";

  assert.match(page, /styles\.audienceList/);
  assert.match(page, /styles\.deliverablesGrid/);
  assert.match(page, /styles\.deliverableCard/);
  assert.match(page, /styles\.processTrack/);
  assert.match(page, /styles\.auditSectionInner/);
  assert.doesNotMatch(page, /lg:grid-cols-\[0\.8fr_1fr\]/);
  assert.doesNotMatch(redesigned, /rounded-lg border border-slate-200 bg-white p-6 shadow-sm/);
  assert.doesNotMatch(page, /Más elementos no hacen más clara una oferta/);
});
