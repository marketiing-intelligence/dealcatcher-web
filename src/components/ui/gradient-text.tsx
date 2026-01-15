"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
}

export function GradientText({
  children,
  className,
  animate = false,
}: GradientTextProps) {
  if (animate) {
    return (
      <motion.span
        className={cn(
          "inline-block bg-gradient-to-r from-primary via-accent-hover to-primary bg-[length:200%_auto] bg-clip-text text-transparent",
          className
        )}
        animate={{
          backgroundPosition: ["0% center", "200% center"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {children}
      </motion.span>
    );
  }

  return (
    <span
      className={cn(
        "bg-gradient-to-r from-primary to-accent-hover bg-clip-text text-transparent",
        className
      )}
    >
      {children}
    </span>
  );
}

// Glowing text effect
export function GlowingText({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "text-primary drop-shadow-[0_0_20px_rgba(16,185,129,0.5)]",
        className
      )}
    >
      {children}
    </span>
  );
}
