// Static company content shared across the home page and inner pages.

export const company = {
  name: "Sharma Electricals Pvt. Ltd.",
  short: "Sharma Electricals",
  founded: 2003,
  address: "Office no. 327, 3rd floor, Bestech Citygate, Sec-81A, Gurugram, Haryana",
  phone: "+91 9811617703",
  phoneHref: "tel:+919811617703",
  email: "sharma.electrricals99@gmail.com",
  mapEmbed: "https://maps.google.com/maps?q=28.3726942,76.9453924&z=16&output=embed",
  mapLink:
    "https://www.google.com/maps/place/Bestech+Citygate/@28.3726942,76.9453924,18z/data=!4m7!3m6!1s0x390d3db43d23f34f:0x245f39d482eecb46!4b1!8m2!3d28.3726942!4d76.9453924!16s%2Fg%2F11c3s98xzm",
};

export const stats = [
  { value: 23, suffix: "+", label: "Years of experience" },
  { value: 500, suffix: "+", label: "Projects completed" },
  { value: 50, suffix: "+", label: "Ongoing projects" },
  { value: 100, suffix: "+", label: "Team members" },
];

export const services = [
  { title: "HT/LT Electrical Works", desc: "Complete high-tension and low-tension electrical installations for large-scale developments." },
  { title: "Power Distribution", desc: "Substation design, panel manufacturing and distribution network engineering." },
  { title: "Solar & Renewable Energy", desc: "Rooftop solar installations and hybrid energy solutions for sustainable developments." },
  { title: "Electrical Maintenance", desc: "Annual maintenance contracts and 24/7 breakdown support for electrical infrastructure." },
  { title: "Safety & Compliance", desc: "Electrical safety audits, earthing systems and lightning protection solutions." },
  { title: "Automation & Controls", desc: "Building management systems, SCADA integration and smart electrical controls." },
];

export type Project = {
  title: string;
  location: string;
  category: string;
  scope: string;
  status: "Completed" | "Ongoing";
};

export const projects: Project[] = [
  { title: "Signature Global Park", location: "Sector 36, Sohna", category: "Residential Township", scope: "Complete HT/LT electrical infrastructure for 1500+ units", status: "Completed" },
  { title: "M3M Golf Estate", location: "Sector 65, Gurugram", category: "Luxury Residential", scope: "Power distribution network and DG synchronization", status: "Completed" },
  { title: "Bestech Business Tower", location: "Sector 66, Gurugram", category: "Commercial Complex", scope: "33KV substation, LT panels and building electrical", status: "Completed" },
  { title: "Vatika INXT", location: "Sector 83, Gurugram", category: "Mixed Use Development", scope: "Electrical design, execution and commissioning", status: "Ongoing" },
  { title: "Signature Global City", location: "Sector 81, Gurugram", category: "Integrated Township", scope: "Full township electrical infrastructure including street lighting", status: "Ongoing" },
  { title: "M3M Capital Walk", location: "Sector 113, Gurugram", category: "Commercial Retail", scope: "HT/LT networks and emergency power systems", status: "Completed" },
];

export const strengths = [
  { title: "Turnkey solutions", desc: "End-to-end electrical engineering from design to commissioning." },
  { title: "Large-scale projects", desc: "Expertise in township-level and commercial complex electrical networks." },
  { title: "Quality & safety", desc: "Strict adherence to IS standards and safety protocols on every project." },
  { title: "Trusted partnerships", desc: "Long-term relationships with India's leading real estate developers." },
];

export const leaders = [
  {
    name: "PD Sharma",
    title: "Founder & Managing Director",
    bio: "Founded Sharma Electricals and built it into one of Gurugram's most trusted electrical contracting firms. Over 23 years of experience in large-scale electrical infrastructure for some of NCR's most prestigious developments.",
  },
  {
    name: "Harshit Sharma",
    title: "Director, Electrical Engineering",
    bio: "Oversees project planning, client relations and the company's expansion into new-age electrical solutions including solar and automation.",
  },
];

export const clients = [
  "Signature Global",
  "M3M India",
  "Bestech Group",
  "Vatika Group",
  "Raheja Developers",
  "Ashiana Housing",
  "BPTP Ltd",
  "Godrej Properties",
];
