import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import Reveal from "./Reveal";

const CtaBand = () => (
  <section className="bg-card border-t border-border">
    <div className="container section">
      <Reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
        <div className="max-w-2xl">
          <span className="eyebrow mb-4">Work with us</span>
          <h2 className="text-display text-3xl md:text-5xl text-foreground">
            Planning a development? Let's talk about the power behind it.
          </h2>
        </div>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 self-start md:self-auto px-7 py-3.5 bg-primary text-primary-foreground text-sm font-semibold rounded-sm hover:bg-primary/90 transition-colors"
        >
          Contact us <FiArrowRight />
        </Link>
      </Reveal>
    </div>
  </section>
);

export default CtaBand;
