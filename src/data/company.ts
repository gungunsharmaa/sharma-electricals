import imgSubstation from "@/assets/hero-electrical.jpg";
import imgDusk from "@/assets/hero-slide-2.jpg";
import imgControl from "@/assets/hero-slide-3.jpg";
import imgEngineer from "@/assets/hero-slide-4.jpg";
import imgPylon from "@/assets/hero-slide-5.jpg";
import imgNight from "@/assets/hero-slide-6.jpg";

// Page banner / section photos, shared so pages stay consistent.
export const photos = { substation: imgSubstation, dusk: imgDusk, control: imgControl, engineer: imgEngineer, pylon: imgPylon, night: imgNight };

// Static company content shared across the home page and inner pages.
// Source: company profile document (contractor details), FY 2025-26.

export const company = {
  name: "Sharma Electricals Pvt. Ltd.",
  short: "Sharma Electricals",
  founded: 2000,
  address: "Office No. 327, 3rd Floor, Bestech Citygate, Sector-81A, Manesar, Gurugram, Haryana – 122001",
  regionalAddress: "489/5, Street No. 3B, Patel Nagar, Gurugram, Haryana – 122001",
  phone: "+91 9811617703",
  phoneHref: "tel:+919811617703",
  email: "sharma.electricals99@gmail.com",
  emailSecondary: "infosharmaelectricals.co@gmail.com",
  gst: "06ARDPS2813D1Z4",
  msme: "HR05E0011984",
  mapEmbed: "https://maps.google.com/maps?q=28.3726942,76.9453924&z=16&output=embed",
  mapLink:
    "https://www.google.com/maps/place/Bestech+Citygate/@28.3726942,76.9453924,18z/data=!4m7!3m6!1s0x390d3db43d23f34f:0x245f39d482eecb46!4b1!8m2!3d28.3726942!4d76.9453924!16s%2Fg%2F11c3s98xzm",
};

export const stats = [
  { value: 25, suffix: "+", label: "Years in Delhi / NCR" },
  { value: 4.73, prefix: "₹", unit: "Cr", decimals: 2, label: "Turnover, FY 2025–26" },
  { value: 8.1, prefix: "₹", unit: "Cr", decimals: 2, label: "Works in hand" },

];

// Annual turnover in INR, oldest first.
export const turnover = [
  { year: "2020–21", amount: 11011112 },
  { year: "2021–22", amount: 17274110 },
  { year: "2022–23", amount: 7788340 },
  { year: "2023–24", amount: 21814869 },
  { year: "2024–25", amount: 13206270 },
  { year: "2025–26", amount: 47300000 },
];

export const worksInHand = 81027781;

export const team = [
  { role: "Project managers", count: 4 },
  { role: "Engineers", count: 4 },
  { role: "Technical foremen", count: 4 },
  { role: "Safety engineers", count: 1 },
  { role: "Quality engineers", count: 1 },
  { role: "Sub-contractors (associated)", count: 4 },
];

export const equipment = [
  { item: "Chasing cutter machines", count: 15 },
  { item: "Hammering drill machines", count: 10 },
  { item: "Hand drill machines", count: 6 },
  { item: "Cable crimping tool sets", count: 4 },
  { item: "Welding machines", count: 4 },
  { item: "Heavy power drill machines", count: 3 },
  { item: "Megger sets", count: 3 },
  { item: "Earth testers", count: 3 },
  { item: "Hilti machines for concrete chipping", count: 2 },
  { item: "Diesel generators (7.5 kVA)", count: 2 },
  { item: "Cable pull jacks", count: 2 },
  { item: "Cable fault finding machine", count: 1 },
  { item: "Tractor & trolley (Swaraj 735)", count: 1 },
];

export const suppliers = ["Havells Cables", "Schneider Electric", "Polycab Cables", "Eaton Power Quality"];

export const credentials = [
  { label: "Established", value: "2000, in Delhi / NCR since the same year" },
  { label: "GST registration", value: company.gst },
  { label: "MSME registration", value: company.msme },
  { label: "Statutory compliance", value: "Registered under PF, ESI and Labour Identification" },
  { label: "Litigation", value: "No arbitration or legal disputes in the last five years" },
];

export const sectors = ["Residential", "Commercial", "Real estate", "Hospitality"];

// Scope of work, in delivery order.
export const process = [
  { step: "Supply", desc: "Sourcing quality electrical materials from trusted suppliers." },
  { step: "Installation", desc: "Internal and external electrical systems installed on site." },
  { step: "Testing", desc: "Systems tested to standard before they are energized." },
  { step: "Commissioning", desc: "Commissioning and energization of the completed works." },
  { step: "Handing over", desc: "Clean handover to the client, ready for use." },
];

export const services = [
  { title: "HT/LT Electrical Works", desc: "Complete high-tension and low-tension electrical installations for large-scale developments.", image: imgPylon, focus: "70% 50%" },
  { title: "Power Distribution", desc: "Substation design, panel manufacturing and distribution network engineering.", image: imgSubstation, focus: "70% 60%" },
  { title: "Solar & Renewable Energy", desc: "Rooftop solar installations and hybrid energy solutions for sustainable developments.", image: imgNight, focus: "50% 40%" },
  { title: "Electrical Maintenance", desc: "Annual maintenance contracts and 24/7 breakdown support for electrical infrastructure.", image: imgEngineer, focus: "30% 40%" },
  { title: "Safety & Compliance", desc: "Electrical safety audits, earthing systems and lightning protection solutions.", image: imgDusk, focus: "70% 50%" },
  { title: "Automation & Controls", desc: "Building management systems, SCADA integration and smart electrical controls.", image: imgControl, focus: "60% 55%" },
];

export type Project = {
  title: string;
  client: string;
  location: string;
  scope: string;
  status: "Completed" | "Ongoing";
  period?: string;
};

// Ongoing projects first so they lead on the home page.
export const projects: Project[] = [
  { title: "Signature Global City 37D-II", client: "Signature Global (India) Ltd.", location: "Sector 37D, Gurugram", scope: "Internal electrical works", status: "Ongoing", period: "Completion expected Dec 2026" },
  { title: "Signature Global City 79B", client: "Signature Global (India) Ltd.", location: "Sector 79B, Gurugram", scope: "External electrical works across 12.49 acres", status: "Ongoing" },
  { title: "Bestech Citygate", client: "Bestech India Pvt. Ltd.", location: "Sector 81A, Gurugram", scope: "Internal electrical works", status: "Ongoing" },
  { title: "Signature Global SCO-88A", client: "Signature Global India Ltd.", location: "Sector 88A, Gurugram", scope: "External electrical works", status: "Completed", period: "2025–26" },
  { title: "Signature Global City 37D-II", client: "Signature Global (India) Ltd.", location: "Sector 37D, Gurugram", scope: "External electrical works across 5.6 acres", status: "Completed", period: "2025–26" },
  { title: "Vipul Pratham Apartments", client: "Vipul Ltd.", location: "Bawal, Rewari", scope: "Internal and external electrical works", status: "Completed", period: "2025" },
  { title: "Bestech Citygate — Interiors", client: "Bestech India Pvt. Ltd.", location: "Sector 81A, Gurugram", scope: "Internal interior works", status: "Completed", period: "2024–25" },
  { title: "Brahma Athena, Bestech", client: "Bestech India Pvt. Ltd.", location: "Sector 16, Gurugram", scope: "Internal and external electrical works", status: "Completed", period: "2023–24" },
  { title: "Bestech Citygate", client: "Bestech India Pvt. Ltd.", location: "Sector 81A, Gurugram", scope: "Internal and external electrical works", status: "Completed", period: "2023–24" },
  { title: "Signature Global City 92, Phase II", client: "Signature Global (India) Ltd.", location: "Sector 92, Gurugram", scope: "External electrical works for ESS energization of Phase I", status: "Completed", period: "2024" },
];

export const strengths = [
  { title: "Turnkey solutions", desc: "End-to-end electrical engineering from design to commissioning." },
  { title: "Large-scale projects", desc: "Expertise in township-level and commercial complex electrical networks." },
  { title: "Quality & safety", desc: "Dedicated safety and quality engineers on every project, to IS standards." },
  { title: "Trusted partnerships", desc: "Repeat work for Signature Global, Bestech and other leading developers." },
];

export const leaders = [
  {
    name: "PD Sharma",
    title: "Founder & Director",
    bio: "Founded Sharma Electricals in 2000 and built it into a trusted electrical contracting firm in Gurugram. Over 25 years of experience in large-scale electrical infrastructure for NCR developments.",
  },
  {
    name: "Harshit Sharma",
    title: "Director, Electrical Engineering",
    bio: "Oversees project planning, client relations and the company's expansion into new-age electrical solutions including solar and automation.",
  },
];

export const clients = [
  "Signature Global",
  "Bestech India",
  "Vipul Limited",
  "Unitech Limited",
  "Pioneer Urban Land & Infrastructure",
  "Ireo Private Limited",
  "Universal Buildwell",
];
