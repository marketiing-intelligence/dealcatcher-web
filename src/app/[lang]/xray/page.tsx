import { Navbar } from "@/components/shared/Navbar";
import { HeroSection } from "@/components/sections/xray/HeroSection";
import { ProblemSection } from "@/components/sections/xray/ProblemSection";
import { SolutionSection } from "@/components/sections/xray/SolutionSection";
import { ProcessSection } from "@/components/sections/xray/ProcessSection";
import { ExamplesSection } from "@/components/sections/xray/ExamplesSection";
import { FAQSection } from "@/components/sections/xray/FAQSection";
import { CTASection } from "@/components/sections/xray/CTASection";
import { Footer } from "@/components/sections/home/Footer";
import { getDictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";
import { getAlternates } from "@/lib/seo";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;

  const titles: Record<Locale, string> = {
    en: "X-Ray — Business Diagnosis | DaVinci",
    pl: "X-Ray — Diagnoza Biznesu | Davinci Agency",
  };
  const descriptions: Record<Locale, string> = {
    en: "Comprehensive business diagnosis. We analyze your entire business and give you an action plan based on data, not opinions. From PLN 3,000.",
    pl: "Prześwietlamy cały Twój biznes i dajemy Ci plan działania oparty o dane, nie opinie. 98 modeli analitycznych. Od 3 000 PLN.",
  };

  return {
    title: titles[lang],
    description: descriptions[lang],
    alternates: getAlternates(lang, "/xray"),
  };
}

export default async function XRayPage({
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
        <HeroSection dict={dict.xray.hero} />
        <ProblemSection dict={dict.xray.problem} />
        <SolutionSection dict={dict.xray.solution} />
        <ProcessSection dict={dict.xray.process} />
        <ExamplesSection lang={lang} dict={dict.xray.examples} />
        <FAQSection dict={dict.xray.faq} />
        <CTASection lang={lang} dict={dict.xray.cta} />
      </main>
      <Footer lang={lang} dict={dict.footer} />
    </>
  );
}
