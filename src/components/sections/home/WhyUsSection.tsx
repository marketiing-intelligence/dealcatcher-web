"use client";

import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SpotlightCard } from "@/components/ui/spotlight";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem, viewportOnce } from "@/lib/animations";
import { Rocket, Shield, Wrench, Check } from "lucide-react";

interface WhyUsSectionProps {
  dict: {
    badge: string;
    title: string;
    subtitle: string;
    reasons: Array<{
      title: string;
      points: string[];
    }>;
  };
}

const icons = [Rocket, Shield, Wrench];

export function WhyUsSection({ dict }: WhyUsSectionProps) {
  return (
    <section className="py-20 md:py-32 bg-[#141414] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

      <Container className="relative z-10">
        <SectionHeading
          badge={dict.badge}
          title={dict.title}
          subtitle={dict.subtitle}
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-8"
        >
          {dict.reasons.map((reason, index) => {
            const Icon = icons[index];

            return (
              <motion.div
                key={reason.title}
                variants={staggerItem}
              >
                <SpotlightCard className="h-full">
                  {/* Icon with glow */}
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary relative">
                    <Icon className="h-7 w-7" />
                    <div className="absolute inset-0 rounded-xl bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl md:text-2xl mb-4">{reason.title}</h3>

                  {/* Points */}
                  <ul className="space-y-3">
                    {reason.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-3 text-muted-foreground"
                      >
                        <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
