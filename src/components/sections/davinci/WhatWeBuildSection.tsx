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

          {/* Service cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
            {dict.services.map((service, index) => {
              const Icon = icons[index];
              return (
                <motion.div key={index} variants={staggerItem}>
                  <SpotlightCard>
                    <div className="mb-4">
                      <Icon className="h-10 w-10 text-primary" strokeWidth={1.5} />
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
          <motion.p
            variants={staggerItem}
            className="text-base md:text-lg text-foreground leading-relaxed border-l-4 border-primary pl-6 max-w-3xl"
          >
            {dict.footer}
          </motion.p>
        </motion.div>
      </Container>
    </section>
  );
}
