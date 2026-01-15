"use client";

import { Container } from "@/components/shared/Container";
import { Button } from "@/components/ui/button";
import { GradientText } from "@/components/ui/gradient-text";
import { motion, useScroll, useTransform } from "framer-motion";
import { fadeUp, viewportOnce } from "@/lib/animations";
import { ArrowRight, Mail, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import type { Locale } from "@/lib/i18n/config";

interface CTASectionProps {
  lang: Locale;
  dict: {
    titleStart: string;
    titleHighlight: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
}

export function CTASection({ lang, dict }: CTASectionProps) {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  return (
    <section ref={containerRef} className="py-20 md:py-32 relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent" />

      {/* Parallax glow effect */}
      <motion.div
        style={{ y, scale }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/15 rounded-full blur-[120px] pointer-events-none"
      />

      {/* Additional floating orbs */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 left-1/4 w-[200px] h-[200px] bg-primary/10 rounded-full blur-[80px] pointer-events-none"
      />
      <motion.div
        animate={{
          y: [0, 20, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute top-1/3 right-1/4 w-[150px] h-[150px] bg-primary/10 rounded-full blur-[60px] pointer-events-none"
      />

      <Container className="relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="text-center max-w-3xl mx-auto"
        >
          {/* Glass card container */}
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-10 md:p-16 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-8"
            >
              <Sparkles className="h-4 w-4" />
              <span>Start Today</span>
            </motion.div>

            <h2 className="mb-6 text-3xl md:text-4xl lg:text-5xl">
              {dict.titleStart}{" "}
              <GradientText animate>{dict.titleHighlight}</GradientText>?
            </h2>
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
              {dict.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="group relative bg-primary text-primary-foreground h-14 px-8 text-base font-medium overflow-hidden"
              >
                <Link href={`/${lang}/no-website`}>
                  {/* Animated gradient overlay */}
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-primary via-accent-hover to-primary"
                    animate={{
                      backgroundPosition: ["0% center", "200% center"],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    style={{ backgroundSize: "200% 100%" }}
                  />
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
                className="group border-white/20 hover:border-primary hover:text-primary h-14 px-8 text-base font-medium bg-white/5 backdrop-blur-sm transition-all duration-300"
              >
                <a href="mailto:hello@dealcatcher.io">
                  <Mail className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                  {dict.ctaSecondary}
                </a>
              </Button>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
