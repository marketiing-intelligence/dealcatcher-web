import { notFound } from "next/navigation";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/sections/home/Footer";
import {
  ReportHero,
  MetricsStrip,
  KeywordsSection,
  CompetitionSection,
  ReportCalculator,
  CpcSection,
  SeasonalitySection,
  InsightsSection,
  TipsSection,
  ReportCta,
  ReportFooter,
  ReportToc,
} from "@/components/sections/report";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getReportData, getAllReportSlugs } from "@/lib/reports";
import { i18n, type Locale } from "@/lib/i18n/config";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ lang: Locale; slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllReportSlugs();
  const params: { lang: string; slug: string }[] = [];

  for (const locale of i18n.locales) {
    for (const slug of slugs) {
      params.push({ lang: locale, slug });
    }
  }

  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  const data = await getReportData(slug);

  if (!data) return {};

  const niche = lang === "no" ? data.meta.nicheNO : data.meta.niche;
  const nicheCapitalized = niche.charAt(0).toUpperCase() + niche.slice(1);

  const title =
    lang === "no"
      ? `Markedsrapport: ${nicheCapitalized} i ${data.meta.city} | DealCatcher`
      : `Market Report: ${nicheCapitalized} in ${data.meta.city} | DealCatcher`;

  const description =
    lang === "no"
      ? `${data.meta.totalSearchVolume} månedlige søk for ${niche} i ${data.meta.city}. Se søkeord, konkurrenter og CPC-data.`
      : `${data.meta.totalSearchVolume} monthly searches for ${niche} in ${data.meta.city}. See keywords, competitors, and CPC data.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://dealcatcher.io/${lang}/reports/${slug}`,
      siteName: "DealCatcher",
      locale: lang === "no" ? "nb_NO" : "en_US",
      type: "article",
    },
  };
}

export default async function ReportPage({ params }: PageProps) {
  const { lang, slug } = await params;
  const [dict, data] = await Promise.all([
    getDictionary(lang),
    getReportData(slug),
  ]);

  if (!data) notFound();

  const nicheLower = lang === "no" ? data.meta.nicheNO : data.meta.niche;
  const rd = dict.reportPage;

  return (
    <>
      <Navbar lang={lang} dict={dict} />
      <main className="pt-16 md:pt-20">
        <ReportToc dict={rd.toc} />
        <ReportHero meta={data.meta} lang={lang} dict={rd.hero} />
        <MetricsStrip metrics={data.metrics} dict={rd.metrics} />
        <KeywordsSection
          groups={data.keywordGroups}
          lang={lang}
          dict={rd.keywords}
          nicheLower={nicheLower}
          city={data.meta.city}
        />
        <CompetitionSection
          serpKeywords={data.serpKeywords}
          lang={lang}
          dict={rd.competition}
        />
        <ReportCalculator
          calculator={data.calculator}
          lang={lang}
          dict={rd.calculator}
        />
        <CpcSection cpcData={data.cpcData} lang={lang} nicheLower={nicheLower} dict={rd.cpc} />
        <SeasonalitySection
          seasonality={data.seasonality}
          lang={lang}
          dict={rd.seasonality}
        />
        <InsightsSection
          insights={data.insights}
          lang={lang}
          city={data.meta.city}
          dict={rd.insights}
        />
        <TipsSection tips={data.tips} lang={lang} dict={rd.tips} />
        <ReportCta lang={lang} dict={rd.cta} />
        <ReportFooter
          sources={data.sources}
          dataDate={data.meta.dataDate}
          dict={rd.footer}
        />
      </main>
      <Footer lang={lang} dict={dict.footer} />
    </>
  );
}
