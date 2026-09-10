import { motion } from "framer-motion";

const BLUE = "#172445";
const BLUE_RGB = "23,36,69";

const Maintenance = () => {
  return (
    <div
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center overflow-hidden px-6 text-center"
      style={{ background: BLUE }}
    >
      {/* Ambient blobs */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          background: `radial-gradient(circle, rgba(${BLUE_RGB},0.35) 0%, transparent 65%)`,
          top: "30%",
          left: "40%",
          transform: "translate(-50%,-50%)",
        }}
        animate={{ scale: [1, 1.2, 1], x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(200,169,110,0.08) 0%, transparent 65%)",
          bottom: "20%",
          right: "30%",
        }}
        animate={{ scale: [1, 1.3, 1], x: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* Title only */}
      <motion.h1
        className="font-['Cormorant_Garamond',serif] font-light text-white/95"
        style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", lineHeight: 1.1 }}
        initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        Site em manutenção
      </motion.h1>

      {/* Rings */}
      {[
        { size: "w-52 h-52 md:w-72 md:h-72", opacity: 0.12, delay: 0 },
        { size: "w-72 h-72 md:w-96 md:h-96", opacity: 0.05, delay: 0.3 },
      ].map((ring, i) => (
        <motion.div
          key={i}
          className={`absolute ${ring.size} rounded-full top-1/2 left-1/2`}
          style={{ border: `1px solid rgba(255,255,255,${ring.opacity})` }}
          initial={{ opacity: 0, scale: 0.4, x: "-50%", y: "-50%" }}
          animate={{ opacity: 1, scale: [1, 1.05, 1], x: "-50%", y: "-50%" }}
          transition={{
            opacity: { duration: 1, delay: ring.delay },
            scale: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: ring.delay },
          }}
        />
      ))}
    </div>
  );
};

export default Maintenance;
