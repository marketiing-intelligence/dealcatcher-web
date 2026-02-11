"use client";

import { Container } from "@/components/shared/Container";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { fadeUp, viewportOnce } from "@/lib/animations";
import { ArrowRight, Mail } from "lucide-react";
import Link from "next/link";
import { CALCOM_BOOKING_URL } from "@/lib/constants";
import type { Locale } from "@/lib/i18n/config";

interface ReportCtaProps {
  lang: Locale;
  dict: {
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    disclaimer: string;
  };
}

export function ReportCta({ lang, dict }: ReportCtaProps) {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-[#141414] to-[#0A0A0A] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

      <Container className="relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="mb-4">{dict.title}</h2>
          <p className="text-lg text-muted-foreground mb-8">{dict.subtitle}</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="group">
              <a href={CALCOM_BOOKING_URL} target="_blank" rel="noopener noreferrer">
                {dict.ctaPrimary}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href={`/${lang}/contact`}>
                <Mail className="mr-2 h-4 w-4" />
                {dict.ctaSecondary}
              </Link>
            </Button>
          </div>

          <p className="text-xs text-muted-foreground mt-6">{dict.disclaimer}</p>
        </motion.div>
      </Container>
    </section>
  );
}
