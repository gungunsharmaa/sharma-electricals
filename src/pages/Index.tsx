import Seo from "@/components/Seo";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import About from "@/components/About";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Clients from "@/components/Clients";
import CtaBand from "@/components/CtaBand";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Seo title="Electrical Contractor in Gurugram | Sharma Electricals Pvt. Ltd." description="Sharma Electricals Pvt. Ltd. is a Gurugram electrical contractor since 2000 — HT/LT supply, installation, testing, commissioning and handover for leading real estate developers across NCR." path="/" />
    <Navigation />
    <main>
      <Hero />
      <Stats />
      <About />
      <Services />
      <Projects />
      <Clients />
      <CtaBand />
    </main>
    <Footer />
  </div>
);

export default Index;
