import { useEffect, useRef } from "react";
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
        src={clientLogos[name].src}
        width={clientLogos[name].width}
        height={clientLogos[name].height}
        decoding="async"
        alt={duplicate ? "" : name}
        className="max-h-14 w-auto max-w-full object-contain md:max-h-16"
      />
    ) : (
      <span className="text-center font-serif text-base font-semibold text-neutral-800 md:text-lg">{name}</span>
    )}
  </li>
);

const Clients = () => {
  const scroller = useRef<HTMLDivElement>(null);
  const paused = useRef(false);
  const drag = useRef<{ x: number; left: number } | null>(null);

  // Auto-scroll by moving scrollLeft, so the strip stays natively scrollable (touch, trackpad, drag).
  useEffect(() => {
    const el = scroller.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let last = performance.now();
    let pos = el.scrollLeft;
    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      if (paused.current) {
        pos = el.scrollLeft; // follow the user's own scrolling
      } else {
        pos += dt * 0.04; // px per ms
        el.scrollLeft = pos;
        pos = el.scrollLeft;
      }
      // Second half is a copy of the first, so wrapping by half is seamless.
      const half = el.scrollWidth / 2;
      if (pos >= half) {
        pos -= half;
        el.scrollLeft = pos;
      } else if (pos <= 0 && el.scrollLeft <= 0 && paused.current) {
        pos = half;
        el.scrollLeft = pos;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const resumeLater = useRef<number>();
  const pause = () => {
    window.clearTimeout(resumeLater.current);
    paused.current = true;
  };
  const resume = (delay = 1500) => {
    window.clearTimeout(resumeLater.current);
    resumeLater.current = window.setTimeout(() => (paused.current = false), delay);
  };

  return (
    <section className="section bg-card border-y border-border">
      <div className="container">
        <Reveal className="mb-12">
          <span className="eyebrow mb-4">Trusted by</span>
          <h2 className="text-display text-3xl md:text-4xl text-foreground max-w-2xl">
            Partners to leading developers.
          </h2>
        </Reveal>
      </div>
      {/* Auto-scrolls; swipe, scroll or drag to move it yourself. */}
      <div
        ref={scroller}
        className="overflow-x-auto cursor-grab active:cursor-grabbing select-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
        onMouseEnter={pause}
        onMouseLeave={() => {
          drag.current = null;
          resume(300);
        }}
        onTouchStart={pause}
        onTouchEnd={() => resume()}
        onWheel={() => {
          pause();
          resume();
        }}
        onMouseDown={(e) => {
          drag.current = { x: e.clientX, left: scroller.current!.scrollLeft };
        }}
        onMouseMove={(e) => {
          if (drag.current) scroller.current!.scrollLeft = drag.current.left - (e.clientX - drag.current.x);
        }}
        onMouseUp={() => (drag.current = null)}
        onFocus={pause}
        onBlur={() => resume()}
      >
        <ul className="flex w-max">
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
};

export default Clients;
