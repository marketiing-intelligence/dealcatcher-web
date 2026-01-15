"use client";

import { Container } from "@/components/shared/Container";
import { motion } from "framer-motion";
import { staggerContainerSlow, staggerItem, viewportOnce } from "@/lib/animations";
import { Sparkles } from "lucide-react";

export function PortfolioHero() {
  return (
    <section className="pt-12 pb-16 md:pt-20 md:pb-24">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainerSlow}
          className="text-center max-w-3xl mx-auto"
        >
          {/* Badge */}
          <motion.div variants={staggerItem} className="mb-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <Sparkles className="h-4 w-4" />
              Template Gallery
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={staggerItem}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
          >
            Premium templates for{" "}
            <span className="text-primary">Norwegian businesses</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={staggerItem}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed"
          >
            Every design is AI-ready, WCAG compliant, and built to convert
            visitors into customers. Click any template to see it live.
          </motion.p>
        </motion.div>
      </Container>
    </section>
  );
}
