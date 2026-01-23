"use client";

import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem, viewportOnce } from "@/lib/animations";
import { Check, Zap, Calendar } from "lucide-react";
import { CALCOM_BOOKING_URL } from "@/lib/constants";

interface PricingSectionProps {
  dict: {
    badge: string;
    title: string;
    subtitle: string;
    setupLabel: string;
    auditNote: string;
    packages: Array<{
      name: string;
      tagline: string;
      description: string;
      setup: string;
      monthly: string;
      monthlyLabel: string;
      features: string[];
      cta: string;
      popular?: boolean;
      highlight?: string;
    }>;
  };
}

export function PricingSection({ dict }: PricingSectionProps) {
  return (
    <section id="pricing" className="py-20 md:py-32 bg-[#141414]">
      <Container>
        <SectionHeading
          badge={dict.badge}
          title={dict.title}
          subtitle={dict.subtitle}
          align="center"
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          {dict.packages.map((pkg) => (
            <motion.div
              key={pkg.name}
              variants={staggerItem}
              className={`relative rounded-2xl border ${
                pkg.popular ? "border-primary" : "border-border"
              } bg-card p-6 md:p-8 flex flex-col`}
            >
              {pkg.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4">
                  {pkg.tagline}
                </Badge>
              )}
              {pkg.highlight && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-white px-4">
                  <Zap className="h-3 w-3 mr-1" />
                  {pkg.highlight}
                </Badge>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-1">{pkg.name}</h3>
                <p className="text-muted-foreground text-sm">{pkg.description}</p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-semibold">{pkg.setup}</span>
                  <span className="text-muted-foreground text-sm">{dict.setupLabel}</span>
                </div>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-xl font-medium text-primary">{pkg.monthly}</span>
                  <span className="text-muted-foreground text-sm">{pkg.monthlyLabel}</span>
                </div>
              </div>

              <ul className="space-y-2.5 mb-8 flex-grow">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm">
                    <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                asChild
                className={`w-full h-12 text-base font-medium transition-all duration-200 ${
                  pkg.popular
                    ? "bg-primary text-primary-foreground hover:bg-accent-hover hover:-translate-y-0.5 hover:shadow-[0_8px_24px_var(--accent-glow)]"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                <a href={CALCOM_BOOKING_URL} target="_blank" rel="noopener noreferrer">
                  <Calendar className="mr-2 h-4 w-4" />
                  {pkg.cta}
                </a>
              </Button>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerItem}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground">
            {dict.auditNote}
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
