"use client";

import { Container } from "@/components/shared/Container";
import { Button } from "@/components/ui/button";
import { GradientText } from "@/components/ui/gradient-text";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { ParallaxGlow } from "@/components/ui/parallax";
import { motion, useScroll, useTransform } from "framer-motion";
import { staggerContainerSlow, staggerItem } from "@/lib/animations";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n/config";

// Hook to detect mobile
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
}

interface HeroSectionProps {
  lang: Locale;
  dict: {
    badge: string;
    titleStart: string;
    titleHighlight: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    trustLabel: string;
    trustItems: string[];
  };
}

// Stats data
const stats = [
  { value: 97, suffix: "%", label: "Sites with accessibility issues" },
  { value: 3, suffix: "s", label: "Average load time goal" },
  { value: 100, suffix: "%", label: "WCAG compliant delivery" },
];

export function HeroSection({ lang, dict }: HeroSectionProps) {
  const containerRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Disable parallax on mobile to prevent jank
  const y = useTransform(scrollYProgress, [0, 1], ["0%", isMobile ? "0%" : "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, isMobile ? 1 : 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Aurora background effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />

        {/* Animated aurora gradient */}
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            background: "repeating-linear-gradient(100deg, var(--primary) 10%, var(--accent-hover) 15%, var(--primary) 20%, var(--accent-hover) 25%, var(--primary) 30%)",
            backgroundSize: "300% 200%",
            filter: "blur(60px)",
            maskImage: "radial-gradient(ellipse at 100% 0%, black 10%, transparent 70%)",
          }}
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Parallax glow orbs */}
        <ParallaxGlow className="top-1/4 left-1/2 -translate-x-1/2" />
        <ParallaxGlow className="top-1/3 right-0 translate-x-1/2 opacity-50" />
      </div>

      {/* Main content with parallax */}
      <motion.div style={{ y, opacity }} className="relative z-10 w-full">
        <Container className="py-20 md:py-32 lg:py-40">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainerSlow}
            className="max-w-5xl"
          >
            {/* Badge with pulse animation */}
            <motion.div variants={staggerItem}>
              <motion.span
                className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-8"
                animate={{
                  boxShadow: [
                    "0 0 0 0 rgba(16, 185, 129, 0)",
                    "0 0 0 8px rgba(16, 185, 129, 0.1)",
                    "0 0 0 0 rgba(16, 185, 129, 0)",
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                </span>
                {dict.badge}
              </motion.span>
            </motion.div>

            {/* Headline with gradient effect */}
            <motion.div variants={staggerItem} className="mb-6 md:mb-8">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] md:leading-[1.05]">
                {dict.titleStart}{" "}
                <GradientText animate className="inline">
                  {dict.titleHighlight}
                </GradientText>
              </h1>
            </motion.div>

            {/* Subheadline */}
            <motion.p
              variants={staggerItem}
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-8 md:mb-12 max-w-2xl leading-relaxed"
            >
              {dict.subtitle}
            </motion.p>

            {/* CTAs with enhanced styling */}
            <motion.div
              variants={staggerItem}
              className="flex flex-col sm:flex-row gap-4 mb-16"
            >
              <Button
                asChild
                size="lg"
                className="group relative bg-primary text-primary-foreground h-14 px-8 text-base font-medium overflow-hidden"
              >
                <Link href={`/${lang}/no-website`}>
                  {/* Glow effect on hover */}
                  <span className="absolute inset-0 bg-gradient-to-r from-primary via-accent-hover to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="relative flex items-center gap-2">
                    {dict.ctaPrimary}
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="group border-border hover:border-primary hover:text-primary h-14 px-8 text-base font-medium transition-all duration-300"
              >
                <Link href={`/${lang}/wcag-compliance`}>
                  <span className="group-hover:text-primary transition-colors">{dict.ctaSecondary}</span>
                </Link>
              </Button>
            </motion.div>

            {/* Stats section with animated counters */}
            <motion.div
              variants={staggerItem}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-16 py-8 border-y border-border/50"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-2">
                    <AnimatedCounter
                      value={stat.value}
                      suffix={stat.suffix}
                      delay={0.2 * index}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </motion.div>

            {/* Trust indicators */}
            <motion.div variants={staggerItem}>
              <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
                {dict.trustLabel}
              </p>
              <div className="flex flex-wrap gap-2 sm:gap-3 text-xs sm:text-sm text-muted-foreground">
                {dict.trustItems.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-1.5 sm:gap-2 rounded-full border border-border/50 bg-card/50 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2"
                  >
                    <CheckCircle2 className="h-3 w-3 sm:h-4 sm:w-4 text-primary flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </motion.div>
    </section>
  );
}
