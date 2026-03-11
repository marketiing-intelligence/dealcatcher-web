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
  const areaIcons = [
    Search, Target, TrendingUp, Users, Lightbulb, DollarSign,
    Wrench, BarChart, Shield, Zap, Globe, Brain,
  ];

  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-muted/30" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

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
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary mb-6"
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

          {/* Analysis areas - Grid on desktop, cards on mobile */}
          <motion.div variants={staggerItem} className="mb-12">
            {/* Desktop - glassmorphism table */}
            <div className="hidden md:block rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm overflow-hidden">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-primary/20">
                    <th className="text-left py-5 px-6 font-semibold text-primary text-sm uppercase tracking-wider">Obszar</th>
                    <th className="text-left py-5 px-6 font-semibold text-primary text-sm uppercase tracking-wider">Co szukamy</th>
                  </tr>
                </thead>
                <tbody>
                  {dict.areas.map((area, index) => {
                    const Icon = areaIcons[index] || Search;
                    return (
                      <tr
                        key={index}
                        className="border-b border-white/[0.04] hover:bg-white/[0.03] transition-colors duration-300 group"
                      >
                        <td className="py-5 px-6 align-top w-1/3">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 group-hover:bg-primary/15 group-hover:border-primary/30 transition-all duration-300">
                              <Icon className="w-4 h-4 text-primary" />
                            </div>
                            <span className="font-semibold text-foreground">{area.area}</span>
                          </div>
                        </td>
                        <td className="py-5 px-6 text-muted-foreground leading-relaxed">{area.what}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden space-y-3">
              {dict.areas.map((area, index) => {
                const Icon = areaIcons[index] || Search;
                return (
                  <div key={index} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10 border border-primary/20">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      <h3 className="font-semibold text-primary">{area.area}</h3>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed pl-12">{area.what}</p>
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
