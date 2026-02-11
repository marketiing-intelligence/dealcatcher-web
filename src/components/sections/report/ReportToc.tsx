"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface ReportTocProps {
  dict: {
    keywords: string;
    competition: string;
    calculator: string;
    cpc: string;
    seasonality: string;
    insights: string;
    tips: string;
  };
}

const sections = [
  "keywords",
  "competition",
  "calculator",
  "cpc",
  "seasonality",
  "insights",
  "tips",
] as const;

export function ReportToc({ dict }: ReportTocProps) {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav className="hidden lg:block fixed right-8 top-1/2 -translate-y-1/2 z-40">
      <div className="flex flex-col gap-1.5 bg-card/80 backdrop-blur-md border border-border rounded-xl p-2">
        {sections.map((id) => (
          <button
            key={id}
            onClick={() => handleClick(id)}
            className={cn(
              "text-xs px-3 py-1.5 rounded-md transition-all text-left whitespace-nowrap",
              active === id
                ? "bg-primary/10 text-primary font-medium"
                : "text-muted-foreground hover:text-foreground hover:bg-white/5"
            )}
          >
            {dict[id as keyof typeof dict]}
          </button>
        ))}
      </div>
    </nav>
  );
}
