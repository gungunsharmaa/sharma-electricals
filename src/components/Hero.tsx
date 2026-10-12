import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import heroImg from "@/assets/hero-electrical.jpg";
import heroSlide2 from "@/assets/hero-slide-2.jpg";
import heroSlide3 from "@/assets/hero-slide-3.jpg";
import heroSlide4 from "@/assets/hero-slide-4.jpg";
import heroSlide5 from "@/assets/hero-slide-5.jpg";
import heroSlide6 from "@/assets/hero-slide-6.jpg";
import { company } from "@/data/company";

const heroSlides = [heroImg, heroSlide2, heroSlide3, heroSlide4, heroSlide5, heroSlide6];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative flex min-h-[calc(100vh-72px)] items-end overflow-hidden bg-primary text-primary-foreground">
      <AnimatePresence initial={false}>
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroSlides[currentSlide]})` }}
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-hero" />

      <div className="container relative z-10 pb-16 pt-32 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <span className="eyebrow !text-primary-foreground/70 mb-6">
            Electrical engineering & contracting · Since {company.founded}
          </span>
          <h1 className="text-display text-5xl md:text-7xl">
            Powering the developments that shape modern India.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-primary-foreground/80">
            HT/LT infrastructure, power distribution and electrical systems for the country's leading real estate
            developers — delivered end to end.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-accent text-accent-foreground text-sm font-semibold rounded-sm hover:bg-accent/90 transition-colors"
            >
              Contact us <FiArrowRight />
            </Link>
            <Link
              to="/work"
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-primary-foreground/40 text-sm font-semibold rounded-sm hover:bg-primary-foreground/10 transition-colors"
            >
              View our projects
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
