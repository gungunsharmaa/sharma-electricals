
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export type RevealFrom = "up" | "left" | "right";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  /** Direction the element enters from. Defaults to a short rise. */
  from?: RevealFrom;
  className?: string;
}

const offsets: Record<RevealFrom, { x: number; y: number }> = {
  up: { x: 0, y: 12 },
  left: { x: -56, y: 0 },
  right: { x: 56, y: 0 },
};

// Scroll-in used across the site. Slides are skipped for visitors who prefer reduced motion.
const Reveal = ({ children, delay = 0, from = "up", className }: RevealProps) => {
  const reduce = useReducedMotion();
  const { x, y } = reduce ? { x: 0, y: 0 } : offsets[from];

  return (
    <motion.div
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: from === "up" ? 0.5 : 0.65, delay, ease: "easeOut" }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
