import { Navbar } from "@/components/shared/Navbar";
import { HeroSection } from "@/components/sections/baza-klientow/HeroSection";
import { ProblemSection } from "@/components/sections/baza-klientow/ProblemSection";
import { SolutionSection } from "@/components/sections/baza-klientow/SolutionSection";
import { PricingSection } from "@/components/sections/baza-klientow/PricingSection";
import { ExamplesSection } from "@/components/sections/baza-klientow/ExamplesSection";
import { ProcessSection } from "@/components/sections/baza-klientow/ProcessSection";
import { FAQSection } from "@/components/sections/baza-klientow/FAQSection";
import { CTASection } from "@/components/sections/baza-klientow/CTASection";
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
    en: "B2B Client Database | DealCatcher",
    pl: "Baza Klientów B2B | DealCatcher",
  };
  const descriptions: Record<Locale, string> = {
    en: "Custom B2B client database with qualified leads and contact information for your business.",
    pl: "Dedykowana baza klientów B2B z wykwalifikowanymi leadami i danymi kontaktowymi dla Twojego biznesu.",
  };

  return {
    title: titles[lang],
    description: descriptions[lang],
    alternates: getAlternates(lang, "/baza-klientow"),
  };
}

export default async function BazaKlientowPage({
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
        <HeroSection dict={dict.bazaKlientow.hero} />
        <ProblemSection dict={dict.bazaKlientow.problem} />
        <SolutionSection dict={dict.bazaKlientow.solution} />
        <PricingSection dict={dict.bazaKlientow.pricing} />
        <ExamplesSection lang={lang} dict={dict.bazaKlientow.examples} />
        <ProcessSection dict={dict.bazaKlientow.process} />
        <FAQSection dict={dict.bazaKlientow.faq} />
        <CTASection lang={lang} dict={dict.bazaKlientow.cta} />
      </main>
      <Footer lang={lang} dict={dict.footer} />
    </>
  );
}
