"use client";

import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem, viewportOnce } from "@/lib/animations";
import { Map, Hammer, TrendingUp, ArrowRight } from "lucide-react";

const stepIcons = [Map, Hammer, TrendingUp];

interface NextStepsSectionProps {
  dict: {
    badge: string;
    title: string;
    subtitle: string;
    intro: string;
    services: Array<{
      name: string;
      price: string;
      description: string;
      features: string[];
    }>;
    footer: string;
  };
}

export function NextStepsSection({ dict }: NextStepsSectionProps) {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-muted/30" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <Container>
        <SectionHeading
          badge={dict.badge}
          title={dict.title}
          subtitle={dict.subtitle}
        />

        {/* Intro text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-lg text-muted-foreground leading-relaxed max-w-3xl mb-12"
        >
          {dict.intro}
        </motion.p>

        {/* Service journey cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-6 mb-12"
        >
          {dict.services.map((service, index) => {
            const Icon = stepIcons[index];
            return (
              <motion.div
                key={service.name}
                variants={staggerItem}
                className="relative rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm p-6 md:p-8 hover:border-primary/20 hover:bg-white/[0.04] transition-all duration-500 group"
              >
                {/* Step connection arrow (between cards) */}
                {index < dict.services.length - 1 && (
                  <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 items-center justify-center rounded-full bg-primary/10 border border-primary/20">
                    <ArrowRight className="w-3 h-3 text-primary" />
                  </div>
                )}

                {/* Icon */}
                <div className="mb-5 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 group-hover:bg-primary/15 transition-colors">
                  <Icon className="h-6 w-6 text-primary" />
                </div>

                {/* Name */}
                <h3 className="text-xl font-semibold mb-2">{service.name}</h3>

                {/* Price */}
                <div className="text-2xl font-bold text-primary mb-3">
                  {service.price}
                </div>

                {/* Description */}
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-1.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm p-6 md:p-8 max-w-3xl"
        >
          <p className="text-base md:text-lg text-foreground leading-relaxed border-l-4 border-primary pl-6">
            {dict.footer}
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
