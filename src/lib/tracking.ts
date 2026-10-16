// Analytics plumbing: lazy Google Tag Manager, first-touch/UTM attribution and a dataLayer event helper.
// GA4 itself is configured inside the GTM container (tag "GA4 – Config"); nothing here talks to GA directly.

const GTM_ID = (import.meta.env.VITE_GTM_ID as string | undefined) || "GTM-KF9V62F2";

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;
const CLICK_IDS = ["gclid", "fbclid"] as const;
const FIRST_TOUCH_KEY = "se_first_touch";
const SESSION_TOUCH_KEY = "se_session_touch";

type Touch = Record<string, string>;

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtmDidInit?: boolean;
  }
}

const read = (store: Storage, key: string): Touch | null => {
  try {
    const raw = store.getItem(key);
    return raw ? (JSON.parse(raw) as Touch) : null;
  } catch {
    return null;
  }
};

const write = (store: Storage, key: string, value: Touch) => {
  try {
    store.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable — attribution just won't persist */
  }
};

/** Call once on app start: records where this visitor came from. */
export const captureAttribution = () => {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);

  const campaign: Touch = {};
  [...UTM_KEYS, ...CLICK_IDS].forEach((k) => {
    const v = params.get(k);
    if (v) campaign[k] = v.slice(0, 200);
  });

  const referrer = document.referrer && !document.referrer.startsWith(window.location.origin) ? document.referrer : "";

  // First touch: only ever written once per browser.
  if (!read(localStorage, FIRST_TOUCH_KEY)) {
    write(localStorage, FIRST_TOUCH_KEY, {
      ...campaign,
      referrer,
      landing_page: window.location.pathname,
      first_seen: new Date().toISOString(),
    });
  }

  // Session touch: a fresh campaign link in this tab replaces the previous one.
  if (Object.keys(campaign).length > 0 || !read(sessionStorage, SESSION_TOUCH_KEY)) {
    write(sessionStorage, SESSION_TOUCH_KEY, { ...campaign, referrer, landing_page: window.location.pathname });
  }
};

/** Flat attribution fields, safe to spread into an event or a form submission. */
export const getAttribution = (): Touch => {
  const first = read(localStorage, FIRST_TOUCH_KEY) ?? {};
  const session = read(sessionStorage, SESSION_TOUCH_KEY) ?? {};
  const out: Touch = {};
  // Current-session campaign wins, falling back to the first ever visit.
  [...UTM_KEYS, ...CLICK_IDS].forEach((k) => {
    const v = session[k] || first[k];
    if (v) out[k] = v;
  });
  out.referrer = session.referrer || first.referrer || "direct";
  out.landing_page = session.landing_page || first.landing_page || "";
  out.first_touch_source = first.utm_source || (first.referrer ? "referral" : "direct");
  out.first_touch_landing_page = first.landing_page || "";
  return out;
};

/** Push a named event onto the GTM dataLayer, enriched with attribution. */
export const track = (event: string, props: Record<string, unknown> = {}) => {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event,
    page_path: window.location.pathname,
    page_title: document.title,
    ...getAttribution(),
    ...props,
  });
};

/**
 * Loads GTM on the first user interaction (or after 8s), so its scripts stay out of the
 * page-load window and don't hurt LCP.
 */
export const loadGtmLazily = () => {
  if (typeof window === "undefined" || !GTM_ID || window.gtmDidInit) return;

  const events = ["pointerdown", "keydown", "scroll", "mousemove", "touchstart"];
  let timer: ReturnType<typeof setTimeout>;

  const init = () => {
    if (window.gtmDidInit) return;
    window.gtmDidInit = true;
    clearTimeout(timer);
    events.forEach((e) => document.removeEventListener(e, init));

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
    document.head.appendChild(script);
  };

  events.forEach((e) => document.addEventListener(e, init, { once: true, passive: true }));
  timer = setTimeout(init, 8000);
};
