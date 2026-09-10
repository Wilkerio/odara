import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import odaraLogo from "@/assets/logo sem fundo.png";

interface NavbarProps {
  lang: string;
  onLangChange: (lang: string) => void;
  t: Record<string, string>;
}

interface NavItem {
  key: string;
  id: string;
  children?: { key: string; id: string; to?: string }[];
}

const navItems: NavItem[] = [
  {
    key: "nav.sobre", id: "about",
    children: [
      { key: "nav.sub.about", id: "about" },
      { key: "nav.sub.process", id: "process" },
      { key: "nav.sub.services", id: "services" },
      { key: "nav.sub.guarantees", id: "guarantees" },
    ],
  },
  { key: "nav.markets", id: "markets" },
  {
    key: "nav.baselines", id: "baselines",
    children: [
      { key: "nav.sub.people", id: "people" },
      { key: "nav.sub.sustainability", id: "sustainability" },
      { key: "footer.ethics", id: "ethics", to: "/integridade-e-etica" },
    ],
  },
  { key: "nav.insights", id: "insights" },
];

const Navbar = ({ lang, onLangChange, t }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] flex items-center justify-between transition-all duration-400 backdrop-blur-[12px] ${
          scrolled
            ? "py-4 px-6 md:px-16 border-b"
            : "py-5 px-6 md:py-7 md:px-16 border-b border-transparent"
        }`}
        style={{ background: scrolled ? "rgba(247,245,241,0.95)" : "rgba(247,245,241,0.85)", borderColor: scrolled ? "rgba(13,13,13,0.1)" : "transparent" }}
      >
        <a href="#" className="no-underline flex items-center gap-2 md:gap-3">
          <img src={odaraLogo} alt="Odara" className="h-10 md:h-11 w-auto object-contain" />
          <span className="font-['Cormorant_Garamond',serif] font-light text-lg md:text-xl tracking-[0.2em] uppercase text-foreground">
            Odara
          </span>
        </a>

        <div className="hidden md:flex items-center gap-10">
          <ul className="flex gap-8 list-none">
            {navItems.slice(0, 2).map((item) => (
              <li key={item.id} className="relative group/nav">
                <button
                  onClick={() => scrollTo(item.id)}
                  className="font-['DM_Sans',sans-serif] font-light text-[0.78rem] tracking-[0.18em] uppercase text-foreground opacity-70 hover:opacity-100 transition-opacity bg-transparent border-none relative cursor-pointer flex items-center gap-1"
                >
                  {t[item.key]}
                  {item.children && (
                    <ChevronDown className="w-3 h-3 opacity-50 transition-transform duration-300 group-hover/nav:rotate-180" />
                  )}
                  <span className="absolute bottom-[-4px] left-0 w-0 h-px bg-primary group-hover/nav:w-full transition-all duration-400" />
                </button>
                {item.children && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 invisible group-hover/nav:opacity-100 group-hover/nav:visible transition-all duration-300">
                    <div
                      className="min-w-[200px] py-2 rounded-md shadow-lg border"
                      style={{
                        background: "rgba(247,245,241,0.98)",
                        borderColor: "rgba(13,13,13,0.08)",
                        backdropFilter: "blur(12px)",
                      }}
                    >
                      {item.children.map((child) => (
                        child.to ? (
                          <Link
                            key={child.id}
                            to={child.to}
                            className="block w-full text-left px-5 py-2.5 font-['DM_Sans',sans-serif] font-light text-[0.72rem] tracking-[0.15em] uppercase text-foreground opacity-60 hover:opacity-100 hover:bg-foreground/5 transition-all no-underline"
                          >
                            {t[child.key] || child.key}
                          </Link>
                        ) : (
                          <button
                            key={child.id}
                            onClick={() => scrollTo(child.id)}
                            className="w-full text-left px-5 py-2.5 font-['DM_Sans',sans-serif] font-light text-[0.72rem] tracking-[0.15em] uppercase text-foreground opacity-60 hover:opacity-100 hover:bg-foreground/5 transition-all bg-transparent border-none cursor-pointer"
                          >
                            {t[child.key] || child.key}
                          </button>
                        )
                      ))}
                    </div>
                  </div>
                )}
              </li>
            ))}
            {navItems.slice(2).map((item) => (
              <li key={item.id} className="relative group/nav">
                <button
                  onClick={() => scrollTo(item.id)}
                  className="font-['DM_Sans',sans-serif] font-light text-[0.78rem] tracking-[0.18em] uppercase text-foreground opacity-70 hover:opacity-100 transition-opacity bg-transparent border-none relative cursor-pointer flex items-center gap-1"
                >
                  {t[item.key]}
                  {item.children && (
                    <ChevronDown className="w-3 h-3 opacity-50 transition-transform duration-300 group-hover/nav:rotate-180" />
                  )}
                  <span className="absolute bottom-[-4px] left-0 w-0 h-px bg-primary group-hover/nav:w-full transition-all duration-400" />
                </button>
                {item.children && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 invisible group-hover/nav:opacity-100 group-hover/nav:visible transition-all duration-300">
                    <div
                      className="min-w-[200px] py-2 rounded-md shadow-lg border"
                      style={{
                        background: "rgba(247,245,241,0.98)",
                        borderColor: "rgba(13,13,13,0.08)",
                        backdropFilter: "blur(12px)",
                      }}
                    >
                      {item.children.map((child) => (
                        child.to ? (
                          <Link
                            key={child.id}
                            to={child.to}
                            className="block w-full text-left px-5 py-2.5 font-['DM_Sans',sans-serif] font-light text-[0.72rem] tracking-[0.15em] uppercase text-foreground opacity-60 hover:opacity-100 hover:bg-foreground/5 transition-all no-underline"
                          >
                            {t[child.key] || child.key}
                          </Link>
                        ) : (
                          <button
                            key={child.id}
                            onClick={() => scrollTo(child.id)}
                            className="w-full text-left px-5 py-2.5 font-['DM_Sans',sans-serif] font-light text-[0.72rem] tracking-[0.15em] uppercase text-foreground opacity-60 hover:opacity-100 hover:bg-foreground/5 transition-all bg-transparent border-none cursor-pointer"
                          >
                            {t[child.key] || child.key}
                          </button>
                        )
                      ))}
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>

          <button
            onClick={() => scrollTo("contact")}
            className="font-['DM_Sans',sans-serif] font-normal text-[0.78rem] tracking-[0.18em] uppercase px-7 py-2.5 transition-colors cursor-pointer text-background hover:opacity-90"
            style={{ background: "hsl(232,25%,56%)" }}
          >
            {t["nav.contact"]}
          </button>

          <div className="flex items-center gap-1 ml-4">
            {["en", "pt", "fr", "es"].map((l, i) => (
              <button
                key={l}
                onClick={() => onLangChange(l)}
                className={`font-['DM_Sans',sans-serif] text-[0.65rem] font-normal tracking-[0.18em] uppercase bg-transparent border-none px-1.5 py-1 transition-opacity cursor-pointer ${
                  lang === l ? "opacity-100 text-primary" : "opacity-35 text-foreground hover:opacity-80"
                } ${i < 3 ? "relative after:content-['|'] after:absolute after:right-[-3px] after:text-foreground after:opacity-20" : ""}`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 bg-transparent border-none cursor-pointer gap-1.5 relative z-[110]"
          aria-label="Menu"
        >
          <motion.span animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }} className="block w-6 h-px bg-foreground origin-center" transition={{ duration: 0.3 }} />
          <motion.span animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }} className="block w-6 h-px bg-foreground" transition={{ duration: 0.2 }} />
          <motion.span animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }} className="block w-6 h-px bg-foreground origin-center" transition={{ duration: 0.3 }} />
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[99] flex flex-col items-center justify-center gap-8"
            style={{ background: "hsl(36,18%,96%)" }}
          >
            {navItems.slice(0, 2).map((item, i) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, delay: i * 0.08 }}
                onClick={() => scrollTo(item.id)}
                className="font-['Cormorant_Garamond',serif] font-light text-3xl tracking-[0.1em] uppercase bg-transparent border-none text-foreground cursor-pointer hover:text-primary transition-colors"
              >
                {t[item.key]}
              </motion.button>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, delay: 2 * 0.08 }}
            >
              <Link
                to="/integridade-e-etica"
                onClick={() => setMenuOpen(false)}
                className="font-['Cormorant_Garamond',serif] font-light text-3xl tracking-[0.1em] uppercase text-foreground cursor-pointer hover:text-primary transition-colors no-underline"
              >
                {t["footer.ethics"]}
              </Link>
            </motion.div>

            {navItems.slice(2).map((item, i) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, delay: (i + 3) * 0.08 }}
                onClick={() => scrollTo(item.id)}
                className="font-['Cormorant_Garamond',serif] font-light text-3xl tracking-[0.1em] uppercase bg-transparent border-none text-foreground cursor-pointer hover:text-primary transition-colors"
              >
                {t[item.key]}
              </motion.button>
            ))}

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, delay: 0.35 }}
              onClick={() => scrollTo("contact")}
              className="mt-4 font-['DM_Sans',sans-serif] font-normal text-[0.85rem] tracking-[0.2em] uppercase px-10 py-4 cursor-pointer text-background hover:opacity-90 transition-opacity"
              style={{ background: "hsl(232,25%,56%)" }}
            >
              {t["nav.contact"]}
            </motion.button>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="flex items-center gap-4 mt-6"
            >
              {["en", "pt", "fr", "es"].map((l) => (
                <button
                  key={l}
                  onClick={() => { onLangChange(l); }}
                  className={`font-['DM_Sans',sans-serif] text-sm tracking-[0.2em] uppercase bg-transparent border-none cursor-pointer transition-opacity ${
                    lang === l ? "opacity-100 text-primary font-medium" : "opacity-40 text-foreground"
                  }`}
                >
                  {l}
                </button>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
