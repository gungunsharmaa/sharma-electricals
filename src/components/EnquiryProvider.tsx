import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import LeadCaptureModal from "./LeadCaptureModal";
import { track } from "@/lib/tracking";

const STORAGE_KEY = "leadCaptureDismissedAt";
const COOLDOWN_DAYS = 7;
const OPEN_DELAY_MS = 2500;

interface EnquiryContextValue {
  openEnquiry: () => void;
}

const EnquiryContext = createContext<EnquiryContextValue>({ openEnquiry: () => {} });

// eslint-disable-next-line react-refresh/only-export-components
export const useEnquiry = () => useContext(EnquiryContext);

const remember = () => {
  try {
    localStorage.setItem(STORAGE_KEY, String(Date.now()));
  } catch {
    /* storage unavailable (private mode) — popup may reappear, which is fine */
  }
};

const recentlyDismissed = () => {
  try {
    const at = Number(localStorage.getItem(STORAGE_KEY));
    return !!at && Date.now() - at < COOLDOWN_DAYS * 24 * 60 * 60 * 1000;
  } catch {
    return false;
  }
};

/**
 * Owns the enquiry popup for the whole site: any page can open it via
 * useEnquiry(), and it auto-opens once per cooldown on whichever page the
 * visitor lands on (except /contact, which already shows the form).
 */
export const EnquiryProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const landedOn = useRef(pathname);

  useEffect(() => {
    if (landedOn.current === "/contact" || recentlyDismissed()) return;
    const t = setTimeout(() => {
      track("enquiry_popup_open", { trigger: "auto" });
      setOpen(true);
    }, OPEN_DELAY_MS);
    return () => clearTimeout(t);
  }, []);

  const handleOpenChange = useCallback((next: boolean) => {
    if (!next) remember();
    if (next) track("enquiry_popup_open");
    setOpen(next);
  }, []);

  const openEnquiry = useCallback(() => {
    track("enquiry_popup_open", { trigger: "button" });
    setOpen(true);
  }, []);

  return (
    <EnquiryContext.Provider value={{ openEnquiry }}>
      {children}
      <LeadCaptureModal open={open} onOpenChange={handleOpenChange} />
    </EnquiryContext.Provider>
  );
};
