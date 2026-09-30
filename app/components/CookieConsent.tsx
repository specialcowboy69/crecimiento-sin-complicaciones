"use client";

import { useLayoutEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import Script from "next/script";
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

type ConsentPreferences = {
  analytics: boolean;
  advertising: boolean;
};

type ConsentChoice = ConsentPreferences | null | undefined;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
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

  useLayoutEffect(() => {
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

  }, [consent, showPreferences]);

  useLayoutEffect(() => {
    function openPreferencesFromFooter(event: Event) {
      preferencesOpenerRef.current = event instanceof CustomEvent && event.detail instanceof HTMLButtonElement ? event.detail : null;
      setAnalyticsEnabled(consent?.analytics ?? false);
      setAdvertisingEnabled(consent?.advertising ?? false);
      setShowPreferences(true);
    }

    window.addEventListener(OPEN_COOKIE_PREFERENCES_EVENT, openPreferencesFromFooter);
    return () => window.removeEventListener(OPEN_COOKIE_PREFERENCES_EVENT, openPreferencesFromFooter);
  }, [consent]);

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

  if (consent === undefined) {
    return null;
  }

  const googleConsent = consent ? toGoogleConsentState(consent) : deniedGoogleConsent;

  return (
    <>
      {consent?.analytics ? (
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            window.gtag = window.gtag || function gtag() { window.dataLayer.push(arguments); };
            window.gtag("consent", "default", ${JSON.stringify(deniedGoogleConsent)});
            window.gtag("consent", "update", ${JSON.stringify(googleConsent)});
            const googleAnalyticsScript = document.createElement("script");
            googleAnalyticsScript.async = true;
            googleAnalyticsScript.src = "https://www.googletagmanager.com/gtag/js?id=G-VECVHEZ2DN";
            googleAnalyticsScript.onload = function () {
              window.gtag("js", new Date());
              window.gtag("config", "G-VECVHEZ2DN");
            };
            document.head.appendChild(googleAnalyticsScript);
          `}
        </Script>
      ) : null}

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
