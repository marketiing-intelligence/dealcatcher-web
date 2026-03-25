"use client";

import { Container } from "@/components/shared/Container";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp, viewportOnce } from "@/lib/animations";
import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";

interface PilotProgramSectionProps {
  lang: Locale;
  dict: {
    badge: string;
    title: string;
    description: string;
    cta: string;
  };
}

export function PilotProgramSection({ lang, dict }: PilotProgramSectionProps) {
  return (
    <section className="relative overflow-hidden border-y border-primary/15">
      <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(229,168,75,0.04) 0%, rgba(229,168,75,0.08) 50%, rgba(229,168,75,0.04) 100%)" }} />

      <Container>
        <motion.div
          initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeUp}
          className="py-5 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="relative flex-shrink-0">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <div className="absolute inset-0 w-2 h-2 rounded-full bg-primary animate-ping opacity-40" />
            </div>
            <p className="text-xs md:text-sm">
              <span className="font-bold text-primary uppercase tracking-wider">{dict.badge}</span>
              <span className="mx-2 text-white/20">|</span>
              <span className="text-muted-foreground">{dict.title} {dict.description}</span>
            </p>
          </div>

          <Button asChild className="group bg-primary hover:bg-primary/90 text-primary-foreground h-8 px-4 text-xs font-medium flex-shrink-0">
            <Link href={`/${lang}#xray-form`}>
              <span className="flex items-center gap-1.5">
                {dict.cta}
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}
