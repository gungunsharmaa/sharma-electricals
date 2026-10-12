import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import Reveal from "./Reveal";
import { projects } from "@/data/company";
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

const Projects = () => (
  <section className="section bg-background">
    <div className="container">
      <Reveal className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div className="max-w-2xl">
          <span className="eyebrow mb-4">Selected projects</span>
          <h2 className="text-display text-3xl md:text-5xl text-foreground">
            Delivered across NCR's landmark developments.
          </h2>
        </div>
        <Link to="/work" className="link-arrow self-start md:self-auto">
          All projects <FiArrowRight />
        </Link>
      </Reveal>

      <div className="border-t border-border">
        {projects.slice(0, 5).map((p, i) => (
          <Reveal
            key={p.title}
            delay={i * 0.04}
            className="grid gap-2 md:gap-8 md:grid-cols-12 md:items-center border-b border-border py-6"
          >
            <h3 className="md:col-span-4 font-sans text-lg font-semibold text-foreground">{p.title}</h3>
            <p className="md:col-span-2 text-sm text-muted-foreground">{p.location}</p>
            <p className="md:col-span-4 text-sm text-muted-foreground">{p.scope}</p>
            <div className="md:col-span-2 md:text-right">
              <StatusBadge status={p.status} />
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Projects;
