import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import seLogo from "@/assets/se-logo.jpeg";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Projects", to: "/work" },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
      <div className="container flex h-[72px] items-center justify-between">
        <Link to="/" className="flex items-center gap-3" onClick={() => setIsOpen(false)}>
          <img src={seLogo} alt="Sharma Electricals" className="h-10 w-10 rounded-sm object-cover" />
          <span className="leading-tight">
            <span className="block font-serif text-lg font-semibold text-foreground">Sharma Electricals</span>
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
          <Link
            to="/contact"
            className={cn(
              "ml-2 px-5 py-2.5 text-sm font-semibold bg-primary text-primary-foreground rounded-sm hover:bg-primary/90 transition-colors",
              pathname === "/contact" && "ring-2 ring-accent ring-offset-2"
            )}
          >
            Contact us
          </Link>
        </nav>

        <button
          className="lg:hidden text-2xl text-foreground"
          onClick={() => setIsOpen((o) => !o)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <HiX /> : <HiMenuAlt3 />}
        </button>
      </div>

      {isOpen && (
        <nav className="lg:hidden border-t border-border bg-background">
          <div className="container py-4 flex flex-col">
            {[...navLinks, { label: "Contact us", to: "/contact" }].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className="py-3 text-base font-medium text-foreground border-b border-border last:border-0"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navigation;
