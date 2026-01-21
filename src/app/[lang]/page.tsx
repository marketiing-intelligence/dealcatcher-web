import dynamic from "next/dynamic";
import { Navbar } from "@/components/shared/Navbar";
import { HeroSection } from "@/components/sections/home/HeroSection";
import { Footer } from "@/components/sections/home/Footer";
import { getDictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";

// Lazy load sections below the fold for better performance
const WhatWeDoSection = dynamic(
  () => import("@/components/sections/home/WhatWeDoSection").then((mod) => mod.WhatWeDoSection),
  { ssr: true }
);
const WhoWeHelpSection = dynamic(
  () => import("@/components/sections/home/WhoWeHelpSection").then((mod) => mod.WhoWeHelpSection),
  { ssr: true }
);
const PortfolioPreviewSection = dynamic(
  () => import("@/components/sections/home/PortfolioPreviewSection").then((mod) => mod.PortfolioPreviewSection),
  { ssr: true }
);
const WhyUsSection = dynamic(
  () => import("@/components/sections/home/WhyUsSection").then((mod) => mod.WhyUsSection),
  { ssr: true }
);
const GuaranteeSection = dynamic(
  () => import("@/components/sections/home/GuaranteeSection").then((mod) => mod.GuaranteeSection),
  { ssr: true }
);
const ContactSection = dynamic(
  () => import("@/components/sections/home/ContactSection").then((mod) => mod.ContactSection),
  { ssr: true }
);
const ROICalculator = dynamic(
  () => import("@/components/sections/home/ROICalculator").then((mod) => mod.ROICalculator),
  { ssr: true }
);
const PriceComparisonSection = dynamic(
  () => import("@/components/sections/home/PriceComparisonSection").then((mod) => mod.PriceComparisonSection),
  { ssr: true }
);

export default async function Home({
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
        <HeroSection lang={lang} dict={dict.hero} />
        <WhatWeDoSection dict={dict.whatWeDo} />
        <PriceComparisonSection dict={dict.priceComparison} />
        <GuaranteeSection lang={lang} dict={dict.guarantee} />
        <WhoWeHelpSection lang={lang} dict={dict.whoWeHelp} />
        <ROICalculator lang={lang} dict={dict.roiCalculator} />
        <PortfolioPreviewSection lang={lang} dict={dict.portfolio} />
        <WhyUsSection dict={dict.whyUs} />
        <ContactSection lang={lang} dict={dict.contactPage} />
      </main>
      <Footer lang={lang} dict={dict.footer} />
    </>
  );
}
