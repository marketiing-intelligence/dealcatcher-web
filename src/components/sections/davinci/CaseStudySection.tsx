"use client";

import { Container } from "@/components/shared/Container";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem, viewportOnce } from "@/lib/animations";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";

interface CaseStudySectionProps {
  lang: Locale;
  dict: {
    badge: string;
    title: string;
    company: string;
    companyDetails: string;
    problem: string;
    whatWeDid: string;
    results: string[];
    cta: string;
  };
}

export function CaseStudySection({ lang, dict }: CaseStudySectionProps) {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Background video */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/60" />
      </div>

      <Container className="relative z-10">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer}
          >
            {/* Header */}
            <motion.div variants={staggerItem} className="mb-10">
              <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] block mb-3">
                {dict.badge}
              </span>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight leading-[1.25]">
                {dict.title}
              </h2>
            </motion.div>

            {/* Glass card */}
            <motion.div
              variants={staggerItem}
              className="rounded-2xl border border-white/[0.08] backdrop-blur-md bg-white/[0.04] p-6 md:p-10"
            >
              {/* Inner grid: image left, content right */}
              <div className="grid md:grid-cols-[1fr,1.2fr] gap-8 items-start">
                {/* Left: screenshot */}
                <div className="rounded-xl overflow-hidden border border-white/[0.08] shadow-2xl shadow-black/40">
                  <img
                    src="/images/examples/mirco-configurator.png"
                    alt="Mirco Konfigurator"
                    className="w-full h-auto block"
                  />
                </div>

                {/* Right: content */}
                <div>
                  {/* Company */}
                  <h3 className="text-base md:text-lg font-bold mb-0.5">
                    {dict.company}
                  </h3>
                  <p className="text-xs text-white/40 mb-6">
                    {dict.companyDetails}
                  </p>

                  {/* Problem */}
                  <div className="mb-5">
                    <p className="text-[10px] font-bold text-red-400/80 uppercase tracking-wider mb-1.5">
                      Problem
                    </p>
                    <p className="text-sm text-white/70 leading-[1.7]">
                      {dict.problem}
                    </p>
                  </div>

                  {/* What we did */}
                  <div className="mb-5">
                    <p className="text-[10px] font-bold text-primary/80 uppercase tracking-wider mb-1.5">
                      Co zrobiliśmy
                    </p>
                    <p className="text-sm text-white/70 leading-[1.7]">
                      {dict.whatWeDid}
                    </p>
                  </div>

                  {/* Results */}
                  <div className="mb-6">
                    <p className="text-[10px] font-bold text-white/60 uppercase tracking-wider mb-2">
                      Efekt
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {dict.results.map((item, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.06] border border-white/[0.08] px-3 py-1.5 text-xs text-white/80"
                        >
                          <ArrowRight className="w-2.5 h-2.5 text-primary" />
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <Button
                    asChild
                    className="group bg-primary hover:bg-primary/90 text-primary-foreground h-9 px-5 text-xs font-medium"
                  >
                    <Link href={`/${lang}/case-study/mirco`}>
                      <span className="flex items-center gap-1.5">
                        {dict.cta}
                        <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
