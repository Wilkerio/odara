import { useReveal } from "@/hooks/useReveal";
import { motion } from "framer-motion";
import peopleImg from "@/assets/baselines-people-woman-full.png.asset.json";

interface PeopleProps {
  t: Record<string, string>;
}

const values = [
  { key: "diversity", num: "01" },
  { key: "development", num: "02" },
  { key: "culture", num: "03" },
];

const PeopleSection = ({ t }: PeopleProps) => {
  const ref = useReveal();

  return (
    <section id="people" className="relative overflow-hidden" style={{ background: "hsl(36,18%,96%)" }}>
      <div className="flex flex-col lg:flex-row" ref={ref}>
        {/* Left content */}
        <div className="lg:w-[60%] py-20 md:py-[120px] px-6 md:px-16 lg:pr-14 flex flex-col justify-center">
          <p className="reveal text-[0.65rem] tracking-[0.35em] uppercase flex items-center gap-4 mb-5 md:mb-7 font-semibold" style={{ color: "hsl(218,100%,22%)" }}>
            <span className="w-10 h-px flex-shrink-0" style={{ background: "hsl(218,100%,22%)" }} />
            {t["people.label"]}
          </p>
          <h2 className="reveal reveal-delay-1 font-['Cormorant_Garamond',serif] font-light leading-[1.08] tracking-[-0.02em] mb-8" style={{ fontSize: "clamp(2.4rem, 5vw, 4.2rem)" }} dangerouslySetInnerHTML={{ __html: t["people.title"] }} />

          <div className="mb-10 md:mb-14">
            <p className="reveal reveal-delay-2 font-['DM_Sans',sans-serif] font-light text-[0.92rem] md:text-base leading-[1.9] mb-5" style={{ color: "hsl(36,3%,40%)" }}>{t["people.desc1"]}</p>
            <p className="reveal reveal-delay-2 font-['DM_Sans',sans-serif] font-light text-[0.92rem] md:text-base leading-[1.9]" style={{ color: "hsl(36,3%,40%)" }}>{t["people.desc2"]}</p>
          </div>

          {/* Value cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5 items-stretch">
            {values.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="group relative overflow-hidden rounded-md cursor-default"
                style={{ background: "hsl(0,0%,100%)", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 2px 16px rgba(0,0,0,0.04)" }}
              >
                {/* Top accent bar */}
                <div className="h-[3px] w-full" style={{ background: "linear-gradient(90deg, hsl(218,100%,35%), hsl(218,60%,55%))" }} />

                <div className="p-6 md:p-7">
                  {/* Number badge */}
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500"
                    style={{ background: "linear-gradient(135deg, hsl(218,80%,92%), hsl(218,60%,86%))", border: "1px solid hsl(218,60%,80%)" }}
                  >
                    <span className="font-['Cormorant_Garamond',serif] text-sm font-semibold" style={{ color: "hsl(218,80%,30%)" }}>{v.num}</span>
                  </div>

                  <h3 className="font-['Cormorant_Garamond',serif] font-medium text-[1.15rem] md:text-[1.25rem] tracking-[0.01em] mb-3" style={{ color: "hsl(0,0%,8%)" }}>
                    {t[`people.${v.key}.title`]}
                  </h3>
                  <div className="w-8 h-px mb-4" style={{ background: "hsl(218,60%,70%)" }} />
                  <p className="font-['DM_Sans',sans-serif] font-light text-[0.8rem] leading-[1.9]" style={{ color: "hsl(36,3%,42%)" }}>
                    {t[`people.${v.key}.desc`]}
                  </p>
                </div>

                {/* Bottom hover accent */}
                <div className="absolute bottom-0 left-0 right-0 h-[3px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" style={{ background: "linear-gradient(90deg, hsl(232,25%,56%), hsl(232,25%,66%))" }} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right image — flush to edge */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1 }}
          className="lg:w-[40%] relative group/img"
        >
          <div className="relative h-[350px] lg:h-full min-h-[400px] overflow-hidden">
            <img
              src={peopleImg.url}
              alt={t["people.label"]}
              className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-[1.4s]"
            />
            <div className="absolute inset-0 bg-[hsl(232,25%,56%)] mix-blend-color transition-opacity duration-700 group-hover/img:opacity-0" />
            {/* No fade gradient - clean cut */}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PeopleSection;
