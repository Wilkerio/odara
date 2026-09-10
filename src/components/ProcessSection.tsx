import { useReveal } from "@/hooks/useReveal";
import { Search, Scale, BarChart3, Lightbulb, Settings, Target, TrendingUp, ClipboardCheck } from "lucide-react";

interface ProcessProps {
  t: Record<string, string>;
}

const steps = [
  { icon: Search, labelKey: "process.step.1" },
  { icon: Scale, labelKey: "process.step.2" },
  { icon: BarChart3, labelKey: "process.step.3" },
  { icon: Lightbulb, labelKey: "process.step.4" },
  { icon: Settings, labelKey: "process.step.5" },
  { icon: Target, labelKey: "process.step.6" },
  { icon: TrendingUp, labelKey: "process.step.7" },
  { icon: ClipboardCheck, labelKey: "process.step.8" },
];

const lineY = 240;
const spacing = 145;
const startX = 80;
const offsetY = 130; // how far above/below the line

const ProcessSection = ({ t }: ProcessProps) => {
  const ref = useReveal();

  return (
    <section id="process" className="py-16 md:py-[140px] border-t border-border">
      <div className="max-w-[1280px] mx-auto px-5 md:px-16" ref={ref}>
        <div className="mb-10 md:mb-20">
          <p className="reveal text-[0.65rem] tracking-[0.35em] uppercase flex items-center gap-4 mb-4 md:mb-6 text-primary">
            <span className="w-8 h-px flex-shrink-0 bg-primary" />
            {t["process.label"]}
          </p>
          <h2
            className="reveal reveal-delay-1 font-['Cormorant_Garamond',serif] font-light leading-[1.1] tracking-[-0.01em]"
            style={{ fontSize: "clamp(2rem, 4vw, 4rem)" }}
            dangerouslySetInnerHTML={{ __html: t["process.title"] }}
          />
        </div>

        {/* Desktop flow */}
        <div className="reveal reveal-delay-2 hidden md:block">
          <div className="relative" style={{ height: 520 }}>
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 1220 520"
              preserveAspectRatio="xMidYMid meet"
              fill="none"
            >
              {/* Straight horizontal line */}
              <line
                x1={startX - 30}
                y1={lineY}
                x2={startX + spacing * 7 + 30}
                y2={lineY}
                stroke="hsl(var(--primary))"
                strokeWidth="2"
                opacity="0.2"
              />

              {steps.map((_, i) => {
                const cx = startX + i * spacing;
                const isTop = i % 2 === 0;
                const cy = isTop ? lineY - offsetY : lineY + offsetY;

                return (
                  <g key={i}>
                    {/* Vertical connector line */}
                    <line
                      x1={cx}
                      y1={lineY}
                      x2={cx}
                      y2={cy}
                      stroke="hsl(var(--primary))"
                      strokeWidth="1.5"
                      opacity="0.25"
                      strokeDasharray="4 3"
                    />
                    {/* Dot on the main line */}
                    <circle cx={cx} cy={lineY} r="4" fill="hsl(var(--primary))" opacity="0.4" />
                    {/* Circle node */}
                    <circle cx={cx} cy={cy} r={32} fill="hsl(var(--background))" />
                    <circle cx={cx} cy={cy} r={30} fill="white" stroke="hsl(var(--muted))" strokeWidth="1.5" />
                  </g>
                );
              })}

              {/* Icons */}
              {steps.map((step, i) => {
                const cx = startX + i * spacing;
                const isTop = i % 2 === 0;
                const cy = isTop ? lineY - offsetY : lineY + offsetY;
                const Icon = step.icon;
                const iconSize = 24;
                return (
                  <foreignObject key={`icon-${i}`} x={cx - iconSize / 2} y={cy - iconSize / 2} width={iconSize} height={iconSize} className="overflow-visible">
                    <div className="w-full h-full flex items-center justify-center">
                      <Icon size={iconSize} className="text-foreground hover:text-primary transition-colors duration-300" strokeWidth={1.8} />
                    </div>
                  </foreignObject>
                );
              })}
            </svg>

            {/* Labels */}
            {steps.map((step, i) => {
              const cx = startX + i * spacing;
              const isTop = i % 2 === 0;
              const cy = isTop ? lineY - offsetY : lineY + offsetY;
              const leftPct = (cx / 1220) * 100;
              // Place label further from center line
              const labelTop = isTop
                ? ((cy - 32 - 55) / 520) * 100
                : ((cy + 32 + 12) / 520) * 100;

              return (
                <div
                  key={`label-${i}`}
                  className="absolute text-center font-['DM_Sans',sans-serif] text-[0.75rem] leading-snug text-foreground whitespace-pre-line"
                  style={{
                    left: `${leftPct}%`,
                    top: `${labelTop}%`,
                    transform: "translateX(-50%)",
                    width: 120,
                  }}
                >
                  <span className="font-['Cormorant_Garamond',serif] text-[0.65rem] block mb-1" style={{ color: "hsl(218,60%,45%)" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {t[step.labelKey]}
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile: vertical list */}
        <div className="reveal reveal-delay-2 md:hidden space-y-8">
          {steps.map((step, i) => {
            const Icon = step.icon;
            const iconColor = "hsl(0,0%,8%)";
            return (
              <div key={i} className="flex items-center gap-5">
                <div className="relative flex-shrink-0">
                  <div
                    className="w-20 h-20 rounded-full border-2 flex items-center justify-center bg-white"
                    style={{ borderColor: "hsl(var(--muted))" }}
                  >
                    <Icon size={32} color={iconColor} strokeWidth={1.8} />
                  </div>
                  <svg className="absolute inset-0 w-20 h-20" viewBox="0 0 80 80">
                    <path
                      d={`M ${40 + 38 * Math.cos((-130 * Math.PI) / 180)} ${40 + 38 * Math.sin((-130 * Math.PI) / 180)} A 38 38 0 0 1 ${40 + 38 * Math.cos((-50 * Math.PI) / 180)} ${40 + 38 * Math.sin((-50 * Math.PI) / 180)}`}
                      stroke="hsl(var(--primary))"
                      strokeWidth="4"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div className="font-['DM_Sans',sans-serif] text-sm text-foreground">
                  {t[step.labelKey]}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
