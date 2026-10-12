import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import About from "@/components/About";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Clients from "@/components/Clients";
import CtaBand from "@/components/CtaBand";
import Footer from "@/components/Footer";
import LeadCaptureModal from "@/components/LeadCaptureModal";

const Index = () => (
  <div className="min-h-screen bg-background">
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
    <LeadCaptureModal />
  </div>
);

export default Index;
