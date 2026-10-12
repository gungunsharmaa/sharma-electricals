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
          End-to-end electrical solutions.
        </h2>
        <p className="mt-6 text-muted-foreground leading-relaxed">
          Established in 2000, Sharma Electricals is a leading electrical contractor delivering end-to-end electrical
          solutions across residential, commercial, real estate and hospitality projects. We specialise in the supply,
          installation, testing, commissioning and handing over of both external and internal electrical systems.
        </p>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          We have built a reputation for quality, safety and innovation, partnering with Unitech, Bestech India,
          Signature Global, Vipul, Pioneer Urban Land and Infrastructure, Ireo and Universal Buildwell.
        </p>
        <Link to="/about" className="link-arrow mt-8">
          More about us <FiArrowRight />
        </Link>
      </Reveal>

      <div className="lg:col-span-6 grid sm:grid-cols-2 gap-px bg-border border border-border">
        {strengths.map((item, i) => (
          <Reveal key={item.title} delay={i * 0.06} className="bg-background p-7">
            <span className="text-xs font-semibold tracking-widest text-accent-text">0{i + 1}</span>
            <h3 className="mt-3 font-sans text-base font-semibold text-foreground">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default About;
