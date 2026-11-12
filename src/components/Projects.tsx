import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import Reveal from "./Reveal";
import { projects, clientLogos } from "@/data/company";
import { cn } from "@/lib/utils";

export const StatusBadge = ({ status }: { status: string }) => (
  <span
    className={cn(
      "inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider",
      status === "Ongoing" ? "text-amber-700" : "text-emerald-700"
    )}
  >
    <span className={cn("h-1.5 w-1.5 rounded-full", status === "Ongoing" ? "bg-amber-500" : "bg-emerald-600")} />
    {status}
  </span>
);

// Home page shows only the featured projects; the full list lives on /work.
const featured = projects.filter((p) => p.featuredBrand);

const Projects = () => (
  <section className="section bg-card border-y border-border">
    <div className="container">
      <Reveal className="mb-12 max-w-2xl">
        <span className="eyebrow mb-4">Selected projects</span>
        <h2 className="text-display text-3xl md:text-5xl text-foreground">
          Delivered across Gurugram's leading developments.
        </h2>
      </Reveal>

      <div className="grid gap-6 md:grid-cols-2">
        {featured.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.06} className="flex flex-col border border-border bg-background">
            {/* Logo panel matches the Trusted by cards */}
            <div className="flex h-36 items-center justify-center border-b border-border bg-white px-8 md:h-44">
              <img src={clientLogos[p.featuredBrand!].src} width={clientLogos[p.featuredBrand!].width} height={clientLogos[p.featuredBrand!].height} decoding="async" alt={p.client} className="max-h-16 w-auto max-w-[70%] object-contain md:max-h-20" />
            </div>
            <div className="flex flex-1 flex-col p-6 md:p-8">
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {p.period ?? "In progress"}
                </span>
                <StatusBadge status={p.status} />
              </div>
              <h3 className="mt-5 font-serif text-2xl font-semibold text-foreground text-balance">{p.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{p.location}</p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{p.scope}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-12 flex justify-center">
        <Link
          to="/work"
          className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-primary-foreground text-sm font-semibold rounded-sm hover:bg-primary/90 transition-colors"
        >
          Explore more projects <FiArrowRight />
        </Link>
      </Reveal>
    </div>
  </section>
);

export default Projects;
