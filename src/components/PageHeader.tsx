import { Link } from "react-router-dom";

interface PageHeaderProps {
  title: string;
  intro?: string;
}

// Shared banner for inner pages (About, Services, Projects, Contact).
const PageHeader = ({ title, intro }: PageHeaderProps) => (
  <section className="bg-primary text-primary-foreground">
    <div className="container py-16 md:py-24">
      <nav aria-label="Breadcrumb" className="mb-8 text-xs font-medium text-primary-foreground/60">
        <Link to="/" className="hover:text-primary-foreground transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-primary-foreground">{title}</span>
      </nav>
      <h1 className="text-display text-4xl md:text-6xl max-w-3xl">{title}</h1>
      <div className="mt-6 h-0.5 w-16 bg-accent" />
      {intro && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-primary-foreground/75">{intro}</p>}
    </div>
  </section>
);

export default PageHeader;
