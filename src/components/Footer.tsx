import { Link } from "react-router-dom";
import seLogo from "@/assets/se-logo.jpeg";
import { company } from "@/data/company";

const links = [
  { label: "Home", to: "/" },
  { label: "About us", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Projects", to: "/work" },
  { label: "Contact us", to: "/contact" },
];

const Footer = () => (
  <footer className="bg-primary text-primary-foreground">
    <div className="container py-16">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="flex items-center gap-3 mb-5">
            <img src={seLogo} alt="" className="h-10 w-10 rounded-sm object-cover" />
            <span className="font-serif text-xl font-semibold">{company.short}</span>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-primary-foreground/70">
            Electrical engineering and contracting for India's leading real estate developers, since {company.founded}.
          </p>
        </div>

        <div className="md:col-span-3">
          <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground/50 mb-5">Explore</h4>
          <ul className="space-y-3">
            {links.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground/50 mb-5">Contact</h4>
          <address className="not-italic space-y-3 text-sm text-primary-foreground/80">
            <p>{company.address}</p>
            <p>
              <a href={company.phoneHref} className="hover:text-primary-foreground transition-colors">{company.phone}</a>
            </p>
            <p>
              <a href={`mailto:${company.email}`} className="hover:text-primary-foreground transition-colors break-all">
                {company.email}
              </a>
            </p>
          </address>
        </div>
      </div>

      <div className="mt-14 pt-6 border-t border-primary-foreground/15 text-xs text-primary-foreground/50">
        © {new Date().getFullYear()} {company.name} All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
