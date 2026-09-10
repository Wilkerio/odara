import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

import img1Asset from "@/assets/hero-1-middle-market.png.asset.json";
import img2 from "@/assets/showcase-4-bespoke.jpg";
import img3Asset from "@/assets/hero-3-baselines.png.asset.json";
import img4Asset from "@/assets/hero-4-bespoke.png.asset.json";
import img5Asset from "@/assets/hero-5-hands-on.png.asset.json";
import img6Asset from "@/assets/hero-6-innovation.png.asset.json";
import img7 from "@/assets/hero-7-latin-america.webp";

const img1 = img1Asset.url;
const img3 = img3Asset.url;
const img4 = img4Asset.url;
const img5 = img5Asset.url;
const img6 = img6Asset.url;

const slides = [
  { image: img1, titleKey: "showcase.1.title", subKey: "showcase.1.sub", position: "center" },
  { image: img2, titleKey: "showcase.2.title", subKey: "showcase.2.sub", position: "center" },
  { image: img3, titleKey: "showcase.3.title", subKey: "showcase.3.sub", position: "center" },
  { image: img4, titleKey: "showcase.4.title", subKey: "showcase.4.sub", position: "center" },
  { image: img5, titleKey: "showcase.5.title", subKey: "showcase.5.sub", position: "center" },
  { image: img6, titleKey: "showcase.6.title", subKey: "showcase.6.sub", position: "center" },
  { image: img7, titleKey: "showcase.7.title", subKey: "showcase.7.sub", position: "25% 50%" },
];

interface HeroProps {
  t: Record<string, string>;
}

const heroSlides = [
  { titleKey: "hero.title", subKey: "hero.sub" },
  { titleKey: "hero.title2", subKey: "hero.sub2" },
  { titleKey: "hero.title3", subKey: "hero.sub3" },
];

const HeroSection = ({ t }: HeroProps) => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [slideCount, setSlideCount] = useState(0);
  const [titleIndex, setTitleIndex] = useState(0);

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > current ? 1 : -1);
      setCurrent(index);
      setSlideCount((prev) => prev + 1);
    },
    [current]
  );

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % slides.length);
      setSlideCount((prev) => prev + 1);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  // Change title every 4 slides, with a 1.5s delay so it doesn't coincide with slide transition
  useEffect(() => {
    if (slideCount > 0 && slideCount % 3 === 0) {
      const timeout = setTimeout(() => {
        setTitleIndex((prev) => (prev + 1) % heroSlides.length);
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [slideCount]);

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 80 : -80 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -80 : 80 }),
  };

  const slide = slides[current];

  return (
    <section id="hero" className="min-h-screen grid grid-cols-1 md:grid-cols-2 relative overflow-hidden">
      {/* Left — text */}
      <div className="flex flex-col justify-center items-center text-center px-5 md:px-16 py-12 pt-[100px] md:pt-[140px] relative z-[2]">
        <p
          className="font-['DM_Sans',sans-serif] text-[0.65rem] md:text-[0.7rem] tracking-[0.3em] uppercase mb-6 md:mb-8 opacity-0"
          style={{ color: "hsl(218, 100%, 22%)", animation: "fadeUp 1s ease 0.3s forwards" }}
        >
          {t["hero.eyebrow"]}
        </p>
        <AnimatePresence mode="wait">
          <motion.h1
            key={`title-${titleIndex}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-['Cormorant_Garamond',serif] font-light leading-[1.05] tracking-[-0.01em] mb-6 md:mb-10"
            style={{ fontSize: "clamp(2.6rem, 6vw, 6.5rem)" }}
            dangerouslySetInnerHTML={{ __html: t[heroSlides[titleIndex].titleKey] }}
          />
        </AnimatePresence>
        <AnimatePresence mode="wait">
          <motion.p
            key={`sub-${titleIndex}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-['DM_Sans',sans-serif] font-light text-sm md:text-base leading-[1.75] max-w-[340px] md:max-w-[380px] mb-10 md:mb-14 mx-auto"
            style={{ color: "hsl(36, 3%, 52%)" }}
          >
            {t[heroSlides[titleIndex].subKey]}
          </motion.p>
        </AnimatePresence>
        <div
          className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-center justify-center opacity-0 w-full sm:w-auto"
          style={{ animation: "fadeUp 1s ease 0.9s forwards" }}
        >
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
            className="inline-block font-['DM_Sans',sans-serif] text-[0.72rem] md:text-[0.75rem] font-normal tracking-[0.2em] uppercase no-underline px-8 md:px-10 py-3.5 md:py-4 relative overflow-hidden group w-full sm:w-auto text-center"
            style={{ background: "hsl(232,25%,56%)", color: "hsl(36,18%,96%)" }}
          >
            <span className="absolute inset-0 bg-[hsl(232,25%,48%)] scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-400" />
            <span className="relative z-[1]">{t["hero.btn1"]}</span>
          </a>
          <a
            href="#services"
            onClick={(e) => { e.preventDefault(); document.getElementById("services")?.scrollIntoView({ behavior: "smooth" }); }}
            className="inline-flex items-center gap-2.5 font-['DM_Sans',sans-serif] text-[0.72rem] md:text-[0.75rem] font-normal tracking-[0.2em] uppercase no-underline transition-colors hover:text-foreground group"
            style={{ color: "hsl(36,3%,52%)" }}
          >
            {t["hero.btn2"]}
            <svg width="16" height="8" viewBox="0 0 16 8" fill="none" className="group-hover:translate-x-1.5 transition-transform">
              <path d="M0 4H14M10 1L14 4L10 7" stroke="currentColor" strokeWidth="1" />
            </svg>
          </a>
        </div>
      </div>

      {/* Right — showcase carousel (desktop) */}
      <div className="relative overflow-hidden hidden md:block group/carousel">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0" style={{ background: "hsl(218,100%,8%)" }} />
            <img src={slide.image} alt={t[slide.titleKey]} className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: slide.position }} />
            {/* Blue overlay — fades on hover */}
            <div className="absolute inset-0 bg-[hsl(232,25%,56%)] mix-blend-color transition-opacity duration-700 group-hover/carousel:opacity-0" />
            {/* Scrim — gradient contrast layer behind title, never a solid band */}
            <div
              className="absolute inset-x-0 bottom-0 h-[45%] pointer-events-none"
              style={{ background: "linear-gradient(to top, rgba(27,42,94,0.85) 0%, rgba(27,42,94,0.85) 15%, rgba(27,42,94,0.45) 60%, rgba(27,42,94,0) 100%)" }}
            />
            <div className="absolute bottom-8 left-6 right-6 max-w-[500px]">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="font-['Cormorant_Garamond',serif] font-light text-white leading-[1.15] tracking-[-0.01em]"
                style={{ fontSize: "clamp(1.2rem, 2vw, 1.8rem)", textShadow: "0 1px 4px rgba(27,42,94,0.3)" }}
              >
                {t[slide.titleKey]}
              </motion.h3>
            </div>
          </motion.div>
        </AnimatePresence>

        <button onClick={() => goTo((current - 1 + slides.length) % slides.length)} className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center border border-white/20 bg-black/30 backdrop-blur-sm hover:bg-white/20 transition-all cursor-pointer" aria-label="Previous slide">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7L9 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <button onClick={() => goTo((current + 1) % slides.length)} className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center border border-white/20 bg-black/30 backdrop-blur-sm hover:bg-white/20 transition-all cursor-pointer" aria-label="Next slide">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 2L10 7L5 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>

      </div>

      {/* Mobile — showcase carousel */}
      <div className="md:hidden relative w-full h-[50vh] overflow-hidden group/mobile">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div key={current} custom={direction} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }} className="absolute inset-0">
            <div className="absolute inset-0" style={{ background: "hsl(218,100%,8%)" }} />
            <img src={slide.image} alt={t[slide.titleKey]} className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: slide.position }} />
            {/* Blue overlay — fades on hover */}
            <div className="absolute inset-0 bg-[hsl(232,25%,56%)] mix-blend-color transition-opacity duration-700 group-hover/mobile:opacity-0" />
            {/* Scrim — gradient contrast layer behind title, never a solid band */}
            <div
              className="absolute inset-x-0 bottom-0 h-[70%] sm:h-[55%] pointer-events-none"
              style={{ background: "linear-gradient(to top, rgba(27,42,94,0.85) 0%, rgba(27,42,94,0.85) 15%, rgba(27,42,94,0.45) 60%, rgba(27,42,94,0) 100%)" }}
            />
            <div className="absolute bottom-6 left-4 right-4">
              <h3 className="font-['Cormorant_Garamond',serif] font-light text-white leading-[1.15] text-lg" style={{ textShadow: "0 1px 4px rgba(27,42,94,0.3)" }}>{t[slide.titleKey]}</h3>
            </div>
          </motion.div>
        </AnimatePresence>
        <button onClick={() => goTo((current - 1 + slides.length) % slides.length)} className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full flex items-center justify-center border border-white/20 bg-black/30 backdrop-blur-sm hover:bg-white/20 transition-all cursor-pointer" aria-label="Previous slide">
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7L9 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <button onClick={() => goTo((current + 1) % slides.length)} className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full flex items-center justify-center border border-white/20 bg-black/30 backdrop-blur-sm hover:bg-white/20 transition-all cursor-pointer" aria-label="Next slide">
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M5 2L10 7L5 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>

    </section>
  );
};

export default HeroSection;
