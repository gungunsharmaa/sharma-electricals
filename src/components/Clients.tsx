import Reveal from "./Reveal";
import { clients } from "@/data/company";

const Clients = () => (
  <section className="section bg-card border-y border-border">
    <div className="container">
      <Reveal className="mb-12">
        <span className="eyebrow mb-4">Trusted by</span>
        <h2 className="text-display text-3xl md:text-4xl text-foreground max-w-2xl">
          Partners to leading developers.
        </h2>
      </Reveal>
      {/* Flex-wrap + centered so an incomplete last row never leaves an empty cell */}
      <ul className="flex flex-wrap justify-center gap-4">
        {clients.map((client) => (
          <li
            key={client}
            className="flex h-24 md:h-28 w-[calc(50%-0.5rem)] md:w-[calc(25%-0.75rem)] items-center justify-center border border-border bg-background px-4 text-center font-serif text-base md:text-lg font-semibold text-foreground/80"
          >
            {client}
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default Clients;
