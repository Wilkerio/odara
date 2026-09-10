import { useNavigate } from "react-router-dom";
import { ArrowLeft, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import lumnisLogoAsset from "@/assets/lumnis-logo.png.asset.json";
import { ethicsContent, type Block, type Section } from "@/lib/ethics";

const lumnisLogo = lumnisLogoAsset.url;

const INK = "#1B2E2B";
const GOLD = "#B8892E";
const GOLD_SOFT = "#C79A4B";
const BODY = "#3A3A38";

const SUPPORTED_LANGS = ["pt", "en", "es", "fr"];
const LANG_STORAGE_KEY = "lumnis_lang";

function detectInitialLang(): string {
  const saved = localStorage.getItem(LANG_STORAGE_KEY);
  if (saved && SUPPORTED_LANGS.includes(saved)) return saved;

  for (const browserLang of navigator.languages || [navigator.language]) {
    const primary = browserLang.split("-")[0].toLowerCase();
    if (SUPPORTED_LANGS.includes(primary)) return primary;
  }
  return "en";
}

const Divider = () => (
  <div className="h-px w-16 my-4" style={{ background: GOLD }} />
);

const Blocks = ({ blocks }: { blocks: Block[] }) => (
  <>
    {blocks.map((b, i) => {
      if (b.t === "p")
        return (
          <p key={i} className="text-[0.98rem] md:text-[1.05rem] mb-5" style={{ color: BODY, lineHeight: 1.75 }}>
            {b.v}
          </p>
        );
      if (b.t === "lead")
        return (
          <div key={i} className="my-6 pl-5 py-4 pr-5 rounded-r" style={{ background: "#FAF6EE", borderLeft: `3px solid ${GOLD}` }}>
            <p className="text-[0.95rem] md:text-[1rem] italic" style={{ color: INK, lineHeight: 1.7 }}>
              {b.v}
            </p>
          </div>
        );
      if (b.t === "quote")
        return (
          <blockquote key={i} className="my-6 pl-5 py-4 pr-5 rounded-r" style={{ background: "#F7F3EA", borderLeft: `3px solid ${GOLD_SOFT}` }}>
            <p className="text-[0.98rem] md:text-[1.05rem] italic" style={{ color: INK, lineHeight: 1.75 }}>
              {b.v}
            </p>
          </blockquote>
        );
      if (b.t === "sub")
        return (
          <div key={i} className="mb-4 mt-6">
            <h4 className="font-['Cormorant_Garamond',Georgia,serif] font-bold text-[1.15rem] md:text-[1.3rem] mb-1" style={{ color: INK }}>
              {b.h}
            </h4>
            {b.v && (
              <p className="text-[0.98rem] md:text-[1.05rem]" style={{ color: BODY, lineHeight: 1.75 }}>
                {b.v}
              </p>
            )}
          </div>
        );
      return (
        <ul key={i} className="space-y-3 mb-5 mt-2">
          {b.v.map((item, idx) => (
            <li key={idx} className="relative pl-5 text-[0.98rem] md:text-[1.05rem]" style={{ color: BODY, lineHeight: 1.75 }}>
              <span className="absolute left-0 top-[0.7em] h-1.5 w-1.5 rounded-full" style={{ background: GOLD }} />
              {item}
            </li>
          ))}
        </ul>
      );
    })}
  </>
);

const SectionBlock = ({ s }: { s: Section }) => (
  <section id={s.id} className="scroll-mt-24 mb-14">
    <div className="flex items-baseline gap-3">
      {s.num && (
        <span className="font-['Cormorant_Garamond',Georgia,serif] font-bold text-[1.6rem] md:text-[2rem] leading-none" style={{ color: GOLD }}>
          {s.num}
        </span>
      )}
      <h3 className="font-['Cormorant_Garamond',Georgia,serif] font-bold text-[1.5rem] md:text-[1.9rem] leading-tight" style={{ color: INK }}>
        {s.title}
      </h3>
    </div>
    <Divider />
    <Blocks blocks={s.blocks} />
  </section>
);

const Ethics = () => {
  const navigate = useNavigate();
  const [lang, setLangState] = useState(detectInitialLang);

  const setLang = (next: string) => {
    localStorage.setItem(LANG_STORAGE_KEY, next);
    setLangState(next);
  };

  const c = ethicsContent[lang] ?? ethicsContent.pt;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    document.title = c.ui.htmlTitle;
    document.documentElement.lang = lang;
  }, [lang, c]);

  const all = [...c.partI, ...c.partII];

  return (
    <div className="min-h-screen" style={{ background: "#FDFCF9" }}>
      <div className="max-w-3xl mx-auto px-6 md:px-10 py-14 md:py-20">
        <div className="flex items-center justify-between mb-12">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-[0.7rem] tracking-[0.2em] uppercase transition-opacity hover:opacity-70"
            style={{ color: INK }}
          >
            <ArrowLeft size={16} /> {c.ui.back}
          </button>
          <div className="flex items-center gap-3">
            {SUPPORTED_LANGS.map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className="text-[0.7rem] tracking-[0.2em] uppercase transition-opacity hover:opacity-70"
                style={{ color: l === lang ? GOLD : INK, fontWeight: l === lang ? 700 : 400 }}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        {/* Header / seal */}
        <header className="text-center">
          <img src={lumnisLogo} alt="Lumnis Capital Partners" className="h-16 md:h-20 w-auto mx-auto mb-8 object-contain" />
          <h1 className="font-['Cormorant_Garamond',Georgia,serif] font-bold text-[2.2rem] md:text-[3.2rem] leading-tight" style={{ color: INK }}>
            {c.ui.pageTitle}
          </h1>
          <div className="h-px w-24 mx-auto my-6" style={{ background: GOLD }} />
          <h2 className="font-['Cormorant_Garamond',Georgia,serif] text-[1.25rem] md:text-[1.6rem]" style={{ color: INK }}>
            {c.ui.docTitle}
          </h2>
          <p className="italic mt-2 text-[0.95rem] md:text-[1.05rem]" style={{ color: GOLD }}>
            {c.ui.subtitle}
          </p>
          <p className="mt-5 text-[0.75rem] md:text-[0.8rem] tracking-[0.12em] uppercase" style={{ color: "#8A8A85" }}>
            {c.ui.edition}
          </p>
        </header>

        {/* Sumário */}
        <nav className="mt-14 p-6 md:p-8 rounded" style={{ background: "#FAF6EE", border: "1px solid rgba(184,137,46,0.25)" }}>
          <h2 className="font-['Cormorant_Garamond',Georgia,serif] font-bold text-[1.3rem] md:text-[1.5rem]" style={{ color: INK }}>
            {c.ui.summary}
          </h2>
          <div className="h-px w-14 my-3" style={{ background: GOLD }} />
          <ol className="grid sm:grid-cols-2 gap-x-8 gap-y-2 mt-4">
            {all.map((s) => (
              <li key={s.id} className="text-[0.9rem]" style={{ color: BODY }}>
                <a href={`#${s.id}`} className="no-underline transition-colors hover:opacity-70" style={{ color: INK }}>
                  <span style={{ color: GOLD }} className="font-semibold mr-2">{s.num}.</span>
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* Mensagem da Direção */}
        <section className="mt-16">
          <h3 className="font-['Cormorant_Garamond',Georgia,serif] font-bold text-[1.5rem] md:text-[1.9rem]" style={{ color: INK }}>
            {c.ui.messageTitle}
          </h3>
          <Divider />
          <Blocks blocks={c.message} />
          <p className="text-[0.98rem] md:text-[1.05rem] font-semibold" style={{ color: INK }}>{c.ui.signature}</p>
          <p className="text-[0.9rem]" style={{ color: BODY }}>{c.ui.signaturePlace}</p>
        </section>

        {/* Por que este documento existe */}
        <section className="mt-14">
          <h3 className="font-['Cormorant_Garamond',Georgia,serif] font-bold text-[1.5rem] md:text-[1.9rem]" style={{ color: INK }}>
            {c.ui.whyTitle}
          </h3>
          <Divider />
          <Blocks blocks={c.why} />
        </section>

        {/* PARTE I */}
        <div className="mt-20 mb-10 text-center">
          <div className="h-px w-full mb-6" style={{ background: "rgba(184,137,46,0.3)" }} />
          <h2 className="font-['Cormorant_Garamond',Georgia,serif] font-bold text-[1.5rem] md:text-[2rem] tracking-[0.08em] uppercase" style={{ color: INK }}>
            {c.ui.partI}
          </h2>
        </div>
        {c.partI.map((s) => (
          <SectionBlock key={s.id} s={s} />
        ))}

        {/* PARTE II */}
        <div className="mt-20 mb-10 text-center">
          <div className="h-px w-full mb-6" style={{ background: "rgba(184,137,46,0.3)" }} />
          <h2 className="font-['Cormorant_Garamond',Georgia,serif] font-bold text-[1.5rem] md:text-[2rem] tracking-[0.08em] uppercase" style={{ color: INK }}>
            {c.ui.partII}
          </h2>
        </div>
        {c.partII.map((s) => (
          <SectionBlock key={s.id} s={s} />
        ))}

        {/* Canal de Ética CTA */}
        <div className="mt-16 p-8 md:p-10 rounded text-center" style={{ background: "#FAF6EE", border: `1px solid ${GOLD}` }}>
          <h3 className="font-['Cormorant_Garamond',Georgia,serif] font-bold text-[1.4rem] md:text-[1.7rem]" style={{ color: INK }}>
            {c.ui.ctaTitle}
          </h3>
          <div className="h-px w-14 mx-auto my-4" style={{ background: GOLD }} />
          <p className="text-[0.95rem] mb-6" style={{ color: BODY, lineHeight: 1.7 }}>
            {c.ui.ctaText}
          </p>
          <a
            href="mailto:etica@lumnispartners.com"
            className="inline-flex items-center gap-3 px-7 py-3.5 rounded no-underline text-[0.8rem] tracking-[0.15em] uppercase transition-opacity hover:opacity-85"
            style={{ background: INK, color: "#FDFCF9" }}
          >
            <Mail size={16} style={{ color: GOLD_SOFT }} />
            etica@lumnispartners.com
          </a>
        </div>

        <div className="mt-16 text-center">
          <div className="h-px w-24 mx-auto mb-8" style={{ background: GOLD }} />
          <p className="font-['Cormorant_Garamond',Georgia,serif] italic text-[1.15rem] md:text-[1.4rem]" style={{ color: INK, lineHeight: 1.6 }}>
            {c.ui.closingQuote}
          </p>
          <p className="mt-4 text-[0.85rem] tracking-[0.15em] uppercase" style={{ color: GOLD }}>
            {c.ui.closingTag}
          </p>
        </div>

        <div className="mt-14 pt-8 border-t" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-[0.7rem] tracking-[0.2em] uppercase transition-opacity hover:opacity-70"
            style={{ color: INK }}
          >
            <ArrowLeft size={16} /> {c.ui.back}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Ethics;
