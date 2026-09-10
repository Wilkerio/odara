import { useReveal } from "@/hooks/useReveal";
import { motion } from "framer-motion";
import assetCommercial from "@/assets/generated_images/asset-commercial.png";
import assetEquipment from "@/assets/generated_images/asset-equipment.png";
import assetInfrastructure from "@/assets/generated_images/asset-infrastructure.png";
import assetAgricultural from "@/assets/generated_images/asset-agricultural.png";
import assetFinancial from "@/assets/generated_images/asset-financial.png";
import assetTrade from "@/assets/generated_images/asset-trade.png";
import assetIp from "@/assets/generated_images/asset-ip.png";
import assetContracts from "@/assets/generated_images/asset-contracts.png";
import assetFutureflow from "@/assets/generated_images/asset-futureflow.png";

interface GuaranteesProps {
  t: Record<string, string>;
}

const assets = [
  { img: assetCommercial, titleKey: "guarantees.commercial", descKey: "guarantees.commercial.desc" },
  { img: assetEquipment, titleKey: "guarantees.equipment", descKey: "guarantees.equipment.desc" },
  { img: assetInfrastructure, titleKey: "guarantees.infrastructure", descKey: "guarantees.infrastructure.desc" },
  { img: assetAgricultural, titleKey: "guarantees.agricultural", descKey: "guarantees.agricultural.desc" },
  { img: assetFinancial, titleKey: "guarantees.financial", descKey: "guarantees.financial.desc" },
  { img: assetTrade, titleKey: "guarantees.trade", descKey: "guarantees.trade.desc" },
  { img: assetIp, titleKey: "guarantees.ip", descKey: "guarantees.ip.desc" },
  { img: assetContracts, titleKey: "guarantees.contracts", descKey: "guarantees.contracts.desc" },
  { img: assetFutureflow, titleKey: "guarantees.futureflow", descKey: "guarantees.futureflow.desc" },
];

const GuaranteesSection = ({ t }: GuaranteesProps) => {
  const ref = useReveal();

  return (
    <section id="guarantees" className="py-16 md:py-[140px] border-t" style={{ borderColor: "rgba(13,13,13,0.1)" }}>
      <div className="max-w-[1280px] mx-auto px-5 md:px-16" ref={ref}>
        <p className="reveal text-[0.65rem] tracking-[0.35em] uppercase flex items-center gap-4 mb-4 md:mb-6 font-semibold" style={{ color: "hsl(218,100%,22%)" }}>
          <span className="w-8 h-px flex-shrink-0" style={{ background: "hsl(218,100%,22%)" }} />
          {t["guarantees.label"]}
        </p>
        <h2 className="reveal reveal-delay-1 font-['Cormorant_Garamond',serif] font-light leading-[1.1] tracking-[-0.01em] mb-4 md:mb-6" style={{ fontSize: "clamp(2rem, 4vw, 4rem)" }} dangerouslySetInnerHTML={{ __html: t["guarantees.title"] }} />
        <p className="reveal reveal-delay-2 text-sm md:text-[0.95rem] leading-[1.8] max-w-[640px] font-light mb-10 md:mb-16" style={{ color: "hsl(36,3%,42%)" }}>
          {t["guarantees.subtitle"]}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
          {assets.map((a, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group relative overflow-hidden cursor-default"
              style={{ border: "1px solid rgba(0,0,0,0.06)" }}
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <img src={a.img} alt={t[a.titleKey]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-[hsl(232,25%,56%)] mix-blend-color transition-opacity duration-700 group-hover:opacity-0" />
                <div className="absolute inset-0 flex items-end p-4 md:p-5">
                  <h3 className="font-['Cormorant_Garamond',serif] font-light text-base md:text-lg tracking-[0.02em] text-white drop-shadow-lg">{t[a.titleKey]}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GuaranteesSection;
