"use client";

import { Container } from "@/components/shared/Container";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, staggerItem, viewportOnce } from "@/lib/animations";
import { Check, X } from "lucide-react";

interface ComparisonItem {
  provider: string;
  price: string;
  time: string;
  meetings: string;
  support: string;
  highlight?: boolean;
}

interface PriceComparisonSectionProps {
  dict: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    comparison: ComparisonItem[];
    labels: {
      price: string;
      time: string;
      meetings: string;
      support: string;
    };
  };
}

export function PriceComparisonSection({ dict }: PriceComparisonSectionProps) {
  return (
    <section className="py-20 md:py-32 bg-[#0A0A0A] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <Container className="relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary mb-6">
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
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          {dict.comparison.map((item, index) => (
            <motion.div
              key={item.provider}
              variants={staggerItem}
              className={`relative rounded-2xl p-6 ${
                item.highlight
                  ? "bg-primary/10 border-2 border-primary"
                  : "bg-card border border-border"
              }`}
            >
              {item.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                  BEST VALUE
                </div>
              )}

              <h3 className={`text-xl font-semibold mb-6 text-center ${
                item.highlight ? "text-primary" : "text-foreground"
              }`}>
                {item.provider}
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-border/50">
                  <span className="text-muted-foreground text-sm">{dict.labels.price}</span>
                  <span className={`font-semibold ${item.highlight ? "text-primary text-lg" : "text-foreground"}`}>
                    {item.price}
                  </span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-border/50">
                  <span className="text-muted-foreground text-sm">{dict.labels.time}</span>
                  <span className={`font-medium ${item.highlight ? "text-green-500" : "text-foreground"}`}>
                    {item.time}
                  </span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-border/50">
                  <span className="text-muted-foreground text-sm">{dict.labels.meetings}</span>
                  <span className={`font-medium ${item.highlight ? "text-green-500" : "text-foreground"}`}>
                    {item.meetings}
                  </span>
                </div>

                <div className="flex justify-between items-center py-2">
                  <span className="text-muted-foreground text-sm">{dict.labels.support}</span>
                  <span className="font-medium flex items-center gap-1">
                    {item.highlight ? (
                      <>
                        <Check className="w-4 h-4 text-green-500" />
                        <span className="text-green-500">{item.support}</span>
                      </>
                    ) : item.support === "Limited" || item.support === "Extra cost" ? (
                      <>
                        <X className="w-4 h-4 text-red-500" />
                        <span className="text-red-500">{item.support}</span>
                      </>
                    ) : (
                      <span className="text-foreground">{item.support}</span>
                    )}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
