import type { ReportData } from "./types";

const reportLoaders: Record<string, () => Promise<ReportData>> = {
  "psychologists-oslo": () =>
    import("./data/psychologists-oslo.json").then((m) => m.default as ReportData),
  "psychologists-bergen": () =>
    import("./data/psychologists-bergen.json").then((m) => m.default as ReportData),
  "psychologists-trondheim": () =>
    import("./data/psychologists-trondheim.json").then((m) => m.default as ReportData),
  "psychologists-stavanger": () =>
    import("./data/psychologists-stavanger.json").then((m) => m.default as ReportData),
  "psychologists-kristiansand": () =>
    import("./data/psychologists-kristiansand.json").then((m) => m.default as ReportData),
  "dentists-oslo": () =>
    import("./data/dentists-oslo.json").then((m) => m.default as ReportData),
  "dentists-bergen": () =>
    import("./data/dentists-bergen.json").then((m) => m.default as ReportData),
  "dentists-trondheim": () =>
    import("./data/dentists-trondheim.json").then((m) => m.default as ReportData),
  "dentists-stavanger": () =>
    import("./data/dentists-stavanger.json").then((m) => m.default as ReportData),
  "dentists-kristiansand": () =>
    import("./data/dentists-kristiansand.json").then((m) => m.default as ReportData),
  "accountants-oslo": () =>
    import("./data/accountants-oslo.json").then((m) => m.default as ReportData),
  "accountants-bergen": () =>
    import("./data/accountants-bergen.json").then((m) => m.default as ReportData),
  "accountants-trondheim": () =>
    import("./data/accountants-trondheim.json").then((m) => m.default as ReportData),
  "accountants-stavanger": () =>
    import("./data/accountants-stavanger.json").then((m) => m.default as ReportData),
  "accountants-kristiansand": () =>
    import("./data/accountants-kristiansand.json").then((m) => m.default as ReportData),
  "beauty-salon-oslo": () =>
    import("./data/beauty-salon-oslo.json").then((m) => m.default as ReportData),
  "beauty-salon-bergen": () =>
    import("./data/beauty-salon-bergen.json").then((m) => m.default as ReportData),
  "beauty-salon-trondheim": () =>
    import("./data/beauty-salon-trondheim.json").then((m) => m.default as ReportData),
  "beauty-salon-stavanger": () =>
    import("./data/beauty-salon-stavanger.json").then((m) => m.default as ReportData),
  "beauty-salon-kristiansand": () =>
    import("./data/beauty-salon-kristiansand.json").then((m) => m.default as ReportData),
  "beauty-salon-tromso": () =>
    import("./data/beauty-salon-tromso.json").then((m) => m.default as ReportData),
  "day-spa-oslo": () =>
    import("./data/day-spa-oslo.json").then((m) => m.default as ReportData),
  "day-spa-bergen": () =>
    import("./data/day-spa-bergen.json").then((m) => m.default as ReportData),
  "day-spa-stavanger": () =>
    import("./data/day-spa-stavanger.json").then((m) => m.default as ReportData),
  "day-spa-kristiansand": () =>
    import("./data/day-spa-kristiansand.json").then((m) => m.default as ReportData),
  "day-spa-drammen": () =>
    import("./data/day-spa-drammen.json").then((m) => m.default as ReportData),
  "day-spa-tromso": () =>
    import("./data/day-spa-tromso.json").then((m) => m.default as ReportData),
  "auto-repair-oslo": () =>
    import("./data/auto-repair-oslo.json").then((m) => m.default as ReportData),
  "auto-repair-bergen": () =>
    import("./data/auto-repair-bergen.json").then((m) => m.default as ReportData),
  "auto-repair-trondheim": () =>
    import("./data/auto-repair-trondheim.json").then((m) => m.default as ReportData),
  "auto-repair-stavanger": () =>
    import("./data/auto-repair-stavanger.json").then((m) => m.default as ReportData),
  "auto-repair-kristiansand": () =>
    import("./data/auto-repair-kristiansand.json").then((m) => m.default as ReportData),
  "auto-repair-drammen": () =>
    import("./data/auto-repair-drammen.json").then((m) => m.default as ReportData),
  "tourism-oslo": () =>
    import("./data/tourism-oslo.json").then((m) => m.default as ReportData),
  "tourism-bergen": () =>
    import("./data/tourism-bergen.json").then((m) => m.default as ReportData),
  "tourism-stavanger": () =>
    import("./data/tourism-stavanger.json").then((m) => m.default as ReportData),
  "tourism-kristiansand": () =>
    import("./data/tourism-kristiansand.json").then((m) => m.default as ReportData),
  "tourism-drammen": () =>
    import("./data/tourism-drammen.json").then((m) => m.default as ReportData),
  "tourism-tromso": () =>
    import("./data/tourism-tromso.json").then((m) => m.default as ReportData),
  "cleaning-oslo": () =>
    import("./data/cleaning-oslo.json").then((m) => m.default as ReportData),
  "cleaning-bergen": () =>
    import("./data/cleaning-bergen.json").then((m) => m.default as ReportData),
  "cleaning-trondheim": () =>
    import("./data/cleaning-trondheim.json").then((m) => m.default as ReportData),
  "cleaning-stavanger": () =>
    import("./data/cleaning-stavanger.json").then((m) => m.default as ReportData),
  "cleaning-kristiansand": () =>
    import("./data/cleaning-kristiansand.json").then((m) => m.default as ReportData),
};

export async function getReportData(slug: string): Promise<ReportData | null> {
  const loader = reportLoaders[slug];
  if (!loader) return null;
  return loader();
}

export function getAllReportSlugs(): string[] {
  return Object.keys(reportLoaders);
}

export { type ReportData } from "./types";
