import { Navbar } from "@/components/shared/Navbar";
import { HeroSection } from "@/components/sections/google-ads/HeroSection";
import { ProblemSection } from "@/components/sections/google-ads/ProblemSection";
import { SolutionSection } from "@/components/sections/google-ads/SolutionSection";
import { PricingSection } from "@/components/sections/google-ads/PricingSection";
import { BenefitsSection } from "@/components/sections/google-ads/BenefitsSection";
import { ProcessSection } from "@/components/sections/google-ads/ProcessSection";
import { FAQSection } from "@/components/sections/google-ads/FAQSection";
import { CTASection } from "@/components/sections/google-ads/CTASection";
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
    en: "Google Ads Management for Local Businesses | DealCatcher",
    no: "Google Ads-administrasjon for Lokale Bedrifter | DealCatcher",
    pl: "Prowadzenie Google Ads dla Lokalnych Firm | DealCatcher",
  };
  const descriptions: Record<Locale, string> = {
    en: "Professional Google Ads campaign management. Appear when clients search for your services. Local targeting, transparent ROI tracking, from 800 PLN/month.",
    no: "Profesjonell Google Ads-kampanjehåndtering. Vis deg når klienter søker etter tjenestene dine. Lokal målretting, transparent ROI-sporing, fra 800 PLN/måned.",
    pl: "Profesjonalne prowadzenie kampanii Google Ads. Pojaw się kiedy klienci szukają Twoich usług. Targetowanie lokalne, przejrzyste śledzenie ROI, od 800 zł/mies.",
  };

  return {
    title: titles[lang],
    description: descriptions[lang],
    alternates: getAlternates(lang, "/google-ads"),
  };
}

export default async function GoogleAdsPage({
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
        <HeroSection dict={dict.googleAdsService.hero} />
        <ProblemSection dict={dict.googleAdsService.problem} />
        <SolutionSection dict={dict.googleAdsService.solution} />
        <PricingSection dict={dict.googleAdsService.pricing} />
        <BenefitsSection dict={dict.googleAdsService.benefits} />
        <ProcessSection dict={dict.googleAdsService.process} />
        <FAQSection dict={dict.googleAdsService.faq} />
        <CTASection lang={lang} dict={dict.googleAdsService.cta} />
      </main>
      <Footer lang={lang} dict={dict.footer} />
    </>
  );
}
