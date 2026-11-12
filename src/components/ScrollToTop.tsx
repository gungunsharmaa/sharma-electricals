import { useLayoutEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

// React Router keeps the previous scroll position on navigation, so a new page would open
// part-way down. Reset to the top on every forward navigation (links, navbar, footer).
// Back/forward (POP) is left to the browser so users return to where they were, and
// #anchor links scroll to their target instead.
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  const navigationType = useNavigationType();

  useLayoutEffect(() => {
    if (hash) {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (target) {
        target.scrollIntoView();
        return;
      }
    }
    if (navigationType === "POP") return;
    window.scrollTo(0, 0);
  }, [pathname, hash, navigationType]);

  return null;
};

export default ScrollToTop;
