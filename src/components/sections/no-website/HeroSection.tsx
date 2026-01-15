"use client";

import { Container } from "@/components/shared/Container";
import { Button } from "@/components/ui/button";
import { GradientText } from "@/components/ui/gradient-text";
import { TextAnimate } from "@/components/ui/text-reveal";
import { ParallaxGlow } from "@/components/ui/parallax";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { motion, useScroll, useTransform } from "framer-motion";
import { staggerContainerSlow, staggerItem } from "@/lib/animations";
import { ArrowRight, Search, Users, TrendingUp } from "lucide-react";
import { useRef } from "react";

// Stats specific to no-website audience
const stats = [
  { value: 87, suffix: "%", label: "of consumers search online first", icon: Search },
  { value: 46, suffix: "%", label: "prefer local businesses with websites", icon: Users },
  { value: 3, suffix: "x", label: "more leads with a professional site", icon: TrendingUp },
];

export function HeroSection() {
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
                For Craftsmen Without a Website
              </motion.span>
            </motion.div>

            {/* Headline with gradient effect */}
            <motion.div variants={staggerItem} className="mb-8">
              <h1 className="text-5xl md:text-6xl lg:text-7xl leading-[1.05]">
                <TextAnimate text="Your craft deserves to be" className="inline" />
                {" "}
                <GradientText animate className="inline-block">
                  found online
                </GradientText>
              </h1>
            </motion.div>

            {/* Subheadline */}
            <motion.p
              variants={staggerItem}
              className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl leading-relaxed"
            >
              Clients search for carpenters, plumbers, and electricians online every day.
              If you're not there, you're invisible. Your competitors with websites are winning jobs that should be yours.
            </motion.p>

            {/* CTA with enhanced styling */}
            <motion.div variants={staggerItem} className="mb-16">
              <Button
                asChild
                size="lg"
                className="group relative bg-primary text-primary-foreground h-14 px-8 text-base font-medium overflow-hidden"
              >
                <a href="#pricing">
                  {/* Glow effect on hover */}
                  <span className="absolute inset-0 bg-gradient-to-r from-primary via-accent-hover to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="relative flex items-center gap-2">
                    Get your professional website
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </a>
              </Button>
            </motion.div>

            {/* Stats section with animated counters */}
            <motion.div
              variants={staggerItem}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-4 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-4"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="text-2xl md:text-3xl font-semibold text-foreground">
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
          </motion.div>
        </Container>
      </motion.div>
    </section>
  );
}
