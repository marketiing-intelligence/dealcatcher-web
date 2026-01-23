"use client";

import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { motion, useScroll, useTransform } from "framer-motion";
import { staggerContainer, staggerItem, viewportOnce } from "@/lib/animations";
import { useRef } from "react";

interface ProcessSectionProps {
  dict: {
    badge: string;
    title: string;
    subtitle: string;
    steps: Array<{ number: string; title: string; description: string; duration: string }>;
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
    <section className="py-20 md:py-32">
      <Container>
        <SectionHeading
          badge={dict.badge}
          title={dict.title}
          subtitle={dict.subtitle}
        />

        <div ref={containerRef} className="relative">
          {/* Connecting line through all steps - background (gray) */}
          <div className="hidden md:block absolute top-8 left-8 right-8 h-px bg-border z-0" />

          {/* Connecting line through all steps - animated glow (primary) */}
          <motion.div
            className="hidden md:block absolute top-8 left-8 right-8 h-px z-0 origin-left"
            style={{
              width: lineWidth,
              background: "linear-gradient(90deg, var(--primary), var(--primary))",
              boxShadow: "0 0 10px var(--primary), 0 0 20px var(--primary), 0 0 30px var(--primary)",
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

                {/* Content */}
                <h3 className="text-xl mb-2">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {step.description}
                </p>

                {/* Duration badge */}
                <span className="inline-block rounded-full bg-card border border-border px-3 py-1 text-sm text-muted-foreground">
                  {step.duration}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
