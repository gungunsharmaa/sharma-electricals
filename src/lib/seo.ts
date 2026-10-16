// Single source for everything that goes in <head> — used at runtime by <Seo> and at build time by
// scripts/prerender-head.mjs, so crawlers that don't run JavaScript see the same tags.
import { SITE_NAME, SITE_URL } from "@/config/site";
import { company, services, clients, sectors } from "@/data/company";

export interface RouteMeta {
  title: string;
  description: string;
  /** Label used in breadcrumbs. */
  crumb?: string;
}

export const routes: Record<string, RouteMeta> = {
  "/": {
    title: "Electrical Contractor in Gurugram | Sharma Electricals Pvt. Ltd.",
    description:
      "Sharma Electricals Pvt. Ltd. is a Gurugram electrical contractor since 2000 — HT/LT supply, installation, testing, commissioning and handover for leading real estate developers across NCR.",
  },
  "/about": {
    title: "About Us",
    crumb: "About",
    description:
      "Sharma Electricals Pvt. Ltd. — 25+ years of electrical engineering and contracting in Gurugram. Our story, leadership, credentials and the developers we work with.",
  },
  "/services": {
    title: "Electrical Services",
    crumb: "Services",
    description:
      "HT/LT electrical supply, installation, testing, commissioning and handover for residential and commercial developments across Gurugram and NCR.",
  },
  "/work": {
    title: "Projects",
    crumb: "Projects",
    description:
      "Ongoing and completed electrical projects by Sharma Electricals for leading real estate developers in Gurugram and Delhi NCR.",
  },
  "/contact": {
    title: "Contact Us",
    crumb: "Contact",
    description:
      "Contact Sharma Electricals Pvt. Ltd., Gurugram — corporate and regional office addresses, phone, email and an enquiry form.",
  },
};

export const prerenderPaths = Object.keys(routes);

const abs = (path: string) => `${SITE_URL}${path === "/" ? "" : path}`;
export const SHARE_IMAGE = `${SITE_URL}/og-image.jpg`;
const LOGO = `${SITE_URL}/logo.jpg`;

const organization = () => ({
  "@type": ["Organization", "ElectricalContractor"],
  "@id": `${SITE_URL}/#organization`,
  name: company.name,
  legalName: company.name,
  alternateName: company.short,
  url: SITE_URL,
  logo: LOGO,
  image: SHARE_IMAGE,
  description:
    "Electrical contractor in Gurugram since 2000 — supply, installation, testing, commissioning and handover of HT/LT electrical works for real estate developers.",
  telephone: company.phone,
  email: company.email,
  foundingDate: String(company.founded),
  taxID: company.gst,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Office No. 327, 3rd Floor, Bestech Citygate, Sector-81A, Manesar",
    addressLocality: "Gurugram",
    addressRegion: "Haryana",
    postalCode: "122001",
    addressCountry: "IN",
  },
  geo: { "@type": "GeoCoordinates", latitude: 28.3726942, longitude: 76.9453924 },
  hasMap: company.mapLink,
  areaServed: ["Gurugram", "Delhi NCR", "Haryana"],
  knowsAbout: services.map((s) => s.title),
  sameAs: [company.linkedin],
  contactPoint: [
    { "@type": "ContactPoint", telephone: company.phone, email: company.email, contactType: "customer service", areaServed: "IN" },
  ],
});

const website = () => ({
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  publisher: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "en-IN",
});

const breadcrumb = (path: string) => {
  const meta = routes[path];
  if (path === "/" || !meta) return null;
  return {
    "@type": "BreadcrumbList",
    "@id": `${abs(path)}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: meta.crumb ?? meta.title, item: abs(path) },
    ],
  };
};

const serviceList = () => ({
  "@type": "ItemList",
  "@id": `${abs("/services")}#services`,
  itemListElement: services.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Service",
      name: s.title,
      description: s.desc,
      serviceType: s.title,
      provider: { "@id": `${SITE_URL}/#organization` },
      areaServed: ["Gurugram", "Delhi NCR"],
    },
  })),
});

export interface HeadData {
  title: string;
  description: string;
  canonical: string;
  robots: string;
  jsonLd: Record<string, unknown> | null;
}

export interface HeadOverrides {
  title?: string;
  description?: string;
  noindex?: boolean;
}

export const getHead = (path: string, o: HeadOverrides = {}): HeadData => {
  const meta = routes[path];
  const title = o.title ?? meta?.title ?? SITE_NAME;
  const description = o.description ?? meta?.description ?? "";
  const indexable = !o.noindex && !!meta;

  const graph: Record<string, unknown>[] = [];
  if (indexable) {
    graph.push(organization(), website());
    graph.push({
      "@type": "WebPage",
      "@id": `${abs(path)}#webpage`,
      url: abs(path),
      name: path === "/" ? title : `${title} | ${SITE_NAME}`,
      description,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en-IN",
    });
    const crumbs = breadcrumb(path);
    if (crumbs) graph.push(crumbs);
    if (path === "/services") graph.push(serviceList());
  }

  return {
    title: path === "/" ? title : `${title} | ${SITE_NAME}`,
    description,
    canonical: abs(path),
    robots: indexable ? "index, follow, max-image-preview:large" : "noindex, nofollow",
    jsonLd: graph.length ? { "@context": "https://schema.org", "@graph": graph } : null,
  };
};

/** Plain-text summary for AI assistants (served at /llms.txt). */
export const buildLlmsTxt = () => `# ${company.name}

> ${company.name} is an electrical contractor based in Gurugram, Haryana, operating in Delhi / NCR since ${company.founded}. It handles supply, installation, testing, commissioning and handing over of HT/LT electrical works for real estate developers.

## Key facts
- Founded: ${company.founded}
- Corporate office: ${company.address}
- Regional office: ${company.regionalAddress}
- Phone: ${company.phone}
- Email: ${company.email}
- GST: ${company.gst}
- Sectors: ${sectors.join(", ")}
- Developers served: ${clients.join(", ")}
- LinkedIn: ${company.linkedin}

## Services
${services.map((s) => `- ${s.title}: ${s.desc}`).join("\n")}

## Pages
- [Home](${SITE_URL}/): Company overview
- [About](${SITE_URL}/about): Story, leadership, credentials and clients
- [Services](${SITE_URL}/services): What we do
- [Projects](${SITE_URL}/work): Ongoing and completed projects
- [Contact](${SITE_URL}/contact): Offices, phone, email and enquiry form
`;
