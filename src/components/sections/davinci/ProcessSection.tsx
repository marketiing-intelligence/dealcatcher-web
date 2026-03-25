"use client";

import { Container } from "@/components/shared/Container";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem, viewportOnce } from "@/lib/animations";
import { Shield } from "lucide-react";

interface ProcessSectionProps {
  dict: {
    badge: string;
    title: string;
    steps: Array<{ number: string; title: string; description: string }>;
    guarantee: string;
  };
}

export function ProcessSection({ dict }: ProcessSectionProps) {
  return (
    <section className="py-16 md:py-20 bg-background">
      <Container>
        <div className="max-w-3xl mx-auto">
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

            {/* Steps */}
            <div className="space-y-0">
              {dict.steps.map((step, i) => (
                <motion.div
                  key={step.number}
                  variants={staggerItem}
                  className="group grid grid-cols-[3.5rem,1fr] gap-5 py-5 border-b border-white/[0.04] last:border-0 hover:bg-white/[0.01] -mx-4 px-4 rounded-lg transition-colors duration-200"
                >
                  {/* Number */}
                  <div className="text-3xl font-bold text-white/[0.06] group-hover:text-primary/25 transition-colors duration-400 leading-none pt-0.5 text-left">
                    {String(i + 1).padStart(2, "0")}
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="text-sm font-semibold tracking-tight mb-1 group-hover:text-primary transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-[1.7]">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Guarantee */}
            <motion.div
              variants={staggerItem}
              className="mt-10 rounded-xl bg-primary/[0.04] border border-primary/15 p-5 flex items-center gap-3 justify-center"
            >
              <Shield className="w-5 h-5 text-primary flex-shrink-0" />
              <p className="text-sm font-medium text-primary">
                {dict.guarantee}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
