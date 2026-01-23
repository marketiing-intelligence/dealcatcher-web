"use client";

import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem, viewportOnce } from "@/lib/animations";
import { Bot, Scale, TrendingUp, Sparkles, BadgeDollarSign, Check } from "lucide-react";

const solutionIcons = [Bot, TrendingUp, Scale, BadgeDollarSign, Sparkles];

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
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {dict.items.map((solution, index) => {
            const Icon = solutionIcons[index];
            return (
              <motion.div
                key={solution.title}
                variants={staggerItem}
                className={`rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-[#3F3F46] hover:-translate-y-1 ${
                  index === 4 ? "md:col-span-2 lg:col-span-1" : ""
                }`}
              >
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{solution.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {solution.description}
                </p>
                <ul className="space-y-1.5">
                  {solution.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Check className="h-3.5 w-3.5 text-primary" />
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
