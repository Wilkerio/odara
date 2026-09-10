import { motion } from "framer-motion";
import abathAsset from "@/assets/client-abath.png.asset.json";
import oriolAsset from "@/assets/client-oriol.png.asset.json";

// Esta seção é temporária: some automaticamente após 15 dias (a partir de 22/08/2026).
const EXPIRES_AT = new Date("2026-09-06T23:59:59Z");

const copy: Record<string, { title: string; subtitle: string; abath: string; oriol: string }> = {
  pt: {
    title: "Nossos <em>Clientes</em>",
    subtitle: "Operações estruturadas de project finance com investidores internacionais.",
    abath:
      "Nosso project finance assegura à Barbosa&Abath a captação de €100 milhões via investimentos em debt bonds estruturados junto a investidores europeus. Recursos serão usados para expandir produção, modernizar logística, adotar agricultura de precisão e práticas sustentáveis. A operação acelera inovação, produtividade e geração de valor, evidenciando confiança internacional no agro brasileiro.",
    oriol:
      "A Oriol Agrícola, buscando se tornar referência nos segmentos de soja e pecuária de corte, conclui Project Finance de 75 milhões de euros, por meio da colocação de debt bonds estruturados perante investidores internacionais. Os aportes viabilizarão a ampliação das áreas produtivas, a renovação do parque de máquinas, a implantação de tecnologias de monitoramento agrícola e pecuário e a construção de um complexo industrial para o processamento completo da produção bovina – abrangendo carne, couro, ossos e demais coprodutos.",
  },
  en: {
    title: "Our <em>Clients</em>",
    subtitle: "Structured project finance transactions with international investors.",
    abath:
      "Our project finance secures for Barbosa&Abath the raising of €100 million through structured debt bond investments with European investors. The proceeds will be used to expand production, modernise logistics, adopt precision agriculture and sustainable practices. The transaction accelerates innovation, productivity and value creation, evidencing international confidence in Brazilian agribusiness.",
    oriol:
      "Oriol Agrícola, aiming to become a benchmark in the soybean and beef cattle segments, has completed a €75 million Project Finance through the placement of structured debt bonds with international investors. The funds will enable the expansion of productive areas, the renewal of its machinery fleet, the deployment of agricultural and livestock monitoring technologies, and the construction of an industrial complex for the full processing of cattle production – covering meat, leather, bones and other co-products.",
  },
  fr: {
    title: "Nos <em>Clients</em>",
    subtitle: "Opérations de project finance structurées avec des investisseurs internationaux.",
    abath:
      "Notre project finance assure à Barbosa&Abath la levée de 100 millions d'euros via des investissements en obligations structurées auprès d'investisseurs européens. Les fonds serviront à accroître la production, moderniser la logistique et adopter l'agriculture de précision ainsi que des pratiques durables. L'opération accélère l'innovation, la productivité et la création de valeur, témoignant de la confiance internationale dans l'agro-industrie brésilienne.",
    oriol:
      "Oriol Agrícola, ambitionnant de devenir une référence dans les segments du soja et de l'élevage bovin, finalise un Project Finance de 75 millions d'euros, par le placement d'obligations structurées auprès d'investisseurs internationaux. Les apports permettront l'extension des surfaces productives, le renouvellement du parc de machines, le déploiement de technologies de suivi agricole et d'élevage, ainsi que la construction d'un complexe industriel pour la transformation complète de la production bovine – viande, cuir, os et autres coproduits.",
  },
  es: {
    title: "Nuestros <em>Clientes</em>",
    subtitle: "Operaciones estructuradas de project finance con inversores internacionales.",
    abath:
      "Nuestro project finance asegura a Barbosa&Abath la captación de 100 millones de euros mediante inversiones en bonos de deuda estructurados con inversores europeos. Los recursos se destinarán a expandir la producción, modernizar la logística y adoptar agricultura de precisión y prácticas sostenibles. La operación acelera la innovación, la productividad y la generación de valor, evidenciando la confianza internacional en el agro brasileño.",
    oriol:
      "Oriol Agrícola, con el objetivo de convertirse en referencia en los segmentos de soja y ganadería de corte, concluye un Project Finance de 75 millones de euros mediante la colocación de bonos de deuda estructurados ante inversores internacionales. Los aportes permitirán ampliar las áreas productivas, renovar el parque de maquinaria, implantar tecnologías de monitoreo agrícola y ganadero y construir un complejo industrial para el procesamiento completo de la producción bovina – carne, cuero, huesos y demás coproductos.",
  },
};

interface ClientsSectionProps {
  lang: string;
}

const ClientsSection = ({ lang }: ClientsSectionProps) => {
  if (new Date() > EXPIRES_AT) return null;

  const c = copy[lang] || copy.en;

  const clients = [
    { name: "B&A", src: abathAsset.url, text: c.abath, amount: "€100M" },
    { name: "Oriol Agrícola", src: oriolAsset.url, text: c.oriol, amount: "€75M" },
  ];

  return (
    <section
      id="clients"
      className="py-20 md:py-28 border-t"
      style={{ borderColor: "rgba(13,13,13,0.1)", background: "hsl(var(--background))" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="text-center mb-14">
          <h2
            className="font-['Cormorant_Garamond',serif] text-3xl md:text-5xl font-light leading-tight [&_em]:text-[hsl(232,25%,56%)] [&_em]:not-italic"
            dangerouslySetInnerHTML={{ __html: c.title }}
          />
          <p className="mt-5 max-w-2xl mx-auto text-sm md:text-base font-light" style={{ color: "hsl(36,3%,42%)" }}>
            {c.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {clients.map((cl, i) => (
            <motion.article
              key={cl.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group border bg-background/60 overflow-hidden"
              style={{ borderColor: "rgba(13,13,13,0.1)" }}
            >
              <div className="aspect-[16/9] overflow-hidden bg-white flex items-center justify-center p-8 md:p-10">
                <img
                  src={cl.src}
                  alt={`${cl.name} logo`}
                  loading="lazy"
                  className="max-w-[70%] max-h-[80%] object-contain transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="p-7 md:p-9">
                <div className="flex items-baseline justify-between gap-4 mb-4">
                  <h3 className="font-['Cormorant_Garamond',serif] text-2xl md:text-3xl font-light">{cl.name}</h3>
                  <span className="font-['DM_Sans',sans-serif] text-sm tracking-[0.15em] text-[hsl(232,25%,56%)]">
                    {cl.amount}
                  </span>
                </div>
                <p className="text-sm md:text-[0.95rem] font-light leading-relaxed" style={{ color: "hsl(36,3%,42%)" }}>
                  {cl.text}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
