import Reveal from "./Reveal";
import { turnover, worksInHand } from "@/data/company";
import { cn } from "@/lib/utils";

const toCrore = (inr: number) => (inr / 10_000_000).toFixed(2);

const Financials = () => {
  const max = Math.max(...turnover.map((t) => t.amount));
  const latest = turnover[turnover.length - 1].year;

  return (
    <section className="section bg-card border-y border-border">
      <div className="container grid gap-14 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <span className="eyebrow mb-4">Financial capability</span>
          <h2 className="text-display text-3xl md:text-4xl text-foreground">Growing, with a full order book.</h2>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            Turnover for the last six financial years, and the total value of works currently in hand.
          </p>
          <div className="mt-8 border-t-2 border-primary pt-5">
            <p className="font-serif text-4xl font-semibold text-primary">
              ₹{toCrore(worksInHand)} <span className="text-xl">Cr</span>
            </p>
            <p className="mt-1 text-sm text-muted-foreground">Total value of works in hand</p>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="lg:col-span-8">
          <h3 className="mb-6 font-sans text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Annual turnover (₹ crore)
          </h3>
          <ul className="space-y-4">
            {turnover.map((t) => (
              <li key={t.year} className="grid grid-cols-[5.5rem_1fr_4rem] items-center gap-4">
                <span className="text-sm font-medium text-foreground">{t.year}</span>
                <div className="h-8 bg-background border border-border">
                  <div
                    className={cn("h-full", t.year === latest ? "bg-accent" : "bg-primary")}
                    style={{ width: `${(t.amount / max) * 100}%` }}
                  />
                </div>
                <span className="text-right text-sm font-semibold text-foreground">{toCrore(t.amount)}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
};

export default Financials;
