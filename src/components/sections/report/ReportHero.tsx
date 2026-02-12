"use client";

import { Container } from "@/components/shared/Container";
import { motion } from "framer-motion";
import { fadeUp, staggerContainerSlow, staggerItem, viewportOnce } from "@/lib/animations";
import { formatNumber } from "@/lib/reports/helpers";
import { BarChart3 } from "lucide-react";
import type { ReportMeta } from "@/lib/reports/types";
import type { Locale } from "@/lib/i18n/config";

interface ReportHeroProps {
  meta: ReportMeta;
  lang: Locale;
  nicheLower: string;
  dict: {
    badge: string;
    titleSearches: string;
    titleFor: string;
    subtitle: string;
  };
}

export function ReportHero({ meta, lang, nicheLower, dict }: ReportHeroProps) {
  const titleFor = dict.titleFor
    .replaceAll("{nicheLower}", nicheLower)
    .replaceAll("{city}", meta.city);
  const subtitle = dict.subtitle
    .replaceAll("{nicheLower}", nicheLower)
    .replaceAll("{city}", meta.city);

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/5 rounded-full blur-[200px] pointer-events-none" />

      <Container className="relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainerSlow}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.span
            variants={staggerItem}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary mb-8"
          >
            <BarChart3 className="w-4 h-4" />
            {dict.badge}
          </motion.span>

          <motion.h1
            variants={staggerItem}
            className="text-4xl md:text-6xl lg:text-7xl font-clash font-semibold leading-[1.1] mb-6"
          >
            <span className="bg-gradient-to-r from-primary to-accent-hover bg-clip-text text-transparent">
              {formatNumber(meta.totalSearchVolume, lang)}
            </span>{" "}
            {dict.titleSearches}
            <br />
            <span className="text-muted-foreground text-2xl md:text-3xl lg:text-4xl font-normal mt-2 block">
              {titleFor}
            </span>
          </motion.h1>

          <motion.p
            variants={staggerItem}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            {subtitle}
          </motion.p>
        </motion.div>
      </Container>
    </section>
  );
}
