"use client";

import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { PreviewCard } from "@/components/shared/PreviewCard";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  staggerContainer,
  staggerItem,
  viewportOnce,
  fadeUp,
} from "@/lib/animations";
import { featuredPortfolioItems } from "@/lib/portfolio-data";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";

interface PortfolioPreviewSectionProps {
  lang: Locale;
  dict: {
    badge: string;
    title: string;
    subtitle: string;
    viewAll: string;
  };
}

export function PortfolioPreviewSection({
  lang,
  dict,
}: PortfolioPreviewSectionProps) {
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
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
        >
          {featuredPortfolioItems.map((item) => (
            <motion.div key={item.id} variants={staggerItem}>
              <PreviewCard item={item} showPremiumBadge />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA to full portfolio */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="text-center mt-12"
        >
          <Button asChild variant="outline" size="lg">
            <Link href={`/${lang}/portfolio`}>
              {dict.viewAll}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}
