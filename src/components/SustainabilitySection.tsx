import { useReveal } from "@/hooks/useReveal";
import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import sustainMonkey from "@/assets/generated_images/sustain-monkey.png";
import sustainFarmForest from "@/assets/generated_images/sustain-farm-forest.png";
import sustainAgriculture from "@/assets/generated_images/sustain-agriculture.png";

interface SustainabilityProps {
  t: Record<string, string>;
}

const pillars = [
  { num: "01", key: "esg" },
  { num: "02", key: "governance" },
  { num: "03", key: "impact" },
];

const SustainabilitySection = ({ t }: SustainabilityProps) => {
  const ref = useReveal();

  return (
    <section id="sustainability" className="relative overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(218,60%,12%) 0%, hsl(218,80%,8%) 100%)", color: "hsl(36,18%,96%)" }}>
      <div ref={ref}>
        {/* Top: header + main image */}
        <div className="pr-6 md:pr-16 pl-0 pt-[120px] md:pt-[160px]">
          <div className="max-w-[1280px] mx-auto pl-6 md:pl-16 mb-5 md:mb-7">
            <p className="reveal text-[0.65rem] tracking-[0.35em] uppercase flex items-center gap-4 font-semibold" style={{ color: "hsl(218,100%,30%)" }}>
              <span className="w-10 h-px flex-shrink-0" style={{ background: "hsl(218,100%,30%)" }} />
              {t["sustain.label"]}
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-center mb-14 md:mb-20">
            {/* Image mosaic — bleeds to left edge */}
            <div className="lg:w-[60%] grid grid-cols-2 gap-3 lg:-ml-8">
              {[
                { img: sustainFarmForest, alt: "Plantação respeitando a mata", pillar: pillars[0] },
                { img: sustainMonkey, alt: "Biodiversidade", pillar: pillars[1] },
                { img: sustainAgriculture, alt: "Agricultura sustentável", pillar: pillars[2] },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.1 }}
                  className={`relative overflow-hidden ${i === 0 ? "col-span-2" : ""} rounded-r-md group cursor-default`}
                >
                  {/* Image — fades out on hover */}
                  <img src={item.img} alt={item.alt} className="w-full h-[360px] md:h-[480px] object-cover transition-all duration-700 group-hover:opacity-0 group-hover:scale-105" />
                  {/* Blue overlay */}
                  <div className="absolute inset-0 transition-opacity duration-700 group-hover:opacity-0" style={{ background: "hsl(232,25%,56%)", mixBlendMode: "color" }} />

                  {/* Title — always visible */}
                  <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-7 transition-opacity duration-500 group-hover:opacity-0">
                    <span className="font-['Cormorant_Garamond',serif] text-[1rem] font-light mb-1" style={{ color: "hsl(218,100%,70%)" }}>{item.pillar.num}</span>
                    <h3 className="font-['Cormorant_Garamond',serif] font-light text-[1.2rem] md:text-[1.4rem] tracking-[0.02em] text-white drop-shadow-lg">{t[`sustain.${item.pillar.key}.title`]}</h3>
                  </div>

                  {/* Text content — appears on hover */}
                  <div className="absolute inset-0 flex flex-col justify-center items-center p-6 md:p-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: "hsl(232,25%,20%)" }}>
                    <span className="font-['Cormorant_Garamond',serif] text-[1.3rem] md:text-[1.5rem] font-light mb-3" style={{ color: "hsl(218,100%,70%)" }}>{item.pillar.num}</span>
                    <h3 className="font-['Cormorant_Garamond',serif] font-light text-[1.6rem] md:text-[2rem] tracking-[0.02em] text-white mb-5 text-center">{t[`sustain.${item.pillar.key}.title`]}</h3>
                    <p className="font-['DM_Sans',sans-serif] font-light text-[0.95rem] md:text-[1.05rem] leading-[1.85] text-center max-w-[500px]" style={{ color: "hsl(218,15%,72%)" }}>{t[`sustain.${item.pillar.key}.desc`]}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Text — RIGHT */}
            <div className="lg:w-[40%] pl-6 md:pl-0 max-w-[1280px]">
              <h2 className="reveal reveal-delay-1 font-['Cormorant_Garamond',serif] font-light leading-[1.08] tracking-[-0.02em] mb-6" style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)" }} dangerouslySetInnerHTML={{ __html: t["sustain.title"] }} />
              <p className="reveal reveal-delay-2 font-['DM_Sans',sans-serif] font-light text-[0.88rem] leading-[1.9] mb-5" style={{ color: "hsl(218,15%,62%)" }}>{t["sustain.desc1"]}</p>
              <p className="reveal reveal-delay-2 font-['DM_Sans',sans-serif] font-light text-[0.88rem] leading-[1.9] mb-8" style={{ color: "hsl(218,15%,62%)" }}>{t["sustain.desc2"]}</p>
              <button
                onClick={() => document.getElementById("people")?.scrollIntoView({ behavior: "smooth" })}
                className="reveal reveal-delay-2 inline-flex items-center gap-2 font-['DM_Sans',sans-serif] text-[0.72rem] tracking-[0.18em] uppercase bg-transparent border border-[hsl(218,60%,40%)] px-6 py-2.5 rounded-sm cursor-pointer hover:bg-[hsl(218,60%,20%)] transition-colors"
                style={{ color: "hsl(218,100%,30%)" }}
              >
                <ArrowUp className="w-3.5 h-3.5" />
                People
              </button>
            </div>
          </div>
        </div>

        {/* Bottom spacing */}
        <div className="pb-[120px] md:pb-[160px]" />
      </div>
    </section>
  );
};

export default SustainabilitySection;
