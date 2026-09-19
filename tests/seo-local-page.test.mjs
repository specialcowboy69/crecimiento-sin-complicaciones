import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { test } from "node:test";

const repoRoot = process.cwd();
const route = "/seo/local";

async function read(relativePath) {
  return readFile(path.join(repoRoot, relativePath), "utf8");
}

test("seo local page is indexable with canonical metadata and schema", async () => {
  const pagePath = path.join(repoRoot, "app", "seo", "local", "page.tsx");
  assert.equal(existsSync(pagePath), true, "expected app/seo/local/page.tsx to exist");

  const page = await read("app/seo/local/page.tsx");
  assert.match(page, /const pagePath = "\/seo\/local"/);
  assert.match(page, /title: "Agencia SEO local"/);
  assert.match(page, /canonical: pagePath/);
  assert.match(page, /index: true/);
  assert.match(page, /follow: true/);
  assert.match(page, /SEO local para negocios/);
  assert.match(page, /"@type": "Service"/);
  assert.match(page, /"@type": "BreadcrumbList"/);
  assert.doesNotMatch(page, /"@type": "FAQPage"/);
  assert.doesNotMatch(page, /noindex/);
});

test("seo local route is included once in sitemap", async () => {
  const sitemap = await read("app/sitemap.ts");
  const matches = sitemap.match(/path: "\/seo\/local"/g) || [];

  assert.equal(matches.length, 1, "sitemap should include /seo/local exactly once");
});

test("seo local shows the six month refund guarantee after the hero", async () => {
  const page = await read("app/seo/local/page.tsx");
  const globals = await read("app/globals.css");
  const guarantee = "Si en 6 meses no empiezas a ver resultados te devolvemos el dinero";
  const heroIndex = page.indexOf('aria-labelledby="local-seo-hero-title"');
  const guaranteeIndex = page.indexOf(guarantee);
  const nextSectionIndex = page.indexOf('aria-labelledby="situations-title"');

  assert.notEqual(guaranteeIndex, -1, "expected the six month refund guarantee to be visible");
  assert.ok(guaranteeIndex > heroIndex, "guarantee should appear after the hero");
  assert.ok(guaranteeIndex < nextSectionIndex, "guarantee should appear before the next content section");
  assert.match(page, /text-2xl font-black[\s\S]*sm:text-3xl[\s\S]*lg:text-4xl/);
  assert.match(page, /<div\s+role="note"\s+className="[^"]*local-guarantee-text/);
  assert.match(page, /style=\{\{\s*color: "#ffffff",\s*textShadow: "0 2px 18px rgba\(15, 23, 42, 0\.28\)"\s*\}\}/);
  assert.match(globals, /\.landing-light\s+\.local-guarantee-text\s*\{[\s\S]*color:\s*#ffffff\s*!important;/);
});

test("seo local includes a verified reviews carousel after the includes section", async () => {
  const page = await read("app/seo/local/page.tsx");
  const carousel = await read("app/components/LocalReviewsCarousel.tsx");
  const includesIndex = page.indexOf('aria-labelledby="includes-title"');
  const reviewsIndex = page.indexOf('aria-labelledby="local-reviews-title"');
  const mapsIndex = page.indexOf('aria-labelledby="maps-web-title"');

  assert.notEqual(reviewsIndex, -1, "expected local reviews section to exist");
  assert.ok(reviewsIndex > includesIndex, "reviews should appear after includes");
  assert.ok(reviewsIndex < mapsIndex, "reviews should appear before the maps and web section");
  assert.match(page, /const localReviewHighlights = \[/);
  assert.match(page, /Qué suelen destacar los clientes/);
  assert.match(page, /<LocalReviewsCarousel items=\{localReviewHighlights\} \/>/);
  assert.match(carousel, /"use client";/);
  assert.match(carousel, /\+50 reseñas verificadas/);
  assert.match(carousel, /Cinco estrellas\. 5\.0 de valoración\. \+50 reseñas verificadas/);
  assert.match(carousel, />5\.0</);
  assert.match(carousel, /text-center/);
  assert.match(carousel, /aria-roledescription="carrusel"/);
  assert.match(carousel, /data-review-card/);
  assert.match(carousel, /overflow-x-auto[\s\S]*snap-x/);
  assert.match(carousel, /useState/);
  assert.match(carousel, /useEffect/);
  assert.match(carousel, /updateScrollState/);
  assert.match(carousel, /querySelector<HTMLElement>\("\[data-review-card\]"\)/);
  assert.match(carousel, /scrollTo\(\{ left: nextLeft, behavior: "smooth" \}\)/);
  assert.match(carousel, /aria-disabled=\{!canScrollPrevious\}/);
  assert.match(carousel, /aria-disabled=\{!canScrollNext\}/);
  assert.match(carousel, /<div className="min-w-0">/);
  assert.match(carousel, /className="flex min-w-0 w-full gap-4/);
  assert.match(carousel, /scroll-px-4/);
  assert.match(carousel, /pr-4/);
  assert.match(carousel, /local-review-author mt-auto grid min-w-0 gap-1 rounded-lg border border-\[#dbe3ef\] bg-slate-50/);
  assert.match(carousel, /disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white/);
  assert.match(carousel, /\{item.contactRole\}/);
  assert.doesNotMatch(carousel, /Avatar ilustrativo|role="img"|item\.initials|h-16 w-16/);
  assert.match(page, /100% recomendados/);
  assert.match(page, /agencia profesional y de calidad/i);
  assert.match(page, /se implicaron al máximo desde el primer día/i);
  assert.match(page, /Hicieron un trabajo ordenado, con buena comunicación y nos acompañaron en todo momento/);
  assert.doesNotMatch(page, /Valoran que|Resaltan|Aprecian que|Subrayan|Se quedan con|Valoran la/);
  assert.match(page, /Find It Import & Export/);
  assert.match(page, /ABCe Mobility Store/);
  assert.match(page, /Hoteles Eurostars/);
  assert.match(page, /Valcap/);
  assert.match(page, /Vin Bouquet/);
  assert.match(page, /Iludec/);
  assert.match(page, /Cosmi/);
  assert.equal((page.match(/company:/g) || []).length, 7, "expected seven visible review company entries");
  assert.equal((page.match(/contactRole:/g) || []).length, 7, "expected seven generic review role entries");
  assert.doesNotMatch(page, /initials:/);
  assert.doesNotMatch(carousel, /<img|next\/image|CEO de|Founder|Director de|Directora de/);
  assert.doesNotMatch(page, /CEO de|Founder|Director de|Directora de/);
  assert.doesNotMatch(page, /"@type": "Review"/);
  assert.doesNotMatch(page, /aggregateRating/);
});

test("seo local has launch inbound links from seo, hub and pymes pages", async () => {
  const requiredFiles = [
    "app/seo/page.tsx",
    "app/agencia-marketing-digital/page.tsx",
    "app/seo-para-pymes/page.tsx",
  ];

  for (const file of requiredFiles) {
    const content = await read(file);
    assert.equal(content.includes(route), true, `${file} should link to ${route}`);
  }
});

test("local seo form accepts businesses without a website field requirement", async () => {
  const form = await read("app/components/LocalSeoAuditForm.tsx");

  assert.match(form, /sourcePage: "SEO local"/);
  assert.match(form, /interestedService: "SEO local"/);
  assert.match(form, /sourcePath: window\.location\.pathname/);
  assert.match(form, /Localidad donde atiende/);
  assert.doesNotMatch(form, /errors\.website/);
  assert.doesNotMatch(form, /Web a auditar/);
});
