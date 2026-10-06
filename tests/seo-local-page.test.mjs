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

function requiredSlice(source, startMarker, endMarker, label) {
  const start = source.indexOf(startMarker);
  assert.notEqual(start, -1, `expected ${label} start`);
  const end = source.indexOf(endMarker, start + startMarker.length);
  assert.ok(end > start, `expected ${label} end after start`);
  return source.slice(start, end);
}

test("seo local leads with a photographic specialist local search proposition", async () => {
  const page = await read("app/seo/local/page.tsx");
  assert.match(page, /Agencia de SEO local para negocios/);
  assert.match(page, /Analizamos cómo buscan tus clientes/);
  assert.match(page, /SEO de tu web/);
  assert.match(page, /import Image from "next\/image"/);
  assert.match(page, /seo-local-hero-v2\.webp/);
  assert.match(page, /Tus competidores aparecen y tu negocio no/);
  assert.match(page, /Tu visibilidad cambia mucho según la zona/);
  assert.match(page, /Google no entiende bien qué ofreces ni dónde atiendes/);

  const buyingSituations = requiredSlice(page, "const buyingSituations = [", "const localReviewHighlights = [", "buyingSituations");
  const hero = requiredSlice(page, 'aria-labelledby="local-seo-hero-title"', 'aria-labelledby="situations-title"', "hero");

  assert.equal((buyingSituations.match(/title:/g) || []).length, 3);
  assert.doesNotMatch(page, /const localPresenceChannels/);
  assert.doesNotMatch(hero, /SEO local para negocios con ubicación o área de servicio en España/);
  assert.doesNotMatch(hero, /Una búsqueda cercana puede convertirse en una oportunidad real/);
  assert.doesNotMatch(hero, /heroEyebrow|heroSignal|heroChannels|Canales que conectamos/);
  assert.doesNotMatch(hero, /redes/i);
  assert.doesNotMatch(hero, /Si no tienes web, también la creamos/);
  assert.doesNotMatch(hero, /Recorrido de captación local|Un camino fácil de entender|Te buscan|Te encuentran|Contactan/);
});

test("seo local presents its method and service system without a generic card grid", async () => {
  const page = await read("app/seo/local/page.tsx");
  assert.match(page, /Diagnóstico de búsquedas y competencia local/);
  assert.match(page, /Perfil de Empresa de Google/);
  assert.match(page, /SEO local del sitio web/);
  assert.match(page, /Gestión de reseñas y respuestas/);
  assert.match(page, /Notoriedad y referencias del negocio/);
  assert.match(page, /Medición y prioridades/);
  assert.match(page, />\s*Nuestro método\s*<\/h2>/);
  assert.match(page, /Relevancia/);
  assert.match(page, /Distancia/);
  assert.match(page, /Prominencia/);
  assert.match(page, /seo-local-factors-v2\.webp/);
  assert.match(page, /Un sistema coordinado para que te encuentren y te elijan/);

  const workItems = requiredSlice(page, "const workItems = [", "const planRows = [", "workItems");
  const methodSteps = requiredSlice(page, "const methodSteps = [", "const budgetItems = [", "methodSteps");
  const faqs = requiredSlice(page, "const faqs = [", "const jsonLd = {", "faqs");
  const jsonLd = requiredSlice(page, "const jsonLd = {", "export const metadata", "jsonLd");
  const metadata = requiredSlice(page, "export const metadata", "export default function", "metadata");
  const includes = requiredSlice(page, 'aria-labelledby="includes-title"', 'aria-labelledby="local-reviews-title"', "includes");

  assert.equal((workItems.match(/title:/g) || []).length, 6);
  assert.equal((methodSteps.match(/step:/g) || []).length, 4);
  assert.match(methodSteps, /Analizar[\s\S]*Priorizar[\s\S]*Ejecutar[\s\S]*Medir/);
  assert.doesNotMatch(workItems, /redes/i);
  assert.doesNotMatch(includes, /Complementos si hacen falta|No es necesario contratar todos los servicios|coordinar contenidos para redes sociales/i);
  assert.doesNotMatch(page, /Analizamos las búsquedas, la zona, la competencia y tu Perfil de Empresa\. Si tienes web/);
  assert.match(faqs, /¿Tengo que contratar también redes sociales\?/);
  assert.doesNotMatch(page, /incentiv|filtros de satisfacción|compramos reseñas|seleccionamos solo|traspaso automático de autoridad|transferencia automática de autoridad/i);
  assert.match(metadata, /SEO local para Google Maps y las búsquedas de tu zona/);
  assert.doesNotMatch(metadata, /redes/i);
  assert.match(jsonLd, /SEO del sitio web, gestión de reseñas, notoriedad y medición/);
  assert.doesNotMatch(jsonLd, /redes/i);
  assert.doesNotMatch(jsonLd, /"@type": "LocalBusiness"|"@type": "Review"|aggregateRating/);
});

test("seo local example demonstrates diagnosis and the audit covers the full public website", async () => {
  const page = await read("app/seo/local/page.tsx");
  assert.match(page, /Cómo organizaríamos el SEO local de un negocio con varias zonas de servicio/);
  for (const label of [
    "Búsquedas y zona",
    "Competencia local",
    "Perfil de Google",
    "Sitio público y páginas clave",
    "Reseñas y referencias",
    "Medición",
  ]) {
    assert.match(page, new RegExp(label));
  }
  assert.doesNotMatch(page, /No corresponde a un cliente ni demuestra resultados obtenidos/);
  assert.doesNotMatch(page, /Analizar → priorizar → ejecutar → medir/);
  assert.match(page, /Revisamos el conjunto del sitio público y analizamos en detalle sus páginas clave/i);
  assert.match(page, /prioridades de tu proyecto y los próximos pasos recomendados/);
  assert.doesNotMatch(page, /Te indicamos prioridades y próximos pasos/);

  const planRows = requiredSlice(page, "const planRows = [", "const methodSteps = [", "planRows");
  const methodSteps = requiredSlice(page, "const methodSteps = [", "const budgetItems = [", "methodSteps");
  const faqs = requiredSlice(page, "const faqs = [", "const jsonLd = {", "faqs");
  const plan = requiredSlice(page, 'aria-labelledby="plan-title"', 'aria-labelledby="process-title"', "plan section");
  const audit = requiredSlice(page, 'aria-labelledby="audit-title"', '<LocalSeoAuditForm', "audit section");

  assert.equal((planRows.match(/work:/g) || []).length, 6);
  assert.match(planRows, /estructura[\s\S]*indexación[\s\S]*enlaces internos[\s\S]*servicios prioritarios/);
  assert.doesNotMatch(planRows, /reformas|baños/i);
  assert.doesNotMatch(plan, /reformas|baños/i);
  assert.match(methodSteps, /conjunto del sitio público[\s\S]*páginas clave/);
  assert.match(faqs, /conjunto del sitio público[\s\S]*páginas clave/);
  assert.match(audit, /conjunto del sitio público[\s\S]*páginas clave/);
  assert.doesNotMatch(planRows, /redes/i);
  assert.doesNotMatch(plan, /redes/i);
  for (const scope of [methodSteps, faqs, audit]) {
    assert.doesNotMatch(scope, /una página de tu web|toda tu página web|toda la web pública/i);
  }
  assert.doesNotMatch(plan, /Cada fase parte de la situación real del negocio y del alcance acordado/);
});

test("seo local situations keep each explanation with its title", async () => {
  const page = await read("app/seo/local/page.tsx");
  const situations = requiredSlice(page, 'aria-labelledby="situations-title"', 'aria-labelledby="includes-title"', "situations section");

  assert.match(situations, /className=\{styles\.situationCopy\}/);
  assert.match(situations, /styles\.situationCopy[\s\S]*<h3[\s\S]*<p/);
  assert.doesNotMatch(situations, /md:grid-cols-\[3rem_3\.5rem_minmax\(15rem,0\.8fr\)_1fr\]/);
});

test("seo local includes section uses an editorial image instead of the presence diagram", async () => {
  const page = await read("app/seo/local/page.tsx");
  const includes = requiredSlice(page, 'aria-labelledby="includes-title"', 'aria-labelledby="local-reviews-title"', "includes section");

  assert.match(page, /import localPresenceImage from "\.\.\/\.\.\/\.\.\/public\/images\/seo-local-presence-v3\.webp"/);
  assert.match(includes, /<Image[\s\S]*src=\{localPresenceImage\}/);
  assert.match(includes, /alt="Profesional revisando la visibilidad de un negocio en mapas y búsquedas locales"/);
  assert.match(includes, /className=\{styles\.presenceImage\}/);
  assert.doesNotMatch(includes, /presenceStage|presenceQuery|presenceNodes|presenceFactors|presenceMetrics/);
});

test("seo local illustrative plan labels every column without decorative vertical rules", async () => {
  const page = await read("app/seo/local/page.tsx");
  const plan = requiredSlice(page, 'aria-labelledby="plan-title"', 'aria-labelledby="process-title"', "plan section");

  assert.match(plan, /Paso/);
  assert.match(plan, /Área de trabajo/);
  assert.match(plan, /Qué revisamos/);
  assert.match(plan, /Para qué sirve/);
  assert.doesNotMatch(plan, /border-l-2|border-teal-500/);
});

test("seo local method uses one section heading", async () => {
  const page = await read("app/seo/local/page.tsx");
  const method = requiredSlice(page, 'aria-labelledby="process-title"', 'aria-labelledby="budget-title"', "method section");

  assert.match(method, /<h2[^>]*id="process-title"[^>]*>\s*Nuestro método\s*<\/h2>/);
  assert.doesNotMatch(method, /methodEyebrow|Analizar → priorizar → ejecutar → medir/);
});

test("seo local uses four high resolution editorial image assets", async () => {
  const page = await read("app/seo/local/page.tsx");
  const assets = [
    "public/images/seo-local-hero-v2.webp",
    "public/images/seo-local-factors-v2.webp",
    "public/images/seo-local-collaboration-v2.webp",
    "public/images/seo-local-presence-v3.webp",
  ];

  for (const asset of assets) {
    assert.equal(existsSync(path.join(repoRoot, asset)), true, `expected ${asset}`);
  }

  assert.match(page, /seo-local-hero-v2\.webp/);
  assert.match(page, /seo-local-factors-v2\.webp/);
  assert.match(page, /seo-local-collaboration-v2\.webp/);
  assert.match(page, /seo-local-presence-v3\.webp/);
});

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
  const carouselStyles = await read("app/components/LocalReviewsCarousel.module.css");
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
  assert.match(carousel, /data-featured-review/);
  assert.match(carousel, /Opiniones que hablan de cómo trabajamos/);
  assert.match(carousel, /aria-hidden="true">“<\/span>/);
  assert.match(carousel, /overflow-x-auto[\s\S]*snap-x/);
  assert.match(carousel, /useState/);
  assert.match(carousel, /useEffect/);
  assert.match(carousel, /updateScrollState/);
  assert.match(carousel, /querySelector<HTMLElement>\("\[data-review-card\]"\)/);
  assert.match(carousel, /scrollTo\(\{ left: nextLeft, behavior: "smooth" \}\)/);
  assert.match(carousel, /aria-disabled=\{!canScrollPrevious\}/);
  assert.match(carousel, /aria-disabled=\{!canScrollNext\}/);
  assert.match(carousel, /className="min-w-0/);
  assert.match(carousel, /className="flex min-w-0 w-full gap-5/);
  assert.match(carousel, /scroll-px-4/);
  assert.match(carousel, /pr-4/);
  assert.match(carousel, /styles\.reviewAuthor/);
  assert.match(carouselStyles, /\.reviewAuthor\s*\{[\s\S]*padding:\s*1\.25rem 0\.75rem 0\.25rem;/);
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

  assert.match(form, /formType: "Auditoría gratuita"/);
  assert.match(form, /sourcePage: "SEO local"/);
  assert.match(form, /interestedService: "SEO local"/);
  assert.match(form, /sourcePath: window\.location\.pathname/);
  assert.match(form, /Localidad donde atiende/);
  assert.doesNotMatch(form, /errors\.website/);
  assert.doesNotMatch(form, /Web a auditar/);
});
