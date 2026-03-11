"use client";

import { Container } from "@/components/shared/Container";
import { SpotlightCard } from "@/components/ui/spotlight";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem, viewportOnce } from "@/lib/animations";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";

interface BenefitsSectionProps {
  lang: Locale;
  dict: {
    badge: string;
    title: string;
    items: Array<{
      number: string;
      title: string;
      description: string;
    }>;
    cta: string;
    ctaNote: string;
  };
}

export function BenefitsSection({ lang, dict }: BenefitsSectionProps) {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-primary/[0.04] blur-[100px] pointer-events-none" />

      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
        >
          {/* Badge */}
          <motion.span
            variants={staggerItem}
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary mb-6"
          >
            {dict.badge}
          </motion.span>

          {/* Title */}
          <motion.h2
            variants={staggerItem}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold [word-spacing:0.15em] mb-12 md:mb-16 max-w-4xl leading-tight"
          >
            {dict.title}
          </motion.h2>

          {/* Benefit cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
            {dict.items.map((item, index) => (
              <motion.div key={index} variants={staggerItem}>
                <SpotlightCard>
                  <div className="mb-4">
                    <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 text-2xl font-semibold text-primary">
                      {item.number}
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold mb-4 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div variants={staggerItem} className="text-center">
            <div className="mb-4">
              <Button
                asChild
                size="lg"
                className="group relative bg-primary hover:bg-primary/90 text-primary-foreground h-14 md:h-16 px-8 md:px-10 text-base md:text-lg font-medium overflow-hidden w-full sm:w-auto shadow-[0_0_30px_rgba(229,168,75,0.2)] hover:shadow-[0_0_40px_rgba(229,168,75,0.35)] transition-shadow duration-500"
              >
                <Link href={`/${lang}#xray-form`}>
                  <span className="absolute inset-0 bg-gradient-to-r from-primary via-accent-hover to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="relative flex items-center gap-2">
                    {dict.cta}
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">{dict.ctaNote}</p>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
