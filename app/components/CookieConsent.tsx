"use client";

import { useLayoutEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { OPEN_COOKIE_PREFERENCES_EVENT } from "./CookiePreferencesLink";
import {
  COOKIE_CONSENT_NAME,
  getCookieConsentSnapshot,
  getGoogleAnalyticsCookieDomains,
  parseCookieConsentPreferences,
  serializeCookieConsentPreferences,
} from "./cookieConsentCookies.mjs";

const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;
const CONSENT_CHANGE_EVENT = "cookie-consent-change";
const GOOGLE_ANALYTICS_ID = "G-VECVHEZ2DN";
const GOOGLE_MEASUREMENT_READY_EVENT = "google-measurement-ready";
const GOOGLE_MEASUREMENT_DISABLED_EVENT = "google-measurement-disabled";

type ConsentPreferences = {
  analytics: boolean;
  advertising: boolean;
};

type ConsentChoice = ConsentPreferences | null | undefined;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    googleAnalyticsReady?: boolean;
    "ga-disable-G-VECVHEZ2DN"?: boolean;
  }
}

const deniedGoogleConsent = {
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
  analytics_storage: "denied",
};

function toGoogleConsentState(consent: ConsentPreferences) {
  return {
    ad_storage: consent.advertising ? "granted" : "denied",
    ad_user_data: consent.advertising ? "granted" : "denied",
    ad_personalization: "denied",
    analytics_storage: consent.analytics ? "granted" : "denied",
  };
}

function readConsent(): string | null {
  return getCookieConsentSnapshot(document.cookie);
}

function isAdminPathname(pathname: string) {
  return pathname === "/admin" || pathname.startsWith("/admin/");
}

function isGoogleMeasurementDisabled() {
  return isAdminPathname(window.location.pathname) || !parseCookieConsentPreferences(readConsent() ?? "")?.analytics;
}

function subscribeToConsentChanges(onStoreChange: () => void) {
  window.addEventListener(CONSENT_CHANGE_EVENT, onStoreChange);
  return () => window.removeEventListener(CONSENT_CHANGE_EVENT, onStoreChange);
}

function getServerConsent(): undefined {
  return undefined;
}

function notifyConsentChange() {
  window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT));
}

function persistConsent(preferences: ConsentPreferences) {
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${COOKIE_CONSENT_NAME}=${serializeCookieConsentPreferences(preferences)}; Path=/; Max-Age=${COOKIE_MAX_AGE_SECONDS}; SameSite=Lax${secure}`;
}

function clearGoogleMeasurementCookies(shouldClear: (name: string) => boolean) {
  const cookieNames = document.cookie
    .split("; ")
    .map((cookie) => cookie.split("=")[0])
    .filter(shouldClear);

  for (const name of cookieNames) {
    document.cookie = `${name}=; Path=/; Max-Age=0; SameSite=Lax`;

    for (const domain of getGoogleAnalyticsCookieDomains(window.location.hostname)) {
      document.cookie = `${name}=; Path=/; Domain=${domain}; Max-Age=0; SameSite=Lax`;
    }
  }
}

function clearGoogleAnalyticsCookies() {
  clearGoogleMeasurementCookies((name) => name === "_ga" || name.startsWith("_ga_"));
}

function clearGoogleAdsCookies() {
  clearGoogleMeasurementCookies((name) => name.startsWith("_gcl_"));
}

function preferencesMatch(first: ConsentPreferences | null | undefined, second: ConsentPreferences) {
  return first?.analytics === second.analytics && first?.advertising === second.advertising;
}

export function CookieConsent() {
  const pathname = usePathname();
  const isAdmin = isAdminPathname(pathname);
  const consentValue = useSyncExternalStore(subscribeToConsentChanges, readConsent, getServerConsent);
  const consent = useMemo<ConsentChoice>(
    () => (consentValue === undefined || consentValue === null ? consentValue : parseCookieConsentPreferences(consentValue)),
    [consentValue],
  );
  const [showPreferences, setShowPreferences] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);
  const [advertisingEnabled, setAdvertisingEnabled] = useState(false);
  const initialDialogActionRef = useRef<HTMLButtonElement>(null);
  const preferencesOpenerRef = useRef<HTMLButtonElement>(null);
  const preferencesAnalyticsRef = useRef<HTMLInputElement>(null);
  const shouldRestorePreferencesFocusRef = useRef(false);
  const googleAnalyticsScriptRef = useRef<HTMLScriptElement | null>(null);
  const googleAnalyticsLoadedRef = useRef(false);

  useLayoutEffect(() => {
    // GA also sends automatic history events. Read the live URL at send time so
    // entering admin is blocked before React's route effects have run.
    Object.defineProperty(window, `ga-disable-${GOOGLE_ANALYTICS_ID}`, {
      configurable: true,
      get: isGoogleMeasurementDisabled,
    });
  }, []);

  useLayoutEffect(() => {
    if (isAdmin || !consent?.analytics || isGoogleMeasurementDisabled()) {
      window.dispatchEvent(new Event(GOOGLE_MEASUREMENT_DISABLED_EVENT));
      return;
    }

    function initializeGoogleAnalytics() {
      if (window.googleAnalyticsReady || isGoogleMeasurementDisabled()) {
        return;
      }

      const currentConsent = parseCookieConsentPreferences(readConsent() ?? "");
      if (!currentConsent?.analytics) {
        return;
      }

      if (!preferencesMatch(consent, currentConsent)) {
        window.gtag?.("consent", "update", toGoogleConsentState(currentConsent));
      }
      window.gtag?.("js", new Date());
      window.gtag?.("config", GOOGLE_ANALYTICS_ID);
      window.googleAnalyticsReady = true;
      window.dispatchEvent(new Event(GOOGLE_MEASUREMENT_READY_EVENT));
    }

    // Keep the loaded script across public/admin navigation. If loading finishes
    // in admin, defer configuration until a consenting public route is shown.
    if (googleAnalyticsLoadedRef.current) {
      initializeGoogleAnalytics();
      return;
    }

    if (googleAnalyticsScriptRef.current) {
      return;
    }

    window.googleAnalyticsReady = false;
    window.dataLayer = window.dataLayer || [];
    // Google's tag ignores arrays here; its command queue requires the Arguments object.
    // eslint-disable-next-line prefer-rest-params
    window.gtag = window.gtag || function gtag() { window.dataLayer?.push(arguments); };
    window.gtag("consent", "default", deniedGoogleConsent);
    window.gtag("consent", "update", toGoogleConsentState(consent));

    const googleAnalyticsScript = document.createElement("script");
    googleAnalyticsScript.async = true;
    googleAnalyticsScript.src = "https://www.googletagmanager.com/gtag/js?id=G-VECVHEZ2DN";
    googleAnalyticsScript.onload = () => {
      googleAnalyticsLoadedRef.current = true;
      initializeGoogleAnalytics();
    };
    googleAnalyticsScriptRef.current = googleAnalyticsScript;
    document.head.appendChild(googleAnalyticsScript);
  }, [consent, isAdmin, pathname]);

  useLayoutEffect(() => {
    if (isAdmin) {
      return;
    }

    if (shouldRestorePreferencesFocusRef.current) {
      preferencesOpenerRef.current?.focus();
      preferencesOpenerRef.current = null;
      shouldRestorePreferencesFocusRef.current = false;
      return;
    }

    if (consent === null && !showPreferences) {
      initialDialogActionRef.current?.focus();
      return;
    }

    if (showPreferences) {
      preferencesAnalyticsRef.current?.focus();
      return;
    }

  }, [consent, isAdmin, showPreferences]);

  useLayoutEffect(() => {
    if (isAdmin) {
      return;
    }

    function openPreferencesFromFooter(event: Event) {
      preferencesOpenerRef.current = event instanceof CustomEvent && event.detail instanceof HTMLButtonElement ? event.detail : null;
      setAnalyticsEnabled(consent?.analytics ?? false);
      setAdvertisingEnabled(consent?.advertising ?? false);
      setShowPreferences(true);
    }

    window.addEventListener(OPEN_COOKIE_PREFERENCES_EVENT, openPreferencesFromFooter);
    return () => window.removeEventListener(OPEN_COOKIE_PREFERENCES_EVENT, openPreferencesFromFooter);
  }, [consent, isAdmin]);

  function saveConsent(nextConsent: ConsentPreferences) {
    const changed = !preferencesMatch(consent, nextConsent);
    const hadGoogleAnalytics = consent?.analytics === true;

    shouldRestorePreferencesFocusRef.current = showPreferences && preferencesOpenerRef.current !== null;
    persistConsent(nextConsent);
    notifyConsentChange();
    setAnalyticsEnabled(nextConsent.analytics);
    setAdvertisingEnabled(nextConsent.advertising);
    setShowPreferences(false);

    if (!nextConsent.analytics) {
      clearGoogleAnalyticsCookies();
      clearGoogleAdsCookies();
    } else if (!nextConsent.advertising) {
      clearGoogleAdsCookies();
    }

    if (hadGoogleAnalytics && changed) {
      window.dispatchEvent(new Event(GOOGLE_MEASUREMENT_DISABLED_EVENT));
      window.gtag?.("consent", "update", toGoogleConsentState(nextConsent));
      window.location.reload();
    }
  }

  function acceptAll() {
    saveConsent({ analytics: true, advertising: true });
  }

  function rejectOptionalCookies() {
    saveConsent({ analytics: false, advertising: false });
  }

  function openPreferences() {
    setAnalyticsEnabled(consent?.analytics ?? false);
    setAdvertisingEnabled(consent?.advertising ?? false);
    setShowPreferences(true);
  }

  function closePreferences() {
    shouldRestorePreferencesFocusRef.current = preferencesOpenerRef.current !== null;
    setShowPreferences(false);
  }

  function savePreferences() {
    saveConsent({
      analytics: analyticsEnabled,
      advertising: analyticsEnabled && advertisingEnabled,
    });
  }

  if (consent === undefined || isAdmin) {
    return null;
  }

  return (
    <>
      {consent === null && !showPreferences ? (
        <section className="cookie-consent" role="dialog" aria-labelledby="cookie-consent-title">
          <h2 id="cookie-consent-title">Tu privacidad</h2>
          <p>
            Usamos Vercel Analytics para medir visitas de forma agregada y sin cookies. Con tu permiso activamos Google
            Analytics y la medición de conversiones de Google Ads. Puedes cambiar tu elección cuando quieras.
          </p>
          <p className="cookie-consent-legal">
            Consulta la <Link href="/politica-de-cookies">Política de cookies</Link> y la{" "}
            <Link href="/politica-de-privacidad">Política de privacidad</Link>.
          </p>
          <div className="cookie-consent-actions">
            <button
              ref={initialDialogActionRef}
              type="button"
              className="cookie-consent-button"
              onClick={rejectOptionalCookies}
            >
              Rechazar
            </button>
            <button type="button" className="cookie-consent-button" onClick={acceptAll}>
              Aceptar todas
            </button>
            <button type="button" className="cookie-consent-link" onClick={openPreferences}>
              Configurar
            </button>
          </div>
        </section>
      ) : null}

      {showPreferences ? (
        <section className="cookie-consent cookie-preferences" role="dialog" aria-labelledby="cookie-preferences-title">
          <h2 id="cookie-preferences-title">Configurar cookies</h2>
          <p>Las técnicas guardan tu elección. La analítica y la medición publicitaria son opcionales.</p>
          <label className="cookie-preference-row">
            <input type="checkbox" checked disabled />
            <span>
              <strong>Técnicas necesarias</strong>
              <small>Guardan tu preferencia de cookies.</small>
            </span>
          </label>
          <label className="cookie-preference-row">
            <input
              ref={preferencesAnalyticsRef}
              type="checkbox"
              checked={analyticsEnabled}
              onChange={(event) => {
                setAnalyticsEnabled(event.target.checked);
                if (!event.target.checked) {
                  setAdvertisingEnabled(false);
                }
              }}
            />
            <span>
              <strong>Analítica</strong>
              <small>Google Analytics nos ayuda a entender el uso de la web.</small>
            </span>
          </label>
          <label className="cookie-preference-row">
            <input
              type="checkbox"
              checked={advertisingEnabled}
              disabled={!analyticsEnabled}
              onChange={(event) => setAdvertisingEnabled(event.target.checked)}
            />
            <span>
              <strong>Publicidad y medición</strong>
              <small>
                Permite atribuir a Google Ads las solicitudes enviadas. No activamos publicidad personalizada ni remarketing.
              </small>
            </span>
          </label>
          <div className="cookie-preferences-actions">
            <button type="button" className="cookie-consent-button" onClick={savePreferences}>
              Guardar elección
            </button>
            <button type="button" className="cookie-consent-link" onClick={closePreferences}>
              Cancelar
            </button>
          </div>
        </section>
      ) : null}
    </>
  );
}
