"use client";

import { Container } from "@/components/shared/Container";

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
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-muted/30" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <Container>
        {/* Heading */}
        <div className="mb-12 md:mb-16">
          {dict.badge && (
            <span className="mb-4 inline-block rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
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
          <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/[0.06] shadow-2xl shadow-primary/5">
            {/* Glow behind video */}
            <div className="absolute -inset-4 bg-primary/[0.04] blur-[40px] rounded-2xl pointer-events-none" />
            <video
              controls
              className="relative w-full h-full"
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
