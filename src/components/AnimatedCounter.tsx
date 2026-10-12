import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface Props {
  target: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
}

const AnimatedCounter = ({ target, prefix = "", suffix = "", decimals = 0, duration = 2000 }: Props) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const startTime = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(eased * target);
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [inView, target, duration]);

  return <span ref={ref}>{prefix}{value.toFixed(decimals)}{suffix}</span>;
};

export default AnimatedCounter;
