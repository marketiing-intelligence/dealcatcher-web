"use client";

import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { motion, AnimatePresence } from "framer-motion";
import { viewportOnce, fadeUp } from "@/lib/animations";
import { Scale, Heart, ShoppingCart, Building2, Calculator, MessageSquare } from "lucide-react";
import { useState } from "react";

interface IndustriesSectionProps {
  dict: {
    badge: string;
    title: string;
    subtitle: string;
    tabs: Array<{
      name: string;
      queries: string[];
      stat: string;
    }>;
  };
}

const tabIcons = [Scale, Heart, ShoppingCart, Building2, Calculator];

export function IndustriesSection({ dict }: IndustriesSectionProps) {
  const [active, setActive] = useState(0);
  const tab = dict.tabs[active];

  return (
    <section className="py-20 md:py-32">
      <Container>
        <SectionHeading
          badge={dict.badge}
          title={dict.title}
          subtitle={dict.subtitle}
          align="center"
        />

        {/* Tab buttons */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12"
        >
          {dict.tabs.map((t, i) => {
            const Icon = tabIcons[i];
            return (
              <button
                key={t.name}
                onClick={() => setActive(i)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  active === i
                    ? "bg-primary text-primary-foreground shadow-[0_4px_16px_var(--accent-glow)]"
                    : "bg-card border border-border text-muted-foreground hover:border-[#3F3F46] hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                {t.name}
              </button>
            );
          })}
        </motion.div>

        {/* Tab content */}
        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="rounded-2xl border border-border bg-card p-8 md:p-10"
            >
              {/* Queries */}
              <div className="space-y-3 mb-8">
                {tab.queries.map((q) => (
                  <div
                    key={q}
                    className="flex items-start gap-3 rounded-xl bg-background border border-border px-4 py-3"
                  >
                    <MessageSquare className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm md:text-base italic text-foreground">
                      &ldquo;{q}&rdquo;
                    </span>
                  </div>
                ))}
              </div>

              {/* Stat */}
              <div className="text-center pt-4 border-t border-border">
                <p className="text-primary font-semibold text-lg">
                  {tab.stat}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}
