"use client";

import { Container } from "@/components/shared/Container";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem, viewportOnce } from "@/lib/animations";
import {
  Search,
  Target,
  TrendingUp,
  Users,
  Lightbulb,
  DollarSign,
  Wrench,
  BarChart,
  Shield,
  Zap,
  Globe,
  Brain,
} from "lucide-react";

interface HowWeWorkSectionProps {
  dict: {
    badge: string;
    title: string;
    intro: string;
    areas: Array<{
      area: string;
      what: string;
    }>;
    emphasis: string;
  };
}

export function HowWeWorkSection({ dict }: HowWeWorkSectionProps) {
  // Icons for each analysis area (12 total)
  const areaIcons = [
    Search,      // 1
    Target,      // 2
    TrendingUp,  // 3
    Users,       // 4
    Lightbulb,   // 5
    DollarSign,  // 6
    Wrench,      // 7
    BarChart,    // 8
    Shield,      // 9
    Zap,         // 10
    Globe,       // 11
    Brain,       // 12
  ];

  return (
    <section className="py-20 md:py-32 relative bg-muted/30">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
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
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold [word-spacing:0.15em] mb-8 max-w-4xl leading-tight"
          >
            {dict.title}
          </motion.h2>

          {/* Intro */}
          <motion.p
            variants={staggerItem}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-12 max-w-3xl"
          >
            {dict.intro}
          </motion.p>

          {/* Analysis areas - Table on desktop, cards on mobile */}
          <motion.div variants={staggerItem} className="mb-12">
            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-border">
                    <th className="text-left py-4 px-6 font-semibold text-primary">Obszar</th>
                    <th className="text-left py-4 px-6 font-semibold text-primary">Co szukamy</th>
                  </tr>
                </thead>
                <tbody>
                  {dict.areas.map((area, index) => {
                    const Icon = areaIcons[index] || Search;
                    return (
                      <tr
                        key={index}
                        className="border-b border-border/50 hover:bg-background/50 transition-colors group"
                      >
                        <td className="py-4 px-6 align-top w-1/3">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors">
                              <Icon className="w-4 h-4 text-primary" />
                            </div>
                            <span className="font-semibold">{area.area}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-muted-foreground leading-relaxed">{area.what}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden space-y-4">
              {dict.areas.map((area, index) => {
                const Icon = areaIcons[index] || Search;
                return (
                  <div key={index} className="border border-border rounded-lg p-4 bg-background/50">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 border border-primary/20">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      <h3 className="font-semibold text-primary">{area.area}</h3>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed pl-11">{area.what}</p>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Emphasis */}
          <motion.p
            variants={staggerItem}
            className="text-base md:text-lg text-foreground leading-relaxed max-w-3xl italic border-l-4 border-primary pl-6"
          >
            {dict.emphasis}
          </motion.p>
        </motion.div>
      </Container>
    </section>
  );
}
