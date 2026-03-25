"use client";

import { Container } from "@/components/shared/Container";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem, viewportOnce } from "@/lib/animations";

interface AdvantageSectionProps {
  dict: {
    intro: string;
    highlight: string;
    subtitle: string;
    items: Array<{ number: string; title: string; description: string }>;
  };
}

export function AdvantageSection({ dict }: AdvantageSectionProps) {
  return (
    <section className="py-16 md:py-20 bg-background">
      <Container>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer}
          >
            {/* Intro + Highlight */}
            <div className="max-w-2xl mb-14">
              <motion.p
                variants={staggerItem}
                className="text-sm md:text-base text-muted-foreground leading-[1.8] mb-4"
              >
                {dict.intro}
              </motion.p>
              <motion.p
                variants={staggerItem}
                className="text-lg md:text-xl font-semibold tracking-tight text-primary leading-snug mb-6"
              >
                {dict.highlight}
              </motion.p>
              <motion.p
                variants={staggerItem}
                className="text-sm text-muted-foreground leading-[1.7]"
              >
                {dict.subtitle}
              </motion.p>
            </div>

            {/* 6 cards — 2x3 grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {dict.items.map((item, i) => (
                <motion.div
                  key={i}
                  variants={staggerItem}
                  className="rounded-xl bg-[#141414] border border-white/[0.08] p-6 hover:border-primary/20 hover:bg-[#171717] transition-all duration-300"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/15 flex items-center justify-center mb-4">
                    <span className="text-xs font-bold text-primary">{item.number}</span>
                  </div>
                  <h3 className="text-sm font-semibold mb-2 tracking-tight">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-[1.7]">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
