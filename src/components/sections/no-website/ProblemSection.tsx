"use client";

import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem, viewportOnce } from "@/lib/animations";
import { Search, Trophy, UserX, Bot } from "lucide-react";

const problems = [
  {
    icon: Search,
    title: "Clients search online — you're not visible",
    description:
      "When someone in Oslo searches for 'carpenter near me', your competitors show up. You don't. You're losing jobs to less skilled craftsmen who simply have a website.",
  },
  {
    icon: Trophy,
    title: "Competition with websites wins",
    description:
      "A professional website signals credibility. Between two carpenters with similar skills, clients choose the one with online presence. It's that simple.",
  },
  {
    icon: UserX,
    title: "No website = no credibility",
    description:
      "Modern clients expect every legitimate business to have a website. Without one, you look outdated or even untrustworthy, no matter how skilled you are.",
  },
  {
    icon: Bot,
    title: "AI can't recommend you",
    description:
      "ChatGPT, Perplexity, and Google AI are becoming how people find services. They can only recommend businesses with proper websites. Facebook profiles don't count.",
  },
];

export function ProblemSection() {
  return (
    <section className="py-20 md:py-32 bg-[#141414]">
      <Container>
        <SectionHeading
          badge="The Problem"
          title="You're invisible to potential clients"
          subtitle="Here's what's happening while you rely only on word of mouth."
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
