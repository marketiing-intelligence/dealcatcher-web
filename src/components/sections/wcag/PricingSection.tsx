"use client";

import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem, viewportOnce } from "@/lib/animations";
import { Check, ArrowRight, Zap } from "lucide-react";

const packages = [
  {
    name: "Compliance",
    tagline: "Get legal",
    description: "New WCAG-compliant website with premium support.",
    setup: "$1,500",
    monthly: "$99",
    monthlyLabel: "/month",
    features: [
      "Complete website rebuild",
      "100% WCAG 2.0 AA compliant",
      "AI Search optimization",
      "Mobile responsive design",
      "Contact forms + booking",
      "Google Analytics setup",
      "Hosting included",
      "24/7 uptime monitoring",
      "Monthly compliance check",
      "Unlimited content changes",
      "Priority support (4h)",
    ],
    cta: "Start with free audit",
    popular: true,
    highlight: null,
  },
  {
    name: "Compliance + Growth",
    tagline: "Maximum impact",
    description: "Compliant website + Google Ads to drive immediate traffic.",
    setup: "$1,800",
    monthly: "$349",
    monthlyLabel: "/month + ad spend",
    features: [
      "Everything in Compliance, plus:",
      "Google Ads campaign setup",
      "Keyword research for your area",
      "Ad copywriting in Norwegian",
      "Monthly campaign optimization",
      "A/B testing & bid management",
      "Performance reports with ROI",
      "Direct leads from search",
      "Min. $500/month ad budget",
    ],
    cta: "Get full package",
    popular: false,
    highlight: "Best ROI",
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-20 md:py-32 bg-[#141414]">
      <Container>
        <SectionHeading
          badge="Pricing"
          title="Get compliant. Get clients."
          subtitle="Start with a compliant website, add advertising when ready."
          align="center"
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          {packages.map((pkg) => (
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
                  <span className="text-muted-foreground text-sm">setup</span>
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
                <a href="mailto:hello@dealcatcher.io?subject=Free%20WCAG%20Audit">
                  {pkg.cta}
                  <ArrowRight className="ml-2 h-4 w-4" />
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
            Both packages include a <span className="text-foreground font-medium">free WCAG audit</span> of your current site.
            No obligation to proceed.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
