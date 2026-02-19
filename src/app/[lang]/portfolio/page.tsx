import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/sections/home/Footer";
import { PortfolioHero } from "@/components/sections/portfolio/PortfolioHero";
import { PortfolioGrid } from "@/components/sections/portfolio/PortfolioGrid";
import { getDictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";
import { getAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;

  const titles: Record<Locale, string> = {
    en: "Template Gallery — Premium Website Templates | DealCatcher",
    no: "Malgalleri — Premium Nettsidemal | DealCatcher",
    pl: "Galeria Szablonów — Profesjonalne Szablony Stron | DealCatcher",
  };
  const descriptions: Record<Locale, string> = {
    en: "Explore our collection of premium website templates for Norwegian businesses. AI-ready, WCAG compliant, built to convert.",
    no: "Utforsk vare samling av premium nettsidemal for norske bedrifter. AI-klare, WCAG-kompatible, bygget for a konvertere.",
    pl: "Odkryj naszą kolekcję profesjonalnych szablonów stron internetowych. Gotowe na AI, zoptymalizowane pod konwersję.",
  };

  return {
    title: titles[lang],
    description: descriptions[lang],
    alternates: getAlternates(lang, "/portfolio"),
  };
}

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <>
      <Navbar lang={lang} dict={dict} />
      <main className="pt-16 md:pt-20">
        <PortfolioHero dict={dict.portfolioPage.hero} />
        <PortfolioGrid lang={lang} dict={dict.portfolioPage.grid} />
      </main>
      <Footer lang={lang} dict={dict.footer} />
    </>
  );
}
