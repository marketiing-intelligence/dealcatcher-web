"use client";

import { Container } from "@/components/shared/Container";
import { SpotlightCard } from "@/components/ui/spotlight";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem, viewportOnce } from "@/lib/animations";
import { Check } from "lucide-react";

interface ProblemSectionProps {
  dict: {
    badge: string;
    title: string;
    pains: Array<{
      title: string;
      description: string[];
    }>;
  };
}

export function ProblemSection({ dict }: ProblemSectionProps) {
  return (
    <section className="py-20 md:py-32 relative">
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

          {/* Pain point cards */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {dict.pains.map((pain, index) => (
                <motion.div key={index} variants={staggerItem}>
                  <SpotlightCard className="h-full">
                    <h3 className="text-xl md:text-2xl font-semibold [word-spacing:0.15em] mb-6 leading-tight">
                      {pain.title}
                    </h3>
                    <div className="space-y-3">
                      {pain.description.map((point, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="flex-shrink-0 mt-1">
                            <div className="w-5 h-5 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                              <Check className="w-3 h-3 text-red-500" />
                            </div>
                          </div>
                          <p className="text-muted-foreground leading-relaxed flex-1">
                            {point}
                          </p>
                        </div>
                      ))}
                    </div>
                  </SpotlightCard>
                </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
