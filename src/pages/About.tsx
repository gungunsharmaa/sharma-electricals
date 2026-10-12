import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import Stats from "@/components/Stats";
import Leadership from "@/components/Leadership";
import Clients from "@/components/Clients";
import CtaBand from "@/components/CtaBand";
import { strengths } from "@/data/company";

const About = () => (
  <div className="min-h-screen bg-background">
    <Navigation />
    <main>
      <PageHeader
        title="About us"
        intro="Over two decades of electrical engineering and contracting for large-scale residential and commercial developments."
      />

      <section className="section">
        <div className="container grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <span className="eyebrow mb-4">Our story</span>
            <h2 className="text-display text-3xl md:text-4xl text-foreground">
              A Gurugram firm built on delivery.
            </h2>
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-7 space-y-5 text-muted-foreground leading-relaxed">
            <p>
              Sharma Electricals Pvt. Ltd. is a B2B electrical engineering and contracting company headquartered in
              Gurugram, Haryana. We specialise in large-scale electrical infrastructure — HT/LT works, power
              distribution, substations and building electrical — for township and commercial developments.
            </p>
            <p>
              We work with India's leading real estate developers, including Signature Global, Bestech, M3M India and
              Vatika Group, and take projects from design through execution and commissioning.
            </p>
          </Reveal>
        </div>
      </section>

      <Stats />

      <section className="section bg-card">
        <div className="container">
          <Reveal className="mb-12">
            <span className="eyebrow mb-4">How we work</span>
            <h2 className="text-display text-3xl md:text-4xl text-foreground">What clients can expect.</h2>
          </Reveal>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {strengths.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.06} className="border-t-2 border-primary pt-5">
                <h3 className="font-sans text-base font-semibold text-foreground">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Leadership />
      <Clients />
      <CtaBand />
    </main>
    <Footer />
  </div>
);

export default About;
