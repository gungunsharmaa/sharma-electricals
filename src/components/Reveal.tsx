import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

// Single, subtle scroll-in used across the site: short fade with a small rise.
const Reveal = ({ children, delay = 0, className }: RevealProps) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.5, delay, ease: "easeOut" }}
    className={cn(className)}
  >
    {children}
  </motion.div>
);

export default Reveal;
