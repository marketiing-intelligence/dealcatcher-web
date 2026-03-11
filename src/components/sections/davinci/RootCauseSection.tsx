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
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-muted/30" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

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
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary mb-6"
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

          {/* Emphasis - highlighted pull quote with glow */}
          <motion.div
            variants={staggerItem}
            className="relative my-16 p-8 md:p-12 rounded-2xl border border-primary/20 overflow-hidden backdrop-blur-sm"
            style={{
              background: "linear-gradient(135deg, rgba(229, 168, 75, 0.1) 0%, rgba(229, 168, 75, 0.03) 50%, transparent 100%)",
              boxShadow: "0 0 60px rgba(229, 168, 75, 0.08), inset 0 1px 0 rgba(255,255,255,0.05)",
            }}
          >
            {/* Decorative icon */}
            <div className="absolute top-6 right-6 opacity-[0.07]">
              <Lightbulb className="w-32 h-32 text-primary" />
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
