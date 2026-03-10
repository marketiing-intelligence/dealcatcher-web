import { Navbar } from "@/components/shared/Navbar";
import { HeroSection } from "@/components/sections/narzedzia-na-miare/HeroSection";
import { ProblemSection } from "@/components/sections/narzedzia-na-miare/ProblemSection";
import { SolutionSection } from "@/components/sections/narzedzia-na-miare/SolutionSection";
import { PricingSection } from "@/components/sections/narzedzia-na-miare/PricingSection";
import { ExamplesSection } from "@/components/sections/narzedzia-na-miare/ExamplesSection";
import { ProcessSection } from "@/components/sections/narzedzia-na-miare/ProcessSection";
import { FAQSection } from "@/components/sections/narzedzia-na-miare/FAQSection";
import { CTASection } from "@/components/sections/narzedzia-na-miare/CTASection";
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
    en: "Custom Tools | DealCatcher",
    pl: "Narzędzia na Miarę | DealCatcher",
  };
  const descriptions: Record<Locale, string> = {
    en: "Custom tools and automation solutions tailored to your business needs.",
    pl: "Dedykowane narzędzia i rozwiązania automatyzacji dopasowane do potrzeb Twojego biznesu.",
  };

  return {
    title: titles[lang],
    description: descriptions[lang],
    alternates: getAlternates(lang, "/narzedzia-na-miare"),
  };
}

export default async function NarzedziaNaMiarePage({
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
        <HeroSection dict={dict.narzedziaNaMiare.hero} />
        <ProblemSection dict={dict.narzedziaNaMiare.problem} />
        <SolutionSection dict={dict.narzedziaNaMiare.solution} />
        <PricingSection dict={dict.narzedziaNaMiare.pricing} />
        <ExamplesSection lang={lang} dict={dict.narzedziaNaMiare.examples} />
        <ProcessSection dict={dict.narzedziaNaMiare.process} />
        <FAQSection dict={dict.narzedziaNaMiare.faq} />
        <CTASection lang={lang} dict={dict.narzedziaNaMiare.cta} />
      </main>
      <Footer lang={lang} dict={dict.footer} />
    </>
  );
}
