import { useReveal } from "@/hooks/useReveal";
import { motion } from "framer-motion";
import HeroChart from "@/components/HeroChart";

interface AboutProps {
  t: Record<string, string>;
  lang: string;
}

const metrics = [
  { num: "$4.5B+", desc: "assets under structuring" },
  { num: "12", desc: "jurisdictions covered" },
  { num: "100+", desc: "transactions closed" },
  { num: "AAA", desc: "average emission rating" },
];

const AboutSection = ({ t, lang }: AboutProps) => {
  const ref = useReveal();

  return (
    <section id="about" className="py-20 md:py-[160px] border-t" style={{ borderColor: "rgba(13,13,13,0.1)" }}>
      <div className="max-w-[1280px] mx-auto px-5 md:px-16" ref={ref}>
        <div className="flex flex-col gap-16 md:gap-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
            <div className="max-w-[560px]">
              <p className="reveal text-[0.65rem] tracking-[0.35em] uppercase flex items-center gap-4 mb-5 md:mb-8 font-semibold" style={{ color: "hsl(218,100%,22%)" }}>
                <span className="w-10 h-px flex-shrink-0" style={{ background: "hsl(218,100%,22%)" }} />
                {t["about.label"]}
              </p>
              <h2 className="reveal reveal-delay-1 font-['Cormorant_Garamond',serif] font-light leading-[1.06] tracking-[-0.01em] text-foreground" style={{ fontSize: "clamp(2.25rem, 4.5vw, 4.5rem)" }} dangerouslySetInnerHTML={{ __html: t["about.title"] }} />
              <div className="reveal reveal-delay-2 mt-8 md:mt-12 text-[1rem] md:text-[1.125rem] leading-[1.75] md:leading-[1.8] font-normal text-foreground/85" dangerouslySetInnerHTML={{ __html: t["about.text"] }} />
            </div>
            <div
              className="group/chart w-full h-[340px] md:h-[420px] p-4 md:p-5 rounded-sm overflow-hidden relative"
              style={{ background: "hsl(232,25%,15%)", border: "1px solid rgba(70,112,178,0.25)" }}
            >
              <HeroChart />
              <div
                className="pointer-events-none absolute inset-0 z-10 opacity-0 group-hover/chart:opacity-100 transition-opacity duration-500"
                style={{
                  background: "linear-gradient(rgba(70,112,178,0.22) 1px, transparent 1px), linear-gradient(90deg, rgba(70,112,178,0.22) 1px, transparent 1px)",
                  backgroundSize: "28px 28px",
                  mixBlendMode: "screen",
                }}
              />
              <div
                className="pointer-events-none absolute inset-0 z-10 opacity-0 group-hover/chart:opacity-100 transition-opacity duration-500"
                style={{
                  background: "radial-gradient(circle at 50% 50%, transparent 0%, rgba(70,112,178,0.18) 100%)",
                }}
              />
            </div>
          </div>

          <div className="h-px w-full" style={{ background: "rgba(13,13,13,0.08)" }} />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-0.5">
            {metrics.map((m, i) => {
              const displayDesc = lang === "pt"
                ? (i === 0 ? "em ativos estruturados" : i === 1 ? "jurisdições cobertas" : i === 2 ? "transações fechadas" : "rating médio das emissões")
                : lang === "es"
                ? (i === 0 ? "en activos estructurados" : i === 1 ? "jurisdicciones cubiertas" : i === 2 ? "transacciones cerradas" : "calificación promedio")
                : lang === "fr"
                ? (i === 0 ? "en actifs structurés" : i === 1 ? "juridictions couvertes" : i === 2 ? "transactions clôturées" : "notation moyenne des émissions")
                : m.desc;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  whileHover={{ scale: 1.03 }}
                  className="p-6 md:p-10 px-5 md:px-8 transition-all group cursor-default"
                  style={{ background: "hsl(36,12%,90%)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "hsl(232,25%,30%)";
                    e.currentTarget.querySelector<HTMLElement>(".metric-num")!.style.color = "hsl(232,25%,56%)";
                    e.currentTarget.querySelector<HTMLElement>(".metric-desc")!.style.color = "rgba(255,255,255,0.65)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "hsl(36,12%,90%)";
                    e.currentTarget.querySelector<HTMLElement>(".metric-num")!.style.color = "hsl(0,0%,5%)";
                    e.currentTarget.querySelector<HTMLElement>(".metric-desc")!.style.color = "hsl(36,3%,45%)";
                  }}
                >
                  <span className="metric-num font-['Cormorant_Garamond',serif] text-[2.2rem] md:text-[3rem] font-light block leading-none mb-2 md:mb-3 transition-colors" style={{ color: "hsl(0,0%,5%)" }}>{m.num}</span>
                  <span className="metric-desc text-[0.62rem] md:text-[0.72rem] tracking-[0.15em] uppercase font-normal transition-colors" style={{ color: "hsl(36,3%,45%)" }}>{displayDesc}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
