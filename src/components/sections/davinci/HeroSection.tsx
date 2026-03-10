import { Container } from "@/components/shared/Container";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";

interface HeroSectionProps {
  lang: Locale;
  dict: {
    headline: string;
    subheadline: string;
    cta: string;
    ctaNote: string;
  };
}

export function HeroSection({ lang, dict }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Static gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />

        {/* Static glow - CSS only */}
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px] pointer-events-none"
          aria-hidden="true"
        />
      </div>

      {/* Main content - no Framer Motion */}
      <div className="relative z-10 w-full">
        <Container className="py-20 md:py-32 lg:py-40">
          <div className="max-w-5xl animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Headline */}
            <div className="mb-6 md:mb-8">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] md:leading-[1.05] font-semibold [word-spacing:0.15em]">
                {dict.headline}
              </h1>
            </div>

            {/* Subheadline */}
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-8 md:mb-12 max-w-3xl leading-relaxed">
              {dict.subheadline}
            </p>

            {/* CTA */}
            <div className="mb-4">
              <Button
                asChild
                size="lg"
                className="group relative bg-primary hover:bg-primary/90 text-primary-foreground h-14 px-8 text-base font-medium overflow-hidden"
              >
                <Link href={`/${lang}#xray-form`}>
                  <span className="absolute inset-0 bg-gradient-to-r from-primary via-accent-hover to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="relative flex items-center gap-2">
                    {dict.cta}
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Button>
            </div>

            {/* CTA note */}
            <p className="text-sm text-muted-foreground">{dict.ctaNote}</p>
          </div>
        </Container>
      </div>
    </section>
  );
}
