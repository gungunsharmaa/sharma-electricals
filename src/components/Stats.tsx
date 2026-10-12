import AnimatedCounter from "./AnimatedCounter";
import { stats } from "@/data/company";

const Stats = () => (
  <section className="border-b border-border bg-background">
    <div className="container">
      <dl className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
        {stats.map((stat) => (
          <div key={stat.label} className="px-6 py-10 md:py-14 first:pl-0 md:first:pl-0">
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
