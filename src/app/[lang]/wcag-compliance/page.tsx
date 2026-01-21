import { Navbar } from "@/components/shared/Navbar";
import { HeroSection } from "@/components/sections/wcag/HeroSection";
import { ProblemSection } from "@/components/sections/wcag/ProblemSection";
import { SolutionSection } from "@/components/sections/wcag/SolutionSection";
import { PricingSection } from "@/components/sections/wcag/PricingSection";
import { ProcessSection } from "@/components/sections/wcag/ProcessSection";
import { TrustSection } from "@/components/sections/wcag/TrustSection";
import { CTASection } from "@/components/sections/wcag/CTASection";
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
        ? "WCAG Samsvar for Norske Nettsider | DealCatcher"
        : "WCAG Compliance for Norwegian Websites | DealCatcher",
    description:
      lang === "no"
        ? "97% av norske nettsider feiler tilgjengelighetsrevisjoner. Fa en gratis WCAG-revisjon og laer hvordan du blir kompatibel med norsk lov."
        : "97% of Norwegian websites fail accessibility audits. Get a free WCAG audit and learn how to become compliant with Norwegian law.",
  };
}

export default async function WCAGCompliancePage({
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
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <PricingSection />
        <ProcessSection />
        <TrustSection />
        <CTASection lang={lang} />
      </main>
      <Footer lang={lang} dict={dict.footer} />
    </>
  );
}
