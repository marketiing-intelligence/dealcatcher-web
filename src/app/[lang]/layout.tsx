import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import localFont from "next/font/local";
import { GoogleAnalytics } from "@next/third-parties/google";
import "../globals.css";
import { i18n, type Locale } from "@/lib/i18n/config";
import { getAlternates } from "@/lib/seo";
import { CookieConsentBanner } from "@/components/shared/CookieConsentBanner";
import { getDictionary } from "@/lib/i18n/dictionaries";

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
    en: "DealCatcher — Professional Websites for Norwegian Businesses",
    no: "DealCatcher — Profesjonelle Nettsider for Norske Bedrifter",
    pl: "DealCatcher — Tworzenie Stron Internetowych dla Firm",
  };

  const descriptions: Record<Locale, string> = {
    en: "AI-ready, WCAG compliant websites that convert visitors into customers. Built for Norwegian craftsmen and businesses.",
    no: "AI-klare, WCAG-kompatible nettsider som konverterer besokende til kunder. Bygget for norske handverkere og bedrifter.",
    pl: "Profesjonalne strony internetowe gotowe na AI, które zamieniają odwiedzających w klientów. Tworzenie stron WWW i kampanie Google Ads dla polskich firm.",
  };

  const keywords: Record<Locale, string[]> = {
    en: [
      "web design norway",
      "website norway",
      "WCAG compliance",
      "norwegian web agency",
      "AI ready websites",
    ],
    no: [
      "webdesign norge",
      "nettside bedrift",
      "WCAG compliance",
      "norsk webbyrå",
      "AI klare nettsider",
    ],
    pl: [
      "tworzenie stron internetowych",
      "strona internetowa dla firmy",
      "projektowanie stron www",
      "kampanie google ads",
      "agencja interaktywna",
      "pozycjonowanie stron",
    ],
  };

  const localeMap: Record<Locale, string> = {
    en: "en_US",
    no: "nb_NO",
    pl: "pl_PL",
  };

  return {
    title: titles[lang],
    description: descriptions[lang],
    keywords: keywords[lang],
    alternates: getAlternates(lang),
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
      legalName: "Rapid Software House sp. z o.o.",
      url: "https://dealcatcher.io",
      email: "contact@dealcatcher.io",
      description: "Professional websites for Norwegian and Polish businesses. AI-ready, WCAG compliant, built to convert.",
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
    </html>
  );
}
