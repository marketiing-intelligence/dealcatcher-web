"use client";

import { Container } from "@/components/shared/Container";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem, viewportOnce } from "@/lib/animations";
import { User, Building2, Code, Sparkles } from "lucide-react";

interface ComparisonTableSectionProps {
  dict: {
    badge: string;
    title: string;
    table: {
      headers: string[];
      rows: Array<{
        label: string;
        values: string[];
      }>;
    };
    footer: string;
  };
}

export function ComparisonTableSection({ dict }: ComparisonTableSectionProps) {
  const columnIcons = [null, User, Building2, Code, Sparkles];

  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-muted/30" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
        >
          {/* Badge */}
          <motion.span
            variants={staggerItem}
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary mb-6"
          >
            {dict.badge}
          </motion.span>

          {/* Title */}
          <motion.h2
            variants={staggerItem}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold [word-spacing:0.15em] mb-12 md:mb-16 max-w-4xl leading-tight"
          >
            {dict.title}
          </motion.h2>

          {/* Comparison table */}
          <motion.div
            variants={staggerItem}
            className="mb-12 overflow-x-auto rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm"
          >
            <table className="w-full border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  {dict.table.headers.map((header, index) => {
                    const Icon = columnIcons[index];
                    const isLast = index === dict.table.headers.length - 1;
                    const isFirst = index === 0;

                    return (
                      <th
                        key={index}
                        className={`py-5 px-5 font-semibold text-left ${
                          isLast
                            ? "text-primary border-l border-primary/20"
                            : isFirst
                              ? "text-muted-foreground text-sm"
                              : "text-foreground"
                        }`}
                        style={isLast ? { background: "rgba(229, 168, 75, 0.06)" } : undefined}
                      >
                        {Icon ? (
                          <div className="flex items-center gap-2">
                            <div className={`flex items-center justify-center w-8 h-8 rounded-lg ${
                              isLast ? "bg-primary/15 border border-primary/20" : "bg-white/[0.04] border border-white/[0.06]"
                            }`}>
                              <Icon className={`w-4 h-4 ${isLast ? "text-primary" : "text-muted-foreground"}`} />
                            </div>
                            <span>{header}</span>
                          </div>
                        ) : (
                          header
                        )}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {dict.table.rows.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors duration-300"
                  >
                    <td className="py-4 px-5 font-medium text-sm align-top text-muted-foreground">
                      {row.label}
                    </td>
                    {row.values.map((value, valueIndex) => (
                      <td
                        key={valueIndex}
                        className={`py-4 px-5 text-sm leading-relaxed ${
                          valueIndex === row.values.length - 1
                            ? "font-semibold text-primary border-l border-primary/20"
                            : "text-muted-foreground"
                        }`}
                        style={valueIndex === row.values.length - 1 ? { background: "rgba(229, 168, 75, 0.04)" } : undefined}
                      >
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          {/* Footer */}
          <motion.div
            variants={staggerItem}
            className="rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm p-6 md:p-8 max-w-3xl"
          >
            <p className="text-base md:text-lg text-foreground leading-relaxed border-l-4 border-primary pl-6">
              {dict.footer}
            </p>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
