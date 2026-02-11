"use client";

import { Container } from "@/components/shared/Container";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, staggerItem, viewportOnce } from "@/lib/animations";
import { DollarSign } from "lucide-react";
import { formatCpc } from "@/lib/reports/helpers";
import type { CpcDataItem } from "@/lib/reports/types";
import type { Locale } from "@/lib/i18n/config";

interface CpcSectionProps {
  cpcData: CpcDataItem[];
  lang: Locale;
  nicheLower: string;
  dict: {
    badge: string;
    title: string;
    subtitle: string;
  };
}

export function CpcSection({ cpcData, lang, nicheLower, dict }: CpcSectionProps) {
  const maxCpc = Math.max(...cpcData.map((d) => d.cpc));
  const subtitle = dict.subtitle.replaceAll("{nicheLower}", nicheLower);

  return (
    <section id="cpc" className="py-20 md:py-28 bg-gradient-to-b from-[#141414] to-[#0A0A0A]">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary mb-6">
            <DollarSign className="w-4 h-4" />
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
          className="max-w-2xl mx-auto space-y-2"
        >
          {cpcData.map((item) => {
            const width = (item.cpc / maxCpc) * 100;
            return (
              <motion.div
                key={item.keyword}
                variants={staggerItem}
                className="flex items-center gap-3"
              >
                <span className="w-36 sm:w-44 text-sm font-mono text-muted-foreground text-right shrink-0 truncate">
                  {item.keyword}
                </span>
                <div className="flex-1 h-7 bg-card rounded-lg overflow-hidden relative">
                  <div
                    className="h-full bg-gradient-to-r from-primary/40 to-primary/20 rounded-lg transition-all duration-500"
                    style={{ width: `${width}%` }}
                  />
                </div>
                <span className="w-16 text-sm font-mono text-primary font-semibold text-right shrink-0">
                  {formatCpc(item.cpc, lang)}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
