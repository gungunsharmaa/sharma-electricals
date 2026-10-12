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
        <Reveal className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
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

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, i) => (
          <Reveal
            key={service.title}
            delay={(i % 3) * 0.06}
            className="group flex flex-col overflow-hidden border border-border bg-background transition-shadow hover:shadow-lg"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-primary">
              <img
                src={service.image}
                alt=""
                loading="lazy"
                width={640}
                height={480}
                style={{ objectPosition: service.focus }}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute left-0 top-0 bg-accent px-3 py-1.5 text-xs font-semibold tracking-widest text-accent-foreground">
                0{i + 1}
              </span>
            </div>
            <div className="flex flex-1 flex-col p-6">
              <h3 className="font-sans text-lg font-semibold text-foreground">{service.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{service.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Services;
