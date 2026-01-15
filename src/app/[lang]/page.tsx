import { Navbar } from "@/components/shared/Navbar";
import { HeroSection } from "@/components/sections/home/HeroSection";
import { WhatWeDoSection } from "@/components/sections/home/WhatWeDoSection";
import { WhoWeHelpSection } from "@/components/sections/home/WhoWeHelpSection";
import { PortfolioPreviewSection } from "@/components/sections/home/PortfolioPreviewSection";
import { WhyUsSection } from "@/components/sections/home/WhyUsSection";
import { CTASection } from "@/components/sections/home/CTASection";
import { Footer } from "@/components/sections/home/Footer";
import { getDictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";

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
        <WhoWeHelpSection lang={lang} dict={dict.whoWeHelp} />
        <PortfolioPreviewSection lang={lang} dict={dict.portfolio} />
        <WhyUsSection dict={dict.whyUs} />
        <CTASection lang={lang} dict={dict.cta} />
      </main>
      <Footer lang={lang} dict={dict.footer} />
    </>
  );
}
