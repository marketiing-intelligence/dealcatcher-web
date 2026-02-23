import type { Locale } from "@/lib/i18n/config";

export function formatNumber(num: number, lang: Locale): string {
  if (lang === "pl") return num.toLocaleString("pl-PL");
  return num.toLocaleString(lang === "no" ? "nb-NO" : "en-US");
}

export function formatCpc(cpc: number, _lang: Locale, currency = "kr"): string {
  return `${cpc.toFixed(2)} ${currency}`;
}

export function competitionColor(level: "LOW" | "MEDIUM" | "HIGH"): string {
  switch (level) {
    case "LOW":
      return "text-green-400 bg-green-400/10 border-green-400/20";
    case "MEDIUM":
      return "text-amber-400 bg-amber-400/10 border-amber-400/20";
    case "HIGH":
      return "text-red-400 bg-red-400/10 border-red-400/20";
  }
}

export function groupColorClasses(color: "green" | "blue" | "amber" | "purple"): {
  dot: string;
  bg: string;
  border: string;
  text: string;
} {
  switch (color) {
    case "green":
      return {
        dot: "bg-emerald-400",
        bg: "bg-emerald-400/10",
        border: "border-emerald-400/20",
        text: "text-emerald-400",
      };
    case "blue":
      return {
        dot: "bg-blue-400",
        bg: "bg-blue-400/10",
        border: "border-blue-400/20",
        text: "text-blue-400",
      };
    case "amber":
      return {
        dot: "bg-amber-400",
        bg: "bg-amber-400/10",
        border: "border-amber-400/20",
        text: "text-amber-400",
      };
    case "purple":
      return {
        dot: "bg-purple-400",
        bg: "bg-purple-400/10",
        border: "border-purple-400/20",
        text: "text-purple-400",
      };
  }
}
