"use client";

import { Container } from "@/components/shared/Container";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import { useEffect, useState } from "react";

interface HeroSectionProps {
  lang: Locale;
  dict: {
    headline: string;
    headlineRotation: string[];
    subheadline: string;
    cta: string;
    ctaNote: string;
  };
}

export function HeroSection({ lang, dict }: HeroSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Rotate headline
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % dict.headlineRotation.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [dict.headlineRotation.length]);

  // Load UnicornStudio for Da Vinci animation
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Hide branding
    const style = document.createElement("style");
    style.textContent = `
      [data-us-project] a[href*="unicorn"],
      [data-us-project] [class*="brand"],
      [data-us-project] [class*="credit"],
      [data-us-project] [class*="watermark"] {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        pointer-events: none !important;
        position: absolute !important;
        left: -9999px !important;
      }
    `;
    document.head.appendChild(style);

    const script = document.createElement("script");
    script.src =
      "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.33/dist/unicornStudio.umd.js";
    script.onload = () => {
      if (
        window.UnicornStudio &&
        !window.UnicornStudio.isInitialized
      ) {
        window.UnicornStudio.init();
        window.UnicornStudio.isInitialized = true;
      }
    };
    document.head.appendChild(script);

    // Remove branding elements after load
    const hideBranding = () => {
      const el = document.querySelector('[data-us-project]');
      if (!el) return;
      el.querySelectorAll('a, div, span').forEach((node) => {
        const text = (node.textContent || '').toLowerCase();
        if (text.includes('made with') || text.includes('unicorn')) {
          (node as HTMLElement).style.display = 'none';
        }
      });
    };
    const interval = setInterval(hideBranding, 200);
    setTimeout(() => clearInterval(interval), 10000);

    return () => {
      clearInterval(interval);
      try { document.head.removeChild(script); } catch {}
      try { document.head.removeChild(style); } catch {}
    };
  }, []);

  return (
    <section className="relative min-h-[60vh] md:min-h-screen flex items-center overflow-hidden">
      {/* Da Vinci Vitruvian Man animation — desktop only */}
      <div className="absolute inset-0 hidden md:block" style={{ top: "-10%", bottom: "-80px", clipPath: "inset(0 0 80px 0)" }}>
        <div
          data-us-project="whwOGlfJ5Rz2rHaEUgHl"
          style={{ width: "100%", height: "calc(100% + 80px)", minHeight: "calc(110vh + 80px)" }}
        />
      </div>

      {/* Dark overlay — desktop only (over animation) */}
      <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />

      {/* Content */}
      <div className="relative z-10 w-full">
        <Container>
          <div className="max-w-2xl py-10 md:py-28">
            {/* Static line */}
            <div className="overflow-hidden mb-1">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]"
              >
                {dict.headline}
              </motion.h1>
            </div>

            {/* Rotating line */}
            <div className="h-[2.6em] sm:h-[1.3em] relative overflow-hidden mb-8 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1]">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentIndex}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "-100%", opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute left-0 text-primary"
                >
                  {dict.headlineRotation[currentIndex]}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base md:text-lg text-muted-foreground leading-[1.8] max-w-xl mb-10"
            >
              {dict.subheadline}
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Button
                asChild
                size="lg"
                className="group bg-primary hover:bg-primary/90 text-primary-foreground h-12 px-8 text-sm font-semibold shadow-[0_0_30px_rgba(229,168,75,0.15)] hover:shadow-[0_0_50px_rgba(229,168,75,0.25)] transition-all duration-500"
              >
                <Link href="https://cal.davinci.agency/dawid-stelmach/discovery-call">
                  <span className="flex items-center gap-2">
                    {dict.cta}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Button>
              <p className="text-xs text-muted-foreground/30 mt-3">
                {dict.ctaNote}
              </p>
            </motion.div>
          </div>
        </Container>
      </div>
    </section>
  );
}

// TypeScript declaration for UnicornStudio
declare global {
  interface Window {
    UnicornStudio: {
      isInitialized: boolean;
      init: () => void;
    };
  }
}
