"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CookiePreferencesLink } from "./CookiePreferencesLink";

export function SiteFooter({ showBlog }: { showBlog: boolean }) {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="footer">
      <p>© 2026 Crecimiento sin complicaciones. Agencia SEO, Google Ads, diseño web y automatizaciones.</p>
      <div className="footer-links">
        <Link href="/sobre-nosotros">Sobre nosotros</Link>
        {showBlog ? <Link href="/blog">Blog</Link> : null}
        <Link href="/politica-de-cookies">Política de cookies</Link>
        <Link href="/politica-de-privacidad">Política de privacidad</Link>
        <CookiePreferencesLink />
      </div>
    </footer>
  );
}
