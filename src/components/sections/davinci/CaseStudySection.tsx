"use client";

import { Container } from "@/components/shared/Container";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem, viewportOnce } from "@/lib/animations";
import { CheckCircle, FileText, Wrench, Trophy, User, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";

interface CaseStudySectionProps {
  lang: Locale;
  dict: {
    badge: string;
    title: string;
    company: string;
    situation: {
      title: string;
      text: string;
    };
    whatWeDid: {
      title: string;
      items: string[];
    };
    result: {
      title: string;
      text: string;
    };
    bio: {
      title: string;
      text: string;
    };
    cta?: string;
  };
}

export function CaseStudySection({ lang, dict }: CaseStudySectionProps) {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/[0.03] blur-[120px] pointer-events-none" />

      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.span
            variants={staggerItem}
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary mb-6"
          >
            {dict.badge}
          </motion.span>

          {/* Title */}
          <motion.h2
            variants={staggerItem}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold [word-spacing:0.15em] mb-4 leading-tight"
          >
            {dict.title}
          </motion.h2>

          {/* Company */}
          <motion.p
            variants={staggerItem}
            className="text-xl md:text-2xl text-primary font-semibold mb-12"
          >
            {dict.company}
          </motion.p>

          {/* Main content card */}
          <motion.div
            variants={staggerItem}
            className="rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm p-8 md:p-10 space-y-8"
          >
            {/* Situation */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-primary/10 border border-primary/20">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-primary">
                  {dict.situation.title}
                </h3>
              </div>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed pl-14">
                {dict.situation.text}
              </p>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

            {/* What we did */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-primary/10 border border-primary/20">
                  <Wrench className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-primary">
                  {dict.whatWeDid.title}
                </h3>
              </div>
              <ul className="space-y-3 pl-14">
                {dict.whatWeDid.items.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-base md:text-lg text-muted-foreground leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

            {/* Result - highlighted */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-primary/10 border border-primary/20">
                  <Trophy className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-primary">
                  {dict.result.title}
                </h3>
              </div>
              <div
                className="ml-14 p-6 rounded-xl border border-primary/20"
                style={{
                  background: "linear-gradient(135deg, rgba(229, 168, 75, 0.08) 0%, rgba(229, 168, 75, 0.02) 100%)",
                }}
              >
                <p className="text-base md:text-lg text-foreground leading-relaxed">
                  {dict.result.text}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Bio - separate card */}
          <motion.div
            variants={staggerItem}
            className="mt-8 rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm p-6 md:p-8 flex gap-4"
          >
            <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex-shrink-0">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-semibold mb-2">
                {dict.bio.title}
              </h3>
              <p className="text-base text-muted-foreground leading-relaxed italic">
                {dict.bio.text}
              </p>
            </div>
          </motion.div>

          {/* CTA to full case study */}
          {dict.cta && (
            <motion.div variants={staggerItem} className="text-center mt-12">
              <Button
                asChild
                size="lg"
                variant="outline"
                className="group h-12 px-8 border-primary/30 hover:bg-primary/10 hover:border-primary/50 transition-all duration-300"
              >
                <Link href={`/${lang}/case-study/mirco`}>
                  <span className="flex items-center gap-2">
                    {dict.cta}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Button>
            </motion.div>
          )}
        </motion.div>
      </Container>
    </section>
  );
}
