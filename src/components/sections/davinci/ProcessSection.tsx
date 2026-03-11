"use client";

import { Container } from "@/components/shared/Container";
import { motion, useScroll, useTransform } from "framer-motion";
import { staggerContainer, staggerItem, viewportOnce } from "@/lib/animations";
import { useRef } from "react";

interface ProcessSectionProps {
  dict: {
    badge: string;
    title: string;
    steps: Array<{
      number: string;
      title: string;
      description: string;
      note?: string;
    }>;
  };
}

export function ProcessSection({ dict }: ProcessSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "center center"],
  });

  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

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

          <div ref={containerRef} className="relative">
            {/* Connecting line through all steps - background (gray) */}
            <div className="hidden md:block absolute top-8 left-8 right-8 h-px bg-border z-0" />

            {/* Connecting line through all steps - animated glow (gold) */}
            <motion.div
              className="hidden md:block absolute top-8 left-8 right-8 h-px z-0 origin-left"
              style={{
                width: lineWidth,
                background: "linear-gradient(90deg, var(--primary), var(--primary))",
                boxShadow:
                  "0 0 10px var(--primary), 0 0 20px var(--primary), 0 0 30px var(--primary)",
              }}
            />

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={staggerContainer}
              className="grid md:grid-cols-4 gap-6 relative z-10"
            >
              {dict.steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  variants={staggerItem}
                  className="relative rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm p-6 hover:border-primary/20 hover:bg-white/[0.04] transition-all duration-500"
                >
                  {/* Step number with glow */}
                  <motion.div
                    className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary/60 bg-primary/10 text-primary text-xl font-semibold relative"
                    whileInView={{
                      boxShadow: [
                        "0 0 0 0 rgba(229, 168, 75, 0)",
                        "0 0 20px 2px rgba(229, 168, 75, 0.3)",
                        "0 0 10px 1px rgba(229, 168, 75, 0.15)",
                      ],
                    }}
                    transition={{
                      duration: 1.5,
                      delay: index * 0.2,
                      ease: "easeOut",
                    }}
                    viewport={{ once: true }}
                  >
                    <span className="relative z-10">{step.number}</span>
                  </motion.div>

                  <h3 className="text-xl md:text-2xl font-semibold mb-3 leading-tight">
                    {step.title}
                  </h3>

                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {step.description}
                  </p>

                  {/* Note (only for step 2) */}
                  {step.note && (
                    <p className="text-sm text-primary/80 italic leading-relaxed mt-4 border-l-2 border-primary/40 pl-4">
                      {step.note}
                    </p>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
