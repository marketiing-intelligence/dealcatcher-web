"use client";

import { Container } from "@/components/shared/Container";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { staggerContainer, staggerItem, viewportOnce } from "@/lib/animations";
import { SlidersHorizontal, Calculator, Sparkles, ArrowRight } from "lucide-react";

interface ConfiguratorsSectionProps {
  lang: string;
  dict: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    types: Array<{
      title: string;
      description: string;
      examples: string;
    }>;
    cta: string;
    ctaNote: string;
  };
}

const icons = [SlidersHorizontal, Calculator, Sparkles];
const ACCENT = "6, 182, 212"; // cyan-500

function ConfiguratorCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      className={`group relative rounded-2xl border border-cyan-500/20 bg-card overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(${ACCENT}, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

export function ConfiguratorsSection({ lang, dict }: ConfiguratorsSectionProps) {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Cyan background glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      <Container className="relative z-10">
        {/* Custom heading with highlight */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="mb-12 md:mb-16"
        >
          <motion.span
            variants={staggerItem}
            className="mb-4 inline-block rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-sm font-medium text-cyan-400"
          >
            {dict.badge}
          </motion.span>
          <motion.h2 variants={staggerItem} className="mb-4">
            {dict.title}{" "}
            <span className="text-transparent bg-gradient-to-r from-cyan-400 to-teal-300 bg-clip-text">
              {dict.titleHighlight}
            </span>
          </motion.h2>
          <motion.p
            variants={staggerItem}
            className="text-muted-foreground max-w-2xl"
          >
            {dict.subtitle}
          </motion.p>
        </motion.div>

        {/* 3 configurator type cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-6"
        >
          {dict.types.map((type, index) => {
            const Icon = icons[index];
            const isCustom = index === 2;

            return (
              <motion.div key={type.title} variants={staggerItem}>
                <ConfiguratorCard
                  className={isCustom ? "border-dashed border-cyan-500/30" : ""}
                >
                  <div className="p-7 md:p-8 h-full flex flex-col">
                    {/* Icon */}
                    <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 relative">
                      <Icon className="h-6 w-6" />
                      <div className="absolute inset-0 rounded-xl bg-cyan-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl md:text-2xl mb-3">{type.title}</h3>

                    {/* Description */}
                    <p className="text-muted-foreground text-sm leading-relaxed mb-5 flex-grow">
                      {type.description}
                    </p>

                    {/* Examples tag */}
                    <div className="pt-4 border-t border-cyan-500/10">
                      <p className="text-xs text-cyan-400/70">
                        {type.examples}
                      </p>
                    </div>
                  </div>
                </ConfiguratorCard>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA bar */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerItem}
          className="mt-10"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl border border-cyan-500/10 bg-cyan-500/5 backdrop-blur-sm p-5 md:p-6">
            <p className="text-sm text-muted-foreground text-center sm:text-left">
              {dict.ctaNote}
            </p>
            <a
              href={`/${lang}/contact`}
              className="inline-flex items-center gap-2 rounded-lg bg-cyan-500 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-cyan-600 whitespace-nowrap"
            >
              {dict.cta}
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
