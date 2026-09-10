import cushmanWakefield from "@/Logo dos parceiros/cushman_wakefield_logo.svg";

const partners = [
  { name: "Cushman & Wakefield", src: cushmanWakefield, url: "https://www.cushmanwakefield.com/" },
];

interface PartnersAboutSectionProps {
  t: Record<string, string>;
}

const PartnersAboutSection = ({ t }: PartnersAboutSectionProps) => {
  return (
    <section
      id="partners-about"
      className="py-16 md:py-24 border-t border-b overflow-hidden"
      style={{ borderColor: "rgba(13,13,13,0.1)", background: "hsl(var(--background))" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 mb-10 md:mb-14 text-center">
        <h2
          className="font-['Cormorant_Garamond',serif] text-3xl md:text-5xl font-light leading-tight [&_em]:text-[hsl(232,25%,56%)]"
          dangerouslySetInnerHTML={{ __html: t["partnersAbout.title"] }}
        />
        <p
          className="mt-5 max-w-3xl mx-auto text-sm md:text-base font-light"
          style={{ color: "hsl(36,3%,42%)" }}
        >
          {t["partnersAbout.subtitle"]}
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
        {partners.map((p, i) => (
          <a
            key={i}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group/logo relative flex-shrink-0 w-40 md:w-48 h-12 md:h-14 flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity"
            aria-label={p.name}
          >
            <img
              src={p.src}
              alt={p.name}
              className="w-full h-full object-contain grayscale"
              loading="lazy"
            />
            <div
              className="absolute inset-0 opacity-0 group-hover/logo:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{ mixBlendMode: "color", background: "hsl(232,25%,56%)" }}
            />
          </a>
        ))}
      </div>

      <p
        className="mt-12 md:mt-16 max-w-4xl mx-auto px-6 text-center text-[10px] md:text-[11px] leading-relaxed font-light"
        style={{ color: "hsl(36,3%,52%)" }}
      >
        {t["partnersAbout.disclaimer"]}
      </p>
    </section>
  );
};

export default PartnersAboutSection;
