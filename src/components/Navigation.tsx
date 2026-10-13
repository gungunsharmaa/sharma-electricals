import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { HiMenuAlt3 } from "react-icons/hi";
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import seLogo from "@/assets/se-logo.jpeg";
import { cn } from "@/lib/utils";
import { useEnquiry } from "./EnquiryProvider";
import { company } from "@/data/company";

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

  // Close the drawer whenever the route changes.
  useEffect(() => setIsOpen(false), [pathname]);

  return (
    <>
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
          onClick={() => setIsOpen(true)}
          aria-label="Open menu"
          aria-expanded={isOpen}
        >
          <HiMenuAlt3 />
        </button>
      </div>
    </header>

    {/* Mobile drawer: slides in from the right. Rendered in a portal so the header's
        backdrop-blur can't collapse it. */}
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent side="right" className="flex w-[62%] min-w-[240px] max-w-[300px] flex-col gap-0 p-0 sm:max-w-[300px] lg:hidden">
        <div className="flex h-16 items-center border-b border-border px-6">
          <SheetTitle className="font-serif text-lg font-semibold text-foreground">Sharma Electricals</SheetTitle>
          <SheetDescription className="sr-only">Site navigation</SheetDescription>
        </div>
        <nav className="flex flex-1 flex-col overflow-y-auto px-6 py-2">
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
        </nav>
        <div className="space-y-3 border-t border-border p-6">
          <button
            onClick={() => {
              setIsOpen(false);
              openEnquiry();
            }}
            className="w-full rounded-sm bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground"
          >
            Enquire now
          </button>
          <a
            href={company.phoneHref}
            className="block w-full rounded-sm border border-border px-5 py-3.5 text-center text-sm font-semibold text-foreground"
          >
            Call {company.phone}
          </a>
        </div>
      </SheetContent>
    </Sheet>
    </>
  );
};

export default Navigation;
