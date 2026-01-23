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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;

  return {
    title:
      lang === "no"
        ? "Profesjonelle Nettsider for Norske Handverkere | DealCatcher"
        : "Professional Websites for Norwegian Craftsmen | DealCatcher",
    description:
      lang === "no"
        ? "Bli funnet pa nett av kunder som soker etter snekkere, rorleggere og elektrikere. AI-klare, WCAG-kompatible nettsider fra 10 000 kr."
        : "Get found online by clients searching for carpenters, plumbers, and electricians. AI-ready, WCAG compliant websites starting at $1,000.",
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
