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

test("national SEO explains diagnosis, system, process and audiences without repeated card grids", () => {
  const page = source("app/seo/page.tsx");

  assert.doesNotMatch(page, /systemBlocks|difference-title|FileSearch/);
  assert.match(page, /styles\.diagnosis/);
  assert.match(page, /styles\.systemFlow/);
  assert.match(page, /styles\.processTimeline/);
  assert.match(page, /styles\.audienceRoutes/);
  assert.match(page, /\/agencia-marketing-digital\/seo-tecnico-arquitectura-entidades/);
  for (const id of ["servicio", "proceso", "seo-local", "faq", "auditoria-seo"]) {
    assert.match(page, new RegExp(`id="${id}"`));
  }
});
