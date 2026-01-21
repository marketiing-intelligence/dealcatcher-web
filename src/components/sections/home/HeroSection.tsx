import { Container } from "@/components/shared/Container";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";

interface HeroSectionProps {
  lang: Locale;
  dict: {
    badge: string;
    titleStart: string;
    titleHighlight: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
}

// Stats data
const stats = [
  { value: "97%", label: "Sites with accessibility issues" },
  { value: "3s", label: "Average load time goal" },
  { value: "100%", label: "WCAG compliant delivery" },
];

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
            {/* Badge */}
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              {dict.badge}
            </span>

            {/* Headline */}
            <div className="mb-6 md:mb-8">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] md:leading-[1.05]">
                {dict.titleStart}{" "}
                <span className="bg-gradient-to-r from-primary to-accent-hover bg-clip-text text-transparent">
                  {dict.titleHighlight}
                </span>
              </h1>
            </div>

            {/* Subheadline */}
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-8 md:mb-12 max-w-2xl leading-relaxed">
              {dict.subtitle}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <Button
                asChild
                size="lg"
                className="group relative bg-primary text-primary-foreground h-14 px-8 text-base font-medium overflow-hidden"
              >
                <Link href={`/${lang}/no-website`}>
                  <span className="absolute inset-0 bg-gradient-to-r from-primary via-accent-hover to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="relative flex items-center gap-2">
                    {dict.ctaPrimary}
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="group border-border hover:border-primary hover:text-primary h-14 px-8 text-base font-medium transition-all duration-300"
              >
                <Link href={`/${lang}/wcag-compliance`}>
                  <span className="group-hover:text-primary transition-colors">{dict.ctaSecondary}</span>
                </Link>
              </Button>
            </div>

            {/* Stats - static values for faster render */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-16 py-8 border-y border-border/50">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-2">
                    {stat.value}
                  </div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>

          </div>
        </Container>
      </div>
    </section>
  );
}
