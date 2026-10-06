import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { test } from "node:test";

const repoRoot = process.cwd();

async function read(relativePath) {
  return readFile(path.join(repoRoot, relativePath), "utf8");
}

function requiredSlice(source, startMarker, endMarker, label) {
  const start = source.indexOf(startMarker);
  assert.notEqual(start, -1, `expected ${label} start`);
  const end = source.indexOf(endMarker, start + startMarker.length);
  assert.ok(end > start, `expected ${label} end after start`);
  return source.slice(start, end);
}

test("home hero uses one full-bleed editorial background and a cases CTA", async () => {
  const page = await read("app/page.tsx");
  const hero = requiredSlice(page, 'aria-labelledby="hero-title"', 'aria-labelledby="problem-title"', "home hero");

  assert.equal(existsSync(path.join(repoRoot, "public/images/home-growth-collaboration.webp")), true);
  assert.match(page, /import Image from "next\/image"/);
  assert.match(page, /home-growth-collaboration\.webp/);
  assert.match(hero, /<Image[\s\S]*src=\{homeGrowthImage\}/);
  assert.match(hero, /preload/);
  assert.match(hero, /Convertimos tráfico en oportunidades comerciales\./);
  assert.match(hero, /Conectamos SEO, paid media, páginas y medición/);
  assert.match(hero, /Agencia de crecimiento y marketing digital/);
  assert.match(hero, /Ver casos de éxito/);
  assert.doesNotMatch(hero, /<figure|heroVisual|heroCaption|Estrategia conectada/);
  assert.doesNotMatch(hero, /Pipeline estimado|\+42\.000 EUR|\+68% impresiones|-24% CPL|\+31% conversión/);
  assert.doesNotMatch(hero, /3-5%|90 días|Core Web Vitals/);
});

test("home explains the acquisition system as a connected visual sequence", async () => {
  const page = await read("app/page.tsx");
  const stages = requiredSlice(page, "const acquisitionStages = [", "const faqs = [", "acquisition stages");
  const problem = requiredSlice(page, 'aria-labelledby="problem-title"', 'id="servicios"', "problem section");

  assert.match(stages, /Captar[\s\S]*Explicar[\s\S]*Convertir[\s\S]*Aprender/);
  for (const asset of ["capture", "explain", "convert", "learn"]) {
    assert.equal(existsSync(path.join(repoRoot, `public/images/home-stage-${asset}.webp`)), true);
    assert.match(page, new RegExp(`home-stage-${asset}\\.webp`));
  }
  assert.match(problem, /acquisitionStages\.map/);
  assert.match(problem, /<Image[\s\S]*src=\{stage\.image\}/);
  assert.doesNotMatch(problem, /Sistema conectado|SEO, Ads, páginas y datos trabajan como un solo sistema/);
  assert.doesNotMatch(problem, /Cuando cada canal trabaja por separado/);
  assert.doesNotMatch(problem, /split-copy/);
});

test("home services use linked image-led panels for canonical service routes", async () => {
  const page = await read("app/page.tsx");
  const serviceData = requiredSlice(page, "const services = [", "const acquisitionStages = [", "services data");
  const services = requiredSlice(page, 'id="servicios"', 'id="casos"', "services section");

  assert.match(page, /home-service-seo\.webp/);
  assert.match(page, /home-service-paid\.webp/);
  assert.match(page, /home-service-landing\.webp/);
  assert.match(page, /home-service-ai-automation\.webp/);
  assert.equal(existsSync(path.join(repoRoot, "public/images/home-service-ai-automation.webp")), true);
  assert.match(serviceData, /image:/);
  assert.match(serviceData, /href: "\/seo"/);
  assert.match(serviceData, /href: "\/agencia-marketing-digital\/google-ads"/);
  assert.match(serviceData, /href: "\/diseno-landing-pages"/);
  assert.match(serviceData, /href: "\/soluciones-inteligencia-artificial-empresas"/);
  assert.match(serviceData, /Automatización con IA/);
  assert.doesNotMatch(serviceData, /Analítica ejecutiva/);
  assert.match(services, /services\.map/);
  assert.match(services, /<Link[\s\S]*href=\{service\.href\}/);
  assert.match(services, /<Image[\s\S]*src=\{service\.image\}/);
  assert.match(services, /Ver servicio/);
  assert.doesNotMatch(services, /serviceNumber|serviceIcon|serviceOutcome/);
  assert.doesNotMatch(serviceData, /number:|outcome:|icon:/);
});

test("home cases focus on one story with company tabs and compact icon controls", async () => {
  const carousel = await read("app/components/CaseCarousel.tsx");
  const styles = await read("app/components/CaseCarousel.module.css");

  assert.match(carousel, /role="tablist"/);
  assert.match(carousel, /case-selector/);
  assert.match(carousel, /Resultados del proyecto/);
  assert.match(carousel, /ArrowLeft/);
  assert.match(carousel, /ArrowRight/);
  assert.doesNotMatch(carousel, />Anterior<|>Siguiente</);
  assert.match(styles, /grid-template-columns:/);
  assert.match(styles, /scroll-snap-type:\s*x mandatory/);
});

test("home comparison highlights the recommended plan and adapts labels for mobile", async () => {
  const pricing = await read("app/components/PricingToggle.tsx");
  const styles = await read("app/components/PricingToggle.module.css");

  assert.match(pricing, /Recomendado/);
  assert.match(pricing, /data-plan="Esencial"/);
  assert.match(pricing, /data-plan="Crecimiento"/);
  assert.match(pricing, /data-plan="Vanguardia"/);
  assert.match(styles, /\.comparisonTable/);
  assert.match(styles, /@media \(max-width: 720px\)/);
});

test("home diagnostic is a single low-friction audit proposal", async () => {
  const page = await read("app/page.tsx");
  const diagnostic = requiredSlice(page, 'id="diagnostico"', 'aria-labelledby="faq-title"', "diagnostic section");

  assert.match(diagnostic, /Revisamos tu web y te enviamos una propuesta clara/);
  assert.match(diagnostic, /alcance, las prioridades y los siguientes pasos/);
  assert.match(diagnostic, /Solicitar auditoría gratuita/);
  assert.doesNotMatch(page, /const diagnosticSteps/);
  assert.doesNotMatch(diagnostic, /Momento|Qué hacemos|Qué recibes|Análisis de web, SEO y campañas/);
});
