"use client";

import { Container } from "@/components/shared/Container";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, staggerItem, viewportOnce } from "@/lib/animations";
import { Search, DollarSign, Building2, MapPin } from "lucide-react";
import type { ReportMetrics } from "@/lib/reports/types";

interface MetricsStripProps {
  metrics: ReportMetrics;
  dict: {
    keywords: string;
    avgCpc: string;
    topClinics: string;
    mapsShare: string;
    explainer?: string;
  };
}

export function MetricsStrip({ metrics, dict }: MetricsStripProps) {
  const items = [
    { icon: Search, value: metrics.keywordCount.toString(), label: dict.keywords },
    { icon: DollarSign, value: `${metrics.avgCpc.toFixed(2)} kr`, label: dict.avgCpc },
    { icon: Building2, value: metrics.topClinicsCount.toString(), label: dict.topClinics },
    { icon: MapPin, value: `${metrics.mapsClickShare}%`, label: dict.mapsShare },
  ];

  return (
    <section className="py-6 border-y border-border bg-card/30">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
        >
          {items.map((item) => (
            <motion.div
              key={item.label}
              variants={staggerItem}
              className="flex items-center gap-3 justify-center md:justify-start"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-lg font-semibold font-clash">{item.value}</div>
                <div className="text-xs text-muted-foreground">{item.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        {dict.explainer && (
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeUp}
            className="text-xs text-muted-foreground/70 text-center mt-4 max-w-2xl mx-auto"
          >
            {dict.explainer}
          </motion.p>
        )}
      </Container>
    </section>
  );
}
