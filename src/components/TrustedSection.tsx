interface TrustedProps {
  t: Record<string, string>;
}

const logos = [
  "MiFID II", "Basel III", "GDPR", "LGPD",
  "IFRS", "AML / CFT", "ICMA", "ISDA",
];

const TrustedSection = ({ t }: TrustedProps) => {
  return (
    <section
      id="trusted"
      className="py-8 md:py-12 border-t border-b overflow-hidden"
      style={{ borderColor: "rgba(13,13,13,0.1)" }}
    >
      <p
        className="text-center text-[0.58rem] md:text-[0.62rem] tracking-[0.3em] uppercase mb-5 md:mb-8 opacity-60"
        style={{ color: "hsl(36,3%,52%)" }}
      >
        {t["trusted"]}
      </p>
      <div
        className="relative overflow-hidden"
        style={{
          maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        }}
      >
        <div
          className="flex items-center gap-10 md:gap-[72px] w-max"
          style={{ animation: "logoScroll 30s linear infinite" }}
        >
          {[...logos, ...logos].map((name, i) => (
            <div
              key={i}
              className="flex-shrink-0 h-8 flex items-center opacity-45 hover:opacity-100 transition-opacity"
              style={{ color: "hsl(36,3%,52%)" }}
            >
              <span className="font-['Cormorant_Garamond',serif] text-base md:text-lg font-light tracking-[0.15em] uppercase whitespace-nowrap">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedSection;
