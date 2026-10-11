export const ADS_CLICK_STORAGE_KEY = "seo_local_ads_click_v1";

const clickTypes = ["gclid", "gbraid", "wbraid"];

function allowed(pathname, preferences) {
  return pathname !== "/admin" && !pathname?.startsWith("/admin/") && preferences?.analytics === true && preferences?.advertising === true;
}

function validValue(value) {
  return typeof value === "string" && value.length > 0 && value.length <= 512 && /^[\x21-\x7e]+$/.test(value);
}

export function clearAdsClick(storage) {
  try {
    storage?.removeItem(ADS_CLICK_STORAGE_KEY);
  } catch {
    // Optional attribution cannot interrupt browsing or lead submission.
  }
}

export function readAdsClick({ pathname, preferences, storage }) {
  if (!allowed(pathname, preferences)) {
    clearAdsClick(storage);
    return null;
  }
  try {
    const stored = storage?.getItem(ADS_CLICK_STORAGE_KEY);
    if (!stored) return null;
    const click = JSON.parse(stored);
    if (clickTypes.includes(click?.type) && validValue(click?.value)) return { type: click.type, value: click.value };
    clearAdsClick(storage);
  } catch {
    return null;
  }
  return null;
}

export function captureAdsClick({ pathname, search, preferences, storage }) {
  if (!allowed(pathname, preferences)) {
    clearAdsClick(storage);
    return null;
  }
  const params = new URLSearchParams(search);
  for (const type of clickTypes) {
    const value = params.getAll(type).find(validValue);
    if (!value) continue;
    try {
      storage?.setItem(ADS_CLICK_STORAGE_KEY, JSON.stringify({ type, value }));
      return { type, value };
    } catch {
      return null;
    }
  }
  return readAdsClick({ pathname, preferences, storage });
}
