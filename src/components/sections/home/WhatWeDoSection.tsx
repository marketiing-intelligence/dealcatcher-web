"use client";

import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { GlowCard } from "@/components/ui/tilt-card";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { staggerContainer, staggerItem, viewportOnce } from "@/lib/animations";
import { Globe, Megaphone, ArrowRight } from "lucide-react";

interface WhatWeDoSectionProps {
  dict: {
    badge: string;
    title: string;
    subtitle: string;
    website: {
      title: string;
      description: string;
      features: string[];
      priceLabel: string;
      price: string;
      priceSuffix: string;
    };
    ads: {
      title: string;
      description: string;
      features: string[];
      priceLabel: string;
      price: string;
      priceSuffix: string;
    };
    combined: {
      website: string;
      converts: string;
      ads: string;
      brings: string;
      result: string;
    };
  };
}

// Spotlight card component with custom color
function ServiceCard({
  children,
  accentColor = "16, 185, 129",
  className = "",
}: {
  children: React.ReactNode;
  accentColor?: string;
  className?: string;
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      className={`group relative rounded-2xl border border-border bg-card overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              500px circle at ${mouseX}px ${mouseY}px,
              rgba(${accentColor}, 0.12),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

export function WhatWeDoSection({ dict }: WhatWeDoSectionProps) {
  return (
    <section className="py-20 md:py-32 bg-[#141414] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[150px] pointer-events-none" />

      <Container className="relative z-10">
        <SectionHeading
          badge={dict.badge}
          title={dict.title}
          subtitle={dict.subtitle}
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="grid md:grid-cols-2 gap-8"
        >
          {/* Website */}
          <motion.div variants={staggerItem}>
            <ServiceCard accentColor="16, 185, 129">
              <div className="p-8 md:p-10">
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary relative">
                  <Globe className="h-7 w-7" />
                  <div className="absolute inset-0 rounded-xl bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="text-2xl md:text-3xl mb-4">{dict.website.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {dict.website.description}
                </p>
                <ul className="space-y-3 text-sm">
                  {dict.website.features.map((feature, index) => (
                    <motion.li
                      key={feature}
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      viewport={{ once: true }}
                    >
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>
                <div className="mt-8 pt-6 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    {dict.website.priceLabel}
                  </p>
                  <p className="text-2xl font-semibold">
                    {dict.website.price}{" "}
                    <span className="text-base font-normal text-muted-foreground">
                      {dict.website.priceSuffix}
                    </span>
                  </p>
                </div>
              </div>
            </ServiceCard>
          </motion.div>

          {/* Google Ads */}
          <motion.div variants={staggerItem}>
            <ServiceCard accentColor="245, 158, 11" className="border-amber-500/30">
              <div className="p-8 md:p-10">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl" />
                <div className="relative">
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500 relative">
                    <Megaphone className="h-7 w-7" />
                    <div className="absolute inset-0 rounded-xl bg-amber-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h3 className="text-2xl md:text-3xl mb-4">{dict.ads.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {dict.ads.description}
                  </p>
                  <ul className="space-y-3 text-sm">
                    {dict.ads.features.map((feature, index) => (
                      <motion.li
                        key={feature}
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                        viewport={{ once: true }}
                      >
                        <div className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                        <span>{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                  <div className="mt-8 pt-6 border-t border-border">
                    <p className="text-sm text-muted-foreground">
                      {dict.ads.priceLabel}
                    </p>
                    <p className="text-2xl font-semibold">
                      {dict.ads.price}
                      <span className="text-base font-normal text-muted-foreground">
                        {dict.ads.priceSuffix}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </ServiceCard>
          </motion.div>
        </motion.div>

        {/* Combined value - Glass style */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerItem}
          className="mt-12"
        >
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-muted-foreground justify-center w-full rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 text-center sm:text-left">
            <div className="flex items-center gap-2 sm:gap-4">
              <span className="font-medium text-foreground">
                {dict.combined.website}
              </span>
              <ArrowRight className="h-4 w-4 text-primary hidden sm:block" />
              <span className="hidden sm:inline">{dict.combined.converts}</span>
            </div>
            <span className="text-primary text-xl font-semibold">+</span>
            <div className="flex items-center gap-2 sm:gap-4">
              <span className="font-medium text-foreground">
                {dict.combined.ads}
              </span>
              <ArrowRight className="h-4 w-4 text-amber-500 hidden sm:block" />
              <span className="hidden sm:inline">{dict.combined.brings}</span>
            </div>
            <span className="text-primary text-xl font-semibold">=</span>
            <span className="font-semibold text-transparent bg-gradient-to-r from-primary to-amber-500 bg-clip-text">
              {dict.combined.result}
            </span>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
