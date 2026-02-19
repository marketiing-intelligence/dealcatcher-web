import { Navbar } from "@/components/shared/Navbar";
import { HeroSection } from "@/components/sections/no-website/HeroSection";
import { ProblemSection } from "@/components/sections/no-website/ProblemSection";
import { SolutionSection } from "@/components/sections/no-website/SolutionSection";
import { PricingSection } from "@/components/sections/no-website/PricingSection";
import { GoogleAdsSection } from "@/components/sections/no-website/GoogleAdsSection";
import { ProcessSection } from "@/components/sections/no-website/ProcessSection";
import { FAQSection } from "@/components/sections/no-website/FAQSection";
import { CTASection } from "@/components/sections/no-website/CTASection";
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
    en: "Professional Websites for Norwegian Craftsmen | DealCatcher",
    no: "Profesjonelle Nettsider for Norske Handverkere | DealCatcher",
    pl: "Profesjonalne Strony Internetowe dla Twojej Firmy | DealCatcher",
  };
  const descriptions: Record<Locale, string> = {
    en: "Get found online by clients searching for carpenters, plumbers, and electricians. AI-ready, WCAG compliant websites starting at $1,000.",
    no: "Bli funnet pa nett av kunder som soker etter snekkere, rorleggere og elektrikere. AI-klare, WCAG-kompatible nettsider fra 10 000 kr.",
    pl: "Zostań znaleziony w internecie przez klientów szukających Twoich usług. Profesjonalne strony gotowe na AI od 4 000 zł.",
  };

  return {
    title: titles[lang],
    description: descriptions[lang],
    alternates: getAlternates(lang, "/no-website"),
  };
}

export default async function NoWebsitePage({
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
        <HeroSection dict={dict.noWebsite.hero} />
        <ProblemSection dict={dict.noWebsite.problem} />
        <SolutionSection dict={dict.noWebsite.solution} />
        <PricingSection dict={dict.noWebsite.pricing} />
        <GoogleAdsSection dict={dict.noWebsite.googleAds} />
        <ProcessSection dict={dict.noWebsite.process} />
        <FAQSection dict={dict.noWebsite.faq} />
        <CTASection lang={lang} dict={dict.noWebsite.cta} />
      </main>
      <Footer lang={lang} dict={dict.footer} />
    </>
  );
}
