# Deployment And Domains

**Last updated:** 2026-09-30

This document records production hosting, canonical host and domain redirect behavior for `pagina-agencia`.

## Production Host

- Production canonical host: `https://www.crecimientosincomplicaciones.com`.
- `SITE_URL` in `app/lib/site.ts` must stay aligned with this host.
- Canonicals, sitemap and robots should use the `www` host and the project's no-trailing-slash policy.
- The Vercel production domain is `www.crecimientosincomplicaciones.com`.
- The apex `crecimientosincomplicaciones.com` should redirect to the `www` host.

## Cloudflare DNS

- The apex `crecimientosincomplicaciones.com` CNAME to the Vercel DNS target must be proxied so Cloudflare redirect rules can run.
- `www.crecimientosincomplicaciones.com` can stay DNS only if Vercel handles production for that host.
- Keep MX, SPF, DKIM, SMTP2GO and mail records DNS only. Do not proxy email records.

## Apex To WWW Redirect Rule

In Cloudflare `Rules > Redirect Rules`, keep a single redirect rule for apex canonicalization:

- Name: `Apex to www direct`.
- Match: `Hostname equals crecimientosincomplicaciones.com`.
- Equivalent expression:

```txt
(http.host eq "crecimientosincomplicaciones.com")
```

- Type: `Dynamic`.
- Target expression:

```txt
concat("https://www.crecimientosincomplicaciones.com", http.request.uri.path)
```

- Status: `301 - Permanent Redirect`.
- Preserve query string: enabled.
- Place at: `First`.

This makes `http://crecimientosincomplicaciones.com/...` go directly to `https://www.crecimientosincomplicaciones.com/...` in one redirect.

## SSL/TLS Settings

- Do not set SSL/TLS encryption mode to `Off`.
- Current safe setting: Cloudflare Automatic SSL/TLS running `Full`.
- Keep `Always Use HTTPS` off while the redirect rule is responsible for direct apex-to-www canonicalization. Otherwise Cloudflare can add a separate `http` to `https` hop before the apex-to-www redirect.
- Leave HSTS off unless there is an explicit hardening decision and rollback plan.
- TLS 1.3 and Automatic HTTPS Rewrites may stay enabled.

## Verification

From PowerShell:

```powershell
curl.exe -L -s -o NUL -w "%{url_effective} | %{http_code} | redirects:%{num_redirects}" http://crecimientosincomplicaciones.com/
```

Expected:

```txt
https://www.crecimientosincomplicaciones.com/ | 200 | redirects:1
```

If redirects return to `2`, check:

- The apex DNS record is proxied.
- The redirect rule is enabled, not saved as draft.
- The rule match is host-only, not `URI Full` wildcard.
- `Always Use HTTPS` is off.
- No earlier Cloudflare Page Rule or Redirect Rule is forcing `http` to `https` before apex-to-www.

## Git Merge Preflight

Before merging any branch or Pull Request into `main`, review earlier work and report the result to the user:

1. Fetch and prune `origin`, then confirm that the remote default branch is still `main`.
2. List open Pull Requests that target `main`.
3. Compare local and remote branches with `origin/main`; identify branches with commits that are not already contained in `main`.
4. Inspect every registered worktree, including detached worktrees, and check both tracked and untracked changes.
5. Confirm that the branch proposed for merge is based on the current `origin/main` and that any required checks are passing.

If earlier unmerged work or untracked files need a decision, stop before merging and tell the user the exact branch or worktree, commits or files involved, and the available options. Do not consider a branch pending merely because it still exists when all of its commits are already in `main`.

When the review is clean, say explicitly that no earlier work is pending before carrying out the merge. Do not merge, discard, or overwrite earlier work without the user's direction.

## Analytics And Consent Production Checks

- `VercelAnalytics` is mounted in the root layout. It records aggregate, cookie-free visit data and filters `/admin` from collection.
- `CookieConsent` owns the optional Google Analytics (GA4) and Google Ads conversion-measurement integration. GA4 must never be added directly to `app/layout.tsx` or another shared component, because it may load only after the visitor accepts analytics cookies. Google Ads measurement needs the additional advertising-measurement consent and must keep `ad_personalization` denied unless a separately approved remarketing change is made.
- GA4 is also excluded from `/admin` and its descendants, including client-side transitions after accepting cookies. Verify both a direct admin visit and a public-to-admin transition after each measurement release.
- Before treating analytics as live, deploy the version containing `@vercel/analytics`, confirm that the Vercel project has Analytics enabled, and verify that the dashboard receives production traffic. Installing the package or seeing a local development build is not evidence that production data is arriving.
- Test the production canonical host, `https://www.crecimientosincomplicaciones.com`, in a fresh browser profile. Check the accept, reject and later-revocation paths described in `docs/analytics-and-consent.md`.
- If the production hostname changes, review the Google Analytics cookie cleanup domains in `app/components/cookieConsentCookies.mjs` before deployment. Cookie revocation must cover the active host and the apex/root domain where GA cookies may have been written.
- After deployment, use a fresh consented browser session to submit `/seo/local`, verify `lead_seo_local_submitted` in GA4 DebugView, then mark/import it in the Google dashboards. Confirm Google Ads auto-tagging and the GA4-to-Google-Ads account link there; this repository cannot verify account-level settings.
- Confirm the four Consent Mode signals in Tag Assistant for analytics-only acceptance, both permissions and withdrawal. Repository tests use an intercepted Google loader; a green local test does not prove Google ingestion, Ads attribution or that an account warning has cleared. Keep the existing GA4 import rather than creating a duplicate native Ads conversion for the same lead.
