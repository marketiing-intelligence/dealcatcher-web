"use client";

import { useState } from "react";
import { Container } from "@/components/shared/Container";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { fadeUp, viewportOnce } from "@/lib/animations";
import { Calculator, TrendingUp, ArrowRight, Zap } from "lucide-react";
import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";

interface ROICalculatorProps {
  lang: Locale;
  dict: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    avgJobLabel: string;
    avgJobPlaceholder: string;
    monthlyLeadsLabel: string;
    conversionLabel: string;
    results: {
      monthlyRevenue: string;
      yearlyRevenue: string;
      roi: string;
      investmentLabel: string;
      roiExplanation: string;
    };
    cta: string;
    disclaimer: string;
  };
}

export function ROICalculator({ lang, dict }: ROICalculatorProps) {
  const [avgJobValue, setAvgJobValue] = useState(5000);
  const [monthlyLeads, setMonthlyLeads] = useState(10);
  const [conversionRate, setConversionRate] = useState(30);

  const monthlyCustomers = Math.round(monthlyLeads * (conversionRate / 100));
  const monthlyRevenue = monthlyCustomers * avgJobValue;
  const yearlyRevenue = monthlyRevenue * 12;
  const investment = 10000 + 500 * 12; // Website + 12 months hosting
  const roi = Math.round((yearlyRevenue / investment) * 100);

  const formatNumber = (num: number) =>
    num.toLocaleString(lang === "no" ? "nb-NO" : "en-US");

  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-[#141414] to-[#0A0A0A] relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

      <Container className="relative z-10">
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
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-clash font-semibold mb-4">
            {dict.title}{" "}
            <span className="bg-gradient-to-r from-primary to-accent-hover bg-clip-text text-transparent">
              {dict.titleHighlight}
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {dict.subtitle}
          </p>
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
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                {lang === "no" ? "Dine tall" : "Your Numbers"}
              </h3>

              <div className="space-y-6">
                {/* Average Job Value */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {dict.avgJobLabel}
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="1000"
                      max="50000"
                      step="500"
                      value={avgJobValue}
                      onChange={(e) => setAvgJobValue(Number(e.target.value))}
                      className="flex-1 h-2 bg-background rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                    <span className="w-24 text-right font-mono text-primary font-semibold">
                      {formatNumber(avgJobValue)} NOK
                    </span>
                  </div>
                </div>

                {/* Monthly Leads */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {dict.monthlyLeadsLabel}
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="1"
                      max="50"
                      value={monthlyLeads}
                      onChange={(e) => setMonthlyLeads(Number(e.target.value))}
                      className="flex-1 h-2 bg-background rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                    <span className="w-24 text-right font-mono text-primary font-semibold">
                      {monthlyLeads}
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
                      value={conversionRate}
                      onChange={(e) => setConversionRate(Number(e.target.value))}
                      className="flex-1 h-2 bg-background rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                    <span className="w-24 text-right font-mono text-primary font-semibold">
                      {conversionRate}%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="bg-gradient-to-br from-primary/10 to-green-500/10 border border-primary/20 rounded-2xl p-6 md:p-8">
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                {lang === "no" ? "Din potensielle inntekt" : "Your Potential Revenue"}
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-border/50">
                  <span className="text-muted-foreground">{dict.results.monthlyRevenue}</span>
                  <span className="text-xl font-bold text-foreground">
                    {formatNumber(monthlyRevenue)} NOK
                  </span>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-border/50">
                  <span className="text-muted-foreground">{dict.results.yearlyRevenue}</span>
                  <span className="text-2xl font-bold text-green-500">
                    {formatNumber(yearlyRevenue)} NOK
                  </span>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-border/50">
                  <span className="text-muted-foreground">{dict.results.investmentLabel}</span>
                  <span className="text-lg font-semibold text-muted-foreground">
                    {formatNumber(investment)} NOK
                  </span>
                </div>

                <div className="flex justify-between items-center py-4 bg-green-500/20 rounded-lg px-4 -mx-2">
                  <span className="font-semibold text-foreground">{dict.results.roi}</span>
                  <span className="text-3xl font-bold text-green-500">
                    {formatNumber(roi)}%
                  </span>
                </div>

                <p className="text-xs text-muted-foreground text-center">
                  {dict.results.roiExplanation}
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <motion.div
            variants={fadeUp}
            className="text-center mt-10"
          >
            <Button size="lg" asChild className="group">
              <Link href={`/${lang}#contact`}>
                {dict.cta}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <p className="text-xs text-muted-foreground mt-4 max-w-md mx-auto">
              {dict.disclaimer}
            </p>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
