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
    name: "Starter",
    tagline: "Get online",
    description: "Professional website to establish your online presence.",
    setup: "$1,000",
    monthly: "$50",
    monthlyLabel: "/month",
    features: [
      "Professional template design (12 options)",
      "AI Search optimization",
      "WCAG 2.0 AA compliant",
      "Mobile responsive",
      "Contact form",
      "Google Analytics setup",
      "Hosting included",
      "24/7 uptime monitoring",
      "Monthly compliance check",
      "Email support (24h response)",
    ],
    cta: "Get Started",
    popular: false,
    highlight: null,
  },
  {
    name: "Growth",
    tagline: "Most popular",
    description: "Custom website + premium support for growing businesses.",
    setup: "$1,500",
    monthly: "$99",
    monthlyLabel: "/month",
    features: [
      "Custom design from scratch",
      "AI Search optimization",
      "WCAG 2.0 AA compliant",
      "Mobile responsive",
      "Contact form + booking system",
      "Google Analytics + monthly report",
      "Hosting included",
      "24/7 uptime monitoring",
      "Monthly compliance check",
      "Unlimited content changes",
      "Add new pages anytime",
      "Priority support (4h response)",
    ],
    cta: "Get Growth",
    popular: true,
    highlight: null,
  },
  {
    name: "Accelerator",
    tagline: "Maximum results",
    description: "Website + Google Ads = clients actively searching for your services.",
    setup: "$1,800",
    monthly: "$349",
    monthlyLabel: "/month + ad spend",
    features: [
      "Everything in Growth, plus:",
      "Google Ads campaign setup",
      "Keyword research for your area",
      "Ad copywriting in Norwegian",
      "Monthly campaign optimization",
      "A/B testing & bid management",
      "Monthly performance report",
      "Direct leads from search",
      "Min. $500/month ad budget",
    ],
    cta: "Get Accelerator",
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
          title="Choose your path to clients"
          subtitle="Start with a website, add advertising when you're ready to grow faster."
          align="center"
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {packages.map((pkg) => (
            <motion.div
              key={pkg.name}
              variants={staggerItem}
              className={`relative rounded-2xl border ${
                pkg.popular ? "border-primary lg:scale-105" : "border-border"
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
                <h3 className="text-2xl mb-1">{pkg.name}</h3>
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
                    ? "bg-primary text-primary-foreground hover:bg-[#34D399] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(16,185,129,0.15)]"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                <a href="mailto:hello@dealcatcher.io">
                  {pkg.cta}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </motion.div>
          ))}
        </motion.div>

        {/* ROI Calculator hint */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerItem}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground">
            <span className="text-foreground font-medium">Quick math:</span> If your average job is $500+,
            the website pays for itself after just 2 new clients.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
