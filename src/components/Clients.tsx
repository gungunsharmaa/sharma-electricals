import Reveal from "./Reveal";
import { clients } from "@/data/company";

const Clients = () => (
  <section className="section bg-card border-y border-border">
    <div className="container">
      <Reveal className="mb-12">
        <span className="eyebrow mb-4">Trusted by</span>
        <h2 className="text-display text-3xl md:text-4xl text-foreground max-w-2xl">
          Partners to India's leading developers.
        </h2>
      </Reveal>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border border border-border">
        {clients.map((client) => (
          <div
            key={client}
            className="flex h-28 items-center justify-center bg-background px-4 text-center font-serif text-lg font-semibold text-foreground/80"
          >
            {client}
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Clients;
