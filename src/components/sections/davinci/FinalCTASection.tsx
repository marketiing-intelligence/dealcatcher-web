import { Container } from "@/components/shared/Container";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";

interface FinalCTASectionProps {
  lang: Locale;
  dict: {
    headline: string;
    cta: string;
    checkpoints: string[];
    footer: string;
  };
}

export function FinalCTASection({ lang, dict }: FinalCTASectionProps) {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />

        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: "radial-gradient(circle, #F5F5F5 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Primary glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-primary/8 blur-[150px] pointer-events-none"
          aria-hidden="true"
        />
      </div>

      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Headline */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold [word-spacing:0.15em] mb-12 leading-tight">
            {dict.headline}
          </h2>

          {/* CTA Button */}
          <div className="mb-8">
            <Button
              asChild
              size="lg"
              className="group relative bg-primary hover:bg-primary/90 text-primary-foreground h-14 md:h-16 lg:h-18 px-8 md:px-10 lg:px-12 text-base md:text-lg lg:text-xl font-medium overflow-hidden w-full sm:w-auto shadow-[0_0_40px_rgba(229,168,75,0.25)] hover:shadow-[0_0_60px_rgba(229,168,75,0.4)] transition-shadow duration-500"
            >
              <Link href={`/${lang}#xray-form`}>
                <span className="absolute inset-0 bg-gradient-to-r from-primary via-accent-hover to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative flex items-center gap-2">
                  {dict.cta}
                  <ArrowRight className="h-5 w-5 md:h-6 md:w-6 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Button>
          </div>

          {/* Checkpoints */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-8 text-sm md:text-base">
            {dict.checkpoints.map((checkpoint, index) => (
              <div key={index} className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                <span>{checkpoint}</span>
              </div>
            ))}
          </div>

          {/* Footer note */}
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            {dict.footer}
          </p>
        </div>
      </Container>
    </section>
  );
}
