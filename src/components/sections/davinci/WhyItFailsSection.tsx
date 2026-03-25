"use client";

import { Container } from "@/components/shared/Container";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem, viewportOnce } from "@/lib/animations";

interface WhyItFailsSectionProps {
  dict: {
    title: string;
    blocks: string[];
    bridge: string[];
    bridgeKey: string;
    conclusion: string;
    conclusionHighlight: string;
  };
}

export function WhyItFailsSection({ dict }: WhyItFailsSectionProps) {
  return (
    <section className="py-16 md:py-20 bg-[#0e0e0e]">
      <Container>
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer}
          >
            {/* Title */}
            <motion.h2
              variants={staggerItem}
              className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight leading-[1.25] mb-10"
            >
              {dict.title}
            </motion.h2>

            {/* Blocks — each as a distinct paragraph */}
            <div className="space-y-6 mb-14">
              {dict.blocks.map((block, i) => (
                <motion.p
                  key={i}
                  variants={staggerItem}
                  className={`text-sm md:text-base leading-[1.8] ${
                    i === dict.blocks.length - 1
                      ? "text-foreground font-medium"
                      : "text-muted-foreground"
                  }`}
                >
                  {block}
                </motion.p>
              ))}
            </div>

            {/* Bridge — what others do wrong */}
            <div className="space-y-3 mb-12">
              {dict.bridge.map((line, i) => (
                <motion.p
                  key={i}
                  variants={staggerItem}
                  className="text-sm text-muted-foreground leading-relaxed pl-4 border-l-2 border-white/[0.06]"
                >
                  {line}
                </motion.p>
              ))}
            </div>

            {/* Key insight */}
            <motion.div
              variants={staggerItem}
              className="border-l-2 border-primary/30 pl-6 py-3 mb-14"
            >
              <p className="text-lg md:text-xl font-semibold tracking-tight">
                {dict.bridgeKey}
              </p>
            </motion.div>

            {/* Conclusion */}
            <motion.div
              variants={staggerItem}
              className="text-center py-10 border-y border-white/[0.04]"
            >
              <p className="text-sm text-muted-foreground mb-2">
                {dict.conclusion}
              </p>
              <p className="text-xl md:text-2xl font-semibold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                {dict.conclusionHighlight}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
