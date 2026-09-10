import { useState, useEffect } from "react";
import { i18n } from "@/lib/i18n";
import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import GuaranteesSection from "@/components/GuaranteesSection";

import MarketsSection from "@/components/MarketsSection";
import BaselinesSection from "@/components/BaselinesSection";
import PeopleSection from "@/components/PeopleSection";
import SustainabilitySection from "@/components/SustainabilitySection";
import ProcessSection from "@/components/ProcessSection";
import PartnersSection from "@/components/PartnersSection";
import ClientsSection from "@/components/ClientsSection";
import PartnersAboutSection from "@/components/PartnersAboutSection";
import InsightsSection from "@/components/InsightsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const SUPPORTED_LANGS = ["pt", "en", "es", "fr"];
const LANG_STORAGE_KEY = "odara_lang";

function detectInitialLang(): string {
  const saved = localStorage.getItem(LANG_STORAGE_KEY);
  if (saved && SUPPORTED_LANGS.includes(saved)) return saved;

  for (const browserLang of navigator.languages || [navigator.language]) {
    const primary = browserLang.split("-")[0].toLowerCase();
    if (SUPPORTED_LANGS.includes(primary)) return primary;
  }
  return "en";
}

const Index = () => {
  const [lang, setLangState] = useState(detectInitialLang);

  const setLang = (next: string) => {
    localStorage.setItem(LANG_STORAGE_KEY, next);
    setLangState(next);
  };

  const t = i18n[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <div className="md:cursor-none">
      <Preloader />
      <CustomCursor />
      <Navbar lang={lang} onLangChange={setLang} t={t} />
      <HeroSection t={t} />
      <AboutSection t={t} lang={lang} />
      <ServicesSection t={t} />
      <GuaranteesSection t={t} />
      <PartnersAboutSection t={t} />
      <MarketsSection t={t} />
      <BaselinesSection t={t} />
      <PeopleSection t={t} />
      <SustainabilitySection t={t} />
      <ProcessSection t={t} />
      <PartnersSection t={t} />
      <ClientsSection lang={lang} />
      <InsightsSection t={t} lang={lang} />
      <ContactSection t={t} lang={lang} />

      <Footer t={t} />
    </div>
  );
};

export default Index;
