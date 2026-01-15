"use client";

import { Container } from "@/components/shared/Container";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, staggerItem, viewportOnce } from "@/lib/animations";
import { Search, TrendingUp, Target, BarChart3, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const benefits = [
  {
    icon: Search,
    title: "Appear when they search",
    description: "When someone Googles \"snekker Oslo\" or \"elektriker Bergen\", your ad shows at the top.",
  },
  {
    icon: Target,
    title: "Target your exact area",
    description: "Only pay to reach people in your service area. No wasted budget on distant cities.",
  },
  {
    icon: TrendingUp,
    title: "Immediate results",
    description: "Unlike SEO, Google Ads brings clients from day one. See calls and inquiries within the first week.",
  },
  {
    icon: BarChart3,
    title: "Measurable ROI",
    description: "Know exactly how many leads came from ads. Monthly reports show what's working.",
  },
];

export function GoogleAdsSection() {
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
            Optional Add-On
          </span>
          <h2 className="mb-4">
            Want clients <span className="text-amber-500">faster</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A website brings clients who find you. Google Ads brings clients who are
            actively searching for your services right now.
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
              <h3 className="text-2xl mb-4">Website + Google Ads = Full Pipeline</h3>
              <p className="text-muted-foreground mb-6">
                Your website converts visitors into clients. Google Ads drives those visitors
                to your website. Together, they create a complete client acquisition system.
              </p>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <div className="h-3 w-3 rounded-full bg-primary" />
                  <span>Client searches</span>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                <div className="flex items-center gap-2 text-muted-foreground">
                  <div className="h-3 w-3 rounded-full bg-amber-500" />
                  <span>Sees your ad</span>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                <div className="flex items-center gap-2 text-muted-foreground">
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                  <span>Contacts you</span>
                </div>
              </div>
            </div>
            <div className="bg-background rounded-xl p-6 border border-border">
              <p className="text-sm text-muted-foreground mb-2">Example search:</p>
              <div className="bg-[#0A0A0A] rounded-lg p-4 font-mono text-sm">
                <span className="text-muted-foreground">🔍</span>{" "}
                <span className="text-foreground">snekker oslo pris</span>
              </div>
              <div className="mt-4 p-4 border-l-2 border-amber-500 bg-amber-500/5 rounded-r-lg">
                <p className="text-xs text-amber-500 font-medium mb-1">AD</p>
                <p className="text-sm font-medium">Snekker i Oslo — Profesjonelt Håndverk</p>
                <p className="text-xs text-muted-foreground">Gratis befaring. 20+ års erfaring. Kontakt oss i dag.</p>
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
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {benefits.map((benefit) => (
            <motion.div
              key={benefit.title}
              variants={staggerItem}
              className="text-center"
            >
              <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
                <benefit.icon className="h-6 w-6" />
              </div>
              <h4 className="text-lg font-medium mb-2">{benefit.title}</h4>
              <p className="text-sm text-muted-foreground">{benefit.description}</p>
            </motion.div>
          ))}
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
            <p className="text-muted-foreground mb-2">Google Ads management</p>
            <div className="flex items-baseline justify-center gap-2">
              <span className="text-2xl font-semibold">$200</span>
              <span className="text-muted-foreground">/month + 10% of ad spend</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Setup: $300 one-time · Min. ad budget: $500/month
            </p>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            Already included in the <span className="text-amber-500 font-medium">Accelerator</span> package above.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
