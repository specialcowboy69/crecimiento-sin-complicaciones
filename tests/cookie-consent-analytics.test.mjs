import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { test } from "node:test";

const repoRoot = process.cwd();

async function read(relativePath) {
  return readFile(path.join(repoRoot, relativePath), "utf8");
}

async function readIfExists(relativePath) {
  return existsSync(path.join(repoRoot, relativePath)) ? read(relativePath) : "";
}

test("Vercel analytics mounts globally but excludes admin routes", async () => {
  const packageJson = await read("package.json");
  const layout = await read("app/layout.tsx");
  const analyticsPath = path.join(repoRoot, "app/components/VercelAnalytics.tsx");
  const analytics = existsSync(analyticsPath) ? await read("app/components/VercelAnalytics.tsx") : "";

  assert.match(packageJson, /"@vercel\/analytics"/);
  assert.match(layout, /import \{ VercelAnalytics \} from "\.\/components\/VercelAnalytics"/);
  assert.match(layout, /<VercelAnalytics \/>/);
  assert.match(analytics, /"use client"/);
  assert.match(analytics, /import \{ Analytics, type BeforeSendEvent \} from "@vercel\/analytics\/next"/);
  assert.match(analytics, /function filterVercelAnalyticsEvent\(event: BeforeSendEvent\)/);
  assert.match(analytics, /event\.url\.includes\("\/admin"\) \? null : event/);
  assert.match(analytics, /<Analytics beforeSend=\{filterVercelAnalyticsEvent\} \/>/);
});

test("successful lead analytics uses a non-PII allowlist", async () => {
  const submitLead = await read("app/components/submitLead.ts");

  assert.match(submitLead, /track\("lead_form_submitted", \{/);
  assert.match(submitLead, /source_page: payload\.sourcePage/);
  assert.match(submitLead, /source_path: payload\.sourcePath/);
  assert.match(submitLead, /form_type: payload\.formType/);
  assert.match(submitLead, /interested_service: payload\.interestedService/);
  assert.doesNotMatch(submitLead, /track\([^]*payload\.name/);
  assert.doesNotMatch(submitLead, /track\([^]*payload\.contact/);
  assert.doesNotMatch(submitLead, /track\([^]*payload\.company/);
  assert.doesNotMatch(submitLead, /track\([^]*payload\.message/);
});

test("GA4 is no longer mounted unconditionally in the root layout", async () => {
  const layout = await read("app/layout.tsx");

  assert.doesNotMatch(layout, /googletagmanager\.com\/gtag\/js/);
  assert.doesNotMatch(layout, /id="google-analytics"/);
  assert.match(layout, /import \{ CookieConsent \} from "\.\/components\/CookieConsent"/);
  assert.match(layout, /<CookieConsent \/>/);
});

test("cookie consent defaults GA4 off and exposes equal visitor choices", async () => {
  const consentPath = path.join(repoRoot, "app/components/CookieConsent.tsx");
  const consent = existsSync(consentPath) ? await read("app/components/CookieConsent.tsx") : "";

  assert.match(consent, /const COOKIE_CONSENT_NAME = "cookie_consent"/);
  assert.match(consent, /const COOKIE_CONSENT_ACCEPTED = "v1:accepted"/);
  assert.match(consent, /const COOKIE_CONSENT_REJECTED = "v1:rejected"/);
  assert.match(consent, />\s*Rechazar\s*</);
  assert.match(consent, />\s*Aceptar analítica\s*</);
  assert.match(consent, />\s*Configurar\s*</);
  assert.match(consent, /analytics_storage: "denied"/);
  assert.match(consent, /analytics_storage: "granted"/);
  assert.match(consent, /https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=G-VECVHEZ2DN/);
  assert.match(consent, />\s*Gestionar cookies\s*</);
  assert.match(consent, /name === "_ga" \|\| name\.startsWith\("_ga_"\)/);
  assert.match(consent, /window\.location\.reload\(\)/);
});

test("cookie consent synchronizes its stored preference without effect state writes", async () => {
  const consent = await read("app/components/CookieConsent.tsx");

  assert.match(consent, /useSyncExternalStore/);
  assert.match(consent, /useLayoutEffect/);
  assert.match(consent, /initialDialogActionRef\.current\?\.focus\(\)/);
  assert.match(consent, /preferencesAnalyticsRef\.current\?\.focus\(\)/);
  assert.match(consent, /const CONSENT_CHANGE_EVENT = "cookie-consent-change"/);
  assert.match(consent, /window\.addEventListener\(CONSENT_CHANGE_EVENT/);
  assert.doesNotMatch(consent, /useEffect/);
});

test("policy routes, form notices, and sitemap policy stay explicit", async () => {
  const cookiesPolicy = await readIfExists("app/politica-de-cookies/page.tsx");
  const privacyPolicy = await readIfExists("app/politica-de-privacidad/page.tsx");
  const notice = await readIfExists("app/components/FormPrivacyNotice.tsx");
  const consent = await read("app/components/CookieConsent.tsx");
  const sitemap = await read("app/sitemap.ts");

  assert.match(cookiesPolicy, /robots: \{ index: false, follow: true \}/);
  assert.match(cookiesPolicy, /cookie_consent/);
  assert.match(cookiesPolicy, /Google Analytics/);
  assert.match(cookiesPolicy, /_ga/);
  assert.match(cookiesPolicy, /_ga_VECVHEZ2DN/);
  assert.match(cookiesPolicy, /2 años/);
  assert.match(cookiesPolicy, /Vercel Analytics/);
  assert.match(privacyPolicy, /Crecimiento sin complicaciones S\.U\./);
  assert.match(privacyPolicy, /51092147-W/);
  assert.match(privacyPolicy, /info@crecimientosincomplicaciones\.com/);
  assert.match(privacyPolicy, /12 meses/);
  assert.match(privacyPolicy, /Firebase Data Connect/);
  assert.match(notice, /\/politica-de-privacidad/);
  assert.match(consent, /\/politica-de-cookies/);
  assert.match(consent, /\/politica-de-privacidad/);
  assert.doesNotMatch(sitemap, /politica-de-cookies|politica-de-privacidad/);
});

test("every active lead form renders the shared privacy notice", async () => {
  for (const file of [
    "app/components/LeadForm.tsx",
    "app/components/LocalSeoAuditForm.tsx",
    "app/components/SeoAuditForm.tsx",
    "app/components/WebProjectForm.tsx",
    "app/components/SocialMediaForm.tsx",
    "app/components/AiDiagnosticForm.tsx",
  ]) {
    const source = await read(file);
    assert.match(source, /FormPrivacyNotice/, `${file} must render FormPrivacyNotice`);
  }
});
