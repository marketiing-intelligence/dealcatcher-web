"use client";

import { Container } from "@/components/shared/Container";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { fadeUp, viewportOnce } from "@/lib/animations";
import { Calendar, MessageSquare } from "lucide-react";
import { CALCOM_BOOKING_URL } from "@/lib/constants";
import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";

interface CTASectionProps {
  lang: Locale;
}

export function CTASection({ lang }: CTASectionProps) {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-[120px]" />

      <Container className="relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="mb-6">
            Ready to get <span className="text-primary">found online</span>?
          </h2>
          <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
            Book a free 15-minute consultation. We'll discuss your business,
            answer your questions, and show you what your website could look like.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-accent-hover h-14 px-8 text-base font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_var(--accent-glow)]"
            >
              <a href={CALCOM_BOOKING_URL} target="_blank" rel="noopener noreferrer">
                <Calendar className="mr-2 h-5 w-5" />
                Book free consultation
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-border hover:border-primary hover:text-primary h-14 px-8 text-base font-medium"
            >
              <Link href={`/${lang}/contact`}>
                <MessageSquare className="mr-2 h-5 w-5" />
                Send us a message
              </Link>
            </Button>
          </div>

          <p className="mt-8 text-sm text-muted-foreground">
            No commitment required. We'll never spam you.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
