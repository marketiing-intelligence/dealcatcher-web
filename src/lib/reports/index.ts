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
