"use client";

import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem, viewportOnce } from "@/lib/animations";
import { Scale, FileWarning, Eye, AlertCircle } from "lucide-react";

const problems = [
  {
    icon: Scale,
    title: "Norwegian law requires WCAG 2.0 AA",
    description:
      "The Forskrift om universell utforming av IKT-løsninger mandates that all websites must be accessible. This applies to both public and private sector businesses.",
  },
  {
    icon: FileWarning,
    title: "Digdir conducts audits and publishes results",
    description:
      "Tilsynet for universell utforming av IKT performs random website audits. Failed audits are published publicly, and you'll receive an order to fix the issues within a deadline.",
  },
  {
    icon: Eye,
    title: "97% of websites fail compliance checks",
    description:
      "The vast majority of Norwegian websites have accessibility issues. Your website likely has problems you're not aware of — most issues are invisible to untrained eyes.",
  },
  {
    icon: AlertCircle,
    title: "Your current site probably has issues",
    description:
      "Common problems include poor color contrast, missing alt texts, keyboard navigation issues, and improper form labels. These affect real users and violate the law.",
  },
];

export function ProblemSection() {
  return (
    <section className="py-20 md:py-32 bg-[#141414]">
      <Container>
        <SectionHeading
          badge="The Problem"
          title="What is WCAG and why does it matter?"
          subtitle="Web Content Accessibility Guidelines (WCAG) ensure websites are usable by people with disabilities. In Norway, it's not optional — it's the law."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="grid md:grid-cols-2 gap-6"
        >
          {problems.map((problem) => (
            <motion.div
              key={problem.title}
              variants={staggerItem}
              className="rounded-xl border border-border bg-card p-8 transition-all duration-300 hover:border-[#3F3F46]"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
                <problem.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl mb-3">{problem.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {problem.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
