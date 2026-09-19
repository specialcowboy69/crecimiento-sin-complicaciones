# Deployment And Domains

**Last updated:** 2026-09-16

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
