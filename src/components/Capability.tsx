import Reveal from "./Reveal";
import { team, equipment, suppliers } from "@/data/company";

const Row = ({ label, value }: { label: string; value: number }) => (
  <li className="flex items-baseline justify-between gap-4 border-b border-border py-3 text-sm">
    <span className="text-foreground">{label}</span>
    <span className="font-semibold text-primary">{value}</span>
  </li>
);

const Capability = () => (
  <section className="section bg-background">
    <div className="container">
      <Reveal className="mb-14 max-w-2xl">
        <span className="eyebrow mb-4">Capability</span>
        <h2 className="text-display text-3xl md:text-5xl text-foreground">Equipped to deliver on site.</h2>
      </Reveal>

      <div className="grid gap-14 lg:grid-cols-2">
        <Reveal>
          <h3 className="mb-2 font-sans text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Organisation
          </h3>
          <ul className="border-t border-border">
            {team.map((t) => (
              <Row key={t.role} label={t.role} value={t.count} />
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.08}>
          <h3 className="mb-2 font-sans text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Plant & machinery
          </h3>
          <ul className="border-t border-border">
            {equipment.map((e) => (
              <Row key={e.item} label={e.item} value={e.count} />
            ))}
          </ul>
        </Reveal>
      </div>

      <Reveal className="mt-16 border-t-2 border-primary pt-6">
        <h3 className="font-sans text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Major suppliers on previous projects
        </h3>
        <ul className="mt-4 flex flex-wrap gap-x-10 gap-y-3 font-serif text-xl font-semibold text-foreground">
          {suppliers.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </Reveal>
    </div>
  </section>
);

export default Capability;
