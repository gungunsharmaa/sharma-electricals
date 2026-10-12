import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import seLogo from "@/assets/se-logo.jpeg";
import { cn } from "@/lib/utils";
import { useEnquiry } from "./EnquiryProvider";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Projects", to: "/work" },
  { label: "Contact", to: "/contact" },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  const { openEnquiry } = useEnquiry();

  // Close the mobile menu on navigation, and lock page scroll while it's open.
  useEffect(() => setIsOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
      <div className="container flex h-16 md:h-[72px] items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src={seLogo} alt="Sharma Electricals" className="h-9 w-9 md:h-10 md:w-10 rounded-sm object-cover" />
          <span className="leading-tight">
            <span className="block font-serif text-base md:text-lg font-semibold text-foreground">Sharma Electricals</span>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Pvt. Ltd.
            </span>
          </span>
        </Link>

        {/* Desktop */}
        <nav className="hidden lg:flex items-center gap-9">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                cn(
                  "relative py-1 text-sm font-medium transition-colors hover:text-foreground",
                  "after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:w-full after:bg-accent after:origin-left after:transition-transform",
                  isActive
                    ? "text-foreground after:scale-x-100"
                    : "text-muted-foreground after:scale-x-0 hover:after:scale-x-100"
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
          <button
            onClick={openEnquiry}
            className="ml-2 px-5 py-2.5 text-sm font-semibold bg-primary text-primary-foreground rounded-sm hover:bg-primary/90 transition-colors"
          >
            Enquire now
          </button>
        </nav>

        <button
          className="lg:hidden -mr-2 p-2 text-2xl text-foreground"
          onClick={() => setIsOpen((o) => !o)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <HiX /> : <HiMenuAlt3 />}
        </button>
      </div>

      {/* Mobile: full-height panel under the bar */}
      {isOpen && (
        <nav className="lg:hidden fixed inset-x-0 top-16 bottom-0 overflow-y-auto border-t border-border bg-background">
          <div className="container flex flex-col py-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  cn(
                    "border-b border-border py-4 text-lg font-medium",
                    isActive ? "text-foreground" : "text-muted-foreground"
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
            <button
              onClick={() => {
                setIsOpen(false);
                openEnquiry();
              }}
              className="mt-6 w-full px-5 py-3.5 text-sm font-semibold bg-primary text-primary-foreground rounded-sm"
            >
              Enquire now
            </button>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navigation;
