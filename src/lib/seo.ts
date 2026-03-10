import type { Locale } from "@/lib/i18n/config";
import { i18n } from "@/lib/i18n/config";

const BASE_URL = "https://dealcatcher.io";

const hreflangMap: Record<Locale, string> = {
  pl: "pl",
  en: "en",
};

export function getAlternates(lang: Locale, path: string = "", locales?: Locale[]) {
  const activeLocales = (locales || i18n.locales) as Locale[];
  const languages: Record<string, string> = {};

  for (const locale of activeLocales) {
    languages[hreflangMap[locale]] = `${BASE_URL}/${locale}${path}`;
  }
  languages["x-default"] = `${BASE_URL}/pl${path}`;

  return {
    canonical: `${BASE_URL}/${lang}${path}`,
    languages,
  };
}
