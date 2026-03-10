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
    <section className="py-20 md:py-32 relative">
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
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background/50 px-4 py-1.5 text-sm font-medium text-foreground mb-6"
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

          {/* Situation */}
          <motion.div variants={staggerItem} className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 border border-primary/20">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-primary">
                {dict.situation.title}
              </h3>
            </div>
            <div className="pl-0 md:pl-15">
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                {dict.situation.text}
              </p>
            </div>
          </motion.div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent my-8" />

          {/* What we did */}
          <motion.div variants={staggerItem} className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 border border-primary/20">
                <Wrench className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-primary">
                {dict.whatWeDid.title}
              </h3>
            </div>
            <ul className="space-y-3 pl-0 md:pl-15">
              {dict.whatWeDid.items.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-base md:text-lg text-muted-foreground leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent my-8" />

          {/* Result */}
          <motion.div variants={staggerItem} className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 border border-primary/20">
                <Trophy className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-primary">
                {dict.result.title}
              </h3>
            </div>
            <div className="p-6 md:p-8 border border-primary/30 bg-primary/5 rounded-lg">
              <p className="text-base md:text-lg text-foreground leading-relaxed">
                {dict.result.text}
              </p>
            </div>
          </motion.div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent my-8" />

          {/* Bio */}
          <motion.div variants={staggerItem} className="flex gap-4">
            <div className="flex items-start justify-center w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex-shrink-0">
              <User className="w-6 h-6 text-primary mt-3" />
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-semibold mb-3">
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
                className="group h-12 px-6 border-primary/30 hover:bg-primary/10"
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
