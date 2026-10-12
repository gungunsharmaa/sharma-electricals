import { Link } from "react-router-dom";

interface PageHeaderProps {
  title: string;
  intro?: string;
  image?: string;
}

// Shared banner for inner pages (About, Services, Projects, Contact).
const PageHeader = ({ title, intro, image }: PageHeaderProps) => (
  <section className="relative overflow-hidden bg-primary text-primary-foreground">
    {image && (
      <>
        <div
          aria-hidden
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${image})` }}
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-hero" />
      </>
    )}
    <div className="container relative py-14 md:py-24">
      <nav aria-label="Breadcrumb" className="mb-6 md:mb-8 text-xs font-medium text-primary-foreground/70">
        <Link to="/" className="hover:text-primary-foreground transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-primary-foreground">{title}</span>
      </nav>
      <h1 className="text-display text-4xl md:text-6xl max-w-3xl">{title}</h1>
      <div className="mt-6 h-0.5 w-16 bg-accent" />
      {intro && <p className="mt-6 max-w-2xl text-base md:text-lg leading-relaxed text-primary-foreground/80">{intro}</p>}
    </div>
  </section>
);

export default PageHeader;
