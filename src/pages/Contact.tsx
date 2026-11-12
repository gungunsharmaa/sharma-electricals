import Seo from "@/components/Seo";
import { FiMapPin, FiPhone, FiMail, FiExternalLink } from "react-icons/fi";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import { company, photos } from "@/data/company";

const details = [
  { icon: FiMapPin, label: "Corporate office", value: company.address },
  { icon: FiMapPin, label: "Regional office", value: company.regionalAddress },
  { icon: FiPhone, label: "Phone", value: company.phone, href: company.phoneHref },
  { icon: FiMail, label: "Email", value: company.email, href: `mailto:${company.email}` },
  { icon: FiMail, label: "Email (general)", value: company.emailSecondary, href: `mailto:${company.emailSecondary}` },
];

const Contact = () => (
  <div className="min-h-screen bg-background">
    <Seo path="/contact" />
    <Navigation />
    <main>
      <PageHeader
        image={photos.dusk}
        title="Contact us"
        intro="Tell us about your project and our team will get back to you. For urgent requirements, call us directly."
      />

      <section className="section">
        <div className="container grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <span className="eyebrow mb-4">Get in touch</span>
            <h2 className="text-display text-3xl md:text-4xl text-foreground">We'd like to hear from you.</h2>

            <ul className="mt-10 space-y-7">
              {details.map(({ icon: Icon, label, value, href }) => (
                <li key={label} className="flex gap-4">
                  <Icon className="mt-1 shrink-0 text-lg text-primary" aria-hidden />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
                    {href ? (
                      <a href={href} className="mt-1 block text-foreground hover:underline break-all">{value}</a>
                    ) : (
                      <p className="mt-1 text-foreground">{value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-10 border border-border">
              <iframe
                title="Sharma Electricals — Bestech Citygate, Sector 81A, Gurugram"
                src={company.mapEmbed}
                width="100%"
                height="240"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              />
              <a
                href={company.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-4 py-3 border-t border-border text-sm font-medium text-foreground hover:bg-card transition-colors"
              >
                Open in Google Maps <FiExternalLink />
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-7">
            <div className="border border-border bg-card p-6 md:p-10">
              <h2 className="font-serif text-2xl font-semibold text-foreground">Send us a message</h2>
              <p className="mt-2 mb-8 text-sm text-muted-foreground">Fields marked * are required.</p>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default Contact;
