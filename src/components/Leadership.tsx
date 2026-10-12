import Reveal from "./Reveal";
import { leaders } from "@/data/company";

const Leadership = () => (
  <section className="section bg-background">
    <div className="container">
      <Reveal className="mb-14">
        <span className="eyebrow mb-4">Leadership</span>
        <h2 className="text-display text-3xl md:text-5xl text-foreground">The people behind the work.</h2>
      </Reveal>

      <div className="grid gap-10 md:grid-cols-2">
        {leaders.map((leader, i) => (
          <Reveal key={leader.name} delay={i * 0.08} className="border-t-2 border-primary pt-6">
            <h3 className="font-serif text-2xl font-semibold text-foreground">{leader.name}</h3>
            <p className="mt-1 text-sm font-semibold text-muted-foreground">{leader.title}</p>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{leader.bio}</p>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Leadership;
