"use client";

import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";

interface VSLSectionProps {
  dict: {
    badge: string;
    titleStart: string;
    titleHighlight: string;
    titleEnd: string;
    subtitle?: string;
  };
}

export function VSLSection({ dict }: VSLSectionProps) {
  return (
    <section className="py-20 md:py-32 bg-muted/30">
      <Container>
        {/* Custom heading with green highlight */}
        <div className="mb-12 md:mb-16">
          {dict.badge && (
            <span className="mb-4 inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              {dict.badge}
            </span>
          )}
          <h2 className="mb-4 [word-spacing:0.1em]">
            {dict.titleStart}
            <span className="text-primary">{dict.titleHighlight}</span>
            {dict.titleEnd}
          </h2>
          {dict.subtitle && (
            <p className="text-muted-foreground max-w-xl">
              {dict.subtitle}
            </p>
          )}
        </div>

        <div className="mt-12 max-w-4xl mx-auto">
          <div className="relative aspect-video rounded-xl overflow-hidden border border-border shadow-2xl">
            <video
              controls
              className="w-full h-full"
            >
              <source src="/vsl.mp4" type="video/mp4" />
              Twoja przeglądarka nie obsługuje odtwarzania wideo.
            </video>
          </div>
        </div>
      </Container>
    </section>
  );
}
