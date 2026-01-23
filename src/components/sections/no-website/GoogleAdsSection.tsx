"use client";

import { Container } from "@/components/shared/Container";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, staggerItem, viewportOnce } from "@/lib/animations";
import { Search, TrendingUp, Target, BarChart3, ArrowRight } from "lucide-react";

const benefitIcons = [Search, Target, TrendingUp, BarChart3];

interface GoogleAdsSectionProps {
  dict: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    howItWorks: {
      title: string;
      description: string;
      steps: string[];
    };
    example: {
      label: string;
      query: string;
      adLabel: string;
      adTitle: string;
      adDescription: string;
    };
    benefits: Array<{ title: string; description: string }>;
    pricingLabel: string;
    pricingValue: string;
    pricingSuffix: string;
    pricingNote: string;
    includedNote: string;
  };
}

export function GoogleAdsSection({ dict }: GoogleAdsSectionProps) {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/5 to-transparent" />

      <Container className="relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="text-center mb-16"
        >
          <span className="inline-block rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-sm font-medium text-amber-500 mb-6">
            {dict.badge}
          </span>
          <h2 className="mb-4">
            {dict.title} <span className="text-amber-500">{dict.titleHighlight}</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {dict.subtitle}
          </p>
        </motion.div>

        {/* How it works */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="rounded-2xl border border-border bg-card p-8 md:p-12 mb-12"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl mb-4">{dict.howItWorks.title}</h3>
              <p className="text-muted-foreground mb-6">
                {dict.howItWorks.description}
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <div className="h-3 w-3 rounded-full bg-primary flex-shrink-0" />
                  <span>{dict.howItWorks.steps[0]}</span>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground hidden sm:block" />
                <div className="flex items-center gap-2 text-muted-foreground">
                  <div className="h-3 w-3 rounded-full bg-amber-500 flex-shrink-0" />
                  <span>{dict.howItWorks.steps[1]}</span>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground hidden sm:block" />
                <div className="flex items-center gap-2 text-muted-foreground">
                  <div className="h-3 w-3 rounded-full bg-green-500 flex-shrink-0" />
                  <span>{dict.howItWorks.steps[2]}</span>
                </div>
              </div>
            </div>
            <div className="bg-background rounded-xl p-6 border border-border">
              <p className="text-sm text-muted-foreground mb-2">{dict.example.label}</p>
              <div className="bg-[#0A0A0A] rounded-lg p-4 font-mono text-sm">
                <span className="text-muted-foreground">🔍</span>{" "}
                <span className="text-foreground">{dict.example.query}</span>
              </div>
              <div className="mt-4 p-4 border-l-2 border-amber-500 bg-amber-500/5 rounded-r-lg">
                <p className="text-xs text-amber-500 font-medium mb-1">{dict.example.adLabel}</p>
                <p className="text-sm font-medium">{dict.example.adTitle}</p>
                <p className="text-xs text-muted-foreground">{dict.example.adDescription}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Benefits grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12"
        >
          {dict.benefits.map((benefit, index) => {
            const Icon = benefitIcons[index];
            return (
              <motion.div
                key={benefit.title}
                variants={staggerItem}
                className="text-center"
              >
                <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
                  <Icon className="h-6 w-6" />
                </div>
                <h4 className="text-lg font-medium mb-2">{benefit.title}</h4>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Pricing hint */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="text-center"
        >
          <div className="inline-block rounded-xl border border-border bg-card px-8 py-6">
            <p className="text-muted-foreground mb-2">{dict.pricingLabel}</p>
            <div className="flex items-baseline justify-center gap-2">
              <span className="text-2xl font-semibold">{dict.pricingValue}</span>
              <span className="text-muted-foreground">{dict.pricingSuffix}</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              {dict.pricingNote}
            </p>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            {dict.includedNote}
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
