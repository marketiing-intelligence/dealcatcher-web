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
  // Icons for comparison columns: [empty, Consultant, Agency, Software House, Davinci]
  const columnIcons = [null, User, Building2, Code, Sparkles];

  return (
    <section className="py-20 md:py-32 relative bg-muted/30">
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
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background/50 px-4 py-1.5 text-sm font-medium text-foreground mb-6"
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
          <motion.div variants={staggerItem} className="mb-12 overflow-x-auto rounded-lg border border-border">
            <table className="w-full border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b-2 border-border bg-background/50">
                  {dict.table.headers.map((header, index) => {
                    const Icon = columnIcons[index];
                    const isLast = index === dict.table.headers.length - 1;
                    const isFirst = index === 0;

                    return (
                      <th
                        key={index}
                        className={`py-5 px-5 font-semibold ${
                          isLast
                            ? "text-primary bg-primary/10 border-l-2 border-primary/30"
                            : isFirst
                              ? "text-muted-foreground text-sm"
                              : "text-foreground"
                        }`}
                      >
                        {Icon ? (
                          <div className="flex items-center gap-2">
                            <div className={`flex items-center justify-center w-8 h-8 rounded-lg ${
                              isLast ? "bg-primary/20" : "bg-muted"
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
                    className={`border-b border-border/50 transition-colors ${
                      rowIndex % 2 === 0 ? "bg-background/30" : "bg-background/50"
                    } hover:bg-background`}
                  >
                    <td className="py-4 px-5 font-medium text-sm align-top text-muted-foreground">
                      {row.label}
                    </td>
                    {row.values.map((value, valueIndex) => (
                      <td
                        key={valueIndex}
                        className={`py-4 px-5 text-sm leading-relaxed ${
                          valueIndex === row.values.length - 1
                            ? "font-semibold text-primary bg-primary/5 border-l-2 border-primary/30"
                            : "text-muted-foreground"
                        }`}
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
          <motion.p
            variants={staggerItem}
            className="text-base md:text-lg text-foreground leading-relaxed border-l-4 border-primary pl-6"
          >
            {dict.footer}
          </motion.p>
        </motion.div>
      </Container>
    </section>
  );
}
