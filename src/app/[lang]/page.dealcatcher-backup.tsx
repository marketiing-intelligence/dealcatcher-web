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
const ConfiguratorsSection = dynamic(
  () => import("@/components/sections/home/ConfiguratorsSection").then((mod) => mod.ConfiguratorsSection),
  { ssr: true }
);
const PriceComparisonSection = dynamic(
  () => import("@/components/sections/home/PriceComparisonSection").then((mod) => mod.PriceComparisonSection),
  { ssr: true }
);
const AISearchSection = dynamic(
  () => import("@/components/sections/home/AISearchSection").then((mod) => mod.AISearchSection),
  { ssr: true }
);
const IndustriesSection = dynamic(
  () => import("@/components/sections/home/IndustriesSection").then((mod) => mod.IndustriesSection),
  { ssr: true }
);
const FAQSection = dynamic(
  () => import("@/components/sections/home/FAQSection").then((mod) => mod.FAQSection),
  { ssr: true }
);

export default async function Home({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: dict.faq.items.map((item: { question: string; answer: string }) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Navbar lang={lang} dict={dict} />
      <main className="pt-16 md:pt-20">
        <HeroSection lang={lang} dict={dict.hero} />
        <AISearchSection dict={dict.aiSearch} />
        <WhatWeDoSection dict={dict.whatWeDo} />
        <ConfiguratorsSection lang={lang} dict={dict.configurators} />
        <PriceComparisonSection dict={dict.priceComparison} />
        <GuaranteeSection lang={lang} dict={dict.guarantee} />
        <WhoWeHelpSection lang={lang} dict={dict.whoWeHelp} />
        <IndustriesSection dict={dict.industries} />
        <ROICalculator lang={lang} dict={dict.roiCalculator} />
        <PortfolioPreviewSection lang={lang} dict={dict.portfolio} />
        <WhyUsSection dict={dict.whyUs} />
        <FAQSection dict={dict.faq} />
        <ContactSection lang={lang} dict={dict.contactPage} />
      </main>
      <Footer lang={lang} dict={dict.footer} />
    </>
  );
}
