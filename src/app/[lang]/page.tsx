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
        <section id="xray-form" className="py-20 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-muted/30" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/[0.06] blur-[120px] pointer-events-none" />
          <div className="container mx-auto px-6 md:px-12 lg:px-16 relative z-10">
            <div className="max-w-2xl mx-auto rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm p-8 md:p-12">
              <XRayForm lang={lang} dict={dict.xrayForm} />
            </div>
          </div>
        </section>
      </main>
      <Footer lang={lang} dict={dict.footer} />
    </>
  );
}
