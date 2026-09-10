import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import odaraLogo from "@/assets/logo-sem-fundo.png";

const BLUE = "#0a2a56";
const BLUE_RGB = "10,42,86";
const SEEN_KEY = "odara_preloader_seen";

const Preloader = () => {
  const alreadySeen = typeof window !== "undefined" && sessionStorage.getItem(SEEN_KEY) === "1";
  const [hidden, setHidden] = useState(alreadySeen);
  const [phase, setPhase] = useState(alreadySeen ? 4 : 0);

  useEffect(() => {
    if (alreadySeen) return;

    const timers = [
      setTimeout(() => setPhase(1), 300),
      setTimeout(() => setPhase(2), 1800),
      setTimeout(() => setPhase(3), 3400),
      setTimeout(() => setPhase(4), 4800),
      setTimeout(() => {
        setHidden(true);
        sessionStorage.setItem(SEEN_KEY, "1");
      }, 5800),
    ];
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const letters = "ODARA".split("");
  const subtitleWords = ["CAPITAL", "PARTNERS"];

  return (
    <AnimatePresence>
      {!hidden && (
        <motion.div
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: BLUE }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Ambient gradient blobs */}
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full"
            style={{
              background: `radial-gradient(circle, rgba(${BLUE_RGB},0.35) 0%, transparent 65%)`,
              top: "30%", left: "40%",
              transform: "translate(-50%,-50%)",
            }}
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 30, 0],
              y: [0, -20, 0],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute w-[400px] h-[400px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(200,169,110,0.08) 0%, transparent 65%)",
              bottom: "20%", right: "30%",
            }}
            animate={{
              scale: [1, 1.3, 1],
              x: [0, -20, 0],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />

          {/* Orbiting dots */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: phase >= 2 && phase < 4 ? 0.6 : 0 }}
              transition={{ duration: 0.5 }}
              style={{
                width: "2px", height: "2px",
                background: i % 2 === 0 ? BLUE : "#c8a96e",
                top: "50%", left: "50%",
                animation: phase >= 2 ? `orbit${i % 4} ${4 + i * 0.5}s linear infinite` : "none",
              }}
            />
          ))}

          {/* Main content */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Logo */}
            <motion.div
              className="relative mb-8 md:mb-10"
              initial={{ scale: 0, opacity: 0, rotate: -30 }}
              animate={
                phase >= 4
                  ? { scale: 1.5, opacity: 0, rotate: 10 }
                  : phase >= 1
                  ? { scale: 1, opacity: 1, rotate: 0 }
                  : { scale: 0, opacity: 0, rotate: -30 }
              }
              transition={{ duration: phase >= 4 ? 0.8 : 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <motion.div
                className="absolute rounded-full pointer-events-none"
                style={{
                  width: "250%", height: "250%", top: "-75%", left: "-75%",
                  background: `radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 60%)`,
                }}
                animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              <span
                className="flex items-center justify-center w-24 h-24 md:w-32 md:h-32 rounded-full bg-white relative z-10"
                style={{ filter: `drop-shadow(0 0 40px rgba(255,255,255,0.4))` }}
              >
                <img
                  src={odaraLogo}
                  alt="Odara"
                  className="w-16 h-16 md:w-24 md:h-24 object-contain"
                />
              </span>
            </motion.div>

            {/* ODARA — big letters one by one with color play */}
            <div className="flex items-center justify-center gap-1 md:gap-2 mb-4 md:mb-5 overflow-hidden">
              {letters.map((letter, i) => (
                <motion.span
                  key={i}
                  className="font-['Cormorant_Garamond',serif] font-light inline-block"
                  style={{ fontSize: "clamp(3.5rem, 8vw, 7rem)", lineHeight: 1 }}
                  initial={{ opacity: 0, y: 80, rotateX: 90, filter: "blur(10px)" }}
                  animate={
                    phase >= 4
                      ? { opacity: 0, y: -40, scale: 0.8, filter: "blur(6px)" }
                      : phase >= 2
                      ? { opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)", color: "rgba(255,255,255,0.95)" }
                      : { opacity: 0, y: 80, rotateX: 90, filter: "blur(10px)" }
                  }
                  transition={{
                    duration: phase >= 4 ? 0.5 : 0.9,
                    delay: phase >= 4 ? i * 0.04 : i * 0.12,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                >
                  <motion.span
                    className="inline-block"
                    animate={
                      phase >= 2 && phase < 4
                        ? {
                            color: [
                              "rgba(255,255,255,0.95)",
                              "#6D90C8",
                              "rgba(200,169,110,0.9)",
                              "rgba(255,255,255,0.95)",
                            ],
                          }
                        : {}
                    }
                    transition={{
                      duration: 4,
                      delay: i * 0.3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    {letter}
                  </motion.span>
                </motion.span>
              ))}
            </div>

            {/* Animated line */}
            <motion.div
              className="h-[1px] mb-5 md:mb-6"
              style={{ background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.4), rgba(200,169,110,0.4), transparent)` }}
              initial={{ width: 0, opacity: 0 }}
              animate={
                phase >= 4
                  ? { width: 0, opacity: 0 }
                  : phase >= 2
                  ? { width: 200, opacity: 1 }
                  : { width: 0, opacity: 0 }
              }
              transition={{ duration: 0.8, delay: phase >= 2 && phase < 4 ? 0.6 : 0 }}
            />

            {/* CAPITAL PARTNERS */}
            <div className="flex items-center gap-4 md:gap-6 mb-6">
              {subtitleWords.map((word, i) => (
                <motion.span
                  key={word}
                  className="font-['DM_Sans',sans-serif] font-light tracking-[0.4em] uppercase"
                  style={{ fontSize: "clamp(0.75rem, 1.5vw, 1rem)", color: "rgba(255,255,255,0.35)" }}
                  initial={{ opacity: 0, x: i === 0 ? -30 : 30, filter: "blur(6px)" }}
                  animate={
                    phase >= 4
                      ? { opacity: 0, y: -20, filter: "blur(4px)" }
                      : phase >= 2
                      ? { opacity: 1, x: 0, filter: "blur(0px)" }
                      : { opacity: 0, x: i === 0 ? -30 : 30, filter: "blur(6px)" }
                  }
                  transition={{
                    duration: phase >= 4 ? 0.5 : 0.8,
                    delay: phase >= 4 ? 0.1 : 0.9 + i * 0.25,
                    ease: "easeOut",
                  }}
                >
                  {i === 1 && (
                    <motion.span
                      className="inline-block mr-4 md:mr-6 w-6 h-[1px] align-middle"
                      style={{ background: "rgba(255,255,255,0.25)" }}
                      initial={{ scaleX: 0 }}
                      animate={phase >= 2 && phase < 4 ? { scaleX: 1 } : { scaleX: 0 }}
                      transition={{ duration: 0.6, delay: 1.2 }}
                    />
                  )}
                  {word}
                </motion.span>
              ))}
            </div>

            {/* Tagline with shimmer */}
            <motion.div
              className="relative overflow-hidden"
              initial={{ opacity: 0, y: 15 }}
              animate={
                phase >= 4
                  ? { opacity: 0, y: -10 }
                  : phase >= 3
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 15 }
              }
              transition={{ duration: 0.6, delay: phase >= 3 && phase < 4 ? 0.2 : 0 }}
            >
              <span
                className="text-[0.6rem] md:text-[0.7rem] tracking-[0.4em] uppercase font-['DM_Sans',sans-serif]"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                Structured Credit Advisory
              </span>
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{ background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)" }}
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
              />
            </motion.div>
          </div>

          {/* Loading bar */}
          <motion.div
            className="absolute bottom-14 md:bottom-16 w-32 md:w-48 h-[1px] overflow-hidden"
            style={{ background: "rgba(255,255,255,0.06)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: phase >= 1 && phase < 4 ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="h-full"
              style={{ background: `linear-gradient(90deg, #6D90C8, #c8a96e, #6D90C8)` }}
              initial={{ width: "0%" }}
              animate={{ width: phase >= 1 ? "100%" : "0%" }}
              transition={{ duration: 4, ease: [0.4, 0, 0.2, 1] }}
            />
          </motion.div>

          {/* Rings */}
          {[{ size: "w-52 h-52 md:w-72 md:h-72", opacity: 0.15, delay: 0 }, { size: "w-72 h-72 md:w-96 md:h-96", opacity: 0.06, delay: 0.3 }].map((ring, i) => (
            <motion.div
              key={i}
              className={`absolute ${ring.size} rounded-full top-1/2 left-1/2`}
              style={{ border: `1px solid rgba(255,255,255,${ring.opacity})` }}
              initial={{ opacity: 0, scale: 0.4, x: "-50%", y: "-50%" }}
              animate={{
                opacity: phase >= 2 && phase < 4 ? 1 : 0,
                scale: phase >= 2 ? [1, 1.05, 1] : 0.4,
                x: "-50%", y: "-50%",
              }}
              transition={{
                opacity: { duration: 1, delay: ring.delay },
                scale: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: ring.delay },
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
