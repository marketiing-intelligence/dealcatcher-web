"use client";

import { Container } from "@/components/shared/Container";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { viewportOnce } from "@/lib/animations";
import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";

interface FinalCTASectionProps {
  lang: Locale;
  dict: { headline: string; cta: string; checkpoints: string[]; footer: string };
}

export function FinalCTASection({ lang, dict }: FinalCTASectionProps) {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Animated glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(229,168,75,0.06) 0%, transparent 50%)" }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <Container className="relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6 }}
            className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight mb-8 leading-[1.25]"
          >
            {dict.headline}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mb-8"
          >
            <Button
              asChild
              className="group relative bg-primary hover:bg-primary/90 text-primary-foreground h-11 md:h-12 px-7 md:px-8 text-sm font-medium overflow-hidden shadow-[0_0_40px_rgba(229,168,75,0.2)] hover:shadow-[0_0_60px_rgba(229,168,75,0.3)] transition-all duration-500"
            >
              <Link href="https://cal.davinci.agency/dawid-stelmach/discovery-call">
                <span className="absolute inset-0 bg-gradient-to-r from-primary via-accent-hover to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative flex items-center gap-2">
                  {dict.cta}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-6"
          >
            {dict.checkpoints.map((cp, i) => (
              <div
                key={i}
                className="flex items-center gap-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] px-3 py-1.5 text-xs text-muted-foreground"
              >
                <CheckCircle className="h-3 w-3 text-primary/50" />
                <span>{cp}</span>
              </div>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-xs text-muted-foreground/30 max-w-sm mx-auto"
          >
            {dict.footer}
          </motion.p>
        </div>
      </Container>
    </section>
  );
}
