"use client";

import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem, viewportOnce } from "@/lib/animations";
import { Compass, Microscope, Layers, Check } from "lucide-react";

const solutionIcons = [Compass, Microscope, Layers];

interface SolutionSectionProps {
  dict: {
    badge: string;
    title: string;
    subtitle: string;
    levels: Array<{
      name: string;
      price: string;
      duration: string;
      deliverable: string;
      description: string;
      features: string[];
      popular?: boolean;
    }>;
    footer?: string;
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
          className="grid md:grid-cols-3 gap-6"
        >
          {dict.levels.map((level, index) => {
            const Icon = solutionIcons[index];
            return (
              <motion.div
                key={level.name}
                variants={staggerItem}
                className={`rounded-xl border ${level.popular ? 'border-primary bg-primary/5' : 'border-border bg-card'} p-6 transition-all duration-300 hover:border-primary/50 hover:-translate-y-1 relative`}
              >
                {level.popular && (
                  <div className="absolute -top-3 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                    Najpopularniejszy
                  </div>
                )}
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{level.name}</h3>
                <div className="text-2xl font-bold text-primary mb-1">
                  {level.price}
                </div>
                <div className="text-sm text-muted-foreground mb-3">{level.duration}</div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {level.description}
                </p>
                <ul className="space-y-1.5">
                  {level.features.map((feature) => (
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

        {dict.footer && (
          <p className="text-center text-sm text-muted-foreground mt-8 max-w-2xl mx-auto">
            {dict.footer}
          </p>
        )}
      </Container>
    </section>
  );
}
