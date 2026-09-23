import { motion } from "framer-motion";
import generalPrintersAsset from "@/assets/gpl_2021.png.asset.json";
import thndrAsset from "@/assets/thndr.png.asset.json";
import sabiAsset from "@/assets/sabi.png.asset.json";
import cityLodgeAsset from "@/assets/city_lodge_hotels.png.asset.json";
import geothetaAsset from "@/assets/theta_consulting.png.asset.json";

const negotiations = [
  {
    company: "General Printers 2021",
    country: "Kenya",
    rank: "13th",
    growth: "943%",
    logo: generalPrintersAsset.url,
  },
  {
    company: "thndr",
    country: "Egypt",
    rank: "1st",
    growth: "6,851%",
    logo: thndrAsset.url,
  },
  {
    company: "SABI",
    country: "Nigeria",
    rank: "2nd",
    growth: "2,953%",
    logo: sabiAsset.url,
  },
  {
    company: "City Lodge Hotels",
    country: "South Africa",
    rank: "44th",
    growth: "280.87%",
    logo: cityLodgeAsset.url,
  },
  {
    company: "Geotheta",
    country: "South Africa",
    rank: "24th",
    growth: "465%",
    logo: geothetaAsset.url,
  },
];

const AfricaNegotiationsSection = () => {
  return (
    <section
      id="concluded-negotiations"
      className="border-t py-20 md:py-28"
      style={{ borderColor: "rgba(13,13,13,0.1)", background: "hsl(var(--background))" }}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-12 max-w-3xl md:mb-16">
          <p className="mb-5 flex items-center gap-4 text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-primary">
            <span className="h-px w-10 flex-shrink-0 bg-primary" />
            Africa
          </p>
          <h2 className="font-['Cormorant_Garamond',serif] text-4xl font-light leading-tight md:text-6xl">
            Concluded Negotiations
          </h2>
          <p className="mt-5 text-sm font-light text-muted-foreground md:text-base">
            Fastest growing companies in Africa
          </p>
        </div>

        <div className="grid grid-cols-1 gap-px overflow-hidden border border-border bg-border md:grid-cols-2 lg:grid-cols-5">
          {negotiations.map((item, index) => (
            <motion.article
              key={item.company}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, delay: index * 0.07 }}
              className="group flex min-h-[330px] flex-col bg-background p-6 md:p-7"
            >
              <div className="flex h-24 items-center justify-center border-b border-border pb-6">
                <img
                  src={item.logo}
                  alt={`${item.company} logo`}
                  loading="lazy"
                  className="max-h-14 max-w-full object-contain grayscale transition-all duration-500 group-hover:grayscale-0"
                />
              </div>

              <div className="flex flex-1 flex-col pt-6">
                <span className="mb-3 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-primary">
                  {item.country}
                </span>
                <h3 className="font-['Cormorant_Garamond',serif] text-2xl font-light leading-tight">
                  {item.company}
                </h3>
                <div className="mt-auto pt-8">
                  <p className="text-[0.65rem] uppercase tracking-[0.12em] text-muted-foreground">
                    FT Ranking 2026 · {item.rank}
                  </p>
                  <p className="mt-2 font-['Cormorant_Garamond',serif] text-4xl font-light text-primary">
                    {item.growth}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AfricaNegotiationsSection;