import { Navbar } from "@/components/shared/Navbar";
import { HeroSection } from "@/components/sections/davinci/HeroSection";
import { VSLSection } from "@/components/sections/davinci/VSLSection";
import { ProblemSection } from "@/components/sections/davinci/ProblemSection";
import { RootCauseSection } from "@/components/sections/davinci/RootCauseSection";
import { BenefitsSection } from "@/components/sections/davinci/BenefitsSection";
import { HowWeWorkSection } from "@/components/sections/davinci/HowWeWorkSection";
import { ProcessSection } from "@/components/sections/davinci/ProcessSection";
import { WhatWeBuildSection } from "@/components/sections/davinci/WhatWeBuildSection";
import { CaseStudySection } from "@/components/sections/davinci/CaseStudySection";
import { ComparisonTableSection } from "@/components/sections/davinci/ComparisonTableSection";
import { FAQSection } from "@/components/sections/davinci/FAQSection";
import { FinalCTASection } from "@/components/sections/davinci/FinalCTASection";
import { XRayForm } from "@/components/forms/XRayForm";
import { Footer } from "@/components/sections/home/Footer";
import { getDictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";

export const metadata = {
  title: "Davinci Agency | Strategia, Technologia, Wdrożenie",
  description:
    "Analizujemy cały biznes — sprzedaż, operacje, marketing, finanse, zespół, procesy. Znajdujemy co naprawdę blokuje wzrost i budujemy rozwiązanie. Strategia, technologia i wdrożenie. Pod jednym dachem.",
};

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
        <HeroSection lang={lang} dict={dict.davinci.hero} />
        <VSLSection dict={dict.davinci.vsl} />
        <ProblemSection dict={dict.davinci.problem} />
        <RootCauseSection dict={dict.davinci.rootCause} />
        <BenefitsSection lang={lang} dict={dict.davinci.benefits} />
        <HowWeWorkSection dict={dict.davinci.howWeWork} />
        <ProcessSection dict={dict.davinci.process} />
        <WhatWeBuildSection dict={dict.davinci.whatWeBuild} />
        <CaseStudySection lang={lang} dict={dict.davinci.caseStudy} />
        <ComparisonTableSection dict={dict.davinci.comparison} />
        <FAQSection dict={dict.davinci.faq} />
        <FinalCTASection lang={lang} dict={dict.davinci.finalCTA} />
        {/* X-Ray Form Section */}
        <section id="xray-form" className="py-20 md:py-32 bg-muted/30">
          <div className="container">
            <XRayForm lang={lang} dict={dict.xrayForm} />
          </div>
        </section>
      </main>
      <Footer lang={lang} dict={dict.footer} />
    </>
  );
}
