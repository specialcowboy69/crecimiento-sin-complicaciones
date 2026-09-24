export const GA_COOKIE_ROOT_DOMAIN = "crecimientosincomplicaciones.com";

export function getGoogleAnalyticsCookieDomains(hostname) {
  const domains = [hostname];

  if (hostname === GA_COOKIE_ROOT_DOMAIN || hostname.endsWith("." + GA_COOKIE_ROOT_DOMAIN)) {
    domains.push(GA_COOKIE_ROOT_DOMAIN);
  }

  return [...new Set(domains)];
}
