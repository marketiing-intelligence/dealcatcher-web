import { Navbar } from "@/components/shared/Navbar";
import { HeroSection } from "@/components/sections/konfiguratory/HeroSection";
import { ProblemSection } from "@/components/sections/konfiguratory/ProblemSection";
import { SolutionSection } from "@/components/sections/konfiguratory/SolutionSection";
import { PricingSection } from "@/components/sections/konfiguratory/PricingSection";
import { ExamplesSection } from "@/components/sections/konfiguratory/ExamplesSection";
import { ProcessSection } from "@/components/sections/konfiguratory/ProcessSection";
import { FAQSection } from "@/components/sections/konfiguratory/FAQSection";
import { CTASection } from "@/components/sections/konfiguratory/CTASection";
import { Footer } from "@/components/sections/home/Footer";
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
    en: "Product Configurators & Pricing Calculators | DealCatcher",
    pl: "Konfiguratory Produktów i Kalkulatory Cen | DealCatcher",
  };
  const descriptions: Record<Locale, string> = {
    en: "Turn questions into orders with interactive product configurators. Real-time pricing, custom specifications, and automated quotes.",
    pl: "Zamień pytania w zamówienia dzięki interaktywnym konfiguratorem produktów. Ceny w czasie rzeczywistym, specyfikacje na wymiar i automatyczne wyceny.",
  };

  return {
    title: titles[lang],
    description: descriptions[lang],
    alternates: getAlternates(lang, "/konfiguratory"),
  };
}

export default async function KonfiguratoryPage({
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
        <HeroSection dict={dict.konfiguratory.hero} />
        <ProblemSection dict={dict.konfiguratory.problem} />
        <SolutionSection dict={dict.konfiguratory.solution} />
        <PricingSection dict={dict.konfiguratory.pricing} />
        <ExamplesSection lang={lang} dict={dict.konfiguratory.examples} />
        <ProcessSection dict={dict.konfiguratory.process} />
        <FAQSection dict={dict.konfiguratory.faq} />
        <CTASection lang={lang} dict={dict.konfiguratory.cta} />
      </main>
      <Footer lang={lang} dict={dict.footer} />
    </>
  );
}
