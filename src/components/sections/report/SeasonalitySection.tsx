"use client";

import { Container } from "@/components/shared/Container";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, staggerItem, viewportOnce } from "@/lib/animations";
import { CalendarDays } from "lucide-react";
import { formatNumber } from "@/lib/reports/helpers";
import { t } from "@/lib/reports/types";
import type { Seasonality } from "@/lib/reports/types";
import type { Locale } from "@/lib/i18n/config";

interface SeasonalitySectionProps {
  seasonality: Seasonality;
  lang: Locale;
  dict: {
    badge: string;
    title: string;
    subtitle: string;
    peak: string;
    low: string;
  };
}

export function SeasonalitySection({ seasonality, lang, dict }: SeasonalitySectionProps) {
  const maxVol = Math.max(...seasonality.months.map((m) => m.volume));
  const subtitle = dict.subtitle.replace("{keyword}", seasonality.keyword);

  return (
    <section id="seasonality" className="py-20 md:py-28">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary mb-6">
            <CalendarDays className="w-4 h-4" />
            {dict.badge}
          </span>
          <h2 className="mb-4">{dict.title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="max-w-3xl mx-auto"
        >
          {/* Chart */}
          <div className="flex items-end gap-1.5 sm:gap-3 h-48 sm:h-64 mb-4">
            {seasonality.months.map((month) => {
              const height = (month.volume / maxVol) * 100;
              const isPeak = seasonality.peakMonths.includes(month.month);
              const isLow = seasonality.lowMonths.includes(month.month);

              return (
                <motion.div
                  key={month.month}
                  variants={staggerItem}
                  className="flex-1 flex flex-col items-center gap-1 h-full justify-end group"
                >
                  {/* Tag */}
                  {isPeak && (
                    <span className="text-[10px] font-semibold text-green-400 bg-green-400/10 px-1.5 py-0.5 rounded">
                      {dict.peak}
                    </span>
                  )}
                  {isLow && (
                    <span className="text-[10px] font-semibold text-red-400 bg-red-400/10 px-1.5 py-0.5 rounded">
                      {dict.low}
                    </span>
                  )}

                  {/* Volume tooltip on hover */}
                  <div className="relative w-full">
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-mono text-primary whitespace-nowrap">
                      {formatNumber(month.volume, lang)}
                    </div>
                  </div>

                  {/* Bar */}
                  <div
                    className={`w-full rounded-t-md transition-colors ${
                      isPeak
                        ? "bg-green-400/60 group-hover:bg-green-400/80"
                        : isLow
                          ? "bg-red-400/40 group-hover:bg-red-400/60"
                          : "bg-primary/30 group-hover:bg-primary/50"
                    }`}
                    style={{ height: `${height}%` }}
                  />
                </motion.div>
              );
            })}
          </div>

          {/* Month labels */}
          <div className="flex gap-1.5 sm:gap-3">
            {seasonality.months.map((month) => (
              <div key={month.month} className="flex-1 text-center text-xs text-muted-foreground">
                {month.month}
              </div>
            ))}
          </div>

          {/* Insight */}
          <div className="mt-8 p-4 rounded-xl bg-primary/5 border border-primary/10">
            <p className="text-sm text-muted-foreground">
              {t(seasonality, lang, "insight")}
            </p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
