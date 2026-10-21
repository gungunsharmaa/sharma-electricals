import Reveal from "./Reveal";
import { clients, clientLogos } from "@/data/company";

// Right margin (not flex gap) keeps both halves of the track the same width, so the loop has no jump.
const ClientCard = ({ name, duplicate = false }: { name: string; duplicate?: boolean }) => (
  <li
    aria-hidden={duplicate || undefined}
    className="mr-4 flex h-28 w-48 shrink-0 items-center justify-center border border-border bg-white px-6 md:mr-6 md:h-32 md:w-60"
  >
    {clientLogos[name] ? (
      <img
        src={clientLogos[name]}
        alt={duplicate ? "" : name}
        className="max-h-14 w-auto max-w-full object-contain md:max-h-16"
      />
    ) : (
      <span className="text-center font-serif text-base font-semibold text-neutral-800 md:text-lg">{name}</span>
    )}
  </li>
);

const Clients = () => (
  <section className="section bg-card border-y border-border">
    <div className="container">
      <Reveal className="mb-12">
        <span className="eyebrow mb-4">Trusted by</span>
        <h2 className="text-display text-3xl md:text-4xl text-foreground max-w-2xl">
          Partners to leading developers.
        </h2>
      </Reveal>
    </div>
    {/* Logos scroll continuously; pauses on hover and stops for reduced-motion users. */}
    <div className="group overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <ul className="flex w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        {clients.map((client) => (
          <ClientCard key={client} name={client} />
        ))}
        {clients.map((client) => (
          <ClientCard key={`dup-${client}`} name={client} duplicate />
        ))}
      </ul>
    </div>
  </section>
);

export default Clients;
