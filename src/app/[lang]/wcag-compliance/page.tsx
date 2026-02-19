import { redirect } from "next/navigation";
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
import { getAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;

  if (lang === "pl") {
    return { title: "DealCatcher" };
  }

  return {
    title:
      lang === "no"
        ? "WCAG Samsvar for Norske Nettsider | DealCatcher"
        : "WCAG Compliance for Norwegian Websites | DealCatcher",
    description:
      lang === "no"
        ? "97% av norske nettsider feiler tilgjengelighetsrevisjoner. Fa en gratis WCAG-revisjon og laer hvordan du blir kompatibel med norsk lov."
        : "97% of Norwegian websites fail accessibility audits. Get a free WCAG audit and learn how to become compliant with Norwegian law.",
    alternates: getAlternates(lang, "/wcag-compliance", ["en", "no"]),
  };
}

export default async function WCAGCompliancePage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;

  // WCAG page doesn't exist for Polish market — redirect to homepage
  if (lang === "pl") {
    redirect(`/pl`);
  }

  // After redirect guard, lang is "en" | "no" — both have wcagPage
  const wcagLang = lang as "en" | "no";
  const dict = await getDictionary(wcagLang) as any;

  return (
    <>
      <Navbar lang={wcagLang} dict={dict} />
      <main className="pt-16 md:pt-20">
        <HeroSection dict={dict.wcagPage.hero} />
        <ProblemSection dict={dict.wcagPage.problem} />
        <SolutionSection dict={dict.wcagPage.solution} />
        <PricingSection dict={dict.wcagPage.pricing} />
        <ProcessSection dict={dict.wcagPage.process} />
        <TrustSection dict={dict.wcagPage.trust} />
        <CTASection lang={wcagLang} dict={dict.wcagPage.cta} />
      </main>
      <Footer lang={wcagLang} dict={dict.footer} />
    </>
  );
}
