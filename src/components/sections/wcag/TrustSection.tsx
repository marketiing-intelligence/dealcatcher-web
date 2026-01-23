"use client";

import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem, viewportOnce } from "@/lib/animations";
import { Shield, RefreshCw, Scale, Check } from "lucide-react";

const trustIcons = [Scale, RefreshCw, Shield];

interface TrustSectionProps {
  dict: {
    badge: string;
    title: string;
    subtitle: string;
    items: Array<{ title: string; points: string[] }>;
  };
}

export function TrustSection({ dict }: TrustSectionProps) {
  return (
    <section className="py-20 md:py-32 bg-[#141414]">
      <Container>
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
          {dict.items.map((reason, index) => {
            const Icon = trustIcons[index];
            return (
              <motion.div
                key={reason.title}
                variants={staggerItem}
                className="group"
              >
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="text-xl md:text-2xl mb-4">{reason.title}</h3>

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
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
