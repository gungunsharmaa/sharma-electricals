import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import Reveal from "./Reveal";
import { services } from "@/data/company";

interface ServicesProps {
  /** Home page shows an intro heading and a link through; the Services page just lists. */
  showHeading?: boolean;
}

const Services = ({ showHeading = true }: ServicesProps) => (
  <section className="section bg-card">
    <div className="container">
      {showHeading && (
        <Reveal className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-2xl">
            <span className="eyebrow mb-4">What we do</span>
            <h2 className="text-display text-3xl md:text-5xl text-foreground">
              Comprehensive electrical solutions.
            </h2>
          </div>
          <Link to="/services" className="link-arrow self-start md:self-auto">
            All services <FiArrowRight />
          </Link>
        </Reveal>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 border-t border-l border-border">
        {services.map((service, i) => (
          <Reveal
            key={service.title}
            delay={(i % 3) * 0.06}
            className="group border-b border-r border-border bg-background p-8 transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            <span className="text-xs font-semibold tracking-widest text-accent-text transition-colors group-hover:text-accent">0{i + 1}</span>
            <h3 className="mt-4 font-sans text-lg font-semibold">{service.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground transition-colors group-hover:text-primary-foreground/75">
              {service.desc}
            </p>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Services;
