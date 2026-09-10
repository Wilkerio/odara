import { useReveal } from "@/hooks/useReveal";
import { motion } from "framer-motion";
import servicesHero from "@/assets/generated_images/services-hero.png";

interface ServicesProps {
  t: Record<string, string>;
}

const serviceKeys = [
  { num: "01", titleKey: "services.1.title", descKey: "services.1.desc", tagKeys: ["services.1.tag1", "services.1.tag2", "services.1.tag3"] },
  { num: "02", titleKey: "services.2.title", descKey: "services.2.desc", tagKeys: ["services.2.tag1", "services.2.tag2", "services.2.tag3"] },
  { num: "03", titleKey: "services.3.title", descKey: "services.3.desc", tagKeys: ["services.3.tag1", "services.3.tag2", "services.3.tag3"] },
  { num: "04", titleKey: "services.4.title", descKey: "services.4.desc", tagKeys: ["services.4.tag1", "services.4.tag2"] },
  { num: "05", titleKey: "services.5.title", descKey: "services.5.desc", tagKeys: ["services.5.tag1", "services.5.tag2", "services.5.tag3"] },
  { num: "06", titleKey: "services.6.title", descKey: "services.6.desc", tagKeys: ["services.6.tag1", "services.6.tag2"] },
];

const ServicesSection = ({ t }: ServicesProps) => {
  const ref = useReveal();

  return (
    <section id="services" className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, hsl(218,100%,6%) 0%, hsl(218,80%,10%) 100%)", color: "hsl(36,18%,96%)" }}>
      <div className="flex flex-col lg:flex-row" ref={ref}>
        {/* Left: vertical image flush */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1 }}
          className="relative lg:w-[38%] xl:w-[35%] flex-shrink-0 group/img"
        >
          <div className="relative h-[500px] lg:h-full overflow-hidden">
            <img
              src={servicesHero}
              alt="Securitização agrícola"
              className="w-full h-full object-cover object-center group-hover/img:scale-105 transition-transform duration-[1.6s]"
              style={{ objectPosition: "center 30%" }}
            />
            <div className="absolute inset-0 bg-[hsl(232,25%,56%)] mix-blend-color transition-opacity duration-700 group-hover/img:opacity-0" />
            {/* Hard edge — no gradient fade */}
          </div>
        </motion.div>

        {/* Right: header + card grid */}
        <div className="lg:w-[62%] xl:w-[65%] py-16 md:py-20 lg:py-24 px-6 md:px-10 lg:px-14">
          {/* Header */}
          <div className="mb-10 md:mb-14">
            <p className="reveal text-[0.65rem] tracking-[0.35em] uppercase flex items-center gap-4 mb-4 md:mb-6 font-semibold" style={{ color: "hsl(218,100%,30%)" }}>
              <span className="w-10 h-px flex-shrink-0" style={{ background: "hsl(218,100%,30%)" }} />
              {t["services.label"]}
            </p>
            <h2 className="reveal reveal-delay-1 font-['Cormorant_Garamond',serif] font-light leading-[1.08] tracking-[-0.02em] mb-4" style={{ fontSize: "clamp(2rem, 3.5vw, 3.2rem)" }} dangerouslySetInnerHTML={{ __html: t["services.title"] }} />
            <p className="reveal reveal-delay-2 text-[0.82rem] leading-[1.85] max-w-[400px] font-light" style={{ color: "hsl(218,20%,60%)" }}>
              {t["services.intro"]}
            </p>
          </div>

          {/* Cards in grid boxes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {serviceKeys.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                className="p-6 md:p-7 rounded-md group relative overflow-hidden flex flex-col justify-between"
                style={{ background: "hsl(218,40%,13%)", border: "1px solid hsl(218,30%,22%)", minHeight: "230px" }}
              >
                {/* Hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-md" style={{ background: "radial-gradient(ellipse at 50% 0%, hsla(232,25%,56%,0.12) 0%, transparent 70%)" }} />
                {/* Bottom accent */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" style={{ background: "linear-gradient(90deg, hsl(232,25%,66%), hsl(232,25%,46%))" }} />

                <div className="relative z-10">
                  <span className="font-['Cormorant_Garamond',serif] text-[0.75rem] block mb-4" style={{ color: "hsl(218,70%,60%)", letterSpacing: "0.12em" }}>{s.num}</span>
                  <h3 className="font-['Cormorant_Garamond',serif] text-[1.15rem] md:text-[1.3rem] font-light mb-2.5 leading-[1.2]" style={{ color: "hsl(36,20%,97%)" }}>{t[s.titleKey]}</h3>
                  <p className="text-[0.76rem] leading-[1.8] font-light" style={{ color: "hsl(218,15%,72%)" }}>{t[s.descKey]}</p>
                </div>

                <div className="relative z-10 mt-4 flex flex-wrap gap-1.5">
                  {s.tagKeys.map((tagKey) => (
                    <span
                      key={tagKey}
                      className="text-[0.55rem] tracking-[0.18em] uppercase px-2.5 py-1 rounded-sm transition-all duration-300 group-hover:border-[hsl(232,25%,66%)]"
                      style={{ color: "hsl(218,70%,65%)", border: "1px solid hsl(218,40%,30%)" }}
                    >
                      {t[tagKey]}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
