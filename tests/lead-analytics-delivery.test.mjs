import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import ts from "typescript";

// Execute the real shared submit path with browser/provider boundaries replaced.
const submitSource = await readFile(new URL("../app/components/submitLead.ts", import.meta.url), "utf8");
const trackModule = "data:text/javascript," + encodeURIComponent("export function track(...args) { globalThis.__leadTestTrack(...args); }");
const compiled = ts.transpileModule(submitSource, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 },
}).outputText
  .replace('"@vercel/analytics"', JSON.stringify(trackModule))
  .replace(/from "\.\/([^\"]+)"/g, (_, file) => `from ${JSON.stringify(new URL(`../app/components/${file}`, import.meta.url).href)}`);
const { submitLead } = await import("data:text/javascript," + encodeURIComponent(compiled));

const granted = "cookie_consent=v2:analytics=granted&advertising=granted";
const denied = "cookie_consent=v2:analytics=denied&advertising=denied";
const lead = {
  sourcePage: "SEO local", sourcePath: "/seo/local", formType: "Auditoría gratuita",
  name: "Test User", contact: "test@example.invalid", company: "Private Company", message: "Private message",
};

function browser(t, { cookie = granted, ready = false } = {}) {
  const original = new Map(["window", "document", "fetch", "__leadTestTrack"].map((key) => [key, Object.getOwnPropertyDescriptor(globalThis, key)]));
  const win = new EventTarget();
  const calls = [];
  const tracks = [];
  const requests = [];
  const timers = new Map();
  const listeners = new Map();
  let now = 0;
  const originalNow = Date.now;
  Date.now = () => now;
  let nextTimer = 0;
  const add = win.addEventListener.bind(win);
  const remove = win.removeEventListener.bind(win);
  win.addEventListener = (name, callback, options) => {
    if (!listeners.has(name)) listeners.set(name, new Set());
    listeners.get(name).add(callback);
    add(name, callback, options);
  };
  win.removeEventListener = (name, callback, options) => {
    listeners.get(name)?.delete(callback);
    remove(name, callback, options);
  };
  win.location = { pathname: "/seo/local" };
  win.googleAnalyticsReady = ready;
  win.gtag = ready ? (...args) => calls.push(args) : undefined;
  win.setTimeout = (callback, delay) => {
    const id = ++nextTimer;
    timers.set(id, { callback, at: now + delay });
    return id;
  };
  win.clearTimeout = (id) => timers.delete(id);
  globalThis.window = win;
  globalThis.document = { cookie };
  globalThis.__leadTestTrack = (...args) => tracks.push(args);
  globalThis.fetch = async (...args) => { requests.push(args); return { ok: true }; };
  t.after(() => {
    Date.now = originalNow;
    for (const [key, descriptor] of original) {
      if (descriptor) Object.defineProperty(globalThis, key, descriptor);
      else delete globalThis[key];
    }
  });
  return {
    win, calls, tracks, requests, timers,
    elapseWithoutTimers(ms) { now += ms; },
    advance(ms) {
      const end = now + ms;
      while (true) {
        const next = [...timers].filter(([, item]) => item.at <= end).sort((a, b) => a[1].at - b[1].at)[0];
        if (!next) break;
        const [id, item] = next;
        now = item.at;
        timers.delete(id);
        item.callback();
      }
      now = end;
    },
    ready() {
      win.gtag = (...args) => calls.push(args);
      win.googleAnalyticsReady = true;
      win.dispatchEvent(new Event("google-measurement-ready"));
    },
    assertClean() {
      assert.equal(timers.size, 0, "no pending retries");
      assert.equal([...listeners.values()].reduce((count, set) => count + set.size, 0), 0, "no retained lifecycle listeners");
    },
  };
}

test("an already consenting successful lead waits for GA readiness and emits once without parameters", async (t) => {
  const h = browser(t);
  await submitLead(lead);
  assert.deepEqual(h.calls, []);
  h.advance(300);
  h.ready();
  h.advance(500);
  h.win.dispatchEvent(new Event("google-measurement-ready"));
  assert.deepEqual(h.calls, [["event", "lead_seo_local_submitted"]]);
  assert.equal(h.requests.length, 1);
  assert.equal(h.tracks.length, 1);
  assert.deepEqual(h.tracks[0], ["lead_form_submitted", {
    source_page: "SEO local", source_path: "/seo/local", form_type: "Auditoría gratuita",
  }]);
  h.assertClean();
});

test("a gtag stub alone is not ready until Google has been configured", async (t) => {
  const h = browser(t);
  h.win.gtag = (...args) => h.calls.push(args);
  await submitLead(lead);
  assert.deepEqual(h.calls, []);
  h.ready();
  assert.deepEqual(h.calls, [["event", "lead_seo_local_submitted"]]);
  h.assertClean();
});

test("readiness detected without a notification still delivers once", async (t) => {
  const h = browser(t);
  await submitLead(lead);
  h.win.gtag = (...args) => h.calls.push(args);
  h.win.googleAnalyticsReady = true;
  h.advance(100);
  h.advance(500);
  assert.deepEqual(h.calls, [["event", "lead_seo_local_submitted"]]);
  h.assertClean();
});

for (const [label, cookie] of [["no choice", ""], ["rejection", denied], ["analytics only", "cookie_consent=v2:analytics=granted&advertising=denied"], ["legacy acceptance", "cookie_consent=v1:accepted"]]) {
  test(`${label} does not retain a conversion for a later consent grant`, async (t) => {
    const h = browser(t, { cookie });
    await submitLead(lead);
    document.cookie = granted;
    h.win.dispatchEvent(new Event("cookie-consent-change"));
    h.ready();
    h.advance(500);
    assert.deepEqual(h.calls, []);
    h.assertClean();
  });
}

test("consent granted while the API request is pending cannot replay an unconsented lead", async (t) => {
  const h = browser(t, { cookie: denied });
  let complete;
  globalThis.fetch = () => new Promise((resolve) => { complete = resolve; });
  const submission = submitLead(lead);
  document.cookie = granted;
  h.ready();
  complete({ ok: true });
  await submission;
  assert.deepEqual(h.calls, []);
  h.assertClean();
});

for (const [label, cancel] of [
  ["revocation", (h) => { document.cookie = denied; h.win.dispatchEvent(new Event("cookie-consent-change")); document.cookie = granted; }],
  ["admin lifecycle", (h) => { h.win.location.pathname = "/admin/leads"; h.win.dispatchEvent(new Event("google-measurement-disabled")); h.win.location.pathname = "/seo/local"; }],
  ["page exit", (h) => h.win.dispatchEvent(new Event("pagehide"))],
]) {
  test(`${label} permanently cancels an in-memory pending lead`, async (t) => {
    const h = browser(t);
    await submitLead(lead);
    cancel(h);
    h.ready();
    h.advance(500);
    assert.deepEqual(h.calls, []);
    h.assertClean();
  });
}

test("the live admin pathname cancels pending delivery even before React route effects", async (t) => {
  const h = browser(t);
  await submitLead(lead);
  h.win.location.pathname = "/admin/leads";
  h.advance(100);
  h.win.location.pathname = "/seo/local";
  h.ready();
  assert.deepEqual(h.calls, []);
  h.assertClean();
});

test("removal of consent cancels delivery even without a consent notification", async (t) => {
  const h = browser(t);
  await submitLead(lead);
  document.cookie = "";
  h.advance(100);
  document.cookie = granted;
  h.ready();
  assert.deepEqual(h.calls, []);
  h.assertClean();
});

test("blocked Google loading expires without retaining timers or listeners", async (t) => {
  const h = browser(t);
  await submitLead(lead);
  h.advance(30_100);
  h.ready();
  assert.deepEqual(h.calls, []);
  h.assertClean();
});

test("readiness after the deadline cannot deliver when browser timers were suspended", async (t) => {
  const h = browser(t);
  await submitLead(lead);
  h.elapseWithoutTimers(30_001);
  h.ready();
  assert.deepEqual(h.calls, []);
  h.assertClean();
});

test("a different source route or live admin route cannot emit a lead conversion", async (t) => {
  const h = browser(t, { ready: true });
  await submitLead({ ...lead, sourcePath: "/seo" });
  h.win.location.pathname = "/admin";
  await submitLead(lead);
  assert.deepEqual(h.calls, []);
  h.assertClean();
});

test("an unsuccessful API response emits neither analytics event", async (t) => {
  const h = browser(t, { ready: true });
  globalThis.fetch = async () => ({ ok: false });
  await assert.rejects(submitLead(lead), /Lead submission failed/);
  assert.deepEqual(h.calls, []);
  assert.deepEqual(h.tracks, []);
  h.assertClean();
});

test("Vercel tracking failure cannot reject an already stored lead or suppress its GA conversion", async (t) => {
  const h = browser(t, { ready: true });
  globalThis.__leadTestTrack = () => { throw new Error("provider failure"); };
  await assert.doesNotReject(submitLead(lead));
  assert.deepEqual(h.calls, [["event", "lead_seo_local_submitted"]]);
  h.assertClean();
});

test("Google tracking failure cannot reject an already stored lead and is not retried", async (t) => {
  const h = browser(t, { ready: true });
  let attempts = 0;
  h.win.gtag = () => { attempts++; throw new Error("provider failure"); };
  await assert.doesNotReject(submitLead(lead));
  h.advance(500);
  assert.equal(attempts, 1);
  h.assertClean();
});
