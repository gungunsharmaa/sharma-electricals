import Reveal from "./Reveal";
import { credentials } from "@/data/company";

const Credentials = () => (
  <section className="section bg-card border-y border-border">
    <div className="container grid gap-14 lg:grid-cols-12">
      <Reveal className="lg:col-span-4">
        <span className="eyebrow mb-4">Credentials</span>
        <h2 className="text-display text-3xl md:text-4xl text-foreground">Registered and compliant.</h2>
      </Reveal>
      <Reveal delay={0.08} className="lg:col-span-8">
        <dl className="border-t border-border">
          {credentials.map((c) => (
            <div key={c.label} className="grid gap-1 border-b border-border py-5 sm:grid-cols-3 sm:gap-6">
              <dt className="text-sm font-semibold text-muted-foreground">{c.label}</dt>
              <dd className="sm:col-span-2 text-foreground">{c.value}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </div>
  </section>
);

export default Credentials;
