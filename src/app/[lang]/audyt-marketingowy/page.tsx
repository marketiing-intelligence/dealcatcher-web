import { Navbar } from "@/components/shared/Navbar";
import { HeroSection } from "@/components/sections/audyt-marketingowy/HeroSection";
import { ProblemSection } from "@/components/sections/audyt-marketingowy/ProblemSection";
import { SolutionSection } from "@/components/sections/audyt-marketingowy/SolutionSection";
import { PricingSection } from "@/components/sections/audyt-marketingowy/PricingSection";
import { ExamplesSection } from "@/components/sections/audyt-marketingowy/ExamplesSection";
import { ProcessSection } from "@/components/sections/audyt-marketingowy/ProcessSection";
import { FAQSection } from "@/components/sections/audyt-marketingowy/FAQSection";
import { CTASection } from "@/components/sections/audyt-marketingowy/CTASection";
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
    en: "Marketing Audit | DealCatcher",
    no: "Markedsføringsaudit | DealCatcher",
    pl: "Audyt Marketingowy | DealCatcher",
  };
  const descriptions: Record<Locale, string> = {
    en: "Comprehensive marketing audit to identify opportunities and optimize your marketing strategy.",
    no: "Omfattende markedsføringsaudit for å identifisere muligheter og optimalisere din markedsføringsstrategi.",
    pl: "Kompleksowy audyt marketingowy do identyfikacji możliwości i optymalizacji strategii marketingowej.",
  };

  return {
    title: titles[lang],
    description: descriptions[lang],
    alternates: getAlternates(lang, "/audyt-marketingowy"),
  };
}

export default async function AudytMarketingowyPage({
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
        <HeroSection dict={dict.audytMarketingowy.hero} />
        <ProblemSection dict={dict.audytMarketingowy.problem} />
        <SolutionSection dict={dict.audytMarketingowy.solution} />
        <PricingSection dict={dict.audytMarketingowy.pricing} />
        <ExamplesSection lang={lang} dict={dict.audytMarketingowy.examples} />
        <ProcessSection dict={dict.audytMarketingowy.process} />
        <FAQSection dict={dict.audytMarketingowy.faq} />
        <CTASection lang={lang} dict={dict.audytMarketingowy.cta} />
      </main>
      <Footer lang={lang} dict={dict.footer} />
    </>
  );
}
