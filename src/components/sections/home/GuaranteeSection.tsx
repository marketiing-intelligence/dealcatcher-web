"use client";

import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SpotlightCard } from "@/components/ui/spotlight";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem, viewportOnce, fadeUp } from "@/lib/animations";
import { ShieldCheck, Eye, Clock, RefreshCw, ArrowRight, Wallet, MessageCircle, ThumbsUp } from "lucide-react";
import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";

interface GuaranteeSectionProps {
  lang: Locale;
  dict: {
    badge: string;
    title: string;
    subtitle: string;
    description: string;
    features: Array<{
      title: string;
      description: string;
    }>;
    howItWorks: {
      title: string;
      steps: Array<{
        step: string;
        title: string;
        description: string;
      }>;
    };
    cta: string;
    legal: string;
  };
}

const featureIcons = [Eye, Clock, ShieldCheck, RefreshCw];
const stepIcons = [Wallet, MessageCircle, ThumbsUp];

export function GuaranteeSection({ lang, dict }: GuaranteeSectionProps) {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-[#0A0A0A] to-[#141414] relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-green-500/5 rounded-full blur-[100px] pointer-events-none" />

      <Container className="relative z-10">
        <SectionHeading
          badge={dict.badge}
          title={dict.title}
          subtitle={dict.subtitle}
        />

        {/* Description */}
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="text-center text-muted-foreground text-lg max-w-3xl mx-auto mb-16"
        >
          {dict.description}
        </motion.p>

        {/* Features Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {dict.features.map((feature, index) => {
            const Icon = featureIcons[index];
            return (
              <motion.div key={feature.title} variants={staggerItem}>
                <SpotlightCard className="h-full text-center">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/10 text-green-500">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </motion.div>

        {/* How It Works */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="mb-16"
        >
          <h3 className="text-2xl md:text-3xl font-semibold text-center mb-12">
            {dict.howItWorks.title}
          </h3>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {dict.howItWorks.steps.map((step, index) => {
              const StepIcon = stepIcons[index];
              const isLast = index === dict.howItWorks.steps.length - 1;

              return (
                <motion.div key={step.step} variants={staggerItem}>
                  <SpotlightCard className="h-full text-center">
                    {/* Step number badge */}
                    <div className="mb-4 inline-flex items-center gap-2">
                      <span className={`
                        inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold
                        ${isLast ? 'bg-green-500/10 text-green-500' : 'bg-primary/10 text-primary'}
                      `}>
                        {step.step}
                      </span>
                    </div>

                    {/* Icon */}
                    <div className={`
                      mb-6 mx-auto inline-flex h-14 w-14 items-center justify-center rounded-xl relative
                      ${isLast ? 'bg-green-500/10 text-green-500' : 'bg-primary/10 text-primary'}
                    `}>
                      <StepIcon className="h-7 w-7" />
                      <div className={`
                        absolute inset-0 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity
                        ${isLast ? 'bg-green-500/20' : 'bg-primary/20'}
                      `} />
                    </div>

                    {/* Content */}
                    <h4 className="text-xl font-semibold mb-3">{step.title}</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </SpotlightCard>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="text-center"
        >
          <Button size="lg" asChild className="group">
            <Link href={`/${lang}/contact`}>
              {dict.cta}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>

          {/* Legal text */}
          <p className="mt-6 text-xs text-muted-foreground max-w-2xl mx-auto">
            {dict.legal}
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
