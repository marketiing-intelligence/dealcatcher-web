"use client";

import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem, viewportOnce } from "@/lib/animations";
import { Search, FileText, Wrench, Check } from "lucide-react";

const solutions = [
  {
    icon: Search,
    title: "Free WCAG Audit",
    description: "We scan your website and identify every accessibility issue.",
    features: ["Automated scanning", "Manual review", "Detailed findings"],
  },
  {
    icon: FileText,
    title: "Detailed Report",
    description: "You receive a clear report with specific problems and their locations.",
    features: ["Issue severity", "Exact locations", "Legal implications"],
  },
  {
    icon: Wrench,
    title: "Complete Rebuild",
    description: "We build you a new website that's fully compliant from the ground up.",
    features: ["WCAG 2.0 AA", "AI Search Ready", "Built to convert"],
  },
];

export function SolutionSection() {
  return (
    <section className="py-20 md:py-32">
      <Container>
        <SectionHeading
          badge="The Solution"
          title="We audit, report, and rebuild"
          subtitle="A complete solution to get your website compliant and future-ready."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-8"
        >
          {solutions.map((solution, index) => (
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
                <solution.icon className="h-6 w-6" />
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
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
