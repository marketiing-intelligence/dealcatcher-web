"use client";

import { Container } from "@/components/shared/Container";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem, viewportOnce } from "@/lib/animations";

interface BenefitsSectionProps {
  dict: {
    badge: string;
    title: string;
    subtitle: string;
    subtitleSecond: string;
    subtitleThird: string;
    items: Array<{ number: string; title: string; description: string }>;
  };
}

export function BenefitsSection({ dict }: BenefitsSectionProps) {
  return (
    <section className="py-16 md:py-20 bg-[#0e0e0e]">
      <Container>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer}
          >
            {/* Header — centered, stacked */}
            <div className="text-center mb-14">
              <motion.span
                variants={staggerItem}
                className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-4 block"
              >
                {dict.badge}
              </motion.span>

              <motion.h2
                variants={staggerItem}
                className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight leading-[1.25] mb-6"
              >
                {dict.title}
              </motion.h2>

              <motion.div
                variants={staggerItem}
                className="max-w-xl mx-auto space-y-2"
              >
                <p className="text-sm text-muted-foreground leading-[1.7]">
                  {dict.subtitle}
                </p>
                <p className="text-sm text-muted-foreground leading-[1.7]">
                  {dict.subtitleSecond}
                </p>
                <p className="text-sm text-foreground font-medium leading-[1.7]">
                  {dict.subtitleThird}
                </p>
              </motion.div>
            </div>

            {/* 6 deliverable cards — 3x2 grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {dict.items.map((item, i) => (
                <motion.div
                  key={i}
                  variants={staggerItem}
                  className="group rounded-xl bg-[#141414] border border-white/[0.08] p-6 hover:border-primary/20 hover:bg-[#171717] transition-all duration-300"
                >
                  {/* Number badge */}
                  <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/15 flex items-center justify-center mb-4">
                    <span className="text-sm font-bold text-primary">
                      {item.number}
                    </span>
                  </div>

                  <h3 className="text-sm font-semibold mb-2 tracking-tight leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-sm text-muted-foreground leading-[1.7]">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
