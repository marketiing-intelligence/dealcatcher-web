"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassCard({
  children,
  className,
  hover = true,
  ...props
}: GlassCardProps) {
  const baseClasses = cn(
    "relative rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl",
    "shadow-[0_8px_32px_rgba(0,0,0,0.3)]",
    hover && "transition-all duration-300 hover:border-white/20 hover:bg-white/[0.07] hover:-translate-y-1",
    className
  );

  if (hover) {
    return (
      <motion.div
        className={baseClasses}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3 }}
        {...(props as React.ComponentProps<typeof motion.div>)}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={baseClasses} {...props}>
      {children}
    </div>
  );
}

// Glass navbar variant
export function GlassNavbar({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50",
        "bg-background/60 backdrop-blur-xl",
        "border-b border-white/10",
        "shadow-[0_4px_30px_rgba(0,0,0,0.1)]",
        className
      )}
      {...props}
    >
      {children}
    </nav>
  );
}
