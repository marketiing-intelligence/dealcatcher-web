"use client";

import { Container } from "@/components/shared/Container";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, staggerItem, viewportOnce, cardHover } from "@/lib/animations";
import { Lightbulb, FileText, Star, Globe, Clock } from "lucide-react";
import { t } from "@/lib/reports/types";
import type { Insight } from "@/lib/reports/types";
import type { Locale } from "@/lib/i18n/config";

const iconMap: Record<string, typeof FileText> = {
  "file-text": FileText,
  star: Star,
  globe: Globe,
  clock: Clock,
};

const colorMap: Record<string, string> = {
  blue: "text-blue-400 bg-blue-400/10 border-blue-400/20",
  amber: "text-amber-400 bg-amber-400/10 border-amber-400/20",
  green: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  purple: "text-purple-400 bg-purple-400/10 border-purple-400/20",
};

interface InsightsSectionProps {
  insights: Insight[];
  lang: Locale;
  city: string;
  dict: {
    badge: string;
    title: string;
    subtitle: string;
  };
}

export function InsightsSection({ insights, lang, city, dict }: InsightsSectionProps) {
  const title = dict.title.replaceAll("{city}", city);
  const subtitle = dict.subtitle.replaceAll("{city}", city);

  return (
    <section id="insights" className="py-20 md:py-28 bg-gradient-to-b from-[#0A0A0A] to-[#141414]">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary mb-6">
            <Lightbulb className="w-4 h-4" />
            {dict.badge}
          </span>
          <h2 className="mb-4">{title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto"
        >
          {insights.map((insight, i) => {
            const Icon = iconMap[insight.icon] ?? FileText;
            const colors = colorMap[insight.color] ?? colorMap.blue;

            return (
              <motion.div
                key={i}
                variants={staggerItem}
                whileHover={cardHover}
                className="bg-card border border-border rounded-2xl p-6 group"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border ${colors}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-base font-semibold">{t(insight, lang, "title")}</h3>
                      <span className="text-xs font-mono text-primary bg-primary/10 px-2 py-0.5 rounded-full shrink-0 ml-2">
                        {insight.statValue}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {t(insight, lang, "text")}
                    </p>
                    <p className="text-xs text-muted-foreground/60 mt-2">
                      {insight.statValue} {insight.statLabel}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
