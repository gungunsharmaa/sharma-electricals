import AnimatedCounter from "./AnimatedCounter";
import { stats } from "@/data/company";

const Stats = () => (
  <section className="border-b border-border bg-background">
    <div className="container">
      {/* Columns follow the number of stats, so 3 or 4 items always fill the row evenly. */}
      <dl
        style={{ "--cols": stats.length } as React.CSSProperties}
        className="grid grid-cols-2 gap-x-4 gap-y-10 py-10 text-center md:grid-cols-[repeat(var(--cols),minmax(0,1fr))] md:gap-0 md:divide-x md:divide-border md:py-0 [&>*:last-child:nth-child(odd)]:col-span-2 md:[&>*:last-child:nth-child(odd)]:col-span-1"
      >
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center justify-center md:px-6 md:py-14">
            <dd className="font-serif text-4xl font-semibold text-primary">
              <AnimatedCounter
                target={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
                decimals={stat.decimals}
              />
              {stat.unit && <span className="ml-1.5 text-xl lg:text-2xl">{stat.unit}</span>}
            </dd>
            <dt className="mt-2 text-sm text-muted-foreground">{stat.label}</dt>
          </div>
        ))}
      </dl>
    </div>
  </section>
);

export default Stats;
