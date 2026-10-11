import assert from "node:assert/strict";
import test from "node:test";
import { validateLeadAttribution } from "../app/lib/leadAttribution.ts";

const origin = "https://www.crecimientosincomplicaciones.com";
const yes = "cookie_consent=v2:analytics=granted&advertising=granted";
const no = "cookie_consent=v2:analytics=denied&advertising=denied";
const base = {
  cookieHeader: yes,
  sourcePath: "/seo/local",
  referer: `${origin}/seo/local?gclid=AbC_123`,
  requestOrigin: origin,
  type: "gclid",
  value: "AbC_123",
};

test("server accepts a consented SEO-local click only from the same-origin form page", () => {
  assert.deepEqual(validateLeadAttribution(base), {
    adsClickType: "gclid", adsClickId: "AbC_123", adsMeasurementConsentAtSubmit: true, adsConsentVersion: "v2",
  });
});

test("server cookie decides consent even if the client supplies an ID", () => {
  assert.deepEqual(validateLeadAttribution({ ...base, cookieHeader: no }), {
    adsClickType: null, adsClickId: null, adsMeasurementConsentAtSubmit: false, adsConsentVersion: "v2",
  });
  assert.deepEqual(validateLeadAttribution({ ...base, cookieHeader: "cookie_consent=v1:accepted" }), {
    adsClickType: null, adsClickId: null, adsMeasurementConsentAtSubmit: null, adsConsentVersion: null,
  });
});

test("other paths, absent or foreign referrers cannot attach an ad click", () => {
  for (const changed of [
    { sourcePath: "/seo" },
    { referer: null },
    { referer: "https://evil.invalid/seo/local" },
    { referer: `${origin}/seo` },
  ]) {
    const result = validateLeadAttribution({ ...base, ...changed });
    assert.equal(result.adsClickId, null);
    assert.equal(result.adsClickType, null);
  }
});

test("malformed click types and values are discarded without truncation", () => {
  for (const changed of [
    { type: "fake" }, { type: ["gclid"] }, { type: { value: "gclid" } },
    { value: "" }, { value: "a b" }, { value: "x".repeat(513) }, { value: 123 },
  ]) {
    const result = validateLeadAttribution({ ...base, ...changed });
    assert.equal(result.adsClickId, null);
    assert.equal(result.adsMeasurementConsentAtSubmit, true);
  }
});
