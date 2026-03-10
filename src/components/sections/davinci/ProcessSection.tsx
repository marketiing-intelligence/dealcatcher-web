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

          <div ref={containerRef} className="relative">
            {/* Connecting line through all steps - background (gray) */}
            <div className="hidden md:block absolute top-8 left-8 right-8 h-px bg-border z-0" />

            {/* Connecting line through all steps - animated glow (amber) */}
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
              className="grid md:grid-cols-4 gap-8 relative z-10"
            >
              {dict.steps.map((step, index) => (
                <motion.div key={step.number} variants={staggerItem} className="relative">
                  {/* Step number with glow */}
                  <motion.div
                    className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary bg-background text-primary text-xl font-semibold relative"
                    whileInView={{
                      boxShadow: [
                        "0 0 0 0 rgba(16, 185, 129, 0)",
                        "0 0 20px 2px rgba(16, 185, 129, 0.4)",
                        "0 0 10px 1px rgba(16, 185, 129, 0.2)",
                      ],
                    }}
                    transition={{
                      duration: 1.5,
                      delay: index * 0.2,
                      ease: "easeOut",
                    }}
                    viewport={{ once: true }}
                  >
                    {/* Inner glow circle */}
                    <div className="absolute inset-0 rounded-full bg-primary/10" />
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
                    <p className="text-sm text-primary italic leading-relaxed mt-4 border-l-2 border-primary pl-4">
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
