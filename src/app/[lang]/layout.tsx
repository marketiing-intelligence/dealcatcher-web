import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import localFont from "next/font/local";
import "../globals.css";
import { i18n, type Locale } from "@/lib/i18n/config";

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

  const titles = {
    en: "DealCatcher — Professional Websites for Norwegian Businesses",
    no: "DealCatcher — Profesjonelle Nettsider for Norske Bedrifter",
  };

  const descriptions = {
    en: "AI-ready, WCAG compliant websites that convert visitors into customers. Built for Norwegian craftsmen and businesses.",
    no: "AI-klare, WCAG-kompatible nettsider som konverterer besokende til kunder. Bygget for norske handverkere og bedrifter.",
  };

  return {
    title: titles[lang],
    description: descriptions[lang],
    keywords: [
      "web design norway",
      "website norway",
      "WCAG compliance",
      "norwegian web agency",
      "AI ready websites",
    ],
    openGraph: {
      title: titles[lang],
      description: descriptions[lang],
      url: "https://dealcatcher.io",
      siteName: "DealCatcher",
      locale: lang === "no" ? "nb_NO" : "en_US",
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

  return (
    <html lang={lang} className="dark">
      <body
        className={`${dmSans.variable} ${clashDisplay.variable} min-h-screen bg-background font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
