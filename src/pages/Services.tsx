import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import ServicesGrid from "@/components/Services";
import CtaBand from "@/components/CtaBand";

const Services = () => (
  <div className="min-h-screen bg-background">
    <Navigation />
    <main>
      <PageHeader
        title="Services"
        intro="End-to-end electrical engineering — from design and installation to maintenance and compliance."
      />
      <ServicesGrid showHeading={false} />
      <CtaBand />
    </main>
    <Footer />
  </div>
);

export default Services;
