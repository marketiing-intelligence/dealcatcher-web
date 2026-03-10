import type { Locale } from "./config";
import { i18n } from "./config";

const dictionaries = {
  pl: () => import("./dictionaries/pl.json").then((m) => m.default),
  en: () => import("./dictionaries/en.json").then((m) => m.default),
};

export const getDictionary = async (locale: Locale) => {
  // Fallback to default locale if dictionary function doesn't exist
  const dictionaryFn = dictionaries[locale] || dictionaries[i18n.defaultLocale];
  return dictionaryFn();
};

