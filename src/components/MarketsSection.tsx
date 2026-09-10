import { useReveal } from "@/hooks/useReveal";
import { motion } from "framer-motion";

interface MarketsProps {
  t: Record<string, string>;
}

const markets = [
  { key: "dfic", code: "BR", city: "São Paulo" },
  { key: "luxembourg", code: "LU", city: "Luxembourg" },
  { key: "dwtc", code: "AE", city: "Dubai" },
  { key: "usa", code: "US", city: "New York" },
];

const MarketsSection = ({ t }: MarketsProps) => {
  const ref = useReveal();

  return (
    <section id="markets" className="py-[120px] md:py-[160px] relative overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(218,100%,6%) 0%, hsl(0,0%,5%) 100%)", color: "hsl(36,18%,96%)" }}>
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, hsl(218,80%,50%) 1px, transparent 0)", backgroundSize: "48px 48px" }} />

      <div className="max-w-[1280px] mx-auto px-6 md:px-16 relative z-10" ref={ref}>
        <p className="reveal text-[0.65rem] tracking-[0.35em] uppercase flex items-center gap-4 mb-6 font-semibold" style={{ color: "hsl(218,100%,30%)" }}>
          <span className="w-10 h-px flex-shrink-0" style={{ background: "hsl(218,100%,30%)" }} />
          {t["markets.label"]}
        </p>
        <h2 className="reveal reveal-delay-1 font-['Cormorant_Garamond',serif] font-light leading-[1.1] tracking-[-0.01em] mb-5" style={{ fontSize: "clamp(2.2rem, 4vw, 3.8rem)" }} dangerouslySetInnerHTML={{ __html: t["markets.title"] }} />
        <p className="reveal reveal-delay-2 font-['DM_Sans',sans-serif] font-light text-sm md:text-[0.95rem] leading-[1.85] max-w-[560px] mb-16" style={{ color: "hsl(218,15%,62%)" }}>{t["markets.sub"]}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {markets.map((market, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="group relative overflow-hidden rounded-md"
              style={{ background: "hsl(218,40%,11%)", border: "1px solid hsl(218,30%,20%)" }}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-600" style={{ background: "radial-gradient(ellipse at 50% 0%, hsla(232,25%,56%,0.1) 0%, transparent 70%)" }} />
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" style={{ background: "linear-gradient(90deg, hsl(232,25%,66%), hsl(232,25%,76%))" }} />

              <div className="relative z-10 p-8 md:p-10">
                {/* Country code */}
                <span className="font-['Cormorant_Garamond',serif] text-[2.8rem] md:text-[3.2rem] font-light block mb-5 leading-none" style={{ color: "hsl(36,18%,96%)" }}>{market.code}</span>

                {/* Name */}
                <h3 className="font-['Cormorant_Garamond',serif] font-light text-xl md:text-2xl tracking-[0.02em] mb-1.5" style={{ color: "hsl(36,18%,94%)" }}>{t[`markets.${market.key}.name`]}</h3>

                {/* City */}
                <p className="font-['DM_Sans',sans-serif] text-[0.65rem] tracking-[0.18em] uppercase mb-5" style={{ color: "hsl(218,80%,60%)" }}>{market.city}</p>

                {/* Divider */}
                <div className="w-full h-px mb-5" style={{ background: "hsl(218,30%,20%)" }} />

                {/* Description */}
                <p className="font-['DM_Sans',sans-serif] font-light text-[0.82rem] leading-[1.85]" style={{ color: "hsl(218,15%,68%)" }}>{t[`markets.${market.key}.desc`]}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarketsSection;
