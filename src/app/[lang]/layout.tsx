import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "../globals.css";
import { i18n, type Locale } from "@/lib/i18n/config";
import { getAlternates } from "@/lib/seo";
import { CookieConsentBanner } from "@/components/shared/CookieConsentBanner";
import { SmoothScroll } from "@/components/shared/SmoothScroll";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { MetaPixel } from "@/components/analytics/MetaPixel";

// Body font - Inter
const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

// Headlines font - Space Grotesk (geometric, variable weight)
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  variable: "--font-space-grotesk",
  display: "swap",
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
    en: "DaVinci — Professional Websites for Businesses",
    pl: "Davinci Agency | Strategia, Technologia, Wdrożenie",
  };

  const descriptions: Record<Locale, string> = {
    en: "AI-ready, lightning-fast websites that convert visitors into customers. Built for businesses worldwide.",
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
      url: `https://davinci.agency/${lang}`,
      siteName: "DaVinci",
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
      name: "DaVinci",
      legalName: "AI SCALING SYSTEMS sp. z o.o.",
      url: "https://davinci.agency",
      email: "contact@davinci.agency",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Aleje Jerozolimskie 109 / 70",
        postalCode: "02-011",
        addressLocality: "Warszawa",
        addressCountry: "PL",
      },
      vatID: "PL7011297183",
      description: "Professional websites for Norwegian and Polish businesses. AI-ready, lightning-fast, built to convert.",
      sameAs: [
        "https://www.linkedin.com/company/davinci-agency",
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
        "Performance Optimization",
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
      name: "DaVinci",
      url: "https://davinci.agency",
      inLanguage: ["en", "nb", "pl"],
    },
  ];

  return (
    <html lang={lang} className="dark">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} min-h-screen bg-background font-sans antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScroll />
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
