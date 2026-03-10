import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import localFont from "next/font/local";
import { GoogleAnalytics } from "@next/third-parties/google";
import "../globals.css";
import { i18n, type Locale } from "@/lib/i18n/config";
import { getAlternates } from "@/lib/seo";
import { CookieConsentBanner } from "@/components/shared/CookieConsentBanner";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { MetaPixel } from "@/components/analytics/MetaPixel";

// Body font - DM Sans from Google Fonts
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

// Headlines font - Clash Display from Fontshare
const clashDisplay = localFont({
  src: "../fonts/ClashDisplay-Variable.woff2",
  variable: "--font-clash-display",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
  preload: true,
});

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;

  const titles: Record<Locale, string> = {
    en: "DealCatcher — Professional Websites for Businesses",
    pl: "Davinci Agency | Strategia, Technologia, Wdrożenie",
  };

  const descriptions: Record<Locale, string> = {
    en: "AI-ready, WCAG compliant websites that convert visitors into customers. Built for businesses worldwide.",
    pl: "Analizujemy cały biznes — sprzedaż, operacje, marketing, finanse, zespół, procesy. Znajdujemy co naprawdę blokuje wzrost i budujemy rozwiązanie. Strategia, technologia i wdrożenie. Pod jednym dachem.",
  };

  const keywords: Record<Locale, string[]> = {
    en: [
      "web design",
      "website development",
      "AI ready websites",
      "business consulting",
      "business strategy",
    ],
    pl: [
      "x-ray",
      "diagnoza biznesu",
      "strategia biznesowa",
      "wdrożenie ai",
      "automatyzacja procesów",
      "narzędzia ai",
      "agenci ai",
      "tworzenie stron internetowych",
      "konfigurator online",
      "kampanie google ads",
      "aeo",
      "ai seo",
      "pozycjonowanie w ai",
    ],
  };

  const localeMap: Record<Locale, string> = {
    en: "en_US",
    pl: "pl_PL",
  };

  return {
    title: titles[lang],
    description: descriptions[lang],
    keywords: keywords[lang],
    alternates: getAlternates(lang),
    other: {
      "facebook-domain-verification": "q36fpnvykraqwpvqk2ll7r2htpbnxr", // Meta domain verification
    },
    openGraph: {
      title: titles[lang],
      description: descriptions[lang],
      url: `https://dealcatcher.io/${lang}`,
      siteName: "DealCatcher",
      locale: localeMap[lang],
      type: "website",
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: langParam } = await params;
  const lang = langParam as Locale;
  const dict = await getDictionary(lang);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "DealCatcher",
      legalName: "AI SCALING SYSTEMS sp. z o.o.",
      url: "https://dealcatcher.io",
      email: "contact@dealcatcher.io",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Aleje Jerozolimskie 109 / 70",
        postalCode: "02-011",
        addressLocality: "Warszawa",
        addressCountry: "PL",
      },
      vatID: "PL7011297183",
      description: "Professional websites for Norwegian and Polish businesses. AI-ready, WCAG compliant, built to convert.",
      sameAs: [
        "https://www.linkedin.com/company/dealcatcher-io",
      ],
      areaServed: [
        { "@type": "Country", name: "Norway" },
        { "@type": "Country", name: "Poland" },
      ],
      knowsAbout: [
        "Web Design",
        "AI Search Optimization",
        "Answer Engine Optimization",
        "Google Ads",
        "WCAG Compliance",
        "Structured Data",
        "Schema.org",
      ],
      serviceType: [
        "Website Development",
        "AI-Ready Web Design",
        "Google Ads Management",
        "Search Engine Optimization",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "DealCatcher",
      url: "https://dealcatcher.io",
      inLanguage: ["en", "nb", "pl"],
    },
  ];

  return (
    <html lang={lang} className="dark">
      <body
        className={`${dmSans.variable} ${clashDisplay.variable} min-h-screen bg-background font-sans antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <CookieConsentBanner lang={lang} dict={dict.cookieBanner} />
      </body>
      {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
      )}
      {process.env.NEXT_PUBLIC_META_PIXEL_ID && (
        <MetaPixel pixelId={process.env.NEXT_PUBLIC_META_PIXEL_ID} />
      )}
    </html>
  );
}
