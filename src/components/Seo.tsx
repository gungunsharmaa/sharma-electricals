import { Helmet } from "react-helmet-async";
import { getHead, SHARE_IMAGE, type HeadOverrides } from "@/lib/seo";
import { SITE_NAME } from "@/config/site";

interface SeoProps extends HeadOverrides {
  /** Path of this page, e.g. "/about". Known routes get their title/description from lib/seo. */
  path: string;
}

// Per-page head tags. scripts/prerender-head.mjs writes the same tags into the static HTML.
const Seo = ({ path, ...overrides }: SeoProps) => {
  const h = getHead(path, overrides);
  return (
    <Helmet>
      <title>{h.title}</title>
      <meta name="description" content={h.description} />
      <link rel="canonical" href={h.canonical} />
      <meta name="robots" content={h.robots} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:title" content={h.title} />
      <meta property="og:description" content={h.description} />
      <meta property="og:url" content={h.canonical} />
      <meta property="og:image" content={SHARE_IMAGE} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Sharma Electricals Pvt. Ltd. — electrical contractor in Gurugram" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={h.title} />
      <meta name="twitter:description" content={h.description} />
      <meta name="twitter:image" content={SHARE_IMAGE} />
      {h.jsonLd && <script type="application/ld+json">{JSON.stringify(h.jsonLd)}</script>}
    </Helmet>
  );
};

export default Seo;
