"use client";

import { Container } from "@/components/shared/Container";
import { PreviewCard } from "@/components/shared/PreviewCard";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem, viewportOnce } from "@/lib/animations";
import {
  portfolioItems,
  type Industry,
} from "@/lib/portfolio-data";
import { Filter } from "lucide-react";
import { useState } from "react";

const industries: (Industry | "all")[] = [
  "all",
  "contractor",
  "service",
  "finishing",
];

interface PortfolioGridProps {
  dict: {
    filterAll: string;
    industryLabels: {
      contractor: string;
      service: string;
      finishing: string;
    };
    emptyState: string;
  };
}

export function PortfolioGrid({ dict }: PortfolioGridProps) {
  const [activeFilter, setActiveFilter] = useState<Industry | "all">("all");

  const filteredItems =
    activeFilter === "all"
      ? portfolioItems
      : portfolioItems.filter((item) => item.industry === activeFilter);

  return (
    <section className="pb-20 md:pb-32">
      <Container>
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

        {/* Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredItems.map((item) => (
            <motion.div key={item.id} variants={staggerItem} layout>
              <PreviewCard item={item} showPremiumBadge />
            </motion.div>
          ))}
        </motion.div>

        {/* Empty state */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {dict.emptyState}
            </p>
          </div>
        )}
      </Container>
    </section>
  );
}
