"use client";

import { Container } from "@/components/shared/Container";
import { PreviewCard } from "@/components/shared/PreviewCard";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem, viewportOnce } from "@/lib/animations";
import {
  getPortfolioItems,
  type Industry,
} from "@/lib/portfolio-data";
import type { Locale } from "@/lib/i18n/config";
import { Filter } from "lucide-react";
import { useState } from "react";

const industries: ("all" | "contractor" | "service" | "finishing")[] = [
  "all",
  "contractor",
  "service",
  "finishing",
];

interface PortfolioGridProps {
  lang: Locale;
  dict: {
    templatesHeading: string;
    filterAll: string;
    caseStudiesHeading: string;
    industryLabels: {
      contractor: string;
      service: string;
      finishing: string;
    };
    noResults: string;
  };
}

export function PortfolioGrid({ lang, dict }: PortfolioGridProps) {
  const [activeFilter, setActiveFilter] = useState<"all" | "contractor" | "service" | "finishing">("all");
  const localizedItems = getPortfolioItems(lang);

  // Separate templates from case studies
  const templateItems = localizedItems.filter((item) => item.industry !== "case-study");
  const caseStudyItems = localizedItems.filter((item) => item.industry === "case-study");

  const filteredTemplates =
    activeFilter === "all"
      ? templateItems
      : templateItems.filter((item) => item.industry === activeFilter);

  return (
    <section className="pb-20 md:pb-32">
      <Container>
        {/* Templates Section Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          {dict.templatesHeading}
        </h2>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          <Filter className="h-4 w-4 text-muted-foreground mr-2" />
          {industries.map((industry) => (
            <Button
              key={industry}
              variant={activeFilter === industry ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter(industry)}
              className={
                activeFilter === industry
                  ? "bg-primary text-primary-foreground"
                  : ""
              }
            >
              {industry === "all" ? dict.filterAll : dict.industryLabels[industry]}
            </Button>
          ))}
        </div>

        {/* Templates Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredTemplates.map((item) => (
            <motion.div key={item.id} variants={staggerItem} layout>
              <PreviewCard item={item} lang={lang} showPremiumBadge />
            </motion.div>
          ))}
        </motion.div>

        {/* Empty state */}
        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {dict.noResults}
            </p>
          </div>
        )}

        {/* Case Studies Section */}
        {caseStudyItems.length > 0 && (
          <div className="mt-32">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              {dict.caseStudiesHeading}
            </h2>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={staggerContainer}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {caseStudyItems.map((item) => (
                <motion.div key={item.id} variants={staggerItem}>
                  <PreviewCard item={item} lang={lang} showPremiumBadge={false} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}
      </Container>
    </section>
  );
}
