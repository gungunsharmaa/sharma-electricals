import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import Reveal from "./Reveal";
import { strengths } from "@/data/company";

const About = () => (
  <section className="section bg-background">
    <div className="container grid gap-14 lg:grid-cols-12">
      <Reveal className="lg:col-span-6">
        <span className="eyebrow mb-4">Who we are</span>
        <h2 className="text-display text-3xl md:text-5xl text-foreground">
          Building India's electrical infrastructure.
        </h2>
        <p className="mt-6 text-muted-foreground leading-relaxed">
          Sharma Electricals Pvt. Ltd. is a B2B electrical engineering and contracting company headquartered in
          Gurugram, Haryana. Established in 2000, we have been delivering large-scale electrical infrastructure for
          residential and commercial developments.
        </p>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          Our clients include Signature Global, Bestech India and Vipul Limited, and we carry a dedicated team of
          engineers, safety and quality staff on every project.
        </p>
        <Link to="/about" className="link-arrow mt-8">
          More about us <FiArrowRight />
        </Link>
      </Reveal>

      <div className="lg:col-span-6 grid sm:grid-cols-2 gap-px bg-border border border-border">
        {strengths.map((item, i) => (
          <Reveal key={item.title} delay={i * 0.06} className="bg-background p-7">
            <span className="text-xs font-semibold tracking-widest text-accent">0{i + 1}</span>
            <h3 className="mt-3 font-sans text-base font-semibold text-foreground">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default About;
