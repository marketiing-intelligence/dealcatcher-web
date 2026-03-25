"use client";

import { Container } from "@/components/shared/Container";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem, viewportOnce } from "@/lib/animations";

interface ProblemSectionProps {
  dict: {
    title: string;
    cards: Array<{ number: string; title: string; description: string }>;
    vslBadge: string;
    vslTitle: string;
  };
}

export function ProblemSection({ dict }: ProblemSectionProps) {
  return (
    <section className="py-16 md:py-20 bg-[#0e0e0e]">
      <Container>
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer}
          >
            {/* Layout: video LEFT, cards RIGHT */}
            <div className="flex flex-col md:flex-row gap-6 items-start">
              {/* Left: video */}
              <motion.div
                variants={staggerItem}
                className="w-full md:w-auto flex-shrink-0"
              >
                <div className="mb-3">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-[0.15em] block mb-1">
                    {dict.vslBadge}
                  </span>
                  <h3 className="text-xs font-semibold tracking-tight text-muted-foreground">
                    {dict.vslTitle}
                  </h3>
                </div>
                <div className="w-full md:w-[320px] rounded-2xl overflow-hidden border-2 border-white/[0.1] shadow-2xl shadow-black/50 bg-black">
                  <video controls className="w-full h-auto block">
                    <source src="/vsl.mp4" type="video/mp4" />
                  </video>
                </div>
              </motion.div>

              {/* Right: title + 3 cards */}
              <div className="flex-1 w-full">
                <motion.h2
                  variants={staggerItem}
                  className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight leading-[1.25] mb-6"
                >
                  {dict.title}
                </motion.h2>
                <div className="space-y-3">
                {dict.cards.map((card, i) => (
                  <motion.div
                    key={i}
                    variants={staggerItem}
                    className="rounded-xl bg-[#141414] border border-white/[0.08] p-5 hover:border-red-500/15 hover:bg-[#161616] transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-9 h-9 rounded-lg bg-red-500/10 border border-red-500/15 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold text-red-400">{card.number}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-semibold mb-1 tracking-tight">{card.title}</h3>
                        <p className="text-sm text-muted-foreground leading-[1.7]">{card.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
