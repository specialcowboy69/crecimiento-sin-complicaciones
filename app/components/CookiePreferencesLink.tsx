"use client";

export const OPEN_COOKIE_PREFERENCES_EVENT = "open-cookie-preferences";

export function CookiePreferencesLink() {
  return (
    <button
      type="button"
      className="footer-cookie-preferences"
      onClick={(event) => {
        window.dispatchEvent(new CustomEvent(OPEN_COOKIE_PREFERENCES_EVENT, { detail: event.currentTarget }));
      }}
      aria-haspopup="dialog"
    >
      Cambiar configuración de cookies
    </button>
  );
}
