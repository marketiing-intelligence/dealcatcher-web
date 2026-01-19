"use client";

import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SpotlightCard } from "@/components/ui/spotlight";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem, viewportOnce, fadeUp } from "@/lib/animations";
import { ShieldCheck, Eye, Clock, RefreshCw, ArrowRight, CreditCard, MessageSquareText, Heart } from "lucide-react";
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
const stepIcons = [CreditCard, MessageSquareText, Heart];

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
          <h3 className="text-2xl md:text-3xl font-clash font-semibold text-center mb-12">
            {dict.howItWorks.title}
          </h3>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 relative max-w-5xl mx-auto">
            {/* Connecting line - desktop only */}
            <div className="hidden md:block absolute top-[52px] left-[calc(16.67%+32px)] right-[calc(16.67%+32px)] h-1 z-0">
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary to-green-500 rounded-full" />
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary to-green-500 rounded-full blur-sm opacity-50" />
            </div>

            {dict.howItWorks.steps.map((step, index) => {
              const StepIcon = stepIcons[index];
              const isLast = index === dict.howItWorks.steps.length - 1;

              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={viewportOnce}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                  className="relative"
                >
                  {/* Card background */}
                  <div className={`
                    relative rounded-2xl p-6 pt-16 text-center
                    bg-gradient-to-b from-card/80 to-card/40
                    border border-border/50
                    backdrop-blur-sm
                    transition-all duration-300
                    hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5
                    ${isLast ? 'hover:border-green-500/50 hover:shadow-green-500/5' : ''}
                  `}>
                    {/* Step circle - positioned above card */}
                    <div className="absolute -top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                      {/* Glow effect */}
                      <div className={`
                        absolute inset-0 rounded-full blur-xl opacity-40
                        ${isLast ? 'bg-green-500' : 'bg-primary'}
                      `} />

                      {/* Main circle */}
                      <div className={`
                        relative h-20 w-20 rounded-full
                        flex flex-col items-center justify-center
                        ${isLast
                          ? 'bg-gradient-to-br from-green-500 to-green-600'
                          : 'bg-gradient-to-br from-primary to-primary/80'
                        }
                        shadow-lg
                        ${isLast ? 'shadow-green-500/30' : 'shadow-primary/30'}
                      `}>
                        <StepIcon className="h-7 w-7 text-white mb-0.5" />
                        <span className="text-xs font-bold text-white/80">
                          {step.step}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <h4 className="text-lg md:text-xl font-semibold mb-3 mt-2">
                      {step.title}
                    </h4>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>

                    {/* Arrow indicator on mobile - between cards */}
                    {index < dict.howItWorks.steps.length - 1 && (
                      <div className="md:hidden absolute -bottom-4 left-1/2 -translate-x-1/2 z-10">
                        <ArrowRight className="h-6 w-6 text-primary rotate-90" />
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
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
