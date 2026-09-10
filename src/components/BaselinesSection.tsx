import { useReveal } from "@/hooks/useReveal";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import baselinesPeopleAsset from "@/assets/baselines-people-woman-full.png.asset.json";
import baselinesSustainability from "@/assets/baselines-sustainability.jpg";

const baselinesPeople = baselinesPeopleAsset.url;

interface BaselinesProps {
  t: Record<string, string>;
}

const BaselinesSection = ({ t }: BaselinesProps) => {
  const ref = useReveal();

  return (
    <section id="baselines" className="py-[120px] md:py-[160px] relative overflow-hidden" style={{ background: "hsl(36,18%,96%)" }}>
      {/* Subtle decorative element */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full opacity-[0.03]" style={{ background: "radial-gradient(circle, hsl(218,100%,30%) 0%, transparent 70%)", transform: "translate(30%, -30%)" }} />

      <div className="max-w-[1280px] mx-auto px-6 md:px-16 relative z-10" ref={ref}>
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-20 gap-6">
          <div>
            <p className="reveal text-[0.65rem] tracking-[0.35em] uppercase flex items-center gap-4 mb-5 md:mb-7 font-semibold" style={{ color: "hsl(218,100%,22%)" }}>
              <span className="w-10 h-px flex-shrink-0" style={{ background: "hsl(218,100%,22%)" }} />
              {t["baselines.label"]}
            </p>
            <h2 className="reveal reveal-delay-1 font-['Cormorant_Garamond',serif] font-light leading-[1.08] tracking-[-0.02em]" style={{ fontSize: "clamp(2.2rem, 4.5vw, 4rem)" }} dangerouslySetInnerHTML={{ __html: t["baselines.title"] }} />
          </div>
          <p className="reveal reveal-delay-2 font-['DM_Sans',sans-serif] font-light text-[0.88rem] leading-[1.85] max-w-[420px]" style={{ color: "hsl(36,3%,45%)" }}>{t["baselines.sub"]}</p>
        </div>

        {/* Two pillar cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* People */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7 }}
            onClick={() => document.getElementById("people")?.scrollIntoView({ behavior: "smooth" })}
            className="group relative overflow-hidden rounded-md cursor-pointer"
            style={{ background: "hsl(0,0%,100%)", border: "1px solid rgba(0,0,0,0.06)" }}
          >
            {/* Image */}
            <div className="relative h-[300px] md:h-[380px] overflow-hidden" style={{ background: "hsl(0,0%,0%)" }}>
              <img src={baselinesPeople} alt={t["baselines.people.title"]} className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-[1.2s]" loading="lazy" width={1024} height={1536} />
              <div className="absolute inset-0 bg-[hsl(232,25%,56%)] mix-blend-color transition-opacity duration-700 group-hover:opacity-0" />
              <div className="absolute bottom-5 left-6 z-10">
                <span className="font-['Cormorant_Garamond',serif] text-2xl md:text-3xl font-light text-white drop-shadow-lg">{t["baselines.people.title"]}</span>
              </div>
            </div>
            {/* Content */}
            <div className="p-7 md:p-9">
              <div className="w-10 h-px mb-5" style={{ background: "hsl(218,100%,22%)" }} />
              <p className="font-['DM_Sans',sans-serif] font-light text-[0.85rem] leading-[1.9] mb-4" style={{ color: "hsl(36,3%,40%)" }}>{t["baselines.people.desc"]}</p>
              <div className="flex items-center gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                <ArrowDown className="w-3.5 h-3.5 animate-bounce" style={{ color: "hsl(218,100%,35%)" }} />
                <span className="font-['DM_Sans',sans-serif] text-[0.65rem] tracking-[0.15em] uppercase" style={{ color: "hsl(218,100%,35%)" }}>Explore</span>
              </div>
            </div>
            {/* Bottom accent */}
            <div className="absolute bottom-0 left-0 right-0 h-[3px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" style={{ background: "linear-gradient(90deg, hsl(232,25%,56%), hsl(232,25%,66%))" }} />
          </motion.div>

          {/* Sustainability */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, delay: 0.12 }}
            onClick={() => document.getElementById("sustainability")?.scrollIntoView({ behavior: "smooth" })}
            className="group relative overflow-hidden rounded-md cursor-pointer"
            style={{ background: "hsl(0,0%,100%)", border: "1px solid rgba(0,0,0,0.06)" }}
          >
            {/* Image */}
            <div className="relative h-[300px] md:h-[380px] overflow-hidden">
              <img src={baselinesSustainability} alt={t["baselines.environment.title"]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.2s]" />
              <div className="absolute inset-0 bg-[hsl(232,25%,56%)] mix-blend-color transition-opacity duration-700 group-hover:opacity-0" />
              <div className="absolute bottom-5 left-6 z-10">
                <span className="font-['Cormorant_Garamond',serif] text-2xl md:text-3xl font-light text-white drop-shadow-lg">{t["baselines.environment.title"]}</span>
              </div>
            </div>
            {/* Content */}
            <div className="p-7 md:p-9">
              <div className="w-10 h-px mb-5" style={{ background: "hsl(218,100%,22%)" }} />
              <p className="font-['DM_Sans',sans-serif] font-light text-[0.85rem] leading-[1.9] mb-4" style={{ color: "hsl(36,3%,40%)" }}>{t["baselines.environment.desc"]}</p>
              <div className="flex items-center gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                <ArrowDown className="w-3.5 h-3.5 animate-bounce" style={{ color: "hsl(218,100%,35%)" }} />
                <span className="font-['DM_Sans',sans-serif] text-[0.65rem] tracking-[0.15em] uppercase" style={{ color: "hsl(218,100%,35%)" }}>Explore</span>
              </div>
            </div>
            {/* Bottom accent */}
            <div className="absolute bottom-0 left-0 right-0 h-[3px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" style={{ background: "linear-gradient(90deg, hsl(232,25%,56%), hsl(232,25%,66%))" }} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BaselinesSection;
