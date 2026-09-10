import { useReveal } from "@/hooks/useReveal";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";

interface InsightsProps {
  t: Record<string, string>;
  lang?: string;
}

interface Article {
  tag: string;
  title: string;
  excerpt: string;
  date: string | null;
  url: string;
  source?: string;
  featured: boolean;
}

// Illustrative placeholder shown only until the live feed loads (or if it fails).
// Intentionally has no fabricated outlet/date — these are not real published articles.
const fallbackInsights: Article[] = [
  { tag: "Crédito Estruturado", title: "O ciclo de alta dos CLOs europeus e a janela para emissores emergentes", excerpt: "O mercado europeu de CLOs registrou volume recorde no primeiro semestre, criando uma oportunidade singular para originadores de mercados emergentes.", date: null, url: "#", featured: true },
  { tag: "Regulatório", title: "ESMA 2025: Novos requisitos para emissões de ABS transfronteiriças", excerpt: "As alterações ao Regulamento de Securitização Europeu impactam diretamente emissores fora da UE.", date: null, url: "#", featured: false },
  { tag: "Mercado Global", title: "DIFC e ADGM: qual jurisdição para SPEs de crédito islâmico?", excerpt: "Comparativo estrutural entre os dois centros financeiros do Golfo para securitizações Sukuk.", date: null, url: "#", featured: false },
  { tag: "Mercado Global", title: "Mercados do Golfo ampliam apetite por crédito estruturado", excerpt: "Investidores institucionais do Oriente Médio buscam diversificação em ativos securitizados.", date: null, url: "#", featured: false },
  { tag: "Crédito Estruturado", title: "FIDCs batem recorde de captação no Brasil", excerpt: "O mercado brasileiro de fundos de direitos creditórios atinge marcos históricos de volume.", date: null, url: "#", featured: false },
];

const CACHE_KEY = 'odara_insights_cache';
const CACHE_DURATION = 2 * 60 * 60 * 1000;

const InsightsSection = ({ t, lang = 'pt' }: InsightsProps) => {
  const ref = useReveal();
  const [articles, setArticles] = useState<Article[]>(fallbackInsights);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [showAll, setShowAll] = useState(false);
  const fetchedRef = useRef(false);

  const fetchAllSources = useCallback(async () => {
    setLoading(true);
    try {
      // Fetch from all 5 sources in parallel
      const promises = [0, 1, 2, 3, 4].map(sourceIndex =>
        supabase.functions.invoke('fetch-insights', {
          body: { sourceIndex, lang },
        })
      );

      const results = await Promise.allSettled(promises);
      const allArticles: Article[] = [];

      results.forEach((result) => {
        if (result.status === 'fulfilled' && result.value.data?.success && result.value.data.articles?.length > 0) {
          allArticles.push(...result.value.data.articles.map((a: Article) => ({ ...a, featured: false })));
        }
      });

      if (allArticles.length > 0) {
        // Ensure one article per source, then fill remaining slots
        const bySource = new Map<string, Article[]>();
        allArticles.forEach(a => {
          if (!bySource.has(a.source!)) bySource.set(a.source!, []);
          bySource.get(a.source!)!.push(a);
        });

        const picked: Article[] = [];
        bySource.forEach((arts) => {
          if (arts.length > 0) picked.push(arts[0]);
        });

        // Fill remaining with second articles from sources
        bySource.forEach((arts) => {
          if (arts.length > 1) picked.push(arts[1]);
        });

        const final = picked.slice(0, 10);
        if (final.length > 0) final[0].featured = true;

        setArticles(final);
        setLastUpdated(new Date());
        localStorage.setItem(CACHE_KEY, JSON.stringify({ articles: final, timestamp: Date.now() }));
      }
    } catch (err) {
      console.error('Failed to fetch insights:', err);
    } finally {
      setLoading(false);
    }
  }, [lang]);

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const { articles: cachedArticles, timestamp } = JSON.parse(cached);
        if (cachedArticles?.length > 0) {
          setArticles(cachedArticles);
          setLastUpdated(new Date(timestamp));
          if (Date.now() - timestamp < CACHE_DURATION) return;
        }
      }
    } catch {}

    fetchAllSources();
  }, [fetchAllSources]);

  const displayArticles = showAll ? articles : articles.slice(0, 3);
  const readMore = lang === 'pt' ? 'Ler análise completa' : lang === 'es' ? 'Leer análisis completo' : lang === 'fr' ? 'Lire l\'analyse complète' : 'Read full analysis';
  const readShort = lang === 'pt' ? 'Ler →' : lang === 'es' ? 'Leer →' : lang === 'fr' ? 'Lire →' : 'Read →';

  return (
    <section id="insights" className="py-16 md:py-[140px]" style={{ background: "hsl(36,12%,90%)" }}>
      <div className="max-w-[1280px] mx-auto px-5 md:px-16" ref={ref}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-16 gap-4 md:gap-6">
          <div>
            <p className="reveal text-[0.65rem] tracking-[0.35em] uppercase flex items-center gap-4 mb-4 md:mb-6 text-primary">
              <span className="w-8 h-px flex-shrink-0 bg-primary" />
              {t["insights.label"]}
            </p>
            <h2 className="reveal reveal-delay-1 font-['Cormorant_Garamond',serif] font-light leading-[1.1] tracking-[-0.01em]" style={{ fontSize: "clamp(2rem, 4vw, 4rem)" }} dangerouslySetInnerHTML={{ __html: t["insights.title"] }} />
          </div>
          <div className="flex flex-col items-end gap-2">
            <button
              onClick={() => setShowAll(!showAll)}
              className="reveal text-[0.7rem] tracking-[0.2em] uppercase no-underline flex items-center gap-2.5 opacity-60 hover:opacity-100 hover:gap-4 transition-all bg-transparent border-none cursor-pointer"
            >
              {showAll ? (lang === 'pt' ? 'Ver menos' : lang === 'es' ? 'Ver menos' : lang === 'fr' ? 'Voir moins' : 'Show less') : t["insights.all"]}
              <svg width="16" height="8" viewBox="0 0 16 8" fill="none" className={`transition-transform ${showAll ? 'rotate-90' : ''}`}><path d="M0 4H14M10 1L14 4L10 7" stroke="currentColor" strokeWidth="1" /></svg>
            </button>
            {lastUpdated && (
              <span className="text-[0.55rem] opacity-35 flex items-center gap-1.5">
                {lastUpdated.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
              </span>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr_1fr] gap-0.5 relative">
          {loading && articles === fallbackInsights && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="w-6 h-6 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: "hsl(218,100%,22%)", borderTopColor: "transparent" }} />
            </div>
          )}
          <AnimatePresence mode="popLayout">
            {displayArticles.map((ins, i) => (
              <motion.a
                key={`${ins.source}-${ins.title}-${i}`}
                href={ins.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                whileHover={{ y: -4, transition: { duration: 0.25 } }}
                className="p-7 md:p-12 px-6 md:px-10 relative overflow-hidden transition-colors cursor-pointer hover:bg-white group no-underline"
                style={{ background: "hsl(36,18%,96%)", color: "inherit" }}
                layout
              >
                <div className="absolute top-0 left-0 w-0 group-hover:w-full h-0.5 transition-all duration-500 bg-primary" />
                <span className="text-[0.62rem] tracking-[0.25em] uppercase block mb-4 md:mb-6 text-primary">{ins.tag}</span>
                <h3 className={`font-['Cormorant_Garamond',serif] font-light leading-[1.3] mb-3 md:mb-5 ${i === 0 && !showAll ? "text-xl md:text-[2rem]" : "text-lg md:text-[1.4rem]"}`}>{ins.title}</h3>
                <p className="text-[0.8rem] md:text-[0.83rem] leading-[1.75] font-light mb-5 md:mb-8 text-muted-foreground">{ins.excerpt}</p>
                <div className="flex flex-wrap items-center gap-3 md:gap-4 text-[0.65rem] md:text-[0.7rem] tracking-[0.1em] text-muted-foreground">
                  {ins.date && <span><span className="text-primary mr-2">—</span>{ins.date}</span>}
                  {ins.source && <span><span className="text-primary mr-2">—</span>{ins.source}</span>}
                </div>
                <span className="inline-flex items-center gap-2 text-[0.7rem] tracking-[0.2em] uppercase mt-4 md:mt-6 group-hover:text-primary transition-colors">
                  {i === 0 && !showAll ? readMore : readShort}
                  {i === 0 && !showAll && <svg width="14" height="8" viewBox="0 0 14 8" fill="none"><path d="M0 4H12M8 1L12 4L8 7" stroke="currentColor" strokeWidth="1" /></svg>}
                </span>
              </motion.a>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default InsightsSection;
