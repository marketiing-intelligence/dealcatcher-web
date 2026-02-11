import type { Locale } from "@/lib/i18n/config";

export interface ReportMeta {
  niche: string;
  nicheNO: string;
  city: string;
  locationCode: number;
  dataDate: string;
  totalSearchVolume: number;
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
}

export interface KeywordGroup {
  id: string;
  color: "green" | "blue" | "amber" | "purple";
  nameEN: string;
  nameNO: string;
  descriptionEN?: string;
  descriptionNO?: string;
  descriptionWarningEN?: string;
  descriptionWarningNO?: string;
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
  insightNO: string;
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
  insightNO: string;
}

export interface Insight {
  icon: string;
  color: string;
  titleEN: string;
  titleNO: string;
  textEN: string;
  textNO: string;
  statLabel: string;
  statValue: string;
}

export interface Tip {
  titleEN: string;
  titleNO: string;
  textEN: string;
  textNO: string;
  tagEN: string;
  tagNO: string;
}

export interface CalculatorDefaults {
  avgCpc: number;
  defaultPatientValue: number;
  defaultBudget: number;
  defaultConversion: number;
  clickToInquiryRate: number;
  benchmarkEN: string;
  benchmarkNO: string;
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

// Helper to get bilingual text
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function t(obj: any, lang: Locale, field: string): string {
  const key = lang === "no" ? `${field}NO` : `${field}EN`;
  return obj[key] ?? "";
}
