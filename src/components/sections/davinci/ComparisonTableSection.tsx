"use client";

import { Container } from "@/components/shared/Container";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem, viewportOnce } from "@/lib/animations";
import { Check, X } from "lucide-react";

interface ComparisonTableSectionProps {
  dict: {
    badge: string;
    title: string;
    table: { headers: string[]; rows: Array<{ label: string; values: string[] }> };
    footer: string;
    footerHighlight: string;
  };
}

export function ComparisonTableSection({ dict }: ComparisonTableSectionProps) {
  // Column cards approach — each provider as a card
  const providers = dict.table.headers.slice(1); // skip empty first header

  return (
    <section className="py-16 md:py-20 bg-background">
      <Container>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer}
          >
            {/* Header */}
            <div className="text-center mb-12">
              <motion.span
                variants={staggerItem}
                className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-4 block"
              >
                {dict.badge}
              </motion.span>
              <motion.h2
                variants={staggerItem}
                className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight leading-[1.25]"
              >
                {dict.title}
              </motion.h2>
            </div>

            {/* Card-based comparison */}
            <motion.div
              variants={staggerItem}
              className="grid grid-cols-2 md:grid-cols-4 gap-3"
            >
              {providers.map((provider, colIdx) => {
                const isUs = colIdx === providers.length - 1;

                return (
                  <div
                    key={colIdx}
                    className={`rounded-xl p-5 transition-all duration-300 ${
                      isUs
                        ? "bg-primary/[0.06] border-2 border-primary/25 shadow-lg shadow-primary/5"
                        : "bg-[#141414] border border-white/[0.06] hover:border-white/[0.1]"
                    }`}
                  >
                    {/* Provider name */}
                    <h3
                      className={`text-sm font-semibold mb-5 pb-3 border-b ${
                        isUs
                          ? "text-primary border-primary/20"
                          : "text-foreground/70 border-white/[0.06]"
                      }`}
                    >
                      {provider}
                    </h3>

                    {/* Rows as feature list */}
                    <div className="space-y-3">
                      {dict.table.rows.map((row, rowIdx) => {
                        const value = row.values[colIdx];
                        const isPositive = value.startsWith("✓");
                        const isNegative = value.startsWith("✗");

                        return (
                          <div key={rowIdx}>
                            <p className="text-[10px] text-muted-foreground/40 uppercase tracking-wider mb-0.5">
                              {row.label}
                            </p>
                            <div className="flex items-center gap-1.5">
                              {isPositive ? (
                                <Check className={`w-3.5 h-3.5 flex-shrink-0 ${isUs ? "text-primary" : "text-emerald-400"}`} />
                              ) : isNegative ? (
                                <X className="w-3.5 h-3.5 text-red-400/50 flex-shrink-0" />
                              ) : null}
                              <span
                                className={`text-xs leading-snug ${
                                  isUs
                                    ? "text-primary font-medium"
                                    : isPositive
                                      ? "text-foreground/70"
                                      : isNegative
                                        ? "text-muted-foreground/50"
                                        : "text-muted-foreground/60"
                                }`}
                              >
                                {value.replace(/^[✓✗]\s*/, "")}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </motion.div>

            {/* Footer */}
            <motion.div
              variants={staggerItem}
              className="mt-10 text-center max-w-lg mx-auto"
            >
              <p className="text-sm text-muted-foreground leading-relaxed mb-1">
                {dict.footer}
              </p>
              <p className="text-sm font-semibold text-primary">
                {dict.footerHighlight}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
