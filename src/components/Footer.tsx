import { Link } from "react-router-dom";
import odaraLogo from "@/assets/logo sem fundo.png";

const Footer = ({ t }: { t?: Record<string, string> }) => {
  return (
    <>
      {/* Footer bottom */}
      <footer className="flex flex-col gap-8 md:flex-row md:justify-between md:items-end py-10 px-6 md:px-16 md:pt-[60px] md:pb-10" style={{ background: "#080808", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center rounded-full bg-white/90 p-1.5 opacity-80 hover:opacity-100 transition-opacity">
            <img src={odaraLogo} alt="Odara" className="h-6 md:h-8 w-auto object-contain" />
          </span>
          <span className="font-['Cormorant_Garamond',serif] font-light text-2xl md:text-3xl tracking-[0.15em] uppercase opacity-50 hover:opacity-80 transition-opacity" style={{ color: "hsl(36,18%,96%)" }}>Odara</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
          <span className="text-[0.65rem] md:text-[0.7rem] tracking-[0.1em]" style={{ color: "rgba(247,245,241,0.55)" }}>{t?.["footer.rights"] ?? "© 2025 Odara Capital Partners. All rights reserved."}</span>
          <Link to="/terms" className="text-[0.65rem] md:text-[0.68rem] tracking-[0.18em] uppercase no-underline transition-colors hover:text-primary whitespace-nowrap" style={{ color: "rgba(247,245,241,0.55)" }}>{t?.["footer.terms"] ?? "Terms"}</Link>
          <Link to="/privacy" className="text-[0.65rem] md:text-[0.68rem] tracking-[0.18em] uppercase no-underline transition-colors hover:text-primary whitespace-nowrap" style={{ color: "rgba(247,245,241,0.55)" }}>{t?.["footer.privacy"] ?? "Privacy"}</Link>
          <Link to="/integridade-e-etica" className="text-[0.65rem] md:text-[0.68rem] tracking-[0.18em] uppercase no-underline transition-colors hover:text-primary whitespace-nowrap" style={{ color: "rgba(247,245,241,0.55)" }}>{t?.["footer.ethics"] ?? "Integrity and Ethics"}</Link>
        </div>
      </footer>
    </>
  );
};

export default Footer;
