import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { captureAttribution, loadGtmLazily, track } from "@/lib/tracking";

// Click events for outbound contact actions, detected from the link itself so every
// instance (header, footer, drawer, contact page) is covered without per-component code.
const classifyLink = (href: string): string | null => {
  if (href.startsWith("tel:")) return "call_click";
  if (href.startsWith("mailto:")) return "email_click";
  if (href.includes("linkedin.com")) return "linkedin_click";
  return null;
};

// Mounted once inside the router: starts GTM, records attribution and fires site-wide events.
const Tracking = () => {
  const { pathname } = useLocation();
  const lastPath = useRef(pathname);

  useEffect(() => {
    captureAttribution();
    loadGtmLazily();

    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.("a");
      const href = a?.getAttribute("href");
      if (!href) return;
      const event = classifyLink(href);
      if (event) track(event, { link_url: href });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // Single-page navigation: tell GTM about every route after the first.
  useEffect(() => {
    if (lastPath.current === pathname) return;
    lastPath.current = pathname;
    track("route_change");
  }, [pathname]);

  return null;
};

export default Tracking;
