import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import { StatusBadge } from "@/components/Projects";
import { projects } from "@/data/company";
import { cn } from "@/lib/utils";

const filters = ["All", "Completed", "Ongoing"] as const;

const Work = () => {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const visible = projects.filter((p) => filter === "All" || p.status === filter);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <PageHeader
          title="Projects"
          intro="A selection of residential townships, commercial complexes and mixed-use developments we have powered."
        />

        <section className="section">
          <div className="container">
            <div className="mb-10 flex gap-2" role="tablist" aria-label="Filter projects">
              {filters.map((f) => (
                <button
                  key={f}
                  role="tab"
                  aria-selected={filter === f}
                  onClick={() => setFilter(f)}
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-sm border transition-colors",
                    filter === f
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/40"
                  )}
                >
                  {f}
                </button>
              ))}
            </div>

            <div className="grid gap-px bg-border border border-border sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((p, i) => (
                <Reveal key={p.title} delay={(i % 3) * 0.05} className="bg-background p-8 flex flex-col">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {p.category}
                    </span>
                    <StatusBadge status={p.status} />
                  </div>
                  <h3 className="mt-6 font-serif text-2xl font-semibold text-foreground">{p.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{p.location}</p>
                  <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{p.scope}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <CtaBand />
      </main>
      <Footer />
    </div>
  );
};

export default Work;
