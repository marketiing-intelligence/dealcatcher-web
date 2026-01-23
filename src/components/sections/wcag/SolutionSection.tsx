"use client";

import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem, viewportOnce } from "@/lib/animations";
import { Search, FileText, Wrench, Check } from "lucide-react";

const solutionIcons = [Search, FileText, Wrench];

interface SolutionSectionProps {
  dict: {
    badge: string;
    title: string;
    subtitle: string;
    items: Array<{ title: string; description: string; features: string[] }>;
  };
}

export function SolutionSection({ dict }: SolutionSectionProps) {
  return (
    <section className="py-20 md:py-32">
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
          {dict.items.map((solution, index) => {
            const Icon = solutionIcons[index];
            return (
              <motion.div
                key={solution.title}
                variants={staggerItem}
                className="relative rounded-xl border border-border bg-card p-8 transition-all duration-300 hover:border-[#3F3F46] hover:-translate-y-1"
              >
                {/* Step number */}
                <div className="absolute -top-3 -left-3 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                  {index + 1}
                </div>

                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl mb-3">{solution.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {solution.description}
                </p>
                <ul className="space-y-2">
                  {solution.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="h-4 w-4 text-primary" />
                      {feature}
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
