"use client";

import { Container } from "@/components/shared/Container";
import { Button } from "@/components/ui/button";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { TextAnimate } from "@/components/ui/text-reveal";
import { motion, useScroll, useTransform } from "framer-motion";
import { staggerContainerSlow, staggerItem } from "@/lib/animations";
import { AlertTriangle, Shield, Scale, FileWarning, Calendar } from "lucide-react";
import { useRef } from "react";
import { CALCOM_BOOKING_URL } from "@/lib/constants";

const statIcons = [FileWarning, Scale, Shield];

interface HeroSectionProps {
  dict: {
    badge: string;
    titleStart: string;
    titleHighlight: string;
    subtitle: string;
    cta: string;
    stats: Array<{ value: number; suffix: string; label: string }>;
    source: string;
  };
}

export function HeroSection({ dict }: HeroSectionProps) {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Red/warning themed aurora background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-destructive/5 via-transparent to-transparent" />

        {/* Animated warning gradient */}
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            background: "repeating-linear-gradient(100deg, #EF4444 10%, #F87171 15%, #EF4444 20%, #F87171 25%, #EF4444 30%)",
            backgroundSize: "300% 200%",
            filter: "blur(80px)",
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

        {/* Glow orbs */}
        <motion.div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-destructive/10 rounded-full blur-[120px] pointer-events-none"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
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
            {/* Warning badge with pulse */}
            <motion.div variants={staggerItem}>
              <motion.span
                className="inline-flex items-center gap-2 rounded-full border border-destructive/30 bg-destructive/10 px-4 py-1.5 text-sm font-medium text-destructive mb-8"
                animate={{
                  boxShadow: [
                    "0 0 0 0 rgba(239, 68, 68, 0)",
                    "0 0 0 8px rgba(239, 68, 68, 0.1)",
                    "0 0 0 0 rgba(239, 68, 68, 0)",
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <AlertTriangle className="h-4 w-4" />
                {dict.badge}
              </motion.span>
            </motion.div>

            {/* Headline */}
            <motion.div variants={staggerItem} className="mb-8">
              <h1 className="text-5xl md:text-6xl lg:text-7xl leading-[1.05]">
                <TextAnimate text={dict.titleStart} className="inline" />
                {" "}
                <span className="text-destructive drop-shadow-[0_0_20px_rgba(239,68,68,0.4)]">
                  {dict.titleHighlight}
                </span>
              </h1>
            </motion.div>

            {/* Subheadline */}
            <motion.p
              variants={staggerItem}
              className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl leading-relaxed"
            >
              {dict.subtitle}
            </motion.p>

            {/* CTA with enhanced styling */}
            <motion.div variants={staggerItem} className="mb-16">
              <Button
                asChild
                size="lg"
                className="group relative bg-primary text-primary-foreground h-14 px-8 text-base font-medium overflow-hidden"
              >
                <a href={CALCOM_BOOKING_URL} target="_blank" rel="noopener noreferrer">
                  <span className="absolute inset-0 bg-gradient-to-r from-primary via-accent-hover to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="relative flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    {dict.cta}
                  </span>
                </a>
              </Button>
            </motion.div>

            {/* Stats section with animated counters */}
            <motion.div
              variants={staggerItem}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
            >
              {dict.stats.map((stat, index) => {
                const Icon = statIcons[index];
                const isWarning = index === 0;
                return (
                  <div
                    key={index}
                    className={`flex items-center gap-4 rounded-xl border backdrop-blur-sm p-4 ${
                      isWarning
                        ? "border-destructive/30 bg-destructive/5"
                        : "border-border/50 bg-card/50"
                    }`}
                  >
                    <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${
                      isWarning ? "bg-destructive/10 text-destructive" : "bg-primary/10 text-primary"
                    }`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <div className={`text-2xl md:text-3xl font-semibold ${
                        isWarning ? "text-destructive" : "text-foreground"
                      }`}>
                        <AnimatedCounter
                          value={stat.value}
                          suffix={stat.suffix}
                          delay={0.2 * index}
                        />
                      </div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </div>
                  </div>
                );
              })}
            </motion.div>

            {/* Source citation - glass card */}
            <motion.div
              variants={staggerItem}
              className="p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm"
            >
              <p className="text-sm text-muted-foreground">
                {dict.source}
              </p>
            </motion.div>
          </motion.div>
        </Container>
      </motion.div>
    </section>
  );
}
