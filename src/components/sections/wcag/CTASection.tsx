"use client";

import { Container } from "@/components/shared/Container";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { fadeUp, viewportOnce } from "@/lib/animations";
import { ArrowRight, Search } from "lucide-react";

export function CTASection() {
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
            Find out if your website is{" "}
            <span className="text-primary">compliant</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
            Request a free WCAG audit. We'll scan your website and send you a
            detailed report of any accessibility issues. No obligation to proceed.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-accent-hover h-14 px-8 text-base font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_var(--accent-glow)]"
            >
              <a href="mailto:hello@dealcatcher.io?subject=Free%20WCAG%20Audit">
                <Search className="mr-2 h-5 w-5" />
                Get your free WCAG audit
              </a>
            </Button>
          </div>

          <p className="mt-8 text-sm text-muted-foreground">
            Takes 2-3 days. Completely free. We'll email you the report.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
