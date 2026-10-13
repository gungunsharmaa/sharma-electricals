import Seo from "@/components/Seo";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import ServicesGrid from "@/components/Services";
import CtaBand from "@/components/CtaBand";
import { photos } from "@/data/company";

const Services = () => (
  <div className="min-h-screen bg-background">
    <Seo title="Electrical Services" description="HT/LT electrical supply, installation, testing, commissioning and handover for residential and commercial developments across Gurugram and NCR." path="/services" />
    <Navigation />
    <main>
      <PageHeader
        image={photos.control}
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
