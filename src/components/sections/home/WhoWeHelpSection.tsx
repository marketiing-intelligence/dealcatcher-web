"use client";

import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem, viewportOnce } from "@/lib/animations";
import { ArrowRight, Globe, ShieldAlert } from "lucide-react";
import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";

interface WhoWeHelpSectionProps {
  lang: Locale;
  dict: {
    badge: string;
    title: string;
    subtitle: string;
    segments: Array<{
      title: string;
      description: string;
      cta: string;
      features: string[];
    }>;
  };
}

const icons = [Globe, ShieldAlert];
const hrefs = ["no-website", "wcag-compliance"];

export function WhoWeHelpSection({ lang, dict }: WhoWeHelpSectionProps) {
  return (
    <section className="py-20 md:py-32">
      <Container>
        <SectionHeading
          badge={dict.badge}
          title={dict.title}
          subtitle={dict.subtitle}
          align="center"
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="grid md:grid-cols-2 gap-8 mt-12"
        >
          {dict.segments.map((segment, index) => {
            const Icon = icons[index];
            const href = hrefs[index];

            return (
              <motion.div
                key={segment.title}
                variants={staggerItem}
                className="group relative rounded-2xl border border-border bg-card p-8 md:p-10 transition-all duration-300 hover:border-[#3F3F46] hover:-translate-y-1"
              >
                {/* Icon */}
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-7 w-7" />
                </div>

                {/* Title */}
                <h3 className="text-2xl md:text-3xl mb-4">{segment.title}</h3>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {segment.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {segment.features.map((feature) => (
                    <span
                      key={feature}
                      className="rounded-full border border-border bg-background px-3 py-1 text-sm text-muted-foreground"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <Button
                  asChild
                  className="w-full bg-primary text-primary-foreground hover:bg-[#34D399] h-12 text-base font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(16,185,129,0.15)]"
                >
                  <Link href={`/${lang}/${href}`}>
                    {segment.cta}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
