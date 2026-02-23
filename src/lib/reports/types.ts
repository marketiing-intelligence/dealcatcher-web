import type { Locale } from "@/lib/i18n/config";

export interface ReportMeta {
  niche: string;
  nicheNO: string;
  nichePL?: string;
  city: string;
  locationCode: number;
  dataDate: string;
  totalSearchVolume: number;
  currency?: string;
  disclaimerEN?: string;
  disclaimerNO?: string;
  disclaimerPL?: string;
}

export interface ReportMetrics {
  keywordCount: number;
  avgCpc: number;
  topClinicsCount: number;
  mapsClickShare: number;
}

export interface Keyword {
  keyword: string;
  translation: string | null;
  volume: number;
  competition: "LOW" | "MEDIUM" | "HIGH";
  cpc: number;
  adRestricted?: boolean;
}

export interface KeywordGroup {
  id: string;
  color: "green" | "blue" | "amber" | "purple";
  nameEN: string;
  nameNO?: string;
  namePL?: string;
  descriptionEN?: string;
  descriptionNO?: string;
  descriptionPL?: string;
  descriptionWarningEN?: string;
  descriptionWarningNO?: string;
  descriptionWarningPL?: string;
  totalVolume: number;
  isNational?: boolean;
  keywords: Keyword[];
}

export interface SerpResult {
  rank: number;
  domain: string;
}

export interface MapsResult {
  rank: number;
  title: string;
  rating: number;
  reviews: number;
}

export interface SerpKeyword {
  keyword: string;
  volume: number;
  organic: SerpResult[];
  maps: MapsResult[];
  insightEN: string;
  insightNO?: string;
  insightPL?: string;
}

export interface CpcDataItem {
  keyword: string;
  cpc: number;
}

export interface SeasonalityMonth {
  month: string;
  volume: number;
}

export interface Seasonality {
  keyword: string;
  months: SeasonalityMonth[];
  peakMonths: string[];
  lowMonths: string[];
  insightEN: string;
  insightNO?: string;
  insightPL?: string;
}

export interface Insight {
  icon: string;
  color: string;
  titleEN: string;
  titleNO?: string;
  titlePL?: string;
  textEN: string;
  textNO?: string;
  textPL?: string;
  statLabel: string;
  statValue: string;
}

export interface Tip {
  titleEN: string;
  titleNO?: string;
  titlePL?: string;
  textEN: string;
  textNO?: string;
  textPL?: string;
  tagEN: string;
  tagNO?: string;
  tagPL?: string;
}

export interface CalculatorDefaults {
  avgCpc: number;
  defaultPatientValue: number;
  defaultBudget: number;
  defaultConversion: number;
  clickToInquiryRate: number;
  benchmarkEN: string;
  benchmarkNO?: string;
  benchmarkPL?: string;
}

export interface ReportSource {
  name: string;
  url: string | null;
}

export interface ReportData {
  meta: ReportMeta;
  metrics: ReportMetrics;
  keywordGroups: KeywordGroup[];
  serpKeywords: SerpKeyword[];
  cpcData: CpcDataItem[];
  seasonality: Seasonality;
  insights: Insight[];
  tips: Tip[];
  calculator: CalculatorDefaults;
  sources: ReportSource[];
}

// Helper to get bilingual/trilingual text
// Fallback chain: PL → EN, NO → NO, EN → EN
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function t(obj: any, lang: Locale, field: string): string {
  let key: string;
  if (lang === "no") key = `${field}NO`;
  else if (lang === "pl") key = `${field}PL`;
  else key = `${field}EN`;
  return obj[key] ?? obj[`${field}EN`] ?? "";
}
