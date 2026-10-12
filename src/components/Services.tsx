import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import Reveal, { type RevealFrom } from "./Reveal";
import { services } from "@/data/company";

interface ServicesProps {
  /** Home page shows an intro heading and a link through; the Services page just lists. */
  showHeading?: boolean;
}

// Matches the grid: 1 column on phones, 2 from sm, 3 from lg.
const currentColumns = () => {
  if (typeof window === "undefined") return 1;
  if (window.matchMedia("(min-width: 1024px)").matches) return 3;
  return window.matchMedia("(min-width: 640px)").matches ? 2 : 1;
};

const useColumns = () => {
  // Read synchronously: Reveal captures its entry direction on first render.
  const [cols, setCols] = useState(currentColumns);
  useEffect(() => {
    const lg = window.matchMedia("(min-width: 1024px)");
    const sm = window.matchMedia("(min-width: 640px)");
    const update = () => setCols(currentColumns());
    lg.addEventListener("change", update);
    sm.addEventListener("change", update);
    return () => {
      lg.removeEventListener("change", update);
      sm.removeEventListener("change", update);
    };
  }, []);
  return cols;
};

// Cards slide in from alternating sides: by row on phones, by column on wider grids.
const directionFor = (i: number, cols: number): RevealFrom => {
  if (cols === 1) return i % 2 === 0 ? "left" : "right";
  const col = i % cols;
  if (col === 0) return "left";
  if (col === cols - 1) return "right";
  return "up";
};

const Services = ({ showHeading = true }: ServicesProps) => {
  const cols = useColumns();
  return (
  <section className="section bg-card overflow-x-clip">
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
            from={directionFor(i, cols)}
            delay={(i % cols) * 0.08}
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
};

export default Services;
