"use client";

import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem, viewportOnce } from "@/lib/animations";
import { Bot, Scale, TrendingUp, Sparkles, BadgeDollarSign, Check } from "lucide-react";

const solutions = [
  {
    icon: Bot,
    title: "AI Search Ready",
    description: "Built so ChatGPT, Perplexity, and Google AI find and recommend your business when clients ask for help.",
    features: ["Semantic HTML structure", "Structured data markup", "Content optimized for AI"],
  },
  {
    icon: TrendingUp,
    title: "Built to Convert",
    description: "Strategic design that turns website visitors into paying customers. Every element is intentional.",
    features: ["Clear value proposition", "Strong call-to-actions", "Social proof & trust signals"],
  },
  {
    icon: Scale,
    title: "WCAG Compliant",
    description: "100% compliant with Norwegian accessibility law. No risk of fines from Digdir.",
    features: ["WCAG 2.0 AA certified", "Monthly compliance checks", "Ongoing monitoring"],
  },
  {
    icon: BadgeDollarSign,
    title: "Charge Higher Prices",
    description: "A professional website builds credibility. Clients trust you more and pay premium rates.",
    features: ["Professional image", "Showcase your best work", "Stand out from competition"],
  },
  {
    icon: Sparkles,
    title: "Zero Hassle",
    description: "15 minutes for the brief. We handle design, development, hosting, and maintenance.",
    features: ["Quick 15-min brief", "We do everything", "Ongoing support included"],
  },
];

export function SolutionSection() {
  return (
    <section className="py-20 md:py-32">
      <Container>
        <SectionHeading
          badge="What You Get"
          title="A website that brings clients"
          subtitle="Not just a pretty page. A digital asset that makes you money."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.title}
              variants={staggerItem}
              className={`rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-[#3F3F46] hover:-translate-y-1 ${
                index === 4 ? "md:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <solution.icon className="h-5 w-5" />
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
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
