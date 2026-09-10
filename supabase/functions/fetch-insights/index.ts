const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const SOURCES = [
  { query: 'Bridgewater Associates research insights global markets economy', tag: 'Bridgewater Research', cleanSuffix: ' | Bridgewater Associates' },
  { query: 'The Economist latest finance economy markets analysis', tag: 'The Economist', cleanSuffix: ' | The Economist' },
  { query: 'Neue Zürcher Zeitung NZZ finance economy markets', tag: 'NZZ', cleanSuffix: ' | NZZ' },
  { query: 'Gulf News finance economy markets Middle East', tag: 'Gulf News', cleanSuffix: ' | Gulf News' },
  { query: 'Valor Econômico finanças economia mercados Brasil crédito', tag: 'Valor Econômico', cleanSuffix: ' | Valor Econômico' },
];

async function translateText(text: string, targetLang: string, apiKey: string): Promise<string> {
  if (!text || text.length < 3) return text;

  const langName = targetLang === 'pt' ? 'Portuguese (Brazil)' : 'English';

  try {
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash-lite',
        messages: [
          { role: 'system', content: `You are a translator. Translate the following text to ${langName}. Return ONLY the translated text, nothing else. If the text is already in ${langName}, return it as-is.` },
          { role: 'user', content: text },
        ],
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      console.error('Translation API error:', response.status);
      return text;
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content?.trim() || text;
  } catch (err) {
    console.error('Translation failed:', err);
    return text;
  }
}

function hostnameOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return 'external source';
  }
}

function realPublishedDate(r: any, lang: string): string | null {
  const raw = r.publishedDate || r.date || r.metadata?.publishedDate || r.metadata?.date;
  if (!raw) return null;
  const parsed = new Date(raw);
  if (isNaN(parsed.getTime())) return null;
  return lang === 'pt'
    ? parsed.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })
    : parsed.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const firecrawlKey = Deno.env.get('FIRECRAWL_API_KEY');
    const lovableKey = Deno.env.get('LOVABLE_API_KEY');
    if (!firecrawlKey || !lovableKey) {
      return new Response(
        JSON.stringify({ success: false, error: 'FIRECRAWL_API_KEY or LOVABLE_API_KEY not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    let sourceIndex = 0;
    let lang = 'pt';
    try {
      const body = await req.json();
      if (typeof body?.sourceIndex === 'number') {
        sourceIndex = body.sourceIndex % SOURCES.length;
      }
      if (body?.lang === 'en') lang = 'en';
    } catch { /* noop */ }

    const source = SOURCES[sourceIndex];
    console.log(`Fetching from source ${sourceIndex}: ${source.tag}, lang: ${lang}`);

    const response = await fetch('https://connector-gateway.lovable.dev/firecrawl/v1/search', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${lovableKey}`,
        'X-Connection-Api-Key': `${firecrawlKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: source.query,
        limit: 5,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Firecrawl error:', data);
      return new Response(
        JSON.stringify({ success: false, error: data.error || `${response.status}` }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const results = data.data || [];
    const filtered = results
      .filter((r: any) => {
        const t = r.title || '';
        return t.length > 10 &&
          !t.toLowerCase().includes('cookie') &&
          !t.toLowerCase().includes('privacy') &&
          !t.toLowerCase().includes('disclaimer') &&
          !t.toLowerCase().includes('internet explorer');
      })
      .slice(0, 2);

    const needsTranslation = !!lovableKey;

    const articles = [];

    for (let i = 0; i < filtered.length; i++) {
      const r = filtered[i];
      let title = (r.title || '').replace(source.cleanSuffix, '').replace(' - ' + source.tag, '').substring(0, 120);
      let excerpt = (r.description || '').substring(0, 250) || (lang === 'pt' ? 'Cobertura de mercado.' : 'Market coverage.');

      if (needsTranslation && lovableKey) {
        const combined = `TITLE: ${title}\nEXCERPT: ${excerpt}`;
        const translated = await translateText(combined, lang, lovableKey);

        const titleMatch = translated.match(/TITLE:\s*(.+?)(?:\nEXCERPT:|$)/s);
        const excerptMatch = translated.match(/EXCERPT:\s*(.+)/s);
        if (titleMatch) title = titleMatch[1].trim();
        if (excerptMatch) excerpt = excerptMatch[1].trim();
      }

      const text = (title + ' ' + excerpt).toLowerCase();
      let tag = lang === 'pt' ? 'Mercado Global' : 'Global Markets';
      if (text.includes('economy') || text.includes('macro') || text.includes('econom')) tag = 'Macro';
      if (text.includes('credit') || text.includes('debt') || text.includes('crédito')) tag = lang === 'pt' ? 'Crédito' : 'Credit';
      if (text.includes('regulat')) tag = lang === 'pt' ? 'Regulatório' : 'Regulatory';

      // Source and date reflect the actual article returned — never assumed or fabricated.
      const realSource = hostnameOf(r.url || '');
      const realDate = realPublishedDate(r, lang);

      articles.push({
        tag,
        title,
        excerpt,
        date: realDate,
        url: r.url || '#',
        source: realSource,
        featured: false,
      });
    }

    console.log(`Got ${articles.length} articles from source ${sourceIndex}`);

    return new Response(
      JSON.stringify({ success: true, articles, sourceIndex, totalSources: SOURCES.length }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ success: false, error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
