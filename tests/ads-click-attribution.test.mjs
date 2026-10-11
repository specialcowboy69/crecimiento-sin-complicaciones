import assert from "node:assert/strict";
import test from "node:test";
import { captureAdsClick, readAdsClick, clearAdsClick } from "../app/components/adsClickAttribution.mjs";

const granted = { analytics: true, advertising: true };
const key = "seo_local_ads_click_v1";

function storage() {
  const values = new Map();
  return {
    getItem: (name) => values.get(name) ?? null,
    setItem: (name, value) => values.set(name, value),
    removeItem: (name) => values.delete(name),
  };
}

test("a consented public URL keeps the exact highest-priority click ID for this tab", () => {
  const session = storage();
  assert.deepEqual(captureAdsClick({ pathname: "/seo/local", search: "?wbraid=old&gbraid=mid&gclid=AbC_123", preferences: granted, storage: session }), { type: "gclid", value: "AbC_123" });
  assert.deepEqual(readAdsClick({ pathname: "/seo/local", preferences: granted, storage: session }), { type: "gclid", value: "AbC_123" });
  assert.deepEqual(captureAdsClick({ pathname: "/seo/local", search: "?gbraid=New_ID", preferences: granted, storage: session }), { type: "gbraid", value: "New_ID" });
  assert.deepEqual(readAdsClick({ pathname: "/seo/local", preferences: granted, storage: session }), { type: "gbraid", value: "New_ID" });
});

test("no consent or an admin URL neither captures nor exposes a click ID", () => {
  const session = storage();
  assert.equal(captureAdsClick({ pathname: "/seo/local", search: "?gclid=AbC", preferences: { analytics: true, advertising: false }, storage: session }), null);
  assert.equal(session.getItem(key), null);
  captureAdsClick({ pathname: "/seo/local", search: "?gclid=AbC", preferences: granted, storage: session });
  assert.equal(captureAdsClick({ pathname: "/admin/leads", search: "?gclid=Different", preferences: granted, storage: session }), null);
  assert.equal(readAdsClick({ pathname: "/admin/leads", preferences: granted, storage: session }), null);
  assert.equal(session.getItem(key), null);
});

test("invalid values are discarded without truncation", () => {
  const session = storage();
  for (const value of ["", "a b", "a\nb", "x".repeat(513)]) {
    assert.equal(captureAdsClick({ pathname: "/", search: `?gclid=${encodeURIComponent(value)}`, preferences: granted, storage: session }), null);
    assert.equal(session.getItem(key), null);
  }
  assert.deepEqual(captureAdsClick({ pathname: "/", search: `?wbraid=${"x".repeat(512)}`, preferences: granted, storage: session }), { type: "wbraid", value: "x".repeat(512) });
  clearAdsClick(session);
  assert.equal(session.getItem(key), null);
});

test("storage failures never interrupt browsing or a lead", () => {
  const broken = { getItem() { throw Error("disabled"); }, setItem() { throw Error("disabled"); }, removeItem() { throw Error("disabled"); } };
  assert.equal(captureAdsClick({ pathname: "/seo/local", search: "?gclid=A", preferences: granted, storage: broken }), null);
  assert.equal(readAdsClick({ pathname: "/seo/local", preferences: granted, storage: broken }), null);
  assert.doesNotThrow(() => clearAdsClick(broken));
});
