import type { Locale } from "./config";

const dictionaries = {
  en: () => import("./dictionaries/en.json").then((m) => m.default),
  no: () => import("./dictionaries/no.json").then((m) => m.default),
};

export const getDictionary = async (locale: Locale) =>
  dictionaries[locale]();
