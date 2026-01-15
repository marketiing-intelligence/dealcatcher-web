"use client";

import { cn } from "@/lib/utils";
import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";
import { fadeUp, viewportOnce } from "@/lib/animations";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  delay?: number;
}

export function AnimatedSection({
  children,
  className,
  variants = fadeUp,
  delay = 0,
}: AnimatedSectionProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={variants}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
