import { Helmet } from "react-helmet-async";
import { SITE_NAME, SITE_URL } from "@/config/site";

interface SeoProps {
  title: string;
  description: string;
  /** Path of this page, e.g. "/about". */
  path: string;
  /** Keep the page out of search results. */
  noindex?: boolean;
}

// Per-page head tags: title, description, canonical and noindex.
const Seo = ({ title, description, path, noindex = false }: SeoProps) => {
  const url = `${SITE_URL}${path === "/" ? "" : path}`;
  const fullTitle = path === "/" ? title : `${title} | ${SITE_NAME}`;
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow"} />
    </Helmet>
  );
};

export default Seo;
