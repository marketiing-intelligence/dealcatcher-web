"use client";

import { Container } from "@/components/shared/Container";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem, viewportOnce } from "@/lib/animations";
import { Lightbulb, ArrowRight } from "lucide-react";

interface RootCauseSectionProps {
  dict: {
    badge: string;
    title: string;
    paragraphs: string[];
    emphasis: string;
    conclusion: string;
  };
}

export function RootCauseSection({ dict }: RootCauseSectionProps) {
  return (
    <section className="py-20 md:py-32 relative bg-muted/30">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="max-w-4xl mx-auto"
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
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold [word-spacing:0.15em] mb-16 leading-tight"
          >
            {dict.title}
          </motion.h2>

          {/* Paragraphs with visual separators */}
          <div className="space-y-8 mb-12">
            {dict.paragraphs.map((paragraph, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                className="relative pl-6 md:pl-8 border-l-2 border-primary/30"
              >
                <div className="absolute -left-2 top-2 w-4 h-4 rounded-full bg-primary/20 border-2 border-primary" />
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                  {paragraph}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Emphasis - highlighted pull quote */}
          <motion.div
            variants={staggerItem}
            className="relative my-16 p-8 md:p-12 rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 overflow-hidden"
          >
            {/* Decorative icon */}
            <div className="absolute top-6 right-6 opacity-10">
              <Lightbulb className="w-24 h-24 text-primary" />
            </div>

            <div className="relative z-10">
              <ArrowRight className="w-8 h-8 text-primary mb-4" />
              <p className="text-2xl md:text-3xl lg:text-4xl font-semibold text-primary leading-tight">
                {dict.emphasis}
              </p>
            </div>
          </motion.div>

          {/* Conclusion */}
          <motion.p
            variants={staggerItem}
            className="text-lg md:text-xl text-foreground leading-relaxed text-center max-w-3xl mx-auto"
          >
            {dict.conclusion}
          </motion.p>
        </motion.div>
      </Container>
    </section>
  );
}
