"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import Script from "next/script";

const COOKIE_CONSENT_NAME = "cookie_consent";
const COOKIE_CONSENT_ACCEPTED = "v1:accepted";
const COOKIE_CONSENT_REJECTED = "v1:rejected";
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;
const CONSENT_CHANGE_EVENT = "cookie-consent-change";

type ConsentChoice = "accepted" | "rejected" | null;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function readConsent(): ConsentChoice {
  const cookieValue = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith(`${COOKIE_CONSENT_NAME}=`))
    ?.split("=")[1];

  if (cookieValue === COOKIE_CONSENT_ACCEPTED) {
    return "accepted";
  }

  if (cookieValue === COOKIE_CONSENT_REJECTED) {
    return "rejected";
  }

  return null;
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

function persistConsent(value: string) {
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${COOKIE_CONSENT_NAME}=${value}; Path=/; Max-Age=${COOKIE_MAX_AGE_SECONDS}; SameSite=Lax${secure}`;
}

function clearGoogleAnalyticsCookies() {
  const cookieNames = document.cookie
    .split("; ")
    .map((cookie) => cookie.split("=")[0])
    .filter((name) => name === "_ga" || name.startsWith("_ga_"));

  for (const name of cookieNames) {
    document.cookie = `${name}=; Path=/; Max-Age=0; SameSite=Lax`;
    document.cookie = `${name}=; Path=/; Domain=${window.location.hostname}; Max-Age=0; SameSite=Lax`;
  }
}

export function CookieConsent() {
  const consent = useSyncExternalStore(subscribeToConsentChanges, readConsent, getServerConsent);
  const [showPreferences, setShowPreferences] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);

  function acceptAnalytics() {
    persistConsent(COOKIE_CONSENT_ACCEPTED);
    notifyConsentChange();
    setAnalyticsEnabled(true);
    setShowPreferences(false);
  }

  function rejectAnalytics() {
    const hadAcceptedAnalytics = consent === "accepted";

    persistConsent(COOKIE_CONSENT_REJECTED);
    notifyConsentChange();
    setAnalyticsEnabled(false);
    setShowPreferences(false);
    clearGoogleAnalyticsCookies();

    if (hadAcceptedAnalytics) {
      window.gtag?.("consent", "update", { analytics_storage: "denied" });
      window.location.reload();
    }
  }

  function openPreferences() {
    setAnalyticsEnabled(consent === "accepted");
    setShowPreferences(true);
  }

  function savePreferences() {
    if (analyticsEnabled) {
      acceptAnalytics();
      return;
    }

    rejectAnalytics();
  }

  if (consent === undefined) {
    return null;
  }

  return (
    <>
      {consent === "accepted" ? (
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            window.gtag = window.gtag || function gtag() { window.dataLayer.push(arguments); };
            window.gtag("consent", "default", {
              ad_storage: "denied",
              ad_user_data: "denied",
              ad_personalization: "denied",
              analytics_storage: "denied"
            });
            window.gtag("consent", "update", { analytics_storage: "granted" });
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

      {consent !== null ? (
        <button
          type="button"
          className="cookie-preferences-button"
          onClick={openPreferences}
          aria-haspopup="dialog"
          aria-expanded={showPreferences}
        >
          Gestionar cookies
        </button>
      ) : null}

      {consent === null && !showPreferences ? (
        <section className="cookie-consent" role="dialog" aria-labelledby="cookie-consent-title">
          <h2 id="cookie-consent-title">Tu privacidad</h2>
          <p>
            Usamos Vercel Analytics para medir visitas de forma agregada y sin cookies. Solo con tu permiso activamos
            Google Analytics para obtener analítica detallada. Puedes cambiar tu elección cuando quieras.
          </p>
          <p className="cookie-consent-legal">
            Consulta la <Link href="/politica-de-cookies">Política de cookies</Link> y la{" "}
            <Link href="/politica-de-privacidad">Política de privacidad</Link>.
          </p>
          <div className="cookie-consent-actions">
            <button type="button" className="cookie-consent-button" onClick={rejectAnalytics}>
              Rechazar
            </button>
            <button type="button" className="cookie-consent-button" onClick={acceptAnalytics}>
              Aceptar analítica
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
          <p>Las cookies técnicas guardan tu elección. La analítica detallada de Google Analytics es opcional.</p>
          <label className="cookie-preference-row">
            <input type="checkbox" checked disabled />
            <span>
              <strong>Técnicas necesarias</strong>
              <small>Guardan tu preferencia de cookies.</small>
            </span>
          </label>
          <label className="cookie-preference-row">
            <input
              type="checkbox"
              checked={analyticsEnabled}
              onChange={(event) => setAnalyticsEnabled(event.target.checked)}
            />
            <span>
              <strong>Analítica</strong>
              <small>Google Analytics nos ayuda a entender el uso de la web.</small>
            </span>
          </label>
          <div className="cookie-preferences-actions">
            <button type="button" className="cookie-consent-button" onClick={savePreferences}>
              Guardar elección
            </button>
            <button type="button" className="cookie-consent-link" onClick={() => setShowPreferences(false)}>
              Cancelar
            </button>
          </div>
        </section>
      ) : null}
    </>
  );
}
