"use client";

import { useState } from "react";
import { Container } from "@/components/shared/Container";
import { motion } from "framer-motion";
import { fadeUp, viewportOnce } from "@/lib/animations";
import { Calculator, TrendingUp } from "lucide-react";
import { formatNumber } from "@/lib/reports/helpers";
import { cn } from "@/lib/utils";
import { t } from "@/lib/reports/types";
import type { CalculatorDefaults } from "@/lib/reports/types";
import type { Locale } from "@/lib/i18n/config";

interface ReportCalculatorProps {
  calculator: CalculatorDefaults;
  lang: Locale;
  currency: string;
  dict: {
    badge: string;
    title: string;
    subtitle: string;
    patientValueLabel: string;
    budgetLabel: string;
    conversionLabel: string;
    resultClicks: string;
    resultInquiries: string;
    resultPatients: string;
    resultRevenue: string;
    resultRoi: string;
    disclaimer: string;
  };
}

export function ReportCalculator({ calculator, lang, currency, dict }: ReportCalculatorProps) {
  const [patientValue, setPatientValue] = useState(calculator.defaultPatientValue);
  const [budget, setBudget] = useState(calculator.defaultBudget);
  const [conversion, setConversion] = useState(calculator.defaultConversion);

  const monthlyClicks = Math.round(budget / calculator.avgCpc);
  const monthlyInquiries = Math.round(monthlyClicks * calculator.clickToInquiryRate);
  const monthlyPatients = Math.round(monthlyInquiries * (conversion / 100));
  const monthlyRevenue = monthlyPatients * patientValue;
  const roi = budget > 0 ? Math.round((monthlyRevenue / budget) * 100) : 0;

  const fn = (n: number) => formatNumber(n, lang);

  const disclaimer = dict.disclaimer
    .replace("{avgCpc}", calculator.avgCpc.toFixed(2))
    .replace("{ctr}", (calculator.clickToInquiryRate * 100).toFixed(1));

  return (
    <section id="calculator" className="py-20 md:py-28">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary mb-6">
            <Calculator className="w-4 h-4" />
            {dict.badge}
          </span>
          <h2 className="mb-4">{dict.title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{dict.subtitle}</p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="max-w-4xl mx-auto"
        >
          <div className="grid md:grid-cols-2 gap-8">
            {/* Inputs */}
            <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
              <div className="space-y-6">
                {/* Patient Value */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {dict.patientValueLabel}
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="1000"
                      max="30000"
                      step="1000"
                      value={patientValue}
                      onChange={(e) => setPatientValue(Number(e.target.value))}
                      className="flex-1 h-2 bg-background rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                    <span className="w-28 text-right font-mono text-primary font-semibold text-sm">
                      {fn(patientValue)} {currency}
                    </span>
                  </div>
                </div>

                {/* Monthly Budget */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {dict.budgetLabel}
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="1000"
                      max="20000"
                      step="500"
                      value={budget}
                      onChange={(e) => setBudget(Number(e.target.value))}
                      className="flex-1 h-2 bg-background rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                    <span className="w-28 text-right font-mono text-primary font-semibold text-sm">
                      {fn(budget)} {currency}
                    </span>
                  </div>
                </div>

                {/* Conversion Rate */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {dict.conversionLabel}
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="10"
                      max="80"
                      step="5"
                      value={conversion}
                      onChange={(e) => setConversion(Number(e.target.value))}
                      className="flex-1 h-2 bg-background rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                    <span className="w-28 text-right font-mono text-primary font-semibold text-sm">
                      {conversion}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Benchmark */}
              <div className="mt-6 p-3 rounded-lg bg-primary/5 border border-primary/10">
                <p className="text-xs text-muted-foreground">
                  {t(calculator, lang, "benchmark")}
                </p>
              </div>
            </div>

            {/* Results */}
            <div className="bg-gradient-to-br from-primary/10 to-green-500/10 border border-primary/20 rounded-2xl p-6 md:p-8">
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                {lang === "no" ? "Resultater" : lang === "pl" ? "Wyniki" : "Results"}
              </h3>

              <div className="space-y-3">
                <ResultRow label={dict.resultClicks} value={fn(monthlyClicks)} />
                <ResultRow label={dict.resultInquiries} value={fn(monthlyInquiries)} />
                <ResultRow label={dict.resultPatients} value={fn(monthlyPatients)} highlight />

                <div className="pt-3 border-t border-border/50">
                  <ResultRow label={dict.resultRevenue} value={`${fn(monthlyRevenue)} ${currency}`} large />
                </div>

                <div className="flex justify-between items-center py-3 bg-green-500/20 rounded-lg px-4 -mx-2">
                  <span className="font-semibold text-foreground text-sm">{dict.resultRoi}</span>
                  <span className="text-2xl font-bold text-green-500 font-clash">
                    {fn(roi)}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          <p className="text-xs text-muted-foreground text-center mt-6 max-w-xl mx-auto">
            {disclaimer}
          </p>
        </motion.div>
      </Container>
    </section>
  );
}

function ResultRow({
  label,
  value,
  highlight,
  large,
}: {
  label: string;
  value: string;
  highlight?: boolean;
  large?: boolean;
}) {
  return (
    <div className="flex justify-between items-center py-2">
      <span className="text-muted-foreground text-sm">{label}</span>
      <span
        className={cn(
          "font-mono font-semibold",
          highlight && "text-primary",
          large && "text-xl text-green-500"
        )}
      >
        {value}
      </span>
    </div>
  );
}

