import { useReveal } from "@/hooks/useReveal";
import teamLuciano from "@/assets/team-luciano.webp";
import teamBarbara from "@/assets/team-barbara.webp";
import teamEvilasio from "@/assets/team-evilasio.webp";
import linkedinLogo from "@/assets/linkedin-logo.png.asset.json";

interface TeamProps {
  t: Record<string, string>;
}

const team = [
  { 
    name: "Luciano Bravo", 
    role: "team.role.1", 
    img: teamLuciano,
    linkedin: "https://www.linkedin.com/in/lucianobravo-lumnis/",
    experience: "25+ years"
  },
  {
    name: "José-Carlos Barbará",
    role: "team.role.2",
    img: teamBarbara,
    linkedin: "https://www.linkedin.com/in/josécarlosbarbará-ab1798/?locale=pt",
    experience: "20+ years"
  },
  {
    name: "Evilásio Júnior",
    role: "team.role.3",
    img: teamEvilasio,
    linkedin: "https://www.linkedin.com/in/evilasio-j-529851245",
    experience: "15+ years"
  },
];

const TeamSection = ({ t }: TeamProps) => {
  const ref = useReveal();

  return (
    <section id="team" className="py-[120px] md:py-[160px]" style={{ background: "hsl(36,18%,96%)" }}>
      <div className="max-w-[1280px] mx-auto px-6 md:px-16" ref={ref}>
        <p className="reveal text-[0.65rem] tracking-[0.35em] uppercase flex items-center gap-4 mb-6 font-semibold" style={{ color: "hsl(218,100%,22%)" }}>
          <span className="w-8 h-px flex-shrink-0" style={{ background: "hsl(218,100%,22%)" }} />
          {t["team.label"]}
        </p>
        <h2 className="reveal reveal-delay-1 font-['Cormorant_Garamond',serif] font-light leading-[1.1] tracking-[-0.01em] mb-4" style={{ fontSize: "clamp(2.2rem, 4vw, 3.8rem)" }} dangerouslySetInnerHTML={{ __html: t["team.title"] }} />
        <p className="reveal reveal-delay-2 font-['DM_Sans',sans-serif] font-light text-sm md:text-base leading-[1.8] max-w-[600px] mb-16" style={{ color: "hsl(36,3%,52%)" }}>{t["team.sub"]}</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
          {team.map((member, i) => (
            <div key={i} className="reveal group" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="relative overflow-hidden mb-4 aspect-[3/4]">
                <img src={member.img} alt={member.name} className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-[hsl(232,25%,56%)] mix-blend-color transition-opacity duration-700 group-hover:opacity-0" />
              </div>
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-['Cormorant_Garamond',serif] font-light text-lg md:text-xl tracking-[0.02em]" style={{ color: "hsl(0,0%,8%)" }}>{member.name}</h3>
                <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="transition-transform duration-300 hover:scale-110">
                  <img
                    src={linkedinLogo.url}
                    alt="LinkedIn"
                    className="w-4 h-4 rounded-sm"
                    style={{ filter: "hue-rotate(22deg) saturate(0.28) brightness(1.4)" }}
                  />
                </a>
              </div>
              <p className="font-['DM_Sans',sans-serif] text-[0.7rem] tracking-[0.15em] uppercase mt-1" style={{ color: "hsl(36,3%,52%)" }}>
                {t[member.role].split("—")[0].trim()}
                <br />
                <span className="text-[0.6rem] tracking-[0.12em] opacity-70" style={{ color: "hsl(36,3%,62%)" }}>{member.experience} exp. • Lumnis Capital Partners</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
