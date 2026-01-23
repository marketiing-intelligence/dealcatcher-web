"use client";

import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem, viewportOnce } from "@/lib/animations";
import { Search, Trophy, UserX, Bot } from "lucide-react";

const problemIcons = [Search, Trophy, UserX, Bot];

interface ProblemSectionProps {
  dict: {
    badge: string;
    title: string;
    subtitle: string;
    items: Array<{ title: string; description: string }>;
  };
}

export function ProblemSection({ dict }: ProblemSectionProps) {
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
          className="grid md:grid-cols-2 gap-6"
        >
          {dict.items.map((problem, index) => {
            const Icon = problemIcons[index];
            return (
              <motion.div
                key={problem.title}
                variants={staggerItem}
                className="rounded-xl border border-border bg-card p-8 transition-all duration-300 hover:border-[#3F3F46]"
              >
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl mb-3">{problem.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {problem.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
