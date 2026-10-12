import AnimatedCounter from "./AnimatedCounter";
import { stats } from "@/data/company";

const Stats = () => (
  <section className="border-b border-border bg-background">
    <div className="container">
      <dl className="grid grid-cols-2 gap-x-4 gap-y-8 py-10 md:grid-cols-4 md:gap-x-0 md:gap-y-0 md:divide-x md:divide-border md:py-0">
        {stats.map((stat) => (
          <div key={stat.label} className="md:px-6 md:py-14 md:first:pl-0">
            <dd className="font-serif text-4xl lg:text-6xl font-semibold text-primary">
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
