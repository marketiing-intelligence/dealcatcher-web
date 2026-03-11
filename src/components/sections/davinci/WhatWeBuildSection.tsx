"use client";

import { Container } from "@/components/shared/Container";
import { SpotlightCard } from "@/components/ui/spotlight";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem, viewportOnce } from "@/lib/animations";
import { Code, Brain, TrendingUp, Users, Globe, Workflow, Zap } from "lucide-react";

interface WhatWeBuildSectionProps {
  dict: {
    badge: string;
    title: string;
    services: Array<{
      title: string;
      description: string;
    }>;
    footer: string;
  };
}

const icons = [Code, Brain, TrendingUp, Users, Globe, Workflow, Zap];

export function WhatWeBuildSection({ dict }: WhatWeBuildSectionProps) {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-muted/30" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-primary/[0.04] blur-[120px] pointer-events-none" />

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

          {/* Service cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
            {dict.services.map((service, index) => {
              const Icon = icons[index];
              return (
                <motion.div key={index} variants={staggerItem}>
                  <SpotlightCard>
                    <div className="mb-5 inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 border border-primary/20">
                      <Icon className="h-7 w-7 text-primary" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-xl md:text-2xl font-semibold mb-4 leading-tight">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </SpotlightCard>
                </motion.div>
              );
            })}
          </div>

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
