"use client";

import { Container } from "@/components/shared/Container";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem, viewportOnce } from "@/lib/animations";
import { CheckCircle, ArrowRight, Rocket, Users } from "lucide-react";

interface OfferSectionProps {
  dict: {
    badge: string;
    title: string;
    urgency?: string;
    includes: string[];
    details: Array<{ label: string; value: string }>;
    pathsIntro: string;
    project: { title: string; price: string; description: string; items: string[]; footer: string };
    partner: { title: string; price: string; description: string };
    afterNote: string;
  };
}

export function OfferSection({ dict }: OfferSectionProps) {
  return (
    <section className="py-16 md:py-20 bg-[#0e0e0e]">
      <Container>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer}
          >
            {/* Header */}
            <div className="text-center mb-12">
              <motion.span
                variants={staggerItem}
                className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-4 block"
              >
                {dict.badge}
              </motion.span>
              <motion.h2
                variants={staggerItem}
                className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight leading-[1.25]"
              >
                {dict.title}
              </motion.h2>
              {dict.urgency && (
                <motion.p
                  variants={staggerItem}
                  className="text-sm font-semibold text-red-500 mt-3"
                >
                  {dict.urgency}
                </motion.p>
              )}
            </div>

            {/* Main offer — glass card */}
            <motion.div
              variants={staggerItem}
              className="rounded-2xl border border-primary/20 backdrop-blur-sm bg-primary/[0.03] p-6 md:p-8 mb-5"
            >
              {/* Includes */}
              <div className="grid sm:grid-cols-2 gap-2.5 mb-8">
                {dict.includes.map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>

              {/* Details as pills row */}
              <div className="flex flex-wrap gap-3 pt-6 border-t border-white/[0.06]">
                {dict.details.map((d, i) => (
                  <div
                    key={i}
                    className="rounded-lg bg-white/[0.04] border border-white/[0.06] px-4 py-2.5"
                  >
                    <p className="text-[9px] text-muted-foreground/40 uppercase tracking-wider mb-0.5">
                      {d.label}
                    </p>
                    <p className="text-xs font-medium text-foreground">{d.value}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Two paths */}
            <motion.p
              variants={staggerItem}
              className="text-sm font-semibold mb-4 text-center"
            >
              {dict.pathsIntro}
            </motion.p>

            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {/* Project */}
              <motion.div
                variants={staggerItem}
                className="rounded-xl bg-[#141414] border border-white/[0.06] p-6 hover:border-white/[0.12] transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/15 flex items-center justify-center">
                    <Rocket className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">{dict.project.title}</h3>
                    <p className="text-xs text-primary">{dict.project.price}</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                  {dict.project.description}
                </p>
                <div className="grid grid-cols-2 gap-1.5 mb-4">
                  {dict.project.items.map((item, i) => (
                    <div key={i} className="flex items-start gap-1.5">
                      <ArrowRight className="h-2.5 w-2.5 text-primary flex-shrink-0 mt-1" />
                      <span className="text-[10px] text-muted-foreground leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-muted-foreground/40 border-t border-white/[0.04] pt-3">
                  {dict.project.footer}
                </p>
              </motion.div>

              {/* Partner */}
              <motion.div
                variants={staggerItem}
                className="rounded-xl bg-[#141414] border border-white/[0.06] p-6 hover:border-white/[0.12] transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/15 flex items-center justify-center">
                    <Users className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">{dict.partner.title}</h3>
                    <p className="text-xs text-primary">{dict.partner.price}</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {dict.partner.description}
                </p>
              </motion.div>
            </div>

            <motion.p
              variants={staggerItem}
              className="text-[10px] text-muted-foreground/30 text-center"
            >
              {dict.afterNote}
            </motion.p>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
