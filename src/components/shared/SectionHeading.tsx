"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { fadeUp, viewportOnce } from "@/lib/animations";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  badge?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  badge,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={fadeUp}
      className={cn(
        "mb-12 md:mb-16",
        align === "center" && "text-center",
        className
      )}
    >
      {badge && (
        <span className="mb-4 inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
          {badge}
        </span>
      )}
      <h2 className={cn("mb-4", align === "center" && "mx-auto max-w-3xl")}>
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "text-muted-foreground",
            align === "center" ? "mx-auto max-w-2xl" : "max-w-xl"
          )}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
