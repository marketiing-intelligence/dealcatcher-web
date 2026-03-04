"use client";

import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { SpotlightCard } from "@/components/ui/spotlight";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem, viewportOnce } from "@/lib/animations";
import { Bot, EyeOff, TrendingDown, MapPin } from "lucide-react";

interface AISearchSectionProps {
  dict: {
    badge: string;
    title: string;
    subtitle: string;
    stats: Array<{ value: number; suffix: string; label: string }>;
    problems: Array<{ title: string; description: string }>;
  };
}

const icons = [Bot, EyeOff, TrendingDown, MapPin];

export function AISearchSection({ dict }: AISearchSectionProps) {
  return (
    <section className="py-20 md:py-32 bg-[#141414] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

      <Container className="relative z-10">
        <SectionHeading
          badge={dict.badge}
          title={dict.title}
          subtitle={dict.subtitle}
          align="center"
        />

        {/* Stats row */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-16"
        >
          {dict.stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={staggerItem}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-2">
                <AnimatedCounter
                  value={stat.value}
                  duration={2}
                  delay={i * 0.15}
                  suffix={stat.suffix}
                />
              </div>
              <p className="text-sm md:text-base text-muted-foreground">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Problem cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="grid md:grid-cols-2 gap-6"
        >
          {dict.problems.map((problem, index) => {
            const Icon = icons[index];
            return (
              <motion.div key={problem.title} variants={staggerItem}>
                <SpotlightCard className="h-full">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold mb-2">
                    {problem.title}
                  </h3>
                  <p className="text-muted-foreground text-sm md:text-base">
                    {problem.description}
                  </p>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
