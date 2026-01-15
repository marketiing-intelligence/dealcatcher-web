import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/sections/home/Footer";
import { PortfolioHero } from "@/components/sections/portfolio/PortfolioHero";
import { PortfolioGrid } from "@/components/sections/portfolio/PortfolioGrid";
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
        ? "Malgalleri — Premium Nettsidemal | DealCatcher"
        : "Template Gallery — Premium Website Templates | DealCatcher",
    description:
      lang === "no"
        ? "Utforsk vare samling av premium nettsidemal for norske bedrifter. AI-klare, WCAG-kompatible, bygget for a konvertere."
        : "Explore our collection of premium website templates for Norwegian businesses. AI-ready, WCAG compliant, built to convert.",
  };
}

export default async function PortfolioPage({
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
        <PortfolioHero />
        <PortfolioGrid />
      </main>
      <Footer lang={lang} dict={dict.footer} />
    </>
  );
}
