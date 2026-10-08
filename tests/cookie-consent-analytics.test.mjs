import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { test } from "node:test";
import * as cookieConsentCookies from "../app/components/cookieConsentCookies.mjs";

const { GA_COOKIE_ROOT_DOMAIN, getCookieConsentSnapshot, getGoogleAnalyticsCookieDomains } = cookieConsentCookies;

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

test("cookie consent defaults optional measurement off and exposes equal visitor choices", async () => {
  const consentPath = path.join(repoRoot, "app/components/CookieConsent.tsx");
  const consent = existsSync(consentPath) ? await read("app/components/CookieConsent.tsx") : "";

  assert.match(consent, /parseCookieConsentPreferences/);
  assert.match(consent, /serializeCookieConsentPreferences/);
  assert.match(consent, />\s*Rechazar\s*</);
  assert.match(consent, />\s*Aceptar todas\s*</);
  assert.match(consent, />\s*Configurar\s*</);
  assert.match(consent, /analytics_storage: "denied"/);
  assert.match(consent, /analytics_storage: consent\.analytics \? "granted" : "denied"/);
  assert.match(consent, /ad_storage: consent\.advertising \? "granted" : "denied"/);
  assert.match(consent, /ad_user_data: consent\.advertising \? "granted" : "denied"/);
  assert.match(consent, /ad_personalization: "denied"/);
  assert.match(consent, /https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=G-VECVHEZ2DN/);
  assert.doesNotMatch(consent, /cookie-preferences-button/);
  assert.match(consent, /name === "_ga" \|\| name\.startsWith\("_ga_"\)/);
  assert.match(consent, /name\.startsWith\("_gcl_"\)/);
  assert.match(consent, /for \(const domain of getGoogleAnalyticsCookieDomains\(window\.location\.hostname\)\)/);
  assert.match(consent, /window\.location\.reload\(\)/);
});

test("a shared public footer keeps an accessible cookie-preferences opener without a floating manager", async () => {
  const layout = await read("app/layout.tsx");
  const footer = await readIfExists("app/components/SiteFooter.tsx");
  const preferencesLink = await readIfExists("app/components/CookiePreferencesLink.tsx");
  const consent = await read("app/components/CookieConsent.tsx");
  const styles = await read("app/globals.css");

  assert.match(layout, /import \{ SiteFooter \} from "\.\/components\/SiteFooter"/);
  assert.match(layout, /<SiteFooter showBlog=\{isBlogPublished\(\)\} \/>/);
  assert.match(footer, /<CookiePreferencesLink \/>/);
  assert.match(preferencesLink, />\s*Cambiar configuración de cookies\s*</);
  assert.match(preferencesLink, /OPEN_COOKIE_PREFERENCES_EVENT/);
  assert.match(preferencesLink, /new CustomEvent\(OPEN_COOKIE_PREFERENCES_EVENT/);
  assert.match(consent, /window\.addEventListener\(OPEN_COOKIE_PREFERENCES_EVENT/);
  assert.match(consent, /preferencesOpenerRef\.current\?\.focus\(\)/);
  assert.ok(
    consent.indexOf("if (shouldRestorePreferencesFocusRef.current)") < consent.indexOf("if (consent === null && !showPreferences)"),
    "closing preferences opened from the footer must restore its opener before banner focus is applied",
  );
  assert.doesNotMatch(styles, /\.cookie-preferences-button/);
});

test("GA cookie cleanup covers the public parent domain without affecting other hosts", () => {
  assert.equal(GA_COOKIE_ROOT_DOMAIN, "crecimientosincomplicaciones.com");
  assert.deepEqual(getGoogleAnalyticsCookieDomains("www.crecimientosincomplicaciones.com"), [
    "www.crecimientosincomplicaciones.com",
    "crecimientosincomplicaciones.com",
  ]);
  assert.deepEqual(getGoogleAnalyticsCookieDomains("crecimientosincomplicaciones.com"), [
    "crecimientosincomplicaciones.com",
  ]);
  assert.deepEqual(getGoogleAnalyticsCookieDomains("localhost"), ["localhost"]);
});

test("cookie consent external-store snapshot stays stable until the stored choice changes", () => {
  const legacyAccepted = "v1:accepted";
  const granted = "v2:analytics=granted&advertising=granted";

  assert.equal(getCookieConsentSnapshot("session=first"), null);
  assert.strictEqual(getCookieConsentSnapshot(`session=first; cookie_consent=${legacyAccepted}`), legacyAccepted);
  assert.strictEqual(getCookieConsentSnapshot(`session=second; cookie_consent=${legacyAccepted}`), legacyAccepted);
  assert.notStrictEqual(getCookieConsentSnapshot(`cookie_consent=${granted}`), legacyAccepted);
  assert.strictEqual(getCookieConsentSnapshot(`cookie_consent=${granted}`), granted);
});

test("Google Ads records a local SEO lead only with explicit analytics and advertising consent", () => {
  const { parseCookieConsentPreferences, sendGoogleAdsSeoLocalLeadEvent } = cookieConsentCookies;

  assert.deepEqual(parseCookieConsentPreferences?.("v1:accepted"), {
    analytics: true,
    advertising: false,
  });
  assert.deepEqual(parseCookieConsentPreferences?.("v2:analytics=granted&advertising=granted"), {
    analytics: true,
    advertising: true,
  });

  const calls = [];
  assert.equal(
    sendGoogleAdsSeoLocalLeadEvent?.({
      cookieHeader: "session=active; cookie_consent=v2:analytics=granted&advertising=granted",
      sourcePath: "/seo/local",
      gtag: (...args) => calls.push(args),
    }),
    true,
  );
  assert.deepEqual(calls, [["event", "lead_seo_local_submitted"]]);

  assert.equal(
    sendGoogleAdsSeoLocalLeadEvent?.({
      cookieHeader: "cookie_consent=v2:analytics=granted&advertising=denied",
      sourcePath: "/seo/local",
      gtag: (...args) => calls.push(args),
    }),
    false,
  );
  assert.equal(
    sendGoogleAdsSeoLocalLeadEvent?.({
      cookieHeader: "cookie_consent=v2:analytics=granted&advertising=granted",
      sourcePath: "/seo",
      gtag: (...args) => calls.push(args),
    }),
    false,
  );
  assert.deepEqual(calls, [["event", "lead_seo_local_submitted"]]);
});

test("cookie consent synchronizes its stored preference without effect state writes", async () => {
  const consent = await read("app/components/CookieConsent.tsx");

  assert.match(consent, /useSyncExternalStore/);
  assert.match(consent, /useLayoutEffect/);
  assert.match(consent, /getCookieConsentSnapshot\(document\.cookie\)/);
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
  assert.match(cookiesPolicy, /Google Ads/);
  assert.match(cookiesPolicy, /sin personalización ni remarketing/);
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
