import Seo from "@/components/Seo";
import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import { StatusBadge } from "@/components/Projects";
import { projects, photos } from "@/data/company";
import { cn } from "@/lib/utils";

const filters = ["All", "Completed", "Ongoing"] as const;

const Work = () => {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const visible = projects.filter((p) => filter === "All" || p.status === filter);

  return (
    <div className="min-h-screen bg-background">
    <Seo path="/work" />
      <Navigation />
      <main>
        <PageHeader
          image={photos.night}
          title="Projects"
          intro="Recent and ongoing electrical works for residential townships and commercial developments across Gurugram and Rewari."
        />

        <section className="section">
          <div className="container">
            <div className="mb-8 flex flex-wrap gap-2" role="tablist" aria-label="Filter projects">
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

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((p, i) => (
                <Reveal key={`${p.title}-${p.scope}`} delay={(i % 3) * 0.05} className="flex flex-col border border-border bg-background p-6 md:p-8">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {p.period ?? "In progress"}
                    </span>
                    <StatusBadge status={p.status} />
                  </div>
                  <h3 className="mt-6 font-serif text-2xl font-semibold text-foreground text-balance">{p.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{p.location}</p>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-foreground/70">{p.client}</p>
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
