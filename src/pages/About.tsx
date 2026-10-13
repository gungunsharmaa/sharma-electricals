import Seo from "@/components/Seo";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import Stats from "@/components/Stats";
import Leadership from "@/components/Leadership";
import Credentials from "@/components/Credentials";
import Clients from "@/components/Clients";
import CtaBand from "@/components/CtaBand";
import { strengths, process, sectors, photos } from "@/data/company";

const About = () => (
  <div className="min-h-screen bg-background">
    <Seo title="About Us" description="Sharma Electricals Pvt. Ltd. — 25+ years of electrical engineering and contracting in Gurugram. Our story, leadership, credentials and the developers we work with." path="/about" />
    <Navigation />
    <main>
      <PageHeader
        image={photos.engineer}
        title="About us"
        intro="Electrical engineering and contracting for large-scale residential and commercial developments in Delhi / NCR since 2000."
      />

      <section className="section">
        <div className="container grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <span className="eyebrow mb-4">Our story</span>
            <h2 className="text-display text-3xl md:text-4xl text-foreground">
              Over 25 years of delivery in NCR.
            </h2>
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-7 space-y-5 text-muted-foreground leading-relaxed">
            <p>
              Established in 2000, Sharma Electricals is a leading electrical contractor known for delivering
              end-to-end electrical solutions across a wide range of sectors, including residential, commercial, real
              estate and hospitality.
            </p>
            <p>
              We specialise in the supply, installation, testing, commissioning and handing over of both external and
              internal electrical systems. Over the years we have built a solid reputation for our commitment to
              quality, safety and innovation, partnering with Unitech Limited, Bestech India, Signature Global, Vipul
              Limited, Pioneer Urban Land and Infrastructure, Ireo and Universal Buildwell.
            </p>
            <p>
              We pride ourselves on tailored solutions that meet the highest standards, ensuring seamless project
              execution from start to finish.
            </p>
          </Reveal>
        </div>
      </section>

      <div className="container pb-4">
        <img
          src={photos.substation}
          alt=""
          loading="lazy"
          className="h-48 w-full object-cover sm:h-72 lg:h-96"
        />
      </div>

      <Stats />

      <section className="section bg-background">
        <div className="container">
          <Reveal className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="max-w-2xl">
              <span className="eyebrow mb-4">Scope of work</span>
              <h2 className="text-display text-3xl md:text-4xl text-foreground">From supply to handover.</h2>
            </div>
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">Sectors: </span>
              {sectors.join(" · ")}
            </p>
          </Reveal>
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {process.map((p, i) => (
              <Reveal key={p.step} delay={i * 0.05} className="border border-border bg-card p-6 sm:last:col-span-2 lg:last:col-span-1">
                <span className="text-xs font-semibold tracking-widest text-accent-text">0{i + 1}</span>
                <h3 className="mt-3 font-sans text-base font-semibold text-foreground">{p.step}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

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
      <Credentials />
      <Clients />
      <CtaBand />
    </main>
    <Footer />
  </div>
);

export default About;
