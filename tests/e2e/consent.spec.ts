import { expect, test, type BrowserContext, type Page, type Route } from "@playwright/test";

const measurementId = "G-VECVHEZ2DN";
const denied = { ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied", analytics_storage: "denied" };
const rootDomain = "crecimientosincomplicaciones.com";
const googleHost = /(^|\.)(googletagmanager\.com|google-analytics\.com|googleadservices\.com|doubleclick\.net|googlesyndication\.com)$/;
const consentValue = (analytics: boolean, advertising: boolean) =>
  `v2:analytics=${analytics ? "granted" : "denied"}&advertising=${advertising ? "granted" : "denied"}`;
const runtimeErrors = new WeakMap<Page, string[]>();

test.beforeEach(async ({ page }) => {
  const errors: string[] = [];
  runtimeErrors.set(page, errors);
  page.on("pageerror", (error) => errors.push(error.message));
});

test.afterEach(async ({ page }) => {
  expect(runtimeErrors.get(page), "browser runtime errors").toEqual([]);
});

// A deterministic stand-in for a loaded Google tag. It checks Google's documented
// ga-disable flag before config/history sends. All collection URLs are intercepted.
const googleStub = `(() => {
  const send = () => {
    if (!window['ga-disable-${measurementId}']) {
      fetch('https://www.google-analytics.com/g/collect?tid=${measurementId}&dl=' + encodeURIComponent(location.href));
    }
  };
  const layer = window.dataLayer;
  const push = layer.push.bind(layer);
  layer.push = (...items) => {
    for (const item of items) if (item[0] === 'config') send();
    return push(...items);
  };
  for (const method of ['pushState', 'replaceState']) {
    const original = history[method].bind(history);
    history[method] = (...args) => { const result = original(...args); send(); return result; };
  }
  addEventListener('popstate', send);
})();`;

async function harness(page: Page, { delayGoogle = false, leadStatus = 200 } = {}) {
  const googleRequests: string[] = [];
  const leadPayloads: unknown[] = [];
  const heldScripts: Route[] = [];
  let released = !delayGoogle;

  await page.addInitScript(() => {
    Reflect.set(window, "__testVercelEvents", []);
    Reflect.set(window, "va", (...args: unknown[]) => {
      if (args[0] === "event") Reflect.get(window, "__testVercelEvents").push(args[1]);
    });
  });
  await page.route("**/*", async (route) => {
    const url = new URL(route.request().url());
    if (googleHost.test(url.hostname)) {
      googleRequests.push(url.href);
      if (url.hostname === "www.googletagmanager.com" && url.pathname === "/gtag/js") {
        if (!released) heldScripts.push(route);
        else await route.fulfill({ contentType: "application/javascript", body: googleStub });
      } else await route.fulfill({ status: 204 });
      return;
    }
    if (url.pathname === "/api/leads") {
      leadPayloads.push(route.request().postDataJSON());
      await route.fulfill({ status: leadStatus, contentType: "application/json", body: JSON.stringify({ ok: leadStatus < 400 }) });
      return;
    }
    if (url.pathname.startsWith("/_vercel/insights/")) {
      await route.fulfill({ contentType: "application/javascript", body: "/* analytics transport stubbed */" });
      return;
    }
    if (!["127.0.0.1", "localhost", rootDomain, `www.${rootDomain}`].includes(url.hostname)) {
      await route.abort();
      return;
    }
    await route.continue();
  });
  return {
    googleRequests,
    leadPayloads,
    releaseGoogle: async () => {
      released = true;
      for (const route of heldScripts.splice(0)) await route.fulfill({ contentType: "application/javascript", body: googleStub });
    },
  };
}

async function storedConsent(context: BrowserContext, baseURL: string, analytics: boolean, advertising: boolean) {
  await context.addCookies([{ name: "cookie_consent", value: consentValue(analytics, advertising), url: baseURL, sameSite: "Lax" }]);
}

async function commands(page: Page): Promise<unknown[][]> {
  return page.evaluate(() => ((Reflect.get(window, "dataLayer") ?? []) as Array<ArrayLike<unknown>>).map((item) => Array.from(item)));
}

async function leadEvents(page: Page) {
  return (await commands(page)).filter((command) => command[0] === "event" && command[1] === "lead_seo_local_submitted");
}

async function configured(page: Page) {
  await expect.poll(async () => (await commands(page)).some((command) => command[0] === "config" && command[1] === measurementId)).toBe(true);
}

async function fillLocalForm(page: Page) {
  await page.locator("#local-seo-name").fill("Persona de prueba");
  await page.locator("#local-seo-email").fill("test@example.invalid");
  await page.locator("#local-seo-business").fill("Negocio de prueba");
  await page.locator("#local-seo-locality").fill("Madrid");
  await page.locator("#local-seo-link").fill("https://example.invalid/privado");
}

async function submitLocalForm(page: Page) {
  await fillLocalForm(page);
  await page.locator("form.seo-audit-form").getByRole("button", { name: "Solicitar auditoría gratuita", exact: true }).click();
}

test("fresh visit and rejection never request Google or create measurement cookies", async ({ page, context }) => {
  const network = await harness(page);
  await page.goto("/seo/local");
  const banner = page.getByRole("dialog", { name: "Tu privacidad" });
  await expect(banner).toBeVisible();
  await expect(banner.getByRole("button", { name: "Rechazar", exact: true })).toBeFocused();
  expect(network.googleRequests).toEqual([]);
  expect((await context.cookies()).filter((cookie) => /^_(ga|gcl)/.test(cookie.name))).toEqual([]);
  await banner.getByRole("button", { name: "Rechazar", exact: true }).click();
  await page.reload();
  await expect(banner).toBeHidden();
  expect(network.googleRequests).toEqual([]);
  const consent = (await context.cookies()).find((cookie) => cookie.name === "cookie_consent");
  expect(consent).toMatchObject({ value: consentValue(false, false), path: "/", sameSite: "Lax" });
});

for (const advertising of [false, true]) {
  test(`Google consent is queued before config, advertising ${advertising ? "granted" : "denied"}`, async ({ page }) => {
    const network = await harness(page);
    await page.goto("/seo/local");
    await page.getByRole("button", { name: "Configurar", exact: true }).click();
    const dialog = page.getByRole("dialog", { name: "Configurar cookies" });
    await expect(dialog.getByRole("checkbox", { name: /^Publicidad y medición/ })).toBeDisabled();
    await dialog.getByRole("checkbox", { name: /^Analítica/ }).check();
    if (advertising) await dialog.getByRole("checkbox", { name: /^Publicidad y medición/ }).check();
    await dialog.getByRole("button", { name: "Guardar elección" }).click();
    await configured(page);
    const layer = await commands(page);
    expect(layer[0]).toEqual(["consent", "default", denied]);
    expect(layer[1]).toEqual(["consent", "update", {
      ...denied, analytics_storage: "granted", ad_storage: advertising ? "granted" : "denied", ad_user_data: advertising ? "granted" : "denied",
    }]);
    expect(layer.findIndex((command) => command[0] === "config")).toBeGreaterThan(1);
    expect(network.googleRequests.some((url) => url.includes("/gtag/js"))).toBe(true);
  });
}

test("footer reopens preferences, cancel preserves choice, save restores focus", async ({ page, context }) => {
  await harness(page);
  await page.goto("/seo/local");
  await page.getByRole("button", { name: "Rechazar", exact: true }).click();
  const opener = page.getByRole("button", { name: "Cambiar configuración de cookies" });
  await opener.click();
  const dialog = page.getByRole("dialog", { name: "Configurar cookies" });
  await expect(dialog.getByRole("checkbox", { name: /^Analítica/ })).toBeFocused();
  await dialog.getByRole("checkbox", { name: /^Analítica/ }).check();
  await dialog.getByRole("button", { name: "Cancelar" }).click();
  await expect(opener).toBeFocused();
  expect((await context.cookies()).find((cookie) => cookie.name === "cookie_consent")?.value).toBe(consentValue(false, false));
  await opener.click();
  await expect(dialog.getByRole("checkbox", { name: /^Analítica/ })).not.toBeChecked();
  await dialog.getByRole("checkbox", { name: /^Analítica/ }).check();
  await dialog.getByRole("button", { name: "Guardar elección" }).click();
  await expect(opener).toBeFocused();
  await configured(page);
});

for (const [path, width, height] of [
  ["/seo/local", 390, 844],
  ["/seo", 390, 844],
  ["/agencia-marketing-digital", 390, 844],
  ["/diseno-landing-pages", 390, 844],
  ["/diseno-landing-pages", 820, 1180],
] as const) {
test(`footer cookie button receives a tap above fixed CTAs: ${path} at ${width}px`, async ({ page }) => {
  await page.setViewportSize({ width, height });
  await harness(page);
  await page.goto(path);
  await page.getByRole("button", { name: "Rechazar", exact: true }).click();
  const opener = page.getByRole("button", { name: "Cambiar configuración de cookies" });
  await opener.scrollIntoViewIfNeeded();
  await opener.click({ trial: true });
  await opener.click();
  await expect(page.getByRole("dialog", { name: "Configurar cookies" })).toBeVisible();
});
}

for (const revokeAnalytics of [true, false]) {
  test(`revoking ${revokeAnalytics ? "analytics" : "advertising"} removes real host and root-domain cookies across reload`, async ({ page, context, baseURL }) => {
    const network = await harness(page);
    const localOrigin = new URL(baseURL!);
    const canonicalLocalOrigin = `http://www.${rootDomain}:${localOrigin.port}`;
    await storedConsent(context, canonicalLocalOrigin, true, true);
    await context.addCookies([
      { name: "_ga", value: "host", url: canonicalLocalOrigin },
      { name: "_ga_BROWSER_TEST", value: "root", domain: `.${rootDomain}`, path: "/" },
      { name: "_gcl_host", value: "host", url: canonicalLocalOrigin },
      { name: "_gcl_root", value: "root", domain: `.${rootDomain}`, path: "/" },
    ]);
    await page.goto(`${canonicalLocalOrigin}/seo/local`);
    await configured(page);
    expect((await context.cookies()).filter((cookie) => /^_(ga|gcl)/.test(cookie.name))).toHaveLength(4);
    await page.getByRole("button", { name: "Cambiar configuración de cookies" }).click();
    const dialog = page.getByRole("dialog", { name: "Configurar cookies" });
    await dialog.getByRole("checkbox", { name: revokeAnalytics ? /^Analítica/ : /^Publicidad y medición/ }).uncheck();
    const requestCount = network.googleRequests.length;
    await Promise.all([page.waitForEvent("load"), dialog.getByRole("button", { name: "Guardar elección" }).click()]);
    const cookies = await context.cookies();
    expect(cookies.filter((cookie) => cookie.name.startsWith("_gcl_"))).toEqual([]);
    expect(cookies.find((cookie) => cookie.name === "cookie_consent")?.value).toBe(consentValue(!revokeAnalytics, false));
    if (revokeAnalytics) {
      expect(cookies.filter((cookie) => /^_ga/.test(cookie.name))).toEqual([]);
      await expect(page.locator("#google-analytics")).toHaveCount(0);
      expect(network.googleRequests.slice(requestCount)).toEqual([]);
    } else {
      expect(cookies.filter((cookie) => /^_ga/.test(cookie.name))).toHaveLength(2);
      await configured(page);
      expect((await commands(page))[1]).toEqual(["consent", "update", { ...denied, analytics_storage: "granted" }]);
    }
  });
}

test("fresh admin route with stored acceptance never initializes Google", async ({ page, context, baseURL }) => {
  const network = await harness(page);
  await storedConsent(context, baseURL!, true, true);
  await page.goto("/admin/leads");
  await expect(page.getByRole("heading", { name: "Mensajes de formularios" })).toBeVisible();
  await expect.poll(() => page.evaluate(() => Reflect.get(window, "ga-disable-G-VECVHEZ2DN"))).toBe(true);
  expect(network.googleRequests).toEqual([]);
  expect(await commands(page)).toEqual([]);
  await expect(page.getByRole("dialog")).toHaveCount(0);
});

test("fresh admin route without a choice hides the consent banner", async ({ page }) => {
  const network = await harness(page);
  await page.goto("/admin/leads");
  await expect(page.getByRole("heading", { name: "Mensajes de formularios" })).toBeVisible();
  await expect.poll(() => page.evaluate(() => Reflect.get(window, "ga-disable-G-VECVHEZ2DN"))).toBe(true);
  expect(network.googleRequests).toEqual([]);
  await expect(page.getByRole("dialog")).toHaveCount(0);
});

test("loaded tag stops automatic history collection when client path becomes admin", async ({ page, context, baseURL }) => {
  const network = await harness(page);
  await storedConsent(context, baseURL!, true, true);
  await page.goto("/seo/local");
  await configured(page);
  await page.evaluate(() => window.history.pushState(null, "", "/admin/leads"));
  await expect.poll(() => page.evaluate(() => Reflect.get(window, "ga-disable-G-VECVHEZ2DN"))).toBe(true);
  expect(network.googleRequests.filter((url) => new URL(url).searchParams.get("dl")?.includes("/admin"))).toEqual([]);
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await page.evaluate(() => window.history.pushState(null, "", "/seo/local"));
  await expect.poll(() => page.evaluate(() => Reflect.get(window, "ga-disable-G-VECVHEZ2DN"))).toBe(false);
});

for (const scenario of ["success", "failed", "rejected", "analytics-only", "no-choice", "other-path"] as const) {
  test(`lead conversion: ${scenario}`, async ({ page, context, baseURL }) => {
    const network = await harness(page, { leadStatus: scenario === "failed" ? 500 : 200 });
    if (scenario !== "no-choice") await storedConsent(context, baseURL!, scenario !== "rejected", scenario !== "rejected" && scenario !== "analytics-only");
    await page.goto(scenario === "other-path" ? "/" : "/seo/local");
    if (!["rejected", "no-choice"].includes(scenario)) await configured(page);
    if (scenario === "no-choice") {
      await page.getByRole("button", { name: "Configurar", exact: true }).click();
      await page.getByRole("button", { name: "Cancelar", exact: true }).click();
    }
    if (scenario === "other-path") {
      await page.locator("#name").fill("Persona de prueba");
      await page.locator("#email").fill("test@example.invalid");
      await page.locator("#company").fill("Negocio de prueba");
      await page.locator("form.lead-form").getByRole("button", { name: "Quiero mi auditoría" }).click();
      await expect(page.getByRole("status").filter({ hasText: "Enviado con éxito" })).toBeVisible();
    } else {
      await submitLocalForm(page);
      await expect(page.getByRole("status").filter({ hasText: scenario === "failed" ? "No hemos podido enviar" : "Hemos recibido tu solicitud" })).toBeVisible();
    }
    expect(network.leadPayloads).toHaveLength(1);
    await expect.poll(async () => (await leadEvents(page)).length).toBe(scenario === "success" ? 1 : 0);
    if (scenario === "success") expect(await leadEvents(page)).toEqual([["event", "lead_seo_local_submitted"]]);
    const vercelEvents = await page.evaluate(() => Reflect.get(window, "__testVercelEvents"));
    expect(vercelEvents).toHaveLength(scenario === "failed" ? 0 : 1);
    for (const event of vercelEvents) {
      expect(event.name).toBe("lead_form_submitted");
      expect(Object.keys(event.data).sort()).toEqual(["form_type", "interested_service", "source_page", "source_path"]);
      expect(JSON.stringify(event)).not.toMatch(/Persona de prueba|test@example\.invalid|Negocio de prueba|example\.invalid\/privado/);
    }
  });
}

test("successful lead waits for delayed tag config then emits once without parameters", async ({ page, context, baseURL }) => {
  const network = await harness(page, { delayGoogle: true });
  await storedConsent(context, baseURL!, true, true);
  await page.goto("/seo/local", { waitUntil: "domcontentloaded" });
  await expect.poll(() => network.googleRequests.length).toBe(1);
  await submitLocalForm(page);
  await expect(page.getByRole("status").filter({ hasText: "Hemos recibido tu solicitud" })).toBeVisible();
  expect(await leadEvents(page)).toEqual([]);
  await network.releaseGoogle();
  await configured(page);
  await expect.poll(async () => (await leadEvents(page)).length).toBe(1);
  const layer = await commands(page);
  expect(layer.findIndex((command) => command[0] === "event")).toBeGreaterThan(layer.findIndex((command) => command[0] === "config"));
  expect(await leadEvents(page)).toEqual([["event", "lead_seo_local_submitted"]]);
  await page.evaluate(() => window.dispatchEvent(new Event("google-measurement-ready")));
  expect(await leadEvents(page)).toHaveLength(1);
});

test("pending conversion is dropped if client path changes to admin before tag readiness", async ({ page, context, baseURL }) => {
  const network = await harness(page, { delayGoogle: true });
  await storedConsent(context, baseURL!, true, true);
  await page.goto("/seo/local", { waitUntil: "domcontentloaded" });
  await expect.poll(() => network.googleRequests.length).toBe(1);
  await submitLocalForm(page);
  await expect(page.getByRole("status").filter({ hasText: "Hemos recibido tu solicitud" })).toBeVisible();
  await page.evaluate(() => window.history.pushState(null, "", "/admin/leads"));
  await network.releaseGoogle();
  await expect.poll(() => page.evaluate(() => Reflect.get(window, "ga-disable-G-VECVHEZ2DN"))).toBe(true);
  expect((await commands(page)).filter((command) => command[0] === "config")).toEqual([]);
  expect(await leadEvents(page)).toEqual([]);
  expect((await context.cookies()).find((cookie) => cookie.name === "cookie_consent")?.value).toBe(consentValue(true, true));
  await page.evaluate(() => window.history.pushState(null, "", "/seo/local"));
  await configured(page);
  expect((await commands(page)).filter((command) => command[0] === "config")).toEqual([["config", measurementId]]);
  expect(await leadEvents(page)).toEqual([]);
});

test("invalid local form creates neither a lead request nor a conversion", async ({ page, context, baseURL }) => {
  const network = await harness(page);
  await storedConsent(context, baseURL!, true, true);
  await page.goto("/seo/local");
  await configured(page);
  await page.locator("form.seo-audit-form").getByRole("button", { name: "Solicitar auditoría gratuita", exact: true }).click();
  await expect(page.locator("#local-seo-name-error")).toBeVisible();
  expect(network.leadPayloads).toEqual([]);
  expect(await leadEvents(page)).toEqual([]);
});

test("pending conversion is dropped after optional consent is revoked", async ({ page, context, baseURL }) => {
  const network = await harness(page, { delayGoogle: true });
  await storedConsent(context, baseURL!, true, true);
  await page.goto("/seo/local", { waitUntil: "domcontentloaded" });
  await expect.poll(() => network.googleRequests.length).toBe(1);
  await submitLocalForm(page);
  await expect(page.getByRole("status").filter({ hasText: "Hemos recibido tu solicitud" })).toBeVisible();
  // Simulate the preference-store notification without unloading the document,
  // so the queue's cancellation can be observed independently of pagehide.
  await page.evaluate((value) => {
    document.cookie = `cookie_consent=${value}; Path=/; SameSite=Lax`;
    window.dispatchEvent(new Event("cookie-consent-change"));
  }, consentValue(false, false));
  await network.releaseGoogle();
  await expect.poll(() => page.evaluate(() => Reflect.get(window, "ga-disable-G-VECVHEZ2DN"))).toBe(true);
  expect(await leadEvents(page)).toEqual([]);
});
